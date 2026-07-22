/**
 * Vocabulary re-export with runtime schema validation.
 *
 * The actual data lives in `vocabulary.json` and is validated at module load
 * via the mini validator in `vocabulary-schema.ts`. This file is the single
 * typed entry point — all other modules import `vocabulary` from here.
 *
 * On validation failure the module throws at import time, which is the
 * intended "fail loudly in dev" behavior.
 */

import rawVocabulary from './vocabulary.json'
import type { VocabWord } from '../types'
import { parseVocabulary } from './vocabulary-schema'

export const vocabulary: readonly VocabWord[] = Object.freeze(parseVocabulary(rawVocabulary))

/** Lookup helper: O(1) by id. Built once at module load. */
const BY_ID: ReadonlyMap<string, VocabWord> = new Map(
  vocabulary.map((w) => [w.id, w] as const),
)

export function findVocabById(id: string): VocabWord | undefined {
  return BY_ID.get(id)
}
