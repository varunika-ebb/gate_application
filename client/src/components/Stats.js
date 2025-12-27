import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      number: "1000+",
      label: "Practice Questions",
      description: "Curated questions across all subjects",
      icon: "📚"
    },
    {
      number: "3",
      label: "Core Subjects",
      description: "CS, DA, and General Aptitude",
      icon: "🎯"
    },
    {
      number: "100%",
      label: "GATE Pattern",
      description: "Authentic exam simulation",
      icon: "✅"
    },
    {
      number: "24/7",
      label: "Access",
      description: "Practice anytime, anywhere",
      icon: "⏰"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-background">
        <div className="stats-pattern"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="container">
        <div className="stats-header">
          <div className="section-badge">
            <span className="badge-icon">📊</span>
            <span>Platform Statistics</span>
          </div>
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <p className="section-subtitle">
            Join thousands of successful GATE candidates who trust our comprehensive preparation platform
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
