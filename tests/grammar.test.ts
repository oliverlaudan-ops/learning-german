/**
 * Tests for grammar quiz helpers and the new exercise categories.
 */

import { describe, it, expect } from 'vitest'
import {
  createGrammarQuizState,
  currentExercise,
  isFinished,
  pickExercises,
  scoreCloze,
  scoreSentenceConstruction,
  tilesForExercise,
} from '../src/grammar/grammar'
import {
  grammarExercises,
  genitivExercises,
  infinitivExercises,
  isTileExercise,
  GRAMMAR_CATEGORIES,
} from '../src/data/grammar-exercises'
import type { GrammarExercise } from '../src/types'

describe('exercise categories', () => {
  it('contains 15-20 genitiv exercises', () => {
    expect(genitivExercises.length).toBeGreaterThanOrEqual(15)
    expect(genitivExercises.length).toBeLessThanOrEqual(20)
  })

  it('contains 15-20 infinitiv-zu exercises', () => {
    expect(infinitivExercises.length).toBeGreaterThanOrEqual(15)
    expect(infinitivExercises.length).toBeLessThanOrEqual(20)
  })

  it('all exercise ids are unique across the merged list', () => {
    const ids = new Set(grammarExercises.map((e) => e.id))
    expect(ids.size).toBe(grammarExercises.length)
  })
})

describe('isTileExercise', () => {
  it('flags sentence-style correctAnswer as a tile exercise', () => {
    const tile: GrammarExercise = {
      id: 't1', type: 'case', question: 'Build: Hallo Welt',
      options: ['Build the sentence', 'Skip'],
      correctAnswer: 'Hallo Welt',
      explanation: '', level: 'A1', category: 'genitiv',
    }
    expect(isTileExercise(tile)).toBe(true)
  })

  it('does not flag cloze multiple-choice', () => {
    const cloze: GrammarExercise = {
      id: 'c1', type: 'case', question: 'Das Buch ___ Lehrers.',
      options: ['des', 'der', 'dem'],
      correctAnswer: 'des',
      explanation: '', level: 'A1', category: 'genitiv',
    }
    expect(isTileExercise(cloze)).toBe(false)
  })
})

describe('scoreCloze', () => {
  it('requires exact match (case-sensitive by design)', () => {
    const ex: GrammarExercise = {
      id: 'x', type: 'case', question: 'q', options: ['a', 'b'],
      correctAnswer: 'a', explanation: '', level: 'A1', category: 'x',
    }
    expect(scoreCloze(ex, 'a')).toBe(true)
    expect(scoreCloze(ex, 'A')).toBe(false)
  })
})

describe('scoreSentenceConstruction', () => {
  it('accepts the original order', () => {
    const ex: GrammarExercise = {
      id: 'x', type: 'case', question: 'q', options: ['Build the sentence'],
      correctAnswer: 'Hallo Welt', explanation: '', level: 'A1', category: 'x',
    }
    expect(scoreSentenceConstruction(ex, ['Hallo', 'Welt'])).toBe(true)
  })

  it('rejects a wrong order', () => {
    const ex: GrammarExercise = {
      id: 'x', type: 'case', question: 'q', options: ['Build the sentence'],
      correctAnswer: 'Hallo Welt', explanation: '', level: 'A1', category: 'x',
    }
    expect(scoreSentenceConstruction(ex, ['Welt', 'Hallo'])).toBe(false)
  })

  it('accepts ASCII fallbacks for umlauts', () => {
    const ex: GrammarExercise = {
      id: 'x', type: 'case', question: 'q', options: ['Build the sentence'],
      correctAnswer: 'Das Auto ist schön.', explanation: '', level: 'A1', category: 'x',
    }
    expect(scoreSentenceConstruction(ex, ['Das', 'Auto', 'ist', 'schoen', '.'])).toBe(true)
  })
})

describe('tilesForExercise', () => {
  it('tokenizes the correctAnswer into tiles', () => {
    const ex: GrammarExercise = {
      id: 'x', type: 'case', question: 'q', options: ['Build the sentence'],
      correctAnswer: 'Es ist wichtig, viel zu lernen.', explanation: '', level: 'A1', category: 'x',
    }
    expect(tilesForExercise(ex)).toEqual(['Es', 'ist', 'wichtig,', 'viel', 'zu', 'lernen.'])
  })
})

describe('pickExercises', () => {
  it('returns a shuffled subset of size N', () => {
    const pool: GrammarExercise[] = Array.from({ length: 10 }, (_, i) => ({
      id: 'p' + i, type: 'case', question: 'q', options: ['a'],
      correctAnswer: 'a', explanation: '', level: 'A1', category: 'x',
    }))
    const picked = pickExercises(pool, 3)
    expect(picked).toHaveLength(3)
    // ids should all be from the original pool
    for (const p of picked) {
      expect(pool.find((x) => x.id === p.id)).toBeDefined()
    }
  })

  it('returns everything if count > pool size', () => {
    const pool: GrammarExercise[] = [1, 2].map((i) => ({
      id: 'p' + i, type: 'case', question: 'q', options: ['a'],
      correctAnswer: 'a', explanation: '', level: 'A1', category: 'x',
    }))
    expect(pickExercises(pool, 5)).toHaveLength(2)
  })
})

describe('grammar state machine', () => {
  it('progresses index and reports finished', () => {
    const pool: GrammarExercise[] = [1, 2].map((i) => ({
      id: 'p' + i, type: 'case', question: 'q', options: ['a'],
      correctAnswer: 'a', explanation: '', level: 'A1', category: 'x',
    }))
    const state = createGrammarQuizState(pool)
    expect(isFinished(state)).toBe(false)
    expect(currentExercise(state)?.id).toBe('p1')
    state.index++
    expect(currentExercise(state)?.id).toBe('p2')
    state.index++
    expect(isFinished(state)).toBe(true)
    expect(currentExercise(state)).toBeUndefined()
  })
})

describe('category list', () => {
  it('includes the new categories', () => {
    expect(GRAMMAR_CATEGORIES).toContain('genitiv')
    expect(GRAMMAR_CATEGORIES).toContain('infinitiv-zu')
  })
})
