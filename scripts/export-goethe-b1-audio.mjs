/** Convert the original TypeScript-only listening datasets to a recording manifest. */
import ts from 'typescript'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const temp = await mkdtemp(join(tmpdir(), 'goethe-b1-'))
const load = async (source, destination) => {
  const code = await readFile(source, 'utf8')
  const javascript = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 }
  }).outputText
  const output = join(temp, destination)
  await writeFile(output, javascript)
  return import(pathToFileURL(output).href)
}
try {
  const part1 = await load('src/data/goethe-b1-part1.ts', 'part1.mjs')
  const parts = await load('src/data/goethe-b1-parts.ts', 'parts.mjs')
  const texts = [
    ...part1.clips.map((clip, id) => ({ id, title: clip.title, part: 1, script: clip.text })),
    ...parts.extraParts.flatMap(part => part.segments.map((clip, i) => ({
      id: part.id + 3 + i, title: clip.title, part: part.id, script: clip.script
    })))
  ]
  if (texts.length !== 8) throw new Error('Expected eight B1 scripts')
  await writeFile('scripts/goethe-b1-recording-manifest.json', JSON.stringify(texts, null, 2) + '\n')
  console.log('Exported ' + texts.length + ' original B1 scripts')
} finally {
  await rm(temp, { recursive: true, force: true })
}
