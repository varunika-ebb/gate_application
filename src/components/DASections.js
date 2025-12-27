import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { daSections } from '../data/daSyllabusData';
import './DASections.css';

const DASections = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const handleSectionClick = (sectionCode) => {
    navigate(`/quiz/da/${sectionCode.toLowerCase()}`);
  };

  const handleMockTestClick = (sectionCode) => {
    navigate(`/mock-tests/da/${sectionCode.toLowerCase()}`);
  };

  const handleFinalTestClick = () => {
    navigate('/quiz/da/all');
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
    <div className="da-sections-page">
      <Header />
      <Breadcrumb />
      
      <section className="da-hero">
        <div className="container">
          <div className="da-hero-content">
            <div className="da-icon">🤖</div>
            <h1>Data Science & Artificial Intelligence</h1>
            <p>Master all 7 sections of DA syllabus with comprehensive practice questions</p>
            <div className="da-stats">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Sections</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">85</span>
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

          {/* DA Final Test Card */}
          <div className="final-test-card">
            <div className="final-test-header">
              <div className="final-test-icon">🎯</div>
              <div className="final-test-info">
                <h3>DA Final Test</h3>
                <p>Comprehensive GATE simulation covering all DA sections</p>
              </div>
            </div>
            <div className="final-test-stats">
              <div className="test-stat">
                <span className="stat-number">65</span>
                <span className="stat-label">Questions</span>
              </div>
              <div className="test-stat">
                <span className="stat-number">100</span>
                <span className="stat-label">Marks</span>
              </div>
              <div className="test-stat">
                <span className="stat-number">180</span>
                <span className="stat-label">Minutes</span>
              </div>
            </div>
            <button
              className="final-test-btn"
              onClick={handleFinalTestClick}
            >
              Start DA Final Test
            </button>
          </div>

          <div className="sections-grid">
            {daSections.map((section) => (
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

      <section className="da-preparation-tips">
        <div className="container">
          <h2>DA Preparation Strategy</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <h3>Mathematics Foundation</h3>
              <p>Start with Probability & Statistics, Linear Algebra, and Calculus for strong mathematical foundation</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💻</div>
              <h3>Programming Skills</h3>
              <p>Master Programming, Data Structures & Algorithms - essential for data science implementation</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🤖</div>
              <h3>Core ML & AI</h3>
              <p>Focus on Machine Learning and AI concepts - they carry maximum weightage in GATE DA</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🗄️</div>
              <h3>Data Management</h3>
              <p>Understand Database Management and Warehousing for handling large-scale data systems</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DASections;
