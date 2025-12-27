// Test script to verify subject determination logic
const testSubjectDetermination = () => {
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

  const testPaths = [
    '/quiz/cs/algorithms',
    '/quiz/da/machine-learning',
    '/quiz/ga/numerical-ability',
    '/quiz/cs/all',
    '/quiz/da/all',
    '/quiz/ga/all'
  ];

  console.log('🧪 Testing Subject Determination Logic\n');

  testPaths.forEach(path => {
    const isCSPractice = path.includes('/quiz/cs/') && !path.includes('/quiz/cs/all');
    const isDAPractice = path.includes('/quiz/da/') && !path.includes('/quiz/da/all');
    const isGAPractice = path.includes('/quiz/ga/') && !path.includes('/quiz/ga/all');
    const isMixedPractice = path.includes('/quiz/cs/all') || path.includes('/quiz/da/all') || path.includes('/quiz/ga/all');

    let currentSubject;
    
    if (isMixedPractice) {
      if (path.includes('/quiz/cs/all')) {
        currentSubject = {
          name: 'GATE CS Mixed Practice',
          code: 'MIXED',
          icon: '🎯',
          paperCode: 'CS'
        };
      } else if (path.includes('/quiz/da/all')) {
        currentSubject = {
          name: 'GATE DA Mixed Practice',
          code: 'MIXED',
          icon: '🎯',
          paperCode: 'DA'
        };
      } else {
        currentSubject = {
          name: 'GATE GA Mixed Practice',
          code: 'MIXED',
          icon: '🎯',
          paperCode: 'GA'
        };
      }
    } else {
      // Determine subject based on URL path
      if (path.includes('/quiz/da/')) {
        currentSubject = subjectInfo.da;
      } else if (path.includes('/quiz/ga/')) {
        currentSubject = subjectInfo.ga;
      } else if (path.includes('/quiz/cs/')) {
        currentSubject = subjectInfo.cs;
      } else {
        currentSubject = subjectInfo.cs; // fallback
      }
    }

    console.log(`Path: ${path}`);
    console.log(`  Subject: ${currentSubject.name}`);
    console.log(`  Code: ${currentSubject.code}`);
    console.log(`  Icon: ${currentSubject.icon}`);
    console.log(`  Type: ${isMixedPractice ? 'Mixed Practice' : 'Section Practice'}`);
    console.log('');
  });

  console.log('✅ Subject determination test completed!');
};

testSubjectDetermination();
