/** Export the current TypeScript listening dataset into a JSON recording manifest. */
import { build } from 'esbuild'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const tmp=await mkdtemp(join(tmpdir(),'goethe-b1-'))
try {
 const inputs=['src/data/goethe-b1-part1.ts','src/data/goethe-b1-parts.ts']
 await build({entryPoints:inputs,bundle:true,platform:'node',format:'esm',outdir:tmp})
 const part1=await import(pathToFileURL(join(tmp,'goethe-b1-part1.js')).href)
 const parts=await import(pathToFileURL(join(tmp,'goethe-b1-parts.js')).href)
 const texts=[
  ...part1.clips.map((c,i)=>({id:i,title:c.title,part:1,script:c.text})),
  ...parts.extraParts.flatMap(p=>p.segments.map((s,i)=>({id:p.id+3+i,title:s.title,part:p.id,script:s.script})))
 ]
 if(texts.length!==8)throw new Error('Expected eight scripts')
 await writeFile('scripts/goethe-b1-recording-manifest.json',JSON.stringify(texts,null,2)+'\n')
 console.log('Exported '+texts.length+' B1 audio scripts')
} finally {await rm(tmp,{recursive:true,force:true})}
