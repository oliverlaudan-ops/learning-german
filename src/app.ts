import type {
  CEFRLevel,
  VocabWord,
  UserProgress,
  Level,
  LevelProgress,
  AppState,
  ProfileState,
  QuizMode,
} from './types'
import { vocabulary } from './data/vocabulary'
import { lessons, getLevels } from './data/lessons'
import { grammarExercises } from './data/grammar-exercises'

// --- Constants ---
const STORAGE_KEY = 'learning-german-v3-state'
const LEGACY_STORAGE_KEY = 'learning-german-v2-state'
const SRS_INTERVALS = [
  0, // Box 0 (unused)
  24 * 60 * 60 * 1000, // Box 1: 1 day
  3 * 24 * 60 * 60 * 1000, // Box 2: 3 days
  7 * 24 * 60 * 60 * 1000, // Box 3: 7 days
  14 * 24 * 60 * 60 * 1000, // Box 4: 14 days
  30 * 24 * 60 * 60 * 1000, // Box 5: 30 days
]

// --- Initialization ---
const levels: Level[] = getLevels()

const defaultProgress: UserProgress = {
  totalWordsLearned: 0,
  wordsByLevel: { A1: 0, A2: 0, B1: 0, B2: 0 },
  currentStreak: 0,
  longestStreak: 0,
  totalQuizCount: 0,
  averageAccuracy: 0,
  lastActive: Date.now(),
  dailyGoal: 10,
  todayLearned: 0,
}

function createEmptyProfile(id: string, name: string): ProfileState {
  return {
    id,
    displayName: name,
    createdAt: Date.now(),
    l1: 'en',
    progress: { ...defaultProgress },
    levels: initialLevels(),
    quizHistory: [],
    learnedWordIds: [],
    srsState: {},
    categoryStats: {},
  }
}

function initialLevels(): Record<CEFRLevel, LevelProgress> {
  const out: Partial<Record<CEFRLevel, LevelProgress>> = {}
  for (const level of levels) {
    out[level.id] = {
      levelId: level.id,
      chapters: Object.fromEntries(
        level.chapters.map((ch) => [
          ch.id,
          {
            chapterId: ch.id,
            levelId: ch.level,
            wordsLearned: 0,
            learnedWordIds: [],
            percent: 0,
          },
        ]),
      ),
      completedChapters: [],
      totalWordsLearned: 0,
      percent: 0,
      started: false,
    }
  }
  return out as Record<CEFRLevel, LevelProgress>
}

// --- Persistence & Migration ---

function loadState(): AppState {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      /* ignore and fall back */
    }
  }

  // Try migrate from v2
  const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY)
  if (legacySaved) {
    try {
      const parsed = JSON.parse(legacySaved)
      const defaultProfile = createEmptyProfile('oliver', 'Oliver')
      defaultProfile.progress = parsed.progress || defaultProfile.progress
      defaultProfile.levels = parsed.levels || defaultProfile.levels
      defaultProfile.quizHistory = parsed.quizHistory || defaultProfile.quizHistory
      defaultProfile.learnedWordIds = parsed.learnedWordIds || defaultProfile.learnedWordIds
      defaultProfile.srsState = parsed.srsState || defaultProfile.srsState
      defaultProfile.categoryStats = parsed.categoryStats || defaultProfile.categoryStats

      const state: AppState = {
        profiles: { oliver: defaultProfile },
        currentProfileId: 'oliver',
      }
      saveState(state)
      return state
    } catch {
      /* ignore and fall back */
    }
  }

  // Fresh start
  const firstProfile = createEmptyProfile('oliver', 'Oliver')
  return {
    profiles: { oliver: firstProfile },
    currentProfileId: 'oliver',
  }
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

let appState = loadState()
function getProfile() {
  return appState.profiles[appState.currentProfileId]
}

// --- SRS Logic ---

function updateSrs(wordId: string, correct: boolean) {
  const profile = getProfile()
  if (!profile.srsState[wordId]) {
    profile.srsState[wordId] = {
      box: 1,
      nextReviewAt: 0,
      lastReviewedAt: 0,
      correctCount: 0,
      wrongCount: 0,
    }
  }

  const entry = profile.srsState[wordId]
  entry.lastReviewedAt = Date.now()

  if (correct) {
    entry.correctCount++
    if (entry.box < 5) entry.box++
    entry.nextReviewAt = Date.now() + SRS_INTERVALS[entry.box]
  } else {
    entry.wrongCount++
    entry.box = 1
    entry.nextReviewAt = Date.now() + SRS_INTERVALS[1] // Review tomorrow
  }
}

