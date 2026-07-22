/**
 * Quiz types and pure quiz-generation logic.
 *
 * This module is pure (no DOM, no localStorage) so it can be tested in
 * isolation. The UI layer imports from here and wires up event listeners.
 */

import type { CEFRLevel, QuizMode, VocabWord } from '../types'
import { getDueSrsWords } from '../srs/srs'
import type { SrsEntry } from '../types'

/** Cloze-style vocabulary question (de-en, en-de, audio, sentence-completion, type-sentence). */
export interface VocabQuizQuestion {
  word: VocabWord
  /** Renderer hint: click an option vs type an answer. */
  type: 'multiple-choice' | 'write'
  mode: QuizMode
  /** 3 wrong + 1 correct, randomly ordered. Undefined for write-mode. */
  options?: string[]
  /** The accepted correct answer (already resolved to the target language). */
  correctAnswer: string
  /** Subtitle shown to the user. */
  prompt: string
  /** Pre-blanked sentence (only set for sentence-completion / type-sentence). */
  contextSentence?: string
}

/**
 * Sentence-construction question: arrange word tiles into a correct sentence.
 * Used for grammar / Sentence-Construction mix mode.
 */
export interface SentenceConstructionQuestion {
  id: string
  /** Original correct sentence (e.g. "Es ist wichtig, viel zu lernen."). */
  sentence: string
  /** Tiles to show, derived from `sentence` (word tokens, shuffled). */
  tiles: string[]
  /** When true, the renderer should use the tiles UI; otherwise cloze. */
  mode: 'tiles' | 'cloze'
  /** Optional clue shown above the tiles. */
  prompt: string
  /** Cloze version with `___` blanks (only for `cloze` mode). */
  clozeSentence?: string
  /** Per-blank accepted answers (case/whitespace/umlaut tolerant at compare time). */
  clozeAnswers?: string[]
}

export type QuizQuestion = VocabQuizQuestion | SentenceConstructionQuestion

export interface GenerateOptions {
  chapterId?: string
  levelId?: CEFRLevel
  count: number
  mode: QuizMode
  isReview?: boolean
}

export interface GenerateContext {
  vocab: readonly VocabWord[]
  /** chapter id -> lesson object (with wordIds). */
  lessons: ReadonlyArray<{ id: string; wordIds: string[] }>
  /** SRS state for review mode. */
  srsState?: Readonly<Record<string, SrsEntry>>
  /** RNG — inject for deterministic tests. Defaults to Math.random. */
  rng?: () => number
  /** Reference timestamp for SRS lookup. */
  now?: number
}

const DEFAULT_RNG: () => number = Math.random

function pickRandom<T>(arr: readonly T[], rng: () => number, n: number): T[] {
  const copy = arr.slice()
  // Fisher–Yates (partial) with injected RNG
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = tmp
  }
  return copy.slice(0, n)
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Replace the first whole-word occurrence of `german` in `example` with `___`.
 * Falls back to the example unchanged if no match.
 */
function blankOutWord(example: string, german: string): string {
  const re = new RegExp(`\\b${escapeRegExp(german)}\\b`, 'gi')
  return example.replace(re, '___')
}

function shuffleInPlace<T>(arr: T[], rng: () => number): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = tmp
  }
}

/**
 * Generate a vocab-quiz pool. The `mode` determines prompt direction and
 * whether a cloze sentence is built.
 */
export function generateQuiz(options: GenerateOptions, ctx: GenerateContext): VocabQuizQuestion[] {
  const rng = options.isReview ? (ctx.rng ?? DEFAULT_RNG) : (ctx.rng ?? DEFAULT_RNG)
  const now = ctx.now ?? Date.now()

  // 1) build pool
  let pool: VocabWord[] = ctx.vocab.slice()
  if (options.isReview) {
    pool = getDueSrsWords(pool, ctx.srsState ?? {}, now)
  } else if (options.chapterId) {
    const lesson = ctx.lessons.find((l) => l.id === options.chapterId)
    const ids = new Set(lesson?.wordIds ?? [])
    pool = pool.filter((w) => ids.has(w.id))
  } else if (options.levelId) {
    pool = pool.filter((w) => w.level === options.levelId)
  }

  if (pool.length === 0) return []
  const selected = pickRandom(pool, rng, Math.min(options.count, pool.length))

  return selected.map((word) => {
    const mode = options.mode
    const isMultipleChoice =
      mode === 'de-en' ||
      mode === 'en-de' ||
      mode === 'sentence-completion'

    let correctAnswer = ''
    let contextSentence: string | undefined

    switch (mode) {
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
      case 'type-sentence':
        if (word.example) contextSentence = blankOutWord(word.example, word.german)
        correctAnswer = word.german
        break
    }

    let optionsForQuestion: string[] | undefined
    if (isMultipleChoice) {
      const others = ctx.vocab.filter((w) => w.id !== word.id)
      const wrongPick = pickRandom(others, rng, 3).map((w) =>
        mode === 'en-de' ? w.translation : w.german,
      )
      optionsForQuestion = [...wrongPick, correctAnswer]
      shuffleInPlace(optionsForQuestion, rng)
    }

    return {
      word,
      type: isMultipleChoice ? 'multiple-choice' : 'write',
      mode,
      options: optionsForQuestion,
      correctAnswer,
      prompt: '',
      contextSentence,
    }
  })
}

/**
 * Tokenize a sentence into word tiles. Punctuation is preserved as separate
 * tiles so the user can rebuild the original sentence exactly.
 */
export function tokenizeSentence(sentence: string): string[] {
  // Split on whitespace; keep trailing/leading punctuation as part of the token.
  return sentence
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter((t) => t.length > 0)
}

/**
 * Compare a user-built sentence to the correct one.
 * - case-insensitive
 * - whitespace-tolerant (collapse runs of whitespace)
 * - umlaut-tolerant (ae/oe/ue/ss ↔ ä/ö/ü/ß)
 */
export function sentencesEqual(userInput: readonly string[], correct: string): boolean {
  const norm = (s: string): string =>
    s
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      // umlaut fallbacks: if the input uses ASCII, accept the umlaut as match
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')

  const userText = norm(userInput.join(' ').replace(/\s+([.,;:!?])/g, '$1'))
  const target = norm(correct.replace(/\s+([.,;:!?])/g, '$1'))
  return userText === target
}
