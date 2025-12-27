import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePaper } from '../context/PaperContext';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { getSectionByCode } from '../data/csSyllabusData';
import { getSectionByCode as getDASection } from '../data/daSyllabusData';
import { getSectionByCode as getGASection } from '../data/gaSyllabusData';
import { getPracticeQuestions } from '../data/practiceQuestions';
import { getDAPracticeQuestions } from '../data/daPracticeQuestions';
import { getGAPracticeQuestions } from '../data/gaPracticeQuestions';
import { getMixedPracticeQuestions, getMixedPracticeStats } from '../data/mixedPracticeQuestions';
import { getDAMixedPracticeQuestions, getDAMixedPracticeStats } from '../data/daMixedPracticeQuestions';
import { getGAMixedPracticeQuestions, getGAMixedPracticeStats } from '../data/gaMixedPracticeQuestions';
import './Quiz.css';

const Quiz = () => {
  const { subject, section } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPaper, getPaperDisplayName } = usePaper();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const [sessionId] = useState(() => Date.now() + Math.random()); // Generate unique session ID

  // Determine quiz type and set appropriate timer
  const isCSPractice = location.pathname.includes('/quiz/cs/') && section;
  const isDAPractice = location.pathname.includes('/quiz/da/') && section;
  const isGAPractice = location.pathname.includes('/quiz/ga/') && section;
  const isPracticeSession = isCSPractice || isDAPractice || isGAPractice;
  const isMixedPractice = location.pathname.includes('/quiz/cs/all') || location.pathname.includes('/quiz/da/all') || location.pathname.includes('/quiz/ga/all');

  let initialTime;
  if (isMixedPractice) {
    if (location.pathname.includes('/quiz/ga/all')) {
      initialTime = 1800; // 30 minutes for GA final test
    } else {
      initialTime = 10800; // 180 minutes (3 hours) for CS/DA mixed practice
    }
  } else if (isPracticeSession) {
    initialTime = 2700; // 45 minutes for section practice
  } else {
    initialTime = 3600; // 60 minutes for regular quiz
  }

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const subjectInfo = {
    cs: {
      name: 'Computer Science & Information Technology',
      code: 'CS',
      icon: '💻'
    },
    da: {
      name: 'Data Science & Artificial Intelligence',
      code: 'DA',
      icon: '🤖'
    },
    ga: {
      name: 'General Aptitude',
      code: 'GA',
      icon: '🧠'
    }
  };

  // Get section info based on subject type
  const csSection = isCSPractice ? getSectionByCode(section) : null;
  const daSection = isDAPractice ? getDASection(section) : null;
  const gaSection = isGAPractice ? getGASection(section) : null;
  const currentSection = csSection || daSection || gaSection;

  // Initialize questions only once when component mounts
  useEffect(() => {
    console.log(`Generating questions for session ${sessionId}, type: ${isMixedPractice ? 'mixed' : isPracticeSession ? 'section' : 'regular'}`);

    if (isMixedPractice) {
      // Generate mixed practice questions based on subject
      if (location.pathname.includes('/quiz/da/all')) {
        // DA GATE-style mixed practice (65 questions, 100 marks)
        const mixedQuestions = getDAMixedPracticeQuestions();
        console.log(`Generated ${mixedQuestions.length} DA mixed practice questions`);
        setQuestions(mixedQuestions);
      } else if (location.pathname.includes('/quiz/ga/all')) {
        // GA Final Test (15 questions, 15 marks)
        const mixedQuestions = getGAMixedPracticeQuestions();
        console.log(`Generated ${mixedQuestions.length} GA mixed practice questions`);
        setQuestions(mixedQuestions);
      } else {
        // CS GATE-style mixed practice (65 questions, 100 marks)
        const mixedQuestions = getMixedPracticeQuestions();
        console.log(`Generated ${mixedQuestions.length} CS mixed practice questions`);
        setQuestions(mixedQuestions);
      }
      setQuestionsLoaded(true);
    } else if (isCSPractice && csSection) {
      // Generate fixed set of questions for CS section practice session
      const practiceQuestions = getPracticeQuestions(section, 30);
      console.log(`Generated ${practiceQuestions.length} CS questions for ${section}`);
      setQuestions(practiceQuestions);
      setQuestionsLoaded(true);
    } else if (isDAPractice && daSection) {
      // Generate fixed set of questions for DA section practice session
      const practiceQuestions = getDAPracticeQuestions(section, 30);
      console.log(`Generated ${practiceQuestions.length} DA questions for ${section}`);
      setQuestions(practiceQuestions);
      setQuestionsLoaded(true);
    } else if (isGAPractice && gaSection) {
      // Generate fixed set of questions for GA section practice session
      const practiceQuestions = getGAPracticeQuestions(section, 30);
      console.log(`Generated ${practiceQuestions.length} GA questions for ${section}`);
      setQuestions(practiceQuestions);
      setQuestionsLoaded(true);
    } else {
      // Default questions for non-practice sessions
      const defaultQuestions = [
        {
          id: 1,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
          correctAnswer: 1,
          type: "MCQ",
          marks: 1
        },
        {
          id: 2,
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          type: "MCQ",
          marks: 1
        },
        {
          id: 3,
          question: "What does SQL stand for?",
          options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
          correctAnswer: 0,
          type: "MCQ",
          marks: 2
        }
      ];
      setQuestions(defaultQuestions);
      setQuestionsLoaded(true);
    }
  }, [section, isPracticeSession, isMixedPractice, isCSPractice, isDAPractice, isGAPractice, csSection, daSection, gaSection, sessionId]); // Only re-run if session type or section changes

  // Determine current subject/section info with paper context
  const currentSubject = isMixedPractice ? {
    name: isCSPractice || location.pathname.includes('/quiz/cs/all') ?
      (selectedPaper && selectedPaper !== 'CS' ? `${getPaperDisplayName(selectedPaper)} (CS Simulation)` : 'GATE CS Mixed Practice') :
      'GATE DA Mixed Practice',
    code: 'MIXED',
    icon: '🎯',
    paperCode: selectedPaper || (isCSPractice ? 'CS' : 'DA')
  } : csSection ? {
    name: csSection.name,
    code: csSection.code,
    icon: csSection.icon
  } : daSection ? {
    name: daSection.name,
    code: daSection.code,
    icon: daSection.icon
  } : gaSection ? {
    name: gaSection.name,
    code: gaSection.code,
    icon: gaSection.icon
  } : (subjectInfo[subject] || subjectInfo.cs);

  useEffect(() => {
    let timer;
    if (quizStarted && questionsLoaded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && questionsLoaded) {
      handleSubmitQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, questionsLoaded]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    alert('Quiz submitted! Results will be displayed here.');
    if (isMixedPractice) {
      if (isCSPractice || location.pathname.includes('/quiz/cs/all')) {
        navigate('/cs-sections');
      } else {
        navigate('/da-sections');
      }
    } else if (section) {
      if (isCSPractice) {
        navigate('/cs-sections');
      } else if (isDAPractice) {
        navigate('/da-sections');
      } else if (isGAPractice) {
        navigate('/ga-sections');
      } else {
        navigate('/practice');
      }
    } else {
      navigate('/practice');
    }
  };

  // Show loading state while questions are being initialized
  if (!questionsLoaded) {
    return (
      <div className="quiz-page">
        <Header />
        <Breadcrumb />
        <div className="loading-container">
          <div className="container">
            <div className="loading-content">
              <h2>Loading Questions...</h2>
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <Header />
        <Breadcrumb />
        <section className="quiz-intro">
          <div className="container">
            <div className="quiz-intro-card">
              <div className="subject-info">
                <div className="subject-icon-large">{currentSubject.icon}</div>
                <h1>{currentSubject.name}</h1>
                <div className="subject-code-large">{currentSubject.code}</div>
              </div>
              
              <div className="quiz-details">
                <h2>Quiz Instructions</h2>
                {isMixedPractice && questionsLoaded && (
                  <div className="mixed-practice-breakdown">
                    <h3>Question Distribution:</h3>
                    <div className="breakdown-stats">
                      <div className="breakdown-item">
                        <strong>General Aptitude:</strong> 15 questions (15 marks)
                      </div>
                      <div className="breakdown-item">
                        <strong>{isCSPractice || location.pathname.includes('/quiz/cs/all') ? 'CS' : 'DA'} Subjects:</strong> 50 questions (85 marks)
                      </div>
                      <div className="breakdown-item">
                        <strong>Covers all {isCSPractice || location.pathname.includes('/quiz/cs/all') ? '10 CS' : '7 DA'} sections</strong> with proportional weightage
                      </div>
                      {selectedPaper && selectedPaper !== 'CS' && selectedPaper !== 'DA' && (
                        <div className="breakdown-item fallback-notice">
                          <strong>Note:</strong> {getPaperDisplayName(selectedPaper)} specific questions coming soon. Using CS simulation for practice.
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {currentSection && !isMixedPractice && (
                  <div className="section-topics-preview">
                    <h3>Topics Covered:</h3>
                    <div className="topics-list">
                      {currentSection.topics.map((topic, index) => (
                        <span key={index} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="instructions-grid">
                  <div className="instruction-item">
                    <strong>Duration:</strong> {isMixedPractice ? '180 minutes (3 hours)' : isPracticeSession ? '45 minutes' : '60 minutes'}
                  </div>
                  <div className="instruction-item">
                    <strong>Questions:</strong> {questions.length}
                  </div>
                  <div className="instruction-item">
                    <strong>Total Marks:</strong> {questions.reduce((sum, q) => sum + q.marks, 0)}
                  </div>
                  <div className="instruction-item">
                    <strong>Question Types:</strong> MCQ, MSQ, NAT
                  </div>
                  {isMixedPractice && (
                    <div className="instruction-item">
                      <strong>Format:</strong> GATE CS Exam Simulation
                    </div>
                  )}
                </div>
                
                <div className="quiz-rules">
                  <h3>Important Rules:</h3>
                  <ul>
                    <li>Each question has a time limit</li>
                    <li>Negative marking applies for MCQ questions</li>
                    <li>You can navigate between questions</li>
                    <li>Submit before time runs out</li>
                  </ul>
                </div>
                
                <button className="start-quiz-button" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <Header />
      <Breadcrumb />
      <section className="quiz-container">
        <div className="quiz-header">
          <div className="container">
            <div className="quiz-info">
              <h2>{currentSubject.name}</h2>
              <div className="quiz-progress">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="quiz-timer">
              <div className="timer-display">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <div className="container">
            <div className="question-section">
              <div className="question-header">
                <div className="question-meta-left">
                  <span className="question-type">{question.type}</span>
                  {isMixedPractice && question.section && (
                    <span className="question-section">{question.section}</span>
                  )}
                </div>
                <span className="question-marks">{question.marks} Mark{question.marks > 1 ? 's' : ''}</span>
              </div>
              
              <div className="question-text">
                <h3>Q{currentQuestion + 1}. {question.question}</h3>
              </div>
              
              <div className="options-container">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="option-label">{String.fromCharCode(65 + index)}</div>
                    <div className="option-text">{option}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quiz-navigation">
              <button 
                className="nav-btn prev-btn" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              
              <div className="question-palette">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`palette-btn ${index === currentQuestion ? 'current' : ''} ${selectedAnswers[index] !== undefined ? 'answered' : ''}`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {currentQuestion === questions.length - 1 ? (
                <button className="nav-btn submit-btn" onClick={handleSubmitQuiz}>
                  Submit Quiz
                </button>
              ) : (
                <button className="nav-btn next-btn" onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
