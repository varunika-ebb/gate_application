import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizPerformanceSummary.css';

const QuizPerformanceSummary = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('accuracy');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterSubject, setFilterSubject] = useState('all');

  useEffect(() => {
    loadPerformanceData();
  }, []);

  const loadPerformanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/quiz/performance-summary');
      
      if (response.data.success) {
        setPerformanceData(response.data.data);
      } else {
        setError('Failed to load performance data');
      }
    } catch (err) {
      console.error('Error loading performance data:', err);
      setError('Failed to load performance data');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortedAndFilteredData = () => {
    let filtered = performanceData;
    
    // Filter by subject
    if (filterSubject !== 'all') {
      filtered = filtered.filter(item => item.subject === filterSubject);
    }
    
    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle date sorting
      if (sortBy === 'lastAttempt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  // Calculate weighted average score (same method as User model)
  const calculateWeightedAverage = (data) => {
    const totalQuestions = data.reduce((sum, item) => sum + item.totalQuestions, 0);
    const totalCorrect = data.reduce((sum, item) => sum + item.totalCorrect, 0);
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  };

  const getSubjectColor = (subject) => {
    const colors = {
      CS: '#667eea',
      DA: '#28a745',
      GA: '#fd7e14',
      Mixed: '#6c757d'
    };
    return colors[subject] || '#6c757d';
  };

  const getTrendIcon = (item) => {
    if (item.attempts < 2) return '📊'; // No trend for single attempt
    
    // This would need actual trend calculation from backend
    // For now, using a simple heuristic based on best percentage
    if (item.bestPercentage >= 80) return '📈';
    if (item.bestPercentage >= 60) return '➡️';
    return '📉';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getQuizDisplayName = (item) => {
    if (item.quizType === 'mock_test') {
      return `${item.subject} Mock Test ${item.section || ''}`.trim();
    } else if (item.quizType === 'practice') {
      return `${item.subject} Practice - ${item.section || 'Mixed'}`;
    } else {
      return `${item.subject} Mixed Practice`;
    }
  };

  if (loading) {
    return (
      <div className="quiz-performance-loading">
        <div className="loading-spinner"></div>
        <p>Loading your quiz performance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-performance-error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={loadPerformanceData} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  const sortedData = getSortedAndFilteredData();

  return (
    <div className="quiz-performance-summary">
      <div className="summary-header">
                 <div className="header-content">
           <h2>📊 Quiz Performance Summary</h2>
           <p>Your performance across all attempted quizzes (Accuracy = weighted by question count)</p>
         </div>
        
        <div className="summary-controls">
          <div className="filter-control">
            <label htmlFor="subject-filter">Filter by Subject:</label>
            <select
              id="subject-filter"
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="CS">Computer Science</option>
              <option value="DA">Data Science & AI</option>
              <option value="GA">General Aptitude</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>
        </div>
      </div>

      {sortedData.length === 0 ? (
        <div className="no-data-message">
          <div className="no-data-icon">📝</div>
          <h3>No Quiz Attempts Yet</h3>
          <p>Start taking quizzes to see your performance summary here!</p>
        </div>
      ) : (
        <div className="performance-table-container">
          <table className="performance-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('quizName')} className="sortable">
                  Quiz Name
                  {sortBy === 'quizName' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                                 <th onClick={() => handleSort('accuracy')} className="sortable">
                   Accuracy
                   {sortBy === 'accuracy' && (
                     <span className="sort-indicator">
                       {sortOrder === 'asc' ? '↑' : '↓'}
                     </span>
                   )}
                 </th>
                <th onClick={() => handleSort('attempts')} className="sortable">
                  Attempts
                  {sortBy === 'attempts' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('averageTimeSpent')} className="sortable">
                  Avg. Time
                  {sortBy === 'averageTimeSpent' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('lastAttempt')} className="sortable">
                  Last Attempt
                  {sortBy === 'lastAttempt' && (
                    <span className="sort-indicator">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index} className="performance-row">
                  <td className="quiz-name-cell">
                    <div className="quiz-info">
                      <div 
                        className="subject-badge"
                        style={{ backgroundColor: getSubjectColor(item.subject) }}
                      >
                        {item.subject}
                      </div>
                      <div className="quiz-details">
                        <strong>{getQuizDisplayName(item)}</strong>
                        <small>{item.quizType.replace('_', ' ').toUpperCase()}</small>
                      </div>
                    </div>
                  </td>
                  
                                     <td className="score-cell">
                     <div className="score-info">
                       <div className="score-value">
                         {item.accuracy}%
                       </div>
                       <div className="score-details">
                         <span>Best: {item.bestPercentage}%</span>
                         <span>Simple Avg: {item.averagePercentage}%</span>
                       </div>
                     </div>
                   </td>
                  
                  <td className="attempts-cell">
                    <div className="attempts-info">
                      <span className="attempts-count">{item.attempts}</span>
                      <span className="attempts-label">attempts</span>
                    </div>
                  </td>
                  
                  <td className="time-cell">
                    <div className="time-info">
                      <span className="time-value">
                        {formatTime(item.averageTimeSpent)}
                      </span>
                      <span className="time-label">per quiz</span>
                    </div>
                  </td>
                  
                  <td className="date-cell">
                    <div className="date-info">
                      <span className="date-value">
                        {formatDate(item.lastAttempt)}
                      </span>
                      <span className="date-label">
                        {item.attempts > 1 ? `${item.attempts} attempts` : '1 attempt'}
                      </span>
                    </div>
                  </td>
                  
                  <td className="trend-cell">
                    <div className="trend-icon">
                      {getTrendIcon(item)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sortedData.length > 0 && (
        <div className="summary-footer">
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total Quizzes:</span>
              <span className="stat-value">{sortedData.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Attempts:</span>
              <span className="stat-value">
                {sortedData.reduce((sum, item) => sum + item.attempts, 0)}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Score:</span>
              <span className="stat-value">
                {calculateWeightedAverage(sortedData)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPerformanceSummary;