function getDueSrsWords(): VocabWord[] {
  const profile = getProfile()
  const now = Date.now()
  return vocabulary.filter((w) => {
    const srs = profile.srsState[w.id]
    return srs && srs.nextReviewAt <= now
  })
}

// --- Quiz Engine ---

interface QuizQuestion {
  word: VocabWord
  type: 'multiple-choice' | 'write'
  mode: QuizMode
  options?: string[]
  correctAnswer: string
  prompt: string
  contextSentence?: string
}

let currentQuiz: QuizQuestion[] = []
let currentQuestionIndex = 0
let quizCorrect = 0
let currentQuizChapterId: string | undefined
let currentQuizLevelId: CEFRLevel | undefined
let currentQuizMode: QuizMode = 'de-en'
let isReviewMode = false

// Grammar Quiz State
let currentGrammarQuiz: typeof grammarExercises = []
let grammarQuestionIndex = 0
let grammarCorrect = 0

function generateQuiz(options: {
  chapterId?: string
  levelId?: CEFRLevel
  count: number
  mode: QuizMode
  isReview?: boolean
}): QuizQuestion[] {
  let pool = vocabulary
  if (options.isReview) {
    pool = getDueSrsWords()
  } else if (options.chapterId) {
    pool = vocabulary.filter((w) => {
      const ch = lessons.find((l) => l.id === options.chapterId)
      return ch?.wordIds.includes(w.id)
    })
  } else if (options.levelId) {
    pool = vocabulary.filter((w) => w.level === options.levelId)
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, options.count)

  return shuffled.map((word) => {
    const isMultipleChoice = options.mode === 'de-en' || options.mode === 'en-de' || options.mode === 'sentence-completion'

    let correctAnswer = ''
    let contextSentence = ''

    switch (options.mode) {
      case 'de-en':
        correctAnswer = word.german
        break
      case 'en-de':
        correctAnswer = word.translation
        break
      case 'audio-dictation':
        correctAnswer = word.german
        break
      case 'sentence-completion':
        if (word.example) {
          // Use word boundaries so we don't accidentally replace parts of compound words
          // (e.g. 'Wohnung' in 'Wohnungen'). Also handle leading article if present.
          const escapedGerman = word.german.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const re = new RegExp(`\\b${escapedGerman}\\b`, 'gi')
          contextSentence = word.example.replace(re, '___')
        }
        correctAnswer = word.german
        break
      case 'type-sentence':
        if (word.example) {
          const escapedGerman = word.german.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const re = new RegExp(`\\b${escapedGerman}\\b`, 'gi')
          contextSentence = word.example.replace(re, '___')
        }
        correctAnswer = word.german
        break
    }

    const others = vocabulary.filter((w) => w.id !== word.id)
    const wrong = others
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => (options.mode === 'en-de' ? w.translation : w.german))

    return {
      word,
      type: isMultipleChoice ? 'multiple-choice' : 'write',
      mode: options.mode,
      options: isMultipleChoice ? [...wrong, correctAnswer].sort(() => Math.random() - 0.5) : undefined,
      correctAnswer,
      prompt: '',
      contextSentence,
    }
  })
}

function startQuiz(chapterId?: string, mode: QuizMode = 'de-en', isReview = false) {
  const countSelect = document.getElementById('quiz-count') as HTMLSelectElement
  const count = isReview ? 100 : parseInt(countSelect?.value || '10')

  currentQuiz = generateQuiz({ chapterId, count, mode, isReview })
  if (currentQuiz.length === 0) {
    if (isReview) alert('No words due for review right now! Great job.')
    return
  }

  currentQuestionIndex = 0
  quizCorrect = 0
  currentQuizChapterId = chapterId
  currentQuizMode = mode
  isReviewMode = isReview

  document.getElementById('quiz-overlay')?.classList.remove('hidden')
  showQuestion()
}

