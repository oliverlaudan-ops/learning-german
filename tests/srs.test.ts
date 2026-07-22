/**
 * Unit tests for the SRS (Leitner-box) logic.
 */

import { describe, it, expect } from 'vitest'
import {
  applySrsReview,
  boxCounts,
  createSrsEntry,
  getDueSrsWords,
  initSrsForLearnedWord,
  intervalForBox,
  MAX_BOX,
  MIN_BOX,
  SRS_INTERVALS_MS,
} from '../src/srs/srs'
import type { SrsEntry, VocabWord } from '../src/types'

const NOW = 1_700_000_000_000
const day = 24 * 60 * 60 * 1000

const sampleVocab: VocabWord[] = [
  { id: 'a', german: 'A', translation: 'A', level: 'A1', category: 'x', createdAt: 0 },
  { id: 'b', german: 'B', translation: 'B', level: 'A1', category: 'x', createdAt: 0 },
  { id: 'c', german: 'C', translation: 'C', level: 'A1', category: 'x', createdAt: 0 },
]

describe('SRS intervals', () => {
  it('exposes 5 boxes with monotonically increasing intervals', () => {
    expect(SRS_INTERVALS_MS).toHaveLength(6) // index 0 unused
    for (let i = 2; i < SRS_INTERVALS_MS.length; i++) {
      expect(SRS_INTERVALS_MS[i]).toBeGreaterThan(SRS_INTERVALS_MS[i - 1]!)
    }
  })

  it('intervalForBox throws on out-of-range', () => {
    expect(() => intervalForBox(0)).toThrow()
    expect(() => intervalForBox(6)).toThrow()
  })
})

describe('createSrsEntry', () => {
  it('starts in box 1 with next review = 1 day from now', () => {
    const e = createSrsEntry(NOW)
    expect(e.box).toBe(MIN_BOX)
    expect(e.nextReviewAt).toBe(NOW + day)
    expect(e.lastReviewedAt).toBe(0)
    expect(e.correctCount).toBe(0)
    expect(e.wrongCount).toBe(0)
  })
})

describe('applySrsReview', () => {
  it('promotes to box 2 on correct, resets nextReviewAt accordingly', () => {
    const e = createSrsEntry(NOW)
    applySrsReview(e, true, NOW)
    expect(e.box).toBe(2)
    expect(e.nextReviewAt).toBe(NOW + 3 * day)
    expect(e.correctCount).toBe(1)
    expect(e.lastReviewedAt).toBe(NOW)
  })

  it('caps box at MAX_BOX (5) on repeated correct answers', () => {
    const e = createSrsEntry(NOW)
    for (let i = 0; i < 10; i++) applySrsReview(e, true, NOW)
    expect(e.box).toBe(MAX_BOX)
    expect(e.nextReviewAt).toBe(NOW + 30 * day)
  })

  it('resets to box 1 on wrong answer', () => {
    const e = createSrsEntry(NOW)
    applySrsReview(e, true, NOW)
    applySrsReview(e, true, NOW)
    expect(e.box).toBe(3)
    applySrsReview(e, false, NOW)
    expect(e.box).toBe(MIN_BOX)
    expect(e.wrongCount).toBe(1)
    expect(e.nextReviewAt).toBe(NOW + day)
  })
})

describe('initSrsForLearnedWord', () => {
  it('marks one correct and schedules first review', () => {
    const e = initSrsForLearnedWord(NOW)
    expect(e.box).toBe(1)
    expect(e.correctCount).toBe(1)
    expect(e.nextReviewAt).toBe(NOW + day)
  })
})

describe('getDueSrsWords', () => {
  it('returns only words whose nextReviewAt has passed', () => {
    const srs: Record<string, SrsEntry> = {
      a: { box: 2, nextReviewAt: NOW - 1, lastReviewedAt: 0, correctCount: 1, wrongCount: 0 },
      b: { box: 2, nextReviewAt: NOW + day, lastReviewedAt: 0, correctCount: 1, wrongCount: 0 },
      c: { box: 1, nextReviewAt: NOW - day, lastReviewedAt: 0, correctCount: 0, wrongCount: 1 },
    }
    const due = getDueSrsWords(sampleVocab, srs, NOW)
    expect(due.map((w) => w.id).sort()).toEqual(['a', 'c'])
  })

  it('skips words that have no SRS entry', () => {
    const srs: Record<string, SrsEntry> = {}
    const due = getDueSrsWords(sampleVocab, srs, NOW)
    expect(due).toHaveLength(0)
  })
})

describe('boxCounts', () => {
  it('counts entries per box', () => {
    const srs: Record<string, SrsEntry> = {
      a: { box: 1, nextReviewAt: 0, lastReviewedAt: 0, correctCount: 0, wrongCount: 0 },
      b: { box: 1, nextReviewAt: 0, lastReviewedAt: 0, correctCount: 0, wrongCount: 0 },
      c: { box: 3, nextReviewAt: 0, lastReviewedAt: 0, correctCount: 0, wrongCount: 0 },
    }
    const counts = boxCounts(srs)
    expect(counts[1]).toBe(2)
    expect(counts[3]).toBe(1)
    expect(counts[5]).toBe(0)
  })
})
