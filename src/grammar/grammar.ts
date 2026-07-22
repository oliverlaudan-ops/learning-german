/**
 * Grammar quiz logic — pure, no DOM.
 *
 * The renderer in `src/ui/grammar-ui.ts` consumes this module to drive the
 * flow. Each exercise is either:
 *   - a cloze multiple-choice (legacy behaviour) — answer is selected from
 *     `options` and compared to `correctAnswer`, OR
 *   - a sentence-construction tile question (new mode) — the user clicks
 *     tiles in order; we compare the resulting sequence to the correct
 *     sentence using the umlaut/whitespace-tolerant comparator from
 *     `src/quiz/quiz.ts`.
 */

import type { GrammarExercise } from '../types'
import { sentencesEqual, tokenizeSentence } from '../quiz/quiz'

export interface GrammarQuizState {
  exercises: GrammarExercise[]
  index: number
  correct: number
}

export function createGrammarQuizState(exercises: GrammarExercise[]): GrammarQuizState {
  return { exercises, index: 0, correct: 0 }
}

export function currentExercise(state: GrammarQuizState): GrammarExercise | undefined {
  return state.exercises[state.index]
}

export function isFinished(state: GrammarQuizState): boolean {
  return state.index >= state.exercises.length
}

/**
 * Score a cloze answer. Strict, case-insensitive equality.
 */
export function scoreCloze(exercise: GrammarExercise, answer: string): boolean {
  return answer === exercise.correctAnswer
}

/**
 * Tokenize the correct sentence for the tile UI.
 */
export function tilesForExercise(exercise: GrammarExercise): string[] {
  return tokenizeSentence(exercise.correctAnswer)
}

/**
 * Score a sentence-construction answer. The user's tiles are passed in the
 * order they were clicked.
 */
export function scoreSentenceConstruction(exercise: GrammarExercise, userTiles: readonly string[]): boolean {
  return sentencesEqual(userTiles, exercise.correctAnswer)
}

/**
 * Pick a shuffled subset for a grammar quiz session.
 */
export function pickExercises(
  pool: readonly GrammarExercise[],
  count: number,
  rng: () => number = Math.random,
): GrammarExercise[] {
  if (pool.length === 0) return []
  const copy = pool.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = copy[i]!
    copy[i] = copy[j]!
    copy[j] = tmp
  }
  return copy.slice(0, Math.min(count, copy.length))
}
