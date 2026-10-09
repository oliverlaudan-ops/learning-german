import { describe, expect, it } from 'vitest'
import { extraParts } from '../data/goethe-b1-parts'
import { clips } from '../data/goethe-b1-part1'
import { fullExamQuestionCount, gradeB1 } from './goethe-b1-full-exam'

describe('Goethe B1 four-part practice set', () => {
  it('has five short Teil 1 texts and 30 total questions', () => {
    expect(clips).toHaveLength(5)
    expect(clips.every(clip => clip.questions.length === 2)).toBe(true)
    expect(extraParts.map(part => part.id)).toEqual([2, 3, 4])
    expect(extraParts.map(part => part.segments.flatMap(s => s.questions).length)).toEqual([5, 7, 8])
    expect(fullExamQuestionCount).toBe(30)
  })
  it('enforces Goethe-like listening limits in the practice data', () => {
    expect(extraParts.map(p => p.segments[0].maxPlays)).toEqual([1, 1, 2])
  })
  it('has valid, German-language questions with one valid answer each', () => {
    const all = [
      ...clips.flatMap(c => c.questions),
      ...extraParts.flatMap(p => p.segments.flatMap(s => s.questions))
    ]
    for (const q of all) {
      expect(q.prompt.length).toBeGreaterThan(10)
      expect(q.options.length).toBeGreaterThanOrEqual(2)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(q.options.length)
      expect(q.explanation.length).toBeGreaterThan(5)
    }
  })
  it('scores unanswered questions as incorrect and keeps per-part totals', () => {
    expect(gradeB1({})).toEqual({correct: 0, total: 30, percent: 0, byPart: [0, 0, 0, 0]})
    const answers: Record<number,number> = {}
    let id = 0
    for (const clip of clips) for (const q of clip.questions) answers[id++] = q.answer
    for (const part of extraParts) for (const segment of part.segments) for (const q of segment.questions) answers[id++] = q.answer
    expect(gradeB1(answers)).toEqual({correct: 30, total: 30, percent: 100, byPart: [10, 5, 7, 8]})
    answers[0] = answers[0] === 0 ? 1 : 0
    expect(gradeB1(answers)).toEqual({correct: 29, total: 30, percent: 97, byPart: [9, 5, 7, 8]})
  })
})
