const mongoose = require('mongoose');
const QuizHistory = require('./models/QuizHistory');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gate_quiz_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleQuizData = [
  {
    quizName: 'CS Practice - Algorithms',
    subject: 'CS',
    section: 'Algorithms',
    quizType: 'practice',
    score: 85.5,
    totalQuestions: 20,
    correctAnswers: 17,
    incorrectAnswers: 2,
    unattempted: 1,
    percentage: 85.0,
    timeSpent: 1800, // 30 minutes
    difficulty: 'medium',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    quizName: 'CS Practice - Data Structures',
    subject: 'CS',
    section: 'Programming and Data Structures',
    quizType: 'practice',
    score: 92.0,
    totalQuestions: 25,
    correctAnswers: 23,
    incorrectAnswers: 1,
    unattempted: 1,
    percentage: 92.0,
    timeSpent: 2100, // 35 minutes
    difficulty: 'easy',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    quizName: 'DA Practice - Machine Learning',
    subject: 'DA',
    section: 'Machine Learning',
    quizType: 'practice',
    score: 78.5,
    totalQuestions: 15,
    correctAnswers: 12,
    incorrectAnswers: 2,
    unattempted: 1,
    percentage: 80.0,
    timeSpent: 1200, // 20 minutes
    difficulty: 'hard',
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    quizName: 'GA Practice - Numerical Ability',
    subject: 'GA',
    section: 'Numerical Ability',
    quizType: 'practice',
    score: 88.0,
    totalQuestions: 10,
    correctAnswers: 9,
    incorrectAnswers: 0,
    unattempted: 1,
    percentage: 90.0,
    timeSpent: 900, // 15 minutes
    difficulty: 'easy',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  },
  {
    quizName: 'CS Mixed Practice',
    subject: 'Mixed',
    section: null,
    quizType: 'mixed_practice',
    score: 82.5,
    totalQuestions: 30,
    correctAnswers: 25,
    incorrectAnswers: 3,
    unattempted: 2,
    percentage: 83.3,
    timeSpent: 3600, // 60 minutes
    difficulty: 'mixed',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    quizName: 'CS Mock Test 1',
    subject: 'CS',
    section: 'Algorithms',
    quizType: 'mock_test',
    score: 75.0,
    totalQuestions: 20,
    correctAnswers: 15,
    incorrectAnswers: 3,
    unattempted: 2,
    percentage: 75.0,
    timeSpent: 2400, // 40 minutes
    difficulty: 'hard',
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    quizName: 'DA Practice - Linear Algebra',
    subject: 'DA',
    section: 'Linear Algebra',
    quizType: 'practice',
    score: 70.0,
    totalQuestions: 12,
    correctAnswers: 8,
    incorrectAnswers: 3,
    unattempted: 1,
    percentage: 66.7,
    timeSpent: 1500, // 25 minutes
    difficulty: 'medium',
    completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
  },
  {
    quizName: 'GA Practice - Verbal Ability',
    subject: 'GA',
    section: 'Verbal Ability',
    quizType: 'practice',
    score: 95.0,
    totalQuestions: 8,
    correctAnswers: 8,
    incorrectAnswers: 0,
    unattempted: 0,
    percentage: 100.0,
    timeSpent: 600, // 10 minutes
    difficulty: 'easy',
    completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
  }
];

const populateQuizHistory = async () => {
  try {
    // Get the first user (assuming there's at least one user)
    const user = await User.findOne();
    
    if (!user) {
      console.log('No user found. Please create a user first.');
      return;
    }

    console.log(`Populating quiz history for user: ${user.name} (${user.email})`);

    // Clear existing quiz history for this user
    await QuizHistory.deleteMany({ userId: user._id });
    console.log('Cleared existing quiz history');

    // Create multiple attempts for some quizzes to show trends
    const quizHistoryData = [];

    // Add multiple attempts for some quizzes
    sampleQuizData.forEach((quiz, index) => {
      // Add the main attempt
      quizHistoryData.push({
        ...quiz,
        userId: user._id,
        sessionId: `session_${index}_1`
      });

      // Add additional attempts for some quizzes to show improvement
      if (index < 3) {
        // Second attempt (improved)
        quizHistoryData.push({
          ...quiz,
          userId: user._id,
          score: quiz.score + 5,
          correctAnswers: Math.min(quiz.totalQuestions, quiz.correctAnswers + 1),
          percentage: Math.min(100, quiz.percentage + 5),
          timeSpent: quiz.timeSpent - 300, // 5 minutes faster
          completedAt: new Date(quiz.completedAt.getTime() + 24 * 60 * 60 * 1000), // 1 day later
          sessionId: `session_${index}_2`
        });

        // Third attempt (further improved)
        quizHistoryData.push({
          ...quiz,
          userId: user._id,
          score: quiz.score + 10,
          correctAnswers: Math.min(quiz.totalQuestions, quiz.correctAnswers + 2),
          percentage: Math.min(100, quiz.percentage + 10),
          timeSpent: quiz.timeSpent - 600, // 10 minutes faster
          completedAt: new Date(quiz.completedAt.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
          sessionId: `session_${index}_3`
        });
      }
    });

    // Insert all quiz history data
    await QuizHistory.insertMany(quizHistoryData);
    
    console.log(`Successfully populated ${quizHistoryData.length} quiz attempts`);
    console.log('Sample quiz history data created successfully!');
    
    // Display summary
    const summary = await QuizHistory.getUserPerformanceSummary(user._id);
    console.log('\nQuiz Performance Summary:');
    console.log(JSON.stringify(summary, null, 2));

  } catch (error) {
    console.error('Error populating quiz history:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
populateQuizHistory();
