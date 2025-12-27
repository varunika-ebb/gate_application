import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import QuizPerformanceSummary from './QuizPerformanceSummary';
import './Dashboard.css';

const Dashboard = () => {
  const { user, updateStats, loadUser } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    recentQuizzes: [],
    subjectProgress: {
      CS: { completed: 0, total: 100, accuracy: 0 },
      DA: { completed: 0, total: 80, accuracy: 0 },
      GA: { completed: 0, total: 50, accuracy: 0 }
    },
    weeklyGoal: { target: 100, completed: 0 },
    leaderboard: [],
    dailyChallenge: null,
    recommendations: []
  });
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [summaryStats, setSummaryStats] = useState({ totalQuizzes: 0, totalAttempts: 0, averageScore: 0 });

  useEffect(() => {
    loadDashboardData();
    // Refresh user data to ensure latest profile information is displayed
    if (loadUser) {
      loadUser();
    }
    // Load summary stats used for top-level cards
    loadSummaryStats();
  }, [loadUser]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate API calls - replace with actual API endpoints
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API responses
      setDashboardData({
        recentQuizzes: [
          { id: 1, subject: 'CS', score: 85, date: '2024-01-15', questions: 20 },
          { id: 2, subject: 'DA', score: 78, date: '2024-01-14', questions: 15 },
          { id: 3, subject: 'GA', score: 92, date: '2024-01-13', questions: 10 },
          { id: 4, subject: 'CS', score: 88, date: '2024-01-12', questions: 25 },
          { id: 5, subject: 'DA', score: 82, date: '2024-01-11', questions: 18 }
        ],
        subjectProgress: {
          CS: { completed: 65, total: 100, accuracy: 78 },
          DA: { completed: 42, total: 80, accuracy: 72 },
          GA: { completed: 38, total: 50, accuracy: 85 }
        },
        weeklyGoal: { target: 100, completed: 65 },
        leaderboard: [
          { rank: 1, name: 'Priya Sharma', score: 94, avatar: '👩‍💻' },
          { rank: 2, name: 'Rahul Kumar', score: 91, avatar: '👨‍💻' },
          { rank: 3, name: 'Anita Singh', score: 89, avatar: '👩‍🎓' }
        ],
        dailyChallenge: {
          question: "What is the time complexity of merge sort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
          streak: 7
        },
        recommendations: [
          { subject: 'CS', topic: 'Computer Networks', accuracy: 55, priority: 'high' },
          { subject: 'DA', topic: 'Machine Learning', accuracy: 68, priority: 'medium' },
          { subject: 'GA', topic: 'Numerical Ability', accuracy: 72, priority: 'low' }
        ]
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load summary stats from API so top cards match the summary section
  const loadSummaryStats = async () => {
    try {
      const response = await axios.get('/api/quiz/performance-summary');
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        const data = response.data.data;
        const totalQuizzes = data.length;
        const totalAttempts = data.reduce((sum, item) => sum + (item.attempts || 0), 0);
        const totalQuestions = data.reduce((sum, item) => sum + (item.totalQuestions || 0), 0);
        const totalCorrect = data.reduce((sum, item) => sum + (item.totalCorrect || 0), 0);
        const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        setSummaryStats({ totalQuizzes, totalAttempts, averageScore });
      } else {
        setSummaryStats({ totalQuizzes: 0, totalAttempts: 0, averageScore: 0 });
      }
    } catch (e) {
      setSummaryStats({ totalQuizzes: 0, totalAttempts: 0, averageScore: 0 });
    }
  };

  const handleStartQuiz = (subject = 'mixed') => {
    if (subject === 'mixed') {
      navigate('/practice');
    } else {
      navigate(`/${subject.toLowerCase()}-sections`);
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      CS: '#667eea',
      DA: '#28a745',
      GA: '#fd7e14'
    };
    return colors[subject] || '#6c757d';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <h2>Loading your dashboard...</h2>
        <p>Preparing your personalized learning experience</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Header />
      
      <main className="dashboard-main">
        <div className="container">
          {/* Header Section */}
          <section className="dashboard-header">
            <div className="welcome-section">
              <div className="user-info">
                <div className="user-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <div className="user-details">
                  <h1 style={{color: '#333', fontSize: '2.2rem', fontWeight: '700', textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)'}}>
                    Welcome back, {user?.name || 'User'}! 🎯
                  </h1>
                  <p style={{color: '#444', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)'}}>
                    Ready to continue your GATE preparation journey?
                  </p>
                </div>
              </div>
              <Link to="/profile" className="edit-profile-btn">
                <span className="btn-icon">✏️</span>
                Edit Profile
              </Link>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-number">#12</span>
                  <span className="stat-label">Current Rank</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <span className="stat-number">{summaryStats.totalQuizzes}</span>
                  <span className="stat-label">Quizzes Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-number">{summaryStats.averageScore}%</span>
                  <span className="stat-label">Average Score</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <span className="stat-number">Today</span>
                  <span className="stat-label">Last Login</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Performance Summary Section */}
          <section className="quiz-performance-section">
            <QuizPerformanceSummary />
          </section>



          {/* Quiz Access Panel */}
          <section className="quiz-access-panel">
            <div className="panel-header">
              <h2>🚀 Start Your Practice</h2>
              <div className="difficulty-filters">
                <button 
                  className={`filter-btn ${selectedDifficulty === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty('all')}
                >
                  All Levels
                </button>
                <button 
                  className={`filter-btn easy ${selectedDifficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty('easy')}
                >
                  Easy
                </button>
                <button 
                  className={`filter-btn medium ${selectedDifficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty('medium')}
                >
                  Medium
                </button>
                <button 
                  className={`filter-btn hard ${selectedDifficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty('hard')}
                >
                  Hard
                </button>
              </div>
            </div>

            <div className="quiz-actions">
              <button className="start-quiz-btn primary" onClick={() => handleStartQuiz('mixed')}>
                <span className="btn-icon">🎯</span>
                <div className="btn-content">
                  <strong>Start New Quiz</strong>
                  <small>Mixed subjects practice</small>
                </div>
              </button>
              
              <button className="continue-quiz-btn">
                <span className="btn-icon">▶️</span>
                <div className="btn-content">
                  <strong>Continue Quiz</strong>
                  <small>Resume incomplete attempt</small>
                </div>
              </button>
            </div>

            <div className="subject-cards">
              {Object.entries(dashboardData.subjectProgress).map(([subject, progress]) => (
                <div key={subject} className="subject-card" onClick={() => handleStartQuiz(subject)}>
                  <div className="subject-header">
                    <div className="subject-info">
                      <h3>{subject}</h3>
                      <span className="subject-name">
                        {subject === 'CS' ? 'Computer Science' : 
                         subject === 'DA' ? 'Data Science & AI' : 'General Aptitude'}
                      </span>
                    </div>
                    <div className="subject-accuracy">
                      <span className="accuracy-value">{progress.accuracy}%</span>
                      <span className="accuracy-label">Accuracy</span>
                    </div>
                  </div>
                  
                  <div className="subject-progress">
                    <div className="progress-info">
                      <span>{progress.completed}/{progress.total} questions</span>
                      <span>{Math.round((progress.completed / progress.total) * 100)}% complete</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${(progress.completed / progress.total) * 100}%`,
                          backgroundColor: getSubjectColor(subject)
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="subject-stats">
                    <div className="stat">
                      <span className="stat-icon">📝</span>
                      <span>{progress.completed} solved</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🎯</span>
                      <span>{progress.accuracy}% accuracy</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Analytics Section */}
          <section className="performance-analytics">
            <h2>📊 Performance Analytics</h2>

            <div className="analytics-grid">
              {/* Subject-wise Analysis */}
              <div className="analytics-card">
                <div className="card-header">
                  <h3>🎯 Subject Analysis</h3>
                  <span className="card-subtitle">Strengths & Weaknesses</span>
                </div>
                <div className="radar-chart-container">
                  <div className="radar-chart">
                    {Object.entries(dashboardData.subjectProgress).map(([subject, progress]) => (
                      <div key={subject} className="subject-analysis">
                        <div className="subject-label">{subject}</div>
                        <div className="analysis-bar">
                          <div
                            className="analysis-fill"
                            style={{
                              width: `${progress.accuracy}%`,
                              backgroundColor: getSubjectColor(subject)
                            }}
                          ></div>
                        </div>
                        <span className="analysis-value">{progress.accuracy}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Management */}
              <div className="analytics-card">
                <div className="card-header">
                  <h3>⏱️ Time Management</h3>
                  <span className="card-subtitle">Speed vs Accuracy</span>
                </div>
                <div className="time-analysis">
                  <div className="time-metric">
                    <div className="metric-info">
                      <span className="metric-label">Avg. Time per Question</span>
                      <span className="metric-value">2.3 min</span>
                    </div>
                    <div className="metric-comparison">
                      <span className="comparison-label">Optimal: 2.0 min</span>
                      <span className="comparison-status slower">15% slower</span>
                    </div>
                  </div>
                  <div className="time-recommendation">
                    <p>💡 <strong>Tip:</strong> Practice more timed quizzes to improve speed while maintaining accuracy.</p>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="analytics-card recommendations-card">
                <div className="card-header">
                  <h3>🤖 AI Recommendations</h3>
                  <span className="card-subtitle">Personalized Study Plan</span>
                </div>
                <div className="recommendations-list">
                  {dashboardData.recommendations.map((rec, index) => (
                    <div key={index} className={`recommendation-item ${rec.priority}`}>
                      <div className="rec-priority">
                        <span className={`priority-badge ${rec.priority}`}>
                          {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'}
                        </span>
                      </div>
                      <div className="rec-content">
                        <strong>Focus on {rec.topic}</strong>
                        <p>Current accuracy: {rec.accuracy}% in {rec.subject}</p>
                        <small>
                          {rec.priority === 'high' ? 'Needs immediate attention' :
                           rec.priority === 'medium' ? 'Room for improvement' : 'Good progress, keep practicing'}
                        </small>
                      </div>
                      <button className="rec-action-btn" onClick={() => handleStartQuiz(rec.subject)}>
                        Practice
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Engagement Features */}
          <section className="engagement-features">
            <div className="features-grid">
              {/* Daily Challenge */}
              <div className="feature-card daily-challenge">
                <div className="card-header">
                  <h3>🔥 Daily Challenge</h3>
                  <div className="streak-counter">
                    <span className="streak-number">{dashboardData.dailyChallenge?.streak || 0}</span>
                    <span className="streak-label">day streak</span>
                  </div>
                </div>
                <div className="challenge-content">
                  <div className="challenge-question">
                    <p><strong>Question of the Day:</strong></p>
                    <p>{dashboardData.dailyChallenge?.question}</p>
                  </div>
                  <div className="challenge-options">
                    {dashboardData.dailyChallenge?.options.map((option, index) => (
                      <button key={index} className="option-btn">
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bookmarked Questions */}
              <div className="feature-card bookmarks">
                <div className="card-header">
                  <h3>🔖 Bookmarked Questions</h3>
                  <span className="bookmark-count">12 saved</span>
                </div>
                <div className="bookmarks-list">
                  <div className="bookmark-item">
                    <div className="bookmark-info">
                      <span className="bookmark-subject">CS</span>
                      <span className="bookmark-topic">Data Structures</span>
                    </div>
                    <span className="bookmark-difficulty hard">Hard</span>
                  </div>
                  <div className="bookmark-item">
                    <div className="bookmark-info">
                      <span className="bookmark-subject">DA</span>
                      <span className="bookmark-topic">Machine Learning</span>
                    </div>
                    <span className="bookmark-difficulty medium">Medium</span>
                  </div>
                  <div className="bookmark-item">
                    <div className="bookmark-info">
                      <span className="bookmark-subject">GA</span>
                      <span className="bookmark-topic">Verbal Ability</span>
                    </div>
                    <span className="bookmark-difficulty easy">Easy</span>
                  </div>
                </div>
                <Link to="/bookmarks" className="view-all-bookmarks">
                  View All Bookmarks →
                </Link>
              </div>

              {/* Resource Downloads */}
              <div className="feature-card resources">
                <div className="card-header">
                  <h3>📚 Study Resources</h3>
                  <span className="new-badge">New</span>
                </div>
                <div className="resources-list">
                  <div className="resource-item">
                    <span className="resource-icon">📄</span>
                    <div className="resource-info">
                      <strong>GATE 2023 Papers</strong>
                      <small>All subjects with solutions</small>
                    </div>
                    <button className="download-btn">Download</button>
                  </div>
                  <div className="resource-item">
                    <span className="resource-icon">📐</span>
                    <div className="resource-info">
                      <strong>Formula Sheets</strong>
                      <small>Quick reference guide</small>
                    </div>
                    <button className="download-btn">Download</button>
                  </div>
                  <div className="resource-item">
                    <span className="resource-icon">💡</span>
                    <div className="resource-info">
                      <strong>Study Tips</strong>
                      <small>Expert preparation strategies</small>
                    </div>
                    <button className="download-btn">Download</button>
                  </div>
                </div>
              </div>


            </div>
          </section>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
