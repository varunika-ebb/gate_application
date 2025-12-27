const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizName: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    enum: ['CS', 'DA', 'GA', 'Mixed'],
    required: true
  },
  section: {
    type: String,
    default: null
  },
  quizType: {
    type: String,
    enum: ['practice', 'mock_test', 'mixed_practice'],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  incorrectAnswers: {
    type: Number,
    default: 0
  },
  unattempted: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    required: true
  },
  averageTimePerQuestion: {
    type: Number, // in seconds
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'mixed'],
    default: 'mixed'
  },
  completedAt: {
    type: Date,
    default: Date.now
  },
  // Additional metadata
  sessionId: {
    type: String,
    default: null
  },
  isCompleted: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
quizHistorySchema.index({ userId: 1, completedAt: -1 });
quizHistorySchema.index({ userId: 1, subject: 1 });
quizHistorySchema.index({ userId: 1, quizType: 1 });

// Virtual for formatted quiz name
quizHistorySchema.virtual('displayName').get(function() {
  if (this.quizType === 'mock_test') {
    return `${this.subject} Mock Test ${this.section || ''}`.trim();
  } else if (this.quizType === 'practice') {
    return `${this.subject} Practice - ${this.section || 'Mixed'}`;
  } else {
    return `${this.subject} Mixed Practice`;
  }
});

// Virtual for formatted time
quizHistorySchema.virtual('formattedTime').get(function() {
  const minutes = Math.floor(this.timeSpent / 60);
  const seconds = this.timeSpent % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for formatted average time per question
quizHistorySchema.virtual('formattedAvgTime').get(function() {
  const minutes = Math.floor(this.averageTimePerQuestion / 60);
  const seconds = this.averageTimePerQuestion % 60;
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
});

// Static method to get user's quiz performance summary
quizHistorySchema.statics.getUserPerformanceSummary = async function(userId) {
  const summary = await this.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          quizName: '$quizName',
          subject: '$subject',
          quizType: '$quizType',
          section: '$section'
        },
        attempts: { $sum: 1 },
        totalScore: { $sum: '$score' },
        totalQuestions: { $sum: '$totalQuestions' },
        totalCorrect: { $sum: '$correctAnswers' },
        totalTimeSpent: { $sum: '$timeSpent' },
        averagePercentage: { $avg: '$percentage' },
        bestScore: { $max: '$score' },
        bestPercentage: { $max: '$percentage' },
        lastAttempt: { $max: '$completedAt' },
        firstAttempt: { $min: '$completedAt' }
      }
    },
    {
      $project: {
        quizName: '$_id.quizName',
        subject: '$_id.subject',
        quizType: '$_id.quizType',
        section: '$_id.section',
        attempts: 1,
        averageScore: { $round: ['$totalScore', 2] },
        averagePercentage: { $round: ['$averagePercentage', 1] },
        bestScore: 1,
        bestPercentage: 1,
        totalQuestions: 1,
        totalCorrect: 1,
        averageTimeSpent: { $round: [{ $divide: ['$totalTimeSpent', '$attempts'] }, 0] },
        lastAttempt: 1,
        firstAttempt: 1,
        accuracy: { $round: [{ $multiply: [{ $divide: ['$totalCorrect', '$totalQuestions'] }, 100] }, 1] }
      }
    },
    { $sort: { lastAttempt: -1 } }
  ]);

  return summary;
};

// Static method to get recent quiz attempts
quizHistorySchema.statics.getRecentAttempts = async function(userId, limit = 10) {
  return await this.find({ userId })
    .sort({ completedAt: -1 })
    .limit(limit)
    .lean();
};

// Static method to get performance trends
quizHistorySchema.statics.getPerformanceTrends = async function(userId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        completedAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
        },
        dailyScore: { $avg: '$percentage' },
        attempts: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

module.exports = mongoose.model('QuizHistory', quizHistorySchema);
