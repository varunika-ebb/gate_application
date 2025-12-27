import React, { useState } from 'react';
import { usePaper } from '../context/PaperContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Hero from './Hero';
import PaperSelector from './PaperSelector';
import QuestionTypes from './QuestionTypes';
import ExamStructure from './ExamStructure';
import Stats from './Stats';
import AIStudyAssistant from './AIStudyAssistant';
import Footer from './Footer';
import './Home.css';

const Home = () => {
  const { selectedPaper } = usePaper();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    
  ];

  return (
    <div className="home">
      <Header />
      <Hero />
      
      {isAuthenticated && (
        <div className="home-tabs">
          <div className="tabs-container">
            <div className="tabs-header">
              <h2>Study Hub</h2>
              <div className="tabs-nav">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <PaperSelector />
                  <QuestionTypes />
                  <ExamStructure selectedPaper={selectedPaper} />
                  <Stats />
                </div>
              )}
              
              
            </div>
          </div>
        </div>
      )}
      
      {!isAuthenticated && (
        <div className="guest-content">
          <PaperSelector />
          <QuestionTypes />
          <ExamStructure selectedPaper={selectedPaper} />
          <Stats />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Home;
