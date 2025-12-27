import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import Home from './components/Home';
import Practice from './components/Practice';
import Quiz from './components/Quiz';
import CSSections from './components/CSSections';
import DASections from './components/DASections';
import GASections from './components/GASections';
import MockTestSelection from './components/MockTestSelection';
import MockTestQuiz from './components/MockTestQuiz';
import Syllabus from './components/Syllabus';
import SecondaryPaperSelection from './components/SecondaryPaperSelection';
import TestNavigation from './components/TestNavigation';
import './App.css';

function App() {
  return (
    <PaperProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/secondary-paper/:primaryPaper" element={<SecondaryPaperSelection />} />
            <Route path="/test/:primaryPaper" element={<TestNavigation />} />
            <Route path="/cs-sections" element={<CSSections />} />
            <Route path="/da-sections" element={<DASections />} />
            <Route path="/ga-sections" element={<GASections />} />
            <Route path="/quiz/:subject" element={<Quiz />} />
            <Route path="/quiz/cs/:section" element={<Quiz />} />
            <Route path="/quiz/da/:section" element={<Quiz />} />
            <Route path="/quiz/ga/:section" element={<Quiz />} />
            <Route path="/mock-tests/cs/:section" element={<MockTestSelection />} />
            <Route path="/mock-tests/da/:section" element={<MockTestSelection />} />
            <Route path="/mock-tests/ga/:section" element={<MockTestSelection />} />
            <Route path="/mock-test/cs/:section/:testId" element={<MockTestQuiz />} />
            <Route path="/mock-test/da/:section/:testId" element={<MockTestQuiz />} />
            <Route path="/mock-test/ga/:section/:testId" element={<MockTestQuiz />} />
          </Routes>
        </div>
      </Router>
    </PaperProvider>
  );
}

export default App;
