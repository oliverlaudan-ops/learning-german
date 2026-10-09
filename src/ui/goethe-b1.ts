/**
 * Goethe B1 Hören · Teil 1 practice prototype.
 * Original scripts and questions. Browser TTS is a temporary practice aid,
 * NOT representative of the voices or playback quality of the Goethe exam.
 */
import './goethe-b1.css'

type Question = { prompt: string; options: string[]; answer: number; explanation: string }
type Clip = { title: string; text: string; questions: [Question, Question] }
const clips: Clip[] = [
  { title: 'Nachricht zur Verabredung', text: 'Hallo Nina, hier ist Lara. Wir wollten uns morgen um halb drei vor dem Kino treffen. Leider muss ich länger arbeiten. Können wir uns stattdessen um Viertel nach vier am Haupteingang treffen? Ruf mich bitte nur an, wenn das nicht klappt. Bis morgen!', questions: [
    { prompt: 'Lara möchte das Treffen absagen.', options: ['Richtig', 'Falsch'], answer: 1, explanation: 'Lara will das Treffen verschieben, nicht absagen.' },
    { prompt: 'Wann möchte Lara sich treffen?', options: ['Um 14:30 Uhr', 'Um 16:15 Uhr', 'Um 16:45 Uhr'], answer: 1, explanation: '„Viertel nach vier“ bedeutet 16:15 Uhr.' }
  ] },
  { title: 'Durchsage am Bahnhof', text: 'Achtung, eine Information für Reisende nach Köln: Der Regionalexpress um 10 Uhr 20 fährt heute nicht von Gleis 4, sondern von Gleis 7. Wegen Bauarbeiten verzögert sich die Abfahrt um ungefähr zehn Minuten. Wir bitten um Verständnis.', questions: [
    { prompt: 'Der Zug nach Köln fährt heute von einem anderen Gleis.', options: ['Richtig', 'Falsch'], answer: 0, explanation: 'Gleis 7 ersetzt Gleis 4.' },
    { prompt: 'Warum fährt der Zug später ab?', options: ['Wegen des Wetters', 'Wegen Bauarbeiten', 'Wegen eines Unfalls'], answer: 1, explanation: 'Die Bauarbeiten verursachen die Verspätung.' }
  ] },
  { title: 'Nachricht aus der Arztpraxis', text: 'Guten Tag, Frau Berger. Hier spricht die Praxis Dr. Weber. Ihr Termin am Donnerstag um neun Uhr kann leider nicht stattfinden. Wir bieten Ihnen stattdessen Freitag um elf Uhr an. Bitte bestätigen Sie den neuen Termin bis Mittwoch telefonisch.', questions: [
    { prompt: 'Der Termin am Donnerstag findet wie geplant statt.', options: ['Richtig', 'Falsch'], answer: 1, explanation: 'Der Termin am Donnerstag fällt aus.' },
    { prompt: 'Was soll Frau Berger tun?', options: ['Am Donnerstag vorbeikommen', 'Den neuen Termin telefonisch bestätigen', 'Eine E-Mail an den Arzt schreiben'], answer: 1, explanation: 'Sie soll bis Mittwoch telefonisch bestätigen.' }
  ] },
  { title: 'Hinweis in der Bibliothek', text: 'Liebe Besucherinnen und Besucher, die Stadtbibliothek schließt heute ausnahmsweise schon um 16 Uhr. Bücher können Sie auch nach der Schließung in den Rückgabekasten am Seiteneingang werfen. Morgen sind wir wieder wie gewohnt bis 19 Uhr für Sie da.', questions: [
    { prompt: 'Morgen ist die Bibliothek bis 19 Uhr geöffnet.', options: ['Richtig', 'Falsch'], answer: 0, explanation: 'Morgen gelten die gewöhnlichen Öffnungszeiten bis 19 Uhr.' },
    { prompt: 'Wo kann man Bücher nach der Schließung zurückgeben?', options: ['Am Haupteingang', 'Am Informationsschalter', 'Am Seiteneingang'], answer: 2, explanation: 'Der Rückgabekasten steht am Seiteneingang.' }
  ] },
  { title: 'Nachricht von einem Kollegen', text: 'Hallo Tim, ich bin es, Daniel. Die Besprechung mit unserem Kunden beginnt morgen schon um acht statt um neun. Bitte bring die neuen Unterlagen mit. Die Präsentation übernehme ich, darum musst du dich nicht kümmern. Danke und bis morgen!', questions: [
    { prompt: 'Daniel übernimmt die Präsentation.', options: ['Richtig', 'Falsch'], answer: 0, explanation: 'Daniel sagt ausdrücklich, dass er die Präsentation übernimmt.' },
    { prompt: 'Was soll Tim zur Besprechung mitbringen?', options: ['Seinen Laptop', 'Die neuen Unterlagen', 'Getränke für die Gäste'], answer: 1, explanation: 'Tim soll die neuen Unterlagen mitbringen.' }
  ] }
]

