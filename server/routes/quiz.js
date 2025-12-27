const express = require('express');
const { optionalAuth, protect } = require('../middleware/auth');
const User = require('../models/User');
const QuizHistory = require('../models/QuizHistory');

const router = express.Router();

// Shared in-memory sample questions for demo purposes (replace with DB in production)
const SAMPLE_QUESTIONS_BY_SUBJECT = {
  CS: [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
      section: "Algorithms",
      difficulty: "easy",
      marks: 1
    },
    {
      id: 2,
      question: "Which data structure is used for implementing recursion?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation: "Stack is used for implementing recursion as it follows LIFO (Last In First Out) principle.",
      section: "Programming and Data Structures",
      difficulty: "easy",
      marks: 1
    }
  ],
  DA: [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2"],
      correctAnswer: 1,
      explanation: "The derivative of x² is 2x using the power rule.",
      section: "Calculus and Optimization",
      difficulty: "easy",
      marks: 1
    }
  ],
  GA: [
    {
      id: 1,
      question: "If 2x + 3 = 11, what is the value of x?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "2x + 3 = 11, so 2x = 8, therefore x = 4.",
      section: "Numerical Ability",
      difficulty: "easy",
      marks: 1
    }
  ]
};

// @route   GET /api/quiz/health
// @desc    Quiz API health check
// @access  Public
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Quiz API is working',
    timestamp: new Date().toISOString()
  });
});

// @route   GET /api/quiz/subjects
// @desc    Get available subjects
// @access  Public
router.get('/subjects', optionalAuth, (req, res) => {
  try {
    const subjects = [
      {
        code: 'CS',
        name: 'Computer Science',
        description: 'Computer Science and Information Technology',
        sections: [
          'Programming and Data Structures',
          'Algorithms',
          'Theory of Computation',
          'Compiler Design',
          'Operating System',
          'Databases',
          'Computer Networks',
          'Digital Logic',
          'Computer Organization and Architecture',
          'Discrete Mathematics'
        ]
      },
      {
        code: 'DA',
        name: 'Data Science and AI',
        description: 'Data Science and Artificial Intelligence',
        sections: [
          'Linear Algebra',
          'Calculus and Optimization',
          'Probability and Statistics',
          'Programming, Data Structures and Algorithms',
          'Database Management and Warehousing',
          'Machine Learning',
          'Artificial Intelligence'
        ]
      },
      {
        code: 'GA',
        name: 'General Aptitude',
        description: 'General Aptitude for all GATE papers',
        sections: [
          'Verbal Ability',
          'Numerical Ability'
        ]
      }
    ];

    res.status(200).json({
      success: true,
      data: subjects
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/quiz/questions
// @desc    Get questions across multiple subjects (or all)
// @access  Public
router.get('/questions', optionalAuth, (req, res) => {
  try {
    const { subjects = 'all', section, difficulty = 'mixed', limit = 10 } = req.query;

    // Determine which subjects to include
    const availableSubjects = Object.keys(SAMPLE_QUESTIONS_BY_SUBJECT);
    const subjectList = subjects === 'all'
      ? availableSubjects
      : subjects.split(',').map(s => s.trim().toUpperCase()).filter(s => availableSubjects.includes(s));

    let combined = [];

    subjectList.forEach((subj) => {
      let list = SAMPLE_QUESTIONS_BY_SUBJECT[subj] || [];

      if (section && section !== 'all') {
        list = list.filter(q => q.section === section);
      }

      if (difficulty !== 'mixed') {
        list = list.filter(q => q.difficulty === difficulty);
      }

      // Limit per subject to keep distribution even
      const limited = list.slice(0, parseInt(limit));
      // Tag with subject for the client
      combined = combined.concat(limited.map(q => ({ ...q, subject: subj })));
    });

    res.status(200).json({
      success: true,
      data: combined,
      total: combined.length,
      subjects: subjectList,
      section: section || 'all',
      difficulty
    });
  } catch (error) {
    console.error('Get multi-subject questions error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/quiz/questions/:subject
// @desc    Get questions for a subject
// @access  Public
router.get('/questions/:subject', optionalAuth, (req, res) => {
  try {
    const { subject } = req.params;
    const { section, limit = 10, difficulty = 'mixed' } = req.query;

    let questions = SAMPLE_QUESTIONS_BY_SUBJECT[subject.toUpperCase()] || [];

    // Filter by section if specified
    if (section && section !== 'all') {
      questions = questions.filter(q => q.section === section);
    }

    // Filter by difficulty if specified
    if (difficulty !== 'mixed') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Limit results
    questions = questions.slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: questions,
      total: questions.length,
      subject: subject.toUpperCase(),
      section: section || 'all',
      difficulty
    });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/quiz/save-attempt
// @desc    Save a quiz attempt to history
// @access  Private
router.post('/save-attempt', protect, async (req, res) => {
  try {
    const {
      quizName,
      subject,
      section,
      quizType,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      percentage,
      timeSpent,
      difficulty,
      sessionId
    } = req.body;

    // Calculate average time per question
    const averageTimePerQuestion = totalQuestions > 0 ? Math.round(timeSpent / totalQuestions) : 0;

    const quizAttempt = new QuizHistory({
      userId: req.user.id,
      quizName,
      subject,
      section,
      quizType,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      percentage,
      timeSpent,
      averageTimePerQuestion,
      difficulty,
      sessionId
    });

    await quizAttempt.save();

    // Update user's aggregate stats for consistency across dashboard and leaderboard
    try {
      const user = await User.findById(req.user.id);
      if (user && typeof user.updateStats === 'function') {
        await user.updateStats({
          totalQuestions,
          correctAnswers,
          timeSpent,
          score: percentage || score || 0
        });
      }
    } catch (statsErr) {
      console.error('Post-save stats update failed:', statsErr);
      // Do not fail the main request if stats update fails; it can be recomputed later
    }

    res.status(201).json({
      success: true,
      message: 'Quiz attempt saved successfully',
      data: quizAttempt
    });
  } catch (error) {
    console.error('Save quiz attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/quiz/performance-summary
// @desc    Get user's quiz performance summary
// @access  Private
router.get('/performance-summary', protect, async (req, res) => {
  try {
    const summary = await QuizHistory.getUserPerformanceSummary(req.user.id);
    
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get performance summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/quiz/recent-attempts
// @desc    Get user's recent quiz attempts
// @access  Private
router.get('/recent-attempts', protect, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const attempts = await QuizHistory.getRecentAttempts(req.user.id, parseInt(limit));
    
    res.status(200).json({
      success: true,
      data: attempts
    });
  } catch (error) {
    console.error('Get recent attempts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/quiz/performance-trends
// @desc    Get user's performance trends over time
// @access  Private
router.get('/performance-trends', protect, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const trends = await QuizHistory.getPerformanceTrends(req.user.id, parseInt(days));
    
    res.status(200).json({
      success: true,
      data: trends
    });
  } catch (error) {
    console.error('Get performance trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/quiz/attempts/:quizId
// @desc    Get detailed information about a specific quiz attempt
// @access  Private
router.get('/attempts/:quizId', protect, async (req, res) => {
  try {
    const quizAttempt = await QuizHistory.findOne({
      _id: req.params.quizId,
      userId: req.user.id
    });

    if (!quizAttempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quizAttempt
    });
  } catch (error) {
    console.error('Get quiz attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
