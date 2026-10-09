import { EXAM_PREP_TARGET, EXAM_USER_REPORTED, studyAdvice, studyWeeks, planIndex, type FullAttempt } from '../data/goethe-b1-study-plan'
import './goethe-b1.css'

const historyKey = (id:string) => 'goethe-b1-hoeren-full-v1-' + id
const checksKey = (id:string) => 'goethe-b1-daily-checks-v1-' + id
function readJSON(key:string):unknown {try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function todayKey():string {const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function daysLeft(target:string):number {
 const d=new Date();const utc=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())
 return Math.max(0,Math.ceil((Date.parse(target+'T00:00:00Z')-utc)/86400000))
}
function esc(t:string):string{return t.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}
export function attachB1StudyPlan(section:HTMLElement,profileId:string):void {
 const area=document.createElement('section')
 area.className='goethe-study-plan'
 const history=readJSON(historyKey(profileId))
 const attempts:Array<FullAttempt>=Array.isArray(history)?history.filter((v):v is FullAttempt=>!!v&&typeof v==='object'):[]
 const checked=readJSON(checksKey(profileId))
 const days:Record<string,boolean>=checked&&typeof checked==='object'&&!Array.isArray(checked)?checked as Record<string,boolean>:{}
 const current=studyWeeks[planIndex(new Date())]
 const recent=attempts[attempts.length-1]
 const complete=Boolean(days[todayKey()])
 const planTitle='Your B1 Hören study plan'
 area.innerHTML=`<div class="goethe-plan-head">
    <h3>${esc(planTitle)}</h3>
    <p><strong>${daysLeft(EXAM_PREP_TARGET)} days</strong> until the conservative target, 21 November 2026.</p>
    <p class="muted">Your reported exam date: ${EXAM_USER_REPORTED}. Please verify the date in the booking confirmation.</p>
    <p class="goethe-plan-week">This week: ${esc(current.title)}</p>
    <p>${esc(current.focus)}</p>
    <p><strong>Today's practice:</strong> ${esc(studyAdvice(new Date(),attempts))}</p>
    <label class="goethe-plan-check"><input type="checkbox" data-b1-done ${complete?'checked':''}> Ich habe heute meine Hörübung gemacht.</label>
    ${recent&&typeof recent.percent==='number'?`<p>Latest full practice: <strong>${recent.percent}%</strong> · Goal: 80%.</p>`:'<p>Try a full practice to start tracking your scores.</p>'}
  </div>
  <details><summary>Show the full weekly study plan</summary>
    <ol class="goethe-plan-weeks">${studyWeeks.map(week=>`<li><strong>${esc(week.title)}</strong> <small>(${esc(week.start)} – ${esc(week.end)})</small><p>${esc(week.focus)}</p></li>`).join('')}</ol>
  </details>`
 section.appendChild(area)
 area.querySelector<HTMLInputElement>('[data-b1-done]')?.addEventListener('change',ev=>{
  days[todayKey()]=(ev.target as HTMLInputElement).checked
  try{localStorage.setItem(checksKey(profileId),JSON.stringify(days))}catch{ /* optional storage */ }
 })
}
