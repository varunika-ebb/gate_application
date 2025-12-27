const express = require('express');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      stats: {
        totalQuizzes: user.stats.totalQuizzes,
        totalQuestions: user.stats.totalQuestions,
        correctAnswers: user.stats.correctAnswers,
        totalTimeSpent: user.stats.totalTimeSpent,
        averageScore: user.stats.averageScore,
        accuracy: user.accuracy,
        lastActive: user.stats.lastActive
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/users/update-stats
// @desc    Update user quiz statistics
// @access  Private
router.post('/update-stats', protect, async (req, res) => {
  try {
    const { totalQuestions, correctAnswers, timeSpent, score } = req.body;

    if (!totalQuestions || correctAnswers === undefined || !timeSpent || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required quiz data'
      });
    }

    const user = await User.findById(req.user.id);
    
    await user.updateStats({
      totalQuestions,
      correctAnswers,
      timeSpent,
      score
    });

    res.status(200).json({
      success: true,
      message: 'Statistics updated successfully',
      stats: {
        totalQuizzes: user.stats.totalQuizzes,
        totalQuestions: user.stats.totalQuestions,
        correctAnswers: user.stats.correctAnswers,
        totalTimeSpent: user.stats.totalTimeSpent,
        averageScore: user.stats.averageScore,
        accuracy: user.accuracy
      }
    });
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/users/update-practice-stats
// @desc    Update user practice statistics
// @access  Private
router.post('/update-practice-stats', protect, async (req, res) => {
  try {
    const { subject, questionsCompleted, correctAnswers, sectionsCompleted = 0 } = req.body;

    if (!subject || questionsCompleted === undefined || correctAnswers === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required practice data'
      });
    }

    const user = await User.findById(req.user.id);
    
    await user.updatePracticeStats(subject, questionsCompleted, correctAnswers, sectionsCompleted);

    res.status(200).json({
      success: true,
      message: 'Practice statistics updated successfully',
      stats: {
        practiceStats: user.stats.practiceStats,
        currentStreak: user.stats.currentStreak,
        longestStreak: user.stats.longestStreak,
        totalPracticeCompleted: user.totalPracticeCompleted,
        practiceAccuracy: user.practiceAccuracy
      }
    });
  } catch (error) {
    console.error('Update practice stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get leaderboard (top users by average score)
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({
      'stats.totalQuizzes': { $gt: 0 }
    })
    .select('name profile.college stats.averageScore stats.totalQuizzes')
    .sort({ 'stats.averageScore': -1, 'stats.totalQuizzes': -1 })
    .limit(limit)
    .skip(skip);

    const total = await User.countDocuments({
      'stats.totalQuizzes': { $gt: 0 }
    });

    res.status(200).json({
      success: true,
      data: users.map((user, index) => ({
        rank: skip + index + 1,
        name: user.name,
        college: user.profile.college || 'Not specified',
        averageScore: user.stats.averageScore,
        totalQuizzes: user.stats.totalQuizzes
      })),
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Admin only routes
// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID (Admin only)
// @access  Private/Admin
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/admin/dashboard
// @desc    Get admin dashboard data with all users' progress
// @access  Private/Admin
router.get('/admin/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const QuizHistory = require('../models/QuizHistory');
    
    // Get all users with their stats
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    // Get recent quiz attempts across all users
    const recentAttempts = await QuizHistory.find()
      .populate('userId', 'name email')
      .sort({ completedAt: -1 })
      .limit(20);

    // Get platform statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      'stats.lastActive': { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    const totalQuizzes = await QuizHistory.countDocuments();
    const totalQuestions = await QuizHistory.aggregate([
      { $group: { _id: null, total: { $sum: '$totalQuestions' } } }
    ]);

    // Get subject-wise statistics
    const subjectStats = await QuizHistory.aggregate([
      {
        $group: {
          _id: '$subject',
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: '$percentage' },
          totalQuestions: { $sum: '$totalQuestions' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        platformStats: {
          totalUsers,
          activeUsers,
          totalQuizzes,
          totalQuestions: totalQuestions[0]?.total || 0
        },
        subjectStats,
        recentAttempts,
        users: users.map(user => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          lastActive: user.stats.lastActive,
          stats: {
            totalQuizzes: user.stats.totalQuizzes,
            totalQuestions: user.stats.totalQuestions,
            correctAnswers: user.stats.correctAnswers,
            averageScore: user.stats.averageScore,
            accuracy: user.accuracy,
            currentStreak: user.stats.currentStreak,
            longestStreak: user.stats.longestStreak,
            practiceStats: user.stats.practiceStats
          }
        }))
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/admin/progress/:userId
// @desc    Get detailed progress for a specific user (Admin only)
// @access  Private/Admin
router.get('/admin/progress/:userId', protect, adminOnly, async (req, res) => {
  try {
    const QuizHistory = require('../models/QuizHistory');
    
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's quiz history
    const quizHistory = await QuizHistory.find({ userId: req.params.userId })
      .sort({ completedAt: -1 });

    // Get performance trends (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const performanceTrends = await QuizHistory.aggregate([
      {
        $match: {
          userId: user._id,
          completedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
          },
          dailyScore: { $avg: '$percentage' },
          attempts: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get subject-wise performance
    const subjectPerformance = await QuizHistory.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: '$subject',
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: '$percentage' },
          bestScore: { $max: '$percentage' },
          totalQuestions: { $sum: '$totalQuestions' },
          correctAnswers: { $sum: '$correctAnswers' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          lastActive: user.stats.lastActive,
          stats: user.stats,
          accuracy: user.accuracy
        },
        quizHistory,
        performanceTrends,
        subjectPerformance
      }
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/admin/analytics
// @desc    Get platform analytics (Admin only)
// @access  Private/Admin
router.get('/admin/analytics', protect, adminOnly, async (req, res) => {
  try {
    const QuizHistory = require('../models/QuizHistory');
    
    // Get user registration trends (last 6 months)
    const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    const registrationTrends = await User.aggregate([
      {
        $match: { createdAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get quiz activity trends
    const quizActivityTrends = await QuizHistory.aggregate([
      {
        $match: { completedAt: { $gte: sixMonthsAgo } }
      },
      {
        $group: {
          _id: {
            year: { $year: '$completedAt' },
            month: { $month: '$completedAt' }
          },
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: '$percentage' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Get top performers
    const topPerformers = await User.find({
      'stats.totalQuizzes': { $gt: 0 }
    })
    .select('name email stats.averageScore stats.totalQuizzes')
    .sort({ 'stats.averageScore': -1 })
    .limit(10);

    // Get most active users
    const mostActiveUsers = await User.find({
      'stats.lastActive': { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })
    .select('name email stats.lastActive stats.totalQuizzes')
    .sort({ 'stats.lastActive': -1 })
    .limit(10);

    res.status(200).json({
      success: true,
      data: {
        registrationTrends,
        quizActivityTrends,
        topPerformers,
        mostActiveUsers
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
