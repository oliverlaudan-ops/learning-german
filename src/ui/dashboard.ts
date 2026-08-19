import type { CEFRLevel, Level, ProfileState, VocabWord } from '../types'

export interface DashboardData {
  profile: ProfileState
  levels: readonly Level[]
  vocabulary: readonly VocabWord[]
  dueCount: number
  nextChapterId?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function levelProgress(profile: ProfileState, levelId: CEFRLevel): number {
  return Math.max(0, Math.min(100, profile.levels[levelId]?.percent ?? 0))
}

function findNextChapter(data: DashboardData): { level: Level; chapter: Level['chapters'][number] } | undefined {
  for (const level of data.levels) {
    const progress = data.profile.levels[level.id]
    for (const chapter of level.chapters) {
      const chapterProgress = progress?.chapters[chapter.id]
      if ((chapterProgress?.percent ?? 0) < 100) return { level, chapter }
    }
  }
  return undefined
}

export function renderDashboard(data: DashboardData): string {
  const { profile } = data
  const next = data.nextChapterId
    ? data.levels.flatMap((level) => level.chapters.map((chapter) => ({ level, chapter }))).find((item) => item.chapter.id === data.nextChapterId)
    : findNextChapter(data)

  const goal = Math.max(1, profile.progress.dailyGoal)
  const goalPercent = Math.min(100, Math.round((profile.progress.todayLearned / goal) * 100))
  const average = Math.round(profile.progress.averageAccuracy || 0)
  const name = escapeHtml(profile.displayName || 'Learner')

  return `
    <section class="dashboard" aria-labelledby="dashboard-title">
      <div class="dashboard-hero">
        <div>
          <p class="eyebrow">Your German journey 🇩🇪</p>
          <h1 id="dashboard-title">Welcome back, ${name}!</h1>
          <p class="dashboard-subtitle">A little German every day adds up. Keep going.</p>
        </div>
        <div class="dashboard-streak" aria-label="Current streak">
          <span class="dashboard-streak-icon">🔥</span>
          <strong>${profile.progress.currentStreak}</strong>
          <span>day streak</span>
        </div>
      </div>

      <div class="dashboard-grid">
        <article class="dashboard-card dashboard-continue">
          <div class="card-icon">▶️</div>
          <div class="card-content">
            <p class="card-kicker">CONTINUE LEARNING</p>
            <h2>${next ? escapeHtml(next.chapter.title) : 'You completed every chapter!'}</h2>
            <p>${next ? `${escapeHtml(next.level.title)} · Your next step` : 'Review your knowledge and keep it fresh.'}</p>
            <button class="primary-button" type="button" data-dashboard-action="continue" ${next ? `data-chapter-id="${escapeHtml(next.chapter.id)}"` : ''}>
              ${next ? 'Continue' : 'Review now'}
            </button>
          </div>
        </article>

        <article class="dashboard-card dashboard-goal">
          <div class="card-header">
            <div>
              <p class="card-kicker">TODAY'S GOAL</p>
              <h2>${profile.progress.todayLearned} / ${goal} words</h2>
            </div>
            <span class="dashboard-percent">${goalPercent}%</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="${goalPercent}" aria-valuemin="0" aria-valuemax="100" aria-label="Today's goal">
            <span style="width:${goalPercent}%"></span>
          </div>
          <p class="muted">${goalPercent >= 100 ? 'Goal complete! 🎉' : `${goal - profile.progress.todayLearned} more to reach today's goal.`}</p>
        </article>
      </div>

      <section class="dashboard-card placement-callout" aria-labelledby="placement-title">
        <div>
          <p class="card-kicker">NEW · PLACEMENT CHECK</p>
          <h2 id="placement-title">Not sure where to start?</h2>
          <p class="muted">Take a short check across vocabulary, grammar, articles, sentence structure and reading. We will recommend a starting level.</p>
        </div>
        <button class="primary-button" type="button" data-dashboard-action="placement">Find my level →</button>
      </section>

      <div class="dashboard-stats" aria-label="Learning statistics">
        <div class="stat-card"><span>📚</span><strong>${profile.progress.totalWordsLearned}</strong><small>words learned</small></div>
        <div class="stat-card"><span>🎯</span><strong>${average}%</strong><small>quiz accuracy</small></div>
        <div class="stat-card"><span>🔁</span><strong>${data.dueCount}</strong><small>reviews due</small></div>
        <div class="stat-card"><span>🏆</span><strong>${profile.quizHistory.length}</strong><small>quizzes completed</small></div>
      </div>

      <section class="dashboard-section" aria-labelledby="levels-title">
        <div class="section-heading">
          <div>
            <p class="card-kicker">YOUR PROGRESS</p>
            <h2 id="levels-title">German levels</h2>
          </div>
        </div>
        <div class="level-progress-grid">
          ${data.levels.map((level) => {
            const percent = levelProgress(profile, level.id)
            return `<button class="level-progress-card" type="button" data-dashboard-level="${level.id}">
              <span class="level-badge">${level.id}</span>
              <span class="level-progress-copy"><strong>${escapeHtml(level.title)}</strong><small>${percent}% complete</small></span>
              <span class="mini-progress"><span style="width:${percent}%"></span></span>
            </button>`
          }).join('')}
        </div>
      </section>

      <section class="dashboard-section dashboard-review" aria-labelledby="review-title">
        <div>
          <p class="card-kicker">SMART REVIEW</p>
          <h2 id="review-title">Keep your memory strong</h2>
          <p class="muted">Review words when they are due instead of relearning everything from scratch.</p>
        </div>
        <button class="secondary-button" type="button" data-dashboard-action="review">Review ${data.dueCount} words</button>
      </section>
    </section>
  `
}
