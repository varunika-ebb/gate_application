export const daSections = [
  {
    id: 1,
    code: "PS",
    name: "Probability and Statistics",
    icon: "📊",
    description: "Probability theory, statistical distributions, hypothesis testing, and statistical inference",
    topics: [
      "Counting (permutation, combination), probability, conditional probability, Bayes theorem",
      "Random variables, uniform, normal, exponential, Poisson, binomial distributions",
      "Mean, median, mode and standard deviation",
      "Correlation and regression",
      "Sampling distributions, central limit theorem",
      "Confidence intervals, hypothesis testing",
      "Chi-square test, t-test, ANOVA",
      "Non-parametric tests",
      "Statistical inference and estimation",
      "Maximum likelihood estimation",
      "Bayesian inference"
    ],
    questionCount: "70+",
    difficulty: "Medium to Hard"
  },
  {
    id: 2,
    code: "LA",
    name: "Linear Algebra",
    icon: "🔢",
    description: "Vector spaces, matrices, eigenvalues, and linear transformations",
    topics: [
      "Vector spaces, subspaces, linear dependence and independence",
      "Basis and dimension",
      "Linear transformations and matrix representations",
      "Eigenvalues and eigenvectors",
      "Diagonalization and similarity",
      "Inner product spaces",
      "Orthogonality and orthonormalization",
      "Singular value decomposition (SVD)",
      "Principal component analysis (PCA)",
      "Matrix factorizations",
      "Positive definite matrices",
      "Quadratic forms"
    ],
    questionCount: "60+",
    difficulty: "Medium to Hard"
  },
  {
    id: 3,
    code: "CO",
    name: "Calculus and Optimization",
    icon: "📈",
    description: "Differential calculus, optimization techniques, and numerical methods",
    topics: [
      "Functions of single and multiple variables",
      "Limits, continuity, and differentiability",
      "Partial derivatives and gradients",
      "Maxima and minima",
      "Lagrange multipliers",
      "Constrained and unconstrained optimization",
      "Convex functions and convex optimization",
      "Linear programming",
      "Gradient descent and variants",
      "Newton's method",
      "Numerical integration and differentiation",
      "Taylor series and approximations"
    ],
    questionCount: "65+",
    difficulty: "Medium to Hard"
  },
  {
    id: 4,
    code: "PDA",
    name: "Programming, Data Structures and Algorithms",
    icon: "💻",
    description: "Programming concepts, data structures, algorithms, and computational complexity",
    topics: [
      "Programming in Python/R",
      "Data types, control structures, functions",
      "Object-oriented programming concepts",
      "Arrays, linked lists, stacks, queues",
      "Trees, graphs, hash tables",
      "Searching and sorting algorithms",
      "Dynamic programming",
      "Greedy algorithms",
      "Graph algorithms",
      "Time and space complexity analysis",
      "Recursion and iteration",
      "Algorithm design techniques"
    ],
    questionCount: "80+",
    difficulty: "Easy to Hard"
  },
  {
    id: 5,
    code: "DMW",
    name: "Database Management and Warehousing",
    icon: "🗄️",
    description: "Database systems, data warehousing, and big data technologies",
    topics: [
      "Relational database design",
      "ER modeling and normalization",
      "SQL queries and operations",
      "Indexing and query optimization",
      "Transaction management and concurrency control",
      "Data warehousing concepts",
      "OLAP and OLTP systems",
      "ETL processes",
      "Data modeling for analytics",
      "NoSQL databases",
      "Big data technologies (Hadoop, Spark)",
      "Distributed databases"
    ],
    questionCount: "70+",
    difficulty: "Medium"
  },
  {
    id: 6,
    code: "ML",
    name: "Machine Learning",
    icon: "🤖",
    description: "Supervised and unsupervised learning, model evaluation, and advanced ML techniques",
    topics: [
      "Supervised learning: regression and classification",
      "Linear regression, logistic regression",
      "Decision trees and ensemble methods",
      "Support vector machines",
      "Naive Bayes classifier",
      "k-nearest neighbors",
      "Unsupervised learning: clustering",
      "k-means, hierarchical clustering",
      "Dimensionality reduction techniques",
      "Model selection and evaluation",
      "Cross-validation, bias-variance tradeoff",
      "Regularization techniques",
      "Feature selection and engineering",
      "Neural networks and deep learning basics"
    ],
    questionCount: "90+",
    difficulty: "Medium to Hard"
  },
  {
    id: 7,
    code: "AI",
    name: "Artificial Intelligence",
    icon: "🧠",
    description: "AI fundamentals, search algorithms, knowledge representation, and reasoning",
    topics: [
      "AI problem formulation and search",
      "Uninformed search: BFS, DFS, uniform cost search",
      "Informed search: A*, heuristic functions",
      "Local search algorithms",
      "Constraint satisfaction problems",
      "Game theory and adversarial search",
      "Knowledge representation and reasoning",
      "Propositional and predicate logic",
      "Inference and theorem proving",
      "Uncertainty and probabilistic reasoning",
      "Bayesian networks",
      "Expert systems",
      "Natural language processing basics",
      "Computer vision fundamentals"
    ],
    questionCount: "75+",
    difficulty: "Medium to Hard"
  }
];

export const getSectionByCode = (code) => {
  return daSections.find(section => section.code.toLowerCase() === code.toLowerCase());
};

export const getAllSections = () => {
  return daSections;
};

export default daSections;
