import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { getSectionByCode } from '../data/csSyllabusData';
import { getSectionByCode as getDASection } from '../data/daSyllabusData';
import { getSectionByCode as getGASection } from '../data/gaSyllabusData';
import './MockTestSelection.css';

const MockTestSelection = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine subject type based on the URL
  const isDA = location.pathname.includes('/da/');
  const isGA = location.pathname.includes('/ga/');
  const csSection = !isDA && !isGA ? getSectionByCode(section) : null;
  const daSection = isDA ? getDASection(section) : null;
  const gaSection = isGA ? getGASection(section) : null;
  const sectionData = csSection || daSection || gaSection;
  
  if (!sectionData) {
    return (
      <div className="mock-test-selection-page">
        <Header />
        <div className="container">
          <h1>Section not found</h1>
          <button onClick={() => navigate('/cs-sections')}>Back to CS Sections</button>
        </div>
        <Footer />
      </div>
    );
  }

  const mockTests = [
    {
      id: 1,
      name: "Mock Test 1",
      description: "Fundamental concepts and basic problem solving",
      difficulty: "Easy to Medium",
      questions: 10,
      duration: 20,
      topics: sectionData.topics.slice(0, Math.ceil(sectionData.topics.length / 3))
    },
    {
      id: 2,
      name: "Mock Test 2", 
      description: "Intermediate level problems and applications",
      difficulty: "Medium",
      questions: 10,
      duration: 20,
      topics: sectionData.topics.slice(Math.ceil(sectionData.topics.length / 3), Math.ceil(2 * sectionData.topics.length / 3))
    },
    {
      id: 3,
      name: "Mock Test 3",
      description: "Advanced concepts and complex problem solving",
      difficulty: "Medium to Hard",
      questions: 10,
      duration: 20,
      topics: sectionData.topics.slice(Math.ceil(2 * sectionData.topics.length / 3))
    }
  ];

  const handleStartMockTest = (testId) => {
    const subject = isDA ? 'da' : isGA ? 'ga' : 'cs';
    navigate(`/mock-test/${subject}/${section.toLowerCase()}/${testId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy to Medium':
        return '#28a745';
      case 'Medium':
        return '#ffc107';
      case 'Medium to Hard':
        return '#fd7e14';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="mock-test-selection-page">
      <Header />
      <Breadcrumb />

      <section className="mock-test-hero">
        <div className="container">
          <div className="hero-content">
            <div className="section-info">
              <div className="section-icon">{sectionData.icon}</div>
              <h1>{sectionData.name}</h1>
              <div className="section-code">{sectionData.code}</div>
            </div>
            <p className="hero-description">
              Choose from 3 carefully designed mock tests to evaluate your understanding of {sectionData.name}
            </p>
          </div>
        </div>
      </section>

      <section className="mock-tests-container">
        <div className="container">
          <div className="section-overview">
            <h2>Mock Test Overview</h2>
            <div className="overview-stats">
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Mock Tests</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10</span>
                <span className="stat-label">Questions Each</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20</span>
                <span className="stat-label">Minutes Each</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{sectionData.topics.length}</span>
                <span className="stat-label">Topics Covered</span>
              </div>
            </div>
          </div>

          <div className="mock-tests-grid">
            {mockTests.map((test) => (
              <div key={test.id} className="mock-test-card">
                <div className="test-header">
                  <div className="test-number">Test {test.id}</div>
                  <h3>{test.name}</h3>
                  <p className="test-description">{test.description}</p>
                </div>

                <div className="test-details">
                  <div className="test-stats">
                    <div className="test-stat">
                      <span className="stat-icon">📝</span>
                      <span className="stat-text">{test.questions} Questions</span>
                    </div>
                    <div className="test-stat">
                      <span className="stat-icon">⏱️</span>
                      <span className="stat-text">{test.duration} Minutes</span>
                    </div>
                    <div className="test-stat">
                      <span className="stat-icon">📊</span>
                      <span 
                        className="difficulty-badge"
                        style={{ backgroundColor: getDifficultyColor(test.difficulty) }}
                      >
                        {test.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="test-topics">
                    <h4>Topics Covered:</h4>
                    <div className="topics-preview">
                      {test.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="topic-tag">{topic}</span>
                      ))}
                      {test.topics.length > 3 && (
                        <span className="topic-tag more">+{test.topics.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  className="start-test-btn"
                  onClick={() => handleStartMockTest(test.id)}
                >
                  Start Test {test.id}
                </button>
              </div>
            ))}
          </div>

          <div className="test-instructions">
            <h3>📋 Test Instructions</h3>
            <div className="instructions-grid">
              <div className="instruction-card">
                <h4>⏰ Time Management</h4>
                <p>Each test has a strict 20-minute timer. Plan your time wisely - approximately 2 minutes per question.</p>
              </div>
              <div className="instruction-card">
                <h4>📊 Scoring</h4>
                <p>MCQ questions have negative marking (-1/3 for 1-mark, -2/3 for 2-mark). MSQ and NAT have no negative marking.</p>
              </div>
              <div className="instruction-card">
                <h4>🎯 Strategy</h4>
                <p>Start with easier questions first. Use the question palette to navigate efficiently between questions.</p>
              </div>
              <div className="instruction-card">
                <h4>📈 Progress</h4>
                <p>Take tests in order (1→2→3) for progressive difficulty. Review results to identify improvement areas.</p>
              </div>
            </div>
          </div>

          <div className="back-navigation">
            <button 
              className="back-btn"
              onClick={() => navigate('/cs-sections')}
            >
              ← Back to CS Sections
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MockTestSelection;
