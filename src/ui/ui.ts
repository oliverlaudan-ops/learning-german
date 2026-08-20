/**
 * UI orchestration layer.
 *
 * Owns the DOM, event listeners, and the global "window.*" handles that the
 * inline `onclick` attributes need. State mutations go through the pure
 * modules in `src/state/`, `src/srs/`, `src/quiz/`, `src/grammar/`.
 */

import type { AppState, CEFRLevel, ProfileState, VocabWord, QuizMode, Level } from '../types'
import { lessons, getLevels } from '../data/lessons'
import { vocabulary } from '../data/vocabulary'
import { loadState, saveState, createEmptyProfile } from '../state/state'
import {
  applySrsReview,
  getDueSrsWords,
  initSrsForLearnedWord,
  boxCounts,
} from '../srs/srs'
import { achievements } from '../data/achievements'
import { grammarExercises, GRAMMAR_CATEGORIES, isTileExercise } from '../data/grammar-exercises'
import { generateQuiz, type VocabQuizQuestion, type SentenceConstructionQuestion, tokenizeSentence } from '../quiz/quiz'
import {
  createGrammarQuizState,
  currentExercise,
  isFinished as isGrammarFinished,
  pickExercises,
  scoreCloze,
  scoreSentenceConstruction,
} from '../grammar/grammar'
import { showAchievementToast, type UnlockedAchievement } from './achievement-ui'

// ---------------------------------------------------------------------------
// Module-level state (single source of truth while the app is mounted)
// ---------------------------------------------------------------------------

const levels: Level[] = getLevels()
let appState: AppState = loadState({ levels })

// Vocab quiz state
let currentQuiz: VocabQuizQuestion[] = []
let currentQuestionIndex = 0
let quizCorrect = 0
let currentQuizChapterId: string | undefined
let currentQuizMode: QuizMode = 'de-en'
let isReviewMode = false

// Grammar quiz state
let grammarState = createGrammarQuizState([])

// Sentence-construction interaction state (per question)
let tileBuilt: string[] = [] // tokens in the order the user clicked
let tilePool: string[] = []  // remaining tiles

// Pending achievements to announce after the next save.
let pendingAchievements: UnlockedAchievement[] = []

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getProfile(): ProfileState {
  return appState.profiles[appState.currentProfileId]!
}

function recalcLevelProgress(profile: ProfileState, levelId: CEFRLevel, levelList: readonly Level[]): void {
  const lp = profile.levels[levelId]
  if (!lp) return
  const levelData = levelList.find((l) => l.id === levelId)
  if (!levelData) return
  let total = 0
  let learned = 0
  lp.completedChapters = []
  for (const ch of levelData.chapters) {
    const cp = lp.chapters[ch.id]
    cp.wordsLearned = cp.learnedWordIds.length
    cp.percent = ch.wordIds.length === 0
      ? 0
      : Math.round((cp.learnedWordIds.length / ch.wordIds.length) * 100)
    total += ch.wordIds.length
    learned += cp.learnedWordIds.length
    if (cp.percent >= 100) lp.completedChapters.push(ch.id)
  }
  lp.totalWordsLearned = learned
  lp.percent = total === 0 ? 0 : Math.round((learned / total) * 100)
}

function markWordLearned(wordId: string, correct: boolean, chapterId?: string): void {
  if (!correct) return
  const profile = getProfile()
  if (profile.learnedWordIds.includes(wordId)) return
  const word = (vocabulary as readonly VocabWord[]).find((w) => w.id === wordId)
  if (!word) return

  profile.learnedWordIds.push(wordId)
  profile.progress.totalWordsLearned = profile.learnedWordIds.length

  const levelId = word.level as CEFRLevel
  profile.progress.wordsByLevel[levelId] = (profile.progress.wordsByLevel[levelId] || 0) + 1
  profile.progress.todayLearned++

  const lp = profile.levels[levelId]
  if (lp) {
    lp.started = true
    const chId = chapterId || lessons.find((l) => l.wordIds.includes(wordId))?.id
    if (chId && lp.chapters[chId]) {
      const cp = lp.chapters[chId]!
      if (!cp.learnedWordIds.includes(wordId)) cp.learnedWordIds.push(wordId)
    }
    recalcLevelProgress(profile, levelId, levels)
  }

  if (!profile.srsState[wordId]) {
    profile.srsState[wordId] = initSrsForLearnedWord()
  }
  saveState(appState)
}

