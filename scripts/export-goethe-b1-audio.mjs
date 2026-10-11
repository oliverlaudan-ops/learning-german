/** Export all four original B1 listening sets into a reproducible manifest. */
import ts from 'typescript'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const temp=await mkdtemp(join(tmpdir(),'goethe-b1-'))
async function load(path,name) {
 const source=await readFile(path,'utf8')
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText
 const file=join(temp,name+'.mjs')
 await writeFile(file,js)
 return import(pathToFileURL(file).href)
}
try {
 const p1=await load('src/data/goethe-b1-part1.ts','p1')
 const p234=await load('src/data/goethe-b1-parts.ts','parts')
 // Alternative sets import *only types*; transpilation erases the import.
 const alt=await load('src/data/goethe-b1-alternative-sets.ts','alts')
 const first=[
  ...p1.clips.map((s,i)=>({id:i,part:1,title:s.title,script:s.text})),
  ...p234.extraParts.flatMap(p=>p.segments.map((s,i)=>({id:p.id+3+i,part:p.id,title:s.title,script:s.script})))
 ]
 const rows=[
  ...first.map(s=>({setId:'set-1',...s})),
  ...alt.alternativeExamSets.flatMap(set=>set.segments.map((s,id)=>({
   setId:set.id,id,part:s.part,title:s.title,script:s.script
  })))
 ]
 if(rows.length!==32)throw new Error('Expected exactly 32 texts, got '+rows.length)
 for(const id of ['set-1','set-2','set-3','set-4']){
  const clips=rows.filter(s=>s.setId===id)
  if(clips.length!==8||clips.some((s,i)=>s.id!==i||s.part!==[1,1,1,1,1,2,3,4][i]))throw new Error('Invalid '+id)
 }
 await writeFile('scripts/goethe-b1-recording-manifest.json',JSON.stringify(rows,null,2)+'\n')
 console.log('Exported '+rows.length+' scripts across four sets')
}finally{await rm(temp,{recursive:true,force:true})}
