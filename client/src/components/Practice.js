import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import './Practice.css';

const Practice = () => {
  const navigate = useNavigate();

  const practiceSubjects = [
    {
      code: 'CS',
      name: 'Computer Science & Information Technology',
      description: 'Master algorithms, data structures, programming, computer networks, databases, and more with comprehensive practice questions.',
      icon: '💻',
      questionCount: '500+',
      difficulty: 'All Levels',
      sections: 10,
      totalMarks: 85,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Algorithms', 'Data Structures', 'Programming', 'Networks', 'Databases']
    },
    {
      code: 'DA',
      name: 'Data Science & Artificial Intelligence',
      description: 'Comprehensive coverage of machine learning, statistics, data analysis, AI algorithms, and data visualization techniques.',
      icon: '🤖',
      questionCount: '300+',
      difficulty: 'All Levels',
      sections: 8,
      totalMarks: 85,
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Machine Learning', 'Statistics', 'Data Analysis', 'AI Algorithms', 'Visualization']
    },
    {
      code: 'GA',
      name: 'General Aptitude',
      description: 'Develop verbal ability, numerical reasoning, and analytical skills essential for all GATE papers and competitive exams.',
      icon: '🧠',
      questionCount: '400+',
      difficulty: 'Basic to Advanced',
      sections: 5,
      totalMarks: 15,
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      features: ['Verbal Ability', 'Numerical Reasoning', 'Analytical Skills', 'Logical Thinking', 'Problem Solving']
    }
  ];

  const handleSubjectClick = (subjectCode) => {
    if (subjectCode === 'CS') {
      navigate('/cs-sections');
    } else if (subjectCode === 'DA') {
      navigate('/da-sections');
    } else if (subjectCode === 'GA') {
      navigate('/ga-sections');
    } else {
      navigate(`/quiz/${subjectCode.toLowerCase()}`);
    }
  };

  return (
    <div className="practice-page">
      <Header />
      <Breadcrumb />


      <section className="practice-subjects">
        <div className="container">
          <div className="section-header">
            <h2>Select Practice Subject</h2>
            <p>Choose from our three main subject categories and start your GATE preparation journey</p>
          </div>
          
          <div className="subjects-grid">
            {practiceSubjects.map((subject, index) => (
              <div 
                key={index} 
                className="subject-card"
                style={{ '--subject-color': subject.color }}
              >
                <div className="card-header">
                  <div className="subject-icon" style={{ background: subject.gradient }}>
                    {subject.icon}
                  </div>
                  <div className="subject-badge">{subject.code}</div>
                </div>
                
                <div className="card-content">
                  <h3 className="subject-name">{subject.name}</h3>
                  <p className="subject-description">{subject.description}</p>
                  
                  <div className="subject-features">
                    {subject.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                
                <div className="card-stats">
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-icon">📚</span>
                      <div className="stat-details">
                        <span className="stat-value">{subject.questionCount}</span>
                        <span className="stat-label">Questions</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">📋</span>
                      <div className="stat-details">
                        <span className="stat-value">{subject.sections}</span>
                        <span className="stat-label">Sections</span>
                      </div>
                    </div>
                  </div>
                  <div className="stat-row">
                    <div className="stat-item">
                      <span className="stat-icon">🎯</span>
                      <div className="stat-details">
                        <span className="stat-value">{subject.difficulty}</span>
                        <span className="stat-label">Difficulty</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">🏆</span>
                      <div className="stat-details">
                        <span className="stat-value">{subject.totalMarks}</span>
                        <span className="stat-label">Marks</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button 
                    className="start-practice-btn"
                    style={{ background: subject.gradient }}
                    onClick={() => handleSubjectClick(subject.code)}
                  >
                    <span className="btn-icon">🚀</span>
                    Start Practice
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="practice-features">
        <div className="container">
          <div className="section-header">
            <h2>Practice Features</h2>
            <p>Everything you need to excel in your GATE preparation</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Timed Tests</h3>
              <p>Practice with real exam time constraints to improve your speed and accuracy under pressure.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Performance Analytics</h3>
              <p>Track your progress with detailed analytics and identify areas for improvement with visual insights.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Topic-wise Practice</h3>
              <p>Focus on specific topics and strengthen your weak areas systematically with targeted practice.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Detailed Solutions</h3>
              <p>Get comprehensive explanations for every question to enhance your understanding and learning.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Adaptive Learning</h3>
              <p>Our system adapts to your performance, providing questions that match your current skill level.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Practice anywhere, anytime with our responsive design that works perfectly on all devices.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Practice;
