import './goethe-b1.css'

type Item = { prompt: string; options: string[]; answer: number; explanation: string }
const items: Item[] = [
 { prompt: 'Der Bus ist ___ abgefahren. Du hast ihn verpasst.', options: ['schon', 'noch', 'erst'], answer: 0, explanation: 'Schon = already: the bus has left. Noch = still; erst = not until / only, depending on context.' },
 { prompt: 'Der Termin beginnt ___ um 15 Uhr. Jetzt ist es 14 Uhr.', options: ['schon', 'erst', 'nicht mehr'], answer: 1, explanation: 'Erst um 15 Uhr = not until 3 p.m. Schon um 15 Uhr would express that 3 p.m. is surprisingly early.' },
 { prompt: 'Die Apotheke ist ___ geöffnet; sie schließt in zehn Minuten.', options: ['noch', 'nicht mehr', 'nie'], answer: 0, explanation: 'Noch geöffnet = still open. Nicht mehr geöffnet = no longer open.' },
 { prompt: 'Es regnet. ___ geht Mira zu Fuß zur Arbeit.', options: ['Deshalb', 'Trotzdem', 'Danach'], answer: 1, explanation: 'Trotzdem = nevertheless: she walks despite the rain. Deshalb introduces a consequence.' },
 { prompt: 'Der Zug fällt aus. ___ nimmt Leo den Bus.', options: ['Trotzdem', 'Deshalb', 'Vorher'], answer: 1, explanation: 'Deshalb = therefore: the cancelled train is the reason Leo takes the bus.' },
 { prompt: '___ bezahle ich an der Kasse, danach packe ich die Einkäufe ein.', options: ['Zuerst', 'Zuletzt', 'Danach'], answer: 0, explanation: 'Zuerst = first; danach = afterwards; zuletzt = last.' },
 { prompt: 'Ich komme ___ zum Kurs: an drei Tagen pro Woche.', options: ['oft', 'nie', 'immer'], answer: 0, explanation: 'Oft = often. Nie means never and immer means always.' },
 { prompt: 'I will call you back soon. Welche Übersetzung passt?', options: ['Ich rufe dich bald zurück.', 'Ich rufe dich selten zurück.', 'Ich rufe dich früher zurück.'], answer: 0, explanation: 'Bald means soon, not „bold“. Selten = rarely; früher = earlier.' },
 { prompt: 'Actually, the shop is closed. Was bedeutet „actually“ hier?', options: ['Aktuell ist das Geschäft geschlossen.', 'Eigentlich ist das Geschäft geschlossen.', 'Das Geschäft ist später geschlossen.'], answer: 1, explanation: 'Actually often means „eigentlich“ or „tatsächlich“. „Aktuell“ means currently; it does not generally mean actually.' },
 { prompt: 'Die Bibliothek öffnet um 10 Uhr. Ich bin ___ um 9:30 Uhr dort.', options: ['schon', 'erst', 'nicht mehr'], answer: 0, explanation: 'Schon um 9:30 Uhr highlights an early time. Erst um 9:30 Uhr would frame that same time as late.' },
 { prompt: 'Zuerst fülle ich das Formular aus. ___ schicke ich es ab.', options: ['Danach', 'Davor', 'Selten'], answer: 0, explanation: 'Danach = afterwards; davor = before that.' },
 { prompt: 'Das Café ist montags geschlossen. Heute ist Montag. Es ist ___ geöffnet.', options: ['nicht', 'noch', 'schon'], answer: 0, explanation: 'Nicht geöffnet = not open. „Noch nicht“ means not yet, which the information does not establish.' },
]
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
export function ensureAdverbNavigation(): void {
 const tabs = document.querySelector('.tabs')
 const reading = tabs?.querySelector<HTMLElement>('[data-tab="reading"]')
 if (!tabs || !reading) return
 if (!document.getElementById('adverbs-tab')) {
  const main = document.createElement('main')
  main.id = 'adverbs-tab'; main.className = 'tab-content hidden'
  tabs.insertAdjacentElement('afterend', main)
 }
 if (!tabs.querySelector('[data-tab="adverbs"]')) {
  const button = document.createElement('button')
  button.type = 'button'; button.className = 'tab'; button.dataset.tab = 'adverbs'; button.textContent = '🔎 Adverbs'
  reading.insertAdjacentElement('afterend', button)
  button.addEventListener('click', () => window.showTab('adverbs'))
 }
}
export function renderAdverbWorkshop(): void {
 const host = document.getElementById('adverbs-tab')
 if (!host) return
 let index = 0
 let answers: Record<number, number> = {}
 let checked = false
 let finished = false
 let order = items.map((_, i) => i)
 const render = () => {
  const item = items[order[index]!]!
  const score = order.filter(i => answers[i] === items[i]!.answer).length
  host.innerHTML = `<section class="dashboard-card goethe-entry">
  <p class="card-kicker">A2 → B1 · WORTSCHATZ</p><h2>Adverb Workshop</h2>
  <p>Small words can change the whole meaning. Learn common contrasts, then practise in context. The English notes are optional support.</p>
  <details><summary>Compare the words · Beispiele und Bedeutung</summary>
   <p><strong>schon / erst:</strong> already or as early as / not until or only. „Schon um 9 Uhr“ can sound early; „erst um 9 Uhr“ can sound late. Context matters.</p>
   <p><strong>noch / nicht mehr:</strong> still / no longer. „Das Geschäft ist noch offen“ / „Es ist nicht mehr offen“.</p>
   <p><strong>deshalb / trotzdem:</strong> therefore / nevertheless. „Es regnet, deshalb bleibe ich zu Hause“ / „Es regnet, trotzdem gehe ich spazieren“.</p>
   <p><strong>zuerst / danach / davor:</strong> first / afterwards / before that. „Zuerst lerne ich, danach koche ich.“</p>
   <p><strong>oft / selten / nie:</strong> often / rarely / never. These do not describe exact percentages.</p>
   <p><strong>False friend:</strong> English „actually“ usually means „eigentlich“ or „tatsächlich“; German „aktuell“ means currently.</p>
  </details>
  ${finished ? `<h3 role="status">Ergebnis: ${score} / ${order.length}</h3><p>Review any difficult words and try again.</p><button class="btn primary" data-retry>Alle wiederholen</button> ${score < order.length ? '<button class="btn secondary" data-mistakes>Nur Fehler wiederholen</button>' : ''}`
  : `<p>Aufgabe ${index + 1} / ${order.length}</p><fieldset class="goethe-question"><legend>${esc(item.prompt)}</legend>
    ${item.options.map((option, i) => `<label><input type="radio" name="adverb-answer" value="${i}" ${answers[order[index]!] === i ? 'checked' : ''} ${checked ? 'disabled' : ''}> ${esc(option)}</label>`).join('')}</fieldset>
    ${checked ? `<p class="goethe-feedback" role="status">${answers[order[index]!] === item.answer ? '✓ Richtig!' : '✗ Richtige Antwort: ' + esc(item.options[item.answer]!)} ${esc(item.explanation)}</p><button class="btn primary" data-next>${index === order.length - 1 ? 'Ergebnis anzeigen' : 'Weiter →'}</button>` : '<button class="btn primary" data-check disabled>Antwort prüfen</button>'}`}
  </section>`
  host.querySelectorAll<HTMLInputElement>('input[name="adverb-answer"]').forEach(input => input.addEventListener('change', () => {
   answers[order[index]!] = Number(input.value)
   const check = host.querySelector<HTMLButtonElement>('[data-check]'); if (check) check.disabled = false
  }))
  host.querySelector('[data-check]')?.addEventListener('click', () => { checked = true; render() })
  host.querySelector('[data-next]')?.addEventListener('click', () => { if (index === order.length - 1) finished = true; else index++; checked = false; render() })
  host.querySelector('[data-retry]')?.addEventListener('click', () => { order = items.map((_, i) => i); answers = {}; index = 0; checked = false; finished = false; render() })
  host.querySelector('[data-mistakes]')?.addEventListener('click', () => { order = order.filter(i => answers[i] !== items[i]!.answer); answers = {}; index = 0; checked = false; finished = false; render() })
 }
 render()
}
