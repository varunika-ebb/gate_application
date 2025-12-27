// Mock test questions for all CS sections
const mockTestQuestions = {
  em: {
    1: [
      {
        id: 1,
        question: "What is the number of edges in a complete graph with n vertices?",
        options: ["n", "n-1", "n(n-1)/2", "n²"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "The determinant of a 2×2 matrix [[a,b],[c,d]] is:",
        options: ["ad + bc", "ad - bc", "ac - bd", "ab - cd"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are independent events, what is P(A ∩ B)?",
        options: ["0.7", "0.12", "0.1", "0.04"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The limit of (sin x)/x as x approaches 0 is:",
        options: ["0", "1", "∞", "undefined"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "In how many ways can 5 people be arranged in a circle?",
        options: ["120", "24", "60", "5"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 6,
        question: "The eigenvalues of the matrix [[3,1],[0,2]] are:",
        options: ["3, 2", "1, 2", "3, 1", "2, 3"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "What is the variance of a binomial distribution with parameters n and p?",
        options: ["np", "np(1-p)", "n(1-p)", "p(1-p)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "The chromatic number of a complete graph K₅ is:",
        options: ["4", "5", "3", "6"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "If f(x) = x³ - 3x + 1, what is f'(x)?",
        options: ["3x² - 3", "x² - 3", "3x² + 1", "3x - 3"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 10,
        question: "The number of spanning trees in a complete graph K₄ is:",
        options: ["16", "12", "8", "4"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ],
    2: [
      {
        id: 1,
        question: "What is the rank of the matrix [[1,2,3],[2,4,6],[1,2,3]]?",
        options: ["1", "2", "3", "0"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "The generating function for the sequence 1, 1, 1, 1, ... is:",
        options: ["1/(1-x)", "1/(1+x)", "1-x", "x/(1-x)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "In a graph, if every vertex has degree 3, what is the relationship between vertices (V) and edges (E)?",
        options: ["E = 3V", "E = 3V/2", "E = V/3", "E = 2V"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The integral of e^x dx is:",
        options: ["e^x + C", "xe^x + C", "e^x/x + C", "x*e^x + C"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "If X follows a normal distribution with mean 10 and variance 4, what is P(X < 12)?",
        options: ["0.5", "0.8413", "0.1587", "0.9772"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "The recurrence relation T(n) = 2T(n/2) + n has the solution:",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "What is the coefficient of x³ in the expansion of (1+x)⁵?",
        options: ["10", "5", "15", "20"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "The minimum number of colors needed to color a bipartite graph is:",
        options: ["1", "2", "3", "depends on the graph"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "If A is a 3×3 matrix with det(A) = 5, what is det(2A)?",
        options: ["10", "40", "5", "25"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "The maximum value of f(x) = x³ - 3x² + 2 on [0,3] is:",
        options: ["2", "0", "-2", "6"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ],
    3: [
      {
        id: 1,
        question: "The number of onto functions from a set of size m to a set of size n (m ≥ n) is:",
        options: ["n^m", "m^n", "n! * S(m,n)", "C(m,n)"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "If A is an orthogonal matrix, then det(A) is:",
        options: ["0", "1", "±1", "undefined"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "The chromatic polynomial of a tree with n vertices is:",
        options: ["k(k-1)^(n-1)", "k^n", "k(k-1)^n", "k^(n-1)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The Taylor series expansion of ln(1+x) around x=0 is:",
        options: ["x - x²/2 + x³/3 - ...", "1 + x + x²/2 + ...", "x + x²/2 + x³/3 + ...", "1 - x + x² - x³ + ..."],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "If X and Y are independent random variables with variances 4 and 9 respectively, what is Var(X+Y)?",
        options: ["13", "5", "36", "2"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "The number of labeled binary trees with n internal nodes is:",
        options: ["2^n", "C(2n,n)/(n+1)", "n!", "2^(n-1)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "The Jordan canonical form is used for:",
        options: ["Matrix diagonalization", "Solving linear systems", "Matrix similarity", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "The number of perfect matchings in a complete bipartite graph K(n,n) is:",
        options: ["n!", "2^n", "n²", "2n"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "The Fourier transform of a Gaussian function is:",
        options: ["Another Gaussian", "A sinc function", "An exponential", "A constant"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "The moment generating function of an exponential distribution with parameter λ is:",
        options: ["λ/(λ-t)", "1/(1-t/λ)", "λ/(λ+t)", "e^(λt)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ]
  },
  dl: {
    1: [
      {
        id: 1,
        question: "What is the Boolean expression for NAND gate?",
        options: ["A + B", "A · B", "¬(A · B)", "¬(A + B)"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "How many minterms are there for a 3-variable Boolean function?",
        options: ["6", "8", "9", "3"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "The complement of (A + B) is:",
        options: ["A' + B'", "A' · B'", "A + B'", "A' + B"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 4,
        question: "A half adder has how many inputs and outputs?",
        options: ["2 inputs, 2 outputs", "2 inputs, 1 output", "1 input, 2 outputs", "3 inputs, 2 outputs"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "In 2's complement representation, the range of 4-bit numbers is:",
        options: ["-8 to +7", "-7 to +8", "-15 to +15", "0 to 15"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "A JK flip-flop with J=1, K=0 will:",
        options: ["Set", "Reset", "Toggle", "No change"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The number of flip-flops required to construct a mod-16 counter is:",
        options: ["16", "4", "8", "2"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "Which gate is called universal gate?",
        options: ["AND", "OR", "NAND", "XOR"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "The IEEE 754 single precision format uses how many bits for mantissa?",
        options: ["23", "24", "8", "32"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "A 4-to-1 multiplexer requires how many select lines?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      }
    ],
    2: [
      {
        id: 1,
        question: "The Karnaugh map for 4 variables has how many cells?",
        options: ["8", "16", "32", "4"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "In a synchronous counter, all flip-flops are triggered by:",
        options: ["Different clock signals", "Same clock signal", "No clock signal", "Asynchronous signals"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "The excess-3 code for decimal 7 is:",
        options: ["1010", "1011", "0111", "1000"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "A decoder with n inputs has how many outputs?",
        options: ["n", "2n", "2^n", "n²"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "The propagation delay in a ripple carry adder for n bits is proportional to:",
        options: ["1", "log n", "n", "n²"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Which flip-flop is used to eliminate race condition?",
        options: ["SR", "JK", "D", "T"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The fan-out of a logic gate refers to:",
        options: ["Number of inputs", "Number of outputs it can drive", "Power consumption", "Speed of operation"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "In floating point representation, what does normalization ensure?",
        options: ["Unique representation", "Faster computation", "Less memory", "All of the above"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "A ring counter with n flip-flops has how many states?",
        options: ["2^n", "n", "2n", "n²"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "The setup time of a flip-flop is:",
        options: ["Time before clock edge", "Time after clock edge", "Clock period", "Propagation delay"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ],
    3: [
      {
        id: 1,
        question: "The Quine-McCluskey method is used for:",
        options: ["Sequential circuit design", "Boolean function minimization", "Timing analysis", "Power optimization"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "In a Johnson counter with n flip-flops, the number of states is:",
        options: ["n", "2n", "2^n", "n²"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "The critical path in a combinational circuit determines:",
        options: ["Power consumption", "Area requirement", "Maximum operating frequency", "Number of gates"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "In IEEE 754 double precision, the exponent field has how many bits?",
        options: ["8", "11", "23", "52"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "A PLA (Programmable Logic Array) implements:",
        options: ["Only AND gates", "Only OR gates", "Both AND and OR arrays", "Sequential circuits only"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "The metastability problem in flip-flops occurs when:",
        options: ["Clock frequency is too high", "Setup/hold time is violated", "Power supply is unstable", "Temperature is too high"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "In a carry-lookahead adder, the carry generate function G_i is:",
        options: ["A_i + B_i", "A_i · B_i", "A_i ⊕ B_i", "A_i + B_i + C_i"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "The hazard in combinational circuits can be eliminated by:",
        options: ["Adding redundant gates", "Increasing delay", "Using faster gates", "Reducing fan-out"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "In a state machine, the next state depends on:",
        options: ["Current state only", "Input only", "Current state and input", "Previous state"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "The don't care conditions in Boolean minimization:",
        options: ["Must be included", "Must be excluded", "Can be either 0 or 1", "Are always 1"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      }
    ]
  },
  coa: {
    1: [
      {
        id: 1,
        question: "The addressing mode where the operand is specified in the instruction itself is called:",
        options: ["Direct", "Immediate", "Indirect", "Register"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "In a 5-stage pipeline, if there are no hazards, the speedup compared to non-pipelined execution is:",
        options: ["5", "4", "Approaches 5", "10"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "Cache hit ratio is 0.9 and cache access time is 10ns, main memory access time is 100ns. What is the average access time?",
        options: ["19ns", "91ns", "55ns", "109ns"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "Which of the following is NOT a type of hazard in pipelining?",
        options: ["Structural", "Data", "Control", "Cache"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "The ALU performs:",
        options: ["Only arithmetic operations", "Only logical operations", "Both arithmetic and logical operations", "Memory operations"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 6,
        question: "In DMA mode, data transfer is controlled by:",
        options: ["CPU", "DMA controller", "Memory", "I/O device"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The instruction format that can access the largest memory is:",
        options: ["Register", "Immediate", "Direct", "Indirect"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "Branch prediction is used to reduce:",
        options: ["Structural hazards", "Data hazards", "Control hazards", "Cache misses"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "The memory hierarchy is organized to exploit:",
        options: ["Spatial locality", "Temporal locality", "Both spatial and temporal locality", "Random access"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Interrupt handling involves:",
        options: ["Saving context", "Executing ISR", "Restoring context", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 1
      }
    ],
    2: [
      {
        id: 1,
        question: "In a direct-mapped cache with 1024 blocks and block size 32 bytes, how many bits are needed for the block offset?",
        options: ["5", "10", "15", "32"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "The CPI (Cycles Per Instruction) of a pipelined processor is ideally:",
        options: ["Equal to pipeline depth", "1", "Less than 1", "Greater than pipeline depth"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "Which cache replacement policy has the best performance for programs with good temporal locality?",
        options: ["FIFO", "LRU", "Random", "LFU"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The effective address in indexed addressing mode is calculated as:",
        options: ["Base + Index", "Base + Displacement", "Index + Displacement", "Base + Index + Displacement"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "Virtual memory allows:",
        options: ["Larger programs than physical memory", "Memory protection", "Memory sharing", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "The datapath in a processor includes:",
        options: ["ALU only", "Registers only", "ALU, registers, and buses", "Control unit"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "Write-through cache policy means:",
        options: ["Write to cache only", "Write to memory only", "Write to both cache and memory", "Write to cache, then to memory"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "The control unit generates:",
        options: ["Data signals", "Control signals", "Address signals", "Clock signals"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "Superscalar processors can:",
        options: ["Execute one instruction per cycle", "Execute multiple instructions per cycle", "Only execute RISC instructions", "Only execute CISC instructions"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "The miss penalty in cache memory refers to:",
        options: ["Time to access cache", "Time to access main memory", "Additional time due to cache miss", "Time to write back"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      }
    ],
    3: [
      {
        id: 1,
        question: "In a 4-way set-associative cache with 256 sets, the total number of cache blocks is:",
        options: ["256", "1024", "4", "64"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "The performance improvement from pipelining is limited by:",
        options: ["Pipeline depth only", "Hazards only", "Both pipeline depth and hazards", "Clock frequency"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "Translation Lookaside Buffer (TLB) is used to:",
        options: ["Cache data", "Cache instructions", "Cache page table entries", "Cache register values"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "Out-of-order execution requires:",
        options: ["Reservation stations", "Reorder buffer", "Register renaming", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "The Tomasulo algorithm is used for:",
        options: ["Branch prediction", "Dynamic scheduling", "Cache coherence", "Virtual memory"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "In a multiprocessor system, cache coherence ensures:",
        options: ["All caches have same data", "Consistent view of memory", "No cache conflicts", "Faster access"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "The MESI protocol is used for:",
        options: ["Branch prediction", "Cache coherence", "Virtual memory", "Instruction scheduling"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "Speculative execution helps in:",
        options: ["Reducing control hazards", "Reducing data hazards", "Reducing structural hazards", "Increasing clock frequency"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "The working set model is used in:",
        options: ["Cache design", "Virtual memory management", "Pipeline design", "Instruction scheduling"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Vector processors are optimized for:",
        options: ["Scalar operations", "Array operations", "Branch operations", "Memory operations"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      }
    ]
  },
  pds: {
    1: [
      {
        id: 1,
        question: "The time complexity of accessing an element in an array is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "Which data structure uses LIFO principle?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "In a binary search tree, the inorder traversal gives:",
        options: ["Random order", "Sorted order", "Reverse sorted order", "Level order"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 4,
        question: "The worst-case time complexity of insertion in a linked list is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "A complete binary tree with n nodes has height:",
        options: ["log₂(n)", "⌊log₂(n)⌋", "⌈log₂(n+1)⌉ - 1", "n"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Which of the following is NOT a linear data structure?",
        options: ["Array", "Stack", "Queue", "Tree"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The space complexity of recursive factorial function is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "In a circular queue with n elements, how many elements can be stored?",
        options: ["n", "n-1", "n+1", "2n"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "The minimum number of nodes in a binary tree of height h is:",
        options: ["h", "h+1", "2^h", "2^h - 1"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Which traversal of a binary tree uses a stack?",
        options: ["Inorder", "Preorder", "Postorder", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 1
      }
    ],
    2: [
      {
        id: 1,
        question: "The time complexity of searching in a balanced BST is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "A hash table with good hash function has average search time:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "The postfix expression for (A + B) * C is:",
        options: ["AB+C*", "ABC+*", "A+BC*", "AB*C+"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "In a max heap, the largest element is at:",
        options: ["Root", "Leftmost leaf", "Rightmost leaf", "Any leaf"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "The time complexity of building a heap from n elements is:",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Which data structure is used for BFS traversal?",
        options: ["Stack", "Queue", "Priority Queue", "Deque"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The number of edges in a tree with n vertices is:",
        options: ["n", "n-1", "n+1", "2n"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "Double hashing is used to resolve:",
        options: ["Hash collisions", "Memory overflow", "Stack overflow", "Recursion"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "The time complexity of deleting a node from a doubly linked list is:",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 10,
        question: "AVL tree is a:",
        options: ["Complete binary tree", "Perfect binary tree", "Height-balanced BST", "Full binary tree"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      }
    ],
    3: [
      {
        id: 1,
        question: "The time complexity of finding LCA in a tree using binary lifting is:",
        options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "A B-tree of order m has maximum how many children per node?",
        options: ["m", "m-1", "2m", "2m-1"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "The amortized time complexity of union-find with path compression is:",
        options: ["O(1)", "O(log n)", "O(α(n))", "O(n)"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "Splay trees have amortized time complexity of:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "The space complexity of Morris inorder traversal is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Fibonacci heap supports decrease-key operation in:",
        options: ["O(1) amortized", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "The worst-case time complexity of skip list search is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "Persistent data structures allow:",
        options: ["Multiple versions", "Immutable operations", "Time travel queries", "All of the above"],
        correctAnswer: 3,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "The time complexity of range minimum query using sparse table is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "Treap is a combination of:",
        options: ["Tree and Heap", "Trie and Heap", "Tree and Hash", "Trie and Hash"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ]
  }
};

export const getMockTestQuestions = (section, testId) => {
  const sectionKey = section.toLowerCase();
  if (mockTestQuestions[sectionKey] && mockTestQuestions[sectionKey][testId]) {
    return mockTestQuestions[sectionKey][testId];
  }

  // Return default questions if section/test not found
  // For sections not yet implemented, return Engineering Mathematics questions
  return mockTestQuestions.em[1];
};

export default mockTestQuestions;
