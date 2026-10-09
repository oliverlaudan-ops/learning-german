/** Original Teil 1 practice dataset shared by both training screens. */
type Question = { prompt: string; options: string[]; answer: number; explanation: string }
type Clip = { title: string; text: string; questions: [Question, Question] }
export const clips: Clip[] = [
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

