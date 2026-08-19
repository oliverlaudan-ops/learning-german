import './placement-test.css'
import { lessons } from '../data/lessons'
import { evaluatePlacement, placementQuestions, type PlacementLevel } from '../data/placement-test'
import type { PlacementSnapshot } from '../types'
import { savePlacementSnapshot } from '../state/state'
import { __appState } from './ui'

type PlacementWindow = Window & {
  showTab?: (tabName: string) => void
  startQuiz?: (chapterId?: string, mode?: 'de-en' | 'en-de' | 'audio-dictation' | 'sentence-completion' | 'type-sentence', isReview?: boolean) => void
}

const chapterById = new Map(lessons.map((lesson) => [lesson.id, lesson]))

function chapterTitle(id: string): string {
  return chapterById.get(id)?.title ?? id
}

/**
 * Cross-browser speech synthesis trigger. Returns a small handle that the
 * caller can use to test whether the browser actually exposed a speak path
 * (e.g. for tests, or to fall back to a visible transcript).
 *
 * Kept as a named export so tests can stub it via dependency injection or by
 * mocking `window.speechSynthesis` on the happy-dom environment.
 */
export interface SpeakHandle {
  ok: boolean
  reason?: 'unsupported' | 'empty'
}

export function speakGerman(text: string): SpeakHandle {
  const trimmed = text.trim()
  if (!trimmed) return { ok: false, reason: 'empty' }
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined
  if (!synth || typeof synth.speak !== 'function') {
    return { ok: false, reason: 'unsupported' }
  }
  try {
    synth.cancel()
    const utter = new SpeechSynthesisUtterance(trimmed)
    utter.lang = 'de-DE'
    utter.rate = 0.9
    synth.speak(utter)
    return { ok: true }
  } catch {
    return { ok: false, reason: 'unsupported' }
  }
}

export function renderPlacementTest(target: HTMLElement): void {
  let index = 0
  const answers: Record<string, number> = {}

  const render = (): void => {
    const question = placementQuestions[index]
    if (!question) {
      renderResult(target, answers)
      return
    }

    const selected = answers[question.id]
    const audioBlock = question.audio
      ? `<button class="placement-audio" type="button" data-action="play-audio" aria-label="Play German audio">
          <span aria-hidden="true">🔊</span> Play German
        </button>
        <p class="placement-audio-note" data-audio-status>Tap to hear the sentence, then choose the meaning.</p>`
      : ''

    target.innerHTML = `
      <section class="placement-shell">
        <div class="placement-hero">
          <span class="placement-kicker">FIND YOUR LEVEL</span>
          <h1>Where should you start?</h1>
          <p>This short check looks at vocabulary, grammar, articles, sentence structure and reading. There is no grade to pass or fail.</p>
        </div>
        <div class="placement-progress"><span style="width:${((index + 1) / placementQuestions.length) * 100}%"></span></div>
        <p class="placement-count">Question ${index + 1} of ${placementQuestions.length} · ${question.level}</p>
        <article class="placement-card">
          <span class="placement-skill">${question.skill.replace('-', ' ')}</span>
          <h2>${question.prompt}</h2>
          ${audioBlock}
          <div class="placement-options">
            ${question.options.map((option, optionIndex) => `
              <button class="placement-option${selected === optionIndex ? ' selected' : ''}" type="button" data-answer="${optionIndex}">
                <span>${String.fromCharCode(65 + optionIndex)}</span>${option}
              </button>
            `).join('')}
          </div>
          <div class="placement-actions">
            <button class="btn secondary" type="button" data-action="back" ${index === 0 ? 'disabled' : ''}>Back</button>
            <button class="btn primary" type="button" data-action="next" ${selected === undefined ? 'disabled' : ''}>${index === placementQuestions.length - 1 ? 'See my result' : 'Next →'}</button>
          </div>
        </article>
      </section>
    `

    target.querySelectorAll<HTMLElement>('[data-answer]').forEach((button) => {
      button.addEventListener('click', () => {
        answers[question.id] = Number(button.dataset.answer)
        render()
      })
    })
    target.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      index = Math.max(0, index - 1)
      render()
    })
    target.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (answers[question.id] === undefined) return
      index += 1
      render()
    })
    target.querySelector<HTMLElement>('[data-action="play-audio"]')?.addEventListener('click', () => {
      if (!question.audio) return
      const status = target.querySelector<HTMLElement>('[data-audio-status]')
      const handle = speakGerman(question.audio)
      if (!handle.ok) {
        if (status) {
          status.textContent = handle.reason === 'unsupported'
            ? `Audio is not available in this browser. The sentence was: “${question.audio}”`
            : 'No audio available for this question.'
        }
      }
    })
  }

  render()
}

