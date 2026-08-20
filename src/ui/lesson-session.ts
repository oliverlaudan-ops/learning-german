import type { Chapter } from '../types'
import { getLessonContent } from '../data/lesson-content'
import { vocabulary } from '../data/vocabulary'

type SessionWindow = {
  speakWord?: (text: string) => void
  startQuiz?: (chapterId?: string, mode?: 'de-en' | 'en-de' | 'audio-dictation' | 'sentence-completion' | 'type-sentence', isReview?: boolean) => void
}

const steps = ['Learn', 'Listen', 'Understand', 'Build', 'Speak', 'Real German', 'Review'] as const

type Step = (typeof steps)[number]

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function chapterWords(chapter: Chapter) {
  const byId = new Map(vocabulary.map((word) => [word.id, word] as const))
  return chapter.wordIds.map((id) => byId.get(id)).filter(Boolean)
}

/**
 * Build the sentence the learner is asked to assemble in the Build step.
 *
 * The lesson content sometimes leaves the name as `...` (e.g. "Hallo! Ich
 * heiße …"). We substitute the learner's name so the Build step actually
 * personalises the answer instead of always saying "Anna".
 *
 * If the chapter's first communication phrase has no placeholder, we use it
 * verbatim. The fallback is the same greeting so the Build step is never
 * empty even for chapters without lesson content.
 */
function buildExpectedSentence(
  firstPhrase: { german: string } | undefined,
  learnerName: string,
): string {
  if (!firstPhrase || firstPhrase.german.includes('...') || !firstPhrase.german.trim()) {
    return `Hallo! Ich heiße ${learnerName}.`
  }
  return firstPhrase.german
}

/**
 * Shuffle a copy of the expected sentence so the tile order does not reveal
 * the answer. Deterministic only by design is *not* the goal — variability
 * keeps the exercise from feeling like a fixed memory task.
 */
function shuffleTiles(sentence: string, seed: number): string[] {
  const tokens = sentence.split(/\s+/).filter(Boolean)
  let s = seed || Math.floor(Math.random() * 1e9)
  for (let i = tokens.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[tokens[i], tokens[j]] = [tokens[j], tokens[i]]
  }
  return tokens
}

function stepIndex(step: Step): number {
  return steps.indexOf(step)
}

function renderProgress(step: Step): string {
  return `
    <nav class="guided-progress" aria-label="Lesson progress">
      ${steps.map((item, index) => `
        <span class="guided-step ${index <= stepIndex(step) ? 'is-active' : ''} ${item === step ? 'is-current' : ''}">
          <span>${index + 1}</span>${escapeHtml(item)}
        </span>
      `).join('')}
    </nav>
  `
}

function renderNavigation(step: Step, chapterId: string): string {
  const index = stepIndex(step)
  const previous = index > 0 ? steps[index - 1] : undefined
  const next = index < steps.length - 1 ? steps[index + 1] : undefined
  return `
    <div class="guided-navigation">
      ${previous ? `<button class="btn secondary" type="button" data-guided-step="${previous}">← Back</button>` : '<span></span>'}
      ${next
        ? `<button class="btn primary" type="button" data-guided-step="${next}">Continue →</button>`
        : `<button class="btn primary" type="button" data-guided-review="${escapeHtml(chapterId)}">Start review →</button>`}
    </div>
  `
}

