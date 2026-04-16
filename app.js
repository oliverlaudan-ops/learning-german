/**
 * German Learning Portal - Main Application JavaScript
 * Handles navigation, theme toggle, progress tracking, quiz system, achievements, and more
 */

// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const themeToggleIcon = themeToggle?.querySelector('.theme-toggle-icon');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// ===== Theme Management =====
const THEME_KEY = 'german-portal-theme';
const PROGRESS_KEY = 'german-portal-progress';
const QUIZ_HISTORY_KEY = 'german-portal-quiz-history';
const ACHIEVEMENTS_KEY = 'german-portal-achievements';
const STREAK_KEY = 'german-portal-streak';

/**
 * Initialize theme based on user preference or system setting
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleIcon) {
      themeToggleIcon.textContent = '☀️';
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleIcon) {
      themeToggleIcon.textContent = '🌙';
    }
  }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  
  if (themeToggleIcon) {
    themeToggleIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  }
}

// ===== Mobile Menu =====
function toggleMenu() {
  if (mainNav) {
    mainNav.classList.toggle('active');
    const menuIcon = menuToggle?.querySelector('.menu-toggle-icon');
    if (menuIcon) {
      menuIcon.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    }
  }
}

function closeMenuOnOutsideClick(event) {
  if (mainNav && mainNav.classList.contains('active')) {
    if (!mainNav.contains(event.target) && !menuToggle?.contains(event.target)) {
      mainNav.classList.remove('active');
      const menuIcon = menuToggle?.querySelector('.menu-toggle-icon');
      if (menuIcon) {
        menuIcon.textContent = '☰';
      }
    }
  }
}

// ===== Progress & Streak Tracking =====
function getProgress() {
  const saved = localStorage.getItem(PROGRESS_KEY);
  return saved ? JSON.parse(saved) : {
    totalWordsLearned: 0,
    wordsByLevel: { A1: 0, A2: 0, B1: 0, B2: 0 },
    currentStreak: 0,
    longestStreak: 0,
    totalQuizCount: 0,
    averageAccuracy: 0,
    lastActive: Date.now(),
    dailyGoal: 10,
    todayLearned: 0
  };
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  updateProgressDisplays();
}

function updateStreak() {
  const today = new Date().toDateString();
  const progress = getProgress();
  const lastActive = new Date(progress.lastActive).toDateString();
  
  if (today !== lastActive) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastActive === yesterday) {
      progress.currentStreak++;
    } else {
      progress.currentStreak = 1;
    }
    progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
    progress.todayLearned = 0;
    progress.lastActive = Date.now();
    saveProgress(progress);
  }
  
  return progress.currentStreak;
}

function markWordLearned(wordId, wordLevel) {
  const progress = getProgress();
  const learnedWords = JSON.parse(localStorage.getItem('german-portal-learned-words') || '[]');
  
  if (!learnedWords.includes(wordId)) {
    learnedWords.push(wordId);
    localStorage.setItem('german-portal-learned-words', JSON.stringify(learnedWords));
    
    progress.totalWordsLearned = learnedWords.length;
    if (wordLevel && progress.wordsByLevel[wordLevel] !== undefined) {
      progress.wordsByLevel[wordLevel]++;
    }
    progress.todayLearned++;
    
    saveProgress(progress);
    checkAchievements();
    return true;
  }
  return false;
}

function saveQuizResult(result) {
  const history = JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY) || '[]');
  history.push(result);
  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
  
  const progress = getProgress();
  progress.totalQuizCount++;
  
  // Update average accuracy
  const totalAccuracy = history.reduce((sum, q) => sum + q.accuracy, 0);
  progress.averageAccuracy = totalAccuracy / history.length;
  
  saveProgress(progress);
  checkAchievements();
}

// ===== Achievements System Integration =====
/**
 * Check achievements using AchievementsModule
 * Called after progress updates (word learned, quiz completed)
 */
function checkAchievements() {
  const progress = getProgress();
  const quizHistory = JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY) || '[]');
  
  // Build check data with all required fields
  const checkData = {
    ...progress,
    quizHistory,
    currentStreak: progress.currentStreak
  };
  
  // Use AchievementsModule to check and unlock
  const newlyUnlocked = AchievementsModule.checkAll(checkData);
  
  // Show notifications for newly unlocked achievements
  newlyUnlocked.forEach(ach => {
    AchievementsModule.showNotification(ach);
  });
  
  return newlyUnlocked;
}

/**
 * Get all unlocked achievements for display
 */
function getUnlockedAchievements() {
  const allAchievements = AchievementsModule.getAll();
  const unlockedIds = AchievementsModule.getUnlockedIds();
  return allAchievements.filter(ach => unlockedIds.includes(ach.id));
}

/**
 * Setup achievement unlock callback for real-time updates
 */
function initAchievementCallbacks() {
  AchievementsModule.onUnlocked((achievementId) => {
    const allAchievements = AchievementsModule.getAll();
    const achievement = allAchievements.find(a => a.id === achievementId);
    if (achievement) {
      console.log('🏆 Achievement unlocked:', achievement.title);
    }
  });
}

// ===== Audio Pronunciation =====
function speakWord(text) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    const voices = speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang.startsWith('de'));
    if (germanVoice) utterance.voice = germanVoice;
    
    speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

// ===== Quiz System =====
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizCorrect = 0;
let quizStartTime = 0;

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

function startQuiz(category = null, count = 10) {
  const words = category 
    ? vocabulary.filter(w => w.category === category)
    : vocabulary;
  
  currentQuiz = generateQuiz(words, count);
  currentQuestionIndex = 0;
  quizCorrect = 0;
  quizStartTime = Date.now();
  
  const overlay = document.getElementById('quiz-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    showQuestion();
  }
}

