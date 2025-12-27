const axios = require('axios');

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000';

async function testQuizPerformanceAPI() {
  try {
    console.log('🧪 Testing Quiz Performance API...\n');

    // Test 1: Get performance summary
    console.log('1. Testing GET /api/quiz/performance-summary...');
    try {
      const response = await axios.get('/api/quiz/performance-summary');
      console.log('✅ Success! Found', response.data.data.length, 'quiz summaries');
      console.log('Sample data:', response.data.data[0]);
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    console.log('\n2. Testing GET /api/quiz/recent-attempts...');
    try {
      const response = await axios.get('/api/quiz/recent-attempts?limit=5');
      console.log('✅ Success! Found', response.data.data.length, 'recent attempts');
      console.log('Sample data:', response.data.data[0]);
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    console.log('\n3. Testing GET /api/quiz/performance-trends...');
    try {
      const response = await axios.get('/api/quiz/performance-trends?days=30');
      console.log('✅ Success! Found', response.data.data.length, 'trend data points');
      console.log('Sample data:', response.data.data[0]);
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Quiz Performance API tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testQuizPerformanceAPI();
