export const gaSections = [
  {
    id: 1,
    code: "VA",
    name: "Verbal Aptitude",
    icon: "📝",
    description: "English grammar, vocabulary, reading comprehension, and narrative sequencing",
    topics: [
      "Basic English grammar: tenses, articles, prepositions",
      "Sentence completion and correction",
      "Vocabulary: synonyms, antonyms, word meanings",
      "Reading comprehension: understanding passages, main ideas",
      "Critical reasoning and inference",
      "Narrative sequencing and paragraph organization",
      "Verbal analogies and relationships",
      "Idioms and phrases",
      "Active and passive voice",
      "Direct and indirect speech",
      "Subject-verb agreement",
      "Punctuation and capitalization",
      "Word formation and etymology",
      "Contextual usage of words",
      "Sentence structure and syntax"
    ],
    questionCount: "60+",
    difficulty: "Easy to Medium"
  },
  {
    id: 2,
    code: "QA",
    name: "Quantitative Aptitude",
    icon: "🔢",
    description: "Data interpretation, numerical computation, mensuration, geometry, and statistics",
    topics: [
      "Data interpretation: tables, graphs, charts, diagrams",
      "Numerical computation and estimation",
      "Percentages, ratios, and proportions",
      "Profit and loss calculations",
      "Simple and compound interest",
      "Time and work problems",
      "Speed, distance, and time",
      "Mensuration: area, volume, perimeter",
      "Basic geometry: lines, angles, triangles, circles",
      "Coordinate geometry fundamentals",
      "Basic statistics: mean, median, mode",
      "Probability and combinations",
      "Number systems and operations",
      "Algebraic expressions and equations",
      "Sequence and series",
      "Logarithms and exponentials"
    ],
    questionCount: "70+",
    difficulty: "Medium"
  },
  {
    id: 3,
    code: "AA",
    name: "Analytical Aptitude",
    icon: "🧠",
    description: "Logic, deduction, induction, analogy, and numerical reasoning",
    topics: [
      "Logical deduction and reasoning",
      "Inductive reasoning patterns",
      "Analogies: verbal and numerical",
      "Pattern recognition and completion",
      "Syllogisms and logical conclusions",
      "Cause and effect relationships",
      "Assumption and inference",
      "Statement and conclusion analysis",
      "Blood relations and family trees",
      "Direction sense and spatial reasoning",
      "Coding and decoding problems",
      "Number series and sequences",
      "Letter series and alphabetical reasoning",
      "Ranking and arrangement problems",
      "Classification and categorization",
      "Puzzle solving and logical games"
    ],
    questionCount: "65+",
    difficulty: "Medium to Hard"
  },
  {
    id: 4,
    code: "SA",
    name: "Spatial Aptitude",
    icon: "🔄",
    description: "Shape transformations, paper folding, cutting, and 2D/3D pattern recognition",
    topics: [
      "Shape and pattern transformations",
      "Paper folding and unfolding",
      "Paper cutting and hole punching",
      "2D and 3D pattern recognition",
      "Rotation and reflection of objects",
      "Mirror images and water images",
      "Cube and dice problems",
      "Figure completion and continuation",
      "Embedded figures and hidden shapes",
      "Spatial visualization and orientation",
      "Geometric analogies",
      "Construction of shapes and figures",
      "Symmetry and asymmetry",
      "Perspective and projection",
      "Assembly and disassembly of objects",
      "Spatial memory and recall"
    ],
    questionCount: "55+",
    difficulty: "Medium to Hard"
  }
];

export const getSectionByCode = (code) => {
  return gaSections.find(section => section.code.toLowerCase() === code.toLowerCase());
};

export const getAllSections = () => {
  return gaSections;
};

export default gaSections;
