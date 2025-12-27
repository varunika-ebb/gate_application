import React from 'react';
import { examStructure, gatePapers } from '../data/gateData';
import './ExamStructure.css';

const ExamStructure = ({ selectedPaper }) => {
  const getExamStructureForPaper = (paperCode) => {
    if (!paperCode) return examStructure.standard;
    
    if (examStructure.xe.papers.includes(paperCode)) {
      return examStructure.xe;
    } else if (examStructure.special.papers.includes(paperCode)) {
      return examStructure.special;
    } else {
      return examStructure.standard;
    }
  };

  const currentStructure = getExamStructureForPaper(selectedPaper);
  const structure = currentStructure.structure;

  return (
    <section id="exam-structure" className="section exam-structure-section">
      <div className="container">
        <h2 className="section-title">Exam Structure</h2>
        <p className="section-subtitle">
          {selectedPaper 
            ? `Detailed breakdown for ${selectedPaper} - ${gatePapers[selectedPaper]?.name}`
            : "Understanding the GATE exam pattern and mark distribution"
          }
        </p>

        <div className="structure-overview">
          <div className="structure-card main-structure">
            <h3>Overall Structure</h3>
            <div className="structure-stats">
              <div className="stat">
                <span className="stat-number">{structure.total}</span>
                <span className="stat-label">Total Marks</span>
              </div>
              <div className="stat">
                <span className="stat-number">{structure.duration}</span>
                <span className="stat-label">Minutes</span>
              </div>
              <div className="stat">
                <span className="stat-number">65</span>
                <span className="stat-label">Questions</span>
              </div>
            </div>
          </div>

          <div className="structure-breakdown">
            <h3>Mark Distribution</h3>
            <div className="breakdown-grid">
              <div className="breakdown-item">
                <div className="breakdown-header">
                  <h4>General Aptitude</h4>
                  <span className="marks">{structure.generalAptitude} marks</span>
                </div>
                <p>Verbal ability and numerical ability questions</p>
                <div className="question-count">10 questions (5 × 1-mark + 5 × 2-mark)</div>
              </div>

              {structure.engineeringMath && (
                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <h4>Engineering Mathematics</h4>
                    <span className="marks">{structure.engineeringMath} marks</span>
                  </div>
                  <p>Core mathematical concepts for engineering</p>
                  <div className="question-count">11 questions (7 × 1-mark + 4 × 2-mark)</div>
                </div>
              )}

              {structure.engineeringMathXE && (
                <div className="breakdown-item">
                  <div className="breakdown-header">
                    <h4>Engineering Mathematics (XE-A)</h4>
                    <span className="marks">{structure.engineeringMathXE} marks</span>
                  </div>
                  <p>Mandatory section for XE paper</p>
                  <div className="question-count">15 questions</div>
                </div>
              )}

              <div className="breakdown-item">
                <div className="breakdown-header">
                  <h4>Subject Questions</h4>
                  <span className="marks">{structure.subjectQuestions || structure.subjectQuestions} marks</span>
                </div>
                <p>Core subject-specific technical questions</p>
                <div className="question-count">
                  {structure.subjectQuestions === 85 ? '55 questions' : '44 questions'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="exam-categories">
          <h3>Paper Categories</h3>
          <div className="categories-grid">
            <div className="category-card">
              <h4>Standard Engineering Papers</h4>
              <p>Most engineering disciplines with Engineering Mathematics section</p>
              <div className="paper-list">
                {examStructure.standard.papers.map(code => (
                  <span key={code} className={`paper-tag ${selectedPaper === code ? 'selected' : ''}`}>
                    {code}
                  </span>
                ))}
              </div>
            </div>

            <div className="category-card">
              <h4>Special Papers</h4>
              <p>Science and other disciplines without separate Engineering Mathematics</p>
              <div className="paper-list">
                {examStructure.special.papers.map(code => (
                  <span key={code} className={`paper-tag ${selectedPaper === code ? 'selected' : ''}`}>
                    {code}
                  </span>
                ))}
              </div>
            </div>

            <div className="category-card">
              <h4>XE Paper</h4>
              <p>Engineering Sciences with mandatory XE-A section</p>
              <div className="paper-list">
                <span className={`paper-tag ${selectedPaper === 'XE' ? 'selected' : ''}`}>XE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamStructure;