function updateCategoryStat(word: VocabWord, correct: boolean): void {
  const profile = getProfile()
  const cat = word.category
  if (!profile.categoryStats[cat]) profile.categoryStats[cat] = { correct: 0, total: 0 }
  profile.categoryStats[cat]!.total++
  if (correct) profile.categoryStats[cat]!.correct++
}

function checkAchievements(): void {
  const profile = getProfile()
  // Re-evaluate every achievement each call; newly-satisfied ones are
  // flagged. We only push to `pendingAchievements` once per unlock.
  const allFlags = {
    ...profile.progress,
    quizHistory: profile.quizHistory,
  }
  for (const a of achievements) {
    if (a.unlocked) continue
    if (a.condition(allFlags)) {
      a.unlocked = true
      a.unlockedAt = Date.now()
      pendingAchievements.push({
        id: a.id,
        title: a.title,
        description: a.description,
        icon: a.icon,
      })
    }
  }
  // Persist on every check so unlock timestamps survive a page reload.
  saveState(appState)
}

function flushAchievements(): void {
  if (pendingAchievements.length === 0) return
  showAchievementToast(pendingAchievements)
  pendingAchievements = []
}

// ---------------------------------------------------------------------------
// Vocab quiz
// ---------------------------------------------------------------------------

function startQuiz(chapterId?: string, mode: QuizMode = 'de-en', isReview = false): void {
  const countSelect = document.getElementById('quiz-count') as HTMLSelectElement | null
  const count = isReview ? 100 : parseInt(countSelect?.value || '10')

  currentQuiz = generateQuiz(
    { chapterId, count, mode, isReview },
    { vocab: vocabulary, lessons, srsState: getProfile().srsState },
  )
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

function showQuestion(): void {
  const question = currentQuiz[currentQuestionIndex]
  const content = document.getElementById('quiz-content')
  const progress = document.querySelector<HTMLElement>('.quiz-progress')
  if (!content || !question) return
  if (progress) progress.textContent = `Question ${currentQuestionIndex + 1}/${currentQuiz.length}`

  if (question.mode === 'audio-dictation') speakWord(question.word.german)

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
    case 'type-sentence':
      subtitle = question.mode === 'type-sentence' ? 'Type the missing word' : 'Complete the sentence'
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
          ? `<div class="options">
              ${question.options?.map((opt) => `<button class="option-btn" data-answer="${opt.replace(/"/g, '&quot;')}">${opt}</button>`).join('')}
            </div>`
          : `<input type="text" class="write-answer" placeholder="Your answer..." autocomplete="off" />
             <button class="btn primary submit-answer">Check Answer</button>`
      }
    </div>
  `

  if (question.type === 'multiple-choice') {
    content.querySelectorAll<HTMLElement>('.option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const t = e.currentTarget as HTMLElement
        const answer = t.dataset.answer
        if (answer !== undefined) checkAnswer(answer, question)
      })
    })
  } else {
    const input = content.querySelector<HTMLInputElement>('.write-answer')
    const submit = content.querySelector<HTMLElement>('.submit-answer')
    input?.focus()
    const submitHandler = () => {
      if (input) checkAnswer(input.value.trim(), question)
    }
    submit?.addEventListener('click', submitHandler)
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') submitHandler()
    })
  }
}

function checkAnswer(answer: string, question: VocabQuizQuestion): void {
  const correct = answer.toLowerCase() === question.correctAnswer.toLowerCase()
  if (correct) {
    quizCorrect++
    if (isReviewMode) {
      const srs = getProfile().srsState[question.word.id] ?? (getProfile().srsState[question.word.id] = { box: 1, nextReviewAt: 0, lastReviewedAt: 0, correctCount: 0, wrongCount: 0 })
      applySrsReview(srs, true)
    } else {
      markWordLearned(question.word.id, true, currentQuizChapterId)
    }
  } else if (isReviewMode) {
    const srs = getProfile().srsState[question.word.id] ?? (getProfile().srsState[question.word.id] = { box: 1, nextReviewAt: 0, lastReviewedAt: 0, correctCount: 0, wrongCount: 0 })
    applySrsReview(srs, false)
  }

  updateCategoryStat(question.word, correct)

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

  content.querySelector<HTMLElement>('.next-question')?.addEventListener('click', () => {
    currentQuestionIndex++
    if (currentQuestionIndex >= currentQuiz.length) finishQuiz()
    else showQuestion()
  })
}

