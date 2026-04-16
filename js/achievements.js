/**
 * Achievements System Module
 * Tracks and unlocks achievements based on user progress
 * 16 achievements across streak, learning, quiz, accuracy, and special categories
 */

const AchievementsModule = (function() {
  const STORAGE_KEY = 'german-portal-achievements';
  let unlockedAchievements = [];
  let onAchievementUnlocked = null;

  /**
   * All 16 achievements definition
   */
  const allAchievements = [
    // Streak Achievements
    {
      id: 'streak-1',
      title: 'Getting Started',
      description: 'Learn for 1 day in a row',
      icon: '🌱',
      condition: (p) => p.currentStreak >= 1,
      category: 'streak',
    },
    {
      id: 'streak-3',
      title: 'On Fire',
      description: '3 day streak',
      icon: '🔥',
      condition: (p) => p.currentStreak >= 3,
      category: 'streak',
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: '7 day streak',
      icon: '⚔️',
      condition: (p) => p.currentStreak >= 7,
      category: 'streak',
    },
    {
      id: 'streak-30',
      title: 'Monthly Master',
      description: '30 day streak',
      icon: '👑',
      condition: (p) => p.currentStreak >= 30,
      category: 'streak',
    },
    
    // Learning Achievements
    {
      id: 'learn-10',
      title: 'First Steps',
      description: 'Learn 10 words',
      icon: '📚',
      condition: (p) => p.totalWordsLearned >= 10,
      category: 'learning',
    },
    {
      id: 'learn-25',
      title: 'Vocabulary Builder',
      description: 'Learn 25 words',
      icon: '📖',
      condition: (p) => p.totalWordsLearned >= 25,
      category: 'learning',
    },
    {
      id: 'learn-50',
      title: 'Word Collector',
      description: 'Learn 50 words',
      icon: '🎯',
      condition: (p) => p.totalWordsLearned >= 50,
      category: 'learning',
    },
    {
      id: 'learn-100',
      title: 'Century Club',
      description: 'Learn 100 words',
      icon: '💯',
      condition: (p) => p.totalWordsLearned >= 100,
      category: 'learning',
    },
    
    // Quiz Achievements
    {
      id: 'quiz-1',
      title: 'First Quiz',
      description: 'Complete your first quiz',
      icon: '✅',
      condition: (p) => p.totalQuizCount >= 1,
      category: 'quiz',
    },
    {
      id: 'quiz-10',
      title: 'Quiz Enthusiast',
      description: 'Complete 10 quizzes',
      icon: '🎮',
      condition: (p) => p.totalQuizCount >= 10,
      category: 'quiz',
    },
    {
      id: 'quiz-50',
      title: 'Quiz Master',
      description: 'Complete 50 quizzes',
      icon: '🏆',
      condition: (p) => p.totalQuizCount >= 50,
      category: 'quiz',
    },
    
    // Accuracy Achievements
    {
      id: 'accuracy-50',
      title: 'Halfway There',
      description: 'Achieve 50% average accuracy',
      icon: '🎯',
      condition: (p) => p.averageAccuracy >= 50,
      category: 'accuracy',
    },
    {
      id: 'accuracy-75',
      title: 'Sharp Shooter',
      description: 'Achieve 75% average accuracy',
      icon: '🏹',
      condition: (p) => p.averageAccuracy >= 75,
      category: 'accuracy',
    },
    {
      id: 'accuracy-90',
      title: 'Perfect Student',
      description: 'Achieve 90% average accuracy',
      icon: '⭐',
      condition: (p) => p.averageAccuracy >= 90,
      category: 'accuracy',
    },
    
    // Special Achievements
    {
      id: 'special-perfect',
      title: 'Flawless Victory',
      description: 'Get 100% on a quiz with 10+ questions',
      icon: '✨',
      condition: (p) => p.quizHistory && p.quizHistory.some(q => q.accuracy === 100 && q.total >= 10),
      category: 'special',
    },
    {
      id: 'special-comeback',
      title: 'Comeback Kid',
      description: 'Get 100% on a quiz after scoring below 50%',
      icon: '🦄',
      condition: (p) => {
        if (!p.quizHistory) return false;
        const hasBad = p.quizHistory.some(q => q.accuracy < 50);
        const hasPerfect = p.quizHistory.some(q => q.accuracy === 100);
        return hasBad && hasPerfect;
      },
      category: 'special',
    },
    {
      id: 'special-marathon',
      title: 'Marathon Runner',
      description: 'Complete a 20-question quiz',
      icon: '🏃',
      condition: (p) => p.quizHistory && p.quizHistory.some(q => q.total >= 20),
      category: 'special',
    },
  ];

  /**
   * Initialize achievements system
   */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      unlockedAchievements = JSON.parse(saved);
    }
    return allAchievements;
  }

  /**
   * Check if an achievement is unlocked
   * @param {string} achievementId - Achievement ID
   * @returns {boolean}
   */
  function isUnlocked(achievementId) {
    return unlockedAchievements.includes(achievementId);
  }

  /**
   * Unlock an achievement
   * @param {string} achievementId - Achievement ID
   * @returns {boolean} True if newly unlocked
   */
  function unlock(achievementId) {
    if (!isUnlocked(achievementId)) {
      unlockedAchievements.push(achievementId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedAchievements));
      
      if (onAchievementUnlocked) {
        onAchievementUnlocked(achievementId);
      }
      
      return true;
    }
    return false;
  }

  /**
   * Check all achievements against current progress
   * @param {Object} progress - User progress object with quizHistory
   * @returns {Array} Newly unlocked achievements
   */
  function checkAll(progress) {
    const newlyUnlocked = [];
    
    allAchievements.forEach(achievement => {
      if (!isUnlocked(achievement.id) && achievement.condition(progress)) {
        if (unlock(achievement.id)) {
          newlyUnlocked.push(achievement);
        }
      }
    });
    
    return newlyUnlocked;
  }

  /**
   * Get all achievements
   * @returns {Array}
   */
  function getAll() {
    return allAchievements;
  }

  /**
   * Get unlocked achievements count
   * @returns {number}
   */
  function getUnlockedCount() {
    return unlockedAchievements.length;
  }

  /**
   * Get all unlocked achievement IDs
   * @returns {Array<string>}
   */
  function getUnlockedIds() {
    return [...unlockedAchievements];
  }

  /**
   * Get achievements by category
   * @param {string} category - Category filter
   * @returns {Array}
   */
  function getByCategory(category) {
    return allAchievements.filter(a => a.category === category);
  }

  /**
   * Set callback for when achievement is unlocked
   * @param {Function} callback - Function to call with achievement object
   */
  function onUnlocked(callback) {
    onAchievementUnlocked = callback;
  }

  /**
   * Show achievement notification popup
   * @param {Object} achievement - Achievement object
   */
  function showNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-text">
          <strong>🏆 Achievement Unlocked!</strong>
          <p>${achievement.title}</p>
          <small>${achievement.description}</small>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  /**
   * Reset all achievements (for testing)
   */
  function reset() {
    unlockedAchievements = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  // Public API
  return {
    init,
    getAll,
    isUnlocked,
    unlock,
    checkAll,
    getUnlockedCount,
    getUnlockedIds,
    getByCategory,
    onUnlocked,
    showNotification,
    reset
  };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AchievementsModule;
}
