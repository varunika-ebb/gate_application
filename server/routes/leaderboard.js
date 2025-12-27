const express = require('express');
const User = require('../models/User');
const QuizHistory = require('../models/QuizHistory');

const router = express.Router();

// Build a unified leaderboard entry from a User document
const buildEntry = (user, index) => {
  const csPractice = user.stats?.practiceStats?.cs?.questionsCompleted || 0;
  const daPractice = user.stats?.practiceStats?.da?.questionsCompleted || 0;
  const gaPractice = user.stats?.practiceStats?.ga?.questionsCompleted || 0;

  const totalPracticeCompleted = csPractice + daPractice + gaPractice;

  const totalSectionsCompleted =
    (user.stats?.practiceStats?.cs?.sectionsCompleted || 0) +
    (user.stats?.practiceStats?.da?.sectionsCompleted || 0) +
    (user.stats?.practiceStats?.ga?.sectionsCompleted || 0);

  const quizzesCompleted = user.stats?.quizzesCompleted || user.stats?.totalQuizzes || 0;
  const totalScore = user.stats?.totalScore || user.stats?.averageScore || 0;
  const totalQuestions = user.stats?.totalQuestions || 0;
  const correctAnswers = user.stats?.correctAnswers || 0;
  const accuracy = user.accuracy ?? (totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0);

  const averageScore = quizzesCompleted > 0 ? Number((totalScore / quizzesCompleted).toFixed(2)) : 0;
  const currentStreak = user.stats?.currentStreak || 0;
  const longestStreak = user.stats?.longestStreak || 0;
  const lastActive = user.stats?.lastActive || user.createdAt;

  // activityScore virtual if available; otherwise compute compatible fallback
  const activityScore = typeof user.activityScore === 'number'
    ? user.activityScore
    : (totalScore + totalPracticeCompleted * 10 + currentStreak * 5);

  return {
    rank: index + 1,
    name: user.name,
    email: user.email,
    totalScore,
    quizzesCompleted,
    totalQuestions,
    correctAnswers,
    accuracy,
    joinedDate: user.createdAt,
    averageScore,
    totalPracticeCompleted,
    totalSectionsCompleted,
    practiceAccuracy: user.practiceAccuracy ?? (totalPracticeCompleted ? Math.round(((user.stats?.practiceStats?.cs?.correctAnswers || 0) + (user.stats?.practiceStats?.da?.correctAnswers || 0) + (user.stats?.practiceStats?.ga?.correctAnswers || 0)) / totalPracticeCompleted * 100) : 0),
    activityScore,
    currentStreak,
    longestStreak,
    lastActive,
    csPractice,
    daPractice,
    gaPractice
  };
};

// Helper: aggregate quiz stats from QuizHistory to align with dashboard summary
const aggregateQuizStats = async () => {
  const userQuizAgg = await QuizHistory.aggregate([
    {
      $group: {
        _id: '$userId',
        attempts: { $sum: 1 },
        totalQuestions: { $sum: '$totalQuestions' },
        totalCorrect: { $sum: '$correctAnswers' },
        quizzesSet: {
          $addToSet: {
            $concat: [
              {$toString: '$quizName'}, '|', {$toString: '$subject'}, '|', {$toString: '$quizType'}, '|', {$ifNull: ['$section', '']}
            ]
          }
        },
        lastAttempt: { $max: '$completedAt' }
      }
    },
    {
      $project: {
        userId: '$_id',
        _id: 0,
        attempts: 1,
        totalQuestions: 1,
        totalCorrect: 1,
        totalQuizzes: { $size: '$quizzesSet' },
        averageScore: {
          $cond: [
            { $gt: ['$totalQuestions', 0] },
            { $round: [{ $multiply: [{ $divide: ['$totalCorrect', '$totalQuestions'] }, 100] }, 0] },
            0
          ]
        },
        lastAttempt: 1
      }
    }
  ]);

  // Convert to map by userId string
  const map = new Map();
  userQuizAgg.forEach((row) => map.set(String(row.userId), row));
  return map;
};

