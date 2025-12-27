import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import practiceTracker from '../utils/practiceTracker';
import './PracticeProgress.css';

const PracticeProgress = ({ subject }) => {
  const [practiceStats, setPracticeStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPracticeStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadPracticeStats = async () => {
    try {
      setLoading(true);
      const stats = await practiceTracker.getPracticeStats();
      if (stats) {
        const formattedStats = practiceTracker.formatPracticeStats(stats);
        setPracticeStats(formattedStats);
      }
    } catch (error) {
      console.error('Failed to load practice stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Don't show progress for non-authenticated users
  }

  if (loading) {
    return (
      <div className="practice-progress">
        <div className="progress-loading">
          <div className="spinner"></div>
          <span>Loading progress...</span>
        </div>
      </div>
    );
  }


  const getSubjectStats = () => {
    if (!subject) return null;
    
    const subjectKey = subject.toLowerCase();
    switch (subjectKey) {
      case 'cs':
        return practiceStats.cs;
      case 'da':
        return practiceStats.da;
      case 'ga':
        return practiceStats.ga;
      default:
        return null;
    }
  };

  const subjectStats = getSubjectStats();
  const totalProgress = practiceStats.totalPractice;

  return (
    <div className="practice-progress">
      <div className="progress-header">
        <h3>Your Practice Progress</h3>
        {subject && (
          <span className="subject-badge">
            {subject === 'CS' && '💻'}
            {subject === 'DA' && '🤖'}
            {subject === 'GA' && '🧠'}
            {subject}
          </span>
        )}
      </div>

      <div className="progress-overview">
        <div className="progress-stat">
          <span className="stat-number">{totalProgress}</span>
          <span className="stat-label">Total Questions</span>
        </div>
        <div className="progress-stat">
          <span className="stat-number">{practiceStats.totalAccuracy}%</span>
          <span className="stat-label">Overall Accuracy</span>
        </div>
        <div className="progress-stat">
          <span className="stat-number">
            {practiceStats.cs.sections + practiceStats.da.sections + practiceStats.ga.sections}
          </span>
          <span className="stat-label">Sections Completed</span>
        </div>
      </div>

      {subject && subjectStats && (
        <div className="subject-progress">
          <h4>Subject Progress</h4>
          <div className="subject-stats">
            <div className="subject-stat">
              <span className="stat-label">Questions:</span>
              <span className="stat-value">{subjectStats.questions}</span>
            </div>
            <div className="subject-stat">
              <span className="stat-label">Accuracy:</span>
              <span className="stat-value">{subjectStats.accuracy}%</span>
            </div>
            <div className="subject-stat">
              <span className="stat-label">Sections:</span>
              <span className="stat-value">{subjectStats.sections}</span>
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min((subjectStats.questions / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="all-subjects-progress">
        <h4>All Subjects</h4>
        <div className="subjects-grid">
          <div className="subject-card">
            <div className="subject-icon">💻</div>
            <div className="subject-info">
              <span className="subject-name">CS</span>
              <span className="subject-questions">{practiceStats.cs.questions} questions</span>
              <span className="subject-accuracy">{practiceStats.cs.accuracy}% accuracy</span>
            </div>
          </div>
          
          <div className="subject-card">
            <div className="subject-icon">🤖</div>
            <div className="subject-info">
              <span className="subject-name">DA</span>
              <span className="subject-questions">{practiceStats.da.questions} questions</span>
              <span className="subject-accuracy">{practiceStats.da.accuracy}% accuracy</span>
            </div>
          </div>
          
          <div className="subject-card">
            <div className="subject-icon">🧠</div>
            <div className="subject-info">
              <span className="subject-name">GA</span>
              <span className="subject-questions">{practiceStats.ga.questions} questions</span>
              <span className="subject-accuracy">{practiceStats.ga.accuracy}% accuracy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-actions">
        <button 
          className="refresh-btn"
          onClick={loadPracticeStats}
        >
          🔄 Refresh Progress
        </button>
        <button 
          className="leaderboard-btn"
          onClick={() => window.location.href = '/leaderboard'}
        >
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default PracticeProgress;
