const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gate-quiz', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gatequiz.com' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists');
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gatequiz.com',
      password: 'Admin123!', // Change this to a secure password
      role: 'admin',
      profile: {
        phone: '+1234567890',
        college: 'Admin College',
        branch: 'Administration',
        graduationYear: 2025,
        targetExam: 'GATE-2026'
      },
      preferences: {
        subjects: ['CS', 'DA', 'GA'],
        difficulty: 'mixed',
        notifications: {
          email: true,
          browser: true
        }
      },
      stats: {
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        lastActive: new Date(),
        totalScore: 0,
        quizzesCompleted: 0,
        practiceStats: {
          cs: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: new Date() },
          da: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: new Date() },
          ga: { questionsCompleted: 0, correctAnswers: 0, sectionsCompleted: 0, lastPracticed: new Date() }
        },
        achievements: [],
        currentStreak: 0,
        longestStreak: 0,
        lastPracticeDate: new Date()
      },
      isEmailVerified: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gatequiz.com');
    console.log('🔑 Password: Admin123!');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the script
createAdminUser();
