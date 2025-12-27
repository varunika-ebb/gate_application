// GA Mixed Practice Questions for Final Test (15 questions, 15 marks, 30 minutes)
import { gaSections } from './gaSyllabusData';

// Sample questions from each GA section for mixed practice
const gaMixedQuestions = [
  // Verbal Aptitude Questions (4 questions)
  {
    id: 1,
    question: "Choose the correct synonym for 'METICULOUS':",
    options: ["Careless", "Detailed", "Quick", "Simple"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "VA",
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
    marks: 1,
    section: "VA",
    topic: "Grammar"
  },
  {
    id: 3,
    question: "Choose the meaning of the idiom 'Break the ice':",
    options: ["To start a conversation", "To break something", "To feel cold", "To stop working"],
    correctAnswer: 0,
    type: "MCQ",
    marks: 1,
    section: "VA",
    topic: "Idioms"
  },
  {
    id: 4,
    question: "Complete the analogy: Book : Author :: Painting : ?",
    options: ["Canvas", "Artist", "Gallery", "Frame"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "VA",
    topic: "Analogies"
  },

  // Quantitative Aptitude Questions (4 questions)
  {
    id: 5,
    question: "If 25% of a number is 75, what is 40% of the same number?",
    options: ["100", "120", "150", "180"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "QA",
    topic: "Percentages"
  },
  {
    id: 6,
    question: "A train travels 240 km in 4 hours. What is its speed in km/h?",
    options: ["50", "60", "70", "80"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "QA",
    topic: "Speed and Distance"
  },
  {
    id: 7,
    question: "The area of a rectangle is 96 sq cm. If its length is 12 cm, what is its width?",
    options: ["6 cm", "8 cm", "10 cm", "12 cm"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "QA",
    topic: "Mensuration"
  },
  {
    id: 8,
    question: "What is the simple interest on Rs. 1000 for 2 years at 5% per annum?",
    options: ["Rs. 50", "Rs. 100", "Rs. 150", "Rs. 200"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "QA",
    topic: "Simple Interest"
  },

  // Analytical Aptitude Questions (4 questions)
  {
    id: 9,
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "AA",
    topic: "Number Series"
  },
  {
    id: 10,
    question: "If all roses are flowers and some flowers are red, which conclusion is valid?",
    options: [
      "All roses are red",
      "Some roses may be red",
      "No roses are red", 
      "All red things are roses"
    ],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "AA",
    topic: "Logical Reasoning"
  },
  {
    id: 11,
    question: "Find the odd one out: Dog, Cat, Lion, Car",
    options: ["Dog", "Cat", "Lion", "Car"],
    correctAnswer: 3,
    type: "MCQ",
    marks: 1,
    section: "AA",
    topic: "Classification"
  },
  {
    id: 12,
    question: "If CODING is written as DPEJOH, how is FLOWER written?",
    options: ["GMPXFS", "GMPXFR", "GMPWFS", "HMPXFS"],
    correctAnswer: 0,
    type: "MCQ",
    marks: 1,
    section: "AA",
    topic: "Coding-Decoding"
  },

  // Spatial Aptitude Questions (3 questions)
  {
    id: 13,
    question: "How many triangles are there in the given figure? (Assume a figure with intersecting lines forming multiple triangles)",
    options: ["6", "8", "10", "12"],
    correctAnswer: 2,
    type: "MCQ",
    marks: 1,
    section: "SA",
    topic: "Figure Counting"
  },
  {
    id: 14,
    question: "If a cube is painted red on all faces and then cut into 27 smaller cubes, how many small cubes will have exactly 2 red faces?",
    options: ["8", "12", "16", "20"],
    correctAnswer: 1,
    type: "MCQ",
    marks: 1,
    section: "SA",
    topic: "Cube Problems"
  },
  {
    id: 15,
    question: "Which figure completes the pattern? (Assume a pattern completion question)",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 2,
    type: "MCQ",
    marks: 1,
    section: "SA",
    topic: "Pattern Recognition"
  }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get GA mixed practice questions (15 questions, 15 marks)
export const getGAMixedPracticeQuestions = () => {
  // Return all 15 questions in shuffled order
  const shuffled = shuffleArray(gaMixedQuestions);
  return shuffled;
};

// Get GA mixed practice stats
export const getGAMixedPracticeStats = () => {
  return {
    totalQuestions: 15,
    totalMarks: 15,
    duration: 30, // minutes
    sections: {
      VA: { questions: 4, marks: 4 },
      QA: { questions: 4, marks: 4 },
      AA: { questions: 4, marks: 4 },
      SA: { questions: 3, marks: 3 }
    }
  };
};

export default gaMixedQuestions;
