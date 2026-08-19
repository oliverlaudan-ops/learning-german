import { describe, expect, it } from 'vitest'
import { evaluatePlacement, placementQuestions } from './placement-test'

function wrongAnswer(question: { options: string[]; answer: number }): number {
  return (question.answer + 1) % question.options.length
}

describe('placement test', () => {
  it('recommends B1 for a strong result across all levels', () => {
    const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.answer]))
    const result = evaluatePlacement(answers)
    expect(result.score).toBe(placementQuestions.length)
    expect(result.recommendedLevel).toBe('B1')
    expect(result.recommendedLevelIsApproximate).toBe(false)
    expect(result.percentages).toEqual({ A1: 100, A2: 100, B1: 100 })
    expect(result.recommendedChapterId).toBe('b1-ch1')
  })

  it('recommends A2 when A1 is strong but A2 is not yet secure', () => {
    const answers = Object.fromEntries(
      placementQuestions.map((question) => [question.id, question.level === 'A1' ? question.answer : wrongAnswer(question)]),
    )
    const result = evaluatePlacement(answers)
    expect(result.percentages.A1).toBe(100)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedChapterId).toBe('a2-ch1')
    expect(result.refresherIds.length).toBeGreaterThan(0)
  })

  it('recommends A1 when the foundations are not secure', () => {
    const answers = Object.fromEntries(
      placementQuestions.map((question) => [question.id, question.answer === 0 ? 1 : 0]),
    )
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('A1')
    expect(result.recommendedChapterId).toBe('a1-ch1')
    expect(result.refresherIds).toEqual([])
    expect(result.focusAreas.length).toBeGreaterThan(0)
  })

  it('flags the recommendation as approximate when A1+A2 are strong but B1 is partial', () => {
    // A1 + A2 all correct; mark exactly 3 of 7 B1 questions correct (~43%),
    // which is below the B1 threshold (≥50%) and above the approximate floor (≥30%).
    const b1Ids = placementQuestions.filter((q) => q.level === 'B1').map((q) => q.id)
    const correctB1Ids = new Set(b1Ids.slice(0, 3))
    const answers: Record<string, number> = {}
    for (const q of placementQuestions) {
      if (q.level === 'B1') {
        answers[q.id] = correctB1Ids.has(q.id) ? q.answer : wrongAnswer(q)
      } else {
        answers[q.id] = q.answer
      }
    }
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedLevelIsApproximate).toBe(true)
    expect(result.recommendedChapterId).toBe('a2-ch1')
  })

  it('returns A2 without approximate flag when A2 is solid but B1 is empty', () => {
    const answers: Record<string, number> = {}
    for (const q of placementQuestions) {
      if (q.level === 'B1') answers[q.id] = wrongAnswer(q)
      else answers[q.id] = q.answer
    }
    const result = evaluatePlacement(answers)
    expect(result.percentages.B1).toBe(0)
    expect(result.recommendedLevel).toBe('A2')
    expect(result.recommendedLevelIsApproximate).toBe(false)
  })

  it('suggests an A2 refresher for weak B1 connector skill when B1 is otherwise strong', () => {
    // Strong A1, strong A2, B1 correct on 4 of 7 (~57%) — passes the B1 threshold.
    // Make the connector question wrong so it surfaces as a focus area.
    const b1CorrectIds = new Set([
      'b1-vocab-1',
      'b1-grammar-1',
      'b1-article-1',
      'b1-order-1',
    ])
    const answers: Record<string, number> = {}
    for (const q of placementQuestions) {
      if (q.level === 'B1') {
        answers[q.id] = b1CorrectIds.has(q.id) ? q.answer : wrongAnswer(q)
      } else {
        answers[q.id] = q.answer
      }
    }
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('B1')
    expect(result.focusAreas).toContain('connectors')
    expect(result.refresherIds).toContain('a2-ch1')
  })

  it('caps refresher recommendations at two distinct chapters', () => {
    const answers: Record<string, number> = {}
    for (const q of placementQuestions) {
      answers[q.id] = wrongAnswer(q)
    }
    const result = evaluatePlacement(answers)
    expect(result.refresherIds.length).toBeLessThanOrEqual(2)
    expect(new Set(result.refresherIds).size).toBe(result.refresherIds.length)
  })

  it('never recommends the same chapter as both main path and refresher', () => {
    const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.answer]))
    const result = evaluatePlacement(answers)
    expect(result.refresherIds).not.toContain(result.recommendedChapterId)
  })

  it('returns no refreshers for the A1 recommendation path', () => {
    // A1 result must not pull A2/B1 chapters as refreshers — there is nothing
    // weaker than A1 to refresh from.
    const answers: Record<string, number> = {}
    for (const q of placementQuestions) {
      answers[q.id] = wrongAnswer(q)
    }
    const result = evaluatePlacement(answers)
    if (result.recommendedLevel === 'A1') {
      expect(result.refresherIds).toEqual([])
    }
  })
})