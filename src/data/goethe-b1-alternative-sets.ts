/** Three original alternative Goethe B1 Hören practice sets, 30 questions each.
 * These are educational practice materials, not official Goethe examination papers.
 * New sets have NO recorded MP3 files yet; the player must disclose browser TTS.
 */
import type { B1Question } from './goethe-b1-parts'
export interface AlternativeSegment { title:string; script:string; maxPlays:number; part:number; questions:B1Question[] }
export interface AlternativeExamSet { id:string; title:string; segments:AlternativeSegment[] }
export const alternativeExamSets: AlternativeExamSet[] = [
  {
    "id": "set-2",
    "title": "Übungssatz 2 · Alltag und Beruf",
    "segments": [
      {
        "title": "Verspätetes Paket",
        "script": "Guten Tag, hier ist der Paketdienst. Ihre Lieferung kommt nicht am Dienstag, sondern am Donnerstag. Bitte stellen Sie das Paket nicht selbst zur Abholung bereit. Wir bringen es direkt zu Ihrer Wohnung.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Das Paket wird am Dienstag geliefert.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Die Lieferung wurde auf Donnerstag verschoben."
          },
          {
            "prompt": "Wohin kommt die Lieferung?",
            "options": [
              "Zur Postfiliale",
              "Direkt zur Wohnung",
              "Zum Büro"
            ],
            "answer": 1,
            "explanation": "Der Fahrer bringt das Paket zur Wohnung."
          }
        ]
      },
      {
        "title": "Sportkurs",
        "script": "Hallo Frau Neumann, Ihr Schwimmkurs beginnt ab nächster Woche eine Viertelstunde früher, also um 18 Uhr 15. Der Kursraum bleibt gleich. Bitte bringen Sie diesmal auch ein Handtuch mit.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Der Sportkurs findet in einem anderen Raum statt.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Nur die Uhrzeit ändert sich."
          },
          {
            "prompt": "Wann beginnt der Kurs künftig?",
            "options": [
              "18:15 Uhr",
              "18:30 Uhr",
              "18:45 Uhr"
            ],
            "answer": 0,
            "explanation": "Viertel nach sechs ist 18:15 Uhr."
          }
        ]
      },
      {
        "title": "Busumleitung",
        "script": "Liebe Fahrgäste, wegen eines Straßenfestes hält der Bus 24 heute nicht am Rathaus. Nutzen Sie bitte die Ersatzhaltestelle an der Schule. Ab morgen gilt wieder der normale Fahrplan.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Linie 24 fährt heute am Rathaus ab.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Die Haltestelle Rathaus fällt aus."
          },
          {
            "prompt": "Wo befindet sich die Ersatzhaltestelle?",
            "options": [
              "Am Bahnhof",
              "An der Schule",
              "Am Krankenhaus"
            ],
            "answer": 1,
            "explanation": "Die Schule wird ausdrücklich genannt."
          }
        ]
      },
      {
        "title": "Besuch bei Freunden",
        "script": "Hallo Lea, wir freuen uns auf deinen Besuch am Sonntag. Komm gern schon um zwölf. Wir essen aber erst um eins, weil Paula vorher noch arbeiten muss. Getränke haben wir genug.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Das Mittagessen beginnt um 13 Uhr.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Gegessen wird um eins."
          },
          {
            "prompt": "Was muss Lea mitbringen?",
            "options": [
              "Getränke",
              "Einen Kuchen",
              "Nichts Bestimmtes"
            ],
            "answer": 2,
            "explanation": "Es wird nichts verlangt; Getränke sind vorhanden."
          }
        ]
      },
      {
        "title": "Anruf aus dem Büro",
        "script": "Guten Morgen, Herr Wolf. Die Schulung am Freitag ist abgesagt. Stattdessen schicken wir Ihnen die Unterlagen per E-Mail. Wenn Sie Fragen haben, können wir Montag telefonieren.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Schulung findet am Freitag statt.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Sie wurde abgesagt."
          },
          {
            "prompt": "Wie erhält Herr Wolf die Unterlagen?",
            "options": [
              "Per E-Mail",
              "Mit der Post",
              "Bei einem Treffen"
            ],
            "answer": 0,
            "explanation": "Die Unterlagen werden per E-Mail versendet."
          }
        ]
      },
      {
        "title": "Eine Führung in der Stadtbibliothek",
        "script": "Herzlich willkommen zur Führung in unserer neuen Stadtbibliothek. Mein Name ist Frau Albers. Wir starten im Erdgeschoss bei den Informationsschaltern. Die Kinderbücher finden Sie links hinter dem Café. Die Arbeitsplätze für Erwachsene befinden sich im zweiten Stock, aber heute ist dieser Bereich bis 15 Uhr wegen einer Veranstaltung geschlossen. Wer Bücher ausleihen möchte, benötigt eine kostenlose Bibliothekskarte. Für die Ausstellung über die Stadtgeschichte zahlen Sie dagegen zwei Euro Eintritt. Unsere Führung dauert etwa vierzig Minuten. Danach können Sie im Seminarraum Fragen stellen. Bitte fotografieren Sie die historischen Dokumente nicht, denn das Licht könnte sie beschädigen. Das Café schließt bereits um 17 Uhr; die Bibliothek selbst bleibt bis 19 Uhr geöffnet.",
        "maxPlays": 1,
        "part": 2,
        "questions": [
          {
            "prompt": "Wo beginnt die Führung?",
            "options": [
              "Am Informationsschalter",
              "Im Café",
              "Im Seminarraum"
            ],
            "answer": 0,
            "explanation": "Der Treffpunkt ist im Erdgeschoss am Informationsschalter."
          },
          {
            "prompt": "Wo stehen die Kinderbücher?",
            "options": [
              "Neben dem Eingang",
              "Hinter dem Café",
              "Im zweiten Stock"
            ],
            "answer": 1,
            "explanation": "Sie befinden sich links hinter dem Café."
          },
          {
            "prompt": "Warum sind die Arbeitsplätze heute zunächst nicht verfügbar?",
            "options": [
              "Wegen einer Veranstaltung",
              "Wegen Renovierungen",
              "Wegen eines Stromausfalls"
            ],
            "answer": 0,
            "explanation": "Der Bereich ist bis 15 Uhr für eine Veranstaltung geschlossen."
          },
          {
            "prompt": "Was kostet die Bibliothekskarte?",
            "options": [
              "Zwei Euro",
              "Fünf Euro",
              "Nichts"
            ],
            "answer": 2,
            "explanation": "Die Bibliothekskarte ist kostenlos."
          },
          {
            "prompt": "Wann schließt das Café?",
            "options": [
              "Um 15 Uhr",
              "Um 17 Uhr",
              "Um 19 Uhr"
            ],
            "answer": 1,
            "explanation": "Das Café schließt zwei Stunden vor der Bibliothek."
          }
        ]
      },
      {
        "title": "Gespräch über eine Weiterbildung",
        "script": "Mara: Hallo Ben, hast du dich für den Computerkurs angemeldet? Ben: Ja, aber nicht für den Abendkurs. Ich arbeite dienstags länger und habe deshalb den Kurs am Samstag gewählt. Mara: Kostet er viel? Ben: Ursprünglich 120 Euro. Da ich mich früh angemeldet habe, zahle ich nur 90. Mara: Und wie lange dauert er? Ben: Vier Samstage. Den ersten Termin habe ich allerdings verpasst, weil ich krank war. Die Kursleiterin hat mir die Aufgaben per E-Mail geschickt. Mara: War das schwierig? Ben: Die Aufgaben waren einfach, aber die Software musste ich erst installieren. Mara: Musst du einen eigenen Laptop mitbringen? Ben: Nein, Computer sind vorhanden. Ich nehme trotzdem meinen Laptop mit, um zu Hause weiterüben zu können. Mara: Bekommst du am Ende eine Bescheinigung? Ben: Ja, aber nur, wenn ich an mindestens drei Terminen teilnehme. Mara: Das ist doch gut. Ben: Ich hoffe nur, dass der letzte Termin nicht verschoben wird. Da habe ich nämlich eine Reise geplant.",
        "maxPlays": 1,
        "part": 3,
        "questions": [
          {
            "prompt": "Ben besucht den Kurs am Dienstagabend.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Er nimmt am Samstagskurs teil."
          },
          {
            "prompt": "Ben hat einen Rabatt bekommen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Er zahlt 90 statt 120 Euro."
          },
          {
            "prompt": "Der Kurs dauert insgesamt vier Samstage.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Ben nennt vier Samstage."
          },
          {
            "prompt": "Ben hat den ersten Termin wegen der Arbeit verpasst.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Er war krank."
          },
          {
            "prompt": "Die Kursleiterin hat Ben Aufgaben geschickt.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Die Aufgaben kamen per E-Mail."
          },
          {
            "prompt": "Alle müssen einen eigenen Laptop mitbringen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Computer sind vorhanden."
          },
          {
            "prompt": "Für die Bescheinigung muss man an mindestens drei Terminen teilnehmen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Ben nennt mindestens drei Termine."
          }
        ]
      },
      {
        "title": "Im Radio: Homeoffice",
        "script": "Moderatorin: Heute diskutieren wir, ob man häufiger von zu Hause arbeiten sollte. Frau Seidel, Herr Kurz und Frau Özdemir sind zu Gast. Frau Seidel: Für mich spart Homeoffice viel Zeit. Früher saß ich täglich über eine Stunde im Zug. Jetzt sehe ich meine Familie öfter. Herr Kurz: Ich finde die Zusammenarbeit im Büro einfacher. Bei komplizierten Problemen kann ich sofort jemanden fragen. Frau Özdemir: Es kommt auf die Aufgabe an. Für konzentriertes Schreiben ist die eigene Wohnung ideal, für gemeinsame Planung finde ich das Büro besser. Moderatorin: Und wie sieht es mit den Kosten aus? Frau Seidel: Ich bezahle zwar mehr Strom, brauche aber keine Monatskarte mehr. Herr Kurz: Kleine Unternehmen können weniger Bürofläche mieten. Das ist ein Vorteil. Allerdings fehlt manchmal der persönliche Austausch. Frau Özdemir: Eine feste Regel für alle halte ich für falsch. Teams sollten selbst entscheiden, an welchen Tagen sie sich treffen. Frau Seidel: Das sehe ich ähnlich. Zwei Bürotage in der Woche reichen mir. Herr Kurz: Wenn die Technik gut funktioniert, kann ich mir das vorstellen. Aber neue Mitarbeiter sollten am Anfang häufiger im Büro sein. Moderatorin: Vielen Dank für Ihre Einschätzungen.",
        "maxPlays": 2,
        "part": 4,
        "questions": [
          {
            "prompt": "Wer spart durch das Arbeiten zu Hause besonders viel Fahrzeit?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 0,
            "explanation": "Frau Seidel berichtet von ihrer früheren Zugfahrt."
          },
          {
            "prompt": "Wer findet direkte Gespräche im Büro hilfreich?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 1,
            "explanation": "Herr Kurz fragt lieber sofort Kollegen."
          },
          {
            "prompt": "Wer unterscheidet zwischen konzentrierter Arbeit und gemeinsamer Planung?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 2,
            "explanation": "Frau Özdemir entscheidet nach der Aufgabe."
          },
          {
            "prompt": "Wer erwähnt den Wegfall der Monatskarte?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 0,
            "explanation": "Frau Seidel spart Fahrkartenkosten."
          },
          {
            "prompt": "Wer sieht kleinere Büroräume als finanziellen Vorteil?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 1,
            "explanation": "Herr Kurz spricht über die Bürofläche."
          },
          {
            "prompt": "Wer möchte keine einheitliche Regel für alle Teams?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 2,
            "explanation": "Frau Özdemir bevorzugt Entscheidungen im Team."
          },
          {
            "prompt": "Wer möchte ungefähr zwei Tage pro Woche im Büro arbeiten?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 0,
            "explanation": "Frau Seidel nennt zwei Bürotage."
          },
          {
            "prompt": "Wer hält Präsenz für neue Mitarbeiter besonders wichtig?",
            "options": [
              "Frau Seidel",
              "Herr Kurz",
              "Frau Özdemir"
            ],
            "answer": 1,
            "explanation": "Herr Kurz empfiehlt neuen Mitarbeitern mehr Zeit im Büro."
          }
        ]
      }
    ]
  },
  {
    "id": "set-3",
    "title": "Übungssatz 3 · Unterwegs und Gesundheit",
    "segments": [
      {
        "title": "Nachricht vom Zahnarzt",
        "script": "Guten Tag, Frau Schmitt. Morgen um neun ist ein früherer Termin frei geworden. Ihr bisheriger Termin um elf bleibt bestehen, wenn Sie sich heute nicht bei uns melden.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Frau Schmitt muss morgen schon um neun erscheinen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Der bisherige Termin bleibt ohne Rückmeldung bestehen."
          },
          {
            "prompt": "Wann war ihr ursprünglicher Termin?",
            "options": [
              "Um 9 Uhr",
              "Um 10 Uhr",
              "Um 11 Uhr"
            ],
            "answer": 2,
            "explanation": "Ihr bisheriger Termin war um elf."
          }
        ]
      },
      {
        "title": "Hotelinformation",
        "script": "Liebe Gäste, das Frühstücksbuffet gibt es morgen ausnahmsweise ab sieben Uhr im großen Konferenzraum. Unser Restaurant bleibt wegen einer privaten Feier bis zum Mittag geschlossen.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Das Frühstück findet morgen im Restaurant statt.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Es ist im Konferenzraum."
          },
          {
            "prompt": "Warum bleibt das Restaurant geschlossen?",
            "options": [
              "Wegen einer Feier",
              "Wegen Reparaturen",
              "Wegen Krankheit"
            ],
            "answer": 0,
            "explanation": "Eine private Feier ist der Grund."
          }
        ]
      },
      {
        "title": "Freizeitangebot",
        "script": "Hallo zusammen! Der Wanderausflug am Samstag beginnt um acht Uhr am Parkplatz Nord. Wenn es regnet, treffen wir uns trotzdem dort und entscheiden gemeinsam, ob wir die Strecke verkürzen.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Bei Regen fällt die Wanderung auf jeden Fall aus.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Bei Regen entscheidet die Gruppe vor Ort."
          },
          {
            "prompt": "Wo trifft sich die Gruppe?",
            "options": [
              "Am See",
              "Am Parkplatz Nord",
              "Am Bahnhof"
            ],
            "answer": 1,
            "explanation": "Der Parkplatz Nord ist der Treffpunkt."
          }
        ]
      },
      {
        "title": "Nachricht aus der Schule",
        "script": "Guten Abend, morgen endet der Unterricht der Klasse 8B bereits um zwölf. Die Busse fahren aber erst um halb eins. Wer nicht warten möchte, braucht die Erlaubnis der Eltern.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Busse fahren morgen um 12:30 Uhr.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Halb eins ist 12:30 Uhr."
          },
          {
            "prompt": "Was brauchen Schüler, die früher gehen möchten?",
            "options": [
              "Ein Busticket",
              "Die Erlaubnis der Eltern",
              "Eine Bescheinigung vom Arzt"
            ],
            "answer": 1,
            "explanation": "Eine elterliche Erlaubnis ist nötig."
          }
        ]
      },
      {
        "title": "Anruf einer Freundin",
        "script": "Hi Alex, ich stehe schon vor dem Theater. Die Vorstellung beginnt erst um halb acht, nicht um sieben. Ich gehe deshalb noch ins Café gegenüber. Treffen wir uns dort?",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Vorstellung beginnt um 19 Uhr.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Sie beginnt um 19:30 Uhr."
          },
          {
            "prompt": "Wo wartet die Freundin jetzt?",
            "options": [
              "Vor dem Theater",
              "Im Café gegenüber",
              "An der Bushaltestelle"
            ],
            "answer": 1,
            "explanation": "Sie geht ins Café gegenüber."
          }
        ]
      },
      {
        "title": "Informationen im Gesundheitszentrum",
        "script": "Guten Morgen! Ich möchte Ihnen heute unser neues Gesundheitszentrum vorstellen. Am Montag bieten wir eine kostenlose Beratung zur Ernährung an. Dafür müssen Sie sich bis Freitag telefonisch anmelden. Unser Bewegungskurs findet mittwochs um halb sechs statt und kostet zehn Euro pro Termin. Die erste Stunde dürfen alle ohne Bezahlung ausprobieren. Der Vortrag über guten Schlaf wurde wegen Krankheit des Referenten vom Donnerstag auf den nächsten Dienstag verschoben. Er beginnt um 18 Uhr im Raum drei. Bitte beachten Sie: Für Untersuchungen benötigen wir Ihre Versichertenkarte. Bei den offenen Vorträgen ist sie nicht erforderlich. Unsere Rezeption öffnet täglich um acht Uhr, samstags erst um neun. Weitere Informationen stehen auf unserer Website. Fragen können Sie auch nach dem Vortrag an meine Kollegin richten, die heute hinten im Raum sitzt.",
        "maxPlays": 1,
        "part": 2,
        "questions": [
          {
            "prompt": "Was kostet die Ernährungsberatung?",
            "options": [
              "Zehn Euro",
              "Nichts",
              "Zwanzig Euro"
            ],
            "answer": 1,
            "explanation": "Die Beratung ist kostenlos."
          },
          {
            "prompt": "Wie meldet man sich für die Beratung an?",
            "options": [
              "Telefonisch",
              "Per Post",
              "Persönlich am Montag"
            ],
            "answer": 0,
            "explanation": "Die Anmeldung soll telefonisch erfolgen."
          },
          {
            "prompt": "Wann findet der Bewegungskurs statt?",
            "options": [
              "Montags",
              "Dienstags",
              "Mittwochs"
            ],
            "answer": 2,
            "explanation": "Der Kurs ist mittwochs um halb sechs."
          },
          {
            "prompt": "Warum wurde der Schlafvortrag verschoben?",
            "options": [
              "Wegen einer Raumänderung",
              "Wegen Krankheit",
              "Wegen zu weniger Teilnehmer"
            ],
            "answer": 1,
            "explanation": "Der Referent ist krank."
          },
          {
            "prompt": "Wann öffnet die Rezeption samstags?",
            "options": [
              "Um 8 Uhr",
              "Um 9 Uhr",
              "Um 10 Uhr"
            ],
            "answer": 1,
            "explanation": "Samstags öffnet sie erst um neun."
          }
        ]
      },
      {
        "title": "Ein Gespräch nach einer Reise",
        "script": "Nina: Hallo Paul, wie war dein Urlaub am Meer? Paul: Schön, aber die Anreise war schwierig. Der erste Zug hatte eine Stunde Verspätung. Nina: Hast du den Anschluss verpasst? Paul: Ja. Zum Glück konnte ich einen späteren Zug ohne Aufpreis nehmen. Nina: Und das Hotel? Paul: Es war weiter vom Strand entfernt als auf der Website stand. Dafür war das Zimmer sehr ruhig. Nina: Hast du dich beschwert? Paul: Nein, ich habe nur nach einem Fahrrad gefragt. Das konnte ich für fünf Euro am Tag mieten. Nina: War das Wetter gut? Paul: Die ersten zwei Tage hat es geregnet. Danach schien fast immer die Sonne. Nina: Hast du viel unternommen? Paul: Am Mittwoch habe ich eine Bootsfahrt gemacht. Ich wollte eigentlich tauchen, aber dafür brauchte man dort einen Kurs. Nina: Hast du denn wenigstens gut gegessen? Paul: Ja, besonders in einem kleinen Restaurant neben dem Hafen. Dort war das Essen günstiger als im Hotel. Nina: Möchtest du noch einmal hinfahren? Paul: Vielleicht, aber beim nächsten Mal würde ich länger bleiben.",
        "maxPlays": 1,
        "part": 3,
        "questions": [
          {
            "prompt": "Pauls erster Zug war pünktlich.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Er hatte eine Stunde Verspätung."
          },
          {
            "prompt": "Paul musste für den späteren Zug zusätzlich bezahlen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Der andere Zug war ohne Aufpreis möglich."
          },
          {
            "prompt": "Das Hotel lag näher am Strand als erwartet.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Es lag weiter entfernt."
          },
          {
            "prompt": "Das Hotelzimmer war ruhig.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Paul lobt die Ruhe."
          },
          {
            "prompt": "Paul hat ein Fahrrad gemietet.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Er nennt fünf Euro pro Tag."
          },
          {
            "prompt": "Die ganze Woche hat es geregnet.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Nur die ersten beiden Tage waren regnerisch."
          },
          {
            "prompt": "Paul hat eine Bootsfahrt gemacht.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Die Bootsfahrt fand am Mittwoch statt."
          }
        ]
      },
      {
        "title": "Im Radio: Fahrrad und Bus",
        "script": "Moderator: Unser Thema heute: Wie sollte die Stadt den Verkehr verbessern? Bei uns sind Frau Beck, Herr Simon und Frau Arslan. Frau Beck: Ich fahre fast jeden Tag mit dem Fahrrad. Mir fehlen sichere Radwege, besonders an großen Kreuzungen. Herr Simon: Für ältere Menschen ist der Bus wichtig. Die Busse müssten häufiger fahren, gerade am Abend. Frau Arslan: Beides ist sinnvoll. Trotzdem brauchen wir gute Verbindungen zwischen den Stadtteilen und dem Bahnhof. Moderator: Was wäre die erste Maßnahme? Frau Beck: Ich würde gefährliche Kreuzungen umbauen. Ein zusätzlicher Fahrradparkplatz hilft wenig, wenn der Weg dorthin unsicher ist. Herr Simon: Ich wünsche mir vor allem verständliche Fahrpläne. Viele Informationen findet man nur im Internet. Frau Arslan: Wir sollten Fahrgäste fragen, welche Verbindungen ihnen fehlen. Ohne diese Informationen plant man vielleicht am Bedarf vorbei. Moderator: Und wer soll das bezahlen? Frau Beck: Investitionen in sichere Wege sparen langfristig Kosten. Herr Simon: Die Fahrkarten dürfen deshalb aber nicht teurer werden. Frau Arslan: Vielleicht können wir bestehende Angebote besser aufeinander abstimmen, statt überall neue Linien einzurichten. Moderator: Danke für Ihre Ideen.",
        "maxPlays": 2,
        "part": 4,
        "questions": [
          {
            "prompt": "Wer fordert sichere Wege an Kreuzungen?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 0,
            "explanation": "Frau Beck spricht besonders über Kreuzungen."
          },
          {
            "prompt": "Wer möchte mehr Busfahrten am Abend?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 1,
            "explanation": "Herr Simon nennt Abendverbindungen."
          },
          {
            "prompt": "Wer betont die Verbindung zum Bahnhof?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 2,
            "explanation": "Frau Arslan spricht über den Bahnhof."
          },
          {
            "prompt": "Wer findet zusätzliche Fahrradparkplätze zunächst weniger wichtig?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 0,
            "explanation": "Frau Beck bevorzugt sichere Wege."
          },
          {
            "prompt": "Wer kritisiert Fahrpläne, die nur online stehen?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 1,
            "explanation": "Herr Simon will verständliche Informationen."
          },
          {
            "prompt": "Wer möchte die Fahrgäste nach ihren Bedürfnissen fragen?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 2,
            "explanation": "Frau Arslan fordert eine Befragung."
          },
          {
            "prompt": "Wer warnt vor höheren Ticketpreisen?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 1,
            "explanation": "Herr Simon möchte keine teureren Fahrkarten."
          },
          {
            "prompt": "Wer schlägt vor, vorhandene Angebote besser abzustimmen?",
            "options": [
              "Frau Beck",
              "Herr Simon",
              "Frau Arslan"
            ],
            "answer": 2,
            "explanation": "Frau Arslan will die bestehenden Angebote koordinieren."
          }
        ]
      }
    ]
  },
  {
    "id": "set-4",
    "title": "Übungssatz 4 · Wohnen und Gesellschaft",
    "segments": [
      {
        "title": "Hausverwaltung",
        "script": "Liebe Bewohner, am Dienstag zwischen acht und elf wird im Haus das Wasser abgestellt. Bitte füllen Sie vorher genügend Trinkwasser ab. Die Heizung funktioniert weiterhin.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Am Dienstag ist auch die Heizung ausgeschaltet.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Die Heizung bleibt in Betrieb."
          },
          {
            "prompt": "Wie lange wird das Wasser abgestellt?",
            "options": [
              "Von 8 bis 11 Uhr",
              "Von 9 bis 12 Uhr",
              "Den ganzen Tag"
            ],
            "answer": 0,
            "explanation": "Der Zeitraum ist acht bis elf Uhr."
          }
        ]
      },
      {
        "title": "Nachricht einer Kollegin",
        "script": "Hallo Eva, die Unterlagen für das Gespräch liegen schon auf deinem Tisch. Ich komme zehn Minuten später, weil mein Bus ausgefallen ist. Bitte beginne trotzdem pünktlich mit der Begrüßung.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Kollegin möchte, dass Eva auf sie wartet.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Eva soll pünktlich anfangen."
          },
          {
            "prompt": "Warum verspätet sich die Kollegin?",
            "options": [
              "Wegen eines Arzttermins",
              "Weil ihr Bus ausgefallen ist",
              "Weil sie die Unterlagen vergessen hat"
            ],
            "answer": 1,
            "explanation": "Der Bus ist ausgefallen."
          }
        ]
      },
      {
        "title": "Stadtfest",
        "script": "Achtung, liebe Besucher! Das Konzert auf dem Marktplatz beginnt heute wegen des starken Windes eine Stunde später. Die Stände bleiben bis 21 Uhr geöffnet. Der Eintritt ist weiterhin frei.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Das Konzert beginnt früher als geplant.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Es beginnt eine Stunde später."
          },
          {
            "prompt": "Was kostet der Eintritt?",
            "options": [
              "Nichts",
              "Fünf Euro",
              "Zehn Euro"
            ],
            "answer": 0,
            "explanation": "Der Eintritt bleibt frei."
          }
        ]
      },
      {
        "title": "Abholtermin",
        "script": "Guten Tag, hier ist die Fahrradwerkstatt. Ihr Fahrrad ist repariert. Sie können es morgen ab drei abholen. Heute schaffen wir es leider nicht mehr. Bitte bringen Sie den Abholschein mit.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Das Fahrrad ist schon repariert.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Die Werkstatt meldet die fertige Reparatur."
          },
          {
            "prompt": "Was muss der Kunde mitbringen?",
            "options": [
              "Einen Helm",
              "Den Abholschein",
              "Das alte Rad"
            ],
            "answer": 1,
            "explanation": "Der Abholschein wird benötigt."
          }
        ]
      },
      {
        "title": "Einladung zum Geburtstag",
        "script": "Hallo David, wir feiern meinen Geburtstag am Freitag diesmal nicht zu Hause, sondern im Gemeinschaftsraum unseres Hauses. Bitte komm um 19 Uhr. Du brauchst nichts zu essen mitzubringen.",
        "maxPlays": 2,
        "part": 1,
        "questions": [
          {
            "prompt": "Die Feier findet in der Wohnung statt.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Sie findet im Gemeinschaftsraum statt."
          },
          {
            "prompt": "Wann beginnt die Feier?",
            "options": [
              "Um 18 Uhr",
              "Um 19 Uhr",
              "Um 20 Uhr"
            ],
            "answer": 1,
            "explanation": "Die Feier beginnt um 19 Uhr."
          }
        ]
      },
      {
        "title": "Informationsabend zum Energiesparen",
        "script": "Guten Abend, schön, dass Sie zu unserem Informationsabend gekommen sind. Heute geht es um Möglichkeiten, zu Hause Energie zu sparen. Ich beginne mit der Heizung: Schon ein Grad weniger Raumtemperatur kann den Verbrauch senken. Wichtig ist aber, regelmäßig kurz und kräftig zu lüften statt Fenster den ganzen Tag gekippt zu lassen. Ab nächster Woche können Sie im Bürgerbüro kostenlos ein Messgerät ausleihen, mit dem sich der Stromverbrauch von Haushaltsgeräten feststellen lässt. Das Gerät dürfen Sie maximal sieben Tage behalten. Für Fragen zu neuen Fenstern und zur Dämmung gibt es im November zusätzliche Beratungstermine. Diese müssen Sie vorher online buchen. Unser Informationsmaterial liegt hinten neben der Tür aus. Der Vortrag dauert etwa eine halbe Stunde. Danach können Sie an drei Stationen praktische Beispiele ansehen. Die Veranstaltung ist kostenlos, Getränke im Café bezahlen Sie bitte selbst.",
        "maxPlays": 1,
        "part": 2,
        "questions": [
          {
            "prompt": "Worum geht es hauptsächlich?",
            "options": [
              "Um Energiesparen im Haushalt",
              "Um neue Verkehrsregeln",
              "Um den Kauf eines Autos"
            ],
            "answer": 0,
            "explanation": "Es geht um Energieverbrauch zu Hause."
          },
          {
            "prompt": "Was wird beim Lüften empfohlen?",
            "options": [
              "Das Fenster dauerhaft kippen",
              "Kurz und kräftig lüften",
              "Alle Fenster geschlossen halten"
            ],
            "answer": 1,
            "explanation": "Kurzes Stoßlüften wird empfohlen."
          },
          {
            "prompt": "Wo bekommt man das Messgerät?",
            "options": [
              "Im Bürgerbüro",
              "Im Café",
              "Im Supermarkt"
            ],
            "answer": 0,
            "explanation": "Das Bürgerbüro verleiht es."
          },
          {
            "prompt": "Wie lange darf man das Messgerät behalten?",
            "options": [
              "Drei Tage",
              "Sieben Tage",
              "Vier Wochen"
            ],
            "answer": 1,
            "explanation": "Maximal sieben Tage."
          },
          {
            "prompt": "Wie meldet man sich zur Fensterberatung an?",
            "options": [
              "Telefonisch",
              "Online",
              "Ohne Anmeldung"
            ],
            "answer": 1,
            "explanation": "Die Termine müssen online gebucht werden."
          }
        ]
      },
      {
        "title": "Ein Gespräch über eine neue Arbeit",
        "script": "Tobias: Hallo Sarah, wie läuft es in deinem neuen Job? Sarah: Gut, aber die erste Woche war anstrengend. Ich musste viele neue Programme kennenlernen. Tobias: Arbeitest du jetzt immer im Büro? Sarah: Nein, montags und freitags kann ich von zu Hause arbeiten. Die anderen Tage treffe ich mein Team im Büro. Tobias: Ist der Arbeitsweg länger als früher? Sarah: Mit dem Zug dauert er nur zwanzig Minuten. Mit dem Auto wäre es länger, weil es so viele Baustellen gibt. Tobias: Hast du nette Kollegen? Sarah: Ja. Eine Kollegin hat mir sogar ihre Notizen gegeben, damit ich mich schneller einarbeiten kann. Tobias: Und wie sind die Arbeitszeiten? Sarah: Wir können zwischen sieben und neun anfangen. Dafür müssen wir unsere Termine gut abstimmen. Tobias: Gibt es auch Fortbildungen? Sarah: Ja, im nächsten Monat besuche ich einen Kurs zum Projektmanagement. Mein Arbeitgeber übernimmt die Kosten. Tobias: Klingt nach einem guten Start. Sarah: Das finde ich auch. Nur an die neue Software muss ich mich noch gewöhnen.",
        "maxPlays": 1,
        "part": 3,
        "questions": [
          {
            "prompt": "Sarah kennt bereits alle Programme gut.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Sie muss viele Programme erst kennenlernen."
          },
          {
            "prompt": "Sarah darf montags zu Hause arbeiten.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Montag und Freitag sind Homeoffice-Tage."
          },
          {
            "prompt": "Sarah braucht mit dem Zug zwanzig Minuten zur Arbeit.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Sie nennt zwanzig Minuten."
          },
          {
            "prompt": "Mit dem Auto kommt Sarah schneller zur Arbeit.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Mit dem Auto wäre es wegen Baustellen langsamer."
          },
          {
            "prompt": "Eine Kollegin hat Sarah bei der Einarbeitung geholfen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 0,
            "explanation": "Sie bekam Notizen von einer Kollegin."
          },
          {
            "prompt": "Alle Mitarbeiter müssen um sieben anfangen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Sie können zwischen sieben und neun beginnen."
          },
          {
            "prompt": "Sarah muss ihre Fortbildung selbst bezahlen.",
            "options": [
              "Richtig",
              "Falsch"
            ],
            "answer": 1,
            "explanation": "Der Arbeitgeber trägt die Kosten."
          }
        ]
      },
      {
        "title": "Im Radio: Gemeinschaftsgärten",
        "script": "Moderatorin: Wir sprechen heute über Gemeinschaftsgärten in der Stadt. Zu Gast sind Frau Lange, Herr Weber und Frau Demir. Frau Lange: In unserem Garten lernen die Nachbarn einander kennen. Besonders schön finde ich, dass Kinder dort Gemüse anbauen können. Herr Weber: Mir gefällt die Idee, aber ich frage mich, wer die Pflege übernimmt. Ohne feste Regeln bleibt am Ende alles an wenigen Menschen hängen. Frau Demir: Solche Gärten sind außerdem gut für die Umwelt. Sie bieten Insekten Lebensraum und machen manche Plätze im Sommer angenehmer. Moderatorin: Was brauchen neue Projekte? Frau Lange: Vor allem Menschen, die gemeinsam beginnen möchten. Man muss nicht alles perfekt planen. Herr Weber: Ich sehe das anders. Schon am Anfang sollte klar sein, wer gießt und wer die Geräte verwaltet. Frau Demir: Die Stadt könnte Wasseranschlüsse bereitstellen. Viele Gruppen können solche Kosten allein nicht tragen. Moderatorin: Und wenn Nachbarn wenig Zeit haben? Frau Lange: Auch kleine Beiträge helfen. Man kann vielleicht einmal im Monat teilnehmen. Herr Weber: Solange verbindlich vereinbart ist, wer welche Arbeit macht. Frau Demir: Ich wünsche mir, dass noch mehr ungenutzte Flächen dafür geöffnet werden. Moderatorin: Vielen Dank für das Gespräch.",
        "maxPlays": 2,
        "part": 4,
        "questions": [
          {
            "prompt": "Wer betont die Begegnung zwischen Nachbarn?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 0,
            "explanation": "Frau Lange hebt das Kennenlernen hervor."
          },
          {
            "prompt": "Wer macht sich Sorgen um die Pflege des Gartens?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 1,
            "explanation": "Herr Weber will klare Zuständigkeiten."
          },
          {
            "prompt": "Wer nennt den Nutzen für Insekten?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 2,
            "explanation": "Frau Demir spricht von Lebensraum für Insekten."
          },
          {
            "prompt": "Wer findet einen gemeinsamen Start wichtiger als perfekte Planung?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 0,
            "explanation": "Frau Lange will unkompliziert anfangen."
          },
          {
            "prompt": "Wer fordert feste Regeln bereits zu Beginn?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 1,
            "explanation": "Herr Weber spricht von klaren Aufgaben."
          },
          {
            "prompt": "Wer wünscht sich Hilfe der Stadt bei Wasseranschlüssen?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 2,
            "explanation": "Frau Demir erwähnt kommunale Unterstützung."
          },
          {
            "prompt": "Wer meint, dass man auch selten mithelfen kann?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 0,
            "explanation": "Frau Lange nennt einmal pro Monat."
          },
          {
            "prompt": "Wer möchte mehr ungenutzte Flächen öffnen?",
            "options": [
              "Frau Lange",
              "Herr Weber",
              "Frau Demir"
            ],
            "answer": 2,
            "explanation": "Frau Demir fordert weitere Flächen."
          }
        ]
      }
    ]
  }
]
