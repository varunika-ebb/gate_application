import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { csSections } from '../data/csSyllabusData';
import { daSections } from '../data/daSyllabusData';
import { gaSections } from '../data/gaSyllabusData';
import './Syllabus.css';

const Syllabus = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      code: 'CS',
      name: 'Computer Science & Information Technology',
      icon: '💻',
      description: 'Core computer science topics including programming, algorithms, systems, and theory',
      sections: 10,
      marks: 85
    },
    {
      code: 'DA',
      name: 'Data Science & Artificial Intelligence',
      icon: '🤖',
      description: 'Machine learning, statistics, data analysis, and AI algorithms',
      sections: 7,
      marks: 85
    },
    {
      code: 'GA',
      name: 'General Aptitude',
      icon: '🧠',
      description: 'Verbal ability, numerical ability, and analytical reasoning',
      sections: 4,
      marks: 15
    }
  ];

  const handleSubjectClick = (subjectCode) => {
    if (subjectCode === 'CS') {
      setSelectedSubject('CS');
    } else if (subjectCode === 'DA') {
      setSelectedSubject('DA');
    } else if (subjectCode === 'GA') {
      setSelectedSubject('GA');
    } else {
      alert(`${subjectCode} syllabus coming soon!`);
    }
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  if (selectedSubject === 'CS') {
    return (
      <div className="syllabus-page">
        <Header />
        <Breadcrumb />

        

        <section className="cs-syllabus-content">
          <div className="container">
            <div className="cs-sections-simple">
              {csSections.map((section) => (
                <div key={section.id} className="cs-section-simple">
                  <div className="section-header-simple">
                    <div className="section-number">Section {section.id}</div>
                    <h3>{section.name}</h3>
                    <div className="section-code-badge">{section.code}</div>
                  </div>
                  <div className="topics-simple">
                    {section.topics.map((topic, index) => (
                      <span key={index} className="topic-simple">{topic}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (selectedSubject === 'DA') {
    return (
      <div className="syllabus-page">
        <Header />
        <Breadcrumb />


        <section className="da-syllabus-content">
          <div className="container">
            <div className="da-sections-simple">
              {daSections.map((section) => (
                <div key={section.id} className="da-section-simple">
                  <div className="section-header-simple">
                    <div className="section-number">Section {section.id}</div>
                    <h3>{section.name}</h3>
                    <div className="section-code-badge">{section.code}</div>
                  </div>
                  <div className="topics-simple">
                    {section.topics.map((topic, index) => (
                      <span key={index} className="topic-simple">{topic}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (selectedSubject === 'GA') {
    return (
      <div className="syllabus-page">
        <Header />
        <Breadcrumb />



        <section className="ga-syllabus-content">
          <div className="container">
            <div className="ga-sections-simple">
              {gaSections.map((section) => (
                <div key={section.id} className="ga-section-simple">
                  <div className="section-header-simple">
                    <div className="section-number">Section {section.id}</div>
                    <h3>{section.name}</h3>
                    <div className="section-code-badge">{section.code}</div>
                  </div>
                  <div className="topics-simple">
                    {section.topics.map((topic, index) => (
                      <span key={index} className="topic-simple">{topic}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="syllabus-page">
      <Header />
      <Breadcrumb />

      <section className="syllabus-hero">
        <div className="container">
          <div className="hero-content">
            <h1>GATE Syllabus 2026</h1>
            <p>Choose your subject to view the complete syllabus</p>
          </div>
        </div>
      </section>

      <section className="subjects-selection">
        <div className="container">
          <h2>Select Subject</h2>
          <div className="subjects-grid">
            {subjects.map((subject) => (
              <div
                key={subject.code}
                className="subject-card"
                onClick={() => handleSubjectClick(subject.code)}
              >
                <div className="subject-icon-large">{subject.icon}</div>
                <h3>{subject.name}</h3>
                <p className="subject-description">{subject.description}</p>
                <div className="subject-stats">
                  <div className="stat">
                    <span className="stat-number">{subject.sections}</span>
                    <span className="stat-label">Sections</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{subject.marks}</span>
                    <span className="stat-label">Marks</span>
                  </div>
                </div>
                <button className="view-syllabus-btn">
                  View Syllabus
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Syllabus;
