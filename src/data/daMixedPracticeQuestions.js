import { getGeneralAptitudeQuestions } from './generalAptitudeQuestions';
import daPracticeQuestions from './daPracticeQuestions';

// DA Section distribution for 50 questions (85 marks total)
const daSectionDistribution = {
  ps: { questions: 8, marks: 14 },   // Probability & Statistics (highest weightage)
  la: { questions: 6, marks: 10 },   // Linear Algebra
  co: { questions: 6, marks: 10 },   // Calculus & Optimization
  pda: { questions: 8, marks: 14 },  // Programming, Data Structures & Algorithms (high weightage)
  dmw: { questions: 6, marks: 10 },  // Database Management & Warehousing
  ml: { questions: 10, marks: 18 },  // Machine Learning (highest weightage)
  ai: { questions: 6, marks: 9 }     // Artificial Intelligence
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get questions from a specific DA section with mark distribution
const getDAQuestionsFromSection = (sectionKey, requiredQuestions, targetMarks) => {
  let sectionQuestions = [];
  
  // Get questions from the section or fallback
  if (daPracticeQuestions[sectionKey]) {
    sectionQuestions = [...daPracticeQuestions[sectionKey]];
  } else {
    // Use Probability & Statistics as fallback
    sectionQuestions = [...daPracticeQuestions.ps];
  }
  
  // Shuffle the available questions
  const shuffled = shuffleArray(sectionQuestions);
  
  // Try to achieve target marks with the required number of questions
  const selected = [];
  let currentMarks = 0;
  let oneMarkQuestions = shuffled.filter(q => q.marks === 1);
  let twoMarkQuestions = shuffled.filter(q => q.marks === 2);
  
  // Calculate optimal distribution
  const avgMarksPerQuestion = targetMarks / requiredQuestions;
  
  if (avgMarksPerQuestion <= 1.5) {
    // Prefer more 1-mark questions
    const oneMarkCount = Math.ceil(requiredQuestions * 0.7);
    const twoMarkCount = requiredQuestions - oneMarkCount;
    
    selected.push(...oneMarkQuestions.slice(0, oneMarkCount));
    selected.push(...twoMarkQuestions.slice(0, twoMarkCount));
  } else {
    // Prefer more 2-mark questions
    const twoMarkCount = Math.ceil(requiredQuestions * 0.6);
    const oneMarkCount = requiredQuestions - twoMarkCount;
    
    selected.push(...twoMarkQuestions.slice(0, twoMarkCount));
    selected.push(...oneMarkQuestions.slice(0, oneMarkCount));
  }
  
  // If we don't have enough questions, fill with available ones
  while (selected.length < requiredQuestions && shuffled.length > selected.length) {
    const remaining = shuffled.filter(q => !selected.includes(q));
    if (remaining.length > 0) {
      selected.push(remaining[0]);
    } else {
      break;
    }
  }
  
  return selected.slice(0, requiredQuestions);
};

// Generate complete GATE-style DA mixed practice questions
export const getDAMixedPracticeQuestions = () => {
  console.log('Generating GATE-style DA mixed practice questions...');
  
  // 1. Get General Aptitude questions (15 questions, 15 marks)
  const gaQuestions = getGeneralAptitudeQuestions();
  console.log(`Generated ${gaQuestions.length} General Aptitude questions`);
  
  // 2. Get DA subject questions (50 questions, 85 marks)
  const daQuestions = [];
  
  Object.entries(daSectionDistribution).forEach(([sectionKey, config]) => {
    const sectionQuestions = getDAQuestionsFromSection(
      sectionKey, 
      config.questions, 
      config.marks
    );
    
    // Add section identifier to questions
    const questionsWithSection = sectionQuestions.map(q => ({
      ...q,
      section: sectionKey.toUpperCase(),
      sectionName: getDASectionName(sectionKey)
    }));
    
    daQuestions.push(...questionsWithSection);
    console.log(`Generated ${sectionQuestions.length} questions for ${sectionKey.toUpperCase()}`);
  });
  
  console.log(`Total DA questions: ${daQuestions.length}`);
  
  // 3. Combine all questions and add question numbers
  const allQuestions = [
    ...gaQuestions.map(q => ({ ...q, section: 'GA', sectionName: 'General Aptitude' })),
    ...daQuestions
  ];
  
  // 4. Shuffle the final question set
  const shuffledQuestions = shuffleArray(allQuestions);
  
  // 5. Add sequential question numbers
  const finalQuestions = shuffledQuestions.map((question, index) => ({
    ...question,
    questionNumber: index + 1,
    id: `da_mixed_${index + 1}_${question.id}`
  }));
  
  console.log(`Final DA mixed practice: ${finalQuestions.length} questions, ${finalQuestions.reduce((sum, q) => sum + q.marks, 0)} marks`);
  
  return finalQuestions;
};

// Helper function to get DA section full name
const getDASectionName = (sectionKey) => {
  const sectionNames = {
    ps: 'Probability and Statistics',
    la: 'Linear Algebra',
    co: 'Calculus and Optimization',
    pda: 'Programming, Data Structures and Algorithms',
    dmw: 'Database Management and Warehousing',
    ml: 'Machine Learning',
    ai: 'Artificial Intelligence'
  };
  
  return sectionNames[sectionKey] || sectionKey.toUpperCase();
};

// Get statistics about the generated DA question set
export const getDAMixedPracticeStats = (questions) => {
  const stats = {
    total: questions.length,
    totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
    sections: {},
    markDistribution: {
      oneMarkQuestions: questions.filter(q => q.marks === 1).length,
      twoMarkQuestions: questions.filter(q => q.marks === 2).length
    }
  };
  
  // Calculate section-wise statistics
  questions.forEach(q => {
    if (!stats.sections[q.section]) {
      stats.sections[q.section] = {
        count: 0,
        marks: 0,
        name: q.sectionName
      };
    }
    stats.sections[q.section].count++;
    stats.sections[q.section].marks += q.marks;
  });
  
  return stats;
};

export default getDAMixedPracticeQuestions;
