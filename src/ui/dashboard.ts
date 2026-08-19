import type { CEFRLevel, Level, PlacementSnapshot, ProfileState, VocabWord } from '../types'

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

function findChapterById(data: DashboardData, chapterId: string): { level: Level; chapter: Level['chapters'][number] } | undefined {
  for (const level of data.levels) {
    const chapter = level.chapters.find((c) => c.id === chapterId)
    if (chapter) return { level, chapter }
  }
  return undefined
}

const REVIEW_HINT_SKILLS = new Set(['articles', 'cases', 'sentence-order'])

function reviewHintSkills(placement: PlacementSnapshot): string[] {
  return placement.focusAreas.filter((skill) => REVIEW_HINT_SKILLS.has(skill))
}

export function renderDashboard(data: DashboardData): string {
  const { profile } = data
  const placement = profile.placement
  // Continue Learning path:
  // 1) explicit nextChapterId wins
  // 2) otherwise a placement snapshot overrides the next-unfinished-chapter
  //    heuristic with the learner-chosen starting chapter
  // 3) otherwise fall back to the next unfinished chapter
  const explicitNext = data.nextChapterId
    ? findChapterById(data, data.nextChapterId)
    : undefined
  const placementNext = placement ? findChapterById(data, placement.recommendedChapterId) : undefined
  const next = explicitNext ?? placementNext ?? findNextChapter(data)
  const fromPlacement = !explicitNext && placementNext !== undefined && placement !== undefined

  const goal = Math.max(1, profile.progress.dailyGoal)
  const goalPercent = Math.min(100, Math.round((profile.progress.todayLearned / goal) * 100))
  const average = Math.round(profile.progress.averageAccuracy || 0)
  const name = escapeHtml(profile.displayName || 'Learner')

  const refreshersBlock = placement && placement.refresherIds.length
    ? `<section class="dashboard-card placement-refreshers-block" aria-labelledby="placement-refreshers-title">
        <div>
          <p class="card-kicker">FROM YOUR PLACEMENT · QUICK REFRESHERS</p>
          <h2 id="placement-refreshers-title">Close small gaps first</h2>
          <p class="muted">Your placement flagged skills that benefit from a short targeted review.</p>
        </div>
        <ul class="dashboard-refresher-list">
          ${placement.refresherIds.map((id) => {
            const chapter = findChapterById(data, id)
            const title = chapter ? escapeHtml(chapter.chapter.title) : escapeHtml(id)
            return `<li><button class="placement-refresher" type="button" data-dashboard-action="refresher" data-chapter-id="${escapeHtml(id)}">${title}</button></li>`
          }).join('')}
        </ul>
      </section>`
    : ''

  const reviewHint = placement ? reviewHintSkills(placement) : []
  const reviewHintBlock = reviewHint.length
    ? `<p class="placement-review-hint">Your placement check showed <strong>${reviewHint.map((s) => s.replace('-', ' ')).join(', ')}</strong> could use attention. Smart Review will surface these first.</p>`
    : ''

  const placementCallout = placement
    ? `<section class="dashboard-card placement-callout placement-callout--done" aria-labelledby="placement-title">
        <div>
          <p class="card-kicker">PLACEMENT CHECK · ${placement.recommendedLevel}${placement.recommendedLevelIsApproximate ? ' (approximate)' : ''}</p>
          <h2 id="placement-title">Your recommended path is set</h2>
          <p class="muted">Started from ${placement.recommendedLevel} · A1 ${placement.percentages.A1}% · A2 ${placement.percentages.A2}% · B1 ${placement.percentages.B1}%.</p>
        </div>
        <button class="secondary-button" type="button" data-dashboard-action="retake-placement">Retake placement</button>
      </section>`
    : `<section class="dashboard-card placement-callout" aria-labelledby="placement-title">
        <div>
          <p class="card-kicker">NEW · PLACEMENT CHECK</p>
          <h2 id="placement-title">Not sure where to start?</h2>
          <p class="muted">Take a short check across vocabulary, grammar, articles, sentence structure and reading. We will recommend a starting level.</p>
        </div>
        <button class="primary-button" type="button" data-dashboard-action="placement">Find my level →</button>
      </section>`

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
        <article class="dashboard-card dashboard-continue${fromPlacement ? ' dashboard-continue--from-placement' : ''}">
          <div class="card-icon">▶️</div>
          <div class="card-content">
            <p class="card-kicker">${fromPlacement ? 'FROM YOUR PLACEMENT · CONTINUE LEARNING' : 'CONTINUE LEARNING'}</p>
            <h2>${next ? escapeHtml(next.chapter.title) : 'You completed every chapter!'}</h2>
            <p>${next ? `${escapeHtml(next.level.title)} · ${fromPlacement ? 'Your recommended starting point' : 'Your next step'}` : 'Review your knowledge and keep it fresh.'}</p>
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

      ${placementCallout}
      ${refreshersBlock}

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
          ${reviewHintBlock}
        </div>
        <button class="secondary-button" type="button" data-dashboard-action="review">Review ${data.dueCount} words</button>
      </section>
    </section>
  `
}
