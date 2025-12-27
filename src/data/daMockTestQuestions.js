// Mock test questions for all DA sections
const daMockTestQuestions = {
  ps: {
    1: [
      {
        id: 1,
        question: "If P(A) = 0.6 and P(B|A) = 0.4, what is P(A ∩ B)?",
        options: ["0.24", "0.4", "0.6", "1.0"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 2,
        question: "The mean of a normal distribution is 100 and standard deviation is 15. What is the z-score for x = 130?",
        options: ["2", "1.5", "2.5", "3"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 3,
        question: "In hypothesis testing, the significance level α represents:",
        options: ["Probability of Type II error", "Probability of Type I error", "Power of the test", "Confidence level"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The correlation coefficient r = 0.8 indicates:",
        options: ["Weak positive correlation", "Strong positive correlation", "Weak negative correlation", "No correlation"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "In a Poisson distribution, if λ = 4, what is the variance?",
        options: ["2", "4", "8", "16"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 6,
        question: "The central limit theorem applies when:",
        options: ["Sample size is small", "Population is normal", "Sample size is large", "Population is uniform"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "In regression analysis, the coefficient of determination R² measures:",
        options: ["Correlation strength", "Proportion of variance explained", "Standard error", "Residual sum of squares"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "Bayes' theorem relates:",
        options: ["Prior and posterior probabilities", "Mean and variance", "Sample and population", "Correlation and causation"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 9,
        question: "The chi-square goodness of fit test is used to:",
        options: ["Compare means", "Test independence", "Test distribution fit", "Compare variances"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 10,
        question: "In ANOVA, the F-statistic is the ratio of:",
        options: ["Between-group variance to within-group variance", "Sample variance to population variance", "Mean to standard deviation", "Correlation to regression"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      }
    ],
    2: [
      {
        id: 1,
        question: "The probability mass function of a binomial distribution is:",
        options: ["C(n,k) * p^k * (1-p)^(n-k)", "λ^k * e^(-λ) / k!", "p * (1-p)^(k-1)", "1/(b-a)"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "A 95% confidence interval means:",
        options: ["95% probability the parameter is in the interval", "95% of intervals contain the parameter", "95% confidence in the sample", "95% of data is in the interval"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "The Mann-Whitney U test is used for:",
        options: ["Comparing two independent groups", "Comparing paired samples", "Testing normality", "Testing independence"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 4,
        question: "In multiple regression, multicollinearity occurs when:",
        options: ["Predictors are highly correlated", "Residuals are correlated", "Response is non-linear", "Variance is non-constant"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 5,
        question: "The exponential distribution has the memoryless property, which means:",
        options: ["Past events don't affect future probabilities", "All events are independent", "Distribution has no parameters", "Mean equals variance"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 6,
        question: "Bootstrap sampling is used for:",
        options: ["Increasing sample size", "Estimating sampling distribution", "Reducing bias", "Testing hypotheses"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 7,
        question: "The Kolmogorov-Smirnov test compares:",
        options: ["Two means", "Two distributions", "Two variances", "Two correlations"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 8,
        question: "In Bayesian inference, the posterior is proportional to:",
        options: ["Prior × Likelihood", "Prior + Likelihood", "Prior / Likelihood", "Likelihood - Prior"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "Heteroscedasticity in regression refers to:",
        options: ["Non-constant variance of residuals", "Non-linear relationship", "Correlated residuals", "Non-normal residuals"],
        correctAnswer: 0,
        type: "MCQ",
        marks: 1
      },
      {
        id: 10,
        question: "The power of a statistical test is:",
        options: ["1 - α", "1 - β", "α + β", "α - β"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      }
    ],
    3: [
      {
        id: 1,
        question: "Maximum likelihood estimation finds parameters that:",
        options: ["Minimize squared error", "Maximize the likelihood function", "Minimize absolute error", "Maximize R-squared"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 2,
        question: "The Wilcoxon signed-rank test is the non-parametric equivalent of:",
        options: ["Independent t-test", "Paired t-test", "ANOVA", "Chi-square test"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 3,
        question: "In time series analysis, autocorrelation measures:",
        options: ["Correlation between different series", "Correlation between lagged values", "Trend in the series", "Seasonal patterns"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 4,
        question: "The geometric distribution models:",
        options: ["Number of successes in n trials", "Number of trials until first success", "Time between events", "Number of events in interval"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 5,
        question: "Spearman's rank correlation is preferred when:",
        options: ["Data is normally distributed", "Relationship is non-linear", "Sample size is large", "Variables are continuous"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 6,
        question: "The law of large numbers states that:",
        options: ["Larger samples are always better", "Sample mean converges to population mean", "Variance decreases with sample size", "Distribution becomes normal"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 2
      },
      {
        id: 7,
        question: "In logistic regression, the link function is:",
        options: ["Linear", "Logarithmic", "Logit", "Exponential"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 8,
        question: "The Durbin-Watson test checks for:",
        options: ["Normality", "Homoscedasticity", "Autocorrelation", "Multicollinearity"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      },
      {
        id: 9,
        question: "A Type II error occurs when:",
        options: ["We reject a true null hypothesis", "We fail to reject a false null hypothesis", "We accept a true null hypothesis", "We reject a false null hypothesis"],
        correctAnswer: 1,
        type: "MCQ",
        marks: 1
      },
      {
        id: 10,
        question: "The negative binomial distribution is a generalization of:",
        options: ["Binomial distribution", "Poisson distribution", "Geometric distribution", "Normal distribution"],
        correctAnswer: 2,
        type: "MCQ",
        marks: 2
      }
    ]
  }
  // Add more sections: la, co, pda, dmw, ml, ai with similar structure
};

export const getDAMockTestQuestions = (section, testId) => {
  const sectionKey = section.toLowerCase();
  if (daMockTestQuestions[sectionKey] && daMockTestQuestions[sectionKey][testId]) {
    return daMockTestQuestions[sectionKey][testId];
  }
  
  // Return default questions if section/test not found
  // For sections not yet implemented, return Probability & Statistics questions
  return daMockTestQuestions.ps[1];
};

export default daMockTestQuestions;
