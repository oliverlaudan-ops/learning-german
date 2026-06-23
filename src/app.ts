import type {
  CEFRLevel,
  VocabWord,
  UserProgress,
  QuizResult,
  Chapter,
  Level,
  LevelProgress,
  ChapterProgress,
} from './types'
import { vocabulary } from './data/vocabulary'
import { lessons, getLevels } from './data/lessons'
// import { glossaryTerms } from './data/glossary'
// Grammar rules are not currently rendered in this minimal dashboard view.
import { achievements as achievementList } from './data/achievements'
import { grammarExercises } from './data/grammar-exercises'

const levels: Level[] = getLevels()

// Glossary render helpers kept for future use but unused in the current tabs.

const STORAGE_KEY = 'learning-german-v2-state'

interface AppState {
  progress: UserProgress
  quizHistory: QuizResult[]
  learnedWordIds: string[]
  lastActive: number
  streak: number
  achievements: typeof achievementList
  levels: Record<CEFRLevel, LevelProgress>
}

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

function emptyChapterProgress(ch: Chapter): ChapterProgress {
  return {
    chapterId: ch.id,
    levelId: ch.level,
    wordsLearned: 0,
    learnedWordIds: [],
    percent: 0,
  }
}

function emptyLevelProgress(level: Level): LevelProgress {
  const chapters: Record<string, ChapterProgress> = {}
  for (const ch of level.chapters) {
    chapters[ch.id] = emptyChapterProgress(ch)
  }
  return {
    levelId: level.id,
    chapters,
    completedChapters: [],
    totalWordsLearned: 0,
    percent: 0,
    started: false,
  }
}

function initialLevels(): Record<CEFRLevel, LevelProgress> {
  const out: Partial<Record<CEFRLevel, LevelProgress>> = {}
  for (const level of levels) {
    out[level.id] = emptyLevelProgress(level)
  }
  return out as Record<CEFRLevel, LevelProgress>
}

function migrateLegacyState(parsed: any): Partial<AppState> {
  const legacy: Partial<AppState> = {}
  if (parsed?.progress) {
    legacy.progress = {
      ...defaultProgress,
      ...parsed.progress,
      wordsByLevel: {
        A1: 0,
        A2: 0,
        B1: 0,
        B2: 0,
        ...parsed.progress.wordsByLevel,
      },
    }
  }
  if (Array.isArray(parsed?.quizHistory)) {
    legacy.quizHistory = parsed.quizHistory
      .filter((q: any) => q != null)
      .map((q: any) => ({
        chapterId: q.lessonId || q.chapterId || 'unknown',
        levelId: q.levelId || 'A1',
        correct: q.correct || 0,
        total: q.total || 0,
        accuracy: q.accuracy || 0,
        completedAt: q.completedAt || Date.now(),
        timeSpent: q.timeSpent || 0,
      }))
  }
  if (Array.isArray(parsed?.learnedWordIds)) {
    legacy.learnedWordIds = parsed.learnedWordIds
  }
  if (typeof parsed?.lastActive === 'number') legacy.lastActive = parsed.lastActive
  if (typeof parsed?.streak === 'number') legacy.streak = parsed.streak
  return legacy
}

