import './lesson.css'
import type { Chapter, VocabWord } from '../types'
import { vocabulary } from '../data/vocabulary'
import { getLessonContent } from '../data/lesson-content'
import { renderGuidedSession } from './lesson-session'
import { __getProfile } from './ui'

type AppWindow = {
  showTab?: (tabName: string) => void
  speakWord?: (text: string) => void
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function wordsForChapter(chapter: Chapter): VocabWord[] {
  const byId = new Map(vocabulary.map((word) => [word.id, word] as const))
  return chapter.wordIds.map((id) => byId.get(id)).filter((word): word is VocabWord => Boolean(word))
}

function wordCard(word: VocabWord): string {
  const displayGerman = word.article && !word.german.startsWith(`${word.article} `)
    ? `${word.article} ${word.german}`
    : word.german
  return `
    <article class="lesson-word-card">
      <div class="lesson-word-main">
        <div>
          <strong>${escapeHtml(displayGerman)}</strong>
          ${word.plural ? `<small>Plural: ${escapeHtml(word.plural)}</small>` : ''}
        </div>
        <button class="lesson-audio" type="button" data-speak="${escapeHtml(word.german)}" aria-label="Listen to ${escapeHtml(word.german)}">🔊</button>
      </div>
      <p class="lesson-translation">${escapeHtml(word.translation)}</p>
      ${word.example ? `<div class="lesson-example"><span>${escapeHtml(word.example)}</span><small>${escapeHtml(word.exampleTranslation || '')}</small></div>` : ''}
    </article>
  `
}

function renderLesson(chapter: Chapter): string {
  const content = getLessonContent(chapter.id)
  const words = wordsForChapter(chapter)

  if (!content) {
    return `
      <section class="lesson-shell">
        <button class="lesson-back" type="button" data-action="back">← Back to lessons</button>
        <div class="lesson-hero">
          <span class="lesson-level">${chapter.level}</span>
          <h1>${escapeHtml(chapter.title)}</h1>
          <p>${escapeHtml(chapter.description)}</p>
        </div>
        <div class="lesson-card">
          <h2>This lesson is being prepared</h2>
          <p>The vocabulary is already available. The guided explanation and communication practice for this chapter will be added next.</p>
          <button class="btn primary" type="button" data-action="practice">Start vocabulary practice</button>
        </div>
      </section>
    `
  }

  return `
    <section class="lesson-shell" aria-labelledby="lesson-title">
      <button class="lesson-back" type="button" data-action="back">← Back to lessons</button>
      <div class="lesson-hero">
        <div>
          <span class="lesson-level">${chapter.level} · Lesson ${chapter.order}</span>
          <h1 id="lesson-title">${escapeHtml(chapter.title)}</h1>
          <p>${escapeHtml(content.goal)}</p>
        </div>
        <div class="lesson-purpose">
          <span>WHY THIS MATTERS</span>
          <strong>${escapeHtml(content.whyItMatters)}</strong>
        </div>
      </div>

      <section class="lesson-card lesson-start">
        <div>
          <span class="lesson-kicker">GUIDED LESSON</span>
          <h2>Learn it, understand it, use it.</h2>
          <p>This lesson is now a short guided session: learn, listen, understand, build, speak, use real German, then review.</p>
        </div>
        <button class="btn primary" type="button" data-action="guided">Start guided lesson →</button>
      </section>

      <section class="lesson-section">
        <div class="lesson-section-heading">
          <span class="lesson-kicker">VOCABULARY</span>
          <h2>Words you need</h2>
          <p>Learn the word, its meaning, and how it behaves in a real sentence.</p>
        </div>
        <div class="lesson-word-grid">${words.map(wordCard).join('')}</div>
      </section>

      <section class="lesson-section">
        <div class="lesson-section-heading">
          <span class="lesson-kicker">GRAMMAR</span>
          <h2>What is happening in the sentence?</h2>
        </div>
        <div class="lesson-grammar-grid">
          ${content.grammar.map((rule) => `
            <article class="lesson-card grammar-card">
              <h3>${escapeHtml(rule.title)}</h3>
              <p>${escapeHtml(rule.explanation)}</p>
              <div class="lesson-example-list">
                ${rule.examples.map((example) => `<div><strong>${escapeHtml(example.german)}</strong><span>${escapeHtml(example.english)}</span></div>`).join('')}
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="lesson-section">
        <div class="lesson-section-heading">
          <span class="lesson-kicker">REAL GERMAN</span>
          <h2>Useful phrases</h2>
          <p>These are phrases worth remembering as complete units.</p>
        </div>
        <div class="lesson-phrase-list">
          ${content.communication.map((phrase) => `
            <article class="lesson-phrase">
              <div><strong>${escapeHtml(phrase.german)}</strong><button class="lesson-audio" type="button" data-speak="${escapeHtml(phrase.german)}" aria-label="Listen">🔊</button></div>
              <span>${escapeHtml(phrase.english)}</span>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="lesson-card lesson-tips">
        <span class="lesson-kicker">LEARNING TIPS</span>
        <ul>${content.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul>
      </section>

      <section class="lesson-complete">
        <div>
          <span class="lesson-kicker">READY?</span>
          <h2>Now use what you learned.</h2>
          <p>Start the guided session. The final step sends you into the existing quiz and SRS system.</p>
        </div>
        <button class="btn primary" type="button" data-action="guided">Start guided lesson →</button>
      </section>
    </section>
  `
}

function wireLesson(target: HTMLElement, chapter: Chapter, learnerName: string): void {
  target.querySelectorAll<HTMLElement>('[data-speak]').forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.dataset.speak
      if (text) (window as unknown as AppWindow).speakWord?.(text)
    })
  })

  target.querySelectorAll<HTMLElement>('[data-action="back"]').forEach((button) => {
    button.addEventListener('click', () => {
      delete target.dataset.lessonId
      delete target.dataset.session
      ;(window as unknown as AppWindow).showTab?.('learn')
    })
  })

  target.querySelectorAll<HTMLElement>('[data-action="guided"]').forEach((button) => {
    button.addEventListener('click', () => {
      target.dataset.session = 'guided'
      renderGuidedSession(target, chapter, 'Learn', learnerName)
    })
  })
}

