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
  'a2-ch2',
  'a2-ch3',
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

describe('a2-ch2 (Work and Profession) — reference content', () => {
  const content = getLessonContent('a2-ch2')

  it('exists and frames work as the practical outcome', () => {
    expect(content).toBeDefined()
    expect(content!.goal.toLowerCase()).toContain('work')
    expect(content!.whyItMatters.toLowerCase()).toContain('beruf')
  })

  it('teaches the "ich arbeite als + Beruf" pattern', () => {
    const alsRule = content!.grammar.find((r) => /als\s*\+\s*Beruf/i.test(r.title) || /arbeite als/.test(r.title))
    expect(alsRule, 'no "als + Beruf" rule found').toBeDefined()
    const allExamples = alsRule!.examples.map((e) => e.german).join(' ')
    expect(allExamples).toMatch(/arbeitet als \w+/)
    expect(allExamples).toMatch(/was bist du von Beruf/i)
  })

  it('teaches the modal-verbs-at-work pattern', () => {
    const modal = content!.grammar.find((r) => /modal/i.test(r.title))
    expect(modal, 'no modal-verb rule found').toBeDefined()
    const allExamples = modal!.examples.map((e) => e.german).join(' ')
    // Case-insensitive match so the test does not break when the example
    // happens to start a sentence with a capitalised modal verb.
    const lower = allExamples.toLowerCase()
    expect(lower).toMatch(/\bmuss\b/)
    expect(lower).toMatch(/\bdarf\b/)
    expect(lower).toMatch(/\bkann\b/)
  })

  it('uses the core chapter vocabulary the lesson actually teaches', () => {
    const text = content!.grammar.flatMap((r) => r.examples.map((e) => e.german)).join(' ')
      + ' ' + content!.communication.map((p) => p.german).join(' ')
    // Core: the chapter's most teachable professions + work concepts that
    // anchor the patterns. Peripheral vocabulary (Lehrer, Lehrerin, Arzt,
    // Ärztin, Bürokauffrau, Büro, Chef, Kollege, Pause) is fine to teach
    // in a future lesson chapter.
    // The vocab check is case-insensitive and accepts any conjugation:
    // "arbeiten" can appear as "Ich arbeite" / "Er arbeitet".
    const lower = text.toLowerCase()
    const coreVocab = ['ingenieur', 'arbeit', 'beruf', 'büro', 'urlaub', 'gehalt']
    for(const word of coreVocab) {
      expect(lower, `a2-ch2 lesson never mentions core vocabulary "${word}"`).toMatch(new RegExp(`\\b${word}`, 'i'))
    }
  })
})

describe('a2-ch3 (Health) — reference content', () => {
  const content = getLessonContent('a2-ch3')

  it('exists and frames health as a real-life scenario', () => {
    expect(content).toBeDefined()
    expect(content!.goal.toLowerCase()).toContain('symptom')
    expect(content!.whyItMatters.toLowerCase()).toMatch(/hurts|pharmacy|doctor/)
  })

  it('teaches the "ich habe + Symptom" pattern with haben', () => {
    // The rule title uses the first-person finite form ("habe") because it
    // is the form learners will actually say. Match either.
    const haben = content!.grammar.find((r) => /habe|haben/i.test(r.title))
    expect(haben, 'no "habe/haben + Symptom" rule found').toBeDefined()
    const allExamples = haben!.examples.map((e) => e.german).join(' ')
    expect(allExamples.toLowerCase()).toMatch(/ich habe\s+\w+/)
    expect(allExamples.toLowerCase()).toMatch(/kopfschmerzen/)
    expect(allExamples.toLowerCase()).toMatch(/fieber/)
  })

  it('teaches the "mir tut X weh" dative construction', () => {
    const weh = content!.grammar.find((r) => /weh|dative/i.test(r.title) || /body parts/i.test(r.title))
    expect(weh, 'no dative / "weh" rule found').toBeDefined()
    const allExamples = weh!.examples.map((e) => e.german).join(' ')
    const lower = allExamples.toLowerCase()
    expect(lower).toMatch(/mir tut/)
    expect(lower).toMatch(/weh/)
  })

  it('uses the core chapter vocabulary the lesson actually teaches', () => {
    const text = content!.grammar.flatMap((r) => r.examples.map((e) => e.german)).join(' ')
      + ' ' + content!.communication.map((p) => p.german).join(' ')
    const lower = text.toLowerCase()
    // Core: the chapter's anchor symptoms and care locations. Peripheral
    // body parts (Hand, Fuß, Auge) are fine to teach in a follow-up.
    const coreVocab = ['kopf', 'ohr', 'fieber', 'kopfschmerzen', 'arzt', 'apotheke', 'krankenwagen']
    for(const word of coreVocab) {
      expect(lower, `a2-ch3 lesson never mentions core vocabulary "${word}"`).toMatch(new RegExp(`\\b${word}`, 'i'))
    }
  })
})