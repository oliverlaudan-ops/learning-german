import type { VocabWord, UserProgress, QuizResult } from './types'
import { vocabulary } from './data/vocabulary'
import { lessons } from './data/lessons'
import { glossaryTerms } from './data/glossary'
import { grammarRules } from './data/grammar'
import { achievements as achievementList } from './data/achievements'

const STORAGE_KEY = 'learning-german-state'

interface AppState {
  progress: UserProgress
  quizHistory: QuizResult[]
  learnedWordIds: string[]
  lastActive: number
  streak: number
  achievements: typeof achievementList
}

const defaultProgress: UserProgress = {
  totalWordsLearned: 0,
  wordsByLevel: { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
  currentStreak: 0,
  longestStreak: 0,
  totalQuizCount: 0,
  averageAccuracy: 0,
  lastActive: Date.now(),
  dailyGoal: 10,
  todayLearned: 0,
}

function loadState(): AppState {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const parsed = JSON.parse(saved)
    return {
      ...parsed,
      achievements: achievementList.map(a => ({
        ...a,
        unlocked: parsed.achievements?.find((ach: any) => ach.id === a.id)?.unlocked || false,
        unlockedAt: parsed.achievements?.find((ach: any) => ach.id === a.id)?.unlockedAt,
      })),
    }
  }
  return {
    progress: defaultProgress,
    quizHistory: [],
    learnedWordIds: [],
    lastActive: Date.now(),
    streak: 0,
    achievements: achievementList.map(a => ({ ...a, unlocked: false })),
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  updateAchievementDisplay()
}

function checkAchievements(state: AppState) {
  let changed = false
  const checkData = { ...state.progress, quizHistory: state.quizHistory }
  state.achievements.forEach(ach => {
    if (!ach.unlocked && ach.condition(checkData)) {
      ach.unlocked = true
      ach.unlockedAt = Date.now()
      showAchievementNotification(ach)
      changed = true
    }
  })
  if (changed) saveState(state)
}

function showAchievementNotification(ach: typeof achievementList[0]) {
  const notification = document.createElement('div')
  notification.className = 'achievement-notification'
  notification.innerHTML = `
    <div class="achievement-content">
      <span class="achievement-icon">${ach.icon}</span>
      <div class="achievement-text">
        <strong>Achievement Unlocked!</strong>
        <p>${ach.title}</p>
      </div>
    </div>
  `
  document.body.appendChild(notification)
  setTimeout(() => notification.classList.add('show'), 100)
  setTimeout(() => {
    notification.classList.remove('show')
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function updateAchievementDisplay() {
  const container = document.getElementById('achievements-list')
  if (!container) return
  const state = appState
  const unlocked = state.achievements.filter(a => a.unlocked)
  const locked = state.achievements.filter(a => !a.unlocked)
  
  container.innerHTML = `
    ${unlocked.length === 0 ? '<p class="no-achievements">No achievements yet. Keep learning!</p>' : ''}
    <div class="achievements-grid">
      ${unlocked.map(ach => `
        <div class="achievement-card unlocked" title="${ach.description}\nUnlocked: ${ach.unlockedAt ? new Date(ach.unlockedAt).toLocaleDateString() : ''}">
          <span class="achievement-icon">${ach.icon}</span>
          <span class="achievement-title">${ach.title}</span>
        </div>
      `).join('')}
      ${locked.map(ach => `
        <div class="achievement-card locked" title="${ach.description}">
          <span class="achievement-icon">🔒</span>
          <span class="achievement-title">${ach.title}</span>
        </div>
      `).join('')}
    </div>
  `
}

let appState = loadState()

function markWordLearned(wordId: string, correct: boolean) {
  if (!correct) return
  if (!appState.learnedWordIds.includes(wordId)) {
    appState.learnedWordIds.push(wordId)
    const word = vocabulary.find(w => w.id === wordId)
    if (word) {
      appState.progress.totalWordsLearned = appState.learnedWordIds.length
      appState.progress.wordsByLevel[word.level] = (appState.progress.wordsByLevel[word.level] || 0) + 1
      appState.progress.todayLearned++
    }
    saveState(appState)
  }
}

interface QuizQuestion {
  word: VocabWord
  type: 'multiple-choice' | 'write'
  options?: string[]
  correctAnswer: string
}

function generateQuiz(lessonId?: string, count: number = 10): QuizQuestion[] {
  const pool = lessonId 
    ? vocabulary.filter(w => {
        const lesson = lessons.find(l => l.id === lessonId)
        return lesson?.wordIds.includes(w.id)
      })
    : vocabulary
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length))
  
  return shuffled.map(word => {
    const isMultipleChoice = Math.random() > 0.5
    const others = vocabulary.filter(w => w.id !== word.id)
    const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.german)
    
    return {
      word,
      type: isMultipleChoice ? 'multiple-choice' : 'write',
      options: isMultipleChoice ? [...wrong, word.german].sort(() => Math.random() - 0.5) : undefined,
      correctAnswer: word.german,
    }
  })
}

let currentQuiz: QuizQuestion[] = []
let currentQuestionIndex = 0
let quizCorrect = 0

function startQuiz(lessonId?: string) {
  const countSelect = document.getElementById('quiz-count') as HTMLSelectElement
  const count = parseInt(countSelect?.value || '10')
  currentQuiz = generateQuiz(lessonId, count)
  currentQuestionIndex = 0
  quizCorrect = 0
  
  document.getElementById('quiz-overlay')?.classList.remove('hidden')
  showQuestion()
}

function showQuestion() {
  const question = currentQuiz[currentQuestionIndex]
  const content = document.getElementById('quiz-content')
  const progress = document.querySelector('.quiz-progress')
  
  if (!content || !question) return
  if (progress) progress.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`
  
  if (question.type === 'multiple-choice' && question.options) {
    content.innerHTML = `
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${question.word.german.replace(/'/g, "\\'")}')" title="Listen to pronunciation">🔊</button>
        <p class="question-word">${question.word.translation}</p>
        ${question.word.article ? `<p class="question-article">${question.word.article}</p>` : ''}
        <div class="options">
          ${question.options.map(opt => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
        </div>
      </div>
    `
    content.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const answer = (e.target as HTMLElement).dataset.answer
        checkAnswer(answer || '', question)
      })
    })
  } else {
    content.innerHTML = `
      <div class="question">
        <button class="speak-btn" onclick="speakWord('${question.word.german.replace(/'/g, "\\'")}')" title="Listen to pronunciation">🔊</button>
        <p class="question-word">${question.word.translation}</p>
        ${question.word.article ? `<p class="question-article">${question.word.article}</p>` : ''}
        <input type="text" class="write-answer" placeholder="Your answer..." />
        <button class="btn primary submit-answer">Check Answer</button>
      </div>
    `
    const input = content.querySelector('.write-answer') as HTMLInputElement
    const submit = content.querySelector('.submit-answer')
    submit?.addEventListener('click', () => checkAnswer(input.value.trim(), question))
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkAnswer(input.value.trim(), question)
    })
  }
}

function checkAnswer(answer: string, question: QuizQuestion) {
  const correct = answer.toLowerCase() === question.correctAnswer.toLowerCase()
  if (correct) {
    quizCorrect++
    markWordLearned(question.word.id, true)
    checkAchievements(appState)
  }
  
  const content = document.getElementById('quiz-content')
  if (!content) return
  
  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Correct!' : `Wrong! The correct answer was: ${question.correctAnswer}`}</p>
      <button class="speak-btn speak-correct" onclick="speakWord('${question.correctAnswer.replace(/'/g, "\\'")}')" title="Listen to pronunciation">🔊 ${question.correctAnswer}</button>
      <button class="btn primary next-question">Next</button>
    </div>
  `
  
  content.querySelector('.next-question')?.addEventListener('click', () => {
    currentQuestionIndex++
    if (currentQuestionIndex >= currentQuiz.length) finishQuiz()
    else showQuestion()
  })
}

function finishQuiz() {
  const accuracy = (quizCorrect / currentQuiz.length) * 100
  appState.quizHistory.push({
    lessonId: 'general',
    correct: quizCorrect,
    total: currentQuiz.length,
    accuracy,
    completedAt: Date.now(),
    timeSpent: 0,
  })
  appState.progress.totalQuizCount++
  appState.progress.averageAccuracy = appState.quizHistory.reduce((sum, q) => sum + q.accuracy, 0) / appState.quizHistory.length
  saveState(appState)
  checkAchievements(appState)
  
  const content = document.getElementById('quiz-content')
  if (!content) return
  
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
      </div>
      <button class="btn primary" onclick="closeQuiz()">Back to Dashboard</button>
    </div>
  `
}

function closeQuiz() {
  document.getElementById('quiz-overlay')?.classList.add('hidden')
  renderDashboard()
}

function showTab(tabName: string) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach(t => t.classList.add('active'))
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'))
  document.getElementById(`${tabName}-tab`)?.classList.remove('hidden')
}

function renderDashboard() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const today = new Date().toDateString()
  const lastActive = new Date(appState.lastActive).toDateString()
  
  if (today !== lastActive) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    appState.streak = lastActive === yesterday ? appState.streak + 1 : 0
    appState.lastActive = Date.now()
    saveState(appState)
  }
  
  const progressPercent = Math.min((appState.progress.todayLearned / appState.progress.dailyGoal) * 100, 100)
  
  app.innerHTML = `
    <div class="dashboard">
      <header>
        <h1>🇩🇪 Learning German</h1>
        <p class="subtitle">Your German Learning Portal</p>
      </header>
      
      <nav class="tabs">
        <button class="tab active" data-tab="dashboard">Dashboard</button>
        <button class="tab" data-tab="lessons">Lessons</button>
        <button class="tab" data-tab="practice">Practice</button>
        <button class="tab" data-tab="stats">Stats</button>
      <button class="tab" data-tab="grammar">Grammar</button>
      <button class="tab" data-tab="glossary">Glossary</button>
      <button class="tab" data-tab="achievements">Achievements</button>
      </nav>
      
      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${appState.progress.totalWordsLearned}</div>
            <div class="stat-label">Words Learned</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${appState.streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${appState.progress.totalQuizCount}</div>
            <div class="stat-label">Quizzes Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(appState.progress.averageAccuracy)}%</div>
            <div class="stat-label">Ø Accuracy</div>
          </div>
        </section>
        
        <section class="daily-goal">
          <h2>Daily Goal</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p>${appState.progress.todayLearned} / ${appState.progress.dailyGoal} words today</p>
        </section>
        
        <section class="quick-actions">
          <button class="btn primary" onclick="showTab('practice')">Practice Now</button>
          <button class="btn secondary" onclick="showTab('lessons')">View Lessons</button>
        </section>
      </main>
      
      <main class="tab-content hidden" id="lessons-tab">
        <h2>Lessons</h2>
        <div class="lessons-list">
          ${lessons.map(lesson => `
            <div class="lesson-card">
              <h3>${lesson.title}</h3>
              <p>${lesson.description}</p>
              <div class="lesson-meta">
                <span class="level">${lesson.level}</span>
                <span class="category">${lesson.category}</span>
              </div>
              <button class="btn start-lesson" onclick="startQuiz()">Start</button>
            </div>
          `).join('')}
        </div>
      </main>
      
      <main class="tab-content hidden" id="practice-tab">
        <h2>Quiz Mode</h2>
        <div class="quiz-setup">
          <label>
            <span>Select Lesson:</span>
            <select id="quiz-lesson">
              <option value="">All Lessons</option>
              ${lessons.map(l => `<option value="${l.id}">${l.title}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Number of Questions:</span>
            <select id="quiz-count">
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="20">20</option>
            </select>
          </label>
          <button class="btn primary" onclick="startQuiz()">Start Quiz</button>
        </div>
      </main>
      
      <main class="tab-content hidden" id="stats-tab">
        <h2>Your Statistics</h2>
        <div class="stats-detail">
          <h3>Words by Level</h3>
          <ul class="level-breakdown">
            ${Object.entries(appState.progress.wordsByLevel).map(([level, count]) => `
              <li><span class="level-badge">${level}</span> ${count} words</li>
            `).join('')}
          </ul>
          <h3>Recent Quizzes</h3>
          <div class="quiz-history">
            ${appState.quizHistory.slice(-5).reverse().map(q => `
              <div class="quiz-result">
                <span>${new Date(q.completedAt).toLocaleDateString()}</span>
                <span>${q.correct}/${q.total} correct</span>
                <span>${Math.round(q.accuracy)}%</span>
              </div>
            `).join('')}
            ${appState.quizHistory.length === 0 ? '<p>No quizzes completed yet.</p>' : ''}
          </div>
        </div>
      </main>
      
      <main class="tab-content hidden" id="grammar-tab">
        <h2>Grammar Rules</h2>
        <div class="grammar-list">
          ${grammarRules.map(rule => `
            <div class="grammar-card">
              <h3>${rule.title}</h3>
              <div class="grammar-meta">
                <span class="level">${rule.level}</span>
                <span class="category">${rule.category}</span>
              </div>
              <p class="grammar-desc">${rule.description}</p>
              <div class="grammar-examples">
                <h4>Examples:</h4>
                <ul>
                  ${rule.examples.map(ex => `
                    <li>
                      <span class="german">${ex.german}</span>
                      <span class="english">${ex.english}</span>
                      ${ex.explanation ? `<span class="explanation">${ex.explanation}</span>` : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
      
      <main class="tab-content hidden" id="glossary-tab">
        <h2>Glossary</h2>
        <div class="glossary-search">
          <input type="text" id="glossary-search-input" placeholder="Search terms..." onkeyup="filterGlossary()" />
        </div>
        <div class="glossary-list" id="glossary-list">
          ${glossaryTerms.map(term => `
            <div class="glossary-card" data-term="${term.term.toLowerCase()}">
              <h3>${term.term}</h3>
              <div class="glossary-meta">
                <span class="translation">${term.translation}</span>
                <span class="level">${term.level}</span>
                <span class="category">${term.category}</span>
              </div>
              <p class="glossary-explanation">${term.explanation}</p>
              <div class="glossary-examples">
                <h4>Examples:</h4>
                <ul>
                  ${term.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
      
      <main class="tab-content hidden" id="achievements-tab">
        <h2>Achievements</h2>
        <div class="achievements-summary">
          <div class="achievement-stat">
            <span class="stat-number">${appState.achievements.filter(a => a.unlocked).length}</span>
            <span class="stat-label">Unlocked</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">${appState.achievements.length}</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
        <div class="achievements-list" id="achievements-list"></div>
      </main>
      
      <div class="quiz-overlay hidden" id="quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress">Question 1/10</span>
            <button class="close-quiz" onclick="closeQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="quiz-content"></div>
        </div>
      </div>
    </div>
  `
  
  
  // Initialize achievements display
  updateAchievementDisplay()
  
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).dataset.tab
      if (target) showTab(target)
    })
  })
}

// @ts-ignore - called from HTML onclick
window.startQuiz = startQuiz
// @ts-ignore - called from HTML onclick
window.closeQuiz = closeQuiz
// @ts-ignore - called from HTML onclick
window.showTab = showTab

// @ts-ignore - called from HTML onclick
window.speakWord = speakWord

function speakWord(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.8
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  } else {
    alert('Speech synthesis not supported in this browser.')
  }
}

// @ts-ignore - called from HTML onclick
window.filterGlossary = filterGlossary

function filterGlossary() {
  const input = document.getElementById('glossary-search-input') as HTMLInputElement
  const filter = input.value.toLowerCase()
  const cards = document.querySelectorAll('.glossary-card')
  cards.forEach(card => {
    const term = card.getAttribute('data-term') || ''
    card.classList.toggle('hidden', !term.includes(filter))
  })
}

export function initApp() {
  renderDashboard()
}
