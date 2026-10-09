/** A conservative, date-based Goethe B1 Hören study plan for 2026. */
export interface StudyWeek { start: string; end: string; title: string; focus: string; tasks: string[] }
export const EXAM_PREP_TARGET = '2026-11-21'
export const EXAM_USER_REPORTED = '2026-11-23'
export const studyWeeks: readonly StudyWeek[] = [
 {start:'2026-10-09',end:'2026-10-15',title:'Standortbestimmung · Teil 1',focus:'Kurze Durchsagen, Uhrzeiten und Planänderungen',tasks:['Kurze Hörtexte mit Richtig/Falsch üben','Auf Änderungen und Verneinungen achten','Einen offiziellen Modellsatz als Standortbestimmung nutzen']},
 {start:'2026-10-16',end:'2026-10-22',title:'Teil 2 · Einmal hören',focus:'Vorträge und Führungen verstehen',tasks:['Fragen vor dem Hören überfliegen','Orte, Zeiten und Gründe heraushören','Einmal ohne Transkript üben']},
 {start:'2026-10-23',end:'2026-10-29',title:'Teil 3 · Längere Gespräche',focus:'Absichten und korrigierte Informationen verstehen',tasks:['Gespräche einmal hören','Korrekturen im Gespräch markieren','Fehler und passende Signalwörter notieren']},
 {start:'2026-10-30',end:'2026-11-05',title:'Teil 4 · Meinungen zuordnen',focus:'Zustimmung, Widerspruch und Begründungen',tasks:['Wer sagt was? gezielt zuordnen','Kontrastwörter erkennen: aber, trotzdem, allerdings','Erste vollständige Probeübung absolvieren']},
 {start:'2026-11-06',end:'2026-11-12',title:'Schwachstellen aufarbeiten',focus:'Auswertung der bisher schwächsten Hörteile',tasks:['Schwächsten Teil wiederholen','Zweite vollständige Probeübung bearbeiten','Fehlerliste mit kurzen Erklärungen führen']},
 {start:'2026-11-13',end:'2026-11-19',title:'Sicher in die Prüfung',focus:'Prüfungsroutine und konzentriertes Hören',tasks:['Dritte vollständige Probeübung machen','Im Prüfungsmodus ohne Transkript trainieren','Nur die häufigsten Fehler gezielt wiederholen']},
 {start:'2026-11-20',end:'2026-11-23',title:'Prüfungsphase',focus:'Leicht wiederholen und erholen',tasks:['Keine neuen schweren Inhalte mehr','Kopfhörer und Prüfungsmaterial prüfen','Bestätigten Prüfungstermin und Anfahrt kontrollieren']}
]
const parseDay = (s:string): number => Date.parse(s+'T00:00:00Z')
export function planIndex(date: Date): number {
 const day = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())
 const index = studyWeeks.findIndex(w=>day>=parseDay(w.start)&&day<=parseDay(w.end))
 if(index>=0)return index
 return day<parseDay(studyWeeks[0].start)?0:studyWeeks.length-1
}
export interface FullAttempt { mode?: string; percent?: number; correct?: number; byPart?: number[]; completedAt?: number }
export function weakestPart(attempts: FullAttempt[]): number | undefined {
 const latest=attempts.filter(a=>Array.isArray(a.byPart)&&a.byPart.length===4).at(-1)
 if(!latest?.byPart)return undefined
 const rates=latest.byPart.map((score,i)=>score/[10,5,7,8][i])
 return rates.indexOf(Math.min(...rates))+1
}
export function studyAdvice(now:Date,attempts:FullAttempt[]): string {
 const weak=weakestPart(attempts)
 const week=studyWeeks[planIndex(now)]
 return weak&&planIndex(now)>=4 ? `Teil ${weak} gezielt wiederholen und anschließend deine Fehler prüfen.` : week.tasks[(now.getDay()+6)%week.tasks.length]
}
