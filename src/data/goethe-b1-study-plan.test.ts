import {describe,it,expect} from 'vitest'
import {studyWeeks,planIndex,weakestPart,studyAdvice,EXAM_PREP_TARGET} from './goethe-b1-study-plan'
describe('Goethe B1 study plan',()=>{
 it('has a continuous seven-stage schedule before the conservative exam target',()=>{
  expect(studyWeeks).toHaveLength(7)
  expect(EXAM_PREP_TARGET).toBe('2026-11-21')
  expect(planIndex(new Date(2026,9,9))).toBe(0)
  expect(planIndex(new Date(2026,9,20))).toBe(1)
  expect(planIndex(new Date(2026,10,10))).toBe(4)
  expect(planIndex(new Date(2026,10,21))).toBe(6)
 })
 it('finds the weakest proportionally scored part from the most recent attempt',()=>{
  expect(weakestPart([])).toBeUndefined()
  expect(weakestPart([{byPart:[10,5,2,8]}])).toBe(3)
  expect(weakestPart([{byPart:[1,5,7,8]},{byPart:[10,5,7,3]}])).toBe(4)
 })
 it('uses weak areas for later revision, but weekly tasks at the beginning',()=>{
  expect(studyAdvice(new Date(2026,9,14),[{byPart:[1,5,7,8]}])).not.toContain('Teil 1 gezielt')
  expect(studyAdvice(new Date(2026,10,10),[{byPart:[1,5,7,8]}])).toContain('Teil 1 gezielt')
 })
})
