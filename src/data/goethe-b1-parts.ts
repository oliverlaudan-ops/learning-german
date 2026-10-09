/** Original B1 listening practice material, not official Goethe audio or questions. */
export interface B1Question { prompt: string; options: string[]; answer: number; explanation: string }
export interface B1Segment { title: string; script: string; maxPlays: number; questions: B1Question[] }
const yesNo = ['Richtig', 'Falsch']
export const extraParts: { id: 2 | 3 | 4; title: string; segments: B1Segment[] }[] = [
  { id: 2, title: 'Führung im Umweltzentrum', segments: [{
    title: 'Eine Führung durch das Umweltzentrum',
    maxPlays: 1,
    script: 'Guten Morgen und herzlich willkommen im Umweltzentrum am Stadtpark. Mein Name ist Frau Peters und ich begleite Sie heute durch unsere Ausstellung. Eigentlich wollten wir im Garten beginnen, aber wegen des Regens bleiben wir zunächst im Hauptgebäude. Im Erdgeschoss erfahren Sie, wie die Stadt ihren Energieverbrauch in den letzten zehn Jahren gesenkt hat. Besonders interessant sind die Fotos alter Heizungsanlagen. Im ersten Stock können Sie später selbst ausprobieren, wie viel Strom verschiedene Haushaltsgeräte benötigen. Die Geräte sind allerdings erst ab elf Uhr zugänglich, weil eine Schulklasse dort noch arbeitet. Nach unserem Rundgang treffen wir uns um Viertel nach zwölf im Café, nicht am Eingang. Dort können Sie Fragen stellen. Wenn Sie etwas trinken möchten, bezahlen Sie das selbst. Der Eintritt zur Ausstellung ist bereits in Ihrer Teilnehmerkarte enthalten. Fotografieren dürfen Sie im ganzen Haus, aber bitte ohne Blitz. Nach der Mittagspause bietet meine Kollegin eine freiwillige Führung durch den Garten an, falls das Wetter besser wird. Diese Führung dauert ungefähr eine halbe Stunde und kostet nichts extra. Jetzt gehen wir zuerst nach links in die Energieausstellung.',
    questions: [
      {prompt:'Warum beginnt die Führung nicht im Garten?',options:['Weil es regnet.','Weil der Garten geschlossen ist.','Weil die Gruppe zu spät kommt.'],answer:0,explanation:'Wegen des Regens beginnt die Führung im Gebäude.'},
      {prompt:'Was wird im Erdgeschoss gezeigt?',options:['Die Geschichte des Stadtparks.','Der Energieverbrauch der Stadt.','Die Arbeit einer Schulklasse.'],answer:1,explanation:'Es geht um den Energieverbrauch der Stadt in den vergangenen zehn Jahren.'},
      {prompt:'Wann können die Besucher die Geräte ausprobieren?',options:['Ab 10 Uhr.','Ab 11 Uhr.','Erst am Nachmittag.'],answer:1,explanation:'Bis elf Uhr nutzt eine Schulklasse die Geräte.'},
      {prompt:'Wo trifft sich die Gruppe nach dem Rundgang?',options:['Am Eingang.','Im Garten.','Im Café.'],answer:2,explanation:'Der Treffpunkt ist um 12:15 Uhr im Café.'},
      {prompt:'Was sagt Frau Peters über die Gartenführung?',options:['Sie kostet zusätzlich Geld.','Sie findet möglicherweise später statt.','Sie dauert den ganzen Nachmittag.'],answer:1,explanation:'Die freiwillige Führung hängt vom Wetter ab.'}
    ]
  }]},
  { id: 3, title: 'Gespräch über einen Umzug', segments: [{
    title: 'Zwei Bekannte sprechen über eine neue Wohnung',
    maxPlays: 1,
    script: 'Miriam: Hallo Jonas, du siehst müde aus. War dein Wochenende so anstrengend? Jonas: Ja, ich bin endlich umgezogen. Eigentlich sollten meine Freunde am Samstagmorgen helfen, aber zwei waren krank. Miriam: Oh nein! Hast du trotzdem alles geschafft? Jonas: Fast. Mein Bruder konnte zum Glück einen Transporter ausleihen. Den großen Schrank haben wir aber in der alten Wohnung gelassen, weil er nicht durch die Tür passte. Miriam: Und gefällt dir die neue Wohnung? Jonas: Sehr. Sie ist zwar kleiner als meine alte, dafür brauche ich nur zehn Minuten mit dem Fahrrad zur Arbeit. Vorher war ich fast eine Stunde unterwegs. Miriam: Das klingt gut. Ist die Miete günstiger? Jonas: Die Kaltmiete ist etwas höher, aber ich zahle weniger Heizkosten. Außerdem muss ich nicht mehr jeden Tag eine Fahrkarte kaufen. Miriam: Hast du schon alle Kartons ausgepackt? Jonas: Nein, die Bücher stehen noch im Flur. Zuerst muss ich morgen den Internetanschluss organisieren. Der Techniker wollte heute kommen, hat den Termin aber auf Dienstag verschoben. Miriam: Dann kannst du am Wochenende ja eine kleine Einweihungsfeier machen. Jonas: Lieber erst nächste Woche! Diesen Samstag arbeite ich. Aber am Sonntag können wir zusammen einen Kaffee trinken. Miriam: Sehr gerne. Soll ich Kuchen mitbringen? Jonas: Das wäre toll!',
    questions: [
      {prompt:'Zwei Freunde konnten Jonas wegen Krankheit nicht helfen.',options:yesNo,answer:0,explanation:'Zwei Helfer waren krank.'},
      {prompt:'Jonas hat den großen Schrank bereits in der neuen Wohnung aufgebaut.',options:yesNo,answer:1,explanation:'Der Schrank blieb in der alten Wohnung.'},
      {prompt:'Jonas braucht jetzt länger zur Arbeit als früher.',options:yesNo,answer:1,explanation:'Sein Weg dauert jetzt nur zehn Minuten statt fast einer Stunde.'},
      {prompt:'Die Kaltmiete der neuen Wohnung ist etwas höher.',options:yesNo,answer:0,explanation:'Jonas sagt ausdrücklich, dass die Kaltmiete höher ist.'},
      {prompt:'Jonas hat schon alle Umzugskartons ausgepackt.',options:yesNo,answer:1,explanation:'Die Bücher stehen noch in Kartons im Flur.'},
      {prompt:'Der Techniker kommt am Dienstag.',options:yesNo,answer:0,explanation:'Der Termin wurde auf Dienstag verschoben.'},
      {prompt:'Miriam und Jonas wollen am kommenden Samstag Kaffee trinken.',options:yesNo,answer:1,explanation:'Jonas arbeitet Samstag; sie verabreden sich für Sonntag.'}
    ]
  }]},
  { id: 4, title: 'Diskussion im Radio', segments: [{
    title: 'Sollten Geschäfte sonntags geöffnet sein?',
    maxPlays: 2,
    script: 'Moderatorin: Heute sprechen wir darüber, ob Geschäfte auch sonntags regelmäßig öffnen sollten. Bei uns sind drei Gäste: Frau König, Herr Brandt und Frau Yilmaz. Frau König, was meinen Sie? Frau König: Ich bin dagegen. Wer im Verkauf arbeitet, braucht einen festen freien Tag. Natürlich kann man auch unter der Woche frei haben, aber gemeinsame Zeit mit der Familie lässt sich nicht so leicht ersetzen. Moderatorin: Herr Brandt? Herr Brandt: Ich sehe das anders. Viele Menschen arbeiten lange und schaffen es nicht, samstags einzukaufen. Ein zusätzlicher Einkaufstag wäre praktisch. Wichtig ist allerdings, dass niemand gezwungen wird, am Sonntag zu arbeiten. Frau Yilmaz: Mir ist vor allem der kleine Einzelhandel wichtig. Große Ketten könnten leicht zusätzliche Mitarbeiter einsetzen. Für ein kleines Familiengeschäft wäre ein weiterer Öffnungstag jedoch teuer. Vielleicht sollten die Geschäfte selbst entscheiden dürfen. Frau König: Aber freiwillig klingt nur auf dem Papier gut. Wenn alle anderen öffnen, fühlen sich kleine Geschäfte unter Druck. Herr Brandt: Das verstehe ich, trotzdem wünschen sich viele Kunden mehr Flexibilität. Man könnte zunächst an wenigen Sonntagen im Jahr testen, ob die Nachfrage wirklich groß ist. Frau Yilmaz: Einen begrenzten Versuch finde ich sinnvoll. Danach sollte man genau prüfen, ob die zusätzlichen Einnahmen die Kosten decken. Moderatorin: Frau König, wäre ein solcher Test für Sie denkbar? Frau König: Nur dann, wenn die Beschäftigten wirklich freiwillig teilnehmen und dafür einen fairen Ausgleich bekommen. Die Interessen der Mitarbeiter müssen an erster Stelle stehen. Moderatorin: Vielen Dank für die Diskussion!',
    questions: [
      {prompt:'Wer betont die gemeinsame Zeit mit der Familie?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:0,explanation:'Frau König nennt gemeinsame Familienzeit als Argument.'},
      {prompt:'Wer findet einen zusätzlichen Einkaufstag praktisch?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:1,explanation:'Herr Brandt spricht von mehr Flexibilität für Kunden.'},
      {prompt:'Wer macht sich besonders Sorgen um kleine Geschäfte?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:2,explanation:'Frau Yilmaz stellt die Kosten für kleine Betriebe in den Mittelpunkt.'},
      {prompt:'Wer schlägt einen Test an wenigen Sonntagen vor?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:1,explanation:'Herr Brandt schlägt einen begrenzten Versuch vor.'},
      {prompt:'Wer will prüfen, ob zusätzliche Einnahmen die Kosten decken?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:2,explanation:'Frau Yilmaz fordert eine wirtschaftliche Auswertung.'},
      {prompt:'Wer warnt davor, dass Geschäfte unter Druck geraten könnten?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:0,explanation:'Frau König bezweifelt die echte Freiwilligkeit für kleine Geschäfte.'},
      {prompt:'Wer fordert einen fairen Ausgleich für Sonntagsarbeit?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:0,explanation:'Frau König nennt einen fairen Ausgleich als Bedingung.'},
      {prompt:'Wer hält einen begrenzten Versuch ebenfalls für sinnvoll?',options:['Frau König','Herr Brandt','Frau Yilmaz'],answer:2,explanation:'Frau Yilmaz stimmt einem begrenzten Versuch zu.'}
    ]
  }]}
]