function showQuestion() {
  const question = currentQuiz[currentQuestionIndex]
  const content = document.getElementById('quiz-content')
  const progress = document.querySelector('.quiz-progress')

  if (!content || !question) return
  if (progress) progress.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`

  const isAudioMode = question.mode === 'audio-dictation'
  if (isAudioMode) speakWord(question.word.german)

  // Determine what to show as the main question (what the user must answer).
  // The main text must NEVER be the correct answer — that would be cheating.
  let mainText = ''
  let subtitle = ''
  switch (question.mode) {
    case 'de-en':
      subtitle = 'What is the German word?'
      mainText = question.word.translation
      break
    case 'en-de':
      subtitle = 'What does it mean in English?'
      mainText = question.word.german
      break
    case 'audio-dictation':
      subtitle = 'Listen and type the German word'
      mainText = '🎧 ???'
      break
    case 'sentence-completion':
      subtitle = 'Complete the sentence'
      mainText = question.contextSentence || question.word.translation
      break
    case 'type-sentence':
      subtitle = 'Type the missing word'
      mainText = question.contextSentence || question.word.translation
      break
  }

  content.innerHTML = `
    <div class="question">
      <button class="speak-btn" onclick="window.speakWord('${question.word.german.replace(/'/g, "\\'")}')" title="Listen">🔊</button>
      <p class="subtitle">${subtitle}</p>
      <p class="question-word">${mainText}</p>
      
      ${
        question.type === 'multiple-choice'
          ? `
        <div class="options">
          ${question.options?.map((opt) => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
        </div>
      `
          : `
        <input type="text" class="write-answer" placeholder="Your answer..." autocomplete="off" />
        <button class="btn primary submit-answer">Check Answer</button>
      `
      }
    </div>
  `

  if (question.type === 'multiple-choice') {
    content.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const answer = (e.target as HTMLElement).dataset.answer
        checkAnswer(answer || '', question)
      })
    })
  } else {
    const input = content.querySelector('.write-answer') as HTMLInputElement
    const submit = content.querySelector('.submit-answer')
    input.focus()
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
    if (isReviewMode) {
      updateSrs(question.word.id, true)
    } else {
      markWordLearned(question.word.id, true, currentQuizChapterId)
    }
  } else if (isReviewMode) {
    updateSrs(question.word.id, false)
  }

  // Update Category Stats
  const profile = getProfile()
  const cat = question.word.category
  if (!profile.categoryStats[cat]) profile.categoryStats[cat] = { correct: 0, total: 0 }
  profile.categoryStats[cat].total++
  if (correct) profile.categoryStats[cat].correct++

  const content = document.getElementById('quiz-content')
  if (!content) return

  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Correct!' : `Wrong! The correct answer was: ${question.correctAnswer}`}</p>
      <div class="word-details">
        <p><strong>${question.word.german}</strong> = ${question.word.translation}</p>
        ${question.word.example ? `<p class="example-sentence">${question.word.example}<span class="example-translation">${question.word.exampleTranslation || ''}</span></p>` : ''}
      </div>
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
  const profile = getProfile()

  profile.quizHistory.push({
    chapterId: currentQuizChapterId || 'general',
    levelId: currentQuizLevelId || 'A1',
    correct: quizCorrect,
    total: currentQuiz.length,
    accuracy,
    completedAt: Date.now(),
    timeSpent: 0,
    mode: currentQuizMode,
  })

  profile.progress.totalQuizCount++
  profile.progress.averageAccuracy =
    profile.quizHistory.reduce((sum, q) => sum + q.accuracy, 0) / profile.quizHistory.length

  saveState(appState)
  checkAchievements()

  const content = document.getElementById('quiz-content')
  if (!content) return

  content.innerHTML = `
    <div class="quiz-results">
      <h2>${isReviewMode ? 'Review Finished!' : 'Quiz Complete!'} 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${quizCorrect}/${currentQuiz.length}</span>
          <span class="result-label">Correct</span>
        </div>
        <div class="result-item">
          <span class="result-value">${Math.round(accuracy)}%</span>
          <span class="result-label">Accuracy</span>
        </div>
      </div>
      <button class="btn primary" onclick="closeQuiz()">Done</button>
    </div>
  `
}

function finishGrammarQuiz() {
  const accuracy = (grammarCorrect / currentGrammarQuiz.length) * 100

  const content = document.getElementById('grammar-quiz-content')
  if (!content) return

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
      <button class="btn primary" onclick="window.closeGrammarQuiz()">Back to Practice</button>
    </div>
  `
}

