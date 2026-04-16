/**
 * Quiz System Module
 * Interactive quiz engine for vocabulary and grammar practice
 */

const QuizModule = (function() {
  let currentQuiz = [];
  let currentQuestionIndex = 0;
  let quizCorrect = 0;
  let quizStartTime = 0;
  let onQuizComplete = null;

  /**
   * Generate a quiz from vocabulary words
   * @param {Array} words - Array of vocabulary words
   * @param {number} count - Number of questions
   * @param {string} mode - 'multiple-choice' | 'write' | 'mixed'
   * @returns {Array} Quiz questions
   */
  function generateQuiz(words, count = 10, mode = 'mixed') {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, Math.min(count, words.length));
    
    return shuffled.map(word => {
      const useMultipleChoice = mode === 'multiple-choice' || (mode === 'mixed' && Math.random() > 0.5);
      const others = words.filter(w => w.id !== word.id);
      const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.german);
      
      return {
        word,
        type: useMultipleChoice ? 'multiple-choice' : 'write',
        options: useMultipleChoice ? [...wrong, word.german].sort(() => Math.random() - 0.5) : undefined,
        correctAnswer: word.german,
      };
    });
  }

  /**
   * Generate a grammar quiz
   * @param {Array} exercises - Array of grammar exercises
   * @param {number} count - Number of questions
   * @param {string} category - Filter by category (optional)
   * @returns {Array} Quiz questions
   */
  function generateGrammarQuiz(exercises, count = 10, category = '') {
    const pool = category ? exercises.filter(ex => ex.category === category) : exercises;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
    return shuffled;
  }

  /**
   * Start a quiz session
   * @param {Array} questions - Quiz questions
   * @param {Function} onComplete - Callback when quiz completes
   */
  function startQuiz(questions, onComplete) {
    currentQuiz = questions;
    currentQuestionIndex = 0;
    quizCorrect = 0;
    quizStartTime = Date.now();
    onQuizComplete = onComplete;
    
    return {
      totalQuestions: currentQuiz.length,
      currentQuestion: getCurrentQuestion()
    };
  }

  /**
   * Get current question
   * @returns {Object|null}
   */
  function getCurrentQuestion() {
    if (currentQuestionIndex < currentQuiz.length) {
      return currentQuiz[currentQuestionIndex];
    }
    return null;
  }

  /**
   * Check an answer
   * @param {string} answer - User's answer
   * @returns {Object} Result with correct flag and feedback
   */
  function checkAnswer(answer) {
    const question = currentQuiz[currentQuestionIndex];
    if (!question) return { correct: false, error: 'No question' };

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      quizCorrect++;
    }

    return {
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      word: question.word,
      explanation: question.explanation || null
    };
  }

  /**
   * Move to next question
   * @returns {Object|null} Next question or null if quiz is complete
   */
  function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentQuiz.length) {
      return finishQuiz();
    }
    
    return getCurrentQuestion();
  }

  /**
   * Finish the quiz and return results
   * @returns {Object} Quiz results
   */
  function finishQuiz() {
    const timeSpent = Date.now() - quizStartTime;
    const accuracy = currentQuiz.length > 0 ? (quizCorrect / currentQuiz.length) * 100 : 0;
    
    const results = {
      correct: quizCorrect,
      total: currentQuiz.length,
      accuracy: Math.round(accuracy),
      timeSpent: Math.round(timeSpent / 1000), // seconds
      completedAt: Date.now()
    };

    // Reset state
    currentQuiz = [];
    currentQuestionIndex = 0;
    quizCorrect = 0;
    quizStartTime = 0;

    // Call completion callback
    if (onQuizComplete) {
      onQuizComplete(results);
    }

    return results;
  }

  /**
   * Get quiz progress
   * @returns {Object} Current progress
   */
  function getProgress() {
    return {
      current: currentQuestionIndex + 1,
      total: currentQuiz.length,
      correct: quizCorrect,
      percentage: currentQuiz.length > 0 ? Math.round(((currentQuestionIndex) / currentQuiz.length) * 100) : 0
    };
  }

  /**
   * Cancel current quiz
   */
  function cancelQuiz() {
    currentQuiz = [];
    currentQuestionIndex = 0;
    quizCorrect = 0;
    quizStartTime = 0;
    onQuizComplete = null;
  }

  return {
    generateQuiz,
    generateGrammarQuiz,
    startQuiz,
    getCurrentQuestion,
    checkAnswer,
    nextQuestion,
    finishQuiz,
    getProgress,
    cancelQuiz,
    isActive: () => currentQuiz.length > 0
  };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizModule;
}
