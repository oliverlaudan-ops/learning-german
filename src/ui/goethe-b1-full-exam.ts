/** Original Goethe B1-oriented listening practice, not an official exam. */
import { clips } from '../data/goethe-b1-part1'
import { extraParts, type B1Question } from '../data/goethe-b1-parts'
import { alternativeExamSets, type AlternativeExamSet } from '../data/goethe-b1-alternative-sets'
import './goethe-b1.css'

type Mode = 'learn' | 'exam'
type Stage = 'setup' | 'listening' | 'transfer' | 'finished'
export type Segment = { title: string; script: string; maxPlays: number; questions: B1Question[]; part: number; firstQuestion: number }
const original: Segment[] = [
 ...clips.map((c,i)=>({title:c.title,script:c.text,maxPlays:2,questions:c.questions,part:1,firstQuestion:i*2+1})),
 ...extraParts.flatMap(p=>p.segments.map(s=>({...s,part:p.id,firstQuestion:p.id===2?11:p.id===3?16:23})))
]
function normalized(set: AlternativeExamSet): Segment[] {
 let offset=1
 return set.segments.map(s=>{
   const mapped={...s,firstQuestion:offset}
   offset+=s.questions.length
   return mapped
 })
}
export const examSets: {id:string;title:string;segments:Segment[]}[]=[
 {id:'set-1',title:'Übungssatz 1 · Bekanntes Training',segments:original},
 ...alternativeExamSets.map(s=>({id:s.id,title:s.title,segments:normalized(s)}))
]
export const fullExamQuestionCount = 30
const key=(id:string)=>'goethe-b1-hoeren-full-v1-'+id
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))

export function gradeB1(answers:Record<number,number>,setId='set-1'):{correct:number;total:number;percent:number;byPart:number[]} {
 const segments=examSets.find(s=>s.id===setId)?.segments??original
 const flattened=segments.flatMap(s=>s.questions)
 const byPart=[1,2,3,4].map(part=>segments.filter(s=>s.part===part).reduce((score,s)=>
   score+s.questions.filter((q,i)=>answers[s.firstQuestion-1+i]===q.answer).length,0))
 const correct=byPart.reduce((a,b)=>a+b,0)
 return {correct,total:flattened.length,percent:Math.round(correct*100/flattened.length),byPart}
}

