/**
 * Tests for the vocabulary schema validator.
 */

import { describe, it, expect } from 'vitest'
import { parseVocabulary, validateVocabWord, validateVocabulary } from '../src/data/vocabulary-schema'

const validWord = {
  id: 'w1',
  german: 'Haus',
  translation: 'house',
  level: 'A1',
  category: 'Home',
  createdAt: 1,
}

describe('validateVocabWord', () => {
  it('accepts a fully valid entry', () => {
    const issues = validateVocabWord(validWord, 0)
    expect(issues).toEqual([])
  })

  it('rejects missing german', () => {
    const issues = validateVocabWord({ ...validWord, german: '' }, 0)
    expect(issues.some((i) => i.field === 'german')).toBe(true)
  })

  it('rejects invalid level', () => {
    const issues = validateVocabWord({ ...validWord, level: 'X9' }, 0)
    expect(issues.some((i) => i.field === 'level')).toBe(true)
  })

  it('rejects non-string id', () => {
    const issues = validateVocabWord({ ...validWord, id: 123 }, 0)
    expect(issues.some((i) => i.field === 'id')).toBe(true)
  })

  it('rejects negative createdAt', () => {
    const issues = validateVocabWord({ ...validWord, createdAt: -5 }, 0)
    expect(issues.some((i) => i.field === 'createdAt')).toBe(true)
  })
})

describe('validateVocabulary', () => {
  it('returns ok for the bundled JSON', () => {
    // Lazy-import the JSON to avoid a hard module-load failure on tests
    const data = require('../src/data/vocabulary.json')
    const result = validateVocabulary(data)
    // We only assert "ok" if the JSON parses — it should.
    expect(result.ok).toBe(true)
    expect(result.issues).toEqual([])
  })

  it('rejects non-array input', () => {
    const r = validateVocabulary({ not: 'an array' })
    expect(r.ok).toBe(false)
  })

  it('flags duplicate ids', () => {
    const data = [validWord, { ...validWord }]
    const r = validateVocabulary(data)
    expect(r.ok).toBe(false)
    expect(r.issues.some((i) => i.message.includes('duplicate'))).toBe(true)
  })
})

describe('parseVocabulary', () => {
  it('throws a descriptive error on bad data', () => {
    expect(() => parseVocabulary([{ id: 'oops' }])).toThrow(/vocabulary\.json failed schema validation/)
  })
})
