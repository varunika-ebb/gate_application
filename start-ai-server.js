// Simple script to start the server and test AI endpoint
const { spawn } = require('child_process');
const fetch = require('node-fetch');

console.log('🚀 Starting GATE Quiz Server with AI Assistant...\n');

// Start the server
const server = spawn('node', ['server.js'], {
  cwd: './server',
  stdio: 'inherit'
});

// Wait for server to start
setTimeout(async () => {
  console.log('\n🔍 Testing AI endpoint...');
  
  try {
    // Test basic connectivity
    const response = await fetch('http://localhost:5000/api/ai/test');
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ AI endpoint is working!');
      console.log('🤖 AI Assistant is ready to help with GATE preparation');
      console.log('\n📝 Available features:');
      console.log('   • Step-by-step problem solving');
      console.log('   • Concept explanations');
      console.log('   • Formula derivations');
      console.log('   • Exam strategies');
      console.log('   • Doubt clarification');
      console.log('\n🌐 Access the app at: http://localhost:3001');
    } else {
      console.log('❌ AI endpoint test failed');
    }
  } catch (error) {
    console.log('❌ Server not responding. Make sure MongoDB is running.');
    console.log('💡 Try: mongod (in another terminal)');
  }
}, 3000);

// Handle server exit
server.on('close', (code) => {
  console.log(`\n🛑 Server stopped with code ${code}`);
});

// Handle errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

console.log('⏳ Starting server... (this may take a few seconds)');
