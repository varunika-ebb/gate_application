import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePaper } from '../context/PaperContext';
import { gatePapers, allowedCombinations } from '../data/gateData';
import Header from './Header';
import './PaperSelector.css';

const SecondaryPaperSelection = () => {
  const navigate = useNavigate();
  const { primaryPaper } = useParams();
  const {
    selectedPaper,
    setSelectedPaper,
    selectedSecondPaper,
    setSelectedSecondPaper,
    getQuizRoute,
    getPaperDisplayName
  } = usePaper();

  const [loading, setLoading] = useState(true);

  // Set the primary paper from URL params
  useEffect(() => {
    if (primaryPaper) {
      setSelectedPaper(primaryPaper);
    }
    setLoading(false);
  }, [primaryPaper, setSelectedPaper]);

  const handleStartQuiz = () => {
    if (!selectedPaper) {
      alert('Please select a paper before starting the quiz.');
      return;
    }

    const route = getQuizRoute(selectedPaper);
    navigate(route);
  };

  const getAvailableSecondPapers = () => {
    if (!selectedPaper || !allowedCombinations[selectedPaper]) {
      return [];
    }
    return allowedCombinations[selectedPaper];
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!gatePapers[selectedPaper]) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Invalid paper code</div>;
  }

  return (
    <div className="secondary-paper-selection">
      <Header />
      
      <section className="section papers-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">📋</span>
              <span>Secondary Paper Selection</span>
            </div>
            <h2 className="section-title">Select Your Secondary Paper</h2>
            <p className="section-subtitle">
              You've selected {selectedPaper} - {gatePapers[selectedPaper].name} as your primary paper.
              Choose an optional second paper from the allowed combinations.
            </p>
            <button className="btn btn-secondary back-btn" onClick={handleBackToHome}>
              ← Back to Home
            </button>
          </div>
          
          <div className="paper-selection">
            <div className="primary-paper-summary">
              <h3>Primary Paper</h3>
              <div className="selected-paper-display">
                <div className="paper-card selected">
                  <div className="paper-code">{selectedPaper}</div>
                  <div className="paper-name">{gatePapers[selectedPaper].name}</div>
                </div>
              </div>
            </div>

            {getAvailableSecondPapers().length > 0 && (
              <div className="second-paper">
                <h3>Second Paper (Optional)</h3>
                <p className="second-paper-info">
                  Available second papers for {selectedPaper}:
                </p>
                <div className="second-papers-list">
                  {getAvailableSecondPapers().map((code) => (
                    <div
                      key={code}
                      className={`paper-card ${selectedSecondPaper === code ? 'selected' : ''}`}
                      onClick={() => setSelectedSecondPaper(selectedSecondPaper === code ? '' : code)}
                    >
                      <div className="paper-code">{code}</div>
                      <div className="paper-name">{gatePapers[code].name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="selected-summary">
              <h3>Your Selection</h3>
              <div className="selection-summary">
                <div className="primary-selection">
                  <strong>Primary:</strong> {selectedPaper} - {gatePapers[selectedPaper].name}
                </div>
                {selectedSecondPaper && (
                  <div className="second-selection">
                    <strong>Second:</strong> {selectedSecondPaper} - {gatePapers[selectedSecondPaper].name}
                  </div>
                )}
              </div>
              <div className="quiz-route-info">
                {selectedPaper === 'CS' && (
                  <p className="route-info">→ CS GATE Mixed Practice (65Q, 100M, 180min)</p>
                )}
                {selectedPaper === 'DA' && (
                  <p className="route-info">→ DA GATE Mixed Practice (65Q, 100M, 180min)</p>
                )}
                {selectedPaper && selectedPaper !== 'CS' && selectedPaper !== 'DA' && (
                  <p className="route-info fallback">
                    → CS GATE Simulation (65Q, 100M, 180min) - {getPaperDisplayName(selectedPaper)} questions coming soon!
                  </p>
                )}
              </div>
              <button className="btn btn-primary start-quiz-btn" onClick={handleStartQuiz}>
                🎯 Start GATE Simulation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondaryPaperSelection;
