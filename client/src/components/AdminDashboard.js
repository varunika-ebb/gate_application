import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setDashboardData(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchUserProgress = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/admin/progress/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user progress');
      }

      const data = await response.json();
      setUserProgress(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const data = await response.json();
      setAnalytics(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserProgress(user._id);
    setActiveTab('user-details');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPercentage = (value) => {
    return Math.round(value || 0);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage and monitor all users' progress and activities</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          All Users
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('analytics');
            if (!analytics) fetchAnalytics();
          }}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'overview' && dashboardData && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{dashboardData.platformStats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🟢</div>
              <div className="stat-number">{dashboardData.platformStats.activeUsers}</div>
              <div className="stat-label">Active Users (7 days)</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-number">{dashboardData.platformStats.totalQuizzes}</div>
              <div className="stat-label">Total Quizzes</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❓</div>
              <div className="stat-number">{dashboardData.platformStats.totalQuestions}</div>
              <div className="stat-label">Questions Attempted</div>
            </div>
          </div>

          <div className="subject-stats">
            <h3>Subject Performance</h3>
            <div className="subject-grid">
              {dashboardData.subjectStats.map((subject, index) => (
                <div key={index} className="subject-card">
                  <h4>{subject._id}</h4>
                  <p>Attempts: {subject.totalAttempts}</p>
                  <p>Avg Score: {formatPercentage(subject.averageScore)}%</p>
                  <p>Questions: {subject.totalQuestions}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Quiz Attempts</h3>
            <div className="activity-list">
              {dashboardData.recentAttempts.map((attempt, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <strong>{attempt.userId?.name || 'Unknown User'}</strong>
                    <span className="activity-subject">{attempt.subject}</span>
                    <span className="activity-score">{formatPercentage(attempt.percentage)}%</span>
                  </div>
                  <div className="activity-time">
                    {formatDate(attempt.completedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && dashboardData && (
        <div className="users-section">
          <h3>All Users ({dashboardData.users.length})</h3>
          <div className="users-table">
            <div className="table-header">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Quizzes</div>
              <div>Accuracy</div>
              <div>Last Active</div>
              <div>Actions</div>
            </div>
            {dashboardData.users.map((user) => (
              <div key={user._id} className="table-row">
                <div className="user-info">
                  <strong>{user.name}</strong>
                </div>
                <div>{user.email}</div>
                <div>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </div>
                <div>{user.stats.totalQuizzes || 0}</div>
                <div>{formatPercentage(user.stats.accuracy)}%</div>
                <div>{formatDate(user.lastActive)}</div>
                <div>
                  <button 
                    className="view-btn"
                    onClick={() => handleUserClick(user)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'user-details' && selectedUser && userProgress && (
        <div className="user-details-section">
          <div className="user-header">
            <button 
              className="back-btn"
              onClick={() => setActiveTab('users')}
            >
              ← Back to Users
            </button>
            <h3>User Details: {selectedUser.name}</h3>
          </div>

          <div className="user-stats">
            <div className="user-stat-card">
              <h4>Overall Performance</h4>
              <p>Total Quizzes: {userProgress.user.stats.totalQuizzes || 0}</p>
              <p>Total Questions: {userProgress.user.stats.totalQuestions || 0}</p>
              <p>Accuracy: {formatPercentage(userProgress.user.accuracy)}%</p>
              <p>Current Streak: {userProgress.user.stats.currentStreak || 0} days</p>
            </div>

            <div className="user-stat-card">
              <h4>Subject Performance</h4>
              {userProgress.subjectPerformance.map((subject, index) => (
                <div key={index} className="subject-performance">
                  <strong>{subject._id}</strong>
                  <p>Attempts: {subject.totalAttempts}</p>
                  <p>Avg Score: {formatPercentage(subject.averageScore)}%</p>
                  <p>Best Score: {formatPercentage(subject.bestScore)}%</p>
                </div>
              ))}
            </div>
          </div>

          <div className="quiz-history">
            <h4>Recent Quiz History</h4>
            <div className="history-list">
              {userProgress.quizHistory.slice(0, 10).map((quiz, index) => (
                <div key={index} className="history-item">
                  <div className="quiz-info">
                    <strong>{quiz.quizName}</strong>
                    <span className="quiz-subject">{quiz.subject}</span>
                    <span className="quiz-score">{formatPercentage(quiz.percentage)}%</span>
                  </div>
                  <div className="quiz-time">
                    {formatDate(quiz.completedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && analytics && (
        <div className="analytics-section">
          <h3>Platform Analytics</h3>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h4>Top Performers</h4>
              <div className="performers-list">
                {analytics.topPerformers.map((user, index) => (
                  <div key={index} className="performer-item">
                    <span className="rank">#{index + 1}</span>
                    <span className="name">{user.name}</span>
                    <span className="score">{formatPercentage(user.stats.averageScore)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="analytics-card">
              <h4>Most Active Users</h4>
              <div className="active-list">
                {analytics.mostActiveUsers.map((user, index) => (
                  <div key={index} className="active-item">
                    <span className="name">{user.name}</span>
                    <span className="last-active">
                      {formatDate(user.stats.lastActive)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