// GET /api/leaderboard (overall)
router.get('/', async (req, res) => {
  try {
    const quizMap = await aggregateQuizStats();
    const users = await User.find({}).sort({ createdAt: 1 });

    // Merge quiz aggregates with user profile/practice
    const merged = users.map((user) => {
      const q = quizMap.get(String(user._id)) || {
        attempts: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalQuizzes: 0,
        averageScore: 0,
        lastAttempt: user.createdAt
      };

      const entry = buildEntry(user, 0); // temp index; we'll sort and set rank below
      return {
        ...entry,
        // Override with dashboard-aligned quiz stats
        quizzesCompleted: q.totalQuizzes,
        totalQuestions: q.totalQuestions,
        correctAnswers: q.totalCorrect,
        accuracy: q.averageScore,
        averageScore: q.averageScore,
        lastActive: q.lastAttempt || entry.lastActive,
        // Recompute activity score to align with dashboard-derived accuracy
        activityScore: (q.averageScore || 0) + (entry.totalPracticeCompleted || 0) * 10 + (entry.currentStreak || 0) * 5
      };
    });

    // Only include users with any activity: quiz attempts or practice
    const activeUsers = merged.filter(u => (u.quizzesCompleted > 0) || (u.totalPracticeCompleted > 0));

    // Ranking by overall: prioritize accuracy (avg score), then practice, then streak, then recency
    activeUsers.sort((a, b) => {
      const byScore = (b.accuracy || 0) - (a.accuracy || 0);
      if (byScore !== 0) return byScore;
      const byPractice = (b.totalPracticeCompleted || 0) - (a.totalPracticeCompleted || 0);
      if (byPractice !== 0) return byPractice;
      const byStreak = (b.currentStreak || 0) - (a.currentStreak || 0);
      if (byStreak !== 0) return byStreak;
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    });

    // Assign ranks
    const ranked = activeUsers.map((u, idx) => ({ ...u, rank: idx + 1 }));

    res.status(200).json({ success: true, data: ranked });
  } catch (error) {
    console.error('Error fetching leaderboard (overall):', error);
    res.status(500).json({ success: false, message: 'Error fetching leaderboard data' });
  }
});

// GET /api/leaderboard/practice
router.get('/practice', async (req, res) => {
  try {
    const quizMap = await aggregateQuizStats();
    const users = await User.find({});
    const data = users.map((u) => {
      const base = buildEntry(u, 0);
      const q = quizMap.get(String(u._id));
      const accuracyFromDash = q?.averageScore ?? base.accuracy;
      return {
        ...base,
        accuracy: accuracyFromDash,
        quizzesCompleted: q?.totalQuizzes ?? base.quizzesCompleted
      };
    }).sort((a, b) => (b.totalPracticeCompleted || 0) - (a.totalPracticeCompleted || 0));

    const activeUsers = data.filter((u) => u.totalPracticeCompleted > 0);
    const ranked = activeUsers.map((u, idx) => ({ ...u, rank: idx + 1 }));
    res.status(200).json({ success: true, data: ranked });
  } catch (error) {
    console.error('Error fetching leaderboard (practice):', error);
    res.status(500).json({ success: false, message: 'Error fetching leaderboard data' });
  }
});

// GET /api/leaderboard/streaks
router.get('/streaks', async (req, res) => {
  try {
    const quizMap = await aggregateQuizStats();
    const users = await User.find({});
    const data = users.map((u) => {
      const base = buildEntry(u, 0);
      const q = quizMap.get(String(u._id));
      const accuracyFromDash = q?.averageScore ?? base.accuracy;
      return {
        ...base,
        accuracy: accuracyFromDash,
        quizzesCompleted: q?.totalQuizzes ?? base.quizzesCompleted
      };
    }).sort((a, b) => (b.currentStreak || 0) - (a.currentStreak || 0));

    const activeUsers = data.filter((u) => u.currentStreak > 0 || u.longestStreak > 0);
    const ranked = activeUsers.map((u, idx) => ({ ...u, rank: idx + 1 }));
    res.status(200).json({ success: true, data: ranked });
  } catch (error) {
    console.error('Error fetching leaderboard (streaks):', error);
    res.status(500).json({ success: false, message: 'Error fetching leaderboard data' });
  }
});

module.exports = router;
