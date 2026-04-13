import type { VocabWord, UserProgress, QuizResult } from './types'
import { vocabulary } from './data/vocabulary'
import { lessons } from './data/lessons'

const STORAGE_KEY = 'learning-german-state'

interface AppState {
  progress: UserProgress
  quizHistory: QuizResult[]
  learnedWordIds: string[]
  lastActive: number
  streak: number
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
    return JSON.parse(saved)
  }
  return {
    progress: defaultProgress,
    quizHistory: [],
    learnedWordIds: [],
    lastActive: Date.now(),
    streak: 0,
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
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

function generateQuiz(_lessonId?: string, count: number = 10): QuizQuestion[] {
  const pool = vocabulary
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count)
  
  return shuffled.map(word => {
    const isMultipleChoice = Math.random() > 0.5
    const others = vocabulary.filter(w => w.id !== word.id)
    const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.translation)
    
    return {
      word,
      type: isMultipleChoice ? 'multiple-choice' : 'write',
      options: isMultipleChoice ? [...wrong, word.translation].sort(() => Math.random() - 0.5) : undefined,
      correctAnswer: word.translation,
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
  if (progress) progress.textContent = `Frage ${currentQuestionIndex + 1}/${currentQuiz.length}`
  
  if (question.type === 'multiple-choice' && question.options) {
    content.innerHTML = `
      <div class="question">
        <p class="question-word">${question.word.german}</p>
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
        <p class="question-word">${question.word.german}</p>
        ${question.word.article ? `<p class="question-article">${question.word.article}</p>` : ''}
        <input type="text" class="write-answer" placeholder="Deine Antwort..." />
        <button class="btn primary submit-answer">Überprüfen</button>
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
  }
  
  const content = document.getElementById('quiz-content')
  if (!content) return
  
  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Richtig!' : `Falsch! Die richtige Antwort war: ${question.correctAnswer}`}</p>
      <p class="feedback-word">${question.word.german} = ${question.correctAnswer}</p>
      <button class="btn primary next-question">Weiter</button>
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
  
  const content = document.getElementById('quiz-content')
  if (!content) return
  
  content.innerHTML = `
    <div class="quiz-results">
      <h2>Quiz abgeschlossen! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${quizCorrect}/${currentQuiz.length}</span>
          <span class="result-label">Richtige Antworten</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(accuracy)}%</span>
          <span class="result-label">Genauigkeit</span>
        </div>
      </div>
      <button class="btn primary" onclick="closeQuiz()">Zurück zum Dashboard</button>
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
        <p class="subtitle">Dein Portal zum Deutschlernen</p>
      </header>
      
      <nav class="tabs">
        <button class="tab active" data-tab="dashboard">Dashboard</button>
        <button class="tab" data-tab="lessons">Lektionen</button>
        <button class="tab" data-tab="practice">Üben</button>
        <button class="tab" data-tab="stats">Statistiken</button>
      </nav>
      
      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${appState.progress.totalWordsLearned}</div>
            <div class="stat-label">Gelernte Wörter</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">🔥 ${appState.streak}</div>
            <div class="stat-label">Tage Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${appState.progress.totalQuizCount}</div>
            <div class="stat-label">Quizze absolviert</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round(appState.progress.averageAccuracy)}%</div>
            <div class="stat-label">Ø Genauigkeit</div>
          </div>
        </section>
        
        <section class="daily-goal">
          <h2>Tägliches Ziel</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p>${appState.progress.todayLearned} / ${appState.progress.dailyGoal} Wörter heute</p>
        </section>
        
        <section class="quick-actions">
          <button class="btn primary" onclick="showTab('practice')">Jetzt üben</button>
          <button class="btn secondary" onclick="showTab('lessons')">Lektionen ansehen</button>
        </section>
      </main>
      
      <main class="tab-content hidden" id="lessons-tab">
        <h2>Lektionen</h2>
        <div class="lessons-list">
          ${lessons.map(lesson => `
            <div class="lesson-card">
              <h3>${lesson.title}</h3>
              <p>${lesson.description}</p>
              <div class="lesson-meta">
                <span class="level">${lesson.level}</span>
                <span class="category">${lesson.category}</span>
              </div>
              <button class="btn start-lesson" onclick="startQuiz()">Starten</button>
            </div>
          `).join('')}
        </div>
      </main>
      
      <main class="tab-content hidden" id="practice-tab">
        <h2>Quiz-Modus</h2>
        <div class="quiz-setup">
          <label>
            <span>Lektion wählen:</span>
            <select id="quiz-lesson">
              <option value="">Alle Lektionen</option>
              ${lessons.map(l => `<option value="${l.id}">${l.title}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Anzahl Fragen:</span>
            <select id="quiz-count">
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="20">20</option>
            </select>
          </label>
          <button class="btn primary" onclick="startQuiz()">Quiz starten</button>
        </div>
      </main>
      
      <main class="tab-content hidden" id="stats-tab">
        <h2>Deine Statistiken</h2>
        <div class="stats-detail">
          <h3>Wörter nach Level</h3>
          <ul class="level-breakdown">
            ${Object.entries(appState.progress.wordsByLevel).map(([level, count]) => `
              <li><span class="level-badge">${level}</span> ${count} Wörter</li>
            `).join('')}
          </ul>
          <h3>Letzte Quizze</h3>
          <div class="quiz-history">
            ${appState.quizHistory.slice(-5).reverse().map(q => `
              <div class="quiz-result">
                <span>${new Date(q.completedAt).toLocaleDateString()}</span>
                <span>${q.correct}/${q.total} richtig</span>
                <span>${Math.round(q.accuracy)}%</span>
              </div>
            `).join('')}
            ${appState.quizHistory.length === 0 ? '<p>Noch keine Quizze absolviert.</p>' : ''}
          </div>
        </div>
      </main>
      
      <div class="quiz-overlay hidden" id="quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress">Frage 1/10</span>
            <button class="close-quiz" onclick="closeQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="quiz-content"></div>
        </div>
      </div>
    </div>
  `
  
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

export function initApp() {
  renderDashboard()
}