function loadState(): AppState {
  const saved = localStorage.getItem(STORAGE_KEY)
  const fresh: AppState = {
    progress: defaultProgress,
    quizHistory: [],
    learnedWordIds: [],
    lastActive: Date.now(),
    streak: 0,
    achievements: achievementList.map((a) => ({ ...a, unlocked: false })),
    levels: initialLevels(),
  }

  if (!saved) return fresh

  try {
    const parsed = JSON.parse(saved)
    const migrated = migrateLegacyState(parsed)

    const mergedProgress = { ...defaultProgress, ...migrated.progress }
    const mergedLevels = initialLevels()

    // Rebuild chapter progress from saved level/chapter data if present.
    if (parsed.levels) {
      for (const level of levels) {
        const savedLevel = parsed.levels[level.id]
        const levelProgress = mergedLevels[level.id]
        if (savedLevel?.started) levelProgress.started = true
        if (savedLevel?.completedChapters) {
          levelProgress.completedChapters = savedLevel.completedChapters
        }
        for (const ch of level.chapters) {
          const savedChapter = savedLevel?.chapters?.[ch.id]
          if (savedChapter) {
            levelProgress.chapters[ch.id] = {
              chapterId: ch.id,
              levelId: ch.level,
              wordsLearned: savedChapter.wordsLearned || 0,
              learnedWordIds: savedChapter.learnedWordIds || [],
              percent: savedChapter.percent || 0,
              lastActive: savedChapter.lastActive,
            }
          }
        }
        recalcLevelProgress(levelProgress, level)
      }
    }

    // Re-calc totals from learned word ids when migrating from old storage.
    if (!parsed.levels && Array.isArray(migrated.learnedWordIds)) {
      for (const wordId of migrated.learnedWordIds) {
        const word = vocabulary.find((w) => w.id === wordId)
        if (!word || !isCEFRLevel(word.level)) continue
        const level = levels.find((l) => l.id === word.level)
        const chapter = level?.chapters.find((c) => c.wordIds.includes(wordId))
        if (!chapter) continue
        const lp = mergedLevels[word.level]
        const cp = lp.chapters[chapter.id]
        if (!cp.learnedWordIds.includes(wordId)) {
          cp.learnedWordIds.push(wordId)
          cp.wordsLearned++
        }
      }
      for (const level of levels) {
        recalcLevelProgress(mergedLevels[level.id], level)
      }
    }

    return {
      progress: {
        ...mergedProgress,
        totalWordsLearned: mergedProgress.totalWordsLearned,
      },
      quizHistory: migrated.quizHistory || [],
      learnedWordIds: migrated.learnedWordIds || [],
      lastActive: migrated.lastActive || Date.now(),
      streak: migrated.streak || 0,
      achievements: achievementList.map((a) => ({
        ...a,
        unlocked: parsed.achievements?.find((ach: any) => ach.id === a.id)?.unlocked || false,
        unlockedAt: parsed.achievements?.find((ach: any) => ach.id === a.id)?.unlockedAt,
      })),
      levels: mergedLevels,
    }
  } catch {
    return fresh
  }
}

function isCEFRLevel(level: string): level is CEFRLevel {
  return ['A1', 'A2', 'B1', 'B2'].includes(level)
}

function recalcLevelProgress(lp: LevelProgress, level: Level) {
  let totalWords = 0
  let learned = 0
  lp.completedChapters = []
  for (const ch of level.chapters) {
    const cp = lp.chapters[ch.id]
    cp.wordsLearned = cp.learnedWordIds.length
    cp.percent = Math.round((cp.learnedWordIds.length / ch.wordIds.length) * 100)
    totalWords += ch.wordIds.length
    learned += cp.learnedWordIds.length
    if (cp.percent >= 100) {
      lp.completedChapters.push(ch.id)
    }
  }
  lp.totalWordsLearned = learned
  lp.percent = totalWords === 0 ? 0 : Math.round((learned / totalWords) * 100)
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  updateAchievementDisplay()
}

function checkAchievements(state: AppState) {
  let changed = false
  const checkData = { ...state.progress, quizHistory: state.quizHistory }
  state.achievements.forEach((ach) => {
    if (!ach.unlocked && ach.condition(checkData)) {
      ach.unlocked = true
      ach.unlockedAt = Date.now()
      showAchievementNotification(ach)
      changed = true
    }
  })
  if (changed) saveState(state)
}

function showAchievementNotification(ach: (typeof achievementList)[0]) {
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
  const unlocked = state.achievements.filter((a) => a.unlocked)
  const locked = state.achievements.filter((a) => !a.unlocked)

  container.innerHTML = `
    ${unlocked.length === 0 ? '<p class="no-achievements">No achievements yet. Keep learning!</p>' : ''}
    <div class="achievements-grid">
      ${unlocked
        .map(
          (ach) => `
        <div class="achievement-card unlocked" title="${ach.description}\nUnlocked: ${ach.unlockedAt ? new Date(ach.unlockedAt).toLocaleDateString() : ''}">
          <span class="achievement-icon">${ach.icon}</span>
          <span class="achievement-title">${ach.title}</span>
        </div>
      `,
        )
        .join('')}
      ${locked
        .map(
          (ach) => `
        <div class="achievement-card locked" title="${ach.description}">
          <span class="achievement-icon">🔒</span>
          <span class="achievement-title">${ach.title}</span>
        </div>
      `,
        )
        .join('')}
    </div>
  `
}

let appState = loadState()