function finishQuiz(): void {
  const accuracy = (quizCorrect / currentQuiz.length) * 100
  const profile = getProfile()
  const rawLevel = currentQuizChapterId
    ? lessons.find((l) => l.id === currentQuizChapterId)?.level
    : currentQuiz[0]?.word.level
  const levelId: CEFRLevel = (rawLevel === 'A1' || rawLevel === 'A2' || rawLevel === 'B1' || rawLevel === 'B2')
    ? rawLevel
    : 'A1'

  profile.quizHistory.push({
    chapterId: currentQuizChapterId || 'general',
    levelId,
    correct: quizCorrect,
    total: currentQuiz.length,
    accuracy,
    completedAt: Date.now(),
    timeSpent: 0,
    mode: currentQuizMode,
  })
  profile.progress.totalQuizCount++
  profile.progress.averageAccuracy =
    profile.quizHistory.reduce((s, q) => s + q.accuracy, 0) / profile.quizHistory.length

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
      <button class="btn primary" onclick="window.closeQuiz()">Done</button>
    </div>
  `
  flushAchievements()
}

function closeQuiz(): void {
  document.getElementById('quiz-overlay')?.classList.add('hidden')
  renderDashboard()
}

// ---------------------------------------------------------------------------
// Grammar quiz (with sentence-construction tile mode)
// ---------------------------------------------------------------------------

function startGrammarQuiz(): void {
  const categorySelect = document.getElementById('grammar-category') as HTMLSelectElement | null
  const countSelect = document.getElementById('grammar-count') as HTMLSelectElement | null
  const category = categorySelect?.value || ''
  const count = parseInt(countSelect?.value || '10')

  const pool = category
    ? grammarExercises.filter((ex) => ex.category === category)
    : grammarExercises
  const picked = pickExercises(pool, count)
  grammarState = createGrammarQuizState(picked)
  if (picked.length === 0) {
    alert('No grammar exercises available for this category.')
    return
  }
  document.getElementById('grammar-quiz-overlay')?.classList.remove('hidden')
  showGrammarQuestion()
}

function showGrammarQuestion(): void {
  const exercise = currentExercise(grammarState)
  const content = document.getElementById('grammar-quiz-content')
  const progress = document.querySelector<HTMLElement>('.grammar-quiz-progress')
  if (!content || !exercise) return
  if (progress) progress.textContent = `Question ${grammarState.index + 1}/${grammarState.exercises.length}`

  if (isTileExercise(exercise)) {
    renderTileQuestion(exercise)
  } else {
    renderClozeQuestion(exercise)
  }
}

function renderClozeQuestion(exercise: import('../types').GrammarExercise): void {
  const content = document.getElementById('grammar-quiz-content')
  if (!content) return
  content.innerHTML = `
    <div class="question">
      <p class="question-word">${exercise.question}</p>
      <div class="options">
        ${exercise.options.map((opt) => `<button class="option-btn" data-answer="${opt.replace(/"/g, '&quot;')}">${opt}</button>`).join('')}
      </div>
    </div>
  `
  content.querySelectorAll<HTMLElement>('.option-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const t = e.currentTarget as HTMLElement
      const answer = t.dataset.answer
      if (answer !== undefined) checkGrammarAnswer(answer, exercise)
    })
  })
}

function renderTileQuestion(exercise: import('../types').GrammarExercise): void {
  const content = document.getElementById('grammar-quiz-content')
  if (!content) return
  const correct = tokenizeSentence(exercise.correctAnswer)
  // Shuffle for display
  const shuffled = correct.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = tmp
  }
  tileBuilt = []
  tilePool = shuffled

  content.innerHTML = `
    <div class="question">
      <p class="subtitle">${exercise.question}</p>
      <div class="tile-area">
        <div class="tile-built" id="tile-built"></div>
        <div class="tile-pool" id="tile-pool">
          ${shuffled.map((t, i) => `<button class="tile" data-i="${i}">${t}</button>`).join('')}
        </div>
      </div>
      <div class="tile-controls">
        <button class="btn secondary" id="tile-undo">↶ Undo</button>
        <button class="btn secondary" id="tile-reset">Reset</button>
        <button class="btn primary" id="tile-check">Check</button>
      </div>
    </div>
  `
  refreshTileView()
  content.querySelector<HTMLElement>('#tile-undo')?.addEventListener('click', () => {
    if (tileBuilt.length > 0) {
      const last = tileBuilt.pop()!
      tilePool.push(last)
      refreshTileView()
    }
  })
  content.querySelector<HTMLElement>('#tile-reset')?.addEventListener('click', () => {
    tileBuilt = []
    tilePool = shuffled.slice()
    refreshTileView()
  })
  content.querySelector<HTMLElement>('#tile-check')?.addEventListener('click', () => {
    checkGrammarAnswer('', exercise, tileBuilt.slice())
  })
}

function refreshTileView(): void {
  const built = document.getElementById('tile-built')
  const pool = document.getElementById('tile-pool')
  if (!built || !pool) return
  built.innerHTML = tileBuilt.map((t, i) => `<span class="tile-built-item" data-i="${i}">${t}</span>`).join('')
  pool.innerHTML = tilePool.map((t, i) => `<button class="tile" data-i="${i}">${t}</button>`).join('')
  pool.querySelectorAll<HTMLElement>('.tile').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const t = e.currentTarget as HTMLElement
      const idx = Number(t.dataset.i)
      const tok = tilePool[idx]
      if (tok === undefined) return
      tilePool.splice(idx, 1)
      tileBuilt.push(tok)
      refreshTileView()
    })
  })
  // Click on built item to send it back to the pool
  built.querySelectorAll<HTMLElement>('.tile-built-item').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const t = e.currentTarget as HTMLElement
      const idx = Number(t.dataset.i)
      const tok = tileBuilt[idx]
      if (tok === undefined) return
      tileBuilt.splice(idx, 1)
      tilePool.push(tok)
      refreshTileView()
    })
  })
}

function checkGrammarAnswer(answer: string, exercise: import('../types').GrammarExercise, tileSeq?: readonly string[]): void {
  let correct = false
  if (isTileExercise(exercise) && tileSeq) {
    correct = scoreSentenceConstruction(exercise, tileSeq)
  } else {
    correct = scoreCloze(exercise, answer)
  }
  if (correct) grammarState.correct++

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
  content.querySelector<HTMLElement>('.next-question')?.addEventListener('click', () => {
    grammarState.index++
    if (isGrammarFinished(grammarState)) finishGrammarQuiz()
    else showGrammarQuestion()
  })
}

function finishGrammarQuiz(): void {
  const accuracy = (grammarState.correct / grammarState.exercises.length) * 100
  const content = document.getElementById('grammar-quiz-content')
  if (!content) return
  content.innerHTML = `
    <div class="quiz-results">
      <h2>Grammar Quiz Complete! 🎉</h2>
      <div class="results-summary">
        <div class="result-item">
          <span class="result-value">${grammarState.correct}/${grammarState.exercises.length}</span>
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

function closeGrammarQuiz(): void {
  document.getElementById('grammar-quiz-overlay')?.classList.add('hidden')
}

// ---------------------------------------------------------------------------
// Profile management
// ---------------------------------------------------------------------------

function switchProfile(id: string): void {
  if (id === 'new') {
    const name = prompt('Enter name for the new profile:')
    if (!name) {
      // Re-render to restore the previous selection in the dropdown.
      renderDashboard()
      return
    }
    const newId = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
    appState.profiles[newId] = createEmptyProfile(newId, name, levels)
    appState.currentProfileId = newId
  } else if (appState.profiles[id]) {
    appState.currentProfileId = id
  }
  saveState(appState)
  renderDashboard()
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function renderHeader(): string {
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

function renderDashboard(): void {
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

  const dueCount = getDueSrsWords(vocabulary, profile.srsState).length
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

      <div id="achievement-toast-host"></div>
    </div>
  `

  renderReview()
  renderLearn()
  renderPractice()
  renderStats()

  document.querySelectorAll<HTMLElement>('.tab').forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const t = e.currentTarget as HTMLElement
      const target = t.dataset.tab
      if (target) showTab(target)
    })
  })
}

function renderReview(): void {
  const tab = document.getElementById('review-tab')
  if (!tab) return
  const profile = getProfile()
  const dueCount = getDueSrsWords(vocabulary, profile.srsState).length
  const counts = boxCounts(profile.srsState)

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
            <span class="box-count">${counts[b] || 0}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>

    ${dueCount === 0 ? '<p style="text-align: center; margin-top: 2rem">Zero words due. Take a break or learn something new! ☕</p>' : ''}
  `
}

function renderLearn(): void {
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
                const cp = lp.chapters[ch.id]!
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

function renderPractice(): void {
  const tab = document.getElementById('practice-tab')
  if (!tab) return
  const categoryOptions = GRAMMAR_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join('')
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
      <p class="subtitle" style="margin-bottom: 0.75rem">Cloze for vocabulary/sentence-completion; tile mode for sentence construction in <em>genitiv</em> &amp; <em>infinitiv-zu</em>.</p>
      <div class="quiz-setup">
        <label>
          <span>Category:</span>
          <select id="grammar-category">
            <option value="">All Categories</option>
            ${categoryOptions}
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

function renderStats(): void {
  const tab = document.getElementById('stats-tab')
  if (!tab) return
  const profile = getProfile()
  const weaknesses = Object.entries(profile.categoryStats)
    .map(([name, stat]) => ({ name, accuracy: stat.total === 0 ? 0 : (stat.correct / stat.total) * 100 }))
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

function showTab(tabName: string): void {
  document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'))
  document.querySelectorAll(`[data-tab="${tabName}"]`).forEach((t) => t.classList.add('active'))
  document.querySelectorAll('.tab-content').forEach((c) => c.classList.add('hidden'))
  const tab = document.getElementById(`${tabName}-tab`)
  tab?.classList.remove('hidden')

  if (tabName === 'dashboard') renderDashboard()
  else if (tabName === 'review') renderReview()
  else if (tabName === 'learn') renderLearn()
  else if (tabName === 'practice') renderPractice()
  else if (tabName === 'stats') renderStats()

  for (const hook of showTabHooks) hook(tabName)
}

/**
 * Hooks invoked after `showTab` has finished its standard tab-switch work.
 * Modules (e.g. the learner-dashboard bootstrap) use this to re-render their
 * own pieces of the UI when the user navigates to their tab.
 */
const showTabHooks = new Set<(tabName: string) => void>()

export function registerShowTabHook(hook: (tabName: string) => void): () => void {
  showTabHooks.add(hook)
  return () => showTabHooks.delete(hook)
}

export function __resetShowTabHooks(): void {
  showTabHooks.clear()
}

/**
 * Test seam: fire all registered hooks for a given tab name without going
 * through `window.showTab`. Lets unit tests verify that a module correctly
 * registered its hook without spinning up the full tab-rendering machinery.
 */
export function __triggerShowTabHooks(tabName: string): void {
  for (const hook of showTabHooks) hook(tabName)
}

function speakWord(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.8
  speechSynthesis.speak(utterance)
}

// ---------------------------------------------------------------------------
// Window exports — required by inline onclick attributes
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    startQuiz: typeof startQuiz
    closeQuiz: typeof closeQuiz
    showTab: typeof showTab
    switchProfile: typeof switchProfile
    startGrammarQuiz: typeof startGrammarQuiz
    closeGrammarQuiz: typeof closeGrammarQuiz
    getSelectedChapter: () => string
    getSelectedMode: () => QuizMode
    speakWord: typeof speakWord
  }
}

window.startQuiz = startQuiz
window.closeQuiz = closeQuiz
window.showTab = showTab
window.switchProfile = switchProfile
window.startGrammarQuiz = startGrammarQuiz
window.closeGrammarQuiz = closeGrammarQuiz
window.getSelectedChapter = () => (document.getElementById('quiz-lesson') as HTMLSelectElement | null)?.value || ''
window.getSelectedMode = () => ((document.getElementById('quiz-mode') as HTMLSelectElement | null)?.value as QuizMode) || 'de-en'
window.speakWord = speakWord

// Silence unused-import warning for items we re-export for tests.
export { appState as __appState, getProfile as __getProfile }
export type { SentenceConstructionQuestion }

/** Public entry point used by `src/main.ts`. */
export function initApp(): void {
  renderDashboard()
}
