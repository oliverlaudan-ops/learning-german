/**
 * Spaced-repetition (Leitner-Box) logic.
 *
 * Box 1 is the entry box. Correct answers move up to box 5, wrong answers
 * reset to box 1. The interval for each box is the time until the next
 * review is due.
 */

import type { SrsEntry } from '../types'
import type { VocabWord } from '../types'

/**
 * Index 0 is unused (boxes are 1..5).
 * Higher boxes = longer interval = more confident memory.
 */
export const SRS_INTERVALS_MS: readonly number[] = Object.freeze([
  0, // 0: unused
  24 * 60 * 60 * 1000, // 1: 1 day
  3 * 24 * 60 * 60 * 1000, // 2: 3 days
  7 * 24 * 60 * 60 * 1000, // 3: 7 days
  14 * 24 * 60 * 60 * 1000, // 4: 14 days
  30 * 24 * 60 * 60 * 1000, // 5: 30 days
])

export const MAX_BOX = 5
export const MIN_BOX = 1

export function createSrsEntry(now: number = Date.now()): SrsEntry {
  return {
    box: MIN_BOX,
    nextReviewAt: now + SRS_INTERVALS_MS[MIN_BOX]!,
    lastReviewedAt: 0,
    correctCount: 0,
    wrongCount: 0,
  }
}

export function intervalForBox(box: number): number {
  if (!Number.isInteger(box) || box < MIN_BOX || box > MAX_BOX) {
    throw new Error(`Invalid SRS box ${box}; expected ${MIN_BOX}..${MAX_BOX}`)
  }
  return SRS_INTERVALS_MS[box]!
}

/**
 * Update an SRS entry in place after a review. Returns the same object for
 * chaining. The caller is responsible for saving the surrounding state.
 *
 * @param entry  Mutable entry in `profile.srsState`
 * @param correct  Whether the user answered correctly
 * @param now  Reference timestamp (ms). Tests inject this.
 */
export function applySrsReview(entry: SrsEntry, correct: boolean, now: number = Date.now()): SrsEntry {
  entry.lastReviewedAt = now

  if (correct) {
    entry.correctCount++
    if (entry.box < MAX_BOX) entry.box++
    entry.nextReviewAt = now + intervalForBox(entry.box)
  } else {
    entry.wrongCount++
    entry.box = MIN_BOX
    entry.nextReviewAt = now + intervalForBox(MIN_BOX)
  }
  return entry
}

/**
 * Initialize an SRS entry for a freshly-learned word (box 1, scheduled
 * one interval out, marked as one correct answer).
 */
export function initSrsForLearnedWord(now: number = Date.now()): SrsEntry {
  return {
    box: MIN_BOX,
    nextReviewAt: now + intervalForBox(MIN_BOX),
    lastReviewedAt: 0,
    correctCount: 1,
    wrongCount: 0,
  }
}

/**
 * Return all vocabulary words that have an SRS entry whose `nextReviewAt`
 * has passed.
 */
export function getDueSrsWords(
  vocab: readonly VocabWord[],
  srsState: Readonly<Record<string, SrsEntry>>,
  now: number = Date.now(),
): VocabWord[] {
  return vocab.filter((w) => {
    const srs = srsState[w.id]
    return !!srs && srs.nextReviewAt <= now
  })
}

/**
 * Group an SRS state dict into per-box counts. Index 0 is unused.
 */
export function boxCounts(srsState: Readonly<Record<string, SrsEntry>>, maxBox: number = MAX_BOX): number[] {
  const counts = new Array(maxBox + 1).fill(0)
  for (const entry of Object.values(srsState)) {
    if (entry.box >= 0 && entry.box <= maxBox) counts[entry.box]++
  }
  return counts
}
