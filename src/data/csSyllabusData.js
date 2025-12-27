export const csSections = [
  {
    id: 1,
    code: "EM",
    name: "Engineering Mathematics",
    icon: "📐",
    description: "Discrete Mathematics, Linear Algebra, Calculus, Probability and Statistics",
    topics: [
      "Propositional and first order logic",
      "Sets, relations, functions, partial orders and lattices",
      "Monoids, Groups",
      "Graphs: connectivity, matching, coloring",
      "Combinatorics: counting, recurrence relations, generating functions",
      "Matrices, determinants, system of linear equations",
      "Eigenvalues and eigenvectors, LU decomposition",
      "Limits, continuity and differentiability",
      "Maxima and minima, Mean value theorem, Integration",
      "Random variables, Uniform, normal, exponential, poisson and binomial distributions",
      "Mean, median, mode and standard deviation",
      "Conditional probability and Bayes theorem"
    ],
    questionCount: "80+",
    difficulty: "Medium to Hard"
  },
  {
    id: 2,
    code: "DL",
    name: "Digital Logic",
    icon: "🔌",
    description: "Boolean algebra, Combinational and sequential circuits, Number representations",
    topics: [
      "Boolean algebra",
      "Combinational circuits",
      "Sequential circuits",
      "Circuit minimization techniques",
      "Number representations",
      "Computer arithmetic (fixed and floating point)"
    ],
    questionCount: "60+",
    difficulty: "Easy to Medium"
  },
  {
    id: 3,
    code: "COA",
    name: "Computer Organization and Architecture",
    icon: "🖥️",
    description: "Machine instructions, ALU, Memory hierarchy, I/O interface",
    topics: [
      "Machine instructions and addressing modes",
      "ALU, data‐path and control unit",
      "Instruction pipelining",
      "Pipeline hazards",
      "Memory hierarchy: cache, main memory and secondary storage",
      "I/O interface (interrupt and DMA mode)"
    ],
    questionCount: "70+",
    difficulty: "Medium to Hard"
  },
  {
    id: 4,
    code: "PDS",
    name: "Programming and Data Structures",
    icon: "💾",
    description: "Programming in C, Recursion, Arrays, Trees, Graphs",
    topics: [
      "Programming in C",
      "Recursion",
      "Arrays, stacks, queues",
      "Linked lists",
      "Trees, binary search trees",
      "Binary heaps",
      "Graphs"
    ],
    questionCount: "90+",
    difficulty: "Easy to Hard"
  },
  {
    id: 5,
    code: "ALGO",
    name: "Algorithms",
    icon: "⚡",
    description: "Searching, Sorting, Algorithm design techniques, Graph algorithms",
    topics: [
      "Searching, sorting, hashing",
      "Asymptotic worst case time and space complexity",
      "Greedy algorithms",
      "Dynamic programming",
      "Divide‐and‐conquer",
      "Graph traversals",
      "Minimum spanning trees",
      "Shortest paths"
    ],
    questionCount: "85+",
    difficulty: "Medium to Hard"
  },
  {
    id: 6,
    code: "TOC",
    name: "Theory of Computation",
    icon: "🔄",
    description: "Regular expressions, Context-free grammars, Turing machines",
    topics: [
      "Regular expressions and finite automata",
      "Context-free grammars and push-down automata",
      "Regular and context-free languages",
      "Pumping lemma",
      "Turing machines and undecidability"
    ],
    questionCount: "65+",
    difficulty: "Hard"
  },
  {
    id: 7,
    code: "CD",
    name: "Compiler Design",
    icon: "🔧",
    description: "Lexical analysis, Parsing, Code generation, Optimization",
    topics: [
      "Lexical analysis",
      "Parsing",
      "Syntax-directed translation",
      "Runtime environments",
      "Intermediate code generation",
      "Local optimisation",
      "Data flow analyses: constant propagation, liveness analysis",
      "Common sub expression elimination"
    ],
    questionCount: "55+",
    difficulty: "Medium to Hard"
  },
  {
    id: 8,
    code: "OS",
    name: "Operating System",
    icon: "🖱️",
    description: "Processes, Threads, Memory management, File systems",
    topics: [
      "System calls",
      "Processes, threads",
      "Inter‐process communication",
      "Concurrency and synchronization",
      "Deadlock",
      "CPU and I/O scheduling",
      "Memory management and virtual memory",
      "File systems"
    ],
    questionCount: "75+",
    difficulty: "Medium to Hard"
  },
  {
    id: 9,
    code: "DB",
    name: "Databases",
    icon: "🗄️",
    description: "ER-model, Relational model, SQL, Transactions",
    topics: [
      "ER‐model",
      "Relational model: relational algebra, tuple calculus",
      "SQL",
      "Integrity constraints",
      "Normal forms",
      "File organization",
      "Indexing (e.g., B and B+ trees)",
      "Transactions and concurrency control"
    ],
    questionCount: "70+",
    difficulty: "Medium"
  },
  {
    id: 10,
    code: "CN",
    name: "Computer Networks",
    icon: "🌐",
    description: "OSI and TCP/IP, Routing protocols, Transport layer",
    topics: [
      "Concept of layering: OSI and TCP/IP Protocol Stacks",
      "Packet, circuit and virtual circuit-switching",
      "Data link layer: framing, error detection, Medium Access Control",
      "Ethernet bridging",
      "Routing protocols: shortest path, flooding, distance vector and link state routing",
      "Fragmentation and IP addressing, IPv4, CIDR notation",
      "IP support protocols (ARP, DHCP, ICMP)",
      "Network Address Translation (NAT)",
      "Transport layer: flow control and congestion control, UDP, TCP, sockets",
      "Application layer protocols: DNS, SMTP, HTTP, FTP, Email"
    ],
    questionCount: "80+",
    difficulty: "Medium to Hard"
  }
];

export const getSectionByCode = (code) => {
  return csSections.find(section => section.code.toLowerCase() === code.toLowerCase());
};

export const getAllSections = () => {
  return csSections;
};
