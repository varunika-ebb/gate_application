import { getGeneralAptitudeQuestions } from './generalAptitudeQuestions';
import practiceQuestions from './practiceQuestions';

// CS Section distribution for 50 questions (85 marks total)
const csSectionDistribution = {
  em: { questions: 6, marks: 9 },    // Engineering Mathematics
  dl: { questions: 4, marks: 6 },    // Digital Logic
  coa: { questions: 6, marks: 10 },  // Computer Organization & Architecture
  pds: { questions: 8, marks: 14 },  // Programming & Data Structures (highest weightage)
  algo: { questions: 7, marks: 12 }, // Algorithms (high weightage)
  toc: { questions: 4, marks: 7 },   // Theory of Computation
  cd: { questions: 3, marks: 5 },    // Compiler Design
  os: { questions: 5, marks: 8 },    // Operating Systems
  db: { questions: 4, marks: 7 },    // Databases
  cn: { questions: 3, marks: 8 }     // Computer Networks (increased from 7 to 8 to make total 85)
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

// Get questions from a specific CS section with mark distribution
const getCSQuestionsFromSection = (sectionKey, requiredQuestions, targetMarks) => {
  let sectionQuestions = [];
  
  // Get questions from the section or fallback
  if (practiceQuestions[sectionKey]) {
    sectionQuestions = [...practiceQuestions[sectionKey]];
  } else {
    // Use Engineering Mathematics as fallback
    sectionQuestions = [...practiceQuestions.em];
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

// Generate complete GATE-style mixed practice questions
export const getMixedPracticeQuestions = () => {
  console.log('Generating GATE-style mixed practice questions...');
  
  // 1. Get General Aptitude questions (15 questions, 15 marks)
  const gaQuestions = getGeneralAptitudeQuestions();
  console.log(`Generated ${gaQuestions.length} General Aptitude questions`);
  
  // 2. Get CS subject questions (50 questions, 85 marks)
  const csQuestions = [];
  
  Object.entries(csSectionDistribution).forEach(([sectionKey, config]) => {
    const sectionQuestions = getCSQuestionsFromSection(
      sectionKey, 
      config.questions, 
      config.marks
    );
    
    // Add section identifier to questions
    const questionsWithSection = sectionQuestions.map(q => ({
      ...q,
      section: sectionKey.toUpperCase(),
      sectionName: getSectionName(sectionKey)
    }));
    
    csQuestions.push(...questionsWithSection);
    console.log(`Generated ${sectionQuestions.length} questions for ${sectionKey.toUpperCase()}`);
  });
  
  console.log(`Total CS questions: ${csQuestions.length}`);
  
  // 3. Combine all questions and add question numbers
  const allQuestions = [
    ...gaQuestions.map(q => ({ ...q, section: 'GA', sectionName: 'General Aptitude' })),
    ...csQuestions
  ];
  
  // 4. Shuffle the final question set
  const shuffledQuestions = shuffleArray(allQuestions);
  
  // 5. Add sequential question numbers
  const finalQuestions = shuffledQuestions.map((question, index) => ({
    ...question,
    questionNumber: index + 1,
    id: `mixed_${index + 1}_${question.id}`
  }));
  
  console.log(`Final mixed practice: ${finalQuestions.length} questions, ${finalQuestions.reduce((sum, q) => sum + q.marks, 0)} marks`);
  
  return finalQuestions;
};

// Helper function to get section full name
const getSectionName = (sectionKey) => {
  const sectionNames = {
    em: 'Engineering Mathematics',
    dl: 'Digital Logic',
    coa: 'Computer Organization and Architecture',
    pds: 'Programming and Data Structures',
    algo: 'Algorithms',
    toc: 'Theory of Computation',
    cd: 'Compiler Design',
    os: 'Operating System',
    db: 'Databases',
    cn: 'Computer Networks'
  };
  
  return sectionNames[sectionKey] || sectionKey.toUpperCase();
};

// Get statistics about the generated question set
export const getMixedPracticeStats = (questions) => {
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

export default getMixedPracticeQuestions;
