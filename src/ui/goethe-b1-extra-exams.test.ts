import {describe,expect,it} from 'vitest'
import {examSets,gradeB1} from './goethe-b1-full-exam'
import {listeningProgress} from '../data/goethe-b1-study-plan'
describe('Four complete B1 listening practice sets',()=>{
 it('provides one original and three new sets with 30 unique questions each',()=>{
   expect(examSets.map(s=>s.id)).toEqual(['set-1','set-2','set-3','set-4'])
   const scripts=new Set<string>()
   for(const set of examSets){
     expect(set.segments).toHaveLength(8)
     expect(set.segments.map(s=>s.part)).toEqual([1,1,1,1,1,2,3,4])
     expect(set.segments.map(s=>s.maxPlays)).toEqual([2,2,2,2,2,1,1,2])
     expect([1,2,3,4].map(part=>set.segments.filter(s=>s.part===part).reduce((n,s)=>n+s.questions.length,0))).toEqual([10,5,7,8])
     expect(set.segments.flatMap(s=>s.questions)).toHaveLength(30)
     for(const segment of set.segments){
       expect(segment.script.length).toBeGreaterThan(95)
       expect(scripts.has(segment.script)).toBe(false)
       scripts.add(segment.script)
       for(const q of segment.questions){
         expect(q.prompt.length).toBeGreaterThan(10)
         expect(q.options.length).toBeGreaterThanOrEqual(2)
         expect(q.answer).toBeGreaterThanOrEqual(0)
         expect(q.answer).toBeLessThan(q.options.length)
         expect(q.explanation.length).toBeGreaterThan(8)
       }
     }
   }
   expect(scripts.size).toBe(32)
 })
 it('scores each set independently with correctly aligned question indexes',()=>{
   for(const set of examSets){
     const answers:Record<number,number>={}
     for(const segment of set.segments)segment.questions.forEach((q,i)=>answers[segment.firstQuestion-1+i]=q.answer)
     expect(gradeB1(answers,set.id)).toEqual({correct:30,total:30,percent:100,byPart:[10,5,7,8]})
     expect(gradeB1({},set.id)).toEqual({correct:0,total:30,percent:0,byPart:[0,0,0,0]})
   }
 })
 it('summarizes normalized outcomes and distinct sets',()=>{
   expect(listeningProgress([])).toEqual({attemptCount:0,setCount:0,byPartPercent:[0,0,0,0],weakestPart:undefined})
   const report=listeningProgress([{setId:'set-2',byPart:[8,5,3,8]},{setId:'set-3',byPart:[10,4,7,4]}])
   expect(report.attemptCount).toBe(2)
   expect(report.setCount).toBe(2)
   expect(report.byPartPercent).toEqual([90,90,71,75])
   expect(report.weakestPart).toBe(3)
 })
})
