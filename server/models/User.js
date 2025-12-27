const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  profile: {
    avatar: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    college: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: ''
    },
    graduationYear: {
      type: Number,
      min: 2020,
      max: 2030
    },
    targetExam: {
      type: String,
      enum: ['GATE-2025', 'GATE-2026', 'GATE-2027'],
      default: 'GATE-2026'
    }
  },
  preferences: {
    subjects: [{
      type: String,
      enum: ['CS', 'DA', 'GA']
    }],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'mixed'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      browser: {
        type: Boolean,
        default: true
      }
    }
  },
  stats: {
    totalQuizzes: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      default: 0
    },
    correctAnswers: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number,
      default: 0 // in minutes
    },
    averageScore: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    // Enhanced stats for leaderboard
    totalScore: {
      type: Number,
      default: 0
    },
    quizzesCompleted: {
      type: Number,
      default: 0
    },
    // Practice tracking
    practiceStats: {
      cs: {
        questionsCompleted: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 },
        sectionsCompleted: { type: Number, default: 0 },
        lastPracticed: { type: Date, default: Date.now }
      },
      da: {
        questionsCompleted: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 },
        sectionsCompleted: { type: Number, default: 0 },
        lastPracticed: { type: Date, default: Date.now }
      },
      ga: {
        questionsCompleted: { type: Number, default: 0 },
        correctAnswers: { type: Number, default: 0 },
        sectionsCompleted: { type: Number, default: 0 },
        lastPracticed: { type: Date, default: Date.now }
      }
    },
    // Achievement tracking
    achievements: [{
      type: { type: String, enum: ['first_quiz', 'practice_master', 'speed_demon', 'accuracy_king', 'streak_master'] },
      earnedAt: { type: Date, default: Date.now },
      description: String
    }],
    // Streak tracking
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastPracticeDate: { type: Date, default: Date.now }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for user's accuracy percentage
userSchema.virtual('accuracy').get(function() {
  if (this.stats.totalQuestions === 0) return 0;
  return Math.round((this.stats.correctAnswers / this.stats.totalQuestions) * 100);
});

// Virtual for total practice questions completed
userSchema.virtual('totalPracticeCompleted').get(function() {
  return (this.stats.practiceStats?.cs?.questionsCompleted || 0) +
         (this.stats.practiceStats?.da?.questionsCompleted || 0) +
         (this.stats.practiceStats?.ga?.questionsCompleted || 0);
});

// Virtual for total practice sections completed
userSchema.virtual('totalSectionsCompleted').get(function() {
  return (this.stats.practiceStats?.cs?.sectionsCompleted || 0) +
         (this.stats.practiceStats?.da?.sectionsCompleted || 0) +
         (this.stats.practiceStats?.ga?.sectionsCompleted || 0);
});

// Virtual for practice accuracy
userSchema.virtual('practiceAccuracy').get(function() {
  const totalPractice = this.totalPracticeCompleted;
  if (totalPractice === 0) return 0;
  
  const totalCorrect = (this.stats.practiceStats?.cs?.correctAnswers || 0) +
                      (this.stats.practiceStats?.da?.correctAnswers || 0) +
                      (this.stats.practiceStats?.ga?.correctAnswers || 0);
  
  return Math.round((totalCorrect / totalPractice) * 100);
});

// Virtual for overall activity score (combination of quiz and practice)
userSchema.virtual('activityScore').get(function() {
  const quizScore = this.stats.totalScore || 0;
  const practiceScore = this.totalPracticeCompleted * 10; // 10 points per practice question
  const streakBonus = (this.stats.currentStreak || 0) * 5; // 5 points per day streak
  
  return quizScore + practiceScore + streakBonus;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  console.log('[DEBUG] Pre-save triggered for user:', this.email);

  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    console.log('[DEBUG] Password not modified, skipping hash');
    return next();
  }

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('[DEBUG] Hashed password:', this.password);
    next();
  } catch (error) {
    console.error('[ERROR] Password hashing failed:', error);
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Instance method to update stats
userSchema.methods.updateStats = function(quizData) {
  const totalQuestionsBefore = this.stats.totalQuestions || 0;
  const totalQuizzesBefore = this.stats.totalQuizzes || 0;

  // Increment aggregates
  this.stats.totalQuizzes = totalQuizzesBefore + 1;
  this.stats.quizzesCompleted = (this.stats.quizzesCompleted || 0) + 1;
  this.stats.totalQuestions = totalQuestionsBefore + quizData.totalQuestions;
  this.stats.correctAnswers = (this.stats.correctAnswers || 0) + quizData.correctAnswers;
  this.stats.totalTimeSpent = (this.stats.totalTimeSpent || 0) + quizData.timeSpent;

  // Track totalScore (sum of individual quiz scores) for leaderboard
  this.stats.totalScore = (this.stats.totalScore || 0) + (quizData.score || 0);

  // Maintain a rolling average score (simple average of quiz scores)
  this.stats.averageScore = Math.round(
    (((this.stats.averageScore || 0) * (totalQuizzesBefore)) + (quizData.score || 0)) / (totalQuizzesBefore + 1)
  );

  // Update last activity
  this.stats.lastActive = new Date();
  
  return this.save();
};

// Instance method to update practice stats
userSchema.methods.updatePracticeStats = function(subject, questionsCompleted, correctAnswers, sectionsCompleted = 0) {
  if (!this.stats.practiceStats) {
    this.stats.practiceStats = {
      cs: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: Date.now() },
      da: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: Date.now() },
      ga: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: Date.now() }
    };
  }
  
  const subjectKey = subject.toLowerCase();
  if (this.stats.practiceStats[subjectKey]) {
    this.stats.practiceStats[subjectKey].questionsCompleted += questionsCompleted;
    this.stats.practiceStats[subjectKey].correctAnswers += correctAnswers;
    this.stats.practiceStats[subjectKey].sectionsCompleted += sectionsCompleted;
    this.stats.practiceStats[subjectKey].lastPracticed = new Date();
  }
  
  // Update streak
  const today = new Date().toDateString();
  const lastPractice = new Date(this.stats.lastPracticeDate).toDateString();
  
  if (today === lastPractice) {
    // Same day, no streak change
  } else if (new Date(this.stats.lastPracticeDate).getTime() + 24 * 60 * 60 * 1000 >= new Date().getTime()) {
    // Consecutive day
    this.stats.currentStreak += 1;
    if (this.stats.currentStreak > this.stats.longestStreak) {
      this.stats.longestStreak = this.stats.currentStreak;
    }
  } else {
    // Streak broken
    this.stats.currentStreak = 1;
  }
  
  this.stats.lastPracticeDate = new Date();
  this.stats.lastActive = new Date();
  
  return this.save();
};

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'stats.lastActive': -1 });
userSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', userSchema);
