import complaintLesson from '../data/complaint-delivery-listening.json'
import workshopLesson from '../data/workshop-planning-listening.json'
import appointmentLesson from '../data/doctor-appointment-listening.json'
import consultationLesson from '../data/doctor-consultation-listening.json'
import housingLesson from '../data/housing-search-listening.json'
import travelLesson from '../data/travel-disruption-listening.json'
import type { ListeningResult } from '../types'
import './listening-lesson.css'

let cleanup: (() => void) | undefined

type AppWindow = Window & typeof globalThis & {
  SpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance
  speechSynthesis?: SpeechSynthesis
}

type ListeningLesson = typeof appointmentLesson & {
  language?: string
  speechRate?: number
  useTwoVoices?: boolean
  useMultipleVoices?: boolean
  topicLabel?: string
  completionTitle?: string
  completionText?: string
}

type ListeningComplete = (result: ListeningResult) => void

export function disposeDoctorListeningLesson(): void {
  cleanup?.()
  cleanup = undefined
}

export function selectGermanVoices(voices: readonly SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const german = voices.filter(voice => voice.lang.toLowerCase().startsWith('de'))
  return german.length ? german : [...voices]
}

function escape(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))
}

export function doctorListeningEntry(): string {
  return `<section class="listening-entry lesson-card">
    <div><span class="lesson-kicker">A2+ · LISTEN & SPEAK · 15–20 MIN</span>
    <h2>${escape(appointmentLesson.title)}</h2><p>Follow a realistic phone call and practise understanding changing appointment details.</p></div>
    <button type="button" class="btn primary" data-doctor-listening-start>Start lesson →</button>
  </section>`
}

export function consultationListeningEntry(): string {
  return `<section class="listening-entry lesson-card">
    <div><span class="lesson-kicker">B1 · LISTEN & SPEAK · 20–25 MIN</span>
    <h2>${escape(consultationLesson.title)}</h2><p>Understand symptoms, an examination, medicine instructions and warning signs.</p></div>
    <button type="button" class="btn primary" data-consultation-listening-start>Start lesson →</button>
  </section>`
}

export function travelListeningEntry(): string {
  return `<section class="listening-entry lesson-card">
    <div><span class="lesson-kicker">B1 · TWO VOICES · 20–25 MIN</span>
    <h2>${escape(travelLesson.title)}</h2><p>Track delays, cancelled trains, platform changes and the one journey that finally works.</p></div>
    <button type="button" class="btn primary" data-travel-listening-start>Start lesson →</button>
  </section>`
}

export function housingListeningEntry(): string {
  return `<section class="listening-entry lesson-card">
    <div><span class="lesson-kicker">B1 · THREE SPEAKERS · 25–30 MIN</span>
    <h2>${escape(housingLesson.title)}</h2><p>Compare changing rent, dates, documents and conditions across a phone call and a viewing.</p></div>
    <button type="button" class="btn primary" data-housing-listening-start>Start lesson →</button>
  </section>`
}

export function renderDoctorListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, appointmentLesson, onComplete)
}

export function renderConsultationListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, consultationLesson, onComplete)
}

export function renderTravelListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, travelLesson, onComplete)
}

export function renderHousingListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, housingLesson, onComplete)
}

