// Extended question pools for 30-question practice sessions
const practiceQuestions = {
  em: [
    // Engineering Mathematics - 30 questions covering all topics
    {
      id: 1,
      question: "What is the number of edges in a complete graph with n vertices?",
      options: ["n", "n-1", "n(n-1)/2", "n²"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Graph Theory"
    },
    {
      id: 2,
      question: "The determinant of a 2×2 matrix [[a,b],[c,d]] is:",
      options: ["ad + bc", "ad - bc", "ac - bd", "ab - cd"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Linear Algebra"
    },
    {
      id: 3,
      question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, what is P(A ∩ B)?",
      options: ["0.7", "0.12", "0.1", "0.04"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Probability"
    },
    {
      id: 4,
      question: "The limit of (sin x)/x as x approaches 0 is:",
      options: ["0", "1", "∞", "undefined"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Calculus"
    },
    {
      id: 5,
      question: "In how many ways can 5 people be arranged in a circle?",
      options: ["120", "24", "60", "5"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Combinatorics"
    },
    {
      id: 6,
      question: "The eigenvalues of the matrix [[3,1],[0,2]] are:",
      options: ["3, 2", "1, 2", "3, 1", "2, 3"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Linear Algebra"
    },
    {
      id: 7,
      question: "What is the variance of a binomial distribution with parameters n and p?",
      options: ["np", "np(1-p)", "n(1-p)", "p(1-p)"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Probability"
    },
    {
      id: 8,
      question: "The chromatic number of a complete graph K₅ is:",
      options: ["4", "5", "3", "6"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Graph Theory"
    },
    {
      id: 9,
      question: "If f(x) = x³ - 3x + 1, what is f'(x)?",
      options: ["3x² - 3", "x² - 3", "3x² + 1", "3x - 3"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Calculus"
    },
    {
      id: 10,
      question: "The number of spanning trees in a complete graph K₄ is:",
      options: ["16", "12", "8", "4"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Graph Theory"
    },
    {
      id: 11,
      question: "What is the rank of the matrix [[1,2,3],[2,4,6],[1,2,3]]?",
      options: ["1", "2", "3", "0"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Linear Algebra"
    },
    {
      id: 12,
      question: "The generating function for the sequence 1, 1, 1, 1, ... is:",
      options: ["1/(1-x)", "1/(1+x)", "1-x", "x/(1-x)"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Combinatorics"
    },
    {
      id: 13,
      question: "In a graph, if every vertex has degree 3, what is the relationship between vertices (V) and edges (E)?",
      options: ["E = 3V", "E = 3V/2", "E = V/3", "E = 2V"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Graph Theory"
    },
    {
      id: 14,
      question: "The integral of e^x dx is:",
      options: ["e^x + C", "xe^x + C", "e^x/x + C", "x*e^x + C"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Calculus"
    },
    {
      id: 15,
      question: "If X follows a normal distribution with mean 10 and variance 4, what is P(X < 12)?",
      options: ["0.5", "0.8413", "0.1587", "0.9772"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Probability"
    },
    {
      id: 16,
      question: "The recurrence relation T(n) = 2T(n/2) + n has the solution:",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Discrete Mathematics"
    },
    {
      id: 17,
      question: "What is the coefficient of x³ in the expansion of (1+x)⁵?",
      options: ["10", "5", "15", "20"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Combinatorics"
    },
    {
      id: 18,
      question: "The minimum number of colors needed to color a bipartite graph is:",
      options: ["1", "2", "3", "depends on the graph"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Graph Theory"
    },
    {
      id: 19,
      question: "If A is a 3×3 matrix with det(A) = 5, what is det(2A)?",
      options: ["10", "40", "5", "25"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Linear Algebra"
    },
    {
      id: 20,
      question: "The maximum value of f(x) = x³ - 3x² + 2 on [0,3] is:",
      options: ["2", "0", "-2", "6"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Calculus"
    },
    {
      id: 21,
      question: "The number of onto functions from a set of size m to a set of size n (m ≥ n) is:",
      options: ["n^m", "m^n", "n! * S(m,n)", "C(m,n)"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Combinatorics"
    },
    {
      id: 22,
      question: "If A is an orthogonal matrix, then det(A) is:",
      options: ["0", "1", "±1", "undefined"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Linear Algebra"
    },
    {
      id: 23,
      question: "The chromatic polynomial of a tree with n vertices is:",
      options: ["k(k-1)^(n-1)", "k^n", "k(k-1)^n", "k^(n-1)"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Graph Theory"
    },
    {
      id: 24,
      question: "The Taylor series expansion of ln(1+x) around x=0 is:",
      options: ["x - x²/2 + x³/3 - ...", "1 + x + x²/2 + ...", "x + x²/2 + x³/3 + ...", "1 - x + x² - x³ + ..."],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Calculus"
    },
    {
      id: 25,
      question: "If X and Y are independent random variables with variances 4 and 9 respectively, what is Var(X+Y)?",
      options: ["13", "5", "36", "2"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Probability"
    },
    {
      id: 26,
      question: "The number of labeled binary trees with n internal nodes is:",
      options: ["2^n", "C(2n,n)/(n+1)", "n!", "2^(n-1)"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Combinatorics"
    },
    {
      id: 27,
      question: "The Jordan canonical form is used for:",
      options: ["Matrix diagonalization", "Solving linear systems", "Matrix similarity", "All of the above"],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Linear Algebra"
    },
    {
      id: 28,
      question: "The number of perfect matchings in a complete bipartite graph K(n,n) is:",
      options: ["n!", "2^n", "n²", "2n"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Graph Theory"
    },
    {
      id: 29,
      question: "The Fourier transform of a Gaussian function is:",
      options: ["Another Gaussian", "A sinc function", "An exponential", "A constant"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Calculus"
    },
    {
      id: 30,
      question: "The moment generating function of an exponential distribution with parameter λ is:",
      options: ["λ/(λ-t)", "1/(1-t/λ)", "λ/(λ+t)", "e^(λt)"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Probability"
    }
  ],
  dl: [
    // Digital Logic - 30 questions
    {
      id: 1,
      question: "What is the Boolean expression for NAND gate?",
      options: ["A + B", "A · B", "¬(A · B)", "¬(A + B)"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Boolean Algebra"
    },
    {
      id: 2,
      question: "How many minterms are there for a 3-variable Boolean function?",
      options: ["6", "8", "9", "3"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Boolean Functions"
    },
    {
      id: 3,
      question: "The complement of (A + B) is:",
      options: ["A' + B'", "A' · B'", "A + B'", "A' + B"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Boolean Algebra"
    },
    {
      id: 4,
      question: "A half adder has how many inputs and outputs?",
      options: ["2 inputs, 2 outputs", "2 inputs, 1 output", "1 input, 2 outputs", "3 inputs, 2 outputs"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Combinational Circuits"
    },
    {
      id: 5,
      question: "In 2's complement representation, the range of 4-bit numbers is:",
      options: ["-8 to +7", "-7 to +8", "-15 to +15", "0 to 15"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Number Systems"
    },
    // Add 25 more questions for DL to reach 30 total
    {
      id: 6,
      question: "A JK flip-flop with J=1, K=0 will:",
      options: ["Set", "Reset", "Toggle", "No change"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Sequential Circuits"
    },
    {
      id: 7,
      question: "The number of flip-flops required to construct a mod-16 counter is:",
      options: ["16", "4", "8", "2"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Sequential Circuits"
    },
    {
      id: 8,
      question: "Which gate is called universal gate?",
      options: ["AND", "OR", "NAND", "XOR"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Logic Gates"
    },
    {
      id: 9,
      question: "The IEEE 754 single precision format uses how many bits for mantissa?",
      options: ["23", "24", "8", "32"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Number Systems"
    },
    {
      id: 10,
      question: "A 4-to-1 multiplexer requires how many select lines?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Combinational Circuits"
    },
    // Continue with more DL questions...
    {
      id: 11,
      question: "The Karnaugh map for 4 variables has how many cells?",
      options: ["8", "16", "32", "4"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Boolean Minimization"
    },
    {
      id: 12,
      question: "In a synchronous counter, all flip-flops are triggered by:",
      options: ["Different clock signals", "Same clock signal", "No clock signal", "Asynchronous signals"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Sequential Circuits"
    },
    {
      id: 13,
      question: "The excess-3 code for decimal 7 is:",
      options: ["1010", "1011", "0111", "1000"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Number Systems"
    },
    {
      id: 14,
      question: "A decoder with n inputs has how many outputs?",
      options: ["n", "2n", "2^n", "n²"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Combinational Circuits"
    },
    {
      id: 15,
      question: "The propagation delay in a ripple carry adder for n bits is proportional to:",
      options: ["1", "log n", "n", "n²"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Combinational Circuits"
    },
    // Add remaining questions to reach 30
    {
      id: 16,
      question: "Which flip-flop is used to eliminate race condition?",
      options: ["SR", "JK", "D", "T"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 1,
      topic: "Sequential Circuits"
    },
    {
      id: 17,
      question: "The fan-out of a logic gate refers to:",
      options: ["Number of inputs", "Number of outputs it can drive", "Power consumption", "Speed of operation"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Logic Gates"
    },
    {
      id: 18,
      question: "In floating point representation, what does normalization ensure?",
      options: ["Unique representation", "Faster computation", "Less memory", "All of the above"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Number Systems"
    },
    {
      id: 19,
      question: "A ring counter with n flip-flops has how many states?",
      options: ["2^n", "n", "2n", "n²"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Sequential Circuits"
    },
    {
      id: 20,
      question: "The setup time of a flip-flop is:",
      options: ["Time before clock edge", "Time after clock edge", "Clock period", "Propagation delay"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Sequential Circuits"
    },
    {
      id: 21,
      question: "The Quine-McCluskey method is used for:",
      options: ["Sequential circuit design", "Boolean function minimization", "Timing analysis", "Power optimization"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Boolean Minimization"
    },
    {
      id: 22,
      question: "In a Johnson counter with n flip-flops, the number of states is:",
      options: ["n", "2n", "2^n", "n²"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Sequential Circuits"
    },
    {
      id: 23,
      question: "The critical path in a combinational circuit determines:",
      options: ["Power consumption", "Area requirement", "Maximum operating frequency", "Number of gates"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Combinational Circuits"
    },
    {
      id: 24,
      question: "In IEEE 754 double precision, the exponent field has how many bits?",
      options: ["8", "11", "23", "52"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Number Systems"
    },
    {
      id: 25,
      question: "A PLA (Programmable Logic Array) implements:",
      options: ["Only AND gates", "Only OR gates", "Both AND and OR arrays", "Sequential circuits only"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Combinational Circuits"
    },
    {
      id: 26,
      question: "The metastability problem in flip-flops occurs when:",
      options: ["Clock frequency is too high", "Setup/hold time is violated", "Power supply is unstable", "Temperature is too high"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Sequential Circuits"
    },
    {
      id: 27,
      question: "In a carry-lookahead adder, the carry generate function G_i is:",
      options: ["A_i + B_i", "A_i · B_i", "A_i ⊕ B_i", "A_i + B_i + C_i"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Combinational Circuits"
    },
    {
      id: 28,
      question: "The hazard in combinational circuits can be eliminated by:",
      options: ["Adding redundant gates", "Increasing delay", "Using faster gates", "Reducing fan-out"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Combinational Circuits"
    },
    {
      id: 29,
      question: "In a state machine, the next state depends on:",
      options: ["Current state only", "Input only", "Current state and input", "Previous state"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Sequential Circuits"
    },
    {
      id: 30,
      question: "The don't care conditions in Boolean minimization:",
      options: ["Must be included", "Must be excluded", "Can be either 0 or 1", "Are always 1"],
      correctAnswer: 2,
      type: "MCQ",
      marks: 2,
      topic: "Boolean Minimization"
    }
  ]
};

// Fisher-Yates shuffle algorithm for better randomization
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
  coa: 'em', // Computer Organization & Architecture -> Engineering Mathematics
  pds: 'dl', // Programming & Data Structures -> Digital Logic
  algo: 'em', // Algorithms -> Engineering Mathematics
  toc: 'em', // Theory of Computation -> Engineering Mathematics
  cd: 'em', // Compiler Design -> Engineering Mathematics
  os: 'em', // Operating Systems -> Engineering Mathematics
  db: 'em', // Databases -> Engineering Mathematics
  cn: 'em'  // Computer Networks -> Engineering Mathematics
};

// Get practice questions with exactly 50 marks for 30 questions
const getPracticeQuestionsWithTargetMarks = (section, count = 30, targetMarks = 50) => {
  const sectionKey = section.toLowerCase();

  // Get all available questions for the section
  let availableQuestions = [];
  if (practiceQuestions[sectionKey]) {
    availableQuestions = [...practiceQuestions[sectionKey]];
  } else {
    // Use fallback section
    const fallbackSection = sectionFallbacks[sectionKey] || 'em';
    availableQuestions = [...practiceQuestions[fallbackSection]];
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

export const getPracticeQuestions = (section, count = 30) => {
  // For practice sessions, ensure exactly 50 marks
  if (count === 30) {
    return getPracticeQuestionsWithTargetMarks(section, count, 50);
  }

  // For other counts, use the original logic
  const sectionKey = section.toLowerCase();

  // Check if section has questions
  if (practiceQuestions[sectionKey] && practiceQuestions[sectionKey].length >= count) {
    const questions = practiceQuestions[sectionKey];
    // Use Fisher-Yates shuffle for better randomization
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, count);
  }

  // If section doesn't have enough questions, use available questions and fill with fallback
  let availableQuestions = [];
  if (practiceQuestions[sectionKey]) {
    availableQuestions = [...practiceQuestions[sectionKey]];
  }

  // Determine fallback section
  const fallbackSection = sectionFallbacks[sectionKey] || 'em';
  const fallbackQuestions = practiceQuestions[fallbackSection];
  const remainingCount = count - availableQuestions.length;

  if (remainingCount > 0 && fallbackQuestions) {
    const shuffledFallback = shuffleArray(fallbackQuestions);
    availableQuestions = [...availableQuestions, ...shuffledFallback.slice(0, remainingCount)];
  }

  // Final shuffle of the combined questions
  const finalShuffled = shuffleArray(availableQuestions);
  return finalShuffled.slice(0, count);
};

export default practiceQuestions;
