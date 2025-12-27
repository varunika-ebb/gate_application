import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            GATE Quiz App
          </Link>
          <nav>
            <ul className="nav-links">
              {isHomePage ? (
                <>
                  <li><a href="#papers">Papers</a></li>
                  <li><a href="#question-types">Question Types</a></li>
                  <li><a href="#exam-structure">Exam Structure</a></li>
                  <li><Link to="/syllabus">Syllabus</Link></li>
                  <li><Link to="/practice">Practice</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/syllabus">Syllabus</Link></li>
                  <li><Link to="/practice">Practice</Link></li>
                </>
              )}
            </ul>
          </nav>

          {/* Authentication Section */}
          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <button
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user?.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <div className="user-details">
                        <strong>{user?.name}</strong>
                        <small>{user?.email}</small>
                      </div>
                      <div className="user-stats">
                        <span>Accuracy: {user?.accuracy || 0}%</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>📊</span> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>👤</span> Profile
                    </Link>
                    <Link
                      to="/leaderboard"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>🏆</span> Leaderboard
                    </Link>
                    
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="dropdown-item admin-link"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <span>⚙️</span> Admin Panel
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">
                  Sign In
                </Link>
                <Link to="/register" className="register-btn">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
