import './pronunciation.css'

type PronunciationLesson = {
  title: string
  focus: string
  explanation: string
  examples: string[]
  prompt: string
  choices: string[]
  answer: number
  feedback: string
}

const lessons: PronunciationLesson[] = [
  {
    title: 'Long and short vowels', focus: 'Vowel length changes meaning',
    explanation: 'A vowel is often long before one consonant or when doubled. Before a doubled consonant it is usually short. Keep long vowels steady; make short vowels quick and relaxed.',
    examples: ['Ofen — open, long o', 'offen — short, open o'],
    prompt: 'Which word has the short vowel?', choices: ['Ofen', 'offen'], answer: 1,
    feedback: 'The double f keeps the o short in offen. In Ofen, one f follows the long o.'
  },
  {
    title: 'Umlauts: ä, ö and ü', focus: 'Shape the mouth carefully',
    explanation: 'For ö, start with “eh” and round your lips. For ü, start with “ee” and round your lips. For ä, open your mouth as for “e”. The tongue stays forward for ö and ü.',
    examples: ['schön — ö', 'Tür — ü', 'Mädchen — ä'],
    prompt: 'To make ü, what should your lips do?', choices: ['Round while the tongue stays forward', 'Pull back as for “oo”'], answer: 0,
    feedback: 'Keep the “ee” tongue position and round the lips; this helps distinguish ü from u.'
  },
  {
    title: 'The two “ch” sounds', focus: 'Soft ich-Laut and back ach-Laut',
    explanation: 'After e, i, ä, ö and ü, ch is usually light and made near the front of the mouth. After a, o, u and au, it is rougher and made farther back.',
    examples: ['ich — light, front sound', 'Buch — rougher, back sound'],
    prompt: 'Which word uses the light, front ch?', choices: ['Buch', 'ich'], answer: 1,
    feedback: 'In ich, the tongue is high and forward. In Buch, ch is farther back.'
  },
  {
    title: 'German consonants: w, z and v', focus: 'Familiar letters, different sounds',
    explanation: 'German w sounds like English “v”. German z sounds like “ts”. The letter v is often an “f” in common German words, though some borrowed words use a voiced sound.',
    examples: ['Wasser — starts like “v”', 'Zeit — starts like “ts”', 'Vater — starts like “f”'],
    prompt: 'How does German z usually sound?', choices: ['Like English “z”', 'Like “ts”'], answer: 1,
    feedback: 'Say Zeit with a clear “ts” sound at the start.'
  },
  {
    title: 'Word stress and sentence melody', focus: 'Make the important syllable clear',
    explanation: 'Many German words stress the first syllable, but prefixes can change this. In a calm statement, the voice often falls near the end. Stress the key word rather than making every syllable equally strong.',
    examples: ['AR-bei-ten — stress the first syllable', 'Ich komme MOR-gen. — key information'],
    prompt: 'Which syllable is stressed in “AR-bei-ten”?', choices: ['AR', 'bei', 'ten'], answer: 0,
    feedback: 'The first syllable is strong: AR-bei-ten. Listen for the rhythm, then repeat the whole word.'
  },
]

function speak(text: string): void {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'de-DE'
  utterance.rate = 0.82
  window.speechSynthesis.speak(utterance)
}

export function renderPronunciation(target: HTMLElement | null): void {
  if (!target) return
  target.innerHTML = `
    <section class="pronunciation-page">
      <header class="pronunciation-intro">
        <p class="eyebrow">A practical speaking workshop</p>
        <h2>German pronunciation</h2>
        <p>Learn the sound patterns, listen to examples, then try a short check. You can revisit these lessons whenever you like.</p>
        <p class="pronunciation-note">Audio uses your browser’s German speech voice when available. These activities help you practise; they do not record or automatically grade your speech.</p>
      </header>
      <div class="pronunciation-lessons">
        ${lessons.map((lesson, index) => `
          <article class="pronunciation-card" data-lesson="${index}">
            <div class="pronunciation-card-heading"><span class="pronunciation-number">${String(index + 1).padStart(2, '0')}</span><div><h3>${lesson.title}</h3><p>${lesson.focus}</p></div></div>
            <p class="pronunciation-explanation">${lesson.explanation}</p>
            <div class="pronunciation-examples">${lesson.examples.map((example) => `<button class="pronunciation-audio" type="button" data-speak="${example.split(' — ')[0]}">🔊 ${example}</button>`).join('')}</div>
            <fieldset class="pronunciation-check"><legend>${lesson.prompt}</legend><div class="pronunciation-choices">${lesson.choices.map((choice, choiceIndex) => `<button type="button" class="pronunciation-choice" data-choice="${choiceIndex}">${choice}</button>`).join('')}</div><p class="pronunciation-feedback" aria-live="polite"></p></fieldset>
          </article>
        `).join('')}
      </div>
      <p class="pronunciation-footnote">Tip: listen once, say the sound slowly, then say the full example at a natural pace.</p>
    </section>
  `
  target.querySelectorAll<HTMLButtonElement>('[data-speak]').forEach((button) => button.addEventListener('click', () => speak(button.dataset.speak || '')))
  target.querySelectorAll<HTMLElement>('.pronunciation-card').forEach((card) => {
    const lesson = lessons[Number(card.dataset.lesson)]
    if (!lesson) return
    card.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach((button) => button.addEventListener('click', () => {
      const correct = Number(button.dataset.choice) === lesson.answer
      const feedback = card.querySelector<HTMLElement>('.pronunciation-feedback')
      if (feedback) {
        feedback.textContent = `${correct ? '✓ Good listening. ' : 'Try once more. '}${lesson.feedback}`
        feedback.classList.toggle('is-correct', correct)
      }
      card.querySelectorAll('.pronunciation-choice').forEach((choice) => choice.classList.remove('selected'))
      button.classList.add('selected')
    }))
  })
}
