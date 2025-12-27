import axios from 'axios';

class PracticeTracker {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || '';
  }

  // Track practice question completion
  async trackPracticeCompletion(subject, questionsCompleted, correctAnswers, sectionsCompleted = 0) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, practice completion not tracked');
        return null;
      }

      const response = await axios.post('/api/quiz/practice-complete', {
        subject,
        questionsCompleted,
        correctAnswers,
        sectionsCompleted
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        console.log('Practice completion tracked successfully:', response.data.data);
        return response.data.data;
      }
    } catch (error) {
      console.error('Failed to track practice completion:', error);
    }
    return null;
  }

  // Track section completion
  async trackSectionCompletion(subject, sectionCode, questionsCompleted, correctAnswers) {
    return this.trackPracticeCompletion(subject, questionsCompleted, correctAnswers, 1);
  }

  // Track mixed practice completion
  async trackMixedPracticeCompletion(subject, questionsCompleted, correctAnswers) {
    return this.trackPracticeCompletion(subject, questionsCompleted, correctAnswers, 0);
  }

  // Get practice statistics for current user
  async getPracticeStats() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      const response = await axios.get('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        return response.data.user.stats?.practiceStats || null;
      }
    } catch (error) {
      console.error('Failed to get practice stats:', error);
    }
    return null;
  }

  // Calculate practice accuracy
  calculateAccuracy(correctAnswers, totalQuestions) {
    if (totalQuestions === 0) return 0;
    return Math.round((correctAnswers / totalQuestions) * 100);
  }

  // Format practice stats for display
  formatPracticeStats(stats) {
    if (!stats) return null;

    const totalPractice = (stats.cs?.questionsCompleted || 0) + 
                         (stats.da?.questionsCompleted || 0) + 
                         (stats.ga?.questionsCompleted || 0);
    
    const totalCorrect = (stats.cs?.correctAnswers || 0) + 
                        (stats.da?.correctAnswers || 0) + 
                        (stats.ga?.correctAnswers || 0);

    return {
      totalPractice,
      totalCorrect,
      totalAccuracy: this.calculateAccuracy(totalCorrect, totalPractice),
      cs: {
        questions: stats.cs?.questionsCompleted || 0,
        correct: stats.cs?.correctAnswers || 0,
        accuracy: this.calculateAccuracy(stats.cs?.correctAnswers || 0, stats.cs?.questionsCompleted || 0),
        sections: stats.cs?.sectionsCompleted || 0
      },
      da: {
        questions: stats.da?.questionsCompleted || 0,
        correct: stats.da?.correctAnswers || 0,
        accuracy: this.calculateAccuracy(stats.da?.correctAnswers || 0, stats.da?.questionsCompleted || 0),
        sections: stats.da?.sectionsCompleted || 0
      },
      ga: {
        questions: stats.ga?.questionsCompleted || 0,
        correct: stats.ga?.correctAnswers || 0,
        accuracy: this.calculateAccuracy(stats.ga?.correctAnswers || 0, stats.ga?.questionsCompleted || 0),
        sections: stats.ga?.sectionsCompleted || 0
      }
    };
  }
}

export default new PracticeTracker();