/**
 * Pull the learner's display name from the active profile so the Build and
 * Real German steps personalise the answer. Falls back to "Anna" when no
 * profile name is set so the lesson still has a coherent greeting.
 */
function currentLearnerName(): string {
  try {
    const name = __getProfile().displayName
    if (typeof name === 'string' && name.trim()) return name.trim()
  } catch {
    // no profile yet — fall through
  }
  return 'Anna'
}

export function renderLearnExperience(target: HTMLElement, chapters: readonly Chapter[]): void {
  const learnerName = currentLearnerName()
  const current = target.dataset.lessonId
  if (!current) {
    target.innerHTML = `
      <section class="lesson-index">
        <div class="lesson-index-hero">
          <span class="lesson-kicker">YOUR COURSE</span>
          <h2>Learn German step by step</h2>
          <p>Each lesson now combines vocabulary, simple English explanations, grammar, useful phrases and a guided learning session.</p>
        </div>
        <div class="lesson-index-list">
          ${chapters.map((chapter) => `
            <button class="lesson-index-card" type="button" data-open-lesson="${escapeHtml(chapter.id)}">
              <span class="lesson-index-number">${chapter.order}</span>
              <span><strong>${escapeHtml(chapter.title)}</strong><small>${escapeHtml(chapter.description)}</small></span>
              <span>→</span>
            </button>
          `).join('')}
        </div>
      </section>
    `
    target.querySelectorAll<HTMLElement>('[data-open-lesson]').forEach((button) => {
      button.addEventListener('click', () => {
        target.dataset.lessonId = button.dataset.openLesson || ''
        renderLearnExperience(target, chapters)
      })
    })
    return
  }

  const chapter = chapters.find((item) => item.id === current)
  if (!chapter) {
    delete target.dataset.lessonId
    renderLearnExperience(target, chapters)
    return
  }

  if (target.dataset.session === 'guided') {
    renderGuidedSession(target, chapter, 'Learn', learnerName)
    return
  }

  target.innerHTML = renderLesson(chapter)
  wireLesson(target, chapter, learnerName)
}
