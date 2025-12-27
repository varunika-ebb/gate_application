import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Practice from './components/Practice';
import Quiz from './components/Quiz';
import CSSections from './components/CSSections';
import DASections from './components/DASections';
import GASections from './components/GASections';
import MockTestSelection from './components/MockTestSelection';
import MockTestQuiz from './components/MockTestQuiz';
import Syllabus from './components/Syllabus';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';
import SecondaryPaperSelector from './components/SecondaryPaperSelector';

function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/syllabus" element={<Syllabus />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/practice" element={
                <PrivateRoute>
                  <Practice />
                </PrivateRoute>
              } />
              <Route path="/cs-sections" element={
                <PrivateRoute>
                  <CSSections />
                </PrivateRoute>
              } />
              <Route path="/da-sections" element={
                <PrivateRoute>
                  <DASections />
                </PrivateRoute>
              } />
              <Route path="/ga-sections" element={
                <PrivateRoute>
                  <GASections />
                </PrivateRoute>
              } />
              <Route path="/quiz/:subject" element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              } />
              <Route path="/quiz/cs/:section" element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              } />
              <Route path="/quiz/da/:section" element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              } />
              <Route path="/quiz/ga/:section" element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              } />
              <Route path="/mock-tests/cs/:section" element={
                <PrivateRoute>
                  <MockTestSelection />
                </PrivateRoute>
              } />
              <Route path="/mock-tests/da/:section" element={
                <PrivateRoute>
                  <MockTestSelection />
                </PrivateRoute>
              } />
              <Route path="/mock-tests/ga/:section" element={
                <PrivateRoute>
                  <MockTestSelection />
                </PrivateRoute>
              } />
              <Route path="/mock-test/cs/:section/:testId" element={
                <PrivateRoute>
                  <MockTestQuiz />
                </PrivateRoute>
              } />
              <Route path="/mock-test/da/:section/:testId" element={
                <PrivateRoute>
                  <MockTestQuiz />
                </PrivateRoute>
              } />
              <Route path="/mock-test/ga/:section/:testId" element={
                <PrivateRoute>
                  <MockTestQuiz />
                </PrivateRoute>
              } />
              <Route path="/leaderboard" element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              
              <Route path="/secondary-paper" element={<SecondaryPaperSelector />} />
            </Routes>
          </div>
        </Router>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
