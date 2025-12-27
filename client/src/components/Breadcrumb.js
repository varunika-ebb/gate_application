import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSectionByCode } from '../data/csSyllabusData';
import { getSectionByCode as getDASection } from '../data/daSyllabusData';
import { getSectionByCode as getGASection } from '../data/gaSyllabusData';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbName = (pathname, index) => {
    switch (pathname) {
      case 'practice':
        return 'Practice';
      case 'syllabus':
        return 'Syllabus';
      case 'cs-sections':
        return 'CS Sections';
      case 'da-sections':
        return 'DA Sections';
      case 'ga-sections':
        return 'GA Sections';
      case 'quiz':
        return 'Quiz';
      case 'mock-tests':
        return 'Mock Tests';
      case 'mock-test':
        return 'Mock Test';
      case 'cs':
        return 'Computer Science';
      case 'da':
        return 'Data Science & AI';
      case 'ga':
        return 'General Aptitude';
      default:
        // Check if it's a CS section code
        const csSection = getSectionByCode(pathname);
        if (csSection) {
          return csSection.name;
        }
        // Check if it's a DA section code
        const daSection = getDASection(pathname);
        if (daSection) {
          return daSection.name;
        }
        // Check if it's a GA section code
        const gaSection = getGASection(pathname);
        if (gaSection) {
          return gaSection.name;
        }
        // Check if it's a test ID
        if (/^\d+$/.test(pathname)) {
          return `Test ${pathname}`;
        }
        return pathname.charAt(0).toUpperCase() + pathname.slice(1);
    }
  };

  const getBreadcrumbPath = (index) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumb on home page
  }

  return (
    <nav className="breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">
              🏠 Home
            </Link>
          </li>
          {pathnames.map((pathname, index) => {
            const isLast = index === pathnames.length - 1;
            const path = getBreadcrumbPath(index);
            const name = getBreadcrumbName(pathname, index);

            return (
              <li key={index} className="breadcrumb-item">
                <span className="breadcrumb-separator">›</span>
                {isLast ? (
                  <span className="breadcrumb-current">{name}</span>
                ) : (
                  <Link to={path} className="breadcrumb-link">
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