function closeQuiz() {
  document.getElementById('quiz-overlay')?.classList.add('hidden')
  renderDashboard()
}

// --- Grammar Quiz logic ---

function startGrammarQuiz() {
  const categorySelect = document.getElementById('grammar-category') as HTMLSelectElement
  const countSelect = document.getElementById('grammar-count') as HTMLSelectElement
  const category = categorySelect?.value || ''
  const count = parseInt(countSelect?.value || '10')

  const pool = category ? grammarExercises.filter((ex) => ex.category === category) : grammarExercises

  currentGrammarQuiz = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length))
  grammarQuestionIndex = 0
  grammarCorrect = 0

  document.getElementById('grammar-quiz-overlay')?.classList.remove('hidden')
  showGrammarQuestion()
}

function showGrammarQuestion() {
  const exercise = currentGrammarQuiz[grammarQuestionIndex]
  const content = document.getElementById('grammar-quiz-content')
  const progress = document.querySelector('.grammar-quiz-progress')

  if (!content || !exercise) return
  if (progress) progress.textContent = `Question ${grammarQuestionIndex + 1}/${currentGrammarQuiz.length}`

  content.innerHTML = `
    <div class="question">
      <p class="question-word">${exercise.question}</p>
      <div class="options">
        ${exercise.options.map((opt) => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
      </div>
    </div>
  `

  content.querySelectorAll('.option-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const answer = (e.target as HTMLElement).dataset.answer
      checkGrammarAnswer(answer || '', exercise)
    })
  })
}

function checkGrammarAnswer(answer: string, exercise: (typeof grammarExercises)[0]) {
  const correct = answer === exercise.correctAnswer
  if (correct) grammarCorrect++

  const content = document.getElementById('grammar-quiz-content')
  if (!content) return

  content.innerHTML = `
    <div class="feedback ${correct ? 'correct' : 'incorrect'}">
      <p class="feedback-icon">${correct ? '✅' : '❌'}</p>
      <p class="feedback-text">${correct ? 'Correct!' : `Wrong! The correct answer was: ${exercise.correctAnswer}`}</p>
      <p class="feedback-explanation">${exercise.explanation}</p>
      <button class="btn primary next-question">Next</button>
    </div>
  `

  content.querySelector('.next-question')?.addEventListener('click', () => {
    grammarQuestionIndex++
    if (grammarQuestionIndex >= currentGrammarQuiz.length) finishGrammarQuiz()
    else showGrammarQuestion()
  })
}

function closeGrammarQuiz() {
  document.getElementById('grammar-quiz-overlay')?.classList.add('hidden')
}

// --- Profile & Progress Management ---

function switchProfile(id: string) {
  if (id === 'new') {
    const name = prompt('Enter name for the new profile:')
    if (!name) return
    const newId = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    appState.profiles[newId] = createEmptyProfile(newId, name)
    appState.currentProfileId = newId
  } else if (appState.profiles[id]) {
    appState.currentProfileId = id
  }
  saveState(appState)
  renderDashboard()
}

function markWordLearned(wordId: string, correct: boolean, chapterId?: string) {
  if (!correct) return
  const profile = getProfile()
  if (profile.learnedWordIds.includes(wordId)) return

  const word = vocabulary.find((w) => w.id === wordId)
  if (!word) return

  profile.learnedWordIds.push(wordId)
  profile.progress.totalWordsLearned = profile.learnedWordIds.length

  const levelId = (word.level as CEFRLevel) || 'A1'
  profile.progress.wordsByLevel[levelId] = (profile.progress.wordsByLevel[levelId] || 0) + 1
  profile.progress.todayLearned++

  const lp = profile.levels[levelId]
  if (lp) {
    lp.started = true
    const chId = chapterId || lessons.find((l) => l.wordIds.includes(wordId))?.id
    if (chId && lp.chapters[chId]) {
      const cp = lp.chapters[chId]
      if (!cp.learnedWordIds.includes(wordId)) cp.learnedWordIds.push(wordId)
    }
    recalcLevelProgress(lp)
  }

  // Also initialize SRS for this word
  if (!profile.srsState[wordId]) {
    profile.srsState[wordId] = {
      box: 1,
      nextReviewAt: Date.now() + SRS_INTERVALS[1],
      lastReviewedAt: 0,
      correctCount: 1,
      wrongCount: 0,
    }
  }

  saveState(appState)
}

