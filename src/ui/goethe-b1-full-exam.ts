/**
 * Four-part, 30-question Goethe-oriented listening PRACTICE.
 * Browser TTS does not provide a reproducible official exam recording.
 */
import { clips } from './goethe-b1'
import { extraParts, type B1Question, type B1Segment } from '../data/goethe-b1-parts'
import './goethe-b1.css'

type Mode = 'learn' | 'exam'
type Segment = B1Segment & { part: number; firstQuestion: number }
const segments: Segment[] = [
  ...clips.map((c, i) => ({title: c.title, script: c.text, maxPlays: 2, questions: c.questions, part: 1, firstQuestion: i * 2 + 1})),
  ...extraParts.flatMap(part => part.segments.map(segment => ({...segment, part: part.id, firstQuestion: part.id === 2 ? 11 : part.id === 3 ? 16 : 23})))
]
export const fullExamQuestionCount = segments.reduce((sum,s) => sum+s.questions.length,0)
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
const storageKey = (id: string) => 'goethe-b1-hoeren-full-v1-' + id
const flattenedQuestions: B1Question[] = segments.flatMap(s=>s.questions)

export function gradeB1(answers: Record<number, number>): {correct: number; total: number; percent: number; byPart: number[]} {
  const correct = flattenedQuestions.filter((q,i)=>answers[i]===q.answer).length
  const byPart = [1,2,3,4].map(part => segments.filter(s=>s.part===part).flatMap(s=>s.questions).filter((q,i)=>{
    const offset = segments.filter(s=>s.part<part).reduce((n,s)=>n+s.questions.length,0)
    return answers[offset+i]===q.answer
  }).length)
  return {correct, total: fullExamQuestionCount, percent: Math.round(100*correct/fullExamQuestionCount), byPart}
}

