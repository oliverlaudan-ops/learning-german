import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { evaluatePlacement, placementQuestions, type PlacementSkill } from './placement-test'
import { speakGerman } from '../ui/placement-test'

function wrongAnswer(question: { options: string[]; answer: number }): number {
  return (question.answer + 1) % question.options.length
}

function allAnswers(builder: (q: (typeof placementQuestions)[number]) => number): Record<string, number> {
  return Object.fromEntries(placementQuestions.map((q) => [q.id, builder(q)]))
}

function answersByLevel(builder: (q: (typeof placementQuestions)[number]) => number | undefined): Record<string, number> {
  const out: Record<string, number> = {}
  for (const q of placementQuestions) {
    const value = builder(q)
    if (value !== undefined) out[q.id] = value
  }
  return out
}

describe('placement test', () => {
  it('recommends B1 for a strong result across all levels', () => {
    const answers = allAnswers((q) => q.answer)
    const result = evaluatePlacement(answers)
    expect(result.score).toBe(placementQuestions.length)
    expect(result.recommendedLevel).toBe('B1')
    expect(result.recommendedLevelIsApproximate).toBe(false)
    expect(result.percentages).toEqual({ A1: 100, A2: 100, B1: 100 })
    expect(result.recommendedChapterId).toBe('b1-ch1')
  })

  it('recommends A2 when A1 is strong but A2 is not yet secure', () => {
    const answers = allAnswers((q) => (q.level === 'A1' ? q.answer : wrongAnswer(q)))
    const result = evaluatePlacement(answers)
    expect(result.percentages.A1).toBe(100)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedChapterId).toBe('a2-ch1')
    expect(result.refresherIds.length).toBeGreaterThan(0)
  })

  it('recommends A1 when the foundations are not secure', () => {
    const answers = allAnswers((q) => (q.answer === 0 ? 1 : 0))
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('A1')
    expect(result.recommendedChapterId).toBe('a1-ch1')
    expect(result.refresherIds).toEqual([])
    expect(result.focusAreas.length).toBeGreaterThan(0)
  })

  it('flags the recommendation as approximate when A1+A2 are strong but B1 is partial', () => {
    const b1Ids = placementQuestions.filter((q) => q.level === 'B1').map((q) => q.id)
    const correctB1Ids = new Set(b1Ids.slice(0, 3))
    const answers = answersByLevel((q) =>
      q.level === 'B1' ? (correctB1Ids.has(q.id) ? q.answer : wrongAnswer(q)) : q.answer,
    )
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedLevelIsApproximate).toBe(true)
    expect(result.recommendedChapterId).toBe('a2-ch1')
  })

  it('returns A2 without approximate flag when A2 is solid but B1 is empty', () => {
    const answers = answersByLevel((q) => (q.level === 'B1' ? wrongAnswer(q) : q.answer))
    const result = evaluatePlacement(answers)
    expect(result.percentages.B1).toBe(0)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedLevelIsApproximate).toBe(false)
  })

  it('suggests an A2 refresher for weak B1 connector skill when B1 is otherwise strong', () => {
    const b1CorrectIds = new Set(['b1-vocab-1', 'b1-grammar-1', 'b1-article-1', 'b1-order-1'])
    const answers = answersByLevel((q) =>
      q.level === 'B1' ? (b1CorrectIds.has(q.id) ? q.answer : wrongAnswer(q)) : q.answer,
    )
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('B1')
    expect(result.focusAreas).toContain('connectors')
    expect(result.refresherIds).toContain('a2-ch1')
  })

  it('caps refresher recommendations at two distinct chapters', () => {
    const answers = allAnswers(wrongAnswer)
    const result = evaluatePlacement(answers)
    expect(result.refresherIds.length).toBeLessThanOrEqual(2)
    expect(new Set(result.refresherIds).size).toBe(result.refresherIds.length)
  })

  it('never recommends the same chapter as both main path and refresher', () => {
    const answers = allAnswers((q) => q.answer)
    const result = evaluatePlacement(answers)
    expect(result.refresherIds).not.toContain(result.recommendedChapterId)
  })

  it('returns no refreshers for the A1 recommendation path', () => {
    const answers = allAnswers(wrongAnswer)
    const result = evaluatePlacement(answers)
    if (result.recommendedLevel === 'A1') {
      expect(result.refresherIds).toEqual([])
    }
  })

  // -------------------------------------------------------------------------
  // Threshold band tests (Stufe 2c)
  //
  // The recommendation logic uses two thresholds on B1:
  //   * B1 >= 50%  -> escalate to B1 (when A1 + A2 are also >= 70%)
  //   * B1 in [30%, 50%) -> mark the A2 recommendation as "approximate"
  //
  // These tests pin the boundaries so future tuning has a clear target.
  // -------------------------------------------------------------------------

  describe('B1 threshold band', () => {
    function percentagesForB1(correctB1: number): { A1: number; A2: number; B1: number } {
      const correctA1 = placementQuestions.filter((q) => q.level === 'A1').length
      const correctA2 = placementQuestions.filter((q) => q.level === 'A2').length
      return {
        A1: Math.round((correctA1 / placementQuestions.filter((q) => q.level === 'A1').length) * 100),
        A2: Math.round((correctA2 / placementQuestions.filter((q) => q.level === 'A2').length) * 100),
        B1: Math.round((correctB1 / placementQuestions.filter((q) => q.level === 'B1').length) * 100),
      }
    }

    function buildAnswers(b1Correct: number): Record<string, number> {
      const b1Ids = placementQuestions.filter((q) => q.level === 'B1').map((q) => q.id)
      const correct = new Set(b1Ids.slice(0, b1Correct))
      return answersByLevel((q) =>
        q.level === 'B1' ? (correct.has(q.id) ? q.answer : wrongAnswer(q)) : q.answer,
      )
    }

    it('does not mark approximate when B1 is below the lower band (<30%)', () => {
      // A1+A2 solid, B1 1/8 correct (~12%) — well below 30%, no approximate.
      const answers = buildAnswers(1)
      const percentages = percentagesForB1(1)
      expect(percentages.B1).toBeLessThan(30)
      const result = evaluatePlacement(answers)
      expect(result.recommendedLevel).toBe('A2')
      expect(result.recommendedLevelIsApproximate).toBe(false)
    })

    it('marks approximate when B1 sits in the partial band (>=30% and <50%)', () => {
      // B1 3/8 correct (~38%) — inside the approximate band.
      const answers = buildAnswers(3)
      const percentages = percentagesForB1(3)
      expect(percentages.B1).toBeGreaterThanOrEqual(30)
      expect(percentages.B1).toBeLessThan(50)
      const result = evaluatePlacement(answers)
      expect(result.recommendedLevel).toBe('A2')
      expect(result.recommendedLevelIsApproximate).toBe(true)
    })

    it('escalates to B1 once the B1 percentage crosses the 50% threshold', () => {
      // B1 5/8 correct (~62%) — above 50%, B1 escalates.
      const answers = buildAnswers(5)
      const percentages = percentagesForB1(5)
      expect(percentages.B1).toBeGreaterThanOrEqual(50)
      const result = evaluatePlacement(answers)
      expect(result.recommendedLevel).toBe('B1')
    })
  })

  // -------------------------------------------------------------------------
  // Listening skill coverage (Stufe 2a)
  // -------------------------------------------------------------------------

  describe('listening skill', () => {
    it('includes at least one listening question per level that contains listening items', () => {
      const a2 = placementQuestions.filter((q) => q.level === 'A2' && q.skill === 'listening')
      const b1 = placementQuestions.filter((q) => q.level === 'B1' && q.skill === 'listening')
      expect(a2.length).toBeGreaterThanOrEqual(2)
      expect(b1.length).toBeGreaterThanOrEqual(1)
    })

    it('every listening question has a German audio transcript', () => {
      const listening = placementQuestions.filter((q) => q.skill === 'listening')
      expect(listening.length).toBeGreaterThan(0)
      for (const q of listening) {
        expect(q.audio).toBeTruthy()
        expect(q.audio!.trim().length).toBeGreaterThan(0)
      }
    })

    it('treats listening like any other skill in the evaluation pipeline', () => {
      const answers = allAnswers((q) => q.answer)
      const result = evaluatePlacement(answers)
      const listeningSkill: PlacementSkill = 'listening'
      const strengths = result.strengths
      const focusAreas = result.focusAreas
      expect(strengths.includes(listeningSkill) || focusAreas.includes(listeningSkill)).toBe(true)
    })

    it('routes a weak listening skill to the A2 refresher chapter', () => {
      // Wrong only on the listening questions; correct everywhere else.
      const answers = allAnswers((q) => (q.skill === 'listening' ? wrongAnswer(q) : q.answer))
      const result = evaluatePlacement(answers)
      // All A1 + B1 must be correct, A2 mostly correct → A2 or B1 path with refresher.
      expect(result.recommendedLevel !== 'A1').toBe(true)
      expect(result.refresherIds).toContain('a2-ch1')
    })
  })
})