function recalcLevelProgress(lp: LevelProgress) {
  const levelData = levels.find((l) => l.id === lp.levelId)
  if (!levelData) return

  let totalWords = 0
  let learned = 0
  lp.completedChapters = []

  for (const ch of levelData.chapters) {
    const cp = lp.chapters[ch.id]
    cp.wordsLearned = cp.learnedWordIds.length
    cp.percent = Math.round((cp.learnedWordIds.length / ch.wordIds.length) * 100)
    totalWords += ch.wordIds.length
    learned += cp.learnedWordIds.length
    if (cp.percent >= 100) lp.completedChapters.push(ch.id)
  }

  lp.totalWordsLearned = learned
  lp.percent = totalWords === 0 ? 0 : Math.round((learned / totalWords) * 100)
}

function checkAchievements() {
  saveState(appState)
}

// --- Rendering ---

function renderHeader() {
  return `
    <header>
      <div class="header-top">
        <div class="profile-selector">
          <select class="profile-select" onchange="window.switchProfile(this.value)">
            ${Object.values(appState.profiles)
              .map((p) => `<option value="${p.id}" ${p.id === appState.currentProfileId ? 'selected' : ''}>👤 ${p.displayName}</option>`)
              .join('')}
            <option value="new">+ New Profile</option>
          </select>
        </div>
        <div class="streak-badge">🔥 ${getProfile().progress.currentStreak}</div>
      </div>
      <h1>🇩🇪 Deutsch Lernen</h1>
      <p class="subtitle">Platform for Oliver & Friend</p>
    </header>
  `
}

function renderDashboard() {
  const app = document.querySelector<HTMLDivElement>('#app')!
  const profile = getProfile()
  const today = new Date().toDateString()
  const lastActive = new Date(profile.progress.lastActive).toDateString()

  if (today !== lastActive) {
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    profile.progress.currentStreak = lastActive === yesterday ? profile.progress.currentStreak + 1 : 0
    profile.progress.lastActive = Date.now()
    profile.progress.todayLearned = 0
    saveState(appState)
  }

  const dueCount = getDueSrsWords().length
  const progressPercent = Math.min((profile.progress.todayLearned / profile.progress.dailyGoal) * 100, 100)

  app.innerHTML = `
    <div class="dashboard">
      ${renderHeader()}

      <nav class="tabs">
        <button class="tab active" data-tab="dashboard">Dashboard</button>
        <button class="tab" data-tab="review">Review ${dueCount > 0 ? `<span class="tab-badge">${dueCount}</span>` : ''}</button>
        <button class="tab" data-tab="learn">Learn</button>
        <button class="tab" data-tab="practice">Practice</button>
        <button class="tab" data-tab="stats">Stats</button>
      </nav>

      <main class="tab-content" id="dashboard-tab">
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${profile.progress.totalWordsLearned}</div>
            <div class="stat-label">Words Learned</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${dueCount}</div>
            <div class="stat-label">Due for Review</div>
          </div>
        </section>

        <section class="daily-goal">
          <h2>Daily Goal</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <p>${profile.progress.todayLearned} / ${profile.progress.dailyGoal} words today</p>
        </section>

        <section class="recommended-action">
          <div class="recommended-card" onclick="window.showTab('review')">
            <div class="recommended-info">
              <h3>Next Step</h3>
              <p>${dueCount > 0 ? `Review ${dueCount} words now` : 'Start a new lesson'}</p>
            </div>
            <button class="btn secondary">Go</button>
          </div>
        </section>

        <section class="level-overview">
          <h2>Levels</h2>
          <div class="level-cards">
            ${levels
              .map((level) => {
                const lp = profile.levels[level.id]
                return `
              <div class="level-card">
                <div class="level-card-header">
                  <h3>${level.id} – ${level.title}</h3>
                  <span class="level-status">${lp.percent === 100 ? '✅' : lp.started ? '📝' : '🔒'}</span>
                </div>
                <div class="level-progress">
                  <div class="progress-bar slim">
                    <div class="progress-fill" style="width: ${lp.percent}%"></div>
                  </div>
                  <span class="progress-text">${lp.percent}%</span>
                </div>
              </div>
            `
              })
              .join('')}
          </div>
        </section>
      </main>

      <main class="tab-content hidden" id="review-tab"></main>
      <main class="tab-content hidden" id="learn-tab"></main>
      <main class="tab-content hidden" id="practice-tab"></main>
      <main class="tab-content hidden" id="stats-tab"></main>

      <div class="quiz-overlay hidden" id="quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress">Question 1/10</span>
            <button class="close-quiz" onclick="window.closeQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="quiz-content"></div>
        </div>
      </div>

      <div class="quiz-overlay hidden" id="grammar-quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress grammar-quiz-progress">Question 1/10</span>
            <button class="close-quiz" onclick="window.closeGrammarQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="grammar-quiz-content"></div>
        </div>
      </div>
    </div>
  `

  renderReview()
  renderLearn()
  renderPractice()
  renderStats()

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).dataset.tab
      if (target) showTab(target)
    })
  })
}