const esc = (s: string): string => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
const key = (profileId: string) => 'goethe-b1-hoeren-v1-' + profileId
type Mode = 'learn' | 'exam'

export function attachGoetheB1Entry(dashboard: HTMLElement, profileId: string): void {
  const section = document.createElement('section')
  section.className = 'dashboard-card goethe-entry'
  section.innerHTML = `<p class="card-kicker">GOETHE-ZERTIFIKAT B1 · HÖREN</p>
    <h2>Train for your listening exam</h2>
    <p>Teil 1: Fünf kurze Hörtexte mit zehn Fragen auf Deutsch. Choose a guided practice or a timed, exam-style attempt.</p>
    <p class="muted">Exam target: 21–23 November 2026 (confirm the date with the centre).</p>
    <p class="goethe-tts-note">Prototype: computer-generated browser speech. This is not official Goethe exam audio.</p>
    <button type="button" class="btn primary" data-goethe-open>Start B1 Hören →</button>`
  dashboard.appendChild(section)
  section.querySelector<HTMLButtonElement>('[data-goethe-open]')?.addEventListener('click', () => {
    const overlay = document.createElement('div')
    overlay.className = 'goethe-overlay'
    document.body.appendChild(overlay)
    let mode: Mode = 'learn'
    let clipIndex = 0
    let plays = 0
    let answers: Record<number, number> = {}
    let finished = false
    let deadline = 0
    let timer: number | undefined
    const stop = () => { window.speechSynthesis?.cancel() }
    const teardown = () => { stop(); if (timer !== undefined) clearInterval(timer); overlay.remove() }
    const questionsFor = (i: number) => clips[i].questions.map((q, j) => {
      const id = i * 2 + j
      const selected = answers[id]
      return `<fieldset class="goethe-question"><legend>${id + 1}. ${esc(q.prompt)}</legend>
        ${q.options.map((opt, k) => `<label><input type="radio" name="goethe-q-${id}" value="${k}" ${selected === k ? 'checked' : ''} ${finished ? 'disabled' : ''}> ${esc(opt)}</label>`).join('')}
        ${finished || mode === 'learn' && selected !== undefined ? `<p class="goethe-feedback">${selected === q.answer ? '✓ Richtig.' : '✗ Nicht richtig.'} ${esc(q.explanation)}</p>` : ''}</fieldset>`
    }).join('')
    const remaining = () => Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
    const clock = () => { const el = overlay.querySelector('[data-goethe-clock]'); if (el) el.textContent = `${Math.floor(remaining()/60)}:${String(remaining()%60).padStart(2,'0')}` }
    const finish = () => {
      if (finished) return
      finished = true
      stop()
      if (timer !== undefined) clearInterval(timer)
      const score = clips.flatMap(c=>c.questions).filter((q,i)=>answers[i]===q.answer).length
      try {
        const prev = JSON.parse(localStorage.getItem(key(profileId)) || '[]') as unknown
        const history = Array.isArray(prev) ? prev : []
        history.push({mode, score, total: 10, completedAt: Date.now()})
        localStorage.setItem(key(profileId), JSON.stringify(history.slice(-30)))
      } catch { /* Disabled storage must not block results. */ }
      render()
    }
    const render = () => {
      const score = clips.flatMap(c=>c.questions).filter((q,i)=>answers[i]===q.answer).length
      const clip = clips[clipIndex]
      overlay.innerHTML = `<main class="goethe-panel" role="dialog" aria-modal="true" aria-labelledby="goethe-title">
        <button type="button" class="btn secondary" data-goethe-close>← Back to dashboard</button>
        <p class="card-kicker">B1 HÖREN · TEIL 1 · ORIGINAL PRACTICE</p><h1 id="goethe-title">Kurze Hörtexte verstehen</h1>
        <p class="goethe-tts-note">Training prototype with browser speech, not official Goethe exam material.</p>
        ${finished ? `<h2>Ergebnis: ${score} / 10 (${score * 10} %)</h2><p>Trainingsziel: 80 %. Die Prüfung wird hier nicht offiziell bewertet.</p>
            ${clips.map((c,i)=>`<section class="goethe-result"><h3>${i+1}. ${esc(c.title)}</h3>${questionsFor(i)}<details><summary>Hörtext lesen</summary><p lang="de">${esc(c.text)}</p></details></section>`).join('')}
            <button class="btn primary" data-goethe-restart>Erneut üben</button>`
          : `<div class="goethe-mode"><label>Übungsmodus <select data-goethe-mode><option value="learn" ${mode==='learn'?'selected':''}>Lernmodus</option><option value="exam" ${mode==='exam'?'selected':''}>Prüfungsmodus</option></select></label>
              ${mode==='exam' ? `<strong>Restzeit: <span data-goethe-clock></span></strong>` : ''}</div>
            <p>Hörtext ${clipIndex+1} von 5 · ${esc(clip.title)}</p>
            <button class="btn primary" data-goethe-play ${mode==='exam' && plays>=2?'disabled':''}>▶ Hörtext abspielen ${mode==='exam'? '(' + plays + '/2)':''}</button>
            <p class="muted" role="status" data-goethe-status>Die Fragen sind auf Deutsch. ${mode==='exam'?'Jeder Hörtext darf höchstens zweimal abgespielt werden.':'Du kannst den Hörtext beliebig oft hören.'}</p>
            ${questionsFor(clipIndex)}
            ${mode==='learn' ? `<details><summary>Transkript anzeigen (nur Lernmodus)</summary><p lang="de">${esc(clip.text)}</p></details>` : ''}
            <nav class="goethe-nav"><button class="btn secondary" data-goethe-prev ${clipIndex===0?'disabled':''}>← Zurück</button>
              <button class="btn primary" data-goethe-next>${clipIndex===4?'Auswerten':'Weiter →'}</button></nav>`}
        </main>`
      overlay.querySelector('[data-goethe-close]')?.addEventListener('click',teardown)
      overlay.querySelector('[data-goethe-restart]')?.addEventListener('click',()=>{answers={};clipIndex=0;plays=0;finished=false;deadline=Date.now()+10*60*1000;render()})
      overlay.querySelector<HTMLSelectElement>('[data-goethe-mode]')?.addEventListener('change',e=>{
        mode=(e.target as HTMLSelectElement).value as Mode
        answers={};clipIndex=0;plays=0;stop();deadline=Date.now()+10*60*1000
        if(timer!==undefined)clearInterval(timer)
        if(mode==='exam') timer=window.setInterval(()=>{clock();if(remaining()===0)finish()},1000)
        render()
      })
      overlay.querySelector('[data-goethe-play]')?.addEventListener('click',()=>{
        if (!('speechSynthesis' in window)){const s=overlay.querySelector('[data-goethe-status]');if(s)s.textContent='Browser speech is unavailable. Try another browser.';return}
        if(mode==='exam' && plays>=2)return
        stop()
        if(mode==='exam')plays++
        const utterance=new SpeechSynthesisUtterance(clip.text)
        utterance.lang='de-DE';utterance.rate=mode==='learn'?0.9:1
        const germanVoice=window.speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('de'))
        if(germanVoice)utterance.voice=germanVoice
        utterance.onerror=()=>{const s=overlay.querySelector('[data-goethe-status]');if(s)s.textContent='Playback failed. Please check your browser voice settings.'}
        window.speechSynthesis.speak(utterance)
        if(mode==='exam')render()
      })
      overlay.querySelectorAll<HTMLInputElement>('input[type=radio]').forEach(input=>input.addEventListener('change',()=>{
        answers[Number(input.name.replace('goethe-q-',''))]=Number(input.value)
        if(mode==='learn')render()
      }))
      overlay.querySelector('[data-goethe-prev]')?.addEventListener('click',()=>{stop();clipIndex--;plays=0;render()})
      overlay.querySelector('[data-goethe-next]')?.addEventListener('click',()=>{stop();if(clipIndex===4)finish();else{clipIndex++;plays=0;render()}})
      clock()
    }
    render()
  })
}