export function launchB1FullExam(profileId: string): void {
  const overlay = document.createElement('div')
  overlay.className = 'goethe-overlay'
  document.body.append(overlay)
  const oldFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
  let mode: Mode = 'learn'
  let started = false
  let finished = false
  let transfer = false
  let index = 0
  const plays: number[] = Array(segments.length).fill(0)
  const answers: Record<number, number> = {}
  let deadline = 0
  let timer: number | undefined
  let activeUtterance: SpeechSynthesisUtterance | undefined

  const stop = () => { activeUtterance = undefined; if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  const cleanupTimer = () => { if (timer !== undefined) { clearInterval(timer); timer = undefined } }
  const close = () => { stop(); cleanupTimer(); overlay.remove(); oldFocus?.focus() }
  const remaining = () => Math.max(0, Math.ceil((deadline-Date.now())/1000))
  const timeLabel = () => `${Math.floor(remaining()/60)}:${String(remaining()%60).padStart(2,'0')}`
  const save = () => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(storageKey(profileId)) || '[]')
      const history: unknown[] = Array.isArray(raw) ? raw : []
      history.push({ mode, ...gradeB1(answers), completedAt: Date.now() })
      localStorage.setItem(storageKey(profileId), JSON.stringify(history.slice(-30)))
    } catch { /* browsing without storage still allows completion */ }
  }
  const finish = () => {
    if (finished) return
    finished = true
    stop()
    cleanupTimer()
    save()
    render()
  }
  const tick = () => {
    const clock = overlay.querySelector<HTMLElement>('[data-full-clock]')
    if (clock) clock.textContent = timeLabel()
    if (remaining()===0 && !finished) finish()
  }
  const begin = () => {
    started=true
    if(mode==='exam') {
      deadline=Date.now()+40*60*1000
      timer=window.setInterval(tick,1000)
    }
    render()
  }
  const renderQuestion = (q: B1Question, questionIndex: number, feedback: boolean) => {
    const selected=answers[questionIndex]
    return `<fieldset class="goethe-question">
      <legend>${questionIndex+1}. ${escapeHtml(q.prompt)}</legend>
      ${q.options.map((answer,i)=>`<label><input type="radio" name="b1-full-${questionIndex}" value="${i}" ${selected===i?'checked':''} ${finished?'disabled':''}> ${escapeHtml(answer)}</label>`).join('')}
      ${feedback ? `<p class="goethe-feedback">${selected===q.answer?'✓ Richtig':'✗ Nicht richtig'} · ${escapeHtml(q.explanation)}</p>` : ''}
    </fieldset>`
  }
  const render = () => {
    const s=segments[index]
    const score=gradeB1(answers)
    const selectedCount=Object.keys(answers).length
    overlay.innerHTML=`<main class="goethe-panel goethe-full" role="dialog" aria-modal="true" aria-labelledby="goethe-full-title">
      <button type="button" class="btn secondary" data-full-close>← Back to dashboard</button>
      <p class="card-kicker">GOETHE B1 HÖREN · SELF-CREATED PRACTICE</p>
      <h1 id="goethe-full-title">Alle vier Hörteile</h1>
      <p class="goethe-tts-note">Nicht offizieller Goethe-Modellsatz. Die Stimmen werden vorläufig im Browser erzeugt und sind nicht prüfungsidentisch.</p>
      ${!started ? `<p>30 Aufgaben · 4 Teile · 8 Hörtexte. Im Lernmodus gibt es Erklärungen und Transkripte. Der prüfungsähnliche Modus begrenzt Wiedergaben und läuft maximal 40 Minuten; bitte nutze zusätzlich den offiziellen Goethe-Modellsatz.</p>
        <label for="b1-full-mode">Wähle den Modus</label>
        <select id="b1-full-mode"><option value="learn" ${mode==='learn'?'selected':''}>Lernmodus</option><option value="exam" ${mode==='exam'?'selected':''}>Prüfungsähnlicher Modus</option></select>
        <p><button type="button" class="btn primary" data-full-start>Übung starten →</button></p>`
        : finished ? `<h2>Ergebnis: ${score.correct} von ${score.total} (${score.percent} %)</h2>
          <p>Trainingsziel: 80 %. Dieses Ergebnis ist keine offizielle Prüfungsbewertung.</p>
          <p>Teil 1: ${score.byPart[0]}/10 · Teil 2: ${score.byPart[1]}/5 · Teil 3: ${score.byPart[2]}/7 · Teil 4: ${score.byPart[3]}/8</p>
          ${segments.map(segment=>`<section class="goethe-result"><h3>Teil ${segment.part}: ${escapeHtml(segment.title)}</h3>
            ${segment.questions.map((q,j)=>renderQuestion(q,segment.firstQuestion-1+j,true)).join('')}
            <details><summary>Transkript lesen</summary><p lang="de">${escapeHtml(segment.script)}</p></details></section>`).join('')}
          <button type="button" class="btn primary" data-full-again>Neuen Versuch starten</button>`
        : transfer ? `<h2>Antworten kontrollieren</h2>
          <p>Du hast ${selectedCount} von 30 Fragen beantwortet. In der echten Prüfung gibt es fünf Minuten Übertragungszeit; hier kannst du deine Auswahl vor dem Abgeben kontrollieren.</p>
          ${mode==='exam'?`<p><strong>Restzeit: <span data-full-clock>${timeLabel()}</span></strong></p>`:''}
          ${segments.map(segment=>`<section class="goethe-result"><h3>Teil ${segment.part}: ${escapeHtml(segment.title)}</h3>
            ${segment.questions.map((q,j)=>renderQuestion(q,segment.firstQuestion-1+j,false)).join('')}</section>`).join('')}
          <button type="button" class="btn secondary" data-full-return>← Zurück zu den Hörtexten</button>
          <button type="button" class="btn primary" data-full-finish>Antworten abgeben und auswerten</button>`
        : `<div class="goethe-mode"><strong>Teil ${s.part} · Hörtext ${index+1} von ${segments.length}</strong>
          ${mode==='exam'?`<strong>Restzeit: <span data-full-clock>${timeLabel()}</span></strong>`:''}</div>
          <h2>${escapeHtml(s.title)}</h2>
          <p>${s.questions.length} Aufgaben · ${mode==='exam'? `Höchstens ${s.maxPlays} Wiedergabe(n)` : 'Beliebig oft hören'}</p>
          <p><button type="button" class="btn primary" data-full-play ${mode==='exam'&&plays[index]>=s.maxPlays?'disabled':''}>▶ Hörtext abspielen ${mode==='exam'?`(${plays[index]}/${s.maxPlays})`:''}</button></p>
          <p role="status" class="muted" data-full-status>Fragen lesen, dann hören. Unterbrich den Hörtext möglichst nicht.</p>
          ${s.questions.map((q,j)=>renderQuestion(q,s.firstQuestion-1+j,mode==='learn' && answers[s.firstQuestion-1+j]!==undefined)).join('')}
          ${mode==='learn'? `<details><summary>Transkript anzeigen</summary><p lang="de">${escapeHtml(s.script)}</p></details>`:''}
          <nav class="goethe-nav"><button class="btn secondary" data-full-prev ${index===0?'disabled':''}>← Zurück</button>
            <button class="btn primary" data-full-next>${index===segments.length-1?'Antworten kontrollieren →':'Weiter →'}</button></nav>`}
    </main>`
    overlay.querySelector('[data-full-close]')?.addEventListener('click',close)
    overlay.querySelector<HTMLSelectElement>('#b1-full-mode')?.addEventListener('change',ev=>{mode=(ev.target as HTMLSelectElement).value as Mode})
    overlay.querySelector('[data-full-start]')?.addEventListener('click',begin)
    overlay.querySelector('[data-full-again]')?.addEventListener('click',close)
    overlay.querySelector('[data-full-return]')?.addEventListener('click',()=>{transfer=false;render()})
    overlay.querySelector('[data-full-finish]')?.addEventListener('click',finish)
    overlay.querySelector('[data-full-prev]')?.addEventListener('click',()=>{stop();index=Math.max(0,index-1);render()})
    overlay.querySelector('[data-full-next]')?.addEventListener('click',()=>{stop();if(index===segments.length-1)transfer=true;else index++;render()})
    overlay.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{
      const q=Number(input.name.replace('b1-full-',''))
      answers[q]=Number(input.value)
      if(mode==='learn' && !transfer)render()
    }))
    overlay.querySelector('[data-full-play]')?.addEventListener('click',()=>{
      if (!('speechSynthesis' in window)) {
        const el=overlay.querySelector('[data-full-status'); if(el)el.textContent='Dein Browser unterstützt keine deutsche Sprachausgabe.'
        return
      }
      if(mode==='exam'&&plays[index]>=s.maxPlays)return
      stop()
      if(mode==='exam')plays[index]++
      const utterance=new SpeechSynthesisUtterance(s.script)
      activeUtterance=utterance
      utterance.lang='de-DE'
      utterance.rate=mode==='learn'?0.9:1
      const voice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('de'))
      if(voice)utterance.voice=voice
      utterance.onerror=()=>{
        if(activeUtterance!==utterance)return
        const el=overlay.querySelector('[data-full-status]')
        if(el)el.textContent='Die Wiedergabe ist fehlgeschlagen. Bitte die Sprachausgabe-Einstellungen prüfen.'
      }
      window.speechSynthesis.speak(utterance)
      const button=overlay.querySelector<HTMLButtonElement>('[data-full-play]')
      if(button)button.disabled=mode==='exam'&&plays[index]>=s.maxPlays
      const status=overlay.querySelector('[data-full-status]')
      if(status)status.textContent='Wiedergabe gestartet.'
    })
    if(started&&!finished&&mode==='exam') tick()
  }
  render()
}
