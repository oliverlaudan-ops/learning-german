import appointmentLesson from '../data/doctor-appointment-listening.json'
import consultationLesson from '../data/doctor-consultation-listening.json'
import travelLesson from '../data/travel-disruption-listening.json'
import './listening-lesson.css'

const stages = ['Listen', 'True or false', 'Fill the gaps', 'Put in order', 'Review & speak']
let cleanup: (() => void) | undefined

type AppWindow = Window & typeof globalThis & {
  SpeechSynthesisUtterance?: typeof SpeechSynthesisUtterance
  speechSynthesis?: SpeechSynthesis
}

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

export function renderDoctorListeningLesson(target: HTMLElement, onExit: () => void): void {
  renderMedicalListeningLesson(target, onExit, appointmentLesson)
}

export function renderConsultationListeningLesson(target: HTMLElement, onExit: () => void): void {
  renderMedicalListeningLesson(target, onExit, consultationLesson)
}

export function renderTravelListeningLesson(target: HTMLElement, onExit: () => void): void {
  renderMedicalListeningLesson(target, onExit, travelLesson)
}

function renderMedicalListeningLesson(target: HTMLElement, onExit: () => void, lesson: typeof appointmentLesson & { speechRate?: number; useTwoVoices?: boolean }): void {
  disposeDoctorListeningLesson()
  let stage = 0
  let rate = lesson.speechRate ?? 0.95
  let disposed = false
  const trueFalseAnswers: Array<boolean | undefined> = []
  const gapAnswers: Array<string | undefined> = []
  let trueFalseChecked = false
  let gapsChecked = false
  let sequence = [...lesson.sequence].reverse()

  const stop = () => (window as AppWindow).speechSynthesis?.cancel()
  cleanup = () => { disposed = true; stop() }

  const speakers = [...new Set(lesson.lines.map(line => line.speaker))]
  const voiceForSpeaker = (speaker: string) => lesson.useTwoVoices ? Math.max(0, speakers.indexOf(speaker)) : 0

  function speak(text: string, status: HTMLElement, voiceIndex = 0, onFinished?: () => void, cancelFirst = true): void {
    if (cancelFirst) stop()
    const appWindow = window as AppWindow
    if (!appWindow.speechSynthesis || !appWindow.SpeechSynthesisUtterance) {
      status.textContent = 'Audio is not available in this browser. Continue with the transcript in the final step.'
      return
    }
    const utterance = new appWindow.SpeechSynthesisUtterance(text)
    const voices = selectGermanVoices(appWindow.speechSynthesis.getVoices())
    utterance.lang = 'de-DE'
    utterance.rate = rate
    if (voices.length) utterance.voice = voices[voiceIndex % voices.length]
    utterance.onstart = () => { if (!disposed) status.textContent = 'Playing German audio…' }
    utterance.onend = () => {
      if (disposed) return
      if (onFinished) onFinished()
      else status.textContent = 'Finished. Replay or continue when you are ready.'
    }
    utterance.onerror = () => { if (!disposed) status.textContent = 'Audio could not play. Please try again.' }
    appWindow.speechSynthesis.speak(utterance)
  }

  function speakDialogue(status: HTMLElement): void {
    stop()
    let index = 0
    const next = () => {
      if (disposed || index >= lesson.lines.length) {
        if (!disposed) status.textContent = 'Finished. Replay or continue when you are ready.'
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
      </span></li>`).join('')}</ol><button class="btn primary" type="button" data-check-sequence>Check order</button><p data-sequence-result role="status"></p>`
  }

  function reviewMarkup(): string {
    return `<p>Replay individual turns, then repeat the four useful sentences aloud.</p>
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

  function render(focus = false): void {
    stop()
    const body = stage === 0
      ? `<p>${escape(lesson.scenario)}</p><div class="listening-hint">The transcript is hidden. Dates and times may change during the call, so listen for the final agreement.</div>`
      : stage === 1
        ? `<p>Decide whether each statement matches the conversation.</p><form data-true-false>${trueFalseMarkup()}<button class="btn primary" type="submit">Check answers</button><p data-tf-result role="status"></p></form>`
        : stage === 2
          ? `<p>Choose the words you heard. Replay the conversation whenever you need it.</p><form data-gaps>${gapsMarkup()}<button class="btn primary" type="submit">Check gaps</button><p data-gap-result role="status"></p></form>`
          : stage === 3 ? sequenceMarkup() : reviewMarkup()

    target.innerHTML = `<section class="listening-lesson" aria-labelledby="doctor-listening-title">
      <button class="lesson-back" type="button" data-doctor-exit>← Back to lessons</button>
      <header><span class="lesson-kicker">${escape(lesson.level)} · HEALTH & APPOINTMENTS</span><h1 id="doctor-listening-title">${escape(lesson.title)}</h1><p>A realistic medical conversation with details that matter.</p></header>
      <ol class="listening-progress medical-progress" aria-label="Exercise progress">${stages.map((name, index) => `<li ${index === stage ? 'aria-current="step"' : ''}>${index + 1}. ${name}</li>`).join('')}</ol>
      <section class="lesson-card"><h2 tabindex="-1" data-stage-heading>${stage + 1}. ${stages[stage]}</h2>
        <div class="listening-player"><button class="btn primary" type="button" data-play-dialogue>▶ Play full conversation</button>
          <label>Playback speed <select data-doctor-speed><option value="0.95">Normal</option><option value="0.78">Slower</option></select></label>
          <p data-doctor-audio-status role="status">Press play when you are ready.</p><small>Computer-generated German audio. Audio is created by your device.</small></div>
        ${body}
        <nav class="listening-navigation" aria-label="Exercise navigation">${stage > 0 ? '<button class="btn secondary" type="button" data-doctor-previous>← Back</button>' : '<span></span>'}
          <button class="btn primary" type="button" data-doctor-next>${stage === stages.length - 1 ? 'Finish practice ✓' : `${stages[stage + 1]} →`}</button></nav>
      </section></section>`

    const status = target.querySelector<HTMLElement>('[data-doctor-audio-status]')!
    const speed = target.querySelector<HTMLSelectElement>('[data-doctor-speed]')!
    speed.value = String(rate)
    speed.addEventListener('change', () => { rate = Number(speed.value) })
    target.querySelector('[data-play-dialogue]')?.addEventListener('click', () => speak(lesson.lines.map(line => line.german).join('   '), status))
    target.querySelectorAll<HTMLInputElement>('[name^="tf-"]').forEach(input => input.addEventListener('change', () => {
      trueFalseAnswers[Number(input.name.slice(3))] = input.value === 'true'; trueFalseChecked = false
    }))
    target.querySelector<HTMLFormElement>('[data-true-false]')?.addEventListener('submit', event => {
      event.preventDefault()
      const result = target.querySelector<HTMLElement>('[data-tf-result]')!
      if (lesson.trueFalse.some((_, index) => trueFalseAnswers[index] === undefined)) { result.textContent = 'Answer every statement first.'; return }
      trueFalseChecked = true; render(); target.querySelector<HTMLButtonElement>('[data-true-false] [type="submit"]')?.focus()
    })
    target.querySelectorAll<HTMLSelectElement>('[name^="gap-"]').forEach(select => select.addEventListener('change', () => {
      gapAnswers[Number(select.name.slice(4))] = select.value || undefined; gapsChecked = false
    }))
    target.querySelector<HTMLFormElement>('[data-gaps]')?.addEventListener('submit', event => {
      event.preventDefault()
      const result = target.querySelector<HTMLElement>('[data-gap-result]')!
      if (lesson.gaps.some((_, index) => !gapAnswers[index])) { result.textContent = 'Complete every gap first.'; return }
      gapsChecked = true; render(); target.querySelector<HTMLButtonElement>('[data-gaps] [type="submit"]')?.focus()
    })
    target.querySelectorAll<HTMLButtonElement>('[data-move-up],[data-move-down]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.moveUp || button.dataset.moveDown!
      const from = sequence.findIndex(item => item.id === id)
      const to = button.dataset.moveUp ? from - 1 : from + 1
      ;[sequence[from], sequence[to]] = [sequence[to], sequence[from]]
      render()
    }))
    target.querySelector('[data-check-sequence]')?.addEventListener('click', () => {
      const correct = sequence.every((item, index) => item.id === lesson.sequence[index].id)
      target.querySelector<HTMLElement>('[data-sequence-result]')!.textContent = correct ? '✓ Correct. That is the order of the call.' : 'Not quite. Listen again and check where the appointment changes.'
    })
    target.querySelectorAll<HTMLButtonElement>('[data-speak-line]').forEach(button => button.addEventListener('click', () => speak(lesson.lines[Number(button.dataset.speakLine)].german, status)))
    target.querySelectorAll<HTMLButtonElement>('[data-speak-practice]').forEach(button => button.addEventListener('click', () => {
      const item = lesson.practice[Number(button.dataset.speakPractice)]
      speak(lesson.lines.find(line => line.id === item.lineId)!.german, status)
    }))
    target.querySelector('[data-doctor-exit]')?.addEventListener('click', () => { disposeDoctorListeningLesson(); onExit() })
    target.querySelector('[data-doctor-previous]')?.addEventListener('click', () => { stage--; render(true) })
    target.querySelector('[data-doctor-next]')?.addEventListener('click', () => {
      if (stage < stages.length - 1) { stage++; render(true); return }
      disposeDoctorListeningLesson()
      target.innerHTML = `<section class="listening-lesson lesson-card"><span class="lesson-kicker">PRACTICE COMPLETE</span><h1 tabindex="-1">${lesson.id === 'doctor-appointment-v1' ? "You made a doctor's appointment." : 'You understood a medical consultation.'}</h1><p>${lesson.id === 'doctor-appointment-v1' ? 'You understood symptoms, a rejected time and the final appointment details.' : 'You followed symptoms, an examination, medication instructions and warning signs.'}</p><button class="btn primary" type="button" data-doctor-done>Back to lessons</button></section>`
      target.querySelector('h1')?.focus()
      target.querySelector('[data-doctor-done]')?.addEventListener('click', onExit)
    })
    if (focus) target.querySelector<HTMLElement>('[data-stage-heading]')?.focus()
  }
  render(true)
}
