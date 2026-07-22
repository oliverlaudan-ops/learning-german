/**
 * Minimal runtime schema validator for vocabulary data.
 *
 * The project intentionally avoids extra deps like zod/ajv. This validator is
 * strict enough to catch the bugs a hand-edited JSON file would introduce
 * (missing fields, wrong types, out-of-range levels, etc.) and fail loudly at
 * module load.
 */

import type { VocabWord, CEFRLevel } from '../types'

export interface ValidationIssue {
  index: number
  field: string
  message: string
}

export interface ValidationResult {
  ok: boolean
  issues: ValidationIssue[]
}

const ALLOWED_LEVELS: ReadonlySet<string> = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
const ID_RE = /^[a-z0-9-]+$/i

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Validate a single vocab word. Returns the list of issues found.
 */
export function validateVocabWord(raw: unknown, index: number): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const fail = (field: string, message: string) =>
    issues.push({ index, field, message })

  if (!isObject(raw)) {
    fail('<root>', 'Vocab entry must be an object')
    return issues
  }

  if (typeof raw.id !== 'string' || !ID_RE.test(raw.id)) {
    fail('id', `must be a non-empty string matching ${ID_RE} (got ${JSON.stringify(raw.id)})`)
  }
  if (typeof raw.german !== 'string' || raw.german.trim().length === 0) {
    fail('german', 'must be a non-empty string')
  }
  if (typeof raw.translation !== 'string' || raw.translation.trim().length === 0) {
    fail('translation', 'must be a non-empty string')
  }
  if (raw.article !== undefined && typeof raw.article !== 'string') {
    fail('article', 'must be a string when present')
  }
  if (raw.plural !== undefined && typeof raw.plural !== 'string') {
    fail('plural', 'must be a string when present')
  }
  if (raw.example !== undefined && typeof raw.example !== 'string') {
    fail('example', 'must be a string when present')
  }
  if (raw.exampleTranslation !== undefined && typeof raw.exampleTranslation !== 'string') {
    fail('exampleTranslation', 'must be a string when present')
  }
  if (typeof raw.level !== 'string' || !ALLOWED_LEVELS.has(raw.level)) {
    fail('level', `must be one of ${[...ALLOWED_LEVELS].join(', ')} (got ${JSON.stringify(raw.level)})`)
  }
  if (typeof raw.category !== 'string' || raw.category.trim().length === 0) {
    fail('category', 'must be a non-empty string')
  }
  if (typeof raw.createdAt !== 'number' || !Number.isFinite(raw.createdAt) || raw.createdAt < 0) {
    fail('createdAt', 'must be a non-negative finite number')
  }

  return issues
}

/**
 * Validate the full vocabulary list. Checks structural correctness plus
 * uniqueness of ids.
 */
export function validateVocabulary(raw: unknown): ValidationResult {
  if (!Array.isArray(raw)) {
    return { ok: false, issues: [{ index: -1, field: '<root>', message: 'vocabulary must be an array' }] }
  }

  const issues: ValidationIssue[] = []
  const seenIds = new Map<string, number>()

  raw.forEach((entry, i) => {
    issues.push(...validateVocabWord(entry, i))
    if (isObject(entry) && typeof entry.id === 'string') {
      const prev = seenIds.get(entry.id)
      if (prev !== undefined) {
        issues.push({ index: i, field: 'id', message: `duplicate id "${entry.id}" (first seen at index ${prev})` })
      } else {
        seenIds.set(entry.id, i)
      }
    }
  })

  return { ok: issues.length === 0, issues }
}

/**
 * Validate and narrow the raw input to a typed `VocabWord[]`. Throws a
 * descriptive Error if validation fails — the app should not start with a
 * corrupt vocabulary file.
 */
export function parseVocabulary(raw: unknown): VocabWord[] {
  const result = validateVocabulary(raw)
  if (!result.ok) {
    const lines = result.issues.slice(0, 25).map(
      (i) => `  [${i.index}] ${i.field}: ${i.message}`,
    )
    const more = result.issues.length > 25 ? `\n  ... and ${result.issues.length - 25} more` : ''
    throw new Error(
      `vocabulary.json failed schema validation (${result.issues.length} issue${result.issues.length === 1 ? '' : 's'}):\n${lines.join('\n')}${more}`,
    )
  }
  return raw as VocabWord[]
}

export const __test_internals = { ALLOWED_LEVELS, ID_RE }
export type { CEFRLevel }
