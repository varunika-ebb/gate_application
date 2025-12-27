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
    setSelectedSecondPaper
  } = usePaper();

  const handlePaperChange = (paperCode) => {
    setSelectedPaper(paperCode);
    setSelectedSecondPaper(''); // Reset second paper when primary changes
    
    // Navigate to secondary paper selection page
    navigate(`/secondary-paper?paper=${paperCode}`);
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
        </div>
      </div>
    </section>
  );
};

export default PaperSelector;
