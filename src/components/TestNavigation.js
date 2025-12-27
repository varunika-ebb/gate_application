import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TestNavigation = () => {
  const navigate = useNavigate();
  const { primaryPaper } = useParams();

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🧪 Test Navigation Page</h1>
      <p>Primary Paper: {primaryPaper}</p>
      <p>If you can see this page, React Router is working!</p>
      <button 
        onClick={() => navigate('/')}
        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default TestNavigation;
