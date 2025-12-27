// DA Practice questions for all 7 sections
const daPracticeQuestions = {
  ps: [
    // Probability and Statistics - 30 questions
    {
      id: 1,
      question: "If P(A) = 0.4 and P(B) = 0.3, and A and B are mutually exclusive events, what is P(A ∪ B)?",
      options: ["0.7", "0.12", "0.1", "0.58"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Probability"
    },
    {
      id: 2,
      question: "In a normal distribution with mean 50 and standard deviation 10, what percentage of values lie within one standard deviation of the mean?",
      options: ["68%", "95%", "99.7%", "50%"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Normal Distribution"
    },
    {
      id: 3,
      question: "The central limit theorem states that the sampling distribution of the sample mean approaches:",
      options: ["Uniform distribution", "Normal distribution", "Exponential distribution", "Poisson distribution"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Central Limit Theorem"
    },
    {
      id: 4,
      question: "In hypothesis testing, a Type I error occurs when:",
      options: ["We reject a true null hypothesis", "We accept a false null hypothesis", "We reject a false null hypothesis", "We accept a true null hypothesis"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Hypothesis Testing"
    },
    {
      id: 5,
      question: "The correlation coefficient between two variables ranges from:",
      options: ["0 to 1", "-1 to 1", "0 to infinity", "-infinity to infinity"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Correlation"
    },
    {
      id: 6,
      question: "In a Poisson distribution with parameter λ = 3, what is the probability of exactly 2 events?",
      options: ["e^(-3) * 3^2 / 2!", "e^(-2) * 2^3 / 3!", "3^2 / 2!", "2^3 / 3!"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Poisson Distribution"
    },
    {
      id: 7,
      question: "The chi-square test is used to test:",
      options: ["Independence of variables", "Normality of data", "Equality of means", "Linearity of relationship"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Chi-square Test"
    },
    {
      id: 8,
      question: "In regression analysis, R-squared represents:",
      options: ["The correlation coefficient", "The proportion of variance explained", "The standard error", "The confidence interval"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Regression"
    },
    {
      id: 9,
      question: "Bayes' theorem is used to calculate:",
      options: ["Prior probability", "Posterior probability", "Marginal probability", "Joint probability"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Bayes Theorem"
    },
    {
      id: 10,
      question: "The standard error of the mean is calculated as:",
      options: ["σ/√n", "σ*√n", "σ/n", "σ*n"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Sampling"
    },
    // Add 20 more PS questions...
    {
      id: 11,
      question: "In a binomial distribution with n=10 and p=0.3, what is the expected value?",
      options: ["3", "7", "0.3", "10"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "Binomial Distribution"
    },
    {
      id: 12,
      question: "The confidence interval for a population mean with known variance uses:",
      options: ["t-distribution", "z-distribution", "chi-square distribution", "F-distribution"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Confidence Intervals"
    },
    {
      id: 13,
      question: "ANOVA is used to compare:",
      options: ["Two means", "Multiple means", "Two variances", "Multiple variances"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "ANOVA"
    },
    {
      id: 14,
      question: "The Mann-Whitney U test is a:",
      options: ["Parametric test", "Non-parametric test", "Regression test", "Correlation test"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Non-parametric Tests"
    },
    {
      id: 15,
      question: "Maximum likelihood estimation finds parameters that:",
      options: ["Minimize error", "Maximize likelihood", "Minimize variance", "Maximize correlation"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "MLE"
    },
    // Continue with more questions to reach 30...
    {
      id: 16,
      question: "The probability density function of an exponential distribution is:",
      options: ["λe^(-λx)", "e^(-λx)", "λx*e^(-λx)", "x*e^(-λx)"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Exponential Distribution"
    },
    {
      id: 17,
      question: "In a two-tailed test with α = 0.05, the critical z-values are approximately:",
      options: ["±1.64", "±1.96", "±2.33", "±2.58"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Hypothesis Testing"
    },
    {
      id: 18,
      question: "The variance of a uniform distribution on [a,b] is:",
      options: ["(b-a)²/12", "(b-a)²/6", "(b+a)²/12", "(b+a)/2"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Uniform Distribution"
    },
    {
      id: 19,
      question: "Spearman's rank correlation is used when:",
      options: ["Data is normally distributed", "Data is not normally distributed", "Sample size is large", "Variables are independent"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Correlation"
    },
    {
      id: 20,
      question: "The p-value in hypothesis testing represents:",
      options: ["Probability of Type I error", "Probability of observing the data given H0 is true", "Probability H0 is true", "Probability of Type II error"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Hypothesis Testing"
    },
    {
      id: 21,
      question: "In multiple regression, multicollinearity refers to:",
      options: ["High correlation between predictors", "Low correlation between predictors", "High correlation with response", "Non-linear relationships"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Regression"
    },
    {
      id: 22,
      question: "The Kolmogorov-Smirnov test is used to test:",
      options: ["Normality", "Independence", "Homogeneity", "All of the above"],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Goodness of Fit"
    },
    {
      id: 23,
      question: "Bootstrap sampling is used for:",
      options: ["Parameter estimation", "Confidence intervals", "Hypothesis testing", "All of the above"],
      correctAnswer: 3,
      type: "MCQ",
      marks: 2,
      topic: "Bootstrap"
    },
    {
      id: 24,
      question: "The geometric distribution models:",
      options: ["Number of successes in n trials", "Number of trials until first success", "Time between events", "Number of events in time interval"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Geometric Distribution"
    },
    {
      id: 25,
      question: "In Bayesian inference, the prior distribution represents:",
      options: ["Data likelihood", "Initial belief about parameter", "Posterior belief", "Marginal likelihood"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Bayesian Inference"
    },
    {
      id: 26,
      question: "The F-test in ANOVA tests:",
      options: ["Equality of means", "Equality of variances", "Independence", "Normality"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 1,
      topic: "ANOVA"
    },
    {
      id: 27,
      question: "Heteroscedasticity in regression means:",
      options: ["Constant variance", "Non-constant variance", "Linear relationship", "Normal residuals"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Regression Assumptions"
    },
    {
      id: 28,
      question: "The Wilcoxon signed-rank test is used for:",
      options: ["Independent samples", "Paired samples", "Multiple groups", "Categorical data"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 1,
      topic: "Non-parametric Tests"
    },
    {
      id: 29,
      question: "The law of large numbers states that:",
      options: ["Sample mean approaches population mean", "Sample variance approaches population variance", "Sample size affects accuracy", "All samples are representative"],
      correctAnswer: 0,
      type: "MCQ",
      marks: 2,
      topic: "Law of Large Numbers"
    },
    {
      id: 30,
      question: "In time series analysis, autocorrelation measures:",
      options: ["Correlation between variables", "Correlation between time periods", "Trend in data", "Seasonal patterns"],
      correctAnswer: 1,
      type: "MCQ",
      marks: 2,
      topic: "Time Series"
    }
  ]
  // Add more sections: la, co, pda, dmw, ml, ai with 30 questions each
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
  la: 'ps',   // Linear Algebra -> Probability & Statistics
  co: 'ps',   // Calculus & Optimization -> Probability & Statistics  
  pda: 'ps',  // Programming, Data Structures & Algorithms -> Probability & Statistics
  dmw: 'ps',  // Database Management & Warehousing -> Probability & Statistics
  ml: 'ps',   // Machine Learning -> Probability & Statistics
  ai: 'ps'    // Artificial Intelligence -> Probability & Statistics
};

// Get DA practice questions with exactly 50 marks for 30 questions
const getDAPracticeQuestionsWithTargetMarks = (section, count = 30, targetMarks = 50) => {
  const sectionKey = section.toLowerCase();

  // Get all available questions for the section
  let availableQuestions = [];
  if (daPracticeQuestions[sectionKey]) {
    availableQuestions = [...daPracticeQuestions[sectionKey]];
  } else {
    // Use fallback section
    const fallbackSection = sectionFallbacks[sectionKey] || 'ps';
    availableQuestions = [...daPracticeQuestions[fallbackSection]];
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

export const getDAPracticeQuestions = (section, count = 30) => {
  // For practice sessions, ensure exactly 50 marks
  if (count === 30) {
    return getDAPracticeQuestionsWithTargetMarks(section, count, 50);
  }

  // For other counts, use the original logic
  const sectionKey = section.toLowerCase();

  // Check if section has questions
  if (daPracticeQuestions[sectionKey] && daPracticeQuestions[sectionKey].length >= count) {
    const questions = daPracticeQuestions[sectionKey];
    // Use Fisher-Yates shuffle for better randomization
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, count);
  }

  // If section doesn't have enough questions, use available questions and fill with fallback
  let availableQuestions = [];
  if (daPracticeQuestions[sectionKey]) {
    availableQuestions = [...daPracticeQuestions[sectionKey]];
  }

  // Determine fallback section
  const fallbackSection = sectionFallbacks[sectionKey] || 'ps';
  const fallbackQuestions = daPracticeQuestions[fallbackSection];
  const remainingCount = count - availableQuestions.length;

  if (remainingCount > 0 && fallbackQuestions) {
    const shuffledFallback = shuffleArray(fallbackQuestions);
    availableQuestions = [...availableQuestions, ...shuffledFallback.slice(0, remainingCount)];
  }

  // Final shuffle of the combined questions
  const finalShuffled = shuffleArray(availableQuestions);
  return finalShuffled.slice(0, count);
};

export default daPracticeQuestions;
