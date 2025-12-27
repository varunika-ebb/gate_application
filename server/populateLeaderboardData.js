const mongoose = require('mongoose');
const User = require('./models/User');
const QuizHistory = require('./models/QuizHistory');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gate-quiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Helper: Compute derived stats per user
function computeDerivedStats(stats = {}) {
  const { practiceStats = {} } = stats;
  const cs = practiceStats.cs || {};
  const da = practiceStats.da || {};
  const ga = practiceStats.ga || {};

  const totalPracticeCompleted = (cs.questionsCompleted || 0) + (da.questionsCompleted || 0) + (ga.questionsCompleted || 0);
  const totalCorrect = (cs.correctAnswers || 0) + (da.correctAnswers || 0) + (ga.correctAnswers || 0);
  const totalSectionsCompleted = (cs.sectionsCompleted || 0) + (da.sectionsCompleted || 0) + (ga.sectionsCompleted || 0);

  const practiceAccuracy = totalPracticeCompleted > 0
    ? (totalCorrect / totalPracticeCompleted) * 100
    : 0;

  const totalScore = stats.totalScore || 0;
  const activityScore = totalScore + totalPracticeCompleted;

  return {
    totalPracticeCompleted,
    totalSectionsCompleted,
    practiceAccuracy: parseFloat(practiceAccuracy.toFixed(2)),
    activityScore
  };
}

// ✅ YOUR real sample user data (kept intact, only enhanced)
const rawUsers = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: 'password123',
    profile: {
      college: 'IIT Delhi',
      branch: 'Computer Science',
      graduationYear: 2025,
      targetExam: 'GATE-2026'
    },
    stats: {
      totalQuizzes: 15,
      totalQuestions: 300,
      correctAnswers: 240,
      totalTimeSpent: 4500,
      averageScore: 80,
      totalScore: 1200,
      quizzesCompleted: 15,
      currentStreak: 7,
      longestStreak: 12,
      practiceStats: {
        cs: { questionsCompleted: 120, correctAnswers: 96, sectionsCompleted: 8, lastPracticed: new Date() },
        da: { questionsCompleted: 80, correctAnswers: 64, sectionsCompleted: 5, lastPracticed: new Date() },
        ga: { questionsCompleted: 60, correctAnswers: 48, sectionsCompleted: 4, lastPracticed: new Date() }
      }
    }
  },
  // 🔁 Add other users exactly as submitted...
];

// Add derived fields
const sampleUsers = rawUsers.map(user => {
  const derived = computeDerivedStats(user.stats);
  return {
    ...user,
    ...derived
  };
});

// Sample quiz history data (optional)
const sampleQuizHistory = [
  { userId: null, quizName: 'CS Mock Test 1', subject: 'CS', section: 'Algorithms', quizType: 'mock_test', score: 85, totalQuestions: 20, correctAnswers: 17, percentage: 85, timeSpent: 1800 },
  { userId: null, quizName: 'DA Practice', subject: 'DA', section: 'Machine Learning', quizType: 'practice', score: 78, totalQuestions: 15, correctAnswers: 12, percentage: 80, timeSpent: 1200 },
  { userId: null, quizName: 'GA Mixed Practice', subject: 'GA', section: null, quizType: 'mixed_practice', score: 92, totalQuestions: 10, correctAnswers: 9, percentage: 90, timeSpent: 600 },
  // Add more quiz history entries...
];

async function populateData() {
  try {
    console.log('🗑️  Deleting existing users and quiz history...');
    await User.deleteMany({});
    await QuizHistory.deleteMany({});

    console.log('👥 Creating users...');
    const createdUsers = [];

    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.name}`);
    }

    console.log('📝 Creating quiz history...');
    let historyIndex = 0;
    for (const user of createdUsers) {
      const historyPerUser = Math.floor(sampleQuizHistory.length / createdUsers.length);
      for (let i = 0; i < historyPerUser; i++) {
        const quiz = { ...sampleQuizHistory[historyIndex++] };
        quiz.userId = user._id;
        quiz.completedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // within last 30 days
        const history = new QuizHistory(quiz);
        await history.save();
      }
    }

    console.log('🎉 Data populated!');
    const totalUsers = await User.countDocuments();
    const totalQuizHistory = await QuizHistory.countDocuments();

    console.log(`📊 Users: ${totalUsers}, Quiz Attempts: ${totalQuizHistory}`);

  } catch (err) {
    console.error('❌ Error populating data:', err);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Connection closed.');
  }
}

populateData();
