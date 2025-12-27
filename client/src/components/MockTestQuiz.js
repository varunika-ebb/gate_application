import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { getSectionByCode } from '../data/csSyllabusData';
import { getSectionByCode as getDASection } from '../data/daSyllabusData';
import { getSectionByCode as getGASection } from '../data/gaSyllabusData';
import { getMockTestQuestions } from '../data/mockTestQuestions';
import { getDAMockTestQuestions } from '../data/daMockTestQuestions';
import { getGAMockTestQuestions } from '../data/gaMockTestQuestions';
import './MockTestQuiz.css';

const MockTestQuiz = () => {
  const { section, testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);

  // Determine subject type based on the URL
  const isDA = location.pathname.includes('/da/');
  const isGA = location.pathname.includes('/ga/');
  const csSection = !isDA && !isGA ? getSectionByCode(section) : null;
  const daSection = isDA ? getDASection(section) : null;
  const gaSection = isGA ? getGASection(section) : null;
  const sectionData = csSection || daSection || gaSection;

  const questions = isDA ? getDAMockTestQuestions(section, testId) :
                   isGA ? getGAMockTestQuestions(section, testId) :
                   getMockTestQuestions(section, parseInt(testId));

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitTest();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResults]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
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

  const handleSubmitTest = async () => {
    const results = calculateResults();
    setShowResults(true);

    // Save quiz attempt to history
    try {
      const quizData = {
        quizName: `${sectionData.name} - Mock Test ${testId}`,
        subject: isDA ? 'DA' : isGA ? 'GA' : 'CS',
        section: sectionData.name,
        quizType: 'mock_test',
        score: Number(results.score),
        totalQuestions: questions.length,
        correctAnswers: Number(results.correct),
        incorrectAnswers: Number(results.incorrect),
        unattempted: Number(results.unattempted),
        percentage: Number(results.percentage),
        timeSpent: (1200 - timeLeft) || 0,
        difficulty: 'mixed',
        sessionId: Date.now() + Math.random()
      };

      await axios.post('/api/quiz/save-attempt', quizData);
    } catch (err) {
      console.error('Failed to save mock test attempt:', err);
    }
  };

  const calculateResults = () => {
    let score = 0;
    let attempted = 0;
    let correct = 0;
    const wrongAnswers = [];

    questions.forEach((question, index) => {
      if (selectedAnswers[index] !== undefined) {
        attempted++;
        if (selectedAnswers[index] === question.correctAnswer) {
          correct++;
          score += question.marks;
        } else {
          // Add to wrong answers for review
          wrongAnswers.push({
            questionIndex: index,
            question: question,
            selectedAnswer: selectedAnswers[index],
            correctAnswer: question.correctAnswer,
            explanation: question.explanation
          });
          if (question.type === 'MCQ') {
            // Negative marking for MCQ
            score -= question.marks === 1 ? 1/3 : 2/3;
          }
        }
      }
    });

    return {
      score: Math.max(0, score).toFixed(2),
      attempted,
      correct,
      incorrect: attempted - correct,
      unattempted: questions.length - attempted,
      percentage: ((correct / questions.length) * 100).toFixed(1),
      wrongAnswers
    };
  };

  if (!sectionData || !questions) {
    return (
      <div className="mock-test-quiz-page">
        <Header />
        <div className="container">
          <h1>Test not found</h1>
          <button onClick={() => navigate(isDA ? '/da-sections' : isGA ? '/ga-sections' : '/cs-sections')}>
            Back to {isDA ? 'DA' : isGA ? 'GA' : 'CS'} Sections
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    return (
      <div className="mock-test-quiz-page">
        <Header />
        <Breadcrumb />
        <section className="results-container">
          <div className="container">
            <div className="results-card">
              <h1>🎉 Test Completed!</h1>
              <div className="test-info">
                <h2>{sectionData.name} - Mock Test {testId}</h2>
              </div>
              
              <div className="results-summary">
                <div className="score-display">
                  <div className="score-number">{results.score}</div>
                  <div className="score-label">Total Score</div>
                </div>
                
                <div className="results-stats">
                  <div className="result-stat">
                    <span className="stat-number">{results.percentage}%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-number">{results.correct}</span>
                    <span className="stat-label">Correct</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-number">{results.incorrect}</span>
                    <span className="stat-label">Incorrect</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-number">{results.unattempted}</span>
                    <span className="stat-label">Unattempted</span>
                  </div>
                </div>
              </div>

              <div className="results-actions">
                {results.wrongAnswers && results.wrongAnswers.length > 0 && (
                  <button 
                    className="action-btn review-btn" 
                    onClick={() => setShowWrongAnswers(!showWrongAnswers)}
                  >
                    {showWrongAnswers ? 'Hide' : 'Review'} Wrong Answers ({results.wrongAnswers.length})
                  </button>
                )}
                <button 
                  className="action-btn primary"
                  onClick={() => navigate(`/mock-tests/${isDA ? 'da' : isGA ? 'ga' : 'cs'}/${section.toLowerCase()}`)}
                >
                  Take Another Test
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => navigate(isDA ? '/da-sections' : isGA ? '/ga-sections' : '/cs-sections')}
                >
                  Back to {isDA ? 'DA' : isGA ? 'GA' : 'CS'} Sections
                </button>
              </div>

              {/* Wrong Answers Review Section */}
              {showWrongAnswers && results.wrongAnswers && results.wrongAnswers.length > 0 && (
                <div className="wrong-answers-section">
                  <h3>📝 Wrong Answers Review</h3>
                  <div className="wrong-answers-list">
                    {results.wrongAnswers.map((wrongAnswer, index) => (
                      <div key={index} className="wrong-answer-item">
                        <div className="question-header">
                          <span className="question-number">Q{wrongAnswer.questionIndex + 1}</span>
                          <span className="question-type">{wrongAnswer.question.type}</span>
                          <span className="question-marks">{wrongAnswer.question.marks} Mark{wrongAnswer.question.marks > 1 ? 's' : ''}</span>
                        </div>
                        
                        <div className="question-text">
                          <h4>{wrongAnswer.question.question}</h4>
                        </div>
                        
                        <div className="options-review">
                          {wrongAnswer.question.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className={`option-review ${
                                optionIndex === wrongAnswer.correctAnswer ? 'correct-option' : 
                                optionIndex === wrongAnswer.selectedAnswer ? 'wrong-option' : 
                                'other-option'
                              }`}
                            >
                              <div className="option-label">
                                {String.fromCharCode(65 + optionIndex)}
                                {optionIndex === wrongAnswer.correctAnswer && ' ✓'}
                                {optionIndex === wrongAnswer.selectedAnswer && optionIndex !== wrongAnswer.correctAnswer && ' ✗'}
                              </div>
                              <div className="option-text">{option}</div>
                            </div>
                          ))}
                        </div>
                        
                        {wrongAnswer.explanation && (
                          <div className="answer-explanation">
                            <h5>Explanation:</h5>
                            <p>{wrongAnswer.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="mock-test-quiz-page">
        <Header />
        <Breadcrumb />
        <section className="test-intro">
          <div className="container">
            <div className="test-intro-card">
              <div className="test-header">
                <div className="section-icon">{sectionData.icon}</div>
                <h1>{sectionData.name}</h1>
                <div className="test-title">Mock Test {testId}</div>
              </div>
              
              <div className="test-details">
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Questions:</strong> {questions.length}
                  </div>
                  <div className="detail-item">
                    <strong>Duration:</strong> 20 minutes
                  </div>
                  <div className="detail-item">
                    <strong>Total Marks:</strong> {questions.reduce((sum, q) => sum + q.marks, 0)}
                  </div>
                  <div className="detail-item">
                    <strong>Question Types:</strong> MCQ, MSQ, NAT
                  </div>
                </div>
                
                <div className="test-instructions">
                  <h3>Instructions:</h3>
                  <ul>
                    <li>You have exactly 20 minutes to complete this test</li>
                    <li>MCQ questions have negative marking (-1/3 for 1-mark, -2/3 for 2-mark)</li>
                    <li>MSQ and NAT questions have no negative marking</li>
                    <li>You can navigate between questions using the question palette</li>
                    <li>Submit the test before time runs out</li>
                  </ul>
                </div>
                
                <button className="start-test-button" onClick={handleStartTest}>
                  Start Mock Test {testId}
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
    <div className="mock-test-quiz-page">
      <Header />
      <Breadcrumb />
      <section className="quiz-container">
        <div className="quiz-header">
          <div className="container">
            <div className="quiz-info">
              <h2>{sectionData.name} - Mock Test {testId}</h2>
              <div className="quiz-progress">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="quiz-timer">
              <div className={`timer-display ${timeLeft <= 300 ? 'warning' : ''}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-content">
          <div className="container">
            <div className="question-section">
              <div className="question-header">
                <span className="question-type">{question.type}</span>
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
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
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
                <button className="nav-btn submit-btn" onClick={handleSubmitTest}>
                  Submit Test
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

export default MockTestQuiz;
