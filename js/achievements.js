/**
 * Achievements System Module
 * Tracks and unlocks achievements based on user progress
 */

const AchievementsModule = (function() {
  const STORAGE_KEY = 'german-portal-achievements';
  let unlockedAchievements = [];
  let onAchievementUnlocked = null;

  /**
   * Initialize achievements system
   * @param {Array} allAchievements - All available achievements
   */
  function init(allAchievements) {
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
   * @param {Array} allAchievements - All available achievements
   * @param {Object} progress - User progress object
   * @returns {Array} Newly unlocked achievements
   */
  function checkAll(allAchievements, progress) {
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
   * Set callback for when achievement is unlocked
   * @param {Function} callback - Function to call with achievement ID
   */
  function onUnlocked(callback) {
    onAchievementUnlocked = callback;
  }

  /**
   * Show achievement notification
   * @param {Object} achievement - Achievement object
   */
  function showNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-content">
        <span class="achievement-icon">${achievement.icon}</span>
        <div class="achievement-text">
          <strong>Achievement Unlocked!</strong>
          <p>${achievement.title}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Reset all achievements (for testing)
   */
  function reset() {
    unlockedAchievements = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    init,
    isUnlocked,
    unlock,
    checkAll,
    getUnlockedCount,
    getUnlockedIds,
    onUnlocked,
    showNotification,
    reset
  };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AchievementsModule;
}
