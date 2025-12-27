const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Test endpoint to verify AI route is working
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI route is working!',
    timestamp: new Date().toISOString()
  });
});

// AI Chat endpoint
router.post('/chat', protect, async (req, res) => {
  try {
    console.log('AI Chat request received:', req.body);
    const { message, subject } = req.body;

    if (!message || !message.trim()) {
      console.log('No message provided');
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    console.log('Generating AI response for:', message);

    // Generate offline AI response
    const aiResponse = generateAIResponse(message, subject);

    console.log('Generated response:', aiResponse);

    res.status(200).json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'AI service temporarily unavailable',
      error: error.message
    });
  }
});

// Offline AI response generator
function generateAIResponse(message, subject) {
  const lowerMessage = message.toLowerCase();

  // Time complexity questions
  if (lowerMessage.includes('time complexity') || lowerMessage.includes('big o')) {
    return 'Time complexity measures how the runtime of an algorithm grows with input size. Big O notation expresses the upper bound in simple terms.';
  }

  // Algorithm questions
  if (lowerMessage.includes('algorithm') || lowerMessage.includes('sorting') || lowerMessage.includes('searching')) {
    return 'An algorithm is a step-by-step procedure to solve a problem efficiently. Common examples include sorting and searching algorithms.';
  }

  // Data structure questions
  if (lowerMessage.includes('data structure') || lowerMessage.includes('stack') || lowerMessage.includes('queue') || lowerMessage.includes('tree') || lowerMessage.includes('graph')) {
    return 'A data structure organizes and stores data efficiently. Examples include arrays, stacks, queues, trees, and graphs.';
  }

  // Math questions
  if (lowerMessage.includes('probability') || lowerMessage.includes('statistics') || lowerMessage.includes('calculus')) {
    return 'Mathematical concepts like probability, statistics, and calculus form the foundation for problem-solving in GATE.';
  }

  // General GATE preparation
  if (lowerMessage.includes('gate') || lowerMessage.includes('exam') || lowerMessage.includes('preparation')) {
    return 'GATE preparation involves studying core subjects, practicing problems, and taking mock tests to improve speed and accuracy.';
  }

  // Default response
  return `Definition: ${message} is an important concept. Focus on understanding its key points and typical use cases in GATE exams.`;
}

module.exports = router;