function renderMedicalListeningLesson(target: HTMLElement, onExit: () => void, lesson: ListeningLesson, onComplete?: ListeningComplete): void {
  disposeDoctorListeningLesson()
  const translations: Record<string, string> = {"Listen":"Hören","True or false":"Richtig oder falsch","Fill the gaps":"Lücken ergänzen","Put in order":"Ereignisse ordnen","Review & speak":"Wiederholen und sprechen","Audio is not available in this browser. Continue with the transcript in the final step.":"Audio ist in diesem Browser nicht verfügbar. Nutze den Text im letzten Schritt.","Playing German audio…":"Die Aufnahme wird abgespielt…","Finished. Replay or continue when you are ready.":"Fertig. Höre noch einmal oder gehe weiter.","Audio could not play. Please try again.":"Die Aufnahme konnte nicht abgespielt werden. Versuche es erneut."," True":" Richtig"," False":" Falsch","✓ Correct.":"✓ Richtig.","Not quite.":"Noch nicht ganz.","Complete the sentence":"Ergänze den Satz","Missing word":"Fehlendes Wort","Choose…":"Wähle…","The missing words are":"Die richtige Ergänzung lautet","Move the events until they match the order in the call.":"Bringe die Ereignisse in die Reihenfolge des Gesprächs.","Move up":"Nach oben","Move down":"Nach unten","Check order":"Reihenfolge prüfen","That is the order of the call.":"Das ist die Reihenfolge im Gespräch.","Listen again and check where the important details change.":"Höre erneut und achte darauf, wann sich wichtige Angaben ändern.","Replay individual turns, then repeat the useful sentences aloud.":"Höre einzelne Gesprächsabschnitte erneut und sprich die Sätze laut nach.","Play turn":"Abschnitt abspielen:","Show German & translation":"Dialogtext und englische Hilfe anzeigen","PRACTISE":"ÜBUNG"," OF ":" VON ","Hear the sentence":"Satz anhören","Try this rhythm:":"Probiere diesen Rhythmus:","not checked":"nicht geprüft","retry recommended":"Wiederholung empfohlen","correct":"richtig","No comprehension result yet.":"Noch kein Ergebnis zum Hörverstehen.","You finished the speaking practice, but none of the scored tasks were checked. Retry the lesson and check the tasks to create a progress result.":"Du hast die Sprechübung beendet, aber keine Verständnisaufgabe geprüft. Wiederhole die Lektion und prüfe deine Antworten, um ein Ergebnis zu speichern.","Strong result. Next time, try the conversation at normal speed and answer without opening the transcript.":"Sehr gutes Ergebnis. Höre das Gespräch beim nächsten Mal in normalem Tempo und beantworte die Fragen ohne Dialogtext.","Good basis. Retry the task type with the most errors before moving on.":"Gute Grundlage. Wiederhole zuerst den Aufgabentyp mit den meisten Fehlern.","Repeat the conversation once at the slower speed, then retry the comprehension tasks.":"Höre das Gespräch einmal langsamer und wiederhole danach die Verständnisaufgaben.","COMPREHENSION RESULT":"ERGEBNIS HÖRVERSTEHEN","True / false":"Richtig / falsch","Gap fill":"Lückentext","Event order:":"Reihenfolge:","Next step:":"Nächster Schritt:","The transcript is hidden. Several details sound plausible, so listen for what is finally confirmed.":"Der Dialogtext ist zunächst verborgen. Mehrere Angaben klingen plausibel. Achte auf die endgültigen Absprachen.","Decide whether each statement matches the conversation.":"Entscheide, ob die Aussagen zum Gespräch passen.","Check answers":"Antworten prüfen","Choose the words you heard. Replay the conversation whenever you need it.":"Wähle die passende Ergänzung. Du kannst das Gespräch jederzeit erneut anhören.","Check gaps":"Lücken prüfen","Back to lessons":"Zurück zu den Lektionen","A realistic conversation with details that matter.":"Ein realistisches Gespräch mit wichtigen Einzelheiten.","Exercise progress":"Übungsfortschritt","Play full conversation":"Ganzes Gespräch abspielen","Playback speed":"Wiedergabetempo","Slower":"Langsamer","Press play when you are ready.":"Starte die Aufnahme, wenn du bereit bist.","Computer-generated German audio. Audio is created by your device.":"Die deutsche Sprachausgabe wird von deinem Gerät erzeugt."," Two different German voices are used when available.":" Wenn verfügbar, werden zwei verschiedene deutsche Stimmen verwendet."," Three different German voices are used when available.":" Wenn verfügbar, werden drei verschiedene deutsche Stimmen verwendet.","Exercise navigation":"Übungsnavigation","← Back":"← Zurück","Finish practice ✓":"Übung abschließen ✓","Answer every statement first.":"Beantworte zuerst alle Aussagen.","Complete every gap first.":"Ergänze zuerst alle Lücken.","PRACTICE COMPLETE":"ÜBUNG ABGESCHLOSSEN","Retry lesson":"Lektion wiederholen"}
  const keys = Object.keys(translations).sort((a, b) => b.length - a.length)
  const localize = (text: string): string => {
    if (lesson.language !== 'de') return text
    const pattern = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
    return text.replace(new RegExp(pattern, 'g'), match => translations[match])
  }
  const localizeMarkup = (): void => {
    if (lesson.language !== 'de') return
    target.setAttribute('lang', 'de')
    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) walker.currentNode.textContent = localize(walker.currentNode.textContent ?? '')
    target.querySelectorAll('[aria-label]').forEach(node => node.setAttribute('aria-label', localize(node.getAttribute('aria-label') ?? '')))
  }
  const stages = lesson.language === 'de' ? ['Hören', 'Richtig oder falsch', 'Lücken ergänzen', 'Ereignisse ordnen', 'Wiederholen und sprechen'] : ['Listen', 'True or false', 'Fill the gaps', 'Put in order', 'Review & speak']
  let stage = 0
  let rate = lesson.speechRate ?? 0.95
  let disposed = false
  const trueFalseAnswers: Array<boolean | undefined> = []
  const gapAnswers: Array<string | undefined> = []
  let trueFalseChecked = false
  let gapsChecked = false
  let sequenceChecked = false
  let sequenceCorrect = false
  let sequence = [...lesson.sequence].reverse()

  const stop = () => (window as AppWindow).speechSynthesis?.cancel()
  cleanup = () => { disposed = true; stop() }

  const speakers = [...new Set(lesson.lines.map(line => line.speaker))]
  const usesMultipleVoices = Boolean(lesson.useTwoVoices || lesson.useMultipleVoices)
  const voiceForSpeaker = (speaker: string) => usesMultipleVoices ? Math.max(0, speakers.indexOf(speaker)) : 0

  function speak(text: string, status: HTMLElement, voiceIndex = 0, onFinished?: () => void, cancelFirst = true): void {
    if (cancelFirst) stop()
    const appWindow = window as AppWindow
    if (!appWindow.speechSynthesis || !appWindow.SpeechSynthesisUtterance) {
      status.textContent = localize('Audio is not available in this browser. Continue with the transcript in the final step.')
      return
    }
    const utterance = new appWindow.SpeechSynthesisUtterance(text)
    const voices = selectGermanVoices(appWindow.speechSynthesis.getVoices())
    utterance.lang = 'de-DE'
    utterance.rate = rate
    if (voices.length) utterance.voice = voices[voiceIndex % voices.length]
    utterance.onstart = () => { if (!disposed) status.textContent = localize('Playing German audio…') }
    utterance.onend = () => {
      if (disposed) return
      if (onFinished) onFinished()
      else status.textContent = localize('Finished. Replay or continue when you are ready.')
    }
    utterance.onerror = () => { if (!disposed) status.textContent = localize('Audio could not play. Please try again.') }
    appWindow.speechSynthesis.speak(utterance)
  }

  function speakDialogue(status: HTMLElement): void {
    stop()
    let index = 0
    const next = () => {
      if (disposed || index >= lesson.lines.length) {
        if (!disposed) status.textContent = localize('Finished. Replay or continue when you are ready.')
        return
      }
      const line = lesson.lines[index++]
      speak(line.german, status, voiceForSpeaker(line.speaker), next, false)
    }
    next()
  }

  function trueFalseMarkup(): string {
    return lesson.trueFalse.map((item, index) => `<fieldset class="listening-question">
      <legend>${index + 1}. ${escape(item.statement)}</legend>
      <label><input type="radio" name="tf-${index}" value="true" ${trueFalseAnswers[index] === true ? 'checked' : ''}> True</label>
      <label><input type="radio" name="tf-${index}" value="false" ${trueFalseAnswers[index] === false ? 'checked' : ''}> False</label>
      ${trueFalseChecked ? `<p class="listening-feedback ${trueFalseAnswers[index] === item.answer ? 'correct' : 'retry'}">${trueFalseAnswers[index] === item.answer ? '✓ Correct.' : 'Not quite.'} ${escape(item.explanation)}</p>` : ''}
    </fieldset>`).join('')
  }

  function gapsMarkup(): string {
    return lesson.gaps.map((gap, index) => `<fieldset class="listening-question listening-gap">
      <legend>${index + 1}. Complete the sentence</legend>
      <p lang="de">${escape(gap.before)}
        <select name="gap-${index}" aria-label="Missing word ${index + 1}">
          <option value="">Choose…</option>
          ${gap.options.map(option => `<option value="${escape(option)}" ${gapAnswers[index] === option ? 'selected' : ''}>${escape(option)}</option>`).join('')}
        </select> ${escape(gap.after)}</p>
      ${gapsChecked ? `<p class="listening-feedback ${gapAnswers[index] === gap.answer ? 'correct' : 'retry'}">${gapAnswers[index] === gap.answer ? '✓ Correct.' : `The missing words are “${escape(gap.answer)}”.`}</p>` : ''}
    </fieldset>`).join('')
  }

  function sequenceMarkup(): string {
    return `<p>Move the events until they match the order in the call.</p><ol class="listening-sequence">
      ${sequence.map((item, index) => `<li><span>${index + 1}. ${escape(item.text)}</span><span>
        <button type="button" data-move-up="${item.id}" aria-label="Move up" ${index === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" data-move-down="${item.id}" aria-label="Move down" ${index === sequence.length - 1 ? 'disabled' : ''}>↓</button>
      </span></li>`).join('')}</ol><button class="btn primary" type="button" data-check-sequence>Check order</button><p data-sequence-result role="status">${sequenceChecked ? (sequenceCorrect ? '✓ Correct. That is the order of the call.' : 'Not quite. Listen again and check where the important details change.') : ''}</p>`
  }

  function reviewMarkup(): string {
    return `<p>Replay individual turns, then repeat the useful sentences aloud.</p>
      <div class="listening-turns">${lesson.lines.map((line, index) => `<article><h3>${index + 1} · ${escape(line.speaker)}</h3>
        <button class="btn secondary" type="button" data-speak-line="${index}">▶ Play turn ${index + 1}</button>
        <details><summary>Show German & translation</summary><p lang="de">${escape(line.german)}</p><p>${escape(line.english)}</p></details>
      </article>`).join('')}</div>
      <div class="listening-turns medical-practice">${lesson.practice.map((item, index) => {
        const line = lesson.lines.find(candidate => candidate.id === item.lineId)!
        return `<article><span class="lesson-kicker">PRACTISE ${index + 1} OF ${lesson.practice.length}</span><h3>${escape(item.focus)}</h3>
          <p class="listening-german" lang="de">${escape(line.german)}</p><button class="btn secondary" type="button" data-speak-practice="${index}">▶ Hear the sentence</button>
          <p class="listening-hint">${escape(item.tip)}</p><p><strong>Try this rhythm:</strong> <span lang="de">${escape(item.rhythm)}</span></p></article>`
      }).join('')}</div>`
  }

  function buildResult(): ListeningResult {
    const tf = trueFalseChecked
      ? { correct: lesson.trueFalse.filter((item, index) => trueFalseAnswers[index] === item.answer).length, total: lesson.trueFalse.length }
      : undefined
    const gaps = gapsChecked
      ? { correct: lesson.gaps.filter((gap, index) => gapAnswers[index] === gap.answer).length, total: lesson.gaps.length }
      : undefined
    const correct = (tf?.correct ?? 0) + (gaps?.correct ?? 0) + (sequenceChecked && sequenceCorrect ? 1 : 0)
    const total = (tf?.total ?? 0) + (gaps?.total ?? 0) + (sequenceChecked ? 1 : 0)
    return {
      lessonId: lesson.id,
      chapterId: lesson.chapterId,
      level: lesson.level,
      correct,
      total,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
      tasks: {
        trueFalse: tf,
        gaps,
        sequence: sequenceChecked ? sequenceCorrect : undefined,
      },
      completedAt: Date.now(),
    }
  }

  function resultMarkup(result: ListeningResult): string {
    const task = (label: string, score?: { correct: number; total: number }) => `<li><strong>${label}:</strong> ${score ? `${score.correct}/${score.total}` : 'not checked'}</li>`
    const sequenceLabel = result.tasks.sequence === undefined ? 'not checked' : result.tasks.sequence ? 'correct' : 'retry recommended'
    if (!result.total) {
      return `<div class="listening-hint"><strong>No comprehension result yet.</strong> You finished the speaking practice, but none of the scored tasks were checked. Retry the lesson and check the tasks to create a progress result.</div>`
    }
    const nextStep = result.accuracy >= 85
      ? 'Strong result. Next time, try the conversation at normal speed and answer without opening the transcript.'
      : result.accuracy >= 60
        ? 'Good basis. Retry the task type with the most errors before moving on.'
        : 'Repeat the conversation once at the slower speed, then retry the comprehension tasks.'
    return `<div class="listening-hint"><span class="lesson-kicker">COMPREHENSION RESULT</span><h2>${result.correct}/${result.total} correct · ${result.accuracy}%</h2>
      <ul>${task('True / false', result.tasks.trueFalse)}${task('Gap fill', result.tasks.gaps)}<li><strong>Event order:</strong> ${sequenceLabel}</li></ul><p><strong>Next step:</strong> ${escape(nextStep)}</p></div>`
  }

  function render(focus = false): void {
    stop()
    const body = stage === 0
      ? `<p>${escape(lesson.scenario)}</p><div class="listening-hint">The transcript is hidden. Several details sound plausible, so listen for what is finally confirmed.</div>`
      : stage === 1
        ? `<p>Decide whether each statement matches the conversation.</p><form data-true-false>${trueFalseMarkup()}<button class="btn primary" type="submit">Check answers</button><p data-tf-result role="status"></p></form>`
        : stage === 2
          ? `<p>Choose the words you heard. Replay the conversation whenever you need it.</p><form data-gaps>${gapsMarkup()}<button class="btn primary" type="submit">Check gaps</button><p data-gap-result role="status"></p></form>`
          : stage === 3 ? sequenceMarkup() : reviewMarkup()

    const topicLabel = lesson.topicLabel ?? (lesson.id === 'travel-disruption-v1' ? 'TRAVEL & DISRUPTIONS' : 'HEALTH & APPOINTMENTS')
    target.innerHTML = `<section class="listening-lesson" aria-labelledby="doctor-listening-title">
      <button class="lesson-back" type="button" data-doctor-exit>← Back to lessons</button>
      <header><span class="lesson-kicker">${escape(lesson.level)} · ${escape(topicLabel)}</span><h1 id="doctor-listening-title">${escape(lesson.title)}</h1><p>A realistic conversation with details that matter.</p></header>
      <ol class="listening-progress medical-progress" aria-label="Exercise progress">${stages.map((name, index) => `<li ${index === stage ? 'aria-current="step"' : ''}>${index + 1}. ${name}</li>`).join('')}</ol>
      <section class="lesson-card"><h2 tabindex="-1" data-stage-heading>${stage + 1}. ${stages[stage]}</h2>
        <div class="listening-player"><button class="btn primary" type="button" data-play-dialogue>▶ Play full conversation</button>
          <label>Playback speed <select data-doctor-speed><option value="${lesson.speechRate ?? 0.95}">Normal</option><option value="${Math.max(0.72, (lesson.speechRate ?? 0.95) - 0.18)}">Slower</option></select></label>
          <p data-doctor-audio-status role="status">Press play when you are ready.</p><small>Computer-generated German audio. Audio is created by your device.${lesson.useMultipleVoices ? ' Three different German voices are used when available.' : lesson.useTwoVoices ? ' Two different German voices are used when available.' : ''}</small></div>
        ${body}
        <nav class="listening-navigation" aria-label="Exercise navigation">${stage > 0 ? '<button class="btn secondary" type="button" data-doctor-previous>← Back</button>' : '<span></span>'}
          <button class="btn primary" type="button" data-doctor-next>${stage === stages.length - 1 ? 'Finish practice ✓' : `${stages[stage + 1]} →`}</button></nav>
      </section></section>`
    localizeMarkup()

    const status = target.querySelector<HTMLElement>('[data-doctor-audio-status]')!
    const speed = target.querySelector<HTMLSelectElement>('[data-doctor-speed]')!
    speed.value = String(rate)
    speed.addEventListener('change', () => { rate = Number(speed.value) })
    target.querySelector('[data-play-dialogue]')?.addEventListener('click', () => speakDialogue(status))
    target.querySelectorAll<HTMLInputElement>('[name^="tf-"]').forEach(input => input.addEventListener('change', () => {
      trueFalseAnswers[Number(input.name.slice(3))] = input.value === 'true'; trueFalseChecked = false
    }))
    target.querySelector<HTMLFormElement>('[data-true-false]')?.addEventListener('submit', event => {
      event.preventDefault()
      const result = target.querySelector<HTMLElement>('[data-tf-result]')!
      if (lesson.trueFalse.some((_, index) => trueFalseAnswers[index] === undefined)) { result.textContent = localize('Answer every statement first.'); return }
      trueFalseChecked = true; render(); target.querySelector<HTMLButtonElement>('[data-true-false] [type="submit"]')?.focus()
    })
    target.querySelectorAll<HTMLSelectElement>('[name^="gap-"]').forEach(select => select.addEventListener('change', () => {
      gapAnswers[Number(select.name.slice(4))] = select.value || undefined; gapsChecked = false
    }))
    target.querySelector<HTMLFormElement>('[data-gaps]')?.addEventListener('submit', event => {
      event.preventDefault()
      const result = target.querySelector<HTMLElement>('[data-gap-result]')!
      if (lesson.gaps.some((_, index) => !gapAnswers[index])) { result.textContent = localize('Complete every gap first.'); return }
      gapsChecked = true; render(); target.querySelector<HTMLButtonElement>('[data-gaps] [type="submit"]')?.focus()
    })
    target.querySelectorAll<HTMLButtonElement>('[data-move-up],[data-move-down]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.moveUp || button.dataset.moveDown!
      const from = sequence.findIndex(item => item.id === id)
      const to = button.dataset.moveUp ? from - 1 : from + 1
      ;[sequence[from], sequence[to]] = [sequence[to], sequence[from]]
      sequenceChecked = false
      render()
    }))
    target.querySelector('[data-check-sequence]')?.addEventListener('click', () => {
      sequenceCorrect = sequence.every((item, index) => item.id === lesson.sequence[index].id)
      sequenceChecked = true
      target.querySelector<HTMLElement>('[data-sequence-result]')!.textContent = localize(sequenceCorrect ? '✓ Correct. That is the order of the call.' : 'Not quite. Listen again and check where the important details change.')
    })
    target.querySelectorAll<HTMLButtonElement>('[data-speak-line]').forEach(button => button.addEventListener('click', () => { const line = lesson.lines[Number(button.dataset.speakLine)]; speak(line.german, status, voiceForSpeaker(line.speaker)) }))
    target.querySelectorAll<HTMLButtonElement>('[data-speak-practice]').forEach(button => button.addEventListener('click', () => {
      const item = lesson.practice[Number(button.dataset.speakPractice)]
      const line = lesson.lines.find(line => line.id === item.lineId)!
      speak(line.german, status, voiceForSpeaker(line.speaker))
    }))
    target.querySelector('[data-doctor-exit]')?.addEventListener('click', () => { disposeDoctorListeningLesson(); onExit() })
    target.querySelector('[data-doctor-previous]')?.addEventListener('click', () => { stage--; render(true) })
    target.querySelector('[data-doctor-next]')?.addEventListener('click', () => {
      if (stage < stages.length - 1) { stage++; render(true); return }
      const result = buildResult()
      onComplete?.(result)
      disposeDoctorListeningLesson()
      const completionTitle = lesson.completionTitle ?? (lesson.id === 'doctor-appointment-v1' ? "You made a doctor's appointment." : lesson.id === 'travel-disruption-v1' ? 'You solved a disrupted journey.' : 'You understood a medical consultation.')
      const completionText = lesson.completionText ?? (lesson.id === 'doctor-appointment-v1' ? 'You understood symptoms, a rejected time and the final appointment details.' : lesson.id === 'travel-disruption-v1' ? 'You tracked delays, rejected alternatives, a platform change and the final valid connection.' : 'You followed symptoms, an examination, medication instructions and warning signs.')
      target.innerHTML = `<section class="listening-lesson lesson-card"><span class="lesson-kicker">PRACTICE COMPLETE</span><h1 tabindex="-1">${escape(completionTitle)}</h1><p>${escape(completionText)}</p>${resultMarkup(result)}<div class="listening-navigation"><button class="btn secondary" type="button" data-doctor-retry>Retry lesson</button><button class="btn primary" type="button" data-doctor-done>Back to lessons</button></div></section>`
    localizeMarkup()
      target.querySelector('h1')?.focus()
      target.querySelector('[data-doctor-retry]')?.addEventListener('click', () => renderMedicalListeningLesson(target, onExit, lesson, onComplete))
      target.querySelector('[data-doctor-done]')?.addEventListener('click', onExit)
    })
    if (focus) target.querySelector<HTMLElement>('[data-stage-heading]')?.focus()
  }
  render(true)
}