function renderReview() {
  const tab = document.getElementById('review-tab')
  if (!tab) return
  const dueCount = getDueSrsWords().length
  const profile = getProfile()
  const boxCounts = [0, 0, 0, 0, 0, 0]
  Object.values(profile.srsState).forEach((s) => boxCounts[s.box]++)

  tab.innerHTML = `
    <div class="review-due ${dueCount === 0 ? 'hidden' : ''}">
      <h2>Review Time!</h2>
      <p>You have <strong>${dueCount}</strong> words ready for review.</p>
      <button class="btn primary" onclick="window.startQuiz(undefined, 'de-en', true)">Start Review Session</button>
    </div>
    
    <div class="srs-info">
      <h3>Memory Progress (SRS)</h3>
      <p class="subtitle" style="margin-bottom: 1.5rem">Words move to higher boxes as you remember them correctly.</p>
      <div class="srs-boxes">
        ${[1, 2, 3, 4, 5]
          .map(
            (b) => `
          <div class="srs-box">
            <span class="box-number">Box ${b}</span>
            <span class="box-count">${boxCounts[b]}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
    
    ${dueCount === 0 ? '<p style="text-align: center; margin-top: 2rem">Zero words due. Take a break or learn something new! ☕</p>' : ''}
  `
}

function renderLearn() {
  const tab = document.getElementById('learn-tab')
  if (!tab) return
  const profile = getProfile()

  tab.innerHTML = `
    <h2>Learn by Level</h2>
    <div class="levels-list">
      ${levels
        .map((level) => {
          const lp = profile.levels[level.id]
          return `
        <section class="level-section">
          <h3>${level.id} – ${level.title}</h3>
          <div class="chapters-list">
            ${level.chapters
              .map((ch) => {
                const cp = lp.chapters[ch.id]
                return `
              <div class="chapter-card">
                <div class="chapter-info">
                  <h4>${ch.title}</h4>
                  <p>${ch.description}</p>
                  <div class="chapter-progress">
                    <div class="progress-bar slim">
                      <div class="progress-fill" style="width: ${cp.percent}%"></div>
                    </div>
                    <span>${cp.percent}%</span>
                  </div>
                </div>
                <button class="btn secondary" onclick="window.startQuiz('${ch.id}', 'de-en')">Learn</button>
              </div>
            `
              })
              .join('')}
          </div>
        </section>
      `
        })
        .join('')}
    </div>
  `
}

function renderPractice() {
  const tab = document.getElementById('practice-tab')
  if (!tab) return

  tab.innerHTML = `
    <h2>Practice</h2>
    
    <div class="practice-section">
      <h3>Vocabulary Quiz</h3>
      <div class="quiz-setup">
        <label>
          <span>Mode:</span>
          <select id="quiz-mode">
            <option value="de-en">German → English</option>
            <option value="en-de">English → German</option>
            <option value="audio-dictation">Audio Dictation (Diktat)</option>
            <option value="sentence-completion">Sentence Completion</option>
            <option value="type-sentence">Sentence Typing (B1+)</option>
          </select>
        </label>
        <label>
          <span>Chapter:</span>
          <select id="quiz-lesson">
            <option value="">All Words</option>
            ${levels
              .map(
                (lvl) => `
              <optgroup label="${lvl.id}">
                ${lvl.chapters.map((ch) => `<option value="${ch.id}">${ch.title}</option>`).join('')}
              </optgroup>
            `,
              )
              .join('')}
          </select>
        </label>
        <label>
          <span>Questions:</span>
          <select id="quiz-count">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
          </select>
        </label>
        <button class="btn primary" onclick="window.startQuiz(window.getSelectedChapter(), window.getSelectedMode())">Start Practice</button>
      </div>
    </div>

    <div class="practice-section">
      <h3>Grammar Challenge</h3>
      <div class="quiz-setup">
        <label>
          <span>Category:</span>
          <select id="grammar-category">
            <option value="">All Categories</option>
            ${Array.from(new Set(grammarExercises.map(e => e.category))).map(cat => `<option value="${cat}">${cat}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>Questions:</span>
          <select id="grammar-count">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
          </select>
        </label>
        <button class="btn primary" onclick="window.startGrammarQuiz()">Start Grammar Quiz</button>
      </div>
    </div>
  `
}

function renderStats() {
  const tab = document.getElementById('stats-tab')
  if (!tab) return
  const profile = getProfile()
  
  // Find top 3 weaknesses
  const weaknesses = Object.entries(profile.categoryStats)
    .map(([name, stat]) => ({ name, accuracy: (stat.correct / stat.total) * 100 }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)

  tab.innerHTML = `
    <h2>Your Stats</h2>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${profile.quizHistory.length}</div>
        <div class="stat-label">Total Quizzes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Math.round(profile.progress.averageAccuracy)}%</div>
        <div class="stat-label">Average Accuracy</div>
      </div>
    </div>

    ${weaknesses.length > 0 ? `
      <div class="practice-section weakness-card">
        <h3>Weak Spots 🎯</h3>
        <p class="subtitle">Categories you should practice more:</p>
        <div class="weakness-list" style="margin-top: 1rem">
          ${weaknesses.map(w => `
            <div class="category-stat">
              <span>${w.name}</span>
              <span style="color: ${w.accuracy < 50 ? 'var(--danger)' : 'var(--accent)'}">${Math.round(w.accuracy)}%</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <h3>Recent Activity</h3>
    <div class="quiz-history">
      ${profile.quizHistory.slice(-10).reverse().map(q => `
        <div class="quiz-result" style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid var(--border)">
          <span style="font-size: 0.8rem">${new Date(q.completedAt).toLocaleDateString()}</span>
          <strong>${q.mode || 'de-en'}</strong>
          <span>${Math.round(q.accuracy)}%</span>
        </div>
      `).join('')}
    </div>
  `
}

function showTab(tabName: string) {
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'))
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach((t) => t.classList.add('active'))
  document.querySelectorAll('.tab-content').forEach((c) => c.classList.add('hidden'))
  const tab = document.getElementById(`${tabName}-tab`)
  tab?.classList.remove('hidden')
  
  if (tabName === 'dashboard') renderDashboard()
  if (tabName === 'review') renderReview()
  if (tabName === 'learn') renderLearn()
  if (tabName === 'practice') renderPractice()
  if (tabName === 'stats') renderStats()
}

function speakWord(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

// --- Window Helpers ---
// @ts-ignore
window.startQuiz = startQuiz
// @ts-ignore
window.closeQuiz = closeQuiz
// @ts-ignore
window.showTab = showTab
// @ts-ignore
window.switchProfile = switchProfile
// @ts-ignore
window.startGrammarQuiz = startGrammarQuiz
// @ts-ignore
window.closeGrammarQuiz = closeGrammarQuiz
// @ts-ignore
window.getSelectedChapter = () => (document.getElementById('quiz-lesson') as HTMLSelectElement)?.value
// @ts-ignore
window.getSelectedMode = () => (document.getElementById('quiz-mode') as HTMLSelectElement)?.value
// @ts-ignore
window.speakWord = speakWord

export function initApp() {
  renderDashboard()
}