function markWordLearned(wordId: string, correct: boolean, chapterId?: string, levelId?: CEFRLevel) {
  if (!correct) return
  if (appState.learnedWordIds.includes(wordId)) {
    // Still update level/chapter progress if missing.
    ensureChapterProgress(wordId)
    return
  }

  const word = vocabulary.find((w) => w.id === wordId)
  if (!word) return

  appState.learnedWordIds.push(wordId)
  appState.progress.totalWordsLearned = appState.learnedWordIds.length

  const targetLevelId = levelId && isCEFRLevel(levelId) ? levelId : isCEFRLevel(word.level) ? word.level : undefined
  if (!targetLevelId) return

  appState.progress.wordsByLevel[targetLevelId] = (appState.progress.wordsByLevel[targetLevelId] || 0) + 1
  appState.progress.todayLearned++

  const level = levels.find((l) => l.id === targetLevelId)
  if (!level) return

  const targetChapterId = chapterId || level.chapters.find((c) => c.wordIds.includes(wordId))?.id
  if (!targetChapterId) return

  const lp = appState.levels[targetLevelId]
  if (!lp) return
  lp.started = true

  const cp = lp.chapters[targetChapterId]
  if (cp && !cp.learnedWordIds.includes(wordId)) {
    cp.learnedWordIds.push(wordId)
  }

  recalcLevelProgress(lp, level)
  saveState(appState)
}

function ensureChapterProgress(wordId: string) {
  const word = vocabulary.find((w) => w.id === wordId)
  if (!word || !isCEFRLevel(word.level)) return
  const level = levels.find((l) => l.id === word.level)
  if (!level) return
  const chapter = level.chapters.find((c) => c.wordIds.includes(wordId))
  if (!chapter) return
  const lp = appState.levels[word.level]
  if (!lp.chapters[chapter.id].learnedWordIds.includes(wordId)) {
    lp.chapters[chapter.id].learnedWordIds.push(wordId)
    recalcLevelProgress(lp, level)
  }
}

interface QuizQuestion {
  word: VocabWord
  type: 'multiple-choice' | 'write'
  options?: string[]
  correctAnswer: string
}