export function launchB1FullExam(profileId:string):void {
 const overlay=document.createElement('div')
 overlay.className='goethe-overlay'
 document.body.appendChild(overlay)
 const previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:undefined
 let mode:Mode='learn'
 let stage:Stage='setup'
 let setId='set-1'
 let index=0
 let currentPlay=0
 let tries:number[]=[]
 let answers:Record<number,number>={}
 let deadline=0
 let ticker:number|undefined
 let pauseTimer:number|undefined
 let audio:HTMLAudioElement|undefined
 let generation=0
 let closing=false
 const currentSet=()=>examSets.find(s=>s.id===setId)??examSets[0]
 const sections=()=>currentSet().segments
 const clock=()=>Math.max(0,Math.ceil((deadline-Date.now())/1000))
 const clockText=()=>String(Math.floor(clock()/60))+':'+String(clock()%60).padStart(2,'0')
 const clearTimers=()=>{
   if(ticker!==undefined)clearInterval(ticker)
   if(pauseTimer!==undefined)clearTimeout(pauseTimer)
   ticker=undefined
   pauseTimer=undefined
 }
 const stopAudio=()=>{
   generation++
   if(audio){audio.pause();audio.removeAttribute('src');audio.load();audio=undefined}
   if('speechSynthesis'in window)window.speechSynthesis.cancel()
 }
 const close=()=>{closing=true;clearTimers();stopAudio();overlay.remove();previousFocus?.focus()}
 const save=()=>{
   try{
     const previous:unknown=JSON.parse(localStorage.getItem(key(profileId))||'[]')
     const results:unknown[]=Array.isArray(previous)?previous:[]
     results.push({setId,mode,...gradeB1(answers,setId),completedAt:Date.now()})
     localStorage.setItem(key(profileId),JSON.stringify(results.slice(-50)))
   }catch{/* private browsing */}
 }
 const finish=()=>{
   if(stage==='finished')return
   stage='finished'
   clearTimers()
   stopAudio()
   save()
   render()
 }
 const beginTransfer=()=>{
   if(stage==='finished'||closing)return
   stopAudio()
   clearTimers()
   stage='transfer'
   deadline=Date.now()+5*60*1000
   ticker=setInterval(()=>{
     const span=overlay.querySelector<HTMLElement>('[data-full-clock]')
     if(span)span.textContent=clockText()
     if(clock()<=0)finish()
   },1000)
   render()
 }
 const setStatus=(message:string)=>{
   const el=overlay.querySelector<HTMLElement>('[data-full-status]')
   if(el)el.textContent=message
 }
 const autoNext=()=>{
   if(stage!=='listening'||closing)return
   stopAudio()
   if(currentPlay<sections()[index].maxPlays){
     pauseTimer=setTimeout(()=>playAudio(true),3500)
   }else if(index+1<sections().length){
     index++
     currentPlay=0
     render()
     pauseTimer=setTimeout(()=>playAudio(true),5000)
   }else beginTransfer()
 }
 const playAudio=(automatic=false)=>{
   if(stage!=='listening')return
   const segment=sections()[index]
   if(mode==='exam'&&currentPlay>=segment.maxPlays)return
   stopAudio()
   const token=generation
   let started=false
   const markStart=(source:string)=>{
     if(generation!==token||started)return
     started=true
     currentPlay++
     tries[index]=currentPlay
     setStatus(source+' · Wiedergabe '+currentPlay+'/'+segment.maxPlays)
     const b=overlay.querySelector<HTMLButtonElement>('[data-full-play]')
     if(b&&mode==='exam')b.disabled=currentPlay>=segment.maxPlays
   }
   const finishPlayback=()=>{
     if(generation!==token)return
     if(mode==='exam')autoNext()
     else setStatus('Wiedergabe beendet. Du kannst den Hörtext erneut anhören.')
   }
   const fallback=()=>{
     if(generation!==token)return
     if(audio){audio.pause();audio=undefined}
     if(!('speechSynthesis'in window)){
       setStatus('Keine MP3 vorhanden und dieser Browser unterstützt keine Sprachausgabe.')
       if(mode==='exam')pauseTimer=setTimeout(autoNext,2500)
       return
     }
     const u=new SpeechSynthesisUtterance(segment.script)
     u.lang='de-DE'
     u.rate=mode==='learn'?0.88:1
     const german=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('de'))
     if(german)u.voice=german
     u.onstart=()=>markStart('Browser-Sprachausgabe (keine Aufnahme)')
     u.onend=finishPlayback
     u.onerror=()=>{if(generation===token){setStatus('Sprachausgabe fehlgeschlagen.');if(mode==='exam')pauseTimer=setTimeout(autoNext,2500)}}
     window.speechSynthesis.speak(u)
   }
   // Preserve the original eight recordings; additional sets have dedicated subfolders.
   const relativePath=setId==='set-1'?'segment-'+index+'.mp3':setId+'/segment-'+index+'.mp3'
   const a=new Audio(import.meta.env.BASE_URL+'audio/goethe-b1/'+relativePath)
   audio=a
   a.onplaying=()=>markStart('Aufgenommene MP3')
   a.onended=finishPlayback
   a.onerror=fallback
   void a.play().catch(()=>{if(generation===token)fallback()})
   if(automatic)setStatus('Hörtext wird automatisch geladen …')
 }
 const renderQuestion=(q:B1Question,offset:number,feedback:boolean)=>{
   const value=answers[offset]
   return '<fieldset class="goethe-question"><legend>'+(offset+1)+'. '+esc(q.prompt)+'</legend>'+
     q.options.map((option,i)=>'<label><input type="radio" name="b1-full-'+offset+'" value="'+i+'" '+(value===i?'checked':'')+' '+(stage==='finished'?'disabled':'')+'> '+esc(option)+'</label>').join('')+
     (feedback?'<p class="goethe-feedback">'+(value===q.answer?'✓ Richtig':'✗ Nicht richtig')+' · '+esc(q.explanation)+'</p>':'')+'</fieldset>'
 }
 const allQuestions=(feedback:boolean)=>sections().map(s=>'<section class="goethe-result"><h3>Teil '+s.part+': '+esc(s.title)+'</h3>'+
   s.questions.map((q,i)=>renderQuestion(q,s.firstQuestion-1+i,feedback)).join('')+
   (feedback?'<details><summary>Transkript anzeigen</summary><p lang="de">'+esc(s.script)+'</p></details>':'')+'</section>').join('')
 const render=()=>{
   if(closing)return
   const segment=sections()[index]
   const score=gradeB1(answers,setId)
   const count=Object.keys(answers).length
   overlay.innerHTML='<main class="goethe-panel goethe-full" role="dialog" aria-modal="true" aria-labelledby="goethe-full-title">'+
     '<button class="btn secondary" data-full-close>← Zur B1-Übersicht</button>'+
     '<p class="card-kicker">B1 HÖREN · EIGENE ÜBUNGSMATERIALIEN</p>'+
     '<h1 id="goethe-full-title">'+esc(currentSet().title)+'</h1>'+
     '<p class="goethe-tts-note">Keine offizielle Goethe-Prüfung. Alle vier Übungssätze besitzen vorproduzierte synthetische MP3-Aufnahmen mit unterschiedlichen Stimmen. Wenn eine Datei nicht geladen werden kann, wird als Ersatz die deutsche Browser-Sprachausgabe verwendet.</p>'+
     (stage==='setup'?
       '<p>Vier Hörteile · 30 Fragen. Wähle einen Übungssatz und den Lernmodus oder die automatische prüfungsähnliche Simulation.</p>'+
       '<label for="full-set">Übungssatz wählen</label><select id="full-set">'+examSets.map(s=>'<option value="'+s.id+'" '+(s.id===setId?'selected':'')+'>'+esc(s.title)+'</option>').join('')+'</select>'+
       '<label for="full-mode">Übungsmodus wählen</label><select id="full-mode"><option value="learn">Lernmodus</option><option value="exam">Prüfungsähnliche Simulation</option></select>'+
       '<p class="muted">Die Simulation spielt alle Texte automatisch und entsprechend der Wiederholungsgrenzen ab. Die Lesepausen sind verkürzt; daher ist die Gesamtdauer nicht mit einer offiziellen 40-Minuten-Prüfung gleichzusetzen. Die Übertragungsphase dauert fünf Minuten.</p>'+
       '<button class="btn primary" data-full-start>Starten</button>'
     :stage==='finished'?
       '<h2>Ergebnis: '+score.correct+' / '+score.total+' ('+score.percent+' %)</h2>'+
       '<p>Teil 1: '+score.byPart[0]+'/10 · Teil 2: '+score.byPart[1]+'/5 · Teil 3: '+score.byPart[2]+'/7 · Teil 4: '+score.byPart[3]+'/8</p>'+
       '<p>Das Trainingsziel von 80 % ist keine offizielle Goethe-Bewertung.</p>'+allQuestions(true)+
       '<button class="btn primary" data-full-again>Schließen</button>'
     :stage==='transfer'?
       '<h2>Antworten übertragen und überprüfen</h2>'+
       '<p>Fünf Minuten Übertragungsphase. Beantwortet: '+count+' von 30 Aufgaben. Danach erfolgt die automatische Auswertung.</p>'+
       '<p><strong>Restzeit: <span data-full-clock>'+clockText()+'</span></strong></p>'+
       allQuestions(false)+
       '<button class="btn primary" data-full-finish>Antworten jetzt abgeben</button>'
     :'<div class="goethe-mode"><strong>Teil '+segment.part+' · Hörtext '+(index+1)+' / 8</strong>'+
       (mode==='exam'?'<strong>Automatischer Durchlauf · '+(currentPlay+1)+'/'+segment.maxPlays+'</strong>':'')+'</div>'+
       '<h2>'+esc(segment.title)+'</h2>'+
       (mode==='exam'?
         '<p>Fragen lesen und zuhören. Der nächste Hörtext startet nach einer kurzen Pause automatisch.</p>'+
         '<p class="muted">Vor dem Hören gibt es fünf Sekunden Vorbereitungszeit.</p>'
       :'<p>Beliebig oft anhören. Im Lernmodus gibt es direktes Feedback.</p>'+
         '<button class="btn primary" data-full-play>▶ Hörtext abspielen</button>')+
       '<p class="muted" role="status" data-full-status>Bereit zum Hören.</p>'+
       segment.questions.map((q,i)=>renderQuestion(q,segment.firstQuestion-1+i,mode==='learn'&&answers[segment.firstQuestion-1+i]!==undefined)).join('')+
       (mode==='learn'?'<details><summary>Transkript anzeigen</summary><p lang="de">'+esc(segment.script)+'</p></details>'+
         '<nav class="goethe-nav"><button class="btn secondary" data-full-prev '+(index===0?'disabled':'')+'>← Zurück</button>'+
         '<button class="btn primary" data-full-next>'+(index===7?'Antworten kontrollieren':'Weiter →')+'</button></nav>':'')
     )+'</main>'
   overlay.querySelector('[data-full-close]')?.addEventListener('click',close)
   overlay.querySelector<HTMLSelectElement>('#full-set')?.addEventListener('change',e=>{setId=(e.target as HTMLSelectElement).value;render()})
   overlay.querySelector<HTMLSelectElement>('#full-mode')?.addEventListener('change',e=>{mode=(e.target as HTMLSelectElement).value as Mode})
   overlay.querySelector('[data-full-start]')?.addEventListener('click',()=>{
     // Mode selector's current value is read even if no change event fired.
     mode=overlay.querySelector<HTMLSelectElement>('#full-mode')?.value as Mode||mode
     stage='listening';index=0;currentPlay=0;tries=sections().map(()=>0);answers={}
     render()
     if(mode==='exam')pauseTimer=setTimeout(()=>playAudio(true),5000)
   })
   overlay.querySelector('[data-full-finish]')?.addEventListener('click',finish)
   overlay.querySelector('[data-full-again]')?.addEventListener('click',close)
   overlay.querySelector('[data-full-prev]')?.addEventListener('click',()=>{stopAudio();index=Math.max(0,index-1);currentPlay=tries[index]||0;render()})
   overlay.querySelector('[data-full-next]')?.addEventListener('click',()=>{
     stopAudio()
     if(index===7)beginTransfer()
     else {index++;currentPlay=tries[index]||0;render()}
   })
   overlay.querySelector('[data-full-play]')?.addEventListener('click',()=>playAudio())
   overlay.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{
     const number=Number(input.name.replace('b1-full-',''))
     answers[number]=Number(input.value)
     if(mode==='learn'&&stage==='listening')render()
   }))
 }
 render()
}
