/**
 * Goethe B1 Lesen practice with targeted English-language support for German adverbs.
 * Original practice content; it is not official Goethe examination material.
 */
import './goethe-b1-reading.css'

type Question = { prompt: string; options: string[]; answer: number; explanation: string }
type ReadingTask = { title: string; text: string; questions: Question[]; focus: string }
type Mode = 'guided' | 'exam'

const tasks: ReadingTask[] = [
  {
    title: 'Eine Nachricht aus dem Sprachkurs',
    focus: 'time and frequency adverbs',
    text: 'Hallo Judith, unser Deutschkurs findet nächste Woche ausnahmsweise am Mittwoch statt. Normalerweise treffen wir uns dienstags um 18 Uhr, aber unsere Lehrerin ist dann auf einer Fortbildung. Bitte komm diesmal schon um 17:30 Uhr, denn wir schreiben zuerst einen kurzen Lesetest. Danach besprechen wir gemeinsam die Ergebnisse. Wenn du später kommst, kannst du den Test leider nicht nachholen. Sag mir bitte spätestens morgen Bescheid, ob du dabei bist. Viele Grüße, Amina',
    questions: [
      { prompt: 'Wann findet der Kurs normalerweise statt?', options: ['Am Mittwoch.', 'Dienstags um 18 Uhr.', 'Jeden Morgen.'], answer: 1, explanation: '„Normalerweise“ describes what usually happens. The usual time is Tuesday at 18:00.' },
      { prompt: 'Wann soll Judith diesmal kommen?', options: ['Um 17:30 Uhr.', 'Um 18:00 Uhr.', 'Am nächsten Morgen.'], answer: 0, explanation: '„Diesmal“ means this time. The message asks her to arrive at 17:30.' },
      { prompt: 'Bis wann soll Judith antworten?', options: ['Spätestens morgen.', 'Erst nächste Woche.', 'Danach.'], answer: 0, explanation: '„Spätestens“ means by the latest / no later than.' },
    ],
  },
  {
    title: 'Informationen zur Stadtbibliothek',
    focus: 'place and manner adverbs',
    text: 'Die Stadtbibliothek bleibt während der Renovierung geöffnet. Der Haupteingang ist vorübergehend geschlossen. Besucherinnen und Besucher gehen deshalb bitte durch den Seiteneingang in der Gartenstraße. Die Rückgabe von Büchern ist weiterhin rund um die Uhr möglich: Dafür steht draußen neben dem Seiteneingang ein Rückgabekasten. Im Lesesaal können Sie wie gewohnt in Ruhe arbeiten. Bitte sprechen Sie dort besonders leise, weil viele Gäste lernen.',
    questions: [
      { prompt: 'Wie kommen die Besucher in die Bibliothek?', options: ['Durch den Haupteingang.', 'Durch den Seiteneingang.', 'Durch den Lesesaal.'], answer: 1, explanation: '„Deshalb“ points to the consequence: use the side entrance because the main entrance is closed.' },
      { prompt: 'Wann kann man Bücher zurückgeben?', options: ['Nur während der Öffnungszeiten.', 'Rund um die Uhr.', 'Nur am Wochenende.'], answer: 1, explanation: '„Rund um die Uhr“ means 24 hours a day.' },
      { prompt: 'Wie sollen Besucher im Lesesaal sprechen?', options: ['Besonders leise.', 'So laut wie möglich.', 'Nur draußen.'], answer: 0, explanation: '„Besonders“ strengthens the request: especially quietly.' },
    ],
  },
  {
    title: 'Eine Änderung beim Arzttermin',
    focus: 'cause, contrast and comparison',
    text: 'Sehr geehrte Frau Nakayima, leider muss Ihr Termin am Donnerstag kurzfristig verschoben werden, da unsere Ärztin erkrankt ist. Wir können Ihnen stattdessen Freitagvormittag um 9:20 Uhr anbieten. Falls dieser Termin für Sie ungünstig ist, melden Sie sich bitte möglichst bald telefonisch. Am Nachmittag sind derzeit keine Termine frei. Eine kurze Rückmeldung per E-Mail ist ebenfalls möglich, wird aber möglicherweise erst am nächsten Arbeitstag gelesen.',
    questions: [
      { prompt: 'Warum wird der Termin verschoben?', options: ['Die Ärztin ist erkrankt.', 'Die Praxis ist umgezogen.', 'Frau Nakayima hat abgesagt.'], answer: 0, explanation: '„Da“ introduces the reason: the doctor is ill.' },
      { prompt: 'Was soll Frau Nakayima tun, wenn Freitag nicht passt?', options: ['Möglichst bald anrufen.', 'Am Nachmittag einfach kommen.', 'Bis nächste Woche warten.'], answer: 0, explanation: '„Möglichst bald“ means as soon as possible.' },
      { prompt: 'Was ist der Unterschied zwischen Telefon und E-Mail?', options: ['E-Mails werden vielleicht später gelesen.', 'Telefonisch gibt es keine Termine.', 'E-Mails sind nur am Nachmittag möglich.'], answer: 0, explanation: '„Möglicherweise“ signals uncertainty: the email may not be read until the next working day.' },
    ],
  },
  {
    title: 'Eine Reise mit Hindernissen',
    focus: 'erst, schon, noch and trotzdem',
    text: 'Hallo Amina, eigentlich wollte ich heute um 8 Uhr mit dem Zug nach Köln fahren. Als ich am Bahnhof ankam, war der Zug aber schon abgefahren. Der nächste Zug fuhr erst um 9:15 Uhr. Zuerst wollte ich deshalb zu Hause bleiben. Ich musste jedoch ein wichtiges Dokument abholen und bin trotzdem gefahren. In Köln hatte das Büro noch geöffnet, aber nur bis 12 Uhr. Ich kam um 11:50 Uhr dort an und bekam das Dokument rechtzeitig. Danach habe ich mich im Café nebenan ausgeruht. Liebe Grüße, Judith',
    questions: [
      { prompt: 'Was war passiert, als Judith am Bahnhof ankam?', options: ['Ihr Zug war bereits abgefahren.', 'Der Zug fuhr erst um 9:15 Uhr ab.', 'Das Büro hatte schon geschlossen.'], answer: 0, explanation: '„Schon abgefahren“ means the train had already left when she arrived.' },
      { prompt: 'Warum fuhr Judith trotzdem nach Köln?', options: ['Sie wollte im Café arbeiten.', 'Sie musste ein wichtiges Dokument abholen.', 'Sie wollte Amina am Bahnhof treffen.'], answer: 1, explanation: '„Trotzdem“ means nevertheless: despite the delay she still travelled because she needed the document.' },
      { prompt: 'Was bedeutet „das Büro hatte noch geöffnet“ hier?', options: ['Das Büro war um 11:50 Uhr bereits geschlossen.', 'Das Büro öffnete erst um 12 Uhr.', 'Das Büro war um 11:50 Uhr weiterhin geöffnet.'], answer: 2, explanation: '„Noch geöffnet“ means still open. It closed at 12:00, so Judith arrived ten minutes before closing.' },
    ],
  },
]

