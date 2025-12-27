import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [leaderboardType, setLeaderboardType] = useState('overall');
  const [sortBy, setSortBy] = useState('rank');
  const { user } = useAuth();

  const leaderboardTypes = [
    { key: 'overall', label: '🏆 Overall Ranking', description: 'Combined quiz and practice performance' },
    { key: 'practice', label: '📚 Practice Masters', description: 'Ranked by practice question completion' },
    { key: 'streaks', label: '🔥 Streak Champions', description: 'Ranked by daily practice streaks' },
    { key: 'quizzes', label: '📝 Quiz Champions', description: 'Ranked by quiz performance only' }
  ];

  useEffect(() => {
    fetchLeaderboardData();
  }, [leaderboardType]);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = '/api/leaderboard';

      if (leaderboardType === 'practice') {
        endpoint = '/api/leaderboard/practice';
      } else if (leaderboardType === 'streaks') {
        endpoint = '/api/leaderboard/streaks';
      }

      const response = await axios.get(endpoint);

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        let data = response.data.data;
        
        // If no users, show empty state
        if (data.length === 0) {
          setLeaderboardData([]);
          setCurrentUserRank(null);
          setError('No users found. Complete some quizzes to appear on the leaderboard!');
          return;
        }
        
        data = sortLeaderboardData(data, sortBy);
        setLeaderboardData(data);

        // Get current user rank
        if (user) {
          const userRank = data.find(item => item.email === user.email);
          setCurrentUserRank(userRank);
        }
      } else {
        setError('No leaderboard data available. Complete some quizzes to appear on the leaderboard!');
        setLeaderboardData([]);
        setCurrentUserRank(null);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Leaderboard data could not be loaded. Please try again later.');
      setLeaderboardData([]);
      setCurrentUserRank(null);
    } finally {
      setLoading(false);
    }
  };

  const sortLeaderboardData = (data, sortField) => {
    return [...data].sort((a, b) => {
      switch (sortField) {
        case 'rank':
          return a.rank - b.rank;
        case 'score':
          return (b.totalScore || 0) - (a.totalScore || 0);
        case 'practice':
          return (b.totalPracticeCompleted || 0) - (a.totalPracticeCompleted || 0);
        case 'accuracy':
          return (b.accuracy || 0) - (a.accuracy || 0);
        case 'streak':
          return (b.currentStreak || 0) - (a.currentStreak || 0);
        case 'activity':
          return (b.activityScore || 0) - (a.activityScore || 0);
        default:
          return a.rank - b.rank;
      }
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedData = sortLeaderboardData(leaderboardData, newSortBy);
    setLeaderboardData(sortedData);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'rank-gold';
      case 2: return 'rank-silver';
      case 3: return 'rank-bronze';
      default: return 'rank-default';
    }
  };

  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case 'cs': return '💻';
      case 'da': return '🤖';
      case 'ga': return '🧠';
      default: return '📚';
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-page">
        <Header />
        <Breadcrumb />
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    const isNoDataError = error.includes('No users found') || error.includes('No leaderboard data available');
    
    return (
      <div className="leaderboard-page">
        <Header />
        <Breadcrumb />
        <div className="container">
          <div className={`message-container ${isNoDataError ? 'info-message' : 'error-message'}`}>
            <span className="message-icon">
              {isNoDataError ? '📊' : '⚠️'}
            </span>
            <div className="message-content">
              <h3>{isNoDataError ? 'Leaderboard Empty' : 'Error Loading Data'}</h3>
              <p>{error}</p>
              {isNoDataError && (
                <div className="action-buttons">
                  <button 
                    className="btn-primary" 
                    onClick={() => window.location.href = '/practice'}
                  >
                    Start Practicing
                  </button>
                  <button 
                    className="btn-secondary" 
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <Header />
      <Breadcrumb />

      <section className="leaderboard-section">
        <div className="container">
          <div className="leaderboard-header">
            <h1>🏆 GATE Quiz Leaderboard</h1>
            <p>Track your progress and compete with fellow GATE aspirants</p>

            {currentUserRank && (
              <div className="current-user-rank">
                <h3>Your Current Rank</h3>
                <div className={`rank-card ${getRankClass(currentUserRank.rank)}`}>
                  <span className="rank-position">{getRankIcon(currentUserRank.rank)}</span>
                  <div className="rank-details">
                    <span className="rank-score">
                      {leaderboardType === 'overall' && `${currentUserRank.totalScore} points`}
                      {leaderboardType === 'practice' && `${currentUserRank.totalPracticeCompleted} questions`}
                      {leaderboardType === 'streaks' && `${currentUserRank.currentStreak} days`}
                      {leaderboardType === 'quizzes' && `${currentUserRank.totalScore} points`}
                    </span>
                    {leaderboardType === 'overall' && (
                      <span className="rank-accuracy">{currentUserRank.accuracy}% accuracy</span>
                    )}
                    {leaderboardType === 'practice' && (
                      <span className="rank-accuracy">{currentUserRank.practiceAccuracy}% practice accuracy</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard Type Tabs */}
          <div className="leaderboard-tabs">
            {leaderboardTypes.map((type) => (
              <button
                key={type.key}
                className={`tab-button ${leaderboardType === type.key ? 'active' : ''}`}
                onClick={() => setLeaderboardType(type.key)}
              >
                <span className="tab-icon">{type.label.split(' ')[0]}</span>
                <div className="tab-content">
                  <span className="tab-title">{type.label.split(' ').slice(1).join(' ')}</span>
                  <span className="tab-description">{type.description}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="leaderboard-stats">
            <div className="stat-card">
              <span className="stat-number">{leaderboardData.length}</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {leaderboardData.reduce((sum, user) => sum + (user.quizzesCompleted || 0), 0)}
              </span>
              <span className="stat-label">Total Quizzes</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {leaderboardData.reduce((sum, user) => sum + (user.totalPracticeCompleted || 0), 0)}
              </span>
              <span className="stat-label">Practice Questions</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {leaderboardData.reduce((sum, user) => sum + (user.totalSectionsCompleted || 0), 0)}
              </span>
              <span className="stat-label">Sections Completed</span>
            </div>
          </div>

          {/* Sorting */}
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="rank">Rank</option>
              <option value="score">Score</option>
              <option value="practice">Practice</option>
              <option value="accuracy">Accuracy</option>
              <option value="streak">Streak</option>
              <option value="activity">Activity Score</option>
            </select>
          </div>

          {/* Leaderboard Table */}
          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  {leaderboardType === 'overall' && (
                    <>
                      <th>Total Score</th>
                      <th>Activity Score</th>
                      <th>Practice</th>
                      <th>Quizzes</th>
                      <th>Accuracy</th>
                      <th>Streak</th>
                    </>
                  )}
                  {leaderboardType === 'practice' && (
                    <>
                      <th>Total Practice</th>
                      <th>Sections</th>
                      <th>CS</th>
                      <th>DA</th>
                      <th>GA</th>
                      <th>Accuracy</th>
                      <th>Streak</th>
                    </>
                  )}
                  {leaderboardType === 'streaks' && (
                    <>
                      <th>Current Streak</th>
                      <th>Longest Streak</th>
                      <th>Last Active</th>
                    </>
                  )}
                  {leaderboardType === 'quizzes' && (
                    <>
                      <th>Total Score</th>
                      <th>Quizzes</th>
                      <th>Questions</th>
                      <th>Accuracy</th>
                      <th>Avg Score</th>
                    </>
                  )}
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((userItem) => (
                  <tr 
                    key={userItem.email} 
                    className={`leaderboard-row ${getRankClass(userItem.rank)} ${
                      user && userItem.email === user.email ? 'current-user' : ''
                    }`}
                  >
                    <td className="rank-cell">
                      <span className="rank-icon">{getRankIcon(userItem.rank)}</span>
                    </td>
                    <td className="name-cell">
                      <div className="user-info">
                        <span className="user-name">{userItem.name}</span>
                        {user && userItem.email === user.email && (
                          <span className="you-badge">You</span>
                        )}
                      </div>
                    </td>
                    
                    {/* Overall Leaderboard Columns */}
                    {leaderboardType === 'overall' && (
                      <>
                        <td className="score-cell">
                          <span className="score-value">{userItem.totalScore}</span>
                        </td>
                        <td className="activity-cell">
                          <span className="activity-value">{userItem.activityScore}</span>
                        </td>
                        <td className="practice-cell">
                          <span className="practice-value">{userItem.totalPracticeCompleted}</span>
                        </td>
                        <td className="quizzes-cell">{userItem.quizzesCompleted}</td>
                        <td className="accuracy-cell">
                          <span className="accuracy-value">{userItem.accuracy}%</span>
                        </td>
                        <td className="streak-cell">
                          <span className="streak-value">{userItem.currentStreak} 🔥</span>
                        </td>
                      </>
                    )}

                    {/* Practice Leaderboard Columns */}
                    {leaderboardType === 'practice' && (
                      <>
                        <td className="practice-total-cell">
                          <span className="practice-total-value">{userItem.totalPracticeCompleted}</span>
                        </td>
                        <td className="sections-cell">{userItem.totalSectionsCompleted}</td>
                        <td className="cs-practice-cell">
                          <span className="subject-practice">{getSubjectIcon('CS')} {userItem.csPractice}</span>
                        </td>
                        <td className="da-practice-cell">
                          <span className="subject-practice">{getSubjectIcon('DA')} {userItem.daPractice}</span>
                        </td>
                        <td className="ga-practice-cell">
                          <span className="subject-practice">{getSubjectIcon('GA')} {userItem.gaPractice}</span>
                        </td>
                        <td className="practice-accuracy-cell">
                          <span className="accuracy-value">{userItem.practiceAccuracy}%</span>
                        </td>
                        <td className="streak-cell">
                          <span className="streak-value">{userItem.currentStreak} 🔥</span>
                        </td>
                      </>
                    )}

                    {/* Streak Leaderboard Columns */}
                    {leaderboardType === 'streaks' && (
                      <>
                        <td className="current-streak-cell">
                          <span className="streak-value">{userItem.currentStreak} 🔥</span>
                        </td>
                        <td className="longest-streak-cell">
                          <span className="longest-streak-value">{userItem.longestStreak} 🏆</span>
                        </td>
                        <td className="last-active-cell">{formatDate(userItem.lastActive)}</td>
                      </>
                    )}

                    {/* Quiz Leaderboard Columns */}
                    {leaderboardType === 'quizzes' && (
                      <>
                        <td className="score-cell">
                          <span className="score-value">{userItem.totalScore}</span>
                        </td>
                        <td className="quizzes-cell">{userItem.quizzesCompleted}</td>
                        <td className="questions-cell">{userItem.totalQuestions}</td>
                        <td className="accuracy-cell">
                          <span className="accuracy-value">{userItem.accuracy}%</span>
                        </td>
                        <td className="avg-score-cell">{userItem.averageScore}</td>
                      </>
                    )}

                    <td className="joined-cell">{formatDate(userItem.joinedDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leaderboardData.length === 0 && (
            <div className="empty-leaderboard">
              <div className="empty-icon">📊</div>
              <h3>No Data Yet</h3>
              <p>Be the first to complete quizzes or practice questions and appear on the leaderboard!</p>
            </div>
          )}

          {/* Additional Features */}
          <div className="leaderboard-features">
            <div className="feature-card">
              <h3>📈 How Rankings Work</h3>
              <p>Our leaderboard combines multiple factors to provide a comprehensive ranking system:</p>
              <ul>
                <li><strong>Overall:</strong> Quiz scores + practice completion + streak bonuses</li>
                <li><strong>Practice:</strong> Total questions completed across all subjects</li>
                <li><strong>Streaks:</strong> Consecutive days of practice activity</li>
                <li><strong>Quizzes:</strong> Performance in mock tests and assessments</li>
              </ul>
            </div>
            
            <div className="feature-card">
              <h3>🎯 Tips to Improve Your Rank</h3>
              <ul>
                <li>Complete daily practice questions to maintain streaks</li>
                <li>Focus on accuracy over speed in quizzes</li>
                <li>Complete all sections in your chosen subjects</li>
                <li>Take regular mock tests to improve scores</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
