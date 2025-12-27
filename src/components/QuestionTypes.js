import React from 'react';
import { questionTypes } from '../data/gateData';
import './QuestionTypes.css';

const QuestionTypes = () => {
  return (
    <section id="question-types" className="section question-types-section">
      <div className="container">
        <h2 className="section-title">Question Types & Marking Scheme</h2>
        <p className="section-subtitle">
          Understanding the different question formats and their marking patterns is crucial for GATE success
        </p>
        
        <div className="question-types-grid">
          {questionTypes.map((type, index) => (
            <div key={index} className="question-type-card">
              <div className="type-header">
                <div className="type-badge">{type.type}</div>
                <h3>{type.name}</h3>
              </div>
              <p className="type-description">{type.description}</p>
              <div className="marking-info">
                <h4>Marking Scheme:</h4>
                <p>{type.marking}</p>
              </div>
              {type.type === 'MCQ' && (
                <div className="negative-marking-warning">
                  ⚠️ Negative marking applies
                </div>
              )}
              {(type.type === 'MSQ' || type.type === 'NAT') && (
                <div className="no-negative-marking">
                  ✅ No negative marking
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="marking-tips">
          <h3>Strategic Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>MCQ Strategy</h4>
              <p>Be cautious with guessing due to negative marking. Eliminate wrong options first.</p>
            </div>
            <div className="tip-card">
              <h4>MSQ Strategy</h4>
              <p>No negative marking means you can attempt all MSQs. Partial marking not available.</p>
            </div>
            <div className="tip-card">
              <h4>NAT Strategy</h4>
              <p>Focus on accuracy in calculations. No negative marking allows confident attempts.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionTypes;
