import { describe, expect, it } from 'vitest'
import { evaluatePlacement, placementQuestions } from './placement-test'

describe('placement test', () => {
  it('recommends B1 for a strong result across all levels', () => {
    const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.answer]))
    const result = evaluatePlacement(answers)
    expect(result.score).toBe(placementQuestions.length)
    expect(result.recommendedLevel).toBe('B1')
    expect(result.percentages).toEqual({ A1: 100, A2: 100, B1: 100 })
  })

  it('recommends A2 when A1 is strong but A2 is not yet secure', () => {
    const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.level === 'A1' ? question.answer : 0]))
    const result = evaluatePlacement(answers)
    expect(result.percentages.A1).toBe(100)
    expect(result.recommendedLevel).toBe('A2')
  })

  it('recommends A1 when the foundations are not secure', () => {
    const answers = Object.fromEntries(placementQuestions.map((question) => [question.id, question.answer === 0 ? 1 : 0]))
    const result = evaluatePlacement(answers)
    expect(result.recommendedLevel).toBe('A1')
    expect(result.focusAreas.length).toBeGreaterThan(0)
  })
})
