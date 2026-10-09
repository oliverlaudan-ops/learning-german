import { describe, it, expect } from 'vitest'
import { statSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { clips } from '../src/data/goethe-b1-part1'
import { extraParts } from '../src/data/goethe-b1-parts'

const root=resolve(process.cwd())
describe('Bundled Goethe B1 German audio recordings',()=>{
 it('ships eight non-empty MP3s with matching names',()=>{
  for(let i=0;i<8;i++){
   const file=resolve(root,`public/audio/goethe-b1/segment-${i}.mp3`)
   expect(statSync(file).size).toBeGreaterThan(20_000)
   const header=readFileSync(file).subarray(0,3).toString('ascii')
   expect(header==='ID3'||header.startsWith('\ufffd')).toBe(true)
  }
 })
 it('keeps recording manifest in sync with the original scripts',()=>{
  const manifest=JSON.parse(readFileSync(resolve(root,'scripts/goethe-b1-recording-manifest.json'),'utf8')) as {id:number;part:number;script:string}[]
  const expected=[
   ...clips.map(c=>c.text),
   ...extraParts.flatMap(p=>p.segments.map(s=>s.script))
  ]
  expect(manifest).toHaveLength(8)
  expect(manifest.map(m=>m.id)).toEqual([0,1,2,3,4,5,6,7])
  expect(manifest.map(m=>m.part)).toEqual([1,1,1,1,1,2,3,4])
  expect(manifest.map(m=>m.script)).toEqual(expected)
 })
})
