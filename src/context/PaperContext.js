import React, { createContext, useContext, useState } from 'react';

const PaperContext = createContext();

export const usePaper = () => {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error('usePaper must be used within a PaperProvider');
  }
  return context;
};

export const PaperProvider = ({ children }) => {
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedSecondPaper, setSelectedSecondPaper] = useState('');

  const resetSelection = () => {
    setSelectedPaper('');
    setSelectedSecondPaper('');
  };

  const getPaperDisplayName = (paperCode) => {
    const paperMap = {
      'CS': 'Computer Science & Information Technology',
      'DA': 'Data Science & Artificial Intelligence',
      'EC': 'Electronics & Communication Engineering',
      'EE': 'Electrical Engineering',
      'ME': 'Mechanical Engineering',
      'CE': 'Civil Engineering',
      'CH': 'Chemical Engineering',
      'IN': 'Instrumentation Engineering',
      'PE': 'Petroleum Engineering',
      'TF': 'Textile Engineering & Fibre Science',
      'XE': 'Engineering Sciences',
      'XL': 'Life Sciences',
      'AR': 'Architecture & Planning',
      'CY': 'Chemistry',
      'GG': 'Geology & Geophysics',
      'MA': 'Mathematics',
      'PH': 'Physics',
      'ST': 'Statistics',
      'BM': 'Biomedical Engineering',
      'BT': 'Biotechnology',
      'MT': 'Metallurgical Engineering',
      'MN': 'Mining Engineering',
      'AG': 'Agricultural Engineering',
      'ES': 'Environmental Science & Engineering'
    };
    return paperMap[paperCode] || paperCode;
  };

  const getQuizRoute = (paperCode) => {
    switch (paperCode) {
      case 'CS':
        return '/quiz/cs/all';
      case 'DA':
        return '/quiz/da/all';
      default:
        // All other papers default to CS simulation
        return '/quiz/cs/all';
    }
  };

  const value = {
    selectedPaper,
    setSelectedPaper,
    selectedSecondPaper,
    setSelectedSecondPaper,
    resetSelection,
    getPaperDisplayName,
    getQuizRoute
  };

  return (
    <PaperContext.Provider value={value}>
      {children}
    </PaperContext.Provider>
  );
};

export default PaperContext;
