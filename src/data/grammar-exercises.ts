/**
 * Grammar exercise data — index module.
 *
 * Aggregates the legacy cloze set with the two new categories (genitiv,
 * infinitiv-zu). The renderer iterates this list and decides per exercise
 * whether to show a cloze multiple-choice or a tile (sentence-construction)
 * UI. The selection rule is convention-based (see `isTileExercise`) so we
 * don't have to widen the `GrammarExercise` type — every existing call site
 * stays green.
 */

import type { GrammarExercise } from '../types'
import { grammarExercises as legacyExercises } from './grammar-exercises-legacy'
import { genitivExercises } from './grammar-exercises-genitiv'
import { infinitivExercises } from './grammar-exercises-infinitiv'

export const grammarExercises: GrammarExercise[] = [
  ...legacyExercises,
  ...genitivExercises,
  ...infinitivExercises,
]

export { genitivExercises, infinitivExercises }

/**
 * Convention: an exercise whose `correctAnswer` looks like a full sentence
 * (multi-word, capitalised) AND uses the marker options-array shape is
 * treated as a sentence-construction tile question.
 */
export function isTileExercise(ex: GrammarExercise): boolean {
  const c = ex.correctAnswer
  if (!c.includes(' ')) return false
  if (!/^[A-ZÄÖÜ]/.test(c)) return false
  return ex.options.length === 2 && ex.options[0] === 'Build the sentence'
}

/** Sorted, deduplicated category list — used by the Practice tab. */
export const GRAMMAR_CATEGORIES: readonly string[] = Array.from(
  new Set(grammarExercises.map((e) => e.category)),
).sort()
