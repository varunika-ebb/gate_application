const User = require('../models/User');

// Sample user data for testing leaderboard
const sampleUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    stats: {
      totalScore: 850,
      quizzesCompleted: 12,
      totalQuestions: 180,
      correctAnswers: 162,
      totalTimeSpent: 240,
      averageScore: 70.8,
      lastActive: new Date(),
      currentStreak: 7,
      longestStreak: 15,
      practiceStats: {
        cs: { questionsCompleted: 45, correctAnswers: 41, sectionsCompleted: 3, lastPracticed: new Date() },
        da: { questionsCompleted: 32, correctAnswers: 28, sectionsCompleted: 2, lastPracticed: new Date() },
        ga: { questionsCompleted: 28, correctAnswers: 25, sectionsCompleted: 2, lastPracticed: new Date() }
      }
    }
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password123',
    stats: {
      totalScore: 720,
      quizzesCompleted: 10,
      totalQuestions: 150,
      correctAnswers: 135,
      totalTimeSpent: 200,
      averageScore: 72.0,
      lastActive: new Date(),
      currentStreak: 3,
      longestStreak: 8,
      practiceStats: {
        cs: { questionsCompleted: 38, correctAnswers: 34, sectionsCompleted: 2, lastPracticed: new Date() },
        da: { questionsCompleted: 25, correctAnswers: 22, sectionsCompleted: 1, lastPracticed: new Date() },
        ga: { questionsCompleted: 22, correctAnswers: 19, sectionsCompleted: 1, lastPracticed: new Date() }
      }
    }
  },
  {
    name: 'Carol Davis',
    email: 'carol@example.com',
    password: 'password123',
    stats: {
      totalScore: 950,
      quizzesCompleted: 15,
      totalQuestions: 225,
      correctAnswers: 207,
      totalTimeSpent: 300,
      averageScore: 63.3,
      lastActive: new Date(),
      currentStreak: 12,
      longestStreak: 20,
      practiceStats: {
        cs: { questionsCompleted: 52, correctAnswers: 48, sectionsCompleted: 4, lastPracticed: new Date() },
        da: { questionsCompleted: 38, correctAnswers: 35, sectionsCompleted: 3, lastPracticed: new Date() },
        ga: { questionsCompleted: 35, correctAnswers: 32, sectionsCompleted: 3, lastPracticed: new Date() }
      }
    }
  },
  {
    name: 'David Wilson',
    email: 'david@example.com',
    password: 'password123',
    stats: {
      totalScore: 680,
      quizzesCompleted: 8,
      totalQuestions: 120,
      correctAnswers: 108,
      totalTimeSpent: 160,
      averageScore: 85.0,
      lastActive: new Date(),
      currentStreak: 1,
      longestStreak: 5,
      practiceStats: {
        cs: { questionsCompleted: 30, correctAnswers: 27, sectionsCompleted: 2, lastPracticed: new Date() },
        da: { questionsCompleted: 20, correctAnswers: 18, sectionsCompleted: 1, lastPracticed: new Date() },
        ga: { questionsCompleted: 18, correctAnswers: 16, sectionsCompleted: 1, lastPracticed: new Date() }
      }
    }
  },
  {
    name: 'Eva Brown',
    email: 'eva@example.com',
    password: 'password123',
    stats: {
      totalScore: 890,
      quizzesCompleted: 14,
      totalQuestions: 210,
      correctAnswers: 189,
      totalTimeSpent: 280,
      averageScore: 63.6,
      lastActive: new Date(),
      currentStreak: 5,
      longestStreak: 12,
      practiceStats: {
        cs: { questionsCompleted: 48, correctAnswers: 43, sectionsCompleted: 3, lastPracticed: new Date() },
        da: { questionsCompleted: 35, correctAnswers: 31, sectionsCompleted: 2, lastPracticed: new Date() },
        ga: { questionsCompleted: 32, correctAnswers: 29, sectionsCompleted: 2, lastPracticed: new Date() }
      }
    }
  }
];

// Function to populate database with sample data
const populateSampleData = async () => {
  try {
    console.log('Starting to populate sample data...');
    
    for (const userData of sampleUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`Created user: ${userData.name}`);
      } else {
        console.log(`User already exists: ${userData.name}`);
      }
    }
    
    console.log('Sample data population completed!');
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
};

// Function to clear sample data
const clearSampleData = async () => {
  try {
    console.log('Clearing sample data...');
    
    for (const userData of sampleUsers) {
      await User.deleteOne({ email: userData.email });
      console.log(`Deleted user: ${userData.name}`);
    }
    
    console.log('Sample data cleared!');
  } catch (error) {
    console.error('Error clearing sample data:', error);
  }
};

module.exports = {
  populateSampleData,
  clearSampleData,
  sampleUsers
};
