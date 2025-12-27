// Test script to verify AI endpoint is working
const fetch = require('node-fetch');

async function testAIEndpoint() {
  try {
    console.log('Testing AI endpoint...');
    
    // Test the test endpoint first
    const testResponse = await fetch('http://localhost:5000/api/ai/test');
    const testData = await testResponse.json();
    console.log('Test endpoint response:', testData);
    
    if (!testData.success) {
      console.error('Test endpoint failed');
      return;
    }
    
    // Test the chat endpoint (this will fail without auth, but we can see the error)
    const chatResponse = await fetch('http://localhost:5000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid-token'
      },
      body: JSON.stringify({
        message: 'How to solve recurrence relations?',
        subject: 'CS',
        userId: 'test-user',
        context: {
          userLevel: 'GATE Aspirant',
          examType: 'GATE',
          preferredStyle: 'step-by-step'
        }
      })
    });
    
    const chatData = await chatResponse.json();
    console.log('Chat endpoint response:', chatData);
    
  } catch (error) {
    console.error('Error testing AI endpoint:', error.message);
    console.log('Make sure the server is running on port 5000');
  }
}

testAIEndpoint();
