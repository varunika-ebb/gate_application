# Quiz Performance Summary - Average Score Fix

## Problem Identified

The average score displayed in the Quiz Performance Summary was different from the average score shown at the top of the dashboard page.

### Root Cause

The two calculations were using different methods:

1. **Dashboard Header (User Model)**: 
   - Uses `user?.accuracy` from User model
   - Calculation: `(totalCorrectAnswers / totalQuestions) * 100`
   - **Weighted average** - gives more importance to quizzes with more questions

2. **Quiz Performance Summary (Original)**:
   - Used `averagePercentage` from QuizHistory aggregation
   - Calculation: `$avg: '$percentage'` (simple average of quiz percentages)
   - **Simple average** - treats all quizzes equally regardless of question count

### Example

Consider these 3 quizzes:
- Quiz 1: 10 questions, 8 correct = 80%
- Quiz 2: 20 questions, 16 correct = 80%  
- Quiz 3: 5 questions, 3 correct = 60%

**User Model (Weighted)**: (8+16+3)/(10+20+5) * 100 = 27/35 * 100 = **77.1%**
**Original Method (Simple)**: (80+80+60)/3 = **73.3%**

## Solution Implemented

### 1. Updated Quiz Performance Summary Component

- **Primary Display**: Now shows `accuracy` (weighted) instead of `averagePercentage` (simple)
- **Secondary Display**: Shows both "Best" and "Simple Avg" for comparison
- **Summary Footer**: Uses weighted calculation to match dashboard header

### 2. Calculation Method

```javascript
// Weighted average calculation (same as User model)
const calculateWeightedAverage = (data) => {
  const totalQuestions = data.reduce((sum, item) => sum + item.totalQuestions, 0);
  const totalCorrect = data.reduce((sum, item) => sum + item.totalCorrect, 0);
  return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
};
```

### 3. UI Improvements

- **Column Header**: Changed from "Average Score" to "Accuracy"
- **Default Sort**: Now sorts by accuracy (descending) instead of date
- **Tooltip**: Added explanation "(Accuracy = weighted by question count)"
- **Details**: Shows both weighted accuracy and simple average for transparency

## Benefits

1. **Consistency**: Both dashboard header and quiz summary now use the same calculation method
2. **Accuracy**: Weighted average better reflects overall performance by considering question count
3. **Transparency**: Users can see both calculation methods for comparison
4. **Better UX**: Default sorting by accuracy helps users identify their strongest areas

## Files Modified

- `client/src/components/QuizPerformanceSummary.js` - Updated calculation and display logic
- `client/src/components/QuizPerformanceSummary.css` - No changes needed
- `server/models/QuizHistory.js` - No changes needed (aggregation remains the same)

## Testing

The fix ensures that:
- Dashboard header average score matches Quiz Performance Summary average score
- Weighted calculation gives more importance to quizzes with more questions
- Both metrics are clearly labeled and explained to users
- Performance data is consistent across the application
