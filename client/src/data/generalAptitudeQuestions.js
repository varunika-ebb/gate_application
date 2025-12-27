// General Aptitude questions for GATE exam simulation
const generalAptitudeQuestions = {
  verbal: [
    // Verbal Ability Questions
    {
      id: 1,
      question: "Choose the word that is most nearly opposite in meaning to 'METICULOUS':",
      options: ["Careful", "Careless", "Precise", "Thorough"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 2,
      question: "The sentence 'The committee has decided to postpone the meeting' is in:",
      options: ["Active voice", "Passive voice", "Both active and passive", "Neither active nor passive"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 3,
      question: "Choose the correct spelling:",
      options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 4,
      question: "Fill in the blank: 'The new policy will _____ all employees.'",
      options: ["effect", "affect", "effects", "affects"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 5,
      question: "Choose the word that best completes the analogy: Book : Author :: Painting : ?",
      options: ["Canvas", "Artist", "Gallery", "Frame"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 6,
      question: "The phrase 'to beat around the bush' means:",
      options: ["To avoid the main topic", "To be violent", "To work in a garden", "To make noise"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Verbal Ability"
    },
    {
      id: 7,
      question: "In the sentence 'Neither John nor his friends were present', the error is:",
      options: ["Neither", "nor", "were", "present"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Verbal Ability"
    },
    {
      id: 8,
      question: "Choose the sentence with correct punctuation:",
      options: [
        "The manager said, 'The meeting is postponed.'",
        "The manager said, 'The meeting is postponed'.",
        "The manager said 'The meeting is postponed.'",
        "The manager said; 'The meeting is postponed.'"
      ],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Verbal Ability"
    },
    {
      id: 19,
      question: "Choose the word that is most similar in meaning to 'ABUNDANT':",
      options: ["Scarce", "Plentiful", "Limited", "Rare"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Verbal Ability"
    },
    {
      id: 20,
      question: "The passive voice of 'They are building a new bridge' is:",
      options: [
        "A new bridge is being built by them",
        "A new bridge was being built by them",
        "A new bridge is built by them",
        "A new bridge has been built by them"
      ],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Verbal Ability"
    }
  ],
  numerical: [
    // Numerical Ability Questions
    {
      id: 9,
      question: "If 20% of a number is 45, what is 60% of the same number?",
      options: ["135", "150", "120", "180"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Numerical Ability"
    },
    {
      id: 10,
      question: "A train travels 240 km in 4 hours. What is its speed in m/s?",
      options: ["60", "16.67", "240", "15"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Numerical Ability"
    },
    {
      id: 11,
      question: "The ratio of ages of A and B is 3:4. If A is 15 years old, how old is B?",
      options: ["20", "18", "12", "24"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Numerical Ability"
    },
    {
      id: 12,
      question: "What is the compound interest on Rs. 1000 for 2 years at 10% per annum?",
      options: ["Rs. 200", "Rs. 210", "Rs. 220", "Rs. 250"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Numerical Ability"
    },
    {
      id: 13,
      question: "If log₂(x) = 3, then x equals:",
      options: ["6", "8", "9", "12"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Numerical Ability"
    },
    {
      id: 21,
      question: "A man walks 3 km north, then 4 km east. What is his distance from the starting point?",
      options: ["7 km", "5 km", "1 km", "12 km"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Numerical Ability"
    },
    {
      id: 22,
      question: "If the average of 5 numbers is 20, what is their sum?",
      options: ["100", "25", "4", "15"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Numerical Ability"
    }
  ],
  analytical: [
    // Analytical Reasoning Questions
    {
      id: 14,
      question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?",
      options: ["EOJDEJFM", "EOJDJEFM", "EOJDEJNF", "EOJDJFEM"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Analytical Reasoning"
    },
    {
      id: 15,
      question: "If all roses are flowers and some flowers are red, which conclusion is valid?",
      options: [
        "All roses are red",
        "Some roses are red", 
        "No roses are red",
        "Some roses may be red"
      ],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Analytical Reasoning"
    },
    {
      id: 16,
      question: "A, B, C, D, E are sitting in a row. A and E are at the ends. B is between A and C. Where is D sitting?",
      options: ["Between C and E", "Between B and C", "Next to A", "Cannot be determined"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Analytical Reasoning"
    },
    {
      id: 17,
      question: "What comes next in the series: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "45", "48"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Analytical Reasoning"
    },
    {
      id: 18,
      question: "If MONDAY is coded as 123456, how is DYNAMO coded?",
      options: ["453612", "453621", "456321", "465321"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Analytical Reasoning"
    },
    {
      id: 23,
      question: "Find the missing number in the series: 1, 4, 9, 16, ?",
      options: ["20", "25", "24", "36"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Analytical Reasoning"
    },
    {
      id: 24,
      question: "If all cats are animals and some animals are pets, which is definitely true?",
      options: [
        "All cats are pets",
        "Some cats are pets",
        "All pets are cats",
        "Some cats may be pets"
      ],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Analytical Reasoning"
    }
  ]
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

export const getGeneralAptitudeQuestions = () => {
  // Get all questions from all categories
  const allQuestions = [
    ...generalAptitudeQuestions.verbal,
    ...generalAptitudeQuestions.numerical,
    ...generalAptitudeQuestions.analytical
  ];
  
  // Shuffle all questions
  const shuffled = shuffleArray(allQuestions);
  
  // Select 10 one-mark questions and 5 two-mark questions
  const oneMarkQuestions = shuffled.filter(q => q.marks === 1).slice(0, 10);
  const twoMarkQuestions = shuffled.filter(q => q.marks === 2).slice(0, 5);
  
  // Combine and shuffle final selection
  const finalQuestions = shuffleArray([...oneMarkQuestions, ...twoMarkQuestions]);
  
  return finalQuestions;
};

export default generalAptitudeQuestions;