function renderResult(target: HTMLElement, answers: Record<string, number>): void {
  const result = evaluatePlacement(answers)
  const levelCopy: Record<PlacementLevel, string> = {
    A1: 'Start with the foundations and build confidence step by step.',
    A2: 'You have a useful foundation. A2 is the recommended starting point.',
    B1: 'You are ready to work toward independent, more natural German.',
  }
  const levelLabel = result.recommendedLevel === 'B1' ? 'B1' : `${result.recommendedLevel} recommended`
  const approximateNote = result.recommendedLevelIsApproximate
    ? '<p class="placement-note">Your A1 and A2 foundations look solid, but some B1 material is still uncertain. We will suggest a refresher where it helps most.</p>'
    : ''

  target.innerHTML = `
    <section class="placement-shell placement-result">
      <div class="placement-hero">
        <span class="placement-kicker">YOUR RESULT</span>
        <h1>${levelLabel}</h1>
        <p>${levelCopy[result.recommendedLevel]}</p>
      </div>
      <div class="placement-level-grid">
        ${(Object.keys(result.percentages) as PlacementLevel[]).map((level) => `
          <article class="placement-level-card">
            <strong>${level}</strong>
            <span>${result.percentages[level]}%</span>
            <div class="placement-mini-bar"><i style="width:${result.percentages[level]}%"></i></div>
          </article>
        `).join('')}
      </div>
      <article class="placement-card">
        <h2>What should you focus on?</h2>
        ${result.focusAreas.length
          ? `<p>Your next useful review areas are <strong>${result.focusAreas.map((skill) => skill.replace('-', ' ')).join(', ')}</strong>.</p>`
          : '<p>Great balance across the tested skills. Keep building on it.</p>'}
        ${approximateNote}
        <p class="placement-note">This is a starting recommendation, not a formal CEFR assessment. The portal can refine it as you learn.</p>
        <button class="btn primary" type="button" data-action="continue">Start with ${escapeHtml(chapterTitle(result.recommendedChapterId))}</button>
        ${result.refresherIds.length ? `
          <div class="placement-refreshers">
            <p class="placement-refreshers-title">Quick refreshers</p>
            <ul>
              ${result.refresherIds.map((id) => `
                <li><button class="placement-refresher" type="button" data-refresher="${escapeHtml(id)}">${escapeHtml(chapterTitle(id))}</button></li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </article>
    </section>
  `

  target.querySelector('[data-action="continue"]')?.addEventListener('click', () => {
    persistPlacement(result)
    openChapter(result.recommendedChapterId)
  })
  target.querySelectorAll<HTMLElement>('[data-refresher]').forEach((button) => {
    const chapterId = button.dataset.refresher
    if (!chapterId) return
    button.addEventListener('click', () => {
      persistPlacement(result)
      openChapter(chapterId)
    })
  })
}

function persistPlacement(result: ReturnType<typeof evaluatePlacement>): void {
  const snapshot: PlacementSnapshot = {
    recommendedLevel: result.recommendedLevel,
    recommendedLevelIsApproximate: result.recommendedLevelIsApproximate,
    recommendedChapterId: result.recommendedChapterId,
    refresherIds: result.refresherIds,
    focusAreas: result.focusAreas,
    percentages: result.percentages,
    completedAt: Date.now(),
  }
  savePlacementSnapshot(__appState, snapshot)
}

function openChapter(chapterId: string): void {
  const appWindow = window as PlacementWindow
  // Prefer the explicit chapter entry point if the host app exposes it; this
  // keeps placement aligned with the "start at a specific chapter" UX.
  if (appWindow.startQuiz) {
    appWindow.startQuiz(chapterId)
    return
  }
  appWindow.showTab?.('learn')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}