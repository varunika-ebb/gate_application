import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">🎯</span>
              <span>GATE 2026 Preparation</span>
            </div>
            <h1>Master GATE with Smart Practice</h1>
            <p>
              Join thousands of successful candidates with our comprehensive GATE preparation platform.
              Practice with 1000+ curated questions, take realistic mock tests, and track your progress
              across Computer Science, Data Science & AI, and General Aptitude.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✅</span>
                <span>GATE-style Questions</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Detailed Analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⏱️</span>
                <span>Timed Practice</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/practice" className="btn btn-primary">
                <span className="btn-icon">🚀</span>
                Start Practice Now
              </Link>
              <Link to="/syllabus" className="btn btn-secondary">
                <span className="btn-icon">📚</span>
                Explore Syllabus
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-container">
              <div className="hero-main-image">
                <div className="image-placeholder">
                  <div className="placeholder-content">
                    <div className="study-icon">📖</div>
                    <div className="floating-elements">
                      <div className="element element-1">💡</div>
                      <div className="element element-2">🎓</div>
                      <div className="element element-3">⭐</div>
                      <div className="element element-4">🏆</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-stats-visual">
                <div className="stat-card">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Questions</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Subjects</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">GATE Pattern</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
