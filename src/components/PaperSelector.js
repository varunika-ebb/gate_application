import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaper } from '../context/PaperContext';
import { gatePapers, allowedCombinations } from '../data/gateData';
import './PaperSelector.css';

const PaperSelector = () => {
  const navigate = useNavigate();
  const {
    selectedPaper,
    setSelectedPaper,
    selectedSecondPaper,
    setSelectedSecondPaper,
    getQuizRoute,
    getPaperDisplayName
  } = usePaper();

  const handlePaperChange = (paperCode) => {
    alert(`Paper selected: ${paperCode}. Navigating to secondary paper selection...`);
    console.log('handlePaperChange called with:', paperCode);
    setSelectedPaper(paperCode);
    setSelectedSecondPaper(''); // Reset second paper when primary changes
    
    // Navigate to secondary paper selection page
    console.log('Navigating to:', `/secondary-paper/${paperCode}`);
    
    // Try React Router navigation first
    try {
      navigate(`/secondary-paper/${paperCode}`);
    } catch (error) {
      console.error('React Router navigation failed:', error);
      // Fallback to window.location
      window.location.href = `/secondary-paper/${paperCode}`;
    }
  };

  const handleStartQuiz = () => {
    if (!selectedPaper) {
      alert('Please select a paper before starting the quiz.');
      return;
    }

    // Navigate based on paper selection with enhanced logic
    const route = getQuizRoute(selectedPaper);
    navigate(route);
  };

  const getAvailableSecondPapers = () => {
    if (!selectedPaper || !allowedCombinations[selectedPaper]) {
      return [];
    }
    return allowedCombinations[selectedPaper];
  };

  const groupedPapers = Object.entries(gatePapers).reduce((acc, [code, paper]) => {
    if (!acc[paper.category]) {
      acc[paper.category] = [];
    }
    acc[paper.category].push({ code, ...paper });
    return acc;
  }, {});

  return (
    <section id="papers" className="section papers-section">
      <div className="container">
                  <div className="section-header">
            <div className="section-badge">
              <span className="badge-icon">📋</span>
              <span>GATE Papers</span>
            </div>
            <h2 className="section-title">Select Your GATE Paper</h2>
            <p className="section-subtitle">
              Choose your primary paper and optionally select a second paper from the allowed combinations.
              Our platform covers all major engineering and science disciplines.
            </p>
            <button 
              onClick={() => handlePaperChange('MA')} 
              style={{marginTop: '20px', padding: '10px 20px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginRight: '10px'}}
            >
              🧪 Test Navigation (MA)
            </button>
            <button 
              onClick={() => navigate('/test/MA')} 
              style={{marginTop: '20px', padding: '10px 20px', background: '#4ecdc4', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}
            >
              🧪 Test Direct Route (MA)
            </button>
          </div>
        
        <div className="paper-selection">
          <div className="primary-paper">
            <h3>Primary Paper</h3>
            <div className="papers-grid">
              {Object.entries(groupedPapers).map(([category, papers]) => (
                <div key={category} className="category-group">
                  <h4 className="category-title">{category}</h4>
                  <div className="papers-list">
                    {papers.map(({ code, name }) => (
                      <div
                        key={code}
                        className={`paper-card ${selectedPaper === code ? 'selected' : ''}`}
                        onClick={() => handlePaperChange(code)}
                      >
                        <div className="paper-code">{code}</div>
                        <div className="paper-name">{name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedPaper && getAvailableSecondPapers().length > 0 && (
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

          {selectedPaper && (
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
                  <p className="route-info fallback">→ CS GATE Simulation (65Q, 100M, 180min) - {getPaperDisplayName(selectedPaper)} questions coming soon!</p>
                )}
              </div>
              <button className="btn btn-primary start-quiz-btn" onClick={handleStartQuiz}>
                🎯 Start GATE Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaperSelector;
