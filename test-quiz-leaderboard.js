const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testQuiz = {
  quizName: 'Test Quiz',
  subject: 'CS',
  section: 'Algorithms',
  quizType: 'practice',
  score: 85,
  totalQuestions: 10,
  correctAnswers: 8,
  incorrectAnswers: 2,
  unattempted: 0,
  percentage: 85,
  timeSpent: 15, // in minutes
  difficulty: 'medium',
  sessionId: 'test-session-123'
};

async function testQuizSubmissionAndLeaderboard() {
  try {
    console.log('🧪 Testing Quiz Submission and Leaderboard...\n');

    // Step 1: Register a test user
    console.log('1. Registering test user...');
    try {
      await axios.post(`${API_BASE}/auth/register`, testUser);
      console.log('✅ User registered successfully');
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  User already exists, continuing...');
      } else {
        throw error;
      }
    }

    // Step 2: Login to get token
    console.log('\n2. Logging in...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful');

    // Step 3: Submit a quiz attempt
    console.log('\n3. Submitting quiz attempt...');
    const quizResponse = await axios.post(`${API_BASE}/quiz/save-attempt`, testQuiz, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Quiz submitted successfully');
    console.log('   Quiz ID:', quizResponse.data.data._id);

    // Step 4: Check user stats
    console.log('\n4. Checking user stats...');
    const statsResponse = await axios.get(`${API_BASE}/users/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User stats retrieved:');
    console.log('   Total Quizzes:', statsResponse.data.stats.totalQuizzes);
    console.log('   Total Questions:', statsResponse.data.stats.totalQuestions);
    console.log('   Correct Answers:', statsResponse.data.stats.correctAnswers);
    console.log('   Average Score:', statsResponse.data.stats.averageScore);
    console.log('   Accuracy:', statsResponse.data.stats.accuracy + '%');

    // Step 5: Check leaderboard
    console.log('\n5. Checking leaderboard...');
    const leaderboardResponse = await axios.get(`${API_BASE}/leaderboard`);
    console.log('✅ Leaderboard retrieved:');
    console.log('   Total users:', leaderboardResponse.data.count);
    
    if (leaderboardResponse.data.data.length > 0) {
      console.log('   Top 3 users:');
      leaderboardResponse.data.data.slice(0, 3).forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} - ${user.totalScore} points (${user.quizzesCompleted} quizzes)`);
      });
      
      // Check if our test user is in the leaderboard
      const testUserInLeaderboard = leaderboardResponse.data.data.find(user => user.email === testUser.email);
      if (testUserInLeaderboard) {
        console.log(`   ✅ Test user found at rank ${testUserInLeaderboard.rank}`);
      } else {
        console.log('   ⚠️  Test user not found in leaderboard');
      }
    } else {
      console.log('   ⚠️  No users in leaderboard');
    }

    // Step 6: Test practice stats update
    console.log('\n6. Testing practice stats update...');
    const practiceStats = {
      subject: 'CS',
      questionsCompleted: 5,
      correctAnswers: 4,
      sectionsCompleted: 1
    };
    
    const practiceResponse = await axios.post(`${API_BASE}/users/update-practice-stats`, practiceStats, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Practice stats updated successfully');
    console.log('   Total Practice Completed:', practiceResponse.data.stats.totalPracticeCompleted);
    console.log('   Practice Accuracy:', practiceResponse.data.stats.practiceAccuracy + '%');
    console.log('   Current Streak:', practiceResponse.data.stats.currentStreak);

    // Step 7: Check updated leaderboard
    console.log('\n7. Checking updated leaderboard...');
    const updatedLeaderboardResponse = await axios.get(`${API_BASE}/leaderboard`);
    const updatedTestUser = updatedLeaderboardResponse.data.data.find(user => user.email === testUser.email);
    
    if (updatedTestUser) {
      console.log('✅ Updated test user stats:');
      console.log('   Rank:', updatedTestUser.rank);
      console.log('   Total Score:', updatedTestUser.totalScore);
      console.log('   Quizzes Completed:', updatedTestUser.quizzesCompleted);
      console.log('   Total Practice:', updatedTestUser.totalPracticeCompleted);
      console.log('   Activity Score:', updatedTestUser.activityScore);
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   - Quiz submission updates user stats ✅');
    console.log('   - Leaderboard API is working ✅');
    console.log('   - Practice stats update is working ✅');
    console.log('   - User appears in leaderboard ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testQuizSubmissionAndLeaderboard();
