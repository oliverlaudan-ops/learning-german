/**
 * Unit tests for the quiz generation and sentence-construction helpers.
 */

import { describe, it, expect } from 'vitest'
import {
  generateQuiz,
  sentencesEqual,
  tokenizeSentence,
} from '../src/quiz/quiz'
import type { VocabWord } from '../src/types'

const NOW = 1_700_000_000_000

const vocab: VocabWord[] = [
  { id: 'w1', german: 'Haus', translation: 'house', level: 'A1', category: 'Home', createdAt: 0,
    example: 'Das Haus ist groß.', exampleTranslation: 'The house is big.' },
  { id: 'w2', german: 'Auto', translation: 'car', level: 'A1', category: 'Travel', createdAt: 0,
    example: 'Das Auto ist schnell.', exampleTranslation: 'The car is fast.' },
  { id: 'w3', german: 'Baum', translation: 'tree', level: 'A1', category: 'Nature', createdAt: 0 },
  { id: 'w4', german: 'Wohnung', translation: 'apartment', level: 'A1', category: 'Home', createdAt: 0,
    example: 'Meine Wohnung ist klein.', exampleTranslation: 'My apartment is small.' },
  { id: 'w5', german: 'Wohnungen', translation: 'apartments', level: 'A1', category: 'Home', createdAt: 0 },
]

const lessons = [
  { id: 'ch1', wordIds: ['w1', 'w2'] },
  { id: 'ch2', wordIds: ['w3', 'w4'] },
]

// Deterministic RNG for tests: returns a fixed sequence so we can assert
// on the order. Values are in (0,1) so the Fisher-Yates picks a known index.
function makeRng(seq: number[]): () => number {
  let i = 0
  return () => {
    const v = seq[i % seq.length]!
    i++
    return v
  }
}

describe('generateQuiz', () => {
  it('returns an empty list when pool is empty (unknown level)', () => {
    const result = generateQuiz(
      { levelId: 'C1', count: 5, mode: 'de-en' },
      { vocab, lessons, rng: Math.random },
    )
    expect(result).toEqual([])
  })

  it('respects count limit and pool membership', () => {
    const result = generateQuiz(
      { levelId: 'A1', count: 3, mode: 'de-en' },
      { vocab, lessons, rng: Math.random },
    )
    expect(result.length).toBe(3)
    for (const q of result) {
      expect(q.mode).toBe('de-en')
      expect(q.options).toHaveLength(4)
      expect(q.options).toContain(q.correctAnswer)
    }
  })

  it('chapter pool restricts questions to that chapter words', () => {
    const result = generateQuiz(
      { chapterId: 'ch1', count: 10, mode: 'de-en' },
      { vocab, lessons, rng: Math.random },
    )
    expect(result.length).toBe(2) // only 2 words in ch1
    const ids = result.map((q) => q.word.id).sort()
    expect(ids).toEqual(['w1', 'w2'])
  })

  it('review mode requires SRS state with due words', () => {
    const srs = {
      w1: { box: 2, nextReviewAt: NOW - 1, lastReviewedAt: 0, correctCount: 1, wrongCount: 0 },
    }
    const result = generateQuiz(
      { count: 5, mode: 'de-en', isReview: true },
      { vocab, lessons, srsState: srs, now: NOW, rng: Math.random },
    )
    expect(result).toHaveLength(1)
    expect(result[0]!.word.id).toBe('w1')
  })

  it('sentence-completion mode blanks out the german word in the example', () => {
    const result = generateQuiz(
      { chapterId: 'ch1', count: 5, mode: 'sentence-completion' },
      { vocab, lessons, rng: Math.random },
    )
    const w1q = result.find((q) => q.word.id === 'w1')!
    expect(w1q.contextSentence).toBe('Das ___ ist groß.')
    expect(w1q.correctAnswer).toBe('Haus')
  })

  it('audio-dictation is write-mode (no options)', () => {
    const result = generateQuiz(
      { chapterId: 'ch1', count: 5, mode: 'audio-dictation' },
      { vocab, lessons, rng: Math.random },
    )
    expect(result[0]!.type).toBe('write')
    expect(result[0]!.options).toBeUndefined()
  })
})

describe('tokenizeSentence', () => {
  it('splits on whitespace and preserves punctuation', () => {
    expect(tokenizeSentence('Hallo, wie geht es dir?')).toEqual([
      'Hallo,',
      'wie',
      'geht',
      'es',
      'dir?',
    ])
  })

  it('handles extra whitespace', () => {
    expect(tokenizeSentence('  eins   zwei  ')).toEqual(['eins', 'zwei'])
  })
})

describe('sentencesEqual', () => {
  it('matches identical sequences (case-insensitive)', () => {
    expect(sentencesEqual(['Hallo', 'Welt'], 'Hallo Welt')).toBe(true)
    expect(sentencesEqual(['HALLO', 'WELT'], 'hallo welt')).toBe(true)
  })

  it('collapses runs of whitespace', () => {
    expect(sentencesEqual(['Hallo', 'Welt'], 'Hallo   Welt')).toBe(true)
  })

  it('accepts ASCII fallbacks for umlauts', () => {
    expect(sentencesEqual(['Auto', 'schoen'], 'Auto schön')).toBe(true)
    expect(sentencesEqual(['gross'], 'groß')).toBe(true)
  })

  it('rejects wrong order', () => {
    expect(sentencesEqual(['Welt', 'Hallo'], 'Hallo Welt')).toBe(false)
  })

  it('ignores extra space before punctuation', () => {
    expect(sentencesEqual(['Hallo', 'Welt', '.'], 'Hallo Welt.')).toBe(true)
  })
})