describe('placement speak helper', () => {
  const originalSynth = (globalThis as { speechSynthesis?: unknown }).speechSynthesis

  beforeEach(() => {
    // Reset to a fresh mock before each test so handle leakage between cases
    // cannot mask missing setup.
    delete (globalThis as { speechSynthesis?: unknown }).speechSynthesis
  })

  afterEach(() => {
    if (originalSynth === undefined) {
      delete (globalThis as { speechSynthesis?: unknown }).speechSynthesis
    } else {
      ;(globalThis as { speechSynthesis?: unknown }).speechSynthesis = originalSynth
    }
    vi.restoreAllMocks()
  })

  it('returns unsupported when speechSynthesis is missing', () => {
    const result = speakGerman('Hallo')
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('unsupported')
  })

  it('returns empty for blank input without touching the browser API', () => {
    const speak = vi.fn()
    ;(globalThis as { speechSynthesis?: unknown }).speechSynthesis = { speak, cancel: vi.fn() }
    const result = speakGerman('   ')
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('empty')
    expect(speak).not.toHaveBeenCalled()
  })

  it('cancels any in-flight utterance and speaks the new German sentence', () => {
    const cancel = vi.fn()
    const speak = vi.fn()
    const ctorSpy = vi.fn(function Ctor(this: SpeechSynthesisUtterance, text: string) {
      this.text = text
      this.lang = ''
      this.rate = 1
    })
    ;(globalThis as { speechSynthesis?: unknown }).speechSynthesis = {
      speak,
      cancel,
    }
    ;(globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance =
      ctorSpy as unknown as typeof SpeechSynthesisUtterance

    const handle = speakGerman('Ich gehe heute ins Kino.')
    expect(handle.ok).toBe(true)
    expect(cancel).toHaveBeenCalledTimes(1)
    expect(speak).toHaveBeenCalledTimes(1)
    expect(ctorSpy).toHaveBeenCalledWith('Ich gehe heute ins Kino.')
    const uttered = speak.mock.calls[0]?.[0] as SpeechSynthesisUtterance
    expect(uttered.lang).toBe('de-DE')
    expect(uttered.rate).toBeCloseTo(0.9)
  })

  it('returns unsupported if speechSynthesis.speak throws', () => {
    ;(globalThis as { speechSynthesis?: unknown }).speechSynthesis = {
      speak: vi.fn(() => {
        throw new Error('boom')
      }),
      cancel: vi.fn(),
    }
    const result = speakGerman('Hallo')
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('unsupported')
  })
})