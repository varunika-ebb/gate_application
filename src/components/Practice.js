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
      description: 'Practice questions covering algorithms, data structures, programming, computer networks, databases, and more.',
      icon: '💻',
      questionCount: '500+',
      difficulty: 'All Levels'
    },
    {
      code: 'DA',
      name: 'Data Science & Artificial Intelligence',
      description: 'Comprehensive questions on machine learning, statistics, data analysis, AI algorithms, and data visualization.',
      icon: '🤖',
      questionCount: '300+',
      difficulty: 'All Levels'
    },
    {
      code: 'GA',
      name: 'General Aptitude',
      description: 'Verbal ability, numerical ability, and analytical reasoning questions common to all GATE papers.',
      icon: '🧠',
      questionCount: '400+',
      difficulty: 'Basic to Advanced'
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

      <section className="practice-hero">
        <div className="container">
          <h1>Practice Tests</h1>
          <p>Choose your subject and start practicing with our comprehensive question bank</p>
        </div>
      </section>

      <section className="practice-subjects">
        <div className="container">
          <h2>Select Practice Subject</h2>
          <div className="subjects-grid">
            {practiceSubjects.map((subject, index) => (
              <div 
                key={index} 
                className="subject-card"
                onClick={() => handleSubjectClick(subject.code)}
              >
                <div className="subject-icon">{subject.icon}</div>
                <div className="subject-header">
                  <div className="subject-code">{subject.code}</div>
                  <h3 className="subject-name">{subject.name}</h3>
                </div>
                <p className="subject-description">{subject.description}</p>
                <div className="subject-stats">
                  <div className="stat">
                    <span className="stat-label">Questions:</span>
                    <span className="stat-value">{subject.questionCount}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Difficulty:</span>
                    <span className="stat-value">{subject.difficulty}</span>
                  </div>
                </div>
                <button className="start-practice-btn">
                  Start Practice
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="practice-features">
        <div className="container">
          <h2>Practice Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⏱️</div>
              <h3>Timed Tests</h3>
              <p>Practice with real exam time constraints to improve your speed and accuracy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Performance Analytics</h3>
              <p>Track your progress with detailed analytics and identify areas for improvement.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Topic-wise Practice</h3>
              <p>Focus on specific topics and strengthen your weak areas systematically.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Detailed Solutions</h3>
              <p>Get comprehensive explanations for every question to enhance your understanding.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Practice;
