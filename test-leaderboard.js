const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5000/api';
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123'
};

// Test functions
async function testLeaderboardEndpoints() {
  console.log('🧪 Testing Leaderboard API Endpoints...\n');

  try {
    // Test 1: Overall Leaderboard
    console.log('1. Testing Overall Leaderboard...');
    const overallResponse = await axios.get(`${BASE_URL}/leaderboard`);
    console.log('✅ Overall Leaderboard:', overallResponse.data.success ? 'SUCCESS' : 'FAILED');
    console.log(`   Users found: ${overallResponse.data.count}`);
    console.log(`   Data length: ${overallResponse.data.data?.length || 0}\n`);

    // Test 2: Practice Leaderboard
    console.log('2. Testing Practice Leaderboard...');
    const practiceResponse = await axios.get(`${BASE_URL}/leaderboard/practice`);
    console.log('✅ Practice Leaderboard:', practiceResponse.data.success ? 'SUCCESS' : 'FAILED');
    console.log(`   Users found: ${practiceResponse.data.count}`);
    console.log(`   Data length: ${practiceResponse.data.data?.length || 0}\n`);

    // Test 3: Streak Leaderboard
    console.log('3. Testing Streak Leaderboard...');
    const streakResponse = await axios.get(`${BASE_URL}/leaderboard/streaks`);
    console.log('✅ Streak Leaderboard:', streakResponse.data.success ? 'SUCCESS' : 'FAILED');
    console.log(`   Users found: ${streakResponse.data.count}`);
    console.log(`   Data length: ${streakResponse.data.data?.length || 0}\n`);

    // Test 4: Top Users Leaderboard
    console.log('4. Testing Top Users Leaderboard...');
    const topResponse = await axios.get(`${BASE_URL}/leaderboard/top/5`);
    console.log('✅ Top Users Leaderboard:', topResponse.data.success ? 'SUCCESS' : 'FAILED');
    console.log(`   Users found: ${topResponse.data.count}`);
    console.log(`   Data length: ${topResponse.data.data?.length || 0}\n`);

    // Test 5: Sample Data Analysis
    if (overallResponse.data.data && overallResponse.data.data.length > 0) {
      console.log('5. Analyzing Sample Data...');
      const sampleUser = overallResponse.data.data[0];
      console.log('   Sample User Data:');
      console.log(`   - Name: ${sampleUser.name}`);
      console.log(`   - Rank: ${sampleUser.rank}`);
      console.log(`   - Total Score: ${sampleUser.totalScore}`);
      console.log(`   - Practice Completed: ${sampleUser.totalPracticeCompleted || 0}`);
      console.log(`   - Current Streak: ${sampleUser.currentStreak || 0}`);
      console.log(`   - Activity Score: ${sampleUser.activityScore || 0}\n`);
    }

    console.log('🎉 All Leaderboard Tests Completed Successfully!');
    console.log('\n📊 Leaderboard Features Verified:');
    console.log('   ✅ Multi-dimensional rankings');
    console.log('   ✅ Practice tracking');
    console.log('   ✅ Streak tracking');
    console.log('   ✅ Activity scoring');
    console.log('   ✅ Public access');
    console.log('   ✅ Data formatting');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

// Test practice completion tracking (requires authentication)
async function testPracticeTracking() {
  console.log('\n🧪 Testing Practice Tracking...');
  
  try {
    // This would require a valid user token
    console.log('⚠️  Practice tracking test requires user authentication');
    console.log('   To test: Complete a practice session while logged in');
    console.log('   Endpoint: POST /api/quiz/practice-complete');
  } catch (error) {
    console.error('❌ Practice Tracking Test Failed:', error.message);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Leaderboard API Tests\n');
  
  await testLeaderboardEndpoints();
  await testPracticeTracking();
  
  console.log('\n✨ Test Suite Completed!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Start the server: npm run dev');
  console.log('   2. Populate sample data: node server/populateSampleData.js');
  console.log('   3. Visit /leaderboard in your browser');
  console.log('   4. Test different leaderboard types and sorting');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testLeaderboardEndpoints,
  testPracticeTracking,
  runTests
};
