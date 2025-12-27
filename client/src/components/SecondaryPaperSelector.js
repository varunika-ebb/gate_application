import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePaper } from '../context/PaperContext';
import { gatePapers, allowedCombinations } from '../data/gateData';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import './SecondaryPaperSelector.css';

const SecondaryPaperSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPaper, setSelectedPaper, selectedSecondPaper, setSelectedSecondPaper, getQuizRoute, getPaperDisplayName } = usePaper();
  
  const [primaryPaper, setPrimaryPaper] = useState('');

  useEffect(() => {
    // Get the primary paper from URL params or context
    const params = new URLSearchParams(location.search);
    const paper = params.get('paper') || selectedPaper;
    if (paper) {
      setPrimaryPaper(paper);
      setSelectedPaper(paper);
    } else {
      // Redirect back to home if no paper selected
      navigate('/');
    }
  }, [location, selectedPaper, setSelectedPaper, navigate]);

  const handleSecondPaperSelect = (paperCode) => {
    setSelectedSecondPaper(paperCode);
  };

  const handleStartSimulation = () => {
    if (!primaryPaper) {
      alert('Please select a primary paper first.');
      return;
    }

    // Navigate to the appropriate quiz route
    const route = getQuizRoute(primaryPaper);
    navigate(route);
  };

  const getAvailableSecondPapers = () => {
    if (!primaryPaper || !allowedCombinations[primaryPaper]) {
      return [];
    }
    return allowedCombinations[primaryPaper];
  };

  const getPaperInfo = (paperCode) => {
    return gatePapers[paperCode] || { name: paperCode };
  };

  if (!primaryPaper) {
    return (
      <div className="secondary-paper-page">
        <Header />
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="secondary-paper-page">
      <Header />
      <Breadcrumb />
      
      <section className="secondary-paper-hero">
        <div className="container">
          <div className="hero-content">
            <div className="primary-paper-display">
              <h1>Secondary Paper Selection</h1>
              <div className="selected-primary">
                <span className="primary-label">Primary Paper:</span>
                <div className="primary-paper-card">
                  <span className="paper-code">{primaryPaper}</span>
                  <span className="paper-name">{getPaperInfo(primaryPaper).name}</span>
                </div>
              </div>
              <p>Select an optional second paper to enhance your GATE preparation</p>
              
            </div>
          </div>
        </div>
      </section>

      <section className="secondary-paper-selection">
        <div className="container">
          <div className="selection-container">
            <div className="second-paper-section">
              <h2>Second Paper (Optional)</h2>
              <p className="section-description">
                Available second papers for {primaryPaper}:
              </p>
              
              {getAvailableSecondPapers().length > 0 ? (
                <div className="second-papers-grid">
                  {getAvailableSecondPapers().map((code) => (
                    <div
                      key={code}
                      className={`second-paper-card ${selectedSecondPaper === code ? 'selected' : ''}`}
                      onClick={() => handleSecondPaperSelect(code)}
                    >
                      <div className="paper-icon">📚</div>
                      <div className="paper-code">{code}</div>
                      <div className="paper-name">{getPaperInfo(code).name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-second-papers">
                  <p>No second papers available for {primaryPaper}</p>
                </div>
              )}
            </div>

            <div className="simulation-section">
              <div className="simulation-card">
                <h3>GATE Simulation</h3>
                <div className="simulation-details">
                  <div className="detail-item">
                    <span className="detail-icon">📝</span>
                    <span className="detail-label">Questions:</span>
                    <span className="detail-value">65</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🎯</span>
                    <span className="detail-label">Marks:</span>
                    <span className="detail-value">100</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⏱️</span>
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">180 min</span>
                  </div>
                </div>
                
                <div className="paper-info">
                  {primaryPaper === 'CS' && (
                    <p>→ CS GATE Mixed Practice (65Q, 100M, 180min)</p>
                  )}
                  {primaryPaper === 'DA' && (
                    <p>→ DA GATE Mixed Practice (65Q, 100M, 180min)</p>
                  )}
                  {primaryPaper && primaryPaper !== 'CS' && primaryPaper !== 'DA' && (
                    <p>→ CS GATE Simulation (65Q, 100M, 180min) - {getPaperDisplayName(primaryPaper)} questions coming soon!</p>
                  )}
                </div>
                
                <button 
                  className="start-simulation-btn"
                  onClick={handleStartSimulation}
                >
                  🎯 Start GATE Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SecondaryPaperSelector;
