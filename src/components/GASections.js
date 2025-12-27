import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { gaSections } from '../data/gaSyllabusData';
import './GASections.css';

const GASections = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const handleSectionClick = (sectionCode) => {
    navigate(`/quiz/ga/${sectionCode.toLowerCase()}`);
  };

  const handleMockTestClick = (sectionCode) => {
    navigate(`/mock-tests/ga/${sectionCode.toLowerCase()}`);
  };

  const handleFinalTestClick = () => {
    navigate('/quiz/ga/all');
  };

  const toggleTopics = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy to Medium':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'Medium to Hard':
        return '#fd7e14';
      case 'Hard':
        return '#dc3545';
      case 'Easy to Hard':
        return '#6f42c1';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="ga-sections-page">
      <Header />
      <Breadcrumb />
      
      <section className="ga-hero">
        <div className="container">
          <div className="ga-hero-content">
            <div className="ga-icon">🧠</div>
            <h1>General Aptitude</h1>
            <p>Master all 4 sections of GA syllabus with comprehensive practice questions</p>
            <div className="ga-stats">
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Sections</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">250+</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Total Marks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sections-grid-container">
        <div className="container">
          <h2>Choose Your Section</h2>
          <p className="sections-subtitle">
            Select any section to start practicing topic-specific questions
          </p>

          {/* GA Final Test Card */}
          <div className="final-test-card">
            <div className="final-test-header">
              <div className="final-test-icon">🎯</div>
              <div className="final-test-info">
                <h3>GA Final Test</h3>
                <p>Comprehensive mixed practice covering all 4 GA sections</p>
              </div>
            </div>
            <div className="final-test-stats">
              <div className="test-stat">
                <span className="stat-number">15</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="test-stat">
                <span className="stat-number">15</span>
                <span className="stat-label">Marks</span>
              </div>
              <div className="test-stat">
                <span className="stat-number">30</span>
                <span className="stat-label">Minutes</span>
              </div>
            </div>
            <button
              className="final-test-btn"
              onClick={handleFinalTestClick}
            >
              Start GA Final Test
            </button>
          </div>

          <div className="sections-grid">
            {gaSections.map((section) => (
              <div 
                key={section.id} 
                className="section-card"
                onClick={() => handleSectionClick(section.code)}
              >
                <div className="section-header">
                  <div className="section-icon">{section.icon}</div>
                  <div className="section-info">
                    <div className="section-number">Section {section.id}</div>
                    <h3 className="section-name">{section.name}</h3>
                    <div className="section-code">{section.code}</div>
                  </div>
                </div>
                
                <p className="section-description">{section.description}</p>
                
                <div className="section-topics">
                  <div className="topics-header">
                    <h4>Topics Covered:</h4>
                    <button 
                      className="toggle-topics-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopics(section.id);
                      }}
                    >
                      {expandedSections[section.id] ? 'Show Less' : 'Show All Topics'}
                    </button>
                  </div>
                  <ul className={`topics-list ${expandedSections[section.id] ? 'expanded' : ''}`}>
                    {(expandedSections[section.id] ? section.topics : section.topics.slice(0, 3)).map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                    {!expandedSections[section.id] && section.topics.length > 3 && (
                      <li className="more-topics">+{section.topics.length - 3} more topics</li>
                    )}
                  </ul>
                </div>
                
                <div className="section-stats">
                  <div className="section-stat">
                    <span className="stat-label">Questions:</span>
                    <span className="stat-value">{section.questionCount}</span>
                  </div>
                  <div className="section-stat">
                    <span className="stat-label">Difficulty:</span>
                    <span 
                      className="stat-value difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(section.difficulty) }}
                    >
                      {section.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="section-actions">
                  <button 
                    className="section-start-btn practice-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick(section.code);
                    }}
                  >
                    Start Practice
                  </button>
                  <button 
                    className="section-start-btn mock-test-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMockTestClick(section.code);
                    }}
                  >
                    Mock Tests
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ga-preparation-tips">
        <div className="container">
          <h2>GA Preparation Strategy</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h3>Verbal Aptitude</h3>
              <p>Focus on grammar fundamentals, vocabulary building, and reading comprehension practice</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔢</div>
              <h3>Quantitative Aptitude</h3>
              <p>Master basic mathematics, data interpretation, and numerical computation techniques</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🧠</div>
              <h3>Analytical Aptitude</h3>
              <p>Develop logical reasoning skills, pattern recognition, and deductive thinking abilities</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🔄</div>
              <h3>Spatial Aptitude</h3>
              <p>Practice visualization, shape transformations, and spatial reasoning problems regularly</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GASections;
