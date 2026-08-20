/**
 * Sanity tests for the lesson-content catalogue.
 *
 * The lesson-content layer is the teaching voice of the guided lessons:
 * the goal statement, the "why it matters" framing, two grammar patterns
 * with examples, and a handful of communication phrases the learner can
 * actually use. If it is missing for a chapter, the lesson UI degrades
  * silently to "This guided lesson is coming next." — which is fine for
 * future chapters, but the ones we ship today must have full content.
 */

import { describe, expect, it } from 'vitest'
import { getLessonContent, lessonContent } from './lesson-content'

const SHIPPED_CHAPTERS = [
  'a1-ch1',
  'a1-ch2',
  'a1-ch3',
  'a1-ch4',
  'a1-ch5',
  'a1-ch6',
  'a2-ch1',
] as const

describe('lesson-content catalogue', () => {
  it.each(SHIPPED_CHAPTERS)('has full teaching content for %s', (chapterId) => {
    const content = getLessonContent(chapterId)
    expect(content, `missing lesson content for ${chapterId}`).toBeDefined()
    expect(content!.goal.length).toBeGreaterThan(20)
    expect(content!.whyItMatters.length).toBeGreaterThan(20)
    expect(content!.grammar.length).toBeGreaterThanOrEqual(1)
    for(const rule of content!.grammar) {
      expect(rule.title.length).toBeGreaterThan(0)
      expect(rule.explanation.length).toBeGreaterThan(20)
      expect(rule.examples.length).toBeGreaterThanOrEqual(1)
      for(const example of rule.examples) {
        expect(example.german.length).toBeGreaterThan(0)
        expect(example.english.length).toBeGreaterThan(0)
      }
    }
    expect(content!.communication.length).toBeGreaterThanOrEqual(3)
    for(const phrase of content!.communication) {
      expect(phrase.german.length).toBeGreaterThan(0)
      expect(phrase.english.length).toBeGreaterThan(0)
    }
    expect(content!.tips.length).toBeGreaterThanOrEqual(2)
  })

  it('ships every declared chapter id without duplicates', () => {
    const ids = lessonContent.map((lesson) => lesson.chapterId)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('a2-ch1 (Travel and Transport) — reference content', () => {
  const content = getLessonContent('a2-ch1')

  it('exists and frames travel as the practical outcome', () => {
    expect(content).toBeDefined()
    expect(content!.goal.toLowerCase()).toContain('travel')
    expect(content!.whyItMatters.toLowerCase()).toContain('fahrkarte')
  })

  it('explains the two-way prepositions with paired Wo/Wohin examples', () => {
    const twoWay = content!.grammar.find((r) => /two-way/i.test(r.title))
    expect(twoWay, 'no two-way preposition rule found').toBeDefined()
    const allExamples = twoWay!.examples.map((e) => e.german).join(' ')
    // Wo (location) and Wohin (direction) forms should both appear.
    expect(allExamples).toMatch(/\bam\s+(Bahnhof|Flughafen)/)
    expect(allExamples).toMatch(/\bzum\s+(Bahnhof|Flughafen)/)
  })

  it('teaches the mit + dative transport pattern', () => {
    const transport = content!.grammar.find((r) => /transport/i.test(r.title))
    expect(transport, 'no transport rule found').toBeDefined()
    const allExamples = transport!.examples.map((e) => e.german).join(' ')
    expect(allExamples).toMatch(/mit der Bahn/)
    expect(allExamples).toMatch(/mit dem (Bus|Fahrrad|Zug)/)
  })

  it('uses the core chapter vocabulary the lesson actually teaches', () => {
    const text = content!.grammar.flatMap((r) => r.examples.map((e) => e.german)).join(' ')
      + ' ' + content!.communication.map((p) => p.german).join(' ')
    // The lesson must mention every word that anchors its main grammar
    // patterns or scenarios. Peripheral vocabulary (U-Bahn, Taxi, Auto,
    // Straße, Karte) is fine to teach in a future lesson chapter.
    const coreVocab = ['Zug', 'Bahn', 'Bahnhof', 'Flughafen', 'Bus', 'Fahrrad', 'Fahrkarte', 'Hotel']
    for(const word of coreVocab) {
      expect(text, `a2-ch1 lesson never mentions core vocabulary "${word}"`).toContain(word)
    }
  })
})