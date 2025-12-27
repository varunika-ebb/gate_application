// GA Practice questions for all 4 sections
const gaPracticeQuestions = {
  va: [
    // Verbal Aptitude - 30 questions
    {
      id: 1,
      question: "Choose the correct synonym for 'ABUNDANT':",
      options: ["Scarce", "Plentiful", "Limited", "Rare"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 2,
      question: "Identify the grammatically correct sentence:",
      options: [
        "Neither of the students have completed their assignment",
        "Neither of the students has completed their assignment", 
        "Neither of the students have completed his assignment",
        "Neither of the students has completed his assignment"
      ],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 3,
      question: "Choose the antonym of 'OPTIMISTIC':",
      options: ["Hopeful", "Positive", "Pessimistic", "Confident"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 4,
      question: "Complete the sentence: 'The committee _____ its decision yesterday.'",
      options: ["announce", "announced", "announcing", "will announce"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    {
      id: 5,
      question: "Choose the word that best fits: 'His _____ remarks offended everyone present.'",
      options: ["tactful", "diplomatic", "tactless", "polite"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Vocabulary"
    },
    {
      id: 6,
      question: "Identify the passive voice form of: 'The teacher explained the lesson clearly.'",
      options: [
        "The lesson was explained clearly by the teacher",
        "The lesson is explained clearly by the teacher",
        "The lesson has been explained clearly by the teacher",
        "The lesson will be explained clearly by the teacher"
      ],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 7,
      question: "Choose the correct meaning of the idiom 'Break the ice':",
      options: ["To start a conversation", "To break something", "To feel cold", "To stop working"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Idioms"
    },
    {
      id: 8,
      question: "Select the correctly punctuated sentence:",
      options: [
        "The manager said, 'the meeting is postponed.'",
        "The manager said, 'The meeting is postponed.'",
        "The manager said 'the meeting is postponed'.",
        "The manager said; 'The meeting is postponed.'"
      ],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 9,
      question: "Choose the word closest in meaning to 'METICULOUS':",
      options: ["Careless", "Detailed", "Quick", "Simple"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 10,
      question: "Identify the type of sentence: 'What a beautiful sunset!'",
      options: ["Declarative", "Interrogative", "Exclamatory", "Imperative"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    // Add 20 more VA questions...
    {
      id: 11,
      question: "Choose the correct form: 'If I _____ you, I would accept the offer.'",
      options: ["am", "was", "were", "will be"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 12,
      question: "Select the synonym for 'EPHEMERAL':",
      options: ["Permanent", "Temporary", "Eternal", "Lasting"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Vocabulary"
    },
    {
      id: 13,
      question: "Choose the correct preposition: 'She is good _____ mathematics.'",
      options: ["in", "at", "on", "with"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    {
      id: 14,
      question: "Identify the figure of speech in: 'The wind whispered through the trees.'",
      options: ["Metaphor", "Simile", "Personification", "Alliteration"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Literary Devices"
    },
    {
      id: 15,
      question: "Choose the antonym of 'VERBOSE':",
      options: ["Talkative", "Concise", "Lengthy", "Detailed"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 16,
      question: "Complete the analogy: Book : Author :: Painting : ?",
      options: ["Canvas", "Artist", "Gallery", "Frame"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Analogies"
    },
    {
      id: 17,
      question: "Choose the correct article: '_____ university has excellent facilities.'",
      options: ["A", "An", "The", "No article"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    {
      id: 18,
      question: "Select the word with correct spelling:",
      options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Spelling"
    },
    {
      id: 19,
      question: "Choose the meaning of 'Blessing in disguise':",
      options: ["A hidden curse", "An apparent misfortune that results in good", "A religious ceremony", "A secret gift"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Idioms"
    },
    {
      id: 20,
      question: "Identify the subject in: 'Running in the park is good exercise.'",
      options: ["Running", "Park", "Good", "Exercise"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    {
      id: 21,
      question: "Choose the synonym for 'CANDID':",
      options: ["Dishonest", "Frank", "Secretive", "Deceptive"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 22,
      question: "Select the correct indirect speech: He said, 'I am going home.'",
      options: [
        "He said that he is going home",
        "He said that he was going home",
        "He said that he will go home",
        "He said that he goes home"
      ],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 23,
      question: "Choose the correct comparative form of 'good':",
      options: ["Gooder", "More good", "Better", "Best"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    },
    {
      id: 24,
      question: "Identify the error: 'Each of the students have submitted their assignments.'",
      options: ["Each", "have", "submitted", "their"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 25,
      question: "Choose the antonym of 'BENEVOLENT':",
      options: ["Kind", "Generous", "Malevolent", "Helpful"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Vocabulary"
    },
    {
      id: 26,
      question: "Complete the sentence: 'The book _____ on the table belongs to me.'",
      options: ["lying", "laying", "lies", "lays"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 27,
      question: "Choose the meaning of 'To beat around the bush':",
      options: ["To hit plants", "To avoid the main topic", "To work in garden", "To make noise"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Idioms"
    },
    {
      id: 28,
      question: "Select the synonym for 'UBIQUITOUS':",
      options: ["Rare", "Omnipresent", "Absent", "Limited"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Vocabulary"
    },
    {
      id: 29,
      question: "Choose the correct form: 'Neither the teacher nor the students _____ present.'",
      options: ["was", "were", "is", "are"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Grammar"
    },
    {
      id: 30,
      question: "Identify the part of speech of 'quickly' in: 'She ran quickly to catch the bus.'",
      options: ["Noun", "Verb", "Adjective", "Adverb"],
      correctAnswer: 3,
      type: "MCQ",
      marks: 1,
      topic: "Grammar"
    }
  ]
  // Add more sections: qa, aa, sa with 30 questions each
};

// Fisher-Yates shuffle for randomization
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Section fallback mapping for sections without full question sets
const sectionFallbacks = {
  qa: 'va',   // Quantitative Aptitude -> Verbal Aptitude
  aa: 'va',   // Analytical Aptitude -> Verbal Aptitude  
  sa: 'va'    // Spatial Aptitude -> Verbal Aptitude
};

// Get GA practice questions with exactly 50 marks for 30 questions
const getGAPracticeQuestionsWithTargetMarks = (section, count = 30, targetMarks = 50) => {
  const sectionKey = section.toLowerCase();
  
  // Get all available questions for the section
  let availableQuestions = [];
  if (gaPracticeQuestions[sectionKey]) {
    availableQuestions = [...gaPracticeQuestions[sectionKey]];
  } else {
    // Use fallback section
    const fallbackSection = sectionFallbacks[sectionKey] || 'va';
    availableQuestions = [...gaPracticeQuestions[fallbackSection]];
  }
  
  // Shuffle available questions
  const shuffled = shuffleArray(availableQuestions);
  
  // Separate by marks
  const oneMarkQuestions = shuffled.filter(q => q.marks === 1);
  const twoMarkQuestions = shuffled.filter(q => q.marks === 2);
  
  // Calculate optimal distribution for exactly 50 marks with 30 questions
  // Let x = number of 1-mark questions, y = number of 2-mark questions
  // x + y = 30 (total questions)
  // x + 2y = 50 (total marks)
  // Solving: y = 20, x = 10
  const targetOneMarkCount = 10;
  const targetTwoMarkCount = 20;
  
  const selected = [];
  
  // Add 1-mark questions
  const selectedOneMark = oneMarkQuestions.slice(0, Math.min(targetOneMarkCount, oneMarkQuestions.length));
  selected.push(...selectedOneMark);
  
  // Add 2-mark questions
  const selectedTwoMark = twoMarkQuestions.slice(0, Math.min(targetTwoMarkCount, twoMarkQuestions.length));
  selected.push(...selectedTwoMark);
  
  // If we don't have enough questions of the right type, fill with available ones
  while (selected.length < count) {
    const remaining = shuffled.filter(q => !selected.includes(q));
    if (remaining.length > 0) {
      selected.push(remaining[0]);
    } else {
      break;
    }
  }
  
  // Final shuffle and return exactly the requested count
  const finalShuffled = shuffleArray(selected);
  return finalShuffled.slice(0, count);
};

export const getGAPracticeQuestions = (section, count = 30) => {
  // For practice sessions, ensure exactly 50 marks
  if (count === 30) {
    return getGAPracticeQuestionsWithTargetMarks(section, count, 50);
  }
  
  // For other counts, use the original logic
  const sectionKey = section.toLowerCase();
  
  // Check if section has questions
  if (gaPracticeQuestions[sectionKey] && gaPracticeQuestions[sectionKey].length >= count) {
    const questions = gaPracticeQuestions[sectionKey];
    // Use Fisher-Yates shuffle for better randomization
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, count);
  }
  
  // If section doesn't have enough questions, use available questions and fill with fallback
  let availableQuestions = [];
  if (gaPracticeQuestions[sectionKey]) {
    availableQuestions = [...gaPracticeQuestions[sectionKey]];
  }
  
  // Determine fallback section
  const fallbackSection = sectionFallbacks[sectionKey] || 'va';
  const fallbackQuestions = gaPracticeQuestions[fallbackSection];
  const remainingCount = count - availableQuestions.length;
  
  if (remainingCount > 0 && fallbackQuestions) {
    const shuffledFallback = shuffleArray(fallbackQuestions);
    availableQuestions = [...availableQuestions, ...shuffledFallback.slice(0, remainingCount)];
  }
  
  // Final shuffle of the combined questions
  const finalShuffled = shuffleArray(availableQuestions);
  return finalShuffled.slice(0, count);
};

export default gaPracticeQuestions;