function renderStep(step: Step, chapter: Chapter, learnerName: string): string {
  const content = getLessonContent(chapter.id)
  const words = chapterWords(chapter)
  const firstWord = words[0]
  const firstPhrase = content?.communication[0]

  if (!content) {
    return `<div class="guided-card"><h2>This guided lesson is coming next.</h2><p>For now, use the vocabulary practice for this chapter.</p><button class="btn primary" type="button" data-guided-review="${escapeHtml(chapter.id)}">Start practice →</button></div>`
  }

  switch (step) {
    case 'Learn':
      return `
        <div class="guided-card guided-intro">
          <span class="lesson-kicker">STEP 1 · LEARN</span>
          <h2>${escapeHtml(content.goal)}</h2>
          <p>${escapeHtml(content.whyItMatters)}</p>
          <div class="guided-chips">
            ${words.slice(0, 6).map((word) => `<span>${escapeHtml(word?.article ? `${word.article} ${word.german}` : word?.german || '')}</span>`).join('')}
          </div>
          <div class="guided-callout"><strong>How to learn:</strong> Read each phrase aloud. Do not worry about being perfect yet. First, understand what you are saying.</div>
          ${renderNavigation(step, chapter.id)}
        </div>
      `

    case 'Listen':
      return `
        <div class="guided-card">
          <span class="lesson-kicker">STEP 2 · LISTEN</span>
          <h2>Hear the German before you produce it.</h2>
          <p>Listen several times, then say it yourself. The browser's speech feature is used here, so no audio download is required.</p>
          <div class="guided-listen-card">
            <strong>${escapeHtml(firstPhrase?.german || firstWord?.german || 'Hallo!')}</strong>
            <button class="lesson-audio guided-audio" type="button" data-guided-speak="${escapeHtml(firstPhrase?.german || firstWord?.german || 'Hallo!')}">🔊 Listen</button>
            <span>${escapeHtml(firstPhrase?.english || firstWord?.translation || '')}</span>
          </div>
          <div class="guided-callout"><strong>Tip:</strong> Listen for the rhythm, not just individual sounds.</div>
          ${renderNavigation(step, chapter.id)}
        </div>
      `

    case 'Understand':
      return `
        <div class="guided-card">
          <span class="lesson-kicker">STEP 3 · UNDERSTAND</span>
          <h2>Why does the German look like this?</h2>
          <div class="guided-grammar-grid">
            ${content.grammar.slice(0, 2).map((rule) => `
              <article>
                <h3>${escapeHtml(rule.title)}</h3>
                <p>${escapeHtml(rule.explanation)}</p>
                ${rule.examples.map((example) => `<div class="guided-example"><strong>${escapeHtml(example.german)}</strong><span>${escapeHtml(example.english)}</span></div>`).join('')}
              </article>
            `).join('')}
          </div>
          ${renderNavigation(step, chapter.id)}
        </div>
      `

    case 'Build':
      return renderBuildStep(chapter, firstPhrase, learnerName)

    case 'Speak':
      return `
        <div class="guided-card guided-speak">
          <span class="lesson-kicker">STEP 5 · SPEAK</span>
          <h2>Now say it yourself.</h2>
          <p>Look at the German sentence, listen once, then say it aloud. There is no pressure to sound perfect.</p>
          <blockquote>${escapeHtml(firstPhrase?.german || 'Hallo! Ich heiße ...')}</blockquote>
          <button class="btn secondary" type="button" data-guided-speak="${escapeHtml(firstPhrase?.german || 'Hallo! Ich heiße ...')}">🔊 Hear it again</button>
          <div class="guided-callout"><strong>Practice:</strong> Say it three times. On the third attempt, try without looking at the English translation.</div>
          ${renderNavigation(step, chapter.id)}
        </div>
      `

    case 'Real German':
      return renderRealGermanStep(chapter, firstPhrase, learnerName)

    case 'Review':
      return `
        <div class="guided-card guided-finish">
          <span class="lesson-kicker">STEP 7 · REVIEW</span>
          <h2>Great. Now make it stick.</h2>
          <p>Start a short vocabulary review. Your answers feed the existing learning and SRS system, so today's lesson can influence what you see again later.</p>
          <div class="guided-finish-grid">
            <div><strong>${words.length}</strong><span>lesson words</span></div>
            <div><strong>${content.grammar.length}</strong><span>grammar ideas</span></div>
            <div><strong>${content.communication.length}</strong><span>useful phrases</span></div>
          </div>
          <button class="btn primary" type="button" data-guided-review="${escapeHtml(chapter.id)}">Start vocabulary review →</button>
        </div>
      `
  }
}

function wireBuilder(target: HTMLElement, expected: string[]): void {
  const answer = target.querySelector<HTMLElement>('[data-answer]')
  const feedback = target.querySelector<HTMLElement>('[data-feedback]')
  const tiles = [...target.querySelectorAll<HTMLButtonElement>('[data-tile]')]
  const selected: string[] = []
  const expectedSentence = expected.join(' ')

  const refresh = () => {
    if (answer) answer.textContent = selected.join(' ')
    tiles.forEach((tile) => {
      tile.disabled = selected.includes(tile.dataset.tile || '')
    })
    if (feedback) {
      if (selected.length === expected.length) {
        feedback.textContent = selected.join(' ') === expectedSentence
          ? '✓ Perfect! That is a natural sentence.'
          : 'Almost. Try resetting and check the word order.'
        feedback.className = `guided-feedback ${selected.join(' ') === expectedSentence ? 'is-correct' : 'is-error'}`
      } else {
        feedback.textContent = ''
        feedback.className = 'guided-feedback'
      }
    }
  }

  tiles.forEach((tile) => tile.addEventListener('click', () => {
    const word = tile.dataset.tile
    if (word && selected.length < expected.length) {
      selected.push(word)
      refresh()
    }
  }))

  target.querySelector<HTMLButtonElement>('[data-reset-builder]')?.addEventListener('click', () => {
    selected.splice(0, selected.length)
    refresh()
  })
}