function showQuestion() {
  const question = currentQuiz[currentQuestionIndex];
  const content = document.getElementById('quiz-content');
  const progressEl = document.querySelector('.quiz-progress');
  
  if (!content || !question) return;
  if (progressEl) progressEl.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`;
  
  if (question.type === 'multiple-choice' && question.options) {
    content.innerHTML = `
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${question.word.german.replace(/'/g, "\\'")}')" title="Listen">🔊</button>
        <p class="question-word">${question.word.translation}</p>
        ${question.word.article ? `<p class="question-article">${question.word.article}</p>` : ''}
        <div class="options">
          ${question.options.map(opt => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
        </div>
      </div>
    `;
    
    content.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const answer = e.target.dataset.answer;
        checkAnswer(answer || '');
      });
    });
  } else {
    content.innerHTML = `
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${question.word.german.replace(/'/g, "\\'")}')" title="Listen">🔊</button>
        <p class="question-word">${question.word.translation}</p>
        ${question.word.article ? `<p class="question-article">${question.word.article}</p>` : ''}
        <input type="text" class="write-answer" placeholder="Type your answer..." />
        <button class="btn btn-primary submit-answer">Check Answer</button>
      </div>
    `;
    
    const input = content.querySelector('.write-answer');
    const submit = content.querySelector('.submit-answer');
    
    submit?.addEventListener('click', () => checkAnswer(input.value.trim()));
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkAnswer(input.value.trim());
    });
  }
}

function checkAnswer(answer) {
  const question = currentQuiz[currentQuestionIndex];
  const correct = answer.toLowerCase() === question.correctAnswer.toLowerCase();
  
  if (correct) {
    quizCorrect++;
    markWordLearned(question.word.id, question.word.level);
  }
  
  const content = document.getElementById('quiz-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Correct!' : `The correct answer was: ${question.correctAnswer}`}</p>
      <button class="speak-btn" onclick="speakWord('${question.correctAnswer.replace(/'/g, "\\'")}')" title="Listen">🔊 ${question.correctAnswer}</button>
      <button class="btn btn-primary next-question">Next</button>
    </div>
  `;
  
  content.querySelector('.next-question')?.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= currentQuiz.length) {
      finishQuiz();
    } else {
      showQuestion();
    }
  });
}

function finishQuiz() {
  const timeSpent = Math.round((Date.now() - quizStartTime) / 1000);
  const accuracy = (quizCorrect / currentQuiz.length) * 100;
  
  const result = {
    category: 'vocabulary',
    correct: quizCorrect,
    total: currentQuiz.length,
    accuracy,
    timeSpent,
    completedAt: Date.now()
  };
  
  saveQuizResult(result);
  
  const content = document.getElementById('quiz-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="quiz-results">
      <h2>Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${quizCorrect}/${currentQuiz.length}</span>
          <span class="result-label">Correct Answers</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(accuracy)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
        <div class="result-item">
          <span class="result-value">${timeSpent}s</span>
          <span class="result-label">Time</span>
        </div>
      </div>
      <button class="btn btn-primary" onclick="closeQuiz()">Continue Learning</button>
    </div>
  `;
}

function closeQuiz() {
  const overlay = document.getElementById('quiz-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// ===== Grammar Quiz =====
let currentGrammarQuiz = [];
let grammarQuestionIndex = 0;
let grammarCorrect = 0;

function startGrammarQuiz(category = null, count = 10) {
  const exercises = category 
    ? grammarExercises.filter(ex => ex.category === category)
    : grammarExercises;
  
  currentGrammarQuiz = [...exercises].sort(() => Math.random() - 0.5).slice(0, Math.min(count, exercises.length));
  grammarQuestionIndex = 0;
  grammarCorrect = 0;
  
  const overlay = document.getElementById('grammar-quiz-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    showGrammarQuestion();
  }
}

function showGrammarQuestion() {
  const exercise = currentGrammarQuiz[grammarQuestionIndex];
  const content = document.getElementById('grammar-quiz-content');
  const progressEl = document.querySelector('.grammar-quiz-progress');
  
  if (!content || !exercise) return;
  if (progressEl) progressEl.textContent = `Question ${grammarQuestionIndex + 1}/${currentGrammarQuiz.length}`;
  
  content.innerHTML = `
    <div class="question">
      <p class="question-word">${exercise.question}</p>
      <div class="options">
        ${exercise.options.map(opt => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
      </div>
    </div>
  `;
  
  content.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      checkGrammarAnswer(e.target.dataset.answer || '');
    });
  });
}

function checkGrammarAnswer(answer) {
  const exercise = currentGrammarQuiz[grammarQuestionIndex];
  const correct = answer === exercise.correctAnswer;
  
  if (correct) grammarCorrect++;
  
  const content = document.getElementById('grammar-quiz-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Correct!' : `The correct answer was: ${exercise.correctAnswer}`}</p>
      <p class="feedback-explanation">${exercise.explanation}</p>
      <button class="btn btn-primary next-question">Next</button>
    </div>
  `;
  
  content.querySelector('.next-question')?.addEventListener('click', () => {
    grammarQuestionIndex++;
    if (grammarQuestionIndex >= currentGrammarQuiz.length) {
      finishGrammarQuiz();
    } else {
      showGrammarQuestion();
    }
  });
}

function finishGrammarQuiz() {
  const accuracy = (grammarCorrect / currentGrammarQuiz.length) * 100;
  
  const result = {
    category: 'grammar',
    correct: grammarCorrect,
    total: currentGrammarQuiz.length,
    accuracy,
    timeSpent: 0,
    completedAt: Date.now()
  };
  
  saveQuizResult(result);
  
  // Track grammar exercise progress by category
  const categoriesAttempted = new Set(currentGrammarQuiz.map(ex => ex.category));
  const grammarProgress = JSON.parse(localStorage.getItem('german-portal-grammar-progress') || '{}');
  
  categoriesAttempted.forEach(cat => {
    if (!grammarProgress[cat]) {
      grammarProgress[cat] = { correct: 0, total: 0, exercises: {} };
    }
    
    currentGrammarQuiz.filter(ex => ex.category === cat).forEach(ex => {
      grammarProgress[cat].total++;
      if (!grammarProgress[cat].exercises[ex.id]) {
        grammarProgress[cat].exercises[ex.id] = { attempts: 0, correct: 0 };
      }
    });
  });
  
  // Update per-exercise stats
  currentGrammarQuiz.forEach((ex, idx) => {
    const wasCorrect = idx < grammarCorrect; // Simplified - assumes first N are correct
    grammarProgress[ex.category].exercises[ex.id].attempts++;
    if (wasCorrect) {
      grammarProgress[ex.category].exercises[ex.id].correct++;
      grammarProgress[ex.category].correct++;
    }
  });
  
  localStorage.setItem('german-portal-grammar-progress', JSON.stringify(grammarProgress));
  
  const content = document.getElementById('grammar-quiz-content');
  if (!content) return;
  
  content.innerHTML = `
    <div class="quiz-results">
      <h2>Grammar Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${grammarCorrect}/${currentGrammarQuiz.length}</span>
          <span class="result-label">Correct Answers</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(accuracy)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
      </div>
      <button class="btn btn-primary" onclick="closeGrammarQuiz()">Continue Learning</button>
    </div>
  `;
}

function closeGrammarQuiz() {
  const overlay = document.getElementById('grammar-quiz-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// ===== Progress Display Updates =====
function updateProgressDisplays() {
  const progress = getProgress();
  
  // Update progress bars on index.html
  ['grammatik', 'vokabeln', 'aussprache', 'alltag'].forEach(section => {
    const progressBar = document.getElementById(`progress-${section}`);
    const progressText = document.getElementById(`text-${section}`);
    
    if (progressBar && progressText) {
      const sectionProgress = progress[section] || { completed: 0, total: 10 };
      const percentage = Math.round((sectionProgress.completed / sectionProgress.total) * 100);
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `${percentage}% complete`;
    }
  });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== Active Navigation =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== Breadcrumb =====
function generateBreadcrumb(currentPage, pageTitle) {
  const breadcrumb = document.getElementById('breadcrumb');
  if (!breadcrumb) return;
  
  const pageNames = {
    'index.html': 'Home',
    'grammatik.html': 'Grammatik',
    'vokabeln.html': 'Vokabeln',
    'aussprache.html': 'Aussprache',
    'alltag.html': 'Alltag',
    'stats.html': 'Statistics'
  };
  
  breadcrumb.innerHTML = `
    <a href="index.html" class="breadcrumb-link">Home</a>
    <span class="breadcrumb-separator">/</span>
    <span>${pageNames[currentPage] || pageTitle}</span>
  `;
}

// ===== Utility =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== Event Listeners =====
function initEventListeners() {
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  document.addEventListener('click', closeMenuOnOutsideClick);
  
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768 && mainNav) {
      mainNav.classList.remove('active');
      const menuIcon = menuToggle?.querySelector('.menu-toggle-icon');
      if (menuIcon) {
        menuIcon.textContent = '☰';
      }
    }
  }, 250));
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav?.classList.contains('active')) {
      toggleMenu();
    }
  });
}

// ===== Initialization =====
function init() {
  initTheme();
  initEventListeners();
  initSmoothScrolling();
  setActiveNav();
  updateStreak();
  updateProgressDisplays();
  
  // Initialize achievements system
  const achievements = AchievementsModule.init();
  initAchievementCallbacks();
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage !== 'index.html') {
    generateBreadcrumb(currentPage, document.title);
  }
  
  // Load voices for speech synthesis
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
  }
  
  console.log('🇩🇪 German Learning Portal initialized');
  console.log('🏆 Achievements system loaded with', achievements.length, 'achievements');
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for global access
window.speakWord = speakWord;
window.startQuiz = startQuiz;
window.closeQuiz = closeQuiz;
window.startGrammarQuiz = startGrammarQuiz;
window.closeGrammarQuiz = closeGrammarQuiz;
window.markComplete = function(section, topic) {
  const progress = getProgress();
  if (!progress[section]) progress[section] = { completed: 0, total: 10 };
  if (!progress[section].completedTopics) progress[section].completedTopics = [];
  
  if (!progress[section].completedTopics.includes(topic)) {
    progress[section].completedTopics.push(topic);
    progress[section].completed = progress[section].completedTopics.length;
    saveProgress(progress);
    
    const percentage = Math.round((progress[section].completed / progress[section].total) * 100);
    const progressBar = document.getElementById(`progress-${section}`);
    const progressText = document.getElementById(`text-${section}`);
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${percentage}% complete`;
    
    if (event && event.target) {
      event.target.textContent = '✓ Completed!';
      event.target.disabled = true;
    }
  }
};
