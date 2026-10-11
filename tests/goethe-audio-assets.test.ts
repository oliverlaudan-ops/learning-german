import { describe, it, expect } from 'vitest'
import { statSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { clips } from '../src/data/goethe-b1-part1'
import { extraParts } from '../src/data/goethe-b1-parts'
import { alternativeExamSets } from '../src/data/goethe-b1-alternative-sets'

const root=resolve(process.cwd())
describe('Bundled Goethe B1 German audio recordings',()=>{
 it('ships eight non-empty MP3s with matching names',()=>{
  for(const setId of ['set-1','set-2','set-3','set-4']){
   for(let i=0;i<8;i++){
    const filename=setId==='set-1'
     ? `public/audio/goethe-b1/segment-${i}.mp3`
     : `public/audio/goethe-b1/${setId}/segment-${i}.mp3`
    const file=resolve(root,filename)
    expect(statSync(file).size,filename).toBeGreaterThan(20_000)
    const header=readFileSync(file).subarray(0,3).toString('ascii')
    expect(header==='ID3'||header.startsWith('\\ufffd'),filename).toBe(true)
   }
  }
 })
 it('keeps recording manifest in sync with the original scripts',()=>{
  const manifest=JSON.parse(readFileSync(resolve(root,'scripts/goethe-b1-recording-manifest.json'),'utf8')) as {setId:string;id:number;part:number;script:string}[]
  const expected=[
   ...clips.map(c=>c.text),
   ...extraParts.flatMap(p=>p.segments.map(s=>s.script)),
   ...alternativeExamSets.flatMap(set=>set.segments.map(s=>s.script))
  ]
  expect(manifest).toHaveLength(32)
  expect(manifest.map(m=>m.id)).toEqual(Array.from({length:4},()=>[0,1,2,3,4,5,6,7]).flat())
  expect(manifest.map(m=>m.part)).toEqual(Array.from({length:4},()=>[1,1,1,1,1,2,3,4]).flat())
  expect(manifest.map(m=>m.setId)).toEqual(['set-1','set-2','set-3','set-4'].flatMap(id=>Array(8).fill(id)))
  expect(manifest.map(m=>m.script)).toEqual(expected)
 })
})