/**
 * Build the Build step's expected sentence and shuffled tile order. The
 * step is exported so a future unit test can verify the shuffle does not
 * silently produce an already-sorted tile list.
 */
export function getBuilderExpected(
  firstPhrase: { german: string } | undefined,
  learnerName: string,
): { expected: string[]; tiles: string[] } {
  const sentence = buildExpectedSentence(firstPhrase, learnerName)
  const expected = sentence.split(/\s+/).filter(Boolean)
  return { expected, tiles: shuffleTiles(sentence, expected.length) }
}

function renderBuildStep(
  chapter: Chapter,
  firstPhrase: { german: string } | undefined,
  learnerName: string,
): string {
  const { expected, tiles } = getBuilderExpected(firstPhrase, learnerName)
  return `
    <div class="guided-card">
      <span class="lesson-kicker">STEP 4 · BUILD</span>
      <h2>Put the sentence together.</h2>
      <p>Tap the words in the right order. This teaches sentence structure instead of asking you to memorise an answer.</p>
      <div class="sentence-builder" data-builder data-expected="${escapeHtml(expected.join(' '))}">
        <div class="sentence-answer" data-answer aria-live="polite"></div>
        <div class="sentence-tiles" data-tiles>
          ${tiles.map((word) => `<button type="button" data-tile="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join('')}
        </div>
        <p class="guided-feedback" data-feedback></p>
        <button class="btn secondary" type="button" data-reset-builder>Reset</button>
      </div>
      ${renderNavigation('Build', chapter.id)}
    </div>
  `
}

function renderRealGermanStep(
  chapter: Chapter,
  _firstPhrase: { german: string; english: string } | undefined,
  learnerName: string,
): string {
  const fallbackYou = `Hallo! Ich heiße ${learnerName}.`
  const fallbackYouEnglish = `Hello! My name is ${learnerName}.`
  return `
    <div class="guided-card">
      <span class="lesson-kicker">STEP 6 · REAL GERMAN</span>
      <h2>Use German in a real situation.</h2>
      <p>Imagine you meet someone for the first time.</p>
      <div class="dialogue">
        <div><span>Other person</span><strong>Hallo! Wie heißt du?</strong><small>Hello! What is your name?</small></div>
        <div class="dialogue-you"><span>You</span><strong>${escapeHtml(fallbackYou)}</strong><small>${escapeHtml(fallbackYouEnglish)}</small></div>
        <div><span>Other person</span><strong>Freut mich!</strong><small>Nice to meet you!</small></div>
      </div>
      <div class="guided-callout"><strong>Your turn:</strong> Say the whole answer aloud.</div>
      ${renderNavigation('Real German', chapter.id)}
    </div>
  `
}

function wireSession(target: HTMLElement, chapter: Chapter, step: Step, learnerName: string): void {
  target.querySelectorAll<HTMLElement>('[data-guided-speak]').forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.dataset.guidedSpeak
      if (text) (window as unknown as SessionWindow).speakWord?.(text)
    })
  })

  target.querySelectorAll<HTMLButtonElement>('[data-guided-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.guidedStep as Step | undefined
      if (next) renderGuidedSession(target, chapter, next, learnerName)
    })
  })

  target.querySelectorAll<HTMLButtonElement>('[data-guided-review]').forEach((button) => {
    button.addEventListener('click', () => {
      const chapterId = button.dataset.guidedReview
      ;(window as unknown as SessionWindow).startQuiz?.(chapterId, 'de-en')
    })
  })

  if (step === 'Build') {
    const builder = target.querySelector<HTMLElement>('[data-builder]')
    const expectedAttr = builder?.dataset.expected
    if (builder && expectedAttr) wireBuilder(builder, expectedAttr.split(/\s+/).filter(Boolean))
  }
}

export function renderGuidedSession(
  target: HTMLElement,
  chapter: Chapter,
  step: Step = 'Learn',
  learnerName: string = 'Anna',
): void {
  target.innerHTML = `
    <section class="guided-session" aria-labelledby="guided-title">
      <div class="guided-header">
        <div>
          <span class="lesson-kicker">${escapeHtml(chapter.level)} · LESSON ${chapter.order}</span>
          <h2 id="guided-title">${escapeHtml(chapter.title)}</h2>
        </div>
        <span class="guided-time">~10–15 min</span>
      </div>
      ${renderProgress(step)}
      ${renderStep(step, chapter, learnerName)}
    </section>
  `
  wireSession(target, chapter, step, learnerName)
}