function generateQuiz(chapterId?: string, count: number = 10): QuizQuestion[] {
  const pool = chapterId
    ? vocabulary.filter((w) => {
        const chapter = lessons.find((l) => l.id === chapterId)
        return chapter?.wordIds.includes(w.id)
      })
    : vocabulary
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length))

  return shuffled.map((word) => {
    const isMultipleChoice = Math.random() > 0.5
    const others = vocabulary.filter((w) => w.id !== word.id)
    const wrong = others.sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.german)

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
let currentQuizChapterId: string | undefined
let currentQuizLevelId: CEFRLevel | undefined

// Grammar Quiz State
let currentGrammarQuiz: typeof grammarExercises = []
let grammarQuestionIndex = 0
let grammarCorrect = 0

function startQuiz(chapterId?: string) {
  const chapter = chapterId ? lessons.find((l) => l.id === chapterId) : undefined
  const countSelect = document.getElementById('quiz-count') as HTMLSelectElement
  const count = parseInt(countSelect?.value || '10')
  currentQuiz = generateQuiz(chapterId, count)
  currentQuestionIndex = 0
  quizCorrect = 0
  currentQuizChapterId = chapterId
  currentQuizLevelId = chapter?.level

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
          ${question.options.map((opt) => `<button class="option-btn" data-answer="${opt}">${opt}</button>`).join('')}
        </div>
      </div>
    `
    content.querySelectorAll('.option-btn').forEach((btn) => {
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
    markWordLearned(question.word.id, true, currentQuizChapterId, currentQuizLevelId)
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
    chapterId: currentQuizChapterId || 'general',
    levelId: currentQuizLevelId || 'A1',
    correct: quizCorrect,
    total: currentQuiz.length,
    accuracy,
    completedAt: Date.now(),
    timeSpent: 0,
  })
  appState.progress.totalQuizCount++
  appState.progress.averageAccuracy =
    appState.quizHistory.reduce((sum, q) => sum + q.accuracy, 0) / appState.quizHistory.length
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
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'))
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach((t) => t.classList.add('active'))
  document.querySelectorAll('.tab-content').forEach((c) => c.classList.add('hidden'))
  const tab = document.getElementById(`${tabName}-tab`)
  tab?.classList.remove('hidden')
  if (tabName === 'achievements') updateAchievementDisplay()
  if (tabName === 'learn') renderLearn()
  if (tabName === 'practice') renderPractice()
}

function getRecommendedLevel(): Level {
  for (const level of levels) {
    const lp = appState.levels[level.id]
    if (!lp.started || lp.percent < 100) return level
  }
  return levels[levels.length - 1]
}

function getRecommendedChapter(level: Level): Chapter | undefined {
  const lp = appState.levels[level.id]
  return level.chapters.find((ch) => {
    const cp = lp.chapters[ch.id]
    return cp.percent < 100
  })
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
  const recommendedLevel = getRecommendedLevel()
  const recommendedChapter = getRecommendedChapter(recommendedLevel)

  app.innerHTML = `
    <div class="dashboard">
      <header>
        <h1>🇩🇪 Learning German</h1>
        <p class="subtitle">Your German Learning Path</p>
      </header>

      <nav class="tabs">
        <button class="tab active" data-tab="dashboard">Dashboard</button>
        <button class="tab" data-tab="learn">Learn</button>
        <button class="tab" data-tab="practice">Practice</button>
        <button class="tab" data-tab="stats">Stats</button>
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

        <section class="recommended-action">
          <h2>Continue Learning</h2>
          <div class="recommended-card">
            <div class="recommended-info">
              <span class="level-badge">${recommendedLevel.id}</span>
              <h3>${recommendedChapter ? recommendedChapter.title : recommendedLevel.title}</h3>
              <p>${recommendedChapter ? recommendedChapter.description : recommendedLevel.description}</p>
            </div>
            <button class="btn primary" onclick="startQuiz('${recommendedChapter?.id || ''}')">
              ${recommendedChapter && appState.levels[recommendedLevel.id].chapters[recommendedChapter.id].percent > 0 ? 'Continue' : 'Start'}
            </button>
          </div>
        </section>

        <section class="level-overview">
          <h2>Your Levels</h2>
          <div class="level-cards">
            ${levels
              .map((level) => {
                const lp = appState.levels[level.id]
                return `
              <div class="level-card">
                <div class="level-card-header">
                  <h3>${level.id}</h3>
                  <span class="level-status">${lp.percent === 100 ? '✅' : lp.started ? '📝' : '🔒'}</span>
                </div>
                <p class="level-description">${level.description}</p>
                <div class="level-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: ${lp.percent}%"></div>
                  </div>
                  <span class="progress-text">${lp.percent}% • ${lp.completedChapters.length}/${level.chapters.length} chapters</span>
                </div>
                <button class="btn secondary" onclick="showTab('learn')">View</button>
              </div>
            `
              })
              .join('')}
          </div>
        </section>
      </main>

      <main class="tab-content hidden" id="learn-tab"></main>

      <main class="tab-content hidden" id="practice-tab"></main>

      <main class="tab-content hidden" id="stats-tab">
        <h2>Your Statistics</h2>
        <div class="stats-detail">
          <h3>Words by Level</h3>
          <ul class="level-breakdown">
            ${Object.entries(appState.progress.wordsByLevel)
              .map(([level, count]) => `
              <li><span class="level-badge">${level}</span> ${count} words</li>
            `)
              .join('')}
          </ul>
          <h3>Recent Quizzes</h3>
          <div class="quiz-history">
            ${appState.quizHistory
              .slice(-5)
              .reverse()
              .map((q) => `
              <div class="quiz-result">
                <span>${new Date(q.completedAt).toLocaleDateString()}</span>
                <span class="level-badge">${q.levelId}</span>
                <span>${q.correct}/${q.total} correct</span>
                <span>${Math.round(q.accuracy)}%</span>
              </div>
            `)
              .join('')}
            ${appState.quizHistory.length === 0 ? '<p>No quizzes completed yet.</p>' : ''}
          </div>
        </div>
      </main>

      <main class="tab-content hidden" id="achievements-tab">
        <h2>Achievements</h2>
        <div class="achievements-summary">
          <div class="achievement-stat">
            <span class="stat-number">${appState.achievements.filter((a) => a.unlocked).length}</span>
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

      <div class="quiz-overlay hidden" id="grammar-quiz-overlay">
        <div class="quiz-container">
          <div class="quiz-header">
            <span class="quiz-progress grammar-quiz-progress">Question 1/10</span>
            <button class="close-quiz" onclick="closeGrammarQuiz()">✕</button>
          </div>
          <div class="quiz-content" id="grammar-quiz-content"></div>
        </div>
      </div>
    </div>
  `

  updateAchievementDisplay()
  renderLearn()
  renderPractice()

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).dataset.tab
      if (target) showTab(target)
    })
  })
}

function renderLearn() {
  const tab = document.getElementById('learn-tab')
  if (!tab) return

  tab.innerHTML = `
    <h2>Learn by Level</h2>
    <p class="section-intro">Choose a level and pick the chapter you want to study. Higher levels are recommended once you finish the current level, but you can explore them freely.</p>
    <div class="levels-list">
      ${levels
        .map((level) => {
          const lp = appState.levels[level.id]
          return `
        <section class="level-section">
          <div class="level-section-header">
            <div>
              <h3>${level.id} – ${level.title.replace(level.id + ' – ', '')}</h3>
              <p>${level.description}</p>
            </div>
            <div class="level-section-progress">
              <span>${lp.percent}%</span>
              <div class="progress-bar slim">
                <div class="progress-fill" style="width: ${lp.percent}%"></div>
              </div>
            </div>
          </div>
          <div class="chapters-list">
            ${level.chapters
              .map((ch) => {
                const cp = lp.chapters[ch.id]
                const chapterWords = vocabulary.filter((w) => ch.wordIds.includes(w.id))
                return `
              <div class="chapter-card">
                <div class="chapter-main">
                  <div class="chapter-number">${ch.order}</div>
                  <div class="chapter-info">
                    <h4>${ch.title}</h4>
                    <p>${ch.description}</p>
                    <div class="chapter-meta">
                      <span class="category">${ch.category}</span>
                      <span class="word-count">${chapterWords.length} words</span>
                    </div>
                    <div class="chapter-progress">
                      <div class="progress-bar slim">
                        <div class="progress-fill" style="width: ${cp.percent}%"></div>
                      </div>
                      <span>${cp.percent}%</span>
                    </div>
                  </div>
                </div>
                <div class="chapter-words-preview">
                  ${chapterWords
                    .slice(0, 5)
                    .map((w) => `<span class="word-chip">${w.german}</span>`)
                    .join('')}
                  ${chapterWords.length > 5 ? `<span class="word-more">+${chapterWords.length - 5} more</span>` : ''}
                </div>
                <button class="btn ${cp.percent > 0 ? 'secondary' : 'primary'}" onclick="startQuiz('${ch.id}')">
                  ${cp.percent > 0 ? (cp.percent >= 100 ? 'Review' : 'Continue') : 'Start'}
                </button>
              </div>
            `
              })
              .join('')}
            ${level.chapters.length === 0 ? '<p class="empty-chapters">No chapters available yet. Content coming soon!</p>' : ''}
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

    <section class="practice-section">
      <h3>Vocabulary Quiz</h3>
      <div class="quiz-setup">
        <label>
          <span>Select Chapter:</span>
          <select id="quiz-lesson">
            <option value="">All Words</option>
            ${levels
              .map((level) => {
                const opts = level.chapters
                  .map((l) => `<option value="${l.id}">[${level.id}] ${l.title}</option>`)
                  .join('')
                return `<optgroup label="${level.id}">${opts}</optgroup>`
              })
              .join('')}
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
        <button class="btn primary" onclick="startQuiz(getSelectedChapter())">Start Quiz</button>
      </div>
    </section>

    <section class="practice-section">
      <h3>Grammar Practice</h3>
      <div class="quiz-setup">
        <label>
          <span>Select Category:</span>
          <select id="grammar-category">
            <option value="">All Categories</option>
            <option value="Articles">Articles</option>
            <option value="Verbs">Verbs</option>
            <option value="Nouns">Nouns</option>
            <option value="Cases">Cases</option>
            <option value="Prepositions">Prepositions</option>
            <option value="Pronouns">Pronouns</option>
            <option value="Negation">Negation</option>
            <option value="Vor-Ver Prefixes">⭐ Vor vs Ver</option>
          </select>
        </label>
        <label>
          <span>Number of Questions:</span>
          <select id="grammar-count">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
          </select>
        </label>
        <button class="btn primary" onclick="startGrammarQuiz()">Start Grammar Quiz</button>
      </div>
    </section>
  `
}

// @ts-ignore - called from HTML onclick
window.getSelectedChapter = getSelectedChapter

function getSelectedChapter(): string | undefined {
  const select = document.getElementById('quiz-lesson') as HTMLSelectElement
  return select?.value || undefined
}

// @ts-ignore - called from HTML onclick
window.startQuiz = startQuiz
// @ts-ignore - called from HTML onclick
window.closeQuiz = closeQuiz
// @ts-ignore - called from HTML onclick
window.showTab = showTab

// @ts-ignore - called from HTML onclick
window.startGrammarQuiz = startGrammarQuiz
// @ts-ignore - called from HTML onclick
window.closeGrammarQuiz = closeGrammarQuiz

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
      <button class="btn primary" onclick="closeGrammarQuiz()">Back to Practice</button>
    </div>
  `
}

function closeGrammarQuiz() {
  document.getElementById('grammar-quiz-overlay')?.classList.add('hidden')
}

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
  cards.forEach((card) => {
    const term = card.getAttribute('data-term') || ''
    card.classList.toggle('hidden', !term.includes(filter))
  })
}

export function initApp() {
  renderDashboard()
}
