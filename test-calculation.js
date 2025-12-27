// Test script to verify weighted average calculation
const sampleData = [
  {
    totalQuestions: 10,
    totalCorrect: 8,
    averagePercentage: 80
  },
  {
    totalQuestions: 20,
    totalCorrect: 16,
    averagePercentage: 80
  },
  {
    totalQuestions: 5,
    totalCorrect: 3,
    averagePercentage: 60
  }
];

// User model calculation (weighted by question count)
const totalQuestions = sampleData.reduce((sum, item) => sum + item.totalQuestions, 0);
const totalCorrect = sampleData.reduce((sum, item) => sum + item.totalCorrect, 0);
const weightedAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

// Simple average calculation (QuizHistory original method)
const simpleAverage = Math.round(
  sampleData.reduce((sum, item) => sum + item.averagePercentage, 0) / sampleData.length
);

console.log('Sample Data:');
sampleData.forEach((item, index) => {
  console.log(`Quiz ${index + 1}: ${item.totalQuestions} questions, ${item.totalCorrect} correct = ${item.averagePercentage}%`);
});

console.log('\nCalculations:');
console.log(`Total Questions: ${totalQuestions}`);
console.log(`Total Correct: ${totalCorrect}`);
console.log(`Weighted Accuracy (User model method): ${weightedAccuracy}%`);
console.log(`Simple Average (QuizHistory method): ${simpleAverage}%`);
console.log(`Difference: ${Math.abs(weightedAccuracy - simpleAverage)}%`);

console.log('\nThe weighted accuracy gives more importance to quizzes with more questions,');
console.log('which is more accurate for overall performance assessment.');