export function workshopListeningEntry(): string {
  return `<section class="listening-entry lesson-card" lang="de"><div><span class="lesson-kicker">B1 · AUFGABEN AUF DEUTSCH · 20–25 MIN</span><h2>Eine Weiterbildung planen</h2><p>Verstehe Gründe, Bedingungen und geänderte Absprachen. Fragen, Arbeitsanweisungen und Feedback sind auf Deutsch.</p></div><button type="button" class="btn primary" data-workshop-listening-start>Lektion starten →</button></section>`
}
export function renderWorkshopListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, workshopLesson, onComplete)
}

export function complaintListeningEntry(): string {
  return `<section class="listening-entry lesson-card" lang="de"><div><span class="lesson-kicker">B1 · AUFGABEN AUF DEUTSCH · 20–25 MIN</span><h2>Eine beschädigte Lieferung reklamieren</h2><p>Vergleiche Lösungen, verstehe Bedingungen und bestätige eine Vereinbarung. Alle Aufgaben und Rückmeldungen sind auf Deutsch.</p></div><button type="button" class="btn primary" data-complaint-listening-start>Lektion starten →</button></section>`
}
export function renderComplaintListeningLesson(target: HTMLElement, onExit: () => void, onComplete?: ListeningComplete): void {
  renderMedicalListeningLesson(target, onExit, complaintLesson, onComplete)
}
