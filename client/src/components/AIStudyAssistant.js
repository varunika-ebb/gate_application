import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './AIStudyAssistant.css';

const AIStudyAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('CS');
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const subjects = [
    { code: 'CS', name: 'Computer Science', icon: '💻' },
    { code: 'DA', name: 'Data Science & AI', icon: '🤖' },
    { code: 'GA', name: 'General Aptitude', icon: '🧠' }
  ];

  const quickQuestions = [
    "Explain time complexity of sorting algorithms",
    "What is the difference between BFS and DFS?",
    "How to solve recurrence relations?",
    "Explain NP-complete problems",
    "What is the principle of mathematical induction?",
    "Explain probability distributions",
    "How to solve linear programming problems?"
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        type: 'ai',
        content: `Hello ${user?.name || 'Student'}! 👋 I'm your AI Study Assistant for GATE preparation. I can help you with:\n\n• Step-by-step problem solving\n• Concept explanations\n• Formula derivations\n• Exam strategies\n• Doubt clarification\n\nWhat would you like to know?`,
        timestamp: new Date()
      }]);
    }
    
    // Test AI endpoint connectivity
    testAIConnectivity();
  }, [user, messages.length]);

  const testAIConnectivity = async () => {
    try {
      const response = await fetch('/api/ai/test');
      const data = await response.json();
      console.log('AI endpoint test:', data);
    } catch (error) {
      console.error('AI endpoint not accessible:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: messageText,
          subject: selectedSubject,
          userId: user?._id,
          context: {
            userLevel: 'GATE Aspirant',
            examType: 'GATE',
            preferredStyle: 'step-by-step'
          }
        })
      });

      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('AI Response data:', data);
      
      if (data.success && data.response) {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          subject: selectedSubject
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      
      // Provide a fallback response based on the question
      const fallbackResponse = generateFallbackResponse(messageText, selectedSubject);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date(),
        subject: selectedSubject
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'ai',
      content: `Hello ${user?.name || 'Student'}! 👋 I'm your AI Study Assistant for GATE preparation. I can help you with:\n\n• Step-by-step problem solving\n• Concept explanations\n• Formula derivations\n• Exam strategies\n• Doubt clarification\n\nWhat would you like to know?`,
      timestamp: new Date()
    }]);
  };

  const formatMessage = (content) => {
    // Convert LaTeX-style math to display format
    return content
      .replace(/\\\(/g, '\\(')
      .replace(/\\\)/g, '\\)')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  // Fallback response generator for when backend is not available
  const generateFallbackResponse = (message, subject) => {
    const lowerMessage = message.toLowerCase();
    
    // Recurrence relations
    if (lowerMessage.includes('recurrence') || lowerMessage.includes('recurrence relation')) {
      return `**Recurrence Relations** 🔢

**Simple Method:** Use Master Theorem for divide-and-conquer recurrences like T(n) = aT(n/b) + f(n).

**For GATE:** Master Theorem is most important. Compare f(n) with n^(log_b a) to get the solution.

**Key Formula:** If f(n) = O(n^(log_b a - ε)), then T(n) = Θ(n^(log_b a)). If f(n) = Θ(n^(log_b a)), then T(n) = Θ(n^(log_b a) log n).

**💡 GATE Tip:** Practice Master Theorem with different values of a, b, and f(n)! 🚀`;
    }
    
    // Mathematical induction
    if (lowerMessage.includes('induction') || lowerMessage.includes('mathematical induction')) {
      return `**Mathematical Induction** 📐

**Simple Steps:** 1) Base case (n=1), 2) Assume true for n=k, 3) Prove for n=k+1.

**For GATE:** Used to prove algorithm correctness and time complexity. Always show all three steps clearly.

**Example:** Prove 1+2+...+n = n(n+1)/2. Base: n=1 gives 1=1. Assume true for k, then prove for k+1.

**💡 GATE Tip:** Practice with simple formulas first, then move to algorithm proofs! 🚀`;
    }
    
    // Time complexity
    if (lowerMessage.includes('time complexity') || lowerMessage.includes('big o')) {
      return `**Time Complexity** 🕒

**Big O Basics:** O(1) constant, O(log n) logarithmic, O(n) linear, O(n²) quadratic, O(2ⁿ) exponential.

**For GATE:** Focus on worst-case analysis. Common patterns: Binary search O(log n), sorting O(n log n), nested loops O(n²).

**Key Rule:** Drop constants and lower-order terms. O(3n² + 2n + 1) = O(n²).

**💡 GATE Tip:** Practice analyzing loops and recursive functions step by step! 🚀`;
    }
    
    // Graph algorithms
    if (lowerMessage.includes('graph') || lowerMessage.includes('bfs') || lowerMessage.includes('dfs') || lowerMessage.includes('shortest path')) {
      return `**Graph Algorithms** 📊

**BFS vs DFS:** BFS uses queue (level by level), DFS uses stack (go deep first). Both O(V+E) time.

**For GATE:** BFS for shortest path in unweighted graphs, DFS for cycle detection and topological sort.

**Shortest Path:** Dijkstra for non-negative weights O((V+E)log V), Bellman-Ford for negative weights O(VE).

**💡 GATE Tip:** Remember BFS=queue, DFS=stack, and their time complexities! 🚀`;
    }
    
    // Dynamic programming
    if (lowerMessage.includes('dynamic programming') || lowerMessage.includes('dp') || lowerMessage.includes('memoization')) {
      return `**Dynamic Programming** 🧮

**Key Concept:** Break problem into overlapping subproblems and store results to avoid recomputation.

**For GATE:** Look for optimal substructure and overlapping subproblems. Common patterns: Fibonacci, LCS, Knapsack.

**Approach:** Top-down (memoization) or bottom-up (tabulation). Start with base cases, build up to solution.

**💡 GATE Tip:** Practice identifying when to use DP vs greedy vs divide-and-conquer! 🚀`;
    }
    
    // NP-complete problems
    if (lowerMessage.includes('np-complete') || lowerMessage.includes('np complete') || lowerMessage.includes('np hard')) {
      return `**NP-Complete Problems** 🔬

**Simple Explanation:**
NP-complete problems are the hardest problems in computer science that can be verified quickly but not solved quickly. Examples include 3-SAT, Clique, and Vertex Cover problems.

**For GATE:** These problems appear in complexity theory questions. You need to recognize them and understand that no efficient algorithm exists for them.

**Key Point:** If you can solve any NP-complete problem in polynomial time, you can solve ALL NP problems efficiently (P = NP).

**GATE Strategy:** Focus on identifying NP-complete problems and understanding their relationship to P and NP classes.

**💡 Remember:** NP-complete = Hard to solve, easy to verify! 🚀`;
    }
    
    // Algorithm questions
    if (lowerMessage.includes('algorithm') || lowerMessage.includes('sorting') || lowerMessage.includes('searching')) {
      return `**Algorithms** 🔍

**Sorting:** Quick sort O(n log n) average, Merge sort O(n log n) worst, Bubble sort O(n²).

**Searching:** Binary search O(log n) on sorted array, Linear search O(n) on unsorted.

**For GATE:** Focus on time/space complexity and when to use which algorithm.

**💡 GATE Tip:** Practice tracing through algorithms with small examples! 🚀`;
    }
    
    // Data structure questions
    if (lowerMessage.includes('data structure') || lowerMessage.includes('tree') || lowerMessage.includes('graph')) {
      return `**Data Structures** 📊

**Common Structures:** Array O(1) access, Linked List O(n) search, Stack/Queue O(1) operations, Tree O(log n) search.

**For GATE:** Focus on time complexity of operations (insert, delete, search) and when to use which structure.

**Key Point:** Arrays for random access, Linked lists for dynamic size, Trees for hierarchical data.

**💡 GATE Tip:** Practice drawing and tracing through data structure operations! 🚀`;
    }
    
    // Machine Learning
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('ai')) {
      return `**Machine Learning** 🤖

**Definition:** ML is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

**Types:** Supervised learning (with labels), Unsupervised learning (without labels), Reinforcement learning (trial and error).

**For GATE:** Focus on algorithms like linear regression, decision trees, neural networks, and their applications.

**💡 GATE Tip:** Understand the difference between supervised, unsupervised, and reinforcement learning! 🚀`;
    }
    
    // Database concepts
    if (lowerMessage.includes('database') || lowerMessage.includes('sql') || lowerMessage.includes('dbms') || lowerMessage.includes('normalization')) {
      return `**Database Concepts** 🗄️

**DBMS:** Database Management System manages data storage, retrieval, and manipulation efficiently.

**Key Concepts:** ACID properties (Atomicity, Consistency, Isolation, Durability), Normalization (1NF, 2NF, 3NF, BCNF), SQL queries.

**For GATE:** Focus on relational algebra, SQL operations, normalization forms, and transaction management.

**💡 GATE Tip:** Practice writing SQL queries and understanding normalization! 🚀`;
    }
    
    // Operating Systems
    if (lowerMessage.includes('operating system') || lowerMessage.includes('os') || lowerMessage.includes('process') || lowerMessage.includes('thread')) {
      return `**Operating Systems** 💻

**OS Functions:** Process management, memory management, file systems, device management, and security.

**Key Concepts:** Processes vs Threads, CPU scheduling, Memory allocation, Deadlock prevention.

**For GATE:** Focus on scheduling algorithms (FCFS, SJF, Round Robin), memory management, and deadlock handling.

**💡 GATE Tip:** Understand the difference between processes and threads, and various scheduling algorithms! 🚀`;
    }
    
    // Computer Networks
    if (lowerMessage.includes('network') || lowerMessage.includes('tcp') || lowerMessage.includes('ip') || lowerMessage.includes('protocol')) {
      return `**Computer Networks** 🌐

**Network Layers:** Physical, Data Link, Network, Transport, Session, Presentation, Application (OSI model).

**Key Protocols:** TCP (reliable), UDP (fast), HTTP (web), FTP (file transfer), SMTP (email).

**For GATE:** Focus on OSI model, TCP/IP stack, routing algorithms, and network security concepts.

**💡 GATE Tip:** Understand the difference between TCP and UDP, and memorize the OSI layers! 🚀`;
    }
    
    // Software Engineering
    if (lowerMessage.includes('software engineering') || lowerMessage.includes('sdlc') || lowerMessage.includes('testing') || lowerMessage.includes('uml')) {
      return `**Software Engineering** 🔧

**SDLC:** Software Development Life Cycle includes planning, analysis, design, implementation, testing, and maintenance.

**Key Concepts:** Waterfall, Agile, Scrum methodologies, Testing levels (unit, integration, system), UML diagrams.

**For GATE:** Focus on software development models, testing strategies, and project management concepts.

**💡 GATE Tip:** Understand different SDLC models and their advantages/disadvantages! 🚀`;
    }
    
    // Computer Architecture
    if (lowerMessage.includes('computer architecture') || lowerMessage.includes('cpu') || lowerMessage.includes('memory') || lowerMessage.includes('cache')) {
      return `**Computer Architecture** 🏗️

**CPU Components:** ALU (Arithmetic Logic Unit), Control Unit, Registers, Cache memory hierarchy.

**Memory Hierarchy:** CPU registers → Cache (L1, L2, L3) → RAM → Secondary storage (HDD/SSD).

**For GATE:** Focus on instruction execution, pipelining, cache memory, and performance optimization.

**💡 GATE Tip:** Understand memory hierarchy and how cache improves performance! 🚀`;
    }
    
    // Programming Languages
    if (lowerMessage.includes('programming') || lowerMessage.includes('language') || lowerMessage.includes('compiler') || lowerMessage.includes('interpreter')) {
      return `**Programming Languages** 💻

**Types:** High-level (Python, Java, C++) vs Low-level (Assembly, Machine code), Compiled vs Interpreted languages.

**Key Concepts:** Compiler (translates entire program), Interpreter (translates line by line), Syntax vs Semantics.

**For GATE:** Focus on language paradigms (procedural, object-oriented, functional), compilation process, and language features.

**💡 GATE Tip:** Understand the difference between compiled and interpreted languages! 🚀`;
    }
    
    // Theory of Computation
    if (lowerMessage.includes('automata') || lowerMessage.includes('turing machine') || lowerMessage.includes('regular expression') || lowerMessage.includes('context free')) {
      return `**Theory of Computation** 🧮

**Automata Theory:** Finite Automata (FA), Pushdown Automata (PDA), Turing Machines (TM) for different language classes.

**Language Hierarchy:** Regular ⊆ Context-Free ⊆ Context-Sensitive ⊆ Recursively Enumerable.

**For GATE:** Focus on automata types, language recognition, and computational complexity classes.

**💡 GATE Tip:** Understand the hierarchy of languages and their corresponding automata! 🚀`;
    }
    
    // Compiler Design
    if (lowerMessage.includes('compiler design') || lowerMessage.includes('lexical analysis') || lowerMessage.includes('parsing') || lowerMessage.includes('syntax tree')) {
      return `**Compiler Design** 🔧

**Compiler Phases:** Lexical Analysis → Syntax Analysis → Semantic Analysis → Code Generation → Optimization.

**Key Concepts:** Lexical analyzer (tokens), Parser (syntax tree), Symbol table, Intermediate code generation.

**For GATE:** Focus on parsing techniques (top-down, bottom-up), grammar types, and optimization techniques.

**💡 GATE Tip:** Understand the phases of compilation and different parsing strategies! 🚀`;
    }
    
    // Digital Logic
    if (lowerMessage.includes('digital logic') || lowerMessage.includes('boolean algebra') || lowerMessage.includes('logic gates') || lowerMessage.includes('karnaugh map')) {
      return `**Digital Logic** ⚡

**Logic Gates:** AND, OR, NOT, NAND, NOR, XOR, XNOR gates and their truth tables.

**Boolean Algebra:** Laws (Commutative, Associative, Distributive), De Morgan's theorem, Boolean functions.

**For GATE:** Focus on logic gate combinations, K-maps for simplification, and sequential circuits (flip-flops).

**💡 GATE Tip:** Practice K-map simplification and understand flip-flop operations! 🚀`;
    }
    
    // Math questions
    if (lowerMessage.includes('probability') || lowerMessage.includes('statistics') || lowerMessage.includes('calculus')) {
      return `**Mathematics** 📐

**Probability:** P(A∪B) = P(A) + P(B) - P(A∩B), Bayes' theorem for conditional probability.

**Statistics:** Mean = Σx/n, Variance = Σ(x-μ)²/n, Standard deviation = √Variance.

**For GATE:** Focus on basic probability rules, normal distribution, and statistical measures.

**💡 GATE Tip:** Practice with real examples and understand the formulas, don't just memorize! 🚀`;
    }
    
    // GATE preparation
    if (lowerMessage.includes('gate') || lowerMessage.includes('exam') || lowerMessage.includes('preparation')) {
      return `**GATE Preparation** 🎯

**Study Plan:** 3-4 months foundation, 2-3 months problem solving, 1-2 months mock tests and revision.

**Key Strategy:** Focus on algorithms, data structures, and theory. Practice previous year papers (last 10 years).

**Exam Tips:** Read carefully, mark difficulty levels, use elimination, manage negative marking. Better accuracy than speed.

**💡 GATE Tip:** Start with your weakest subject and build systematically! 🚀`;
    }
    
    // Default response
    return `**AI Study Assistant** 🤖

I understand you're asking about: "${message}"

**Simple Answer:** This is an important GATE topic. Focus on understanding the core concept and its applications.

**For GATE:** Practice with examples and understand the underlying principles rather than memorizing.

**Key Point:** Break down complex problems into smaller, manageable parts.

**💡 GATE Tip:** Practice regularly and focus on problem-solving approach! 🚀`;
  };

  return (
    <div className="ai-study-assistant">
      <div className="ai-header">
        <div className="ai-title">
          <span className="ai-icon">🤖</span>
          <h2>AI Study Assistant</h2>
        </div>
        <div className="ai-subject-selector">
          <label>Subject:</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-dropdown"
          >
            {subjects.map(subject => (
              <option key={subject.code} value={subject.code}>
                {subject.icon} {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ai-chat-container">
        <div className="ai-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">
                    {message.type === 'user' ? '👤 You' : '🤖 AI Assistant'}
                  </span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div 
                  className="message-text"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMessage(message.content) 
                  }}
                />
                {message.subject && (
                  <div className="message-subject">
                    Subject: {subjects.find(s => s.code === message.subject)?.name}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message ai">
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">🤖 AI Assistant</span>
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-questions">
          <h4>Quick Questions:</h4>
          <div className="quick-questions-grid">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form className="ai-input-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about GATE preparation..."
              className="ai-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="ai-send-btn"
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? '⏳' : '🚀'}
            </button>
          </div>
        </form>

        <div className="ai-actions">
          <button onClick={clearChat} className="clear-chat-btn">
            🗑️ Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIStudyAssistant;