const adverbs = [
  ['Zeit · time', 'heute (today), später (later), normalerweise (usually), diesmal (this time), spätestens (by the latest)'],
  ['Häufigkeit · frequency', 'immer (always), oft (often), manchmal (sometimes), selten (rarely), nie (never)'],
  ['Ort · place', 'hier (here), draußen (outside), dort (there), überall (everywhere)'],
  ['Art und Weise · manner', 'leise (quietly), schnell (quickly), gemeinsam (together), besonders (especially)'],
  ['Verbindung · linking ideas', 'deshalb (therefore), trotzdem (nevertheless), danach (afterwards), zuerst (first)'],
] as const

const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
const historyKey = (profileId: string) => 'goethe-b1-lesen-adverbs-v1-' + profileId

export function renderGoetheB1Reading(profileId: string): void {
  const host = document.getElementById('reading-tab')
  if (!host) return
  let mode: Mode = 'guided'
  let taskIndex = 0
  let selected: Record<number, number> = {}
  let finished = false
  const task = () => tasks[taskIndex]!
  const total = tasks.reduce((sum, item) => sum + item.questions.length, 0)
  const score = () => tasks.reduce((sum, item, ti) => sum + item.questions.filter((q, qi) => selected[ti * 3 + qi] === q.answer).length, 0)
  const show = () => {
    const current = task()
    host.innerHTML = `<section class="reading-entry dashboard-card">
      <p class="card-kicker">GOETHE-ZERTIFIKAT B1 · LESEN</p>
      <h2>Lesen verstehen – Schritt für Schritt</h2>
      <p>Practice reading for key details, dates, reasons and instructions. The short grammar guide focuses on adverbs, one of Judith’s tricky topics.</p>
      <div class="reading-adverb-guide">
        <h3>Adverbs: quick guide</h3>
        <p class="reading-note"><strong>An adverb adds information</strong> about when, where, how often, how, or why something happens. It usually does not change its form: <em>ein leiser Raum</em> (adjective) → <em>Bitte sprechen Sie leise</em> (adverb).</p>
        <ul>${adverbs.map(([label, examples]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(examples)}</li>`).join('')}</ul>
        <p class="reading-note"><strong>Reading tip:</strong> Notice small words such as <em>erst</em> (not until/only), <em>schon</em> (already), <em>noch</em> (still/yet), <em>nicht mehr</em> (no longer), and <em>spätestens</em> (by the latest). They often change the key detail.</p>
      </div>
      <div class="reading-controls">
        <label>Practice mode <select data-reading-mode><option value="guided" ${mode === 'guided' ? 'selected' : ''}>Guided practice</option><option value="exam" ${mode === 'exam' ? 'selected' : ''}>Independent practice (answers at the end)</option></select></label>
        <span>Text ${taskIndex + 1} of ${tasks.length}</span>
      </div>
      ${finished ? `<div class="reading-result" role="status"><h3>Ergebnis: ${score()} / ${total} (${Math.round(score() / total * 100)}%)</h3><p>This is a practice score, not an official Goethe grade. Review each answer and explanation below.</p>${tasks.map((item, ti) => `<section class="reading-review"><h4>${escapeHtml(item.title)}</h4>${item.questions.map((q, qi) => { const id = ti * 3 + qi; const correct = selected[id] === q.answer; return `<p>${correct ? "✓" : "✗"} ${escapeHtml(q.prompt)} <strong>${escapeHtml(q.options[q.answer]!)}</strong><br>${escapeHtml(q.explanation)}</p>` }).join("")}</section>`).join("")}<button class="btn primary" data-reading-restart>Neue Runde starten</button></div>`
        : `<article class="reading-text"><h3>${escapeHtml(current.title)}</h3><p lang="de">${escapeHtml(current.text)}</p></article>
        <p class="reading-focus">Adverb focus: ${escapeHtml(current.focus)}</p>
        ${current.questions.map((q, qi) => { const id = taskIndex * 3 + qi; const value = selected[id]; const showFeedback = mode === 'guided' && value !== undefined; return `<fieldset class="reading-question"><legend>${qi + 1}. ${escapeHtml(q.prompt)}</legend>${q.options.map((opt, oi) => `<label><input type="radio" name="reading-q-${id}" value="${oi}" ${value === oi ? 'checked' : ''}> ${escapeHtml(opt)}</label>`).join('')}${showFeedback ? `<p class="reading-feedback">${value === q.answer ? '✓ Richtig.' : '✗ Richtig ist: ' + escapeHtml(q.options[q.answer]!)} ${escapeHtml(q.explanation)}</p>` : ''}</fieldset>` }).join('')}
        <nav class="reading-nav"><button class="btn secondary" data-reading-prev ${taskIndex === 0 ? 'disabled' : ''}>← Zurück</button><button class="btn primary" data-reading-next>${taskIndex === tasks.length - 1 ? 'Auswerten' : 'Nächster Text →'}</button></nav>`}
      <p class="reading-disclaimer">This focused reading practice is original practice material, not a full exam simulation or official Goethe content. Goethe B1 Lesen has five parts and 65 minutes. <a href="https://bfu.goethe.de/b1_mod/lesen.php" target="_blank" rel="noopener noreferrer">See the official Goethe model test</a>. Answers and progress stay in this browser.</p>
    </section>`
    host.querySelector<HTMLSelectElement>('[data-reading-mode]')?.addEventListener('change', e => { mode = (e.target as HTMLSelectElement).value as Mode; show() })
    host.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach(input => input.addEventListener('change', () => { selected[Number(input.name.replace('reading-q-', ''))] = Number(input.value); if (mode === 'guided') show() }))
    host.querySelector('[data-reading-prev]')?.addEventListener('click', () => { taskIndex--; show() })
    host.querySelector('[data-reading-next]')?.addEventListener('click', () => { if (taskIndex < tasks.length - 1) taskIndex++; else { finished = true; try { const old = JSON.parse(localStorage.getItem(historyKey(profileId)) || '[]'); const history = Array.isArray(old) ? old : []; history.push({ score: score(), total, completedAt: Date.now() }); localStorage.setItem(historyKey(profileId), JSON.stringify(history.slice(-50))) } catch { /* Storage is optional. */ } } show() })
    host.querySelector('[data-reading-restart]')?.addEventListener('click', () => { selected = {}; taskIndex = 0; finished = false; show() })
  }
  show()
}
