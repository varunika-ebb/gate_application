import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
        </div>
      </div>
    </header>
  );
};

export default Header;
