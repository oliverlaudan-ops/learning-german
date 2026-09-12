import lesson from '../data/weekend-listening.json'
import './listening-lesson.css'

const stages = ['Listen', 'Understand', 'Listen again', 'Speak']
let cleanup: (() => void) | undefined

/** Release playback when navigation or a profile change replaces the lesson. */
export function disposeListeningLesson(): void {
  cleanup?.()
  cleanup = undefined
}

function escape(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))
}

export function listeningEntry(): string {
  return `<section class="listening-entry lesson-card">
    <div><span class="lesson-kicker">A2 · LISTEN & SPEAK · 5–10 MIN</span>
    <h2>${escape(lesson.title)}</h2><p>Hear a short conversation, understand the plans and practise saying them yourself.</p></div>
    <button type="button" class="btn primary" data-listening-start>Start listening →</button>
  </section>`
}

export function renderListeningLesson(target: HTMLElement, onExit: () => void): void {
  disposeListeningLesson()
  let stage = 0
  const answers: Array<number | undefined> = []
  let checked = false
  let playbackRate = 1
  let player: HTMLAudioElement | undefined
  let disposed = false
  const stop = () => {
    if (player) {
      player.pause()
      player.removeAttribute('src')
      player.load()
    }
  }
  const onVisibility = () => { if (document.hidden) player?.pause() }
  document.addEventListener('visibilitychange', onVisibility)
  cleanup = () => {
    disposed = true
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
  }

  const playButton = (id: string, label: string) => `<button class="btn secondary" type="button" data-clip="${id}">${label}</button>`
  const questions = () => lesson.questions.map((question, i) => `<fieldset class="listening-question">
    <legend>${i + 1}. ${escape(question.prompt)}</legend>
    ${question.options.map((option, j) => `<label><input type="radio" name="question-${i}" value="${j}" ${answers[i] === j ? 'checked' : ''}> ${escape(option)}</label>`).join('')}
    ${checked ? `<p class="listening-feedback ${answers[i] === question.answer ? 'correct' : 'retry'}">${answers[i] === question.answer ? '✓ Correct.' : 'Listen again.'} ${escape(question.explanation)}</p>` : ''}
  </fieldset>`).join('')

  function render(focus = false): void {
    stop()
    const body = stage === 0
      ? `<p>${escape(lesson.scenario)}</p><div class="listening-hint">First, just listen. You can replay as often as you like. The words and translations come later.</div>`
      : stage === 1
        ? `<p>Listen again if you need to. One suggested time changes — listen for the final agreement.</p>
          <form data-questions>${questions()}<button class="btn primary" type="submit">Check answers</button><p data-result role="status">${checked ? `${lesson.questions.filter((q, i) => answers[i] === q.answer).length} of ${lesson.questions.length} correct. You can change your answers and check again.` : ''}</p></form>`
        : stage === 2
          ? `<p>Replay one turn at a time. Open the text only when you need it.</p><div class="listening-turns">${lesson.lines.map((line, i) => `<article>
            <h3>${i + 1} · ${escape(line.speaker)}</h3>${playButton(line.id, `▶ Play turn ${i + 1}`)}
            <details><summary>Show German & translation</summary><p lang="de">${escape(line.german)}</p><p>${escape(line.english)}</p></details>
          </article>`).join('')}</div>`
          : `<p>Listen to each part, pause and repeat it aloud. Then join the parts into a whole sentence. No microphone is needed.</p>
            <div class="listening-turns">${lesson.practice.map((practice, i) => {
              const line = lesson.lines.find(item => item.id === practice.lineId)!
              return `<article><span class="lesson-kicker">PRACTISE ${i + 1} OF ${lesson.practice.length}</span><h3>${escape(practice.focus)}</h3>
                <p class="listening-german" lang="de">${escape(line.german)}</p><p>${escape(line.english)}</p>
                <div class="listening-chunks">${practice.chunks.map(chunk => playButton(chunk.id, `▶ <span lang="de">${escape(chunk.german)}</span>`)).join('')}</div>
                ${playButton(line.id, '▶ Hear the whole sentence')}<p class="listening-hint">${escape(practice.tip)}</p>
                <p><strong>Try this rhythm:</strong> <span lang="de">${escape(practice.rhythm)}</span></p><small>Capital letters show emphasis; / marks a short pause.</small>
              </article>`
            }).join('')}</div><div class="listening-hint"><strong>Your turn:</strong> Suggest a different time and place. Try: <span lang="de">„Treffen wir uns um …?“</span> Then say your answer without looking.</div>`

    target.innerHTML = `<section class="listening-lesson" aria-labelledby="listening-title">
      <button class="lesson-back" type="button" data-listening-exit>← Back to lessons</button>
      <header><span class="lesson-kicker">A2 · HOBBIES & FREE TIME</span><h1 id="listening-title">${escape(lesson.title)}</h1><p>A small conversation. A plan you can make yourself.</p></header>
      <ol class="listening-progress" aria-label="Exercise progress">${stages.map((name, i) => `<li ${i === stage ? 'aria-current="step"' : ''}>${i + 1}. ${name}</li>`).join('')}</ol>
      <section class="lesson-card"><h2 tabindex="-1" data-stage-heading>${stage + 1}. ${stages[stage]}</h2>
        <div class="listening-player">
          <button class="btn primary" type="button" data-clip="dialogue">▶ Play full conversation</button>
          <audio controls preload="none" aria-label="German audio player"></audio>
          <label>Playback speed <select data-speed><option value="1">Normal</option><option value="0.8">Slower</option></select></label>
          <p data-audio-status role="status">Press play when you are ready.</p>
          <small>Computer-generated German audio. Both friends use the same voice. Audio loads only when played.</small>
        </div>
        ${body}
        <nav class="listening-navigation" aria-label="Exercise navigation">${stage > 0 ? '<button class="btn secondary" type="button" data-previous>← Back</button>' : '<span></span>'}
          <button class="btn primary" type="button" data-next>${stage === 3 ? 'Finish practice ✓' : `${stages[stage + 1]} →`}</button>
        </nav>
      </section>
    </section>`
    player = target.querySelector('audio')!
    const currentPlayer = player
    const status = target.querySelector<HTMLElement>('[data-audio-status]')!
    const speed = target.querySelector<HTMLSelectElement>('[data-speed]')!
    speed.value = String(playbackRate)
    const showError = () => { status.textContent = 'Audio could not play. Check your connection and try again, or continue with the text in Listen again.' }
    currentPlayer.addEventListener('error', showError)
    currentPlayer.addEventListener('ended', () => { status.textContent = 'Finished. Replay the audio or continue when you are ready.' })
    speed.addEventListener('change', () => {
      playbackRate = Number(speed.value)
      currentPlayer.playbackRate = playbackRate
    })
    let playRequest = 0
    target.querySelectorAll<HTMLButtonElement>('[data-clip]').forEach(button => button.addEventListener('click', () => {
      const request = ++playRequest
      currentPlayer.pause()
      currentPlayer.src = `${import.meta.env.BASE_URL}audio/${lesson.id}/${button.dataset.clip}.mp3`
      currentPlayer.playbackRate = Number(speed.value)
      status.textContent = `Loading: ${button.textContent?.replace('▶', '').trim()}…`
      void currentPlayer.play().then(() => {
        if (!disposed && player === currentPlayer && request === playRequest) status.textContent = `Playing: ${button.textContent?.replace('▶', '').trim()}. Use the player to pause or replay.`
      }).catch(error => {
        if (!disposed && player === currentPlayer && request === playRequest && error?.name !== 'AbortError') showError()
      })
    }))
    target.querySelector<HTMLFormElement>('[data-questions]')?.addEventListener('change', event => {
      const input = event.target as HTMLInputElement
      if (input.type !== 'radio') return
      answers[Number(input.name.replace('question-', ''))] = Number(input.value)
      // Clear stale feedback without moving focus away from the selected radio.
      checked = false
      target.querySelectorAll('.listening-feedback').forEach(element => element.remove())
      target.querySelector('[data-result]')!.textContent = ''
    })
    target.querySelector<HTMLFormElement>('[data-questions]')?.addEventListener('submit', event => {
      event.preventDefault()
      if (lesson.questions.some((_, i) => answers[i] === undefined)) {
        target.querySelector('[data-result]')!.textContent = 'Choose an answer for each question first. You can listen again at any time.'
        return
      }
      checked = true
      render()
      target.querySelector<HTMLButtonElement>('[type="submit"]')?.focus()
    })
    target.querySelector('[data-listening-exit]')?.addEventListener('click', () => { disposeListeningLesson(); onExit() })
    target.querySelector('[data-previous]')?.addEventListener('click', () => { stage--; render(true) })
    target.querySelector('[data-next]')?.addEventListener('click', () => {
      if (stage < 3) { stage++; render(true); return }
      disposeListeningLesson()
      target.innerHTML = `<section class="listening-lesson lesson-card"><span class="lesson-kicker">PRACTICE COMPLETE</span><h1 tabindex="-1">You made a weekend plan.</h1><p>You practised listening for details and saying a time and meeting place. Come back and try the conversation again without the text.</p><button class="btn primary" type="button" data-done>Back to lessons</button></section>`
      target.querySelector('h1')?.focus()
      target.querySelector('[data-done]')?.addEventListener('click', onExit)
    })
    if (focus) target.querySelector<HTMLElement>('[data-stage-heading]')?.focus()
  }
  render(true)
}
