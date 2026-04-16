const GRAMMAR_EXERCISES = [
  // Article Exercises
  {
    id: 'grammar-ex-1',
    type: 'article',
    question: 'What is the correct article for "Mann"?',
    options: ['der', 'die', 'das'],
    correctAnswer: 'der',
    explanation: '"Mann" is a masculine noun, so it takes "der".',
    level: 'A1',
    category: 'Articles',
  },
  {
    id: 'grammar-ex-2',
    type: 'article',
    question: 'What is the correct article for "Frau"?',
    options: ['der', 'die', 'das'],
    correctAnswer: 'die',
    explanation: '"Frau" is a feminine noun, so it takes "die".',
    level: 'A1',
    category: 'Articles',
  },
  {
    id: 'grammar-ex-3',
    type: 'article',
    question: 'What is the correct article for "Kind"?',
    options: ['der', 'die', 'das'],
    correctAnswer: 'das',
    explanation: '"Kind" is a neuter noun, so it takes "das".',
    level: 'A1',
    category: 'Articles',
  },
  {
    id: 'grammar-ex-4',
    type: 'article',
    question: 'What is the correct article for "Apfel"?',
    options: ['der', 'die', 'das'],
    correctAnswer: 'der',
    explanation: '"Apfel" is masculine, so it takes "der".',
    level: 'A1',
    category: 'Articles',
  },
  {
    id: 'grammar-ex-5',
    type: 'article',
    question: 'What is the correct article for "Banane"?',
    options: ['der', 'die', 'das'],
    correctAnswer: 'die',
    explanation: '"Banane" is feminine, so it takes "die".',
    level: 'A1',
    category: 'Articles',
  },
  
  // Conjugation Exercises
  {
    id: 'grammar-ex-6',
    type: 'conjugation',
    question: 'Complete: ich lern__',
    options: ['-e', '-st', '-t', '-en'],
    correctAnswer: '-e',
    explanation: '1st person singular: ich lerne',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-7',
    type: 'conjugation',
    question: 'Complete: du lern__',
    options: ['-e', '-st', '-t', '-en'],
    correctAnswer: '-st',
    explanation: '2nd person singular: du lernst',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-8',
    type: 'conjugation',
    question: 'Complete: er/sie/es lern__',
    options: ['-e', '-st', '-t', '-en'],
    correctAnswer: '-t',
    explanation: '3rd person singular: er/sie/es lernt',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-9',
    type: 'conjugation',
    question: 'Complete: wir lern__',
    options: ['-e', '-st', '-t', '-en'],
    correctAnswer: '-en',
    explanation: '1st person plural: wir lernen',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-10',
    type: 'conjugation',
    question: 'Complete: ihr lern__',
    options: ['-e', '-st', '-t', '-en'],
    correctAnswer: '-t',
    explanation: '2nd person plural: ihr lernt',
    level: 'A1',
    category: 'Verbs',
  },
  
  // Plural Exercises
  {
    id: 'grammar-ex-11',
    type: 'plural',
    question: 'What is the plural of "der Apfel"?',
    options: ['die Apfels', 'die Äpfel', 'die Apfeln', 'die Apfel'],
    correctAnswer: 'die Äpfel',
    explanation: '"Apfel" becomes "Äpfel" with Umlaut + -er.',
    level: 'A1',
    category: 'Nouns',
  },
  {
    id: 'grammar-ex-12',
    type: 'plural',
    question: 'What is the plural of "die Banane"?',
    options: ['die Bananen', 'die Banans', 'die Banane', 'die Banä'],
    correctAnswer: 'die Bananen',
    explanation: '"Banane" takes -n in plural.',
    level: 'A1',
    category: 'Nouns',
  },
  {
    id: 'grammar-ex-13',
    type: 'plural',
    question: 'What is the plural of "das Auto"?',
    options: ['die Auten', 'die Autos', 'die Auter', 'die Auto'],
    correctAnswer: 'die Autos',
    explanation: '"Auto" takes -s in plural.',
    level: 'A1',
    category: 'Nouns',
  },
  
  // Case Exercises
  {
    id: 'grammar-ex-14',
    type: 'case',
    question: 'Ich sehe ___ Mann. (the)',
    options: ['der', 'den', 'dem', 'des'],
    correctAnswer: 'den',
    explanation: 'Accusative masculine: der → den',
    level: 'A2',
    category: 'Cases',
  },
  {
    id: 'grammar-ex-15',
    type: 'case',
    question: 'Ich helfe ___ Frau. (the)',
    options: ['der', 'die', 'den', 'dem'],
    correctAnswer: 'der',
    explanation: 'Dative feminine: die → der',
    level: 'A2',
    category: 'Cases',
  },
  {
    id: 'grammar-ex-16',
    type: 'case',
    question: 'Ich kaufe ___ Buch. (the)',
    options: ['der', 'die', 'das', 'dem'],
    correctAnswer: 'das',
    explanation: 'Accusative neuter: no change (das)',
    level: 'A2',
    category: 'Cases',
  },
  {
    id: 'grammar-ex-17',
    type: 'case',
    question: 'Ich danke ___ Kind. (the)',
    options: ['der', 'die', 'das', 'dem'],
    correctAnswer: 'dem',
    explanation: 'Dative neuter: das → dem',
    level: 'A2',
    category: 'Cases',
  },
  
  // Preposition Exercises
  {
    id: 'grammar-ex-18',
    type: 'preposition',
    question: 'Ich gehe ___ den Park. (through)',
    options: ['durch', 'für', 'gegen', 'ohne'],
    correctAnswer: 'durch',
    explanation: '"durch" means "through" and takes accusative.',
    level: 'A2',
    category: 'Prepositions',
  },
  {
    id: 'grammar-ex-19',
    type: 'preposition',
    question: 'Das Geschenk ist ___ dich. (for)',
    options: ['durch', 'für', 'gegen', 'ohne'],
    correctAnswer: 'für',
    explanation: '"für" means "for" and takes accusative.',
    level: 'A2',
    category: 'Prepositions',
  },
  {
    id: 'grammar-ex-20',
    type: 'preposition',
    question: 'Ich komme ___ dem Haus. (from)',
    options: ['aus', 'bei', 'mit', 'nach'],
    correctAnswer: 'aus',
    explanation: '"aus" means "from/out of" and takes dative.',
    level: 'A2',
    category: 'Prepositions',
  },
  {
    id: 'grammar-ex-21',
    type: 'preposition',
    question: 'Ich gehe ___ dir. (with)',
    options: ['aus', 'bei', 'mit', 'nach'],
    correctAnswer: 'mit',
    explanation: '"mit" means "with" and takes dative.',
    level: 'A2',
    category: 'Prepositions',
  },
  
  // Pronoun Exercises
  {
    id: 'grammar-ex-22',
    type: 'pronoun',
    question: '___ lerne Deutsch. (I)',
    options: ['Ich', 'Du', 'Er', 'Wir'],
    correctAnswer: 'Ich',
    explanation: '"Ich" means "I" (1st person singular).',
    level: 'A1',
    category: 'Pronouns',
  },
  {
    id: 'grammar-ex-23',
    type: 'pronoun',
    question: '___ wohnst du? (Where)',
    options: ['Was', 'Wo', 'Wer', 'Wie'],
    correctAnswer: 'Wo',
    explanation: '"Wo" means "Where".',
    level: 'A1',
    category: 'Pronouns',
  },
  {
    id: 'grammar-ex-24',
    type: 'pronoun',
    question: '___ machst du? (What)',
    options: ['Was', 'Wo', 'Wer', 'Wie'],
    correctAnswer: 'Was',
    explanation: '"Was" means "What".',
    level: 'A1',
    category: 'Pronouns',
  },
  
  // Negation Exercises
  {
    id: 'grammar-ex-25',
    type: 'negation',
    question: 'Ich habe ___ Auto. (no)',
    options: ['nicht', 'kein', 'keine', 'keiner'],
    correctAnswer: 'kein',
    explanation: '"kein" negates nouns with indefinite articles.',
    level: 'A1',
    category: 'Negation',
  },
  {
    id: 'grammar-ex-26',
    type: 'negation',
    question: 'Ich lerne ___. (not)',
    options: ['nicht', 'kein', 'keine', 'keiner'],
    correctAnswer: 'nicht',
    explanation: '"nicht" negates verbs.',
    level: 'A1',
    category: 'Negation',
  },
  
  // Modal Verb Exercises
  {
    id: 'grammar-ex-27',
    type: 'modal',
    question: 'Ich ___ Deutsch sprechen. (can)',
    options: ['kann', 'muss', 'will', 'soll'],
    correctAnswer: 'kann',
    explanation: '"kann" is the 1st person of "können" (can).',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-28',
    type: 'modal',
    question: 'Ich ___ lernen. (must)',
    options: ['kann', 'muss', 'will', 'soll'],
    correctAnswer: 'muss',
    explanation: '"muss" is the 1st person of "müssen" (must).',
    level: 'A1',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-29',
    type: 'modal',
    question: 'Ich ___ das Buch lesen. (want)',
    options: ['kann', 'muss', 'will', 'soll'],
    correctAnswer: 'will',
    explanation: '"will" is the 1st person of "wollen" (want).',
    level: 'A1',
    category: 'Verbs',
  },
  
  // Perfect Tense Exercises
  {
    id: 'grammar-ex-30',
    type: 'perfect',
    question: 'Ich ___ gelernt. (have)',
    options: ['habe', 'bin', 'hat', 'ist'],
    correctAnswer: 'habe',
    explanation: 'Most verbs use "haben" for perfect tense.',
    level: 'A2',
    category: 'Verbs',
  },
  {
    id: 'grammar-ex-31',
    type: 'perfect',
    question: 'Ich ___ gegangen. (have)',
    options: ['habe', 'bin', 'hat', 'ist'],
    correctAnswer: 'bin',
    explanation: 'Motion verbs use "sein" for perfect tense.',
    level: 'A2',
    category: 'Verbs',
  },
];

const LESSON_DATA = {
  grammar: {
    A2: [
      {
        id: 'a2-g1', title: 'Present Tense (Präsens)',
        content: `The present tense is used for actions happening now or regularly. Most verbs follow a regular pattern.
        
**Regular verb conjugation:**
- ich mach**e** (I do)
- du mach**st** (you do - informal)
- er/sie/es mach**t** (he/she/it does)
- wir mach**en** (we do)
- ihr mach**t** (you all do)
- sie/Sie mach**en** (they/you formal do)

**Important irregular verbs:**
- sein (to be): ich bin, du bist, er ist, wir sind, ihr seid, sie sind
- haben (to have): ich habe, du hast, er hat, wir haben, ihr habt, sie haben`,
        examples: [
          { german: 'Ich lerne Deutsch.', english: 'I am learning German.' },
          { german: 'Wir wohnen in Kampala.', english: 'We live in Kampala.' },
          { german: 'Er arbeitet heute.', english: 'He is working today.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Complete: Ich ___ (lernen) Deutsch seit einem Jahr.',
          answer: 'lerne'
        }
      },
      {
        id: 'a2-g2', title: 'Articles & Cases (Nominativ & Akkusativ)',
        content: `German has three genders: masculine (der), feminine (die), neuter (das).

**Nominative (subject):** der Mann, die Frau, das Kind
**Accusative (direct object):** den Mann, die Frau, das Kind

Only masculine changes in accusative: der → den

**Examples:**
- Der Hund beißt **den** Mann. (The dog bites the man.)
- Ich sehe **die** Frau. (I see the woman.)`,
        examples: [
          { german: 'Der Apfel ist rot.', english: 'The apple is red.' },
          { german: 'Ich esse den Apfel.', english: 'I eat the apple.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Ich sehe ___ (der) Mann.',
          answer: 'den'
        }
      },
      {
        id: 'a2-g3', title: 'Modal Verbs',
        content: `Modal verbs express ability, permission, obligation, or desire. They're conjugated differently and push the main verb to the end.

**Common modal verbs:**
- können (can): ich kann, du kannst, er kann...
- müssen (must): ich muss, du musst, er muss...
- wollen (want): ich will, du willst, er will...
- dürfen (may): ich darf, du darfst, er darf...
- sollen (should): ich soll, du sollst, er soll...`,
        examples: [
          { german: 'Ich kann schwimmen.', english: 'I can swim.' },
          { german: 'Du musst lernen.', english: 'You must study.' },
          { german: 'Wir wollen essen.', english: 'We want to eat.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Er ___ (können) gut kochen.',
          answer: 'kann'
        }
      },
      {
        id: 'a2-g4', title: 'Separable Verbs',
        content: `Many German verbs have prefixes that separate in conjugation. The prefix goes to the end of the clause.

**Common separable prefixes:** an-, auf-, aus-, ein-, mit-, zu-, ab-

**Examples:**
- aufstehen (to stand up): Ich stehe um 7 Uhr auf.
- einkaufen (to shop): Wir kaufen im Supermarkt ein.
- mitkommen (to come along): Kommst du mit?`,
        examples: [
          { german: 'Ich stehe früh auf.', english: 'I get up early.' },
          { german: 'Ruf mich an!', english: 'Call me!' }
        ],
        exercise: {
          type: 'fill',
          question: 'Wann ___ du ___? (aufstehen)',
          answer: 'stehst ... auf'
        }
      },
      {
        id: 'a2-g5', title: 'Prepositions with Accusative',
        content: `Some prepositions always take the accusative case:

**Durch, für, gegen, ohne, um**
Memory aid: DOG FU (Durch, Ohne, Gegen, Für, Um)

**Examples:**
- für mich (for me)
- ohne dich (without you)
- um den Tisch (around the table)
- durch den Park (through the park)`,
        examples: [
          { german: 'Das Geschenk ist für dich.', english: 'The gift is for you.' },
          { german: 'Wir gehen um den See.', english: 'We walk around the lake.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Ohne ___ (du) kann ich nicht leben.',
          answer: 'dich'
        }
      },
      {
        id: 'a2-g6', title: 'Possessive Articles',
        content: `Possessive articles show ownership. They match the gender of the thing owned.

**Forms:**
- mein (my), dein (your), sein (his), ihr (her), unser (our), euer (your pl.), ihr (their)

**Examples:**
- mein Vater (my father - masculine)
- meine Mutter (my mother - feminine)
- mein Kind (my child - neuter)`,
        examples: [
          { german: 'Das ist mein Buch.', english: 'This is my book.' },
          { german: 'Ist das dein Auto?', english: 'Is that your car?' }
        ],
        exercise: {
          type: 'fill',
          question: 'Das ist ___ (mein) Schwester.',
          answer: 'meine'
        }
      },
      {
        id: 'a2-g7', title: 'Comparative & Superlative',
        content: `**Comparative:** Add -er (often with umlaut for short vowels)
- groß → größer (big → bigger)
- alt → älter (old → older)
- schnell → schneller (fast → faster)

**Superlative:** am ...-sten
- am größten (biggest)
- am ältesten (oldest)
- am schnellsten (fastest)`,
        examples: [
          { german: 'Er ist größer als ich.', english: 'He is taller than me.' },
          { german: 'Das ist am besten.', english: 'That is the best.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Deutsch ist ___ (schwer) als Englisch.',
          answer: 'schwerer'
        }
      }
    ],
    B1: [
      {
        id: 'b1-g1', title: 'Perfect Tense (Perfekt)',
        content: `The Perfekt is the most common past tense in spoken German.

**Formation:** haben/sein + Partizip II

**Most verbs use "haben":**
- Ich habe gelernt. (I learned.)
- Wir haben gegessen. (We ate.)

**Verbs of movement/change use "sein":**
- Ich bin gegangen. (I went.)
- Er ist gekommen. (He came.)

**Partizip II patterns:**
- Regular: ge...t (gelernt, gemacht)
- Irregular: ge...en (gegessen, geschrieben)`,
        examples: [
          { german: 'Ich habe Deutsch gelernt.', english: 'I learned German.' },
          { german: 'Sie ist nach Hause gegangen.', english: 'She went home.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Wir ___ nach Berlin ___ (fahren).',
          answer: 'sind ... gefahren'
        }
      },
      {
        id: 'b1-g2', title: 'Dative Case',
        content: `The dative case is used for indirect objects (to/for whom?).

**Article changes:**
- der → dem (masculine)
- die → der (feminine)
- das → dem (neuter)
- die → den (plural, +n to noun)

**Dative pronouns:** mir, dir, ihm, ihr, ihm, uns, euch, ihnen`,
        examples: [
          { german: 'Ich gebe dem Mann das Buch.', english: 'I give the man the book.' },
          { german: 'Das gehört mir.', english: 'That belongs to me.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Ich helfe ___ (du).',
          answer: 'dir'
        }
      },
      {
        id: 'b1-g3', title: 'Two-Way Prepositions',
        content: `These prepositions take accusative (movement) or dative (location):

**an, auf, hinter, in, neben, über, unter, vor, zwischen**

**Accusative (where to?):** Ich lege das Buch **auf den** Tisch.
**Dative (where?):** Das Buch liegt **auf dem** Tisch.`,
        examples: [
          { german: 'Ich gehe in die Schule.', english: 'I go to school (movement).' },
          { german: 'Ich bin in der Schule.', english: 'I am at school (location).' }
        ],
        exercise: {
          type: 'fill',
          question: 'Das Bild hängt ___ (an) der Wand.',
          answer: 'an'
        }
      },
      {
        id: 'b1-g4', title: 'Reflexive Verbs',
        content: `Reflexive verbs use a reflexive pronoun when subject and object are the same.

**Reflexive pronouns:** mich, dich, sich, uns, euch, sich

**Common reflexive verbs:**
- sich freuen (to be happy): Ich freue mich.
- sich interessieren für (to be interested in)
- sich erinnern an (to remember)
- sich waschen (to wash oneself)`,
        examples: [
          { german: 'Ich wasche mich.', english: 'I wash myself.' },
          { german: 'Wir freuen uns auf das Wochenende.', english: 'We look forward to the weekend.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Er interessiert ___ für Musik.',
          answer: 'sich'
        }
      },
      {
        id: 'b1-g5', title: 'Relative Clauses',
        content: `Relative clauses provide more information about a noun. The verb goes to the end.

**Relative pronouns match the gender/case of the noun:**
- der Mann, **der**... (who)
- die Frau, **die**... (who)
- das Kind, **das**... (which)
- die Leute, **die**... (who)`,
        examples: [
          { german: 'Das ist der Mann, der hier arbeitet.', english: 'That is the man who works here.' },
          { german: 'Ich habe das Buch, das du mir gegeben hast.', english: 'I have the book that you gave me.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Die Frau, ___ ich gesehen habe, war nett.',
          answer: 'die'
        }
      },
      {
        id: 'b1-g6', title: 'Adjective Endings',
        content: `Adjective endings depend on gender, case, and whether there's an article.

**After definite article (der/die/das):**
- Nominative: der groß**e** Mann, die groß**e** Frau, das groß**e** Kind
- Accusative: den groß**en** Mann, die groß**e** Frau, das groß**e** Kind
- Dative: dem groß**en** Mann, der groß**en** Frau, dem groß**en** Kind`,
        examples: [
          { german: 'Der alte Mann ist nett.', english: 'The old man is nice.' },
          { german: 'Ich sehe die junge Frau.', english: 'I see the young woman.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Mit dem ___ (alt) Freund.',
          answer: 'alten'
        }
      },
      {
        id: 'b1-g7', title: 'Subordinate Clauses with "dass"',
        content: `"Dass" (that) introduces subordinate clauses. The conjugated verb goes to the end.

**Structure:** Main clause + dass + subject + ... + verb

**Examples:**
- Ich weiß, dass du Deutsch lernst.
- Es ist wichtig, dass du übst.`,
        examples: [
          { german: 'Ich hoffe, dass du kommst.', english: 'I hope that you come.' },
          { german: 'Es tut mir leid, dass ich spät bin.', english: 'I am sorry that I am late.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Ich glaube, dass er ___ (kommen).',
          answer: 'kommt'
        }
      },
      {
        id: 'b1-g8', title: 'Future Tense (Futur I)',
        content: `The future tense is formed with "werden" + infinitive.

**Conjugation of werden:**
- ich werde, du wirst, er/sie/es wird
- wir werden, ihr werdet, sie/Sie werden

**Examples:**
- Ich werde Deutsch lernen. (I will learn German.)
- Wir werden morgen kommen. (We will come tomorrow.)`,
        examples: [
          { german: 'Es wird regnen.', english: 'It will rain.' },
          { german: 'Ich werde dich anrufen.', english: 'I will call you.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Morgen ___ wir ___ (reisen).',
          answer: 'werden ... reisen'
        }
      }
    ],
    B2: [
      {
        id: 'b2-g1', title: 'Genitive Case',
        content: `The genitive shows possession (of/\'s). It's formal and often replaced by "von" + dative in speech.

**Article changes:**
- der → des (+s/es to noun)
- die → der
- das → des (+s/es to noun)
- die → der

**Examples:**
- das Auto des Mannes (the man\'s car)
- die Farbe der Blume (the flower\'s color)`,
        examples: [
          { german: 'Wegen des Wetters bleiben wir zu Hause.', english: 'Because of the weather, we stay home.' },
          { german: 'Trotz der Kälte gehen wir spazieren.', english: 'Despite the cold, we go for a walk.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Während ___ (der) Woche arbeite ich.',
          answer: 'der'
        }
      },
      {
        id: 'b2-g2', title: 'Passive Voice',
        content: `The passive focuses on the action, not who does it.

**Present passive:** werden + Partizip II
- Das Haus wird gebaut. (The house is being built.)

**Past passive:** wurde + Partizip II
- Das Haus wurde gebaut. (The house was built.)

**Perfect passive:** ist + Partizip II + worden
- Das Haus ist gebaut worden.`,
        examples: [
          { german: 'Hier wird Deutsch gesprochen.', english: 'German is spoken here.' },
          { german: 'Der Brief wurde gestern geschrieben.', english: 'The letter was written yesterday.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Das Essen ___ (werden) gerade gekocht.',
          answer: 'wird'
        }
      },
      {
        id: 'b2-g3', title: 'Konjunktiv II (Subjunctive)',
        content: `Konjunktiv II expresses hypothetical situations, wishes, or polite requests.

**Common forms:**
- wäre (would be) from sein
- hätte (would have) from haben
- könnte (could) from können
- würde + infinitive (would do)

**Examples:**
- Ich wäre gern reich. (I would like to be rich.)
- Könntest du mir helfen? (Could you help me?)`,
        examples: [
          { german: 'Wenn ich Zeit hätte, würde ich kommen.', english: 'If I had time, I would come.' },
          { german: 'Ich hätte gern einen Kaffee.', english: 'I would like a coffee.' }
        ],
        exercise: {
          type: 'fill',
          question: '___ (können) Sie das wiederholen?',
          answer: 'Könnten'
        }
      },
      {
        id: 'b2-g4', title: 'Verbs with Prepositions',
        content: `Many German verbs require specific prepositions.

**Important combinations:**
- warten auf (+ Akk): wait for
- sich freuen auf/über (+ Akk): look forward to / be happy about
- denken an (+ Akk): think of
- teilnehmen an (+ Dat): participate in
- bestehen aus (+ Dat): consist of
- sprechen mit/über (+ Dat/Akk): speak with/about`,
        examples: [
          { german: 'Ich warte auf den Bus.', english: 'I am waiting for the bus.' },
          { german: 'Wir freuen uns auf den Urlaub.', english: 'We are looking forward to the vacation.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Er denkt oft ___ (an) seine Familie.',
          answer: 'an'
        }
      },
      {
        id: 'b2-g5', title: 'Infinitive with "zu"',
        content: `The infinitive with "zu" is used after many verbs and expressions.

**Common patterns:**
- versuchen zu + infinitive (try to)
- planen zu + infinitive (plan to)
- es ist wichtig zu + infinitive (it is important to)
- um zu + infinitive (in order to)`,
        examples: [
          { german: 'Ich versuche, Deutsch zu lernen.', english: 'I try to learn German.' },
          { german: 'Es ist wichtig, viel zu üben.', english: 'It is important to practice a lot.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Ich habe vor, nach Deutschland ___ (reisen).',
          answer: 'zu reisen'
        }
      },
      {
        id: 'b2-g6', title: 'Participles as Adjectives',
        content: `Participles can be used as adjectives with appropriate endings.

**Present participle (active):** -end
- das schlafende Kind (the sleeping child)
- der laufende Motor (the running engine)

**Past participle (passive/completed):**
- das gekochte Essen (the cooked food)
- die geschriebene Arbeit (the written work)`,
        examples: [
          { german: 'Die weinende Frau brauchte Hilfe.', english: 'The crying woman needed help.' },
          { german: 'Das ist ein bekanntes Problem.', english: 'This is a known problem.' }
        ],
        exercise: {
          type: 'fill',
          question: 'Das ___ (kochen) Wasser ist heiß.',
          answer: 'kochende'
        }
      },
      {
        id: 'b2-g7', title: 'Causal Connectors',
        content: `**weil** (because) - verb at end
- Ich bleibe zu Hause, weil ich krank bin.

**da** (since/as) - verb at end, more formal
- Da es regnet, bleiben wir zu Hause.

**deshalb/deswegen** (therefore) - verb follows
- Es regnet, deshalb bleiben wir zu Hause.

**trotzdem** (nevertheless)
- Es regnet, trotzdem gehen wir.`,
        examples: [
          { german: 'Ich lerne, weil ich die Prüfung bestehen will.', english: 'I study because I want to pass the exam.' },
          { german: 'Er ist müde, trotzdem arbeitet er weiter.', english: 'He is tired, nevertheless he continues working.' }
        ],
        exercise: {
          type: 'fill',
          question: '___ es spät ist, gehe ich nach Hause.',
          answer: 'Da'
        }
      },
      {
        id: 'b2-g8', title: 'Extended Attributes',
        content: `German allows long adjective phrases before nouns (unlike English).

**Example:**
- das von mir gestern gekaufte Buch
- the book that I bought yesterday

**Structure:** article + (all modifiers) + noun
The whole phrase is declined as one unit.`,
        examples: [
          { german: 'Der auf dem Tisch liegende Stift ist meiner.', english: 'The pen lying on the table is mine.' },
          { german: 'Die von allen gelobte Leistung war beeindruckend.', english: 'The performance praised by everyone was impressive.' }
        ],
        exercise: {
          type: 'translate',
          question: 'Translate: "The recently built house"',
          answer: 'das kürzlich gebaute Haus'
        }
      }
    ]
  },
  // 123 Core Vocabulary Words - Comprehensive German Learning Set
  vocabulary: [
    // Lesson 1: Greetings (8 words)
    { id: 'w1', german: 'Hallo', translation: 'Hello', article: '', level: 'A1', category: 'Basics' },
    { id: 'w2', german: 'Guten Morgen', translation: 'Good morning', article: '', level: 'A1', category: 'Basics' },
    { id: 'w3', german: 'Guten Tag', translation: 'Good day', article: '', level: 'A1', category: 'Basics' },
    { id: 'w4', german: 'Guten Abend', translation: 'Good evening', article: '', level: 'A1', category: 'Basics' },
    { id: 'w5', german: 'Auf Wiedersehen', translation: 'Goodbye', article: '', level: 'A1', category: 'Basics' },
    { id: 'w6', german: 'Tschüss', translation: 'Bye', article: '', level: 'A1', category: 'Basics' },
    { id: 'w7', german: 'Danke', translation: 'Thank you', article: '', level: 'A1', category: 'Basics' },
    { id: 'w8', german: 'Bitte', translation: 'Please / You\'re welcome', article: '', level: 'A1', category: 'Basics' },
    
    // Lesson 2: Numbers (10 words)
    { id: 'w9', german: 'eins', translation: 'one', article: '', level: 'A1', category: 'Basics' },
    { id: 'w10', german: 'zwei', translation: 'two', article: '', level: 'A1', category: 'Basics' },
    { id: 'w11', german: 'drei', translation: 'three', article: '', level: 'A1', category: 'Basics' },
    { id: 'w12', german: 'vier', translation: 'four', article: '', level: 'A1', category: 'Basics' },
    { id: 'w13', german: 'fünf', translation: 'five', article: '', level: 'A1', category: 'Basics' },
    { id: 'w14', german: 'sechs', translation: 'six', article: '', level: 'A1', category: 'Basics' },
    { id: 'w15', german: 'sieben', translation: 'seven', article: '', level: 'A1', category: 'Basics' },
    { id: 'w16', german: 'acht', translation: 'eight', article: '', level: 'A1', category: 'Basics' },
    { id: 'w17', german: 'neun', translation: 'nine', article: '', level: 'A1', category: 'Basics' },
    { id: 'w18', german: 'zehn', translation: 'ten', article: '', level: 'A1', category: 'Basics' },
    
    // Lesson 3: Family (10 words)
    { id: 'w19', german: 'die Familie', translation: 'family', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w20', german: 'die Mutter', translation: 'mother', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w21', german: 'der Vater', translation: 'father', article: 'der', level: 'A1', category: 'Personal' },
    { id: 'w22', german: 'die Schwester', translation: 'sister', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w23', german: 'der Bruder', translation: 'brother', article: 'der', level: 'A1', category: 'Personal' },
    { id: 'w24', german: 'die Tochter', translation: 'daughter', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w25', german: 'der Sohn', translation: 'son', article: 'der', level: 'A1', category: 'Personal' },
    { id: 'w26', german: 'die Eltern', translation: 'parents', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w27', german: 'die Großmutter', translation: 'grandmother', article: 'die', level: 'A1', category: 'Personal' },
    { id: 'w28', german: 'der Großvater', translation: 'grandfather', article: 'der', level: 'A1', category: 'Personal' },
    
    // Lesson 4: Food and Drink (15 words)
    { id: 'w29', german: 'das Essen', translation: 'food', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w30', german: 'das Brot', translation: 'bread', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w31', german: 'das Wasser', translation: 'water', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w32', german: 'der Kaffee', translation: 'coffee', article: 'der', level: 'A1', category: 'Food' },
    { id: 'w33', german: 'der Tee', translation: 'tea', article: 'der', level: 'A1', category: 'Food' },
    { id: 'w34', german: 'der Apfel', translation: 'apple', article: 'der', level: 'A1', category: 'Food' },
    { id: 'w35', german: 'die Banane', translation: 'banana', article: 'die', level: 'A1', category: 'Food' },
    { id: 'w36', german: 'die Milch', translation: 'milk', article: 'die', level: 'A1', category: 'Food' },
    { id: 'w37', german: 'der Käse', translation: 'cheese', article: 'der', level: 'A1', category: 'Food' },
    { id: 'w38', german: 'das Fleisch', translation: 'meat', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w39', german: 'der Fisch', translation: 'fish', article: 'der', level: 'A1', category: 'Food' },
    { id: 'w40', german: 'die Kartoffel', translation: 'potato', article: 'die', level: 'A1', category: 'Food' },
    { id: 'w41', german: 'das Frühstück', translation: 'breakfast', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w42', german: 'das Mittagessen', translation: 'lunch', article: 'das', level: 'A1', category: 'Food' },
    { id: 'w43', german: 'das Abendessen', translation: 'dinner', article: 'das', level: 'A1', category: 'Food' },
    
    // Lesson 5: Shopping (15 words)
    { id: 'w44', german: 'der Supermarkt', translation: 'supermarket', article: 'der', level: 'A1', category: 'Shopping' },
    { id: 'w45', german: 'der Markt', translation: 'market', article: 'der', level: 'A1', category: 'Shopping' },
    { id: 'w46', german: 'das Geschäft', translation: 'shop', article: 'das', level: 'A1', category: 'Shopping' },
    { id: 'w47', german: 'die Bäckerei', translation: 'bakery', article: 'die', level: 'A1', category: 'Shopping' },
    { id: 'w48', german: 'kaufen', translation: 'to buy', article: '', level: 'A1', category: 'Shopping' },
    { id: 'w49', german: 'bezahlen', translation: 'to pay', article: '', level: 'A1', category: 'Shopping' },
    { id: 'w50', german: 'das Geld', translation: 'money', article: 'das', level: 'A1', category: 'Shopping' },
    { id: 'w51', german: 'die Karte', translation: 'card', article: 'die', level: 'A1', category: 'Shopping' },
    { id: 'w52', german: 'bar', translation: 'in cash', article: '', level: 'A1', category: 'Shopping' },
    { id: 'w53', german: 'teuer', translation: 'expensive', article: '', level: 'A1', category: 'Shopping' },
    { id: 'w54', german: 'billig', translation: 'cheap', article: '', level: 'A1', category: 'Shopping' },
    { id: 'w55', german: 'die Tasche', translation: 'bag', article: 'die', level: 'A1', category: 'Shopping' },
    { id: 'w56', german: 'der Einkaufswagen', translation: 'shopping cart', article: 'der', level: 'A1', category: 'Shopping' },
    { id: 'w57', german: 'die Kasse', translation: 'cash register', article: 'die', level: 'A1', category: 'Shopping' },
    { id: 'w58', german: 'der Preis', translation: 'price', article: 'der', level: 'A1', category: 'Shopping' },
    
    // Lesson 6: Travel and Transport (15 words)
    { id: 'w59', german: 'der Zug', translation: 'train', article: 'der', level: 'A2', category: 'Travel' },
    { id: 'w60', german: 'die Bahn', translation: 'railway', article: 'die', level: 'A2', category: 'Travel' },
    { id: 'w61', german: 'der Bahnhof', translation: 'train station', article: 'der', level: 'A2', category: 'Travel' },
    { id: 'w62', german: 'das Flugzeug', translation: 'airplane', article: 'das', level: 'A2', category: 'Travel' },
    { id: 'w63', german: 'der Flughafen', translation: 'airport', article: 'der', level: 'A2', category: 'Travel' },
    { id: 'w64', german: 'der Bus', translation: 'bus', article: 'der', level: 'A2', category: 'Travel' },
    { id: 'w65', german: 'die U-Bahn', translation: 'subway', article: 'die', level: 'A2', category: 'Travel' },
    { id: 'w66', german: 'das Taxi', translation: 'taxi', article: 'das', level: 'A2', category: 'Travel' },
    { id: 'w67', german: 'das Auto', translation: 'car', article: 'das', level: 'A2', category: 'Travel' },
    { id: 'w68', german: 'das Fahrrad', translation: 'bicycle', article: 'das', level: 'A2', category: 'Travel' },
    { id: 'w69', german: 'die Fahrkarte', translation: 'ticket', article: 'die', level: 'A2', category: 'Travel' },
    { id: 'w70', german: 'reisen', translation: 'to travel', article: '', level: 'A2', category: 'Travel' },
    { id: 'w71', german: 'das Hotel', translation: 'hotel', article: 'das', level: 'A2', category: 'Travel' },
    { id: 'w72', german: 'die Straße', translation: 'street', article: 'die', level: 'A2', category: 'Travel' },
    { id: 'w73', german: 'die Karte', translation: 'map', article: 'die', level: 'A2', category: 'Travel' },
    
    // Lesson 7: Work and Profession (15 words)
    { id: 'w74', german: 'die Arbeit', translation: 'work', article: 'die', level: 'A2', category: 'Work' },
    { id: 'w75', german: 'der Beruf', translation: 'profession', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w76', german: 'der Lehrer', translation: 'teacher (m)', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w77', german: 'die Lehrerin', translation: 'teacher (f)', article: 'die', level: 'A2', category: 'Work' },
    { id: 'w78', german: 'der Arzt', translation: 'doctor (m)', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w79', german: 'die Ärztin', translation: 'doctor (f)', article: 'die', level: 'A2', category: 'Work' },
    { id: 'w80', german: 'der Ingenieur', translation: 'engineer', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w81', german: 'die Bürokauffrau', translation: 'office clerk', article: 'die', level: 'A2', category: 'Work' },
    { id: 'w82', german: 'das Büro', translation: 'office', article: 'das', level: 'A2', category: 'Work' },
    { id: 'w83', german: 'der Chef', translation: 'boss', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w84', german: 'der Kollege', translation: 'colleague', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w85', german: 'arbeiten', translation: 'to work', article: '', level: 'A2', category: 'Work' },
    { id: 'w86', german: 'das Gehalt', translation: 'salary', article: 'das', level: 'A2', category: 'Work' },
    { id: 'w87', german: 'der Urlaub', translation: 'vacation', article: 'der', level: 'A2', category: 'Work' },
    { id: 'w88', german: 'die Pause', translation: 'break', article: 'die', level: 'A2', category: 'Work' },
    
    // Lesson 8: Health (15 words)
    { id: 'w89', german: 'die Gesundheit', translation: 'health', article: 'die', level: 'A2', category: 'Health' },
    { id: 'w90', german: 'der Körper', translation: 'body', article: 'der', level: 'A2', category: 'Health' },
    { id: 'w91', german: 'der Kopf', translation: 'head', article: 'der', level: 'A2', category: 'Health' },
    { id: 'w92', german: 'die Hand', translation: 'hand', article: 'die', level: 'A2', category: 'Health' },
    { id: 'w93', german: 'der Fuß', translation: 'foot', article: 'der', level: 'A2', category: 'Health' },
    { id: 'w94', german: 'das Auge', translation: 'eye', article: 'das', level: 'A2', category: 'Health' },
    { id: 'w95', german: 'das Ohr', translation: 'ear', article: 'das', level: 'A2', category: 'Health' },
    { id: 'w96', german: 'die Krankheit', translation: 'illness', article: 'die', level: 'A2', category: 'Health' },
    { id: 'w97', german: 'der Schmerz', translation: 'pain', article: 'der', level: 'A2', category: 'Health' },
    { id: 'w98', german: 'das Fieber', translation: 'fever', article: 'das', level: 'A2', category: 'Health' },
    { id: 'w99', german: 'das Medikament', translation: 'medication', article: 'das', level: 'A2', category: 'Health' },
    { id: 'w100', german: 'die Apotheke', translation: 'pharmacy', article: 'die', level: 'A2', category: 'Health' },
    { id: 'w101', german: 'das Krankenhaus', translation: 'hospital', article: 'das', level: 'A2', category: 'Health' },
    { id: 'w102', german: 'der Patient', translation: 'patient', article: 'der', level: 'A2', category: 'Health' },
    { id: 'w103', german: 'gesund', translation: 'healthy', article: '', level: 'A2', category: 'Health' },
    
    // Additional Common Words (20 words)
    { id: 'w104', german: 'ja', translation: 'yes', article: '', level: 'A1', category: 'Common' },
    { id: 'w105', german: 'nein', translation: 'no', article: '', level: 'A1', category: 'Common' },
    { id: 'w106', german: 'vielleicht', translation: 'maybe', article: '', level: 'A1', category: 'Common' },
    { id: 'w107', german: 'und', translation: 'and', article: '', level: 'A1', category: 'Common' },
    { id: 'w108', german: 'oder', translation: 'or', article: '', level: 'A1', category: 'Common' },
    { id: 'w109', german: 'aber', translation: 'but', article: '', level: 'A1', category: 'Common' },
    { id: 'w110', german: 'ich', translation: 'I', article: '', level: 'A1', category: 'Common' },
    { id: 'w111', german: 'du', translation: 'you (informal)', article: '', level: 'A1', category: 'Common' },
    { id: 'w112', german: 'er', translation: 'he', article: '', level: 'A1', category: 'Common' },
    { id: 'w113', german: 'sie', translation: 'she', article: '', level: 'A1', category: 'Common' },
    { id: 'w114', german: 'es', translation: 'it', article: '', level: 'A1', category: 'Common' },
    { id: 'w115', german: 'wir', translation: 'we', article: '', level: 'A1', category: 'Common' },
    { id: 'w116', german: 'ihr', translation: 'you (plural)', article: '', level: 'A1', category: 'Common' },
    { id: 'w117', german: 'heute', translation: 'today', article: '', level: 'A1', category: 'Common' },
    { id: 'w118', german: 'morgen', translation: 'tomorrow', article: '', level: 'A1', category: 'Common' },
    { id: 'w119', german: 'gestern', translation: 'yesterday', article: '', level: 'A1', category: 'Common' },
    { id: 'w120', german: 'jetzt', translation: 'now', article: '', level: 'A1', category: 'Common' },
    { id: 'w121', german: 'hier', translation: 'here', article: '', level: 'A1', category: 'Common' },
    { id: 'w122', german: 'dort', translation: 'there', article: '', level: 'A1', category: 'Common' },
    { id: 'w123', german: 'gut', translation: 'good', article: '', level: 'A1', category: 'Common' }
  ],
  pronunciation: {
    A2: [
      {
        id: 'a2-p1', title: 'German Vowels - Short & Long',
        content: `German distinguishes between short and long vowels. This changes meaning!

**Long vowels** (often doubled or followed by 'h'):
- **aa, ah** → [aː]: Vater (father) - like "father"
- **ee, eh** → [eː]: See (lake) - like "say" without the 'y'
- **oo, oh** → [oː]: Boot (boat) - like "go" without the 'w'

**Short vowels:**
- **a** → [a]: Mann (man) - shorter, crisper
- **e** → [ɛ]: Bett (bed) - like "bed"
- **o** → [ɔ]: Gott (God) - more open than English`,
        examples: [
          { german: 'Staat (state) vs. Stadt (city)', english: 'Long vs. short a' },
          { german: 'Meer (sea) vs. mehr (more)', english: 'Both long e sound' },
          { german: 'Sohn (son) vs. Sonne (sun)', english: 'Long vs. short o' }
        ]
      },
      {
        id: 'a2-p2', title: 'Umlauts: ä, ö, ü',
        content: `Umlauts are unique German sounds.

**ä** → [ɛ] or [eː]:
- Like "bed" (short) or "say" without 'y' (long)
- Examples: Männer (men), Äpfel (apples)

**ö** → [ø] or [œ]:
- Make an "o" shape but say "e"
- Examples: schön (beautiful), öffnen (to open)

**ü** → [y] or [ʏ]:
- Make an "oo" shape but say "ee"
- Examples: über (over), müde (tired)`,
        examples: [
          { german: 'Männer', english: 'MEN-ner (like "bed")' },
          { german: 'schön', english: 'shurn (rounded e)' },
          { german: 'müde', english: 'MUE-deh (rounded i)' }
        ]
      },
      {
        id: 'a2-p3', title: 'Consonants: ch',
        content: `The German "ch" has two sounds:

**After a, o, u, au** → [x] (ach-Laut):
- Throat sound, like clearing your throat
- Examples: Bach, Buch, auch, doch

**After e, i, ä, ö, ü, l, n, r** → [ç] (ich-Laut):
- Softer, palatal sound
- Examples: ich, mich, Licht, durch

**At the beginning** → [k]:
- Examples: Chaos, Charakter, Chor`,
        examples: [
          { german: 'ich', english: 'ish (soft, palatal)' },
          { german: 'Bach', english: 'BAHkh (throat sound)' },
          { german: 'Chemie', english: 'chee-MEE (k sound)' }
        ]
      },
      {
        id: 'a2-p4', title: 'Consonants: r',
        content: `German "r" is different from English:

**Standard German:** Guttural R (in the throat)
- Sounds like a soft gargle
- Made in the back of the throat
- Similar to French "r"

**Regional:** Some areas roll the R (tongue tip)

**At the end of syllables:** Often becomes a vowel sound [ɐ]
- Examples: Vater → FAH-tah, besser → BESS-ah`,
        examples: [
          { german: 'rot', english: 'throat R + oht' },
          { german: 'Vater', english: 'FAH-tah (soft ending)' },
          { german: 'wir', english: 'veer (almost like vowel)' }
        ]
      },
      {
        id: 'a2-p5', title: 'Consonants: z, v, w',
        content: `These letters are tricky because they differ from English:

**z** → [ts] (always!):
- Like "ts" in "cats"
- Examples: Zeit (time), zu (to), zehn (ten)

**v** → [f] in most German words:
- Examples: Vater (father), von (from), voll (full)
- BUT: [v] in loanwords: Video, Vase

**w** → [v] (like English "v"):
- Examples: Wasser (water), wir (we), wann (when)`,
        examples: [
          { german: 'Zeit', english: 'TSITE (like "cats")' },
          { german: 'Vater', english: 'FAH-ter (f sound)' },
          { german: 'Wasser', english: 'VAH-ser (v sound)' }
        ]
      },
      {
        id: 'a2-p6', title: 'Consonant Clusters: sp, st',
        content: `At the beginning of words, these clusters change:

**sp** → [ʃp] (shp):
- Examples: Sport, sprechen, spät
- Sounds like "shp"

**st** → [ʃt] (sht):
- Examples: Stadt, stehen, Student
- Sounds like "sht"

**In the middle or end:** Normal [sp] and [st]
- Examples: Westen, Wespe, Last`,
        examples: [
          { german: 'Sport', english: 'SHport' },
          { german: 'Stadt', english: 'SHtadt' },
          { german: 'Wespe', english: 'VES-peh (normal sp)' }
        ]
      },
      {
        id: 'a2-p7', title: 'The Sound "sch"',
        content: `**sch** → [ʃ] (like English "sh"):
- Examples: Schule (school), schön (beautiful), Fisch (fish)

**s before consonants** → [ʃ] (also "sh"):
- Examples: Student, Skandal, Sport
- This is why "st" and "sp" sound like "sht" and "shp"

**Practice words:**
- Deutsch (German)
- Tisch (table)
- Fleisch (meat)`,
        examples: [
          { german: 'Schule', english: 'SHOO-leh' },
          { german: 'Fleisch', english: 'FLYSH' },
          { german: 'deutsch', english: 'DOYTSH' }
        ]
      }
    ],
    B1: [
      {
        id: 'b1-p1', title: 'Diphthongs: ei, ai, eu, äu',
        content: `German diphthongs are combinations of two vowel sounds:

**ei / ai** → [aɪ] (like English "eye"):
- Examples: nein, mein, Kaiser, Mai
- Both sound the same!

**eu / äu** → [ɔʏ] (like "oy" in "boy"):
- Examples: Europa, heute, Häuser, träumen
- Start with rounded "o", glide to "ee"

**au** → [aʊ] (like "ow" in "cow"):
- Examples: Haus, auch, Baum, kaufen`,
        examples: [
          { german: 'nein', english: 'nine (like English)' },
          { german: 'heute', english: 'HOY-teh' },
          { german: 'Haus', english: 'HOUSE (like English)' }
        ]
      },
      {
        id: 'b1-p2', title: 'Consonant: ß (Eszett)',
        content: `**ß** → [s] (sharp s sound):
- Used after long vowels and diphthongs
- Examples: Straße (street), groß (big), weiß (white)

**Comparison with ss:**
- **ß** after long vowels: groß, Fuß
- **ss** after short vowels: gross (Swiss), Fuss (Swiss)

In Switzerland, always "ss". In Germany/Austria, use "ß".`,
        examples: [
          { german: 'Straße', english: 'SHTRAH-seh' },
          { german: 'groß', english: 'GROHS' },
          { german: 'weiß', english: 'VYS' }
        ]
      },
      {
        id: 'b1-p3', title: 'Final Obstruent Devoicing',
        content: `At the end of words, voiced consonants become voiceless:

**b → p:**
- Examples: ab (off), dieb → diep

**d → t:**
- Examples: und (and) → unt, Bad (bath) → Bat

**g → k:**
- Examples: Tag (day) → Tak, weg (away) → vek

This is automatic in German speech!`,
        examples: [
          { german: 'und', english: 'UNT (not "und")' },
          { german: 'Tag', english: 'TAHK (not "tag")' },
          { german: 'lieb', english: 'LEEP (not "liev")' }
        ]
      },
      {
        id: 'b1-p4', title: 'Stress Patterns',
        content: `German word stress is important for sounding natural:

**Most common:** First syllable
- Examples: **VA**-ter, **MU**-ter, **KIN**-der

**Loan words:** Often last syllable
- Examples: stu**DENT**, Pro**FESS**-or, Mu**SE**-um

**Separable verbs:** Stress on prefix
- Examples: **AUS**-gehen, **EIN**-kaufen, **AN**-rufen

**Compound words:** Stress on first part
- Examples: **HAND**-schuh, **WAS**-serflasche`,
        examples: [
          { german: 'VER-stehen', english: 'Stress on VER' },
          { german: 'AUS-sprechen', english: 'Stress on AUS' },
          { german: 'HAND-buch', english: 'Stress on HAND' }
        ]
      },
      {
        id: 'b1-p5', title: 'Intonation in Questions',
        content: `**Yes/No questions:** Rising intonation ↗
- Kommst du mit? ↗ (Are you coming along?)
- Hast du Zeit? ↗ (Do you have time?)

**W-questions (who, what, where):** Falling intonation ↘
- Wo wohnst du? ↘ (Where do you live?)
- Was machst du? ↘ (What are you doing?)

**Statement:** Generally falling ↘
- Ich komme mit. ↘ (I am coming along.)`,
        examples: [
          { german: 'Bist du müde? ↗', english: 'Are you tired?' },
          { german: 'Wie geht es dir? ↘', english: 'How are you?' }
        ]
      },
      {
        id: 'b1-p6', title: 'The Sound "ng" vs "nk"',
        content: `**ng** → [ŋ] (like English "ng"):
- Examples: singen (to sing), jung (young), lang (long)
- Sound comes from the back of the throat

**nk** → [ŋk] (ng + k):
- Examples: denken (to think), trinken (to drink), Bank (bank)
- The "n" becomes "ng" before "k"

**Important:** Don't pronounce a separate "n" in "ng"!`,
        examples: [
          { german: 'singen', english: 'ZING-en (not ZIN-gen)' },
          { german: 'denken', english: 'DENK-en (with ng sound)' },
          { german: 'lang', english: 'LANG (from throat)' }
        ]
      },
      {
        id: 'b1-p7', title: 'Linking Sounds',
        content: `In connected speech, Germans link words smoothly:

**Final -n links to following vowel:**
- Ich bin ein... → Ich bi-nein...

**Final -t/-d can soften:**
- und dann → un-dann

**Compound consonants:**
- Ist das... → Is-tas...

**Practice:** Read aloud and connect words naturally, not choppy!`,
        examples: [
          { german: 'Wie geht es Ihnen?', english: 'Connect: Wie-ge-te-sIhnen' },
          { german: 'Ich habe es.', english: 'Connect: Ich-ha-be-ses' }
        ]
      },
      {
        id: 'b1-p8', title: 'Regional Pronunciation',
        content: `German has regional variations:

**Standard (Hochdeutsch):**
- Taught in schools, used in media
- Guttural R, clear consonants

**Northern Germany:**
- Clearer, closer to standard
- Sometimes "g" → "ch" (ich → ick)

**Southern Germany/Austria:**
- Softer, more melodic
- Rolled R, different vowel qualities

**Swiss German:**
- Very different! Separate dialects
- No ß, different vocabulary`,
        examples: [
          { german: 'ich (standard)', english: 'ish' },
          { german: 'ich (Berlin)', english: 'ick' },
          { german: 'ich (Bavaria)', english: 'i (very soft)' }
        ]
      }
    ],
    B2: [
      {
        id: 'b2-p1', title: 'Advanced Umlaut Distinctions',
        content: `Fine-tuning umlaut pronunciation:

**ä** has two variants:
- Short [ɛ]: Männer, ärmel
- Long [eː]: spät, Ähre

**ö** variations:
- Short [œ]: öffnen, können
- Long [øː]: schön, hören
- Practice: Round lips for "o", say "e"

**ü** variations:
- Short [ʏ]: müssen, fünf
- Long [yː]: über, führen
- Practice: Round lips for "oo", say "ee"`,
        examples: [
          { german: 'Männer vs. spät', english: 'Short vs. long ä' },
          { german: 'können vs. schön', english: 'Short vs. long ö' },
          { german: 'fünf vs. über', english: 'Short vs. long ü' }
        ]
      },
      {
        id: 'b2-p2', title: 'Subtle Consonant Distinctions',
        content: `**b vs. w:**
- b is bilabial (both lips): **b**all
- w is labiodental (lip + teeth): **w**ie [v]

**d vs. z:**
- d is dental: **d**ein
- z is [ts]: **z**ehn

**g variations:**
- Standard: [g] or [ʁ]
- Regional: [k] or [ç]
- Final position: always [k]`,
        examples: [
          { german: 'Ball vs. Wall', english: 'B vs. V sound' },
          { german: 'danken vs. zanken', english: 'D vs. TS' }
        ]
      },
      {
        id: 'b2-p3', title: 'Sentence Rhythm & Timing',
        content: `German is stress-timed (like English):

**Stressed syllables** occur at roughly equal intervals
- Unstressed syllables are compressed

**Example:**
- Ich **weiß** es **nicht**, aber ich **komm** mor**gen**.

**Content words** (nouns, verbs, adjectives) are stressed
**Function words** (articles, prepositions) are reduced

**Practice:** Tap the rhythm while speaking!`,
        examples: [
          { german: 'Ich LER-ne DEUTSCH seit ZWEI JAH-ren.', english: 'Stress pattern' }
        ]
      },
      {
        id: 'b2-p4', title: 'Emphasis & Contrast',
        content: `To emphasize or contrast, Germans stress specific words:

**Normal:** Ich gehe heute ins Kino.
**Emphasis on time:** Ich gehe **HEUTE** ins Kino. (not tomorrow)
**Emphasis on place:** Ich gehe heute ins **KINO**. (not theater)
**Emphasis on person:** **ICH** gehe heute ins Kino. (not you)

**Contrast:**
- Nicht ICH, sondern DU. (Not me, but you.)
- Nicht HEUTE, sondern MORGEN. (Not today, but tomorrow.)`,
        examples: [
          { german: 'ICH will das. (not you)', english: 'Emphasis on subject' },
          { german: 'Das will ICH. (emphatic)', english: 'Emphasis at end' }
        ]
      },
      {
        id: 'b2-p5', title: 'Reduced Forms in Speech',
        content: `In casual speech, Germans reduce words:

**Common reductions:**
- haben → ham: Ich ham's gemacht.
- geben → geb: Gib's mir!
- nicht → n't: Weiß ich n't.
- ein → 'n: Hast du 'n Auto?
- wie → wie'n: Wie'n geht's?

**Contractions:**
- in das → ins
- an das → ans
- zu dem → zum
- zu der → zur`,
        examples: [
          { german: 'Ich hab\'s.', english: 'I have it.' },
          { german: 'Geh\'n wir!', english: 'Let\'s go!' },
          { german: 'Ins Kino?', english: 'To the cinema?' }
        ]
      },
      {
        id: 'b2-p6', title: 'Formal vs. Informal Register',
        content: `Pronunciation can vary by register:

**Formal (presentation, news):**
- Clear, precise articulation
- Full forms (nicht, haben)
- Standard pronunciation

**Informal (friends, family):**
- More reductions
- Faster tempo
- Regional features acceptable

**Professional tip:** Aim for clear standard German, but don\'t sound robotic!`,
        examples: [
          { german: 'Formal: Ich habe es nicht.', english: 'Full forms' },
          { german: 'Informal: Ich hab\'s n\'t.', english: 'Reduced' }
        ]
      },
      {
        id: 'b2-p7', title: 'Poetic & Rhetorical Devices',
        content: `**Alliteration:**
- Kind und Kegel (all and sundry)
- mit Müh und Not (with great difficulty)

**Rhyme:**
- Übung macht den Meister. (Practice makes perfect.)
- Ende gut, alles gut. (All\'s well that ends well.)

**Rhythm in proverbs:**
- Wer nicht wagt, der nicht gewinnt.
- In der Kürze liegt die Würze.

**Practice:** Read poetry and proverbs aloud for rhythm!`,
        examples: [
          { german: 'Morgenstund hat Gold im Mund.', english: 'Rhyming proverb' }
        ]
      },
      {
        id: 'b2-p8', title: 'Pronunciation Troubleshooting',
        content: `**Common mistakes by English speakers:**

1. **"w" pronounced as English "w"** → Should be [v]
2. **"z" as English "z"** → Should be [ts]
3. **"v" as English "v"** → Usually [f] in German
4. **Missing umlauts** → Practice rounded vowels
5. **English "th"** → German has no "th", use "s" or "z"
6. **Stress on wrong syllable** → Usually first syllable!

**Fix:** Record yourself, compare with natives, practice daily!`,
        examples: [
          { german: 'Practice: Wasser, Zeit, Vater', english: 'W=V, Z=TS, V=F' }
        ]
      }
    ]
  },
  everyday: {
    A2: [
      {
        id: 'a2-e1', title: 'At the Supermarket',
        scenario: 'Shopping for groceries',
        dialogue: [
          { speaker: 'Kunde', german: 'Entschuldigung, wo finde ich die Milch?', english: 'Excuse me, where can I find the milk?' },
          { speaker: 'Verkäufer', german: 'Die Milch ist im Kühlregal, hinten links.', english: 'The milk is in the refrigerated section, back left.' },
          { speaker: 'Kunde', german: 'Danke. Und wo sind die Eier?', english: 'Thanks. And where are the eggs?' },
          { speaker: 'Verkäufer', german: 'Die Eier sind neben der Milch.', english: 'The eggs are next to the milk.' },
          { speaker: 'Kunde', german: 'Ich hätte gern diese Wurst, bitte.', english: 'I would like this sausage, please.' },
          { speaker: 'Verkäufer', german: 'Wie viel darf es sein?', english: 'How much would you like?' },
          { speaker: 'Kunde', german: '200 Gramm, bitte.', english: '200 grams, please.' },
          { speaker: 'Verkäufer', german: 'Das macht dann 12 Euro.', english: 'That will be 12 euros.' }
        ],
        vocabulary: ['die Milch (milk)', 'die Eier (eggs)', 'die Wurst (sausage)', 'das Kühlregal (refrigerated shelf)', 'Gramm (gram)']
      },
      {
        id: 'a2-e2', title: 'At the Doctor',
        scenario: 'Making an appointment and describing symptoms',
        dialogue: [
          { speaker: 'Patient', german: 'Guten Tag, ich möchte einen Termin vereinbaren.', english: 'Good day, I would like to make an appointment.' },
          { speaker: 'Sprechstundenhilfe', german: 'Was ist denn das Problem?', english: 'What is the problem?' },
          { speaker: 'Patient', german: 'Ich habe Kopfschmerzen und Fieber.', english: 'I have a headache and fever.' },
          { speaker: 'Sprechstundenhilfe', german: 'Können Sie morgen um 10 Uhr kommen?', english: 'Can you come tomorrow at 10 o\'clock?' },
          { speaker: 'Patient', german: 'Ja, das passt. Danke.', english: 'Yes, that works. Thank you.' },
          { speaker: 'Arzt', german: 'Was fehlt Ihnen?', english: 'What\'s wrong?' },
          { speaker: 'Patient', german: 'Mir ist schwindelig und ich bin müde.', english: 'I am dizzy and I am tired.' },
          { speaker: 'Arzt', german: 'Ich verschreibe Ihnen Medikamente.', english: 'I will prescribe you medication.' }
        ],
        vocabulary: ['der Termin (appointment)', 'die Kopfschmerzen (headache)', 'das Fieber (fever)', 'schwindelig (dizzy)', 'die Medikamente (medication)']
      },
      {
        id: 'a2-e3', title: 'On Public Transport',
        scenario: 'Buying a ticket and asking for directions',
        dialogue: [
          { speaker: 'Fahrgast', german: 'Eine Fahrkarte nach Berlin, bitte.', english: 'One ticket to Berlin, please.' },
          { speaker: 'Verkäufer', german: 'Einfach oder hin und zurück?', english: 'One-way or round-trip?' },
          { speaker: 'Fahrgast', german: 'Hin und zurück, bitte.', english: 'Round-trip, please.' },
          { speaker: 'Verkäufer', german: 'Das kostet 45 Euro.', english: 'That costs 45 euros.' },
          { speaker: 'Fahrgast', german: 'Von welchem Gleis fährt der Zug?', english: 'From which platform does the train leave?' },
          { speaker: 'Verkäufer', german: 'Gleis 7, in 20 Minuten.', english: 'Platform 7, in 20 minutes.' },
          { speaker: 'Fahrgast', german: 'Muss ich umsteigen?', english: 'Do I have to transfer?' },
          { speaker: 'Verkäufer', german: 'Nein, es ist ein direkter Zug.', english: 'No, it\'s a direct train.' }
        ],
        vocabulary: ['die Fahrkarte (ticket)', 'einfach (one-way)', 'hin und zurück (round-trip)', 'das Gleis (platform)', 'umsteigen (to transfer)']
      },
      {
        id: 'a2-e4', title: 'At a Restaurant',
        scenario: 'Ordering food and drinks',
        dialogue: [
          { speaker: 'Kellner', german: 'Guten Abend, haben Sie reserviert?', english: 'Good evening, do you have a reservation?' },
          { speaker: 'Gast', german: 'Nein, haben Sie einen Tisch für zwei?', english: 'No, do you have a table for two?' },
          { speaker: 'Kellner', german: 'Ja, bitte folgen Sie mir.', english: 'Yes, please follow me.' },
          { speaker: 'Kellner', german: 'Was möchten Sie trinken?', english: 'What would you like to drink?' },
          { speaker: 'Gast', german: 'Ich hätte gern ein Glas Wein.', english: 'I would like a glass of wine.' },
          { speaker: 'Kellner', german: 'Und zu essen?', english: 'And to eat?' },
          { speaker: 'Gast', german: 'Die Schnitzel, bitte.', english: 'The schnitzel, please.' },
          { speaker: 'Kellner', german: 'Möchten Sie auch einen Salat?', english: 'Would you also like a salad?' }
        ],
        vocabulary: ['reservieren (to reserve)', 'der Tisch (table)', 'der Wein (wine)', 'das Schnitzel (schnitzel)', 'der Salat (salad)']
      },
      {
        id: 'a2-e5', title: 'Small Talk - Introducing Yourself',
        scenario: 'Meeting someone new',
        dialogue: [
          { speaker: 'Anna', german: 'Hallo, ich bin Anna. Und du?', english: 'Hello, I am Anna. And you?' },
          { speaker: 'Max', german: 'Ich heiße Max. Freut mich!', english: 'My name is Max. Nice to meet you!' },
          { speaker: 'Anna', german: 'Freut mich auch. Woher kommst du?', english: 'Nice to meet you too. Where are you from?' },
          { speaker: 'Max', german: 'Ich komme aus München. Und du?', english: 'I am from Munich. And you?' },
          { speaker: 'Anna', german: 'Ich wohne in Hamburg.', english: 'I live in Hamburg.' },
          { speaker: 'Max', german: 'Was machst du beruflich?', english: 'What do you do for work?' },
          { speaker: 'Anna', german: 'Ich bin Lehrerin. Und du?', english: 'I am a teacher. And you?' },
          { speaker: 'Max', german: 'Ich studiere noch.', english: 'I am still studying.' }
        ],
        vocabulary: ['sich freuen (to be pleased)', 'woher (from where)', 'beruflich (professionally)', 'studieren (to study)', 'wohnen (to live)']
      },
      {
        id: 'a2-e6', title: 'At the Post Office',
        scenario: 'Sending a package',
        dialogue: [
          { speaker: 'Kunde', german: 'Ich möchte dieses Paket nach Uganda schicken.', english: 'I would like to send this package to Uganda.' },
          { speaker: 'Beamter', german: 'Was ist im Paket?', english: 'What is in the package?' },
          { speaker: 'Kunde', german: 'Nur Bücher und Kleidung.', english: 'Only books and clothing.' },
          { speaker: 'Beamter', german: 'Wie schwer ist das Paket?', english: 'How heavy is the package?' },
          { speaker: 'Kunde', german: 'Ungefähr 2 Kilogramm.', english: 'Approximately 2 kilograms.' },
          { speaker: 'Beamter', german: 'Das kostet 35 Euro.', english: 'That costs 35 euros.' },
          { speaker: 'Kunde', german: 'Wie lange dauert es?', english: 'How long does it take?' },
          { speaker: 'Beamter', german: 'Etwa 10 Werktage.', english: 'About 10 business days.' }
        ],
        vocabulary: ['das Paket (package)', 'schicken (to send)', 'schwer (heavy)', 'die Kleidung (clothing)', 'die Werktage (business days)']
      },
      {
        id: 'a2-e7', title: 'Asking for Directions',
        scenario: 'Lost in the city',
        dialogue: [
          { speaker: 'Tourist', german: 'Entschuldigung, ich habe mich verlaufen.', english: 'Excuse me, I am lost.' },
          { speaker: 'Einwohner', german: 'Kann ich Ihnen helfen?', english: 'Can I help you?' },
          { speaker: 'Tourist', german: 'Wo ist der Hauptbahnhof?', english: 'Where is the main train station?' },
          { speaker: 'Einwohner', german: 'Gehen Sie geradeaus bis zur Ampel.', english: 'Go straight ahead to the traffic light.' },
          { speaker: 'Tourist', german: 'Und dann?', english: 'And then?' },
          { speaker: 'Einwohner', german: 'Dann links abbiegen.', english: 'Then turn left.' },
          { speaker: 'Tourist', german: 'Ist es weit?', english: 'Is it far?' },
          { speaker: 'Einwohner', german: 'Nein, nur 5 Minuten zu Fuß.', english: 'No, only 5 minutes on foot.' }
        ],
        vocabulary: ['sich verlaufen (to get lost)', 'der Hauptbahnhof (main station)', 'geradeaus (straight ahead)', 'die Ampel (traffic light)', 'abbiegen (to turn)']
      }
    ],
    B1: [
      {
        id: 'b1-e1', title: 'At the Bank',
        scenario: 'Opening an account',
        dialogue: [
          { speaker: 'Kunde', german: 'Guten Tag, ich möchte ein Konto eröffnen.', english: 'Good day, I would like to open an account.' },
          { speaker: 'Berater', german: 'Welches Konto interessiert Sie?', english: 'Which account interests you?' },
          { speaker: 'Kunde', german: 'Ein Girokonto für den täglichen Gebrauch.', english: 'A checking account for daily use.' },
          { speaker: 'Berater', german: 'Haben Sie einen Ausweis dabei?', english: 'Do you have an ID with you?' },
          { speaker: 'Kunde', german: 'Ja, hier ist mein Reisepass.', english: 'Yes, here is my passport.' },
          { speaker: 'Berater', german: 'Und eine Meldebescheinigung?', english: 'And a registration certificate?' },
          { speaker: 'Kunde', german: 'Die habe ich leider nicht.', english: 'Unfortunately, I don\'t have that.' },
          { speaker: 'Berater', german: 'Dann brauchen wir noch eine Adresse in Deutschland.', english: 'Then we need an address in Germany.' }
        ],
        vocabulary: ['das Konto (account)', 'eröffnen (to open)', 'das Girokonto (checking account)', 'der Ausweis (ID)', 'die Meldebescheinigung (registration certificate)']
      },
      {
        id: 'b1-e2', title: 'Job Interview',
        scenario: 'Applying for a position',
        dialogue: [
          { speaker: 'Interviewer', german: 'Erzählen Sie uns etwas über sich.', english: 'Tell us something about yourself.' },
          { speaker: 'Bewerber', german: 'Ich habe Informatik studiert und drei Jahre Erfahrung.', english: 'I studied computer science and have three years of experience.' },
          { speaker: 'Interviewer', german: 'Warum möchten Sie bei uns arbeiten?', english: 'Why do you want to work for us?' },
          { speaker: 'Bewerber', german: 'Ihr Unternehmen ist führend in der Branche.', english: 'Your company is a leader in the industry.' },
          { speaker: 'Interviewer', german: 'Was sind Ihre Stärken?', english: 'What are your strengths?' },
          { speaker: 'Bewerber', german: 'Ich bin teamfähig und lösungsorientiert.', english: 'I am a team player and solution-oriented.' },
          { speaker: 'Interviewer', german: 'Haben Sie Fragen an uns?', english: 'Do you have questions for us?' },
          { speaker: 'Bewerber', german: 'Wie sieht ein typischer Arbeitstag aus?', english: 'What does a typical workday look like?' }
        ],
        vocabulary: ['das Vorstellungsgespräch (job interview)', 'die Erfahrung (experience)', 'führend (leading)', 'die Stärken (strengths)', 'teamfähig (team-oriented)']
      },
      {
        id: 'b1-e3', title: 'At the Housing Office',
        scenario: 'Looking for an apartment',
        dialogue: [
          { speaker: 'Mieter', german: 'Ich suche eine Wohnung in der Stadtmitte.', english: 'I am looking for an apartment in the city center.' },
          { speaker: 'Makler', german: 'Wie groß soll die Wohnung sein?', english: 'How big should the apartment be?' },
          { speaker: 'Mieter', german: 'Ungefähr 60 Quadratmeter.', english: 'Approximately 60 square meters.' },
          { speaker: 'Makler', german: 'Wie viel möchten Sie zahlen?', english: 'How much would you like to pay?' },
          { speaker: 'Mieter', german: 'Maximal 800 Euro kalt.', english: 'Maximum 800 euros cold rent.' },
          { speaker: 'Makler', german: 'Haben Sie Haustiere?', english: 'Do you have pets?' },
          { speaker: 'Mieter', german: 'Nein, aber ich würde gerne eine Katze halten.', english: 'No, but I would like to have a cat.' },
          { speaker: 'Makler', german: 'Dann zeige ich Ihnen diese Wohnung.', english: 'Then I will show you this apartment.' }
        ],
        vocabulary: ['die Wohnung (apartment)', 'der Makler (realtor)', 'die Quadratmeter (square meters)', 'die Miete (rent)', 'die Haustiere (pets)']
      },
      {
        id: 'b1-e4', title: 'Phone Call - Making an Appointment',
        scenario: 'Calling to schedule a meeting',
        dialogue: [
          { speaker: 'Anrufer', german: 'Guten Tag, hier ist Schmidt von der Firma Müller.', english: 'Good day, this is Schmidt from Müller Company.' },
          { speaker: 'Empfänger', german: 'Guten Tag, wie kann ich Ihnen helfen?', english: 'Good day, how can I help you?' },
          { speaker: 'Anrufer', german: 'Ich möchte einen Termin mit Herrn Weber vereinbaren.', english: 'I would like to make an appointment with Mr. Weber.' },
          { speaker: 'Empfänger', german: 'Wann würde es Ihnen passen?', english: 'When would suit you?' },
          { speaker: 'Anrufer', german: 'Nächste Woche Dienstag oder Mittwoch.', english: 'Next week Tuesday or Wednesday.' },
          { speaker: 'Empfänger', german: 'Dienstag um 14 Uhr wäre möglich.', english: 'Tuesday at 2 PM would be possible.' },
          { speaker: 'Anrufer', german: 'Das passt mir gut.', english: 'That works well for me.' },
          { speaker: 'Empfänger', german: 'Ich trage Sie ein. Auf Wiederhören!', english: 'I\'ll put you down. Goodbye!' }
        ],
        vocabulary: ['vereinbaren (to arrange)', 'passen (to suit)', 'möglich (possible)', 'eintragen (to register)', 'Auf Wiederhören (goodbye on phone)']
      },
      {
        id: 'b1-e5', title: 'At the Gym',
        scenario: 'Signing up for membership',
        dialogue: [
          { speaker: 'Interessent', german: 'Ich möchte Mitglied in Ihrem Fitnessstudio werden.', english: 'I would like to become a member of your gym.' },
          { speaker: 'Mitarbeiter', german: 'Welche Mitgliedschaft möchten Sie?', english: 'Which membership would you like?' },
          { speaker: 'Interessent', german: 'Was ist der Unterschied?', english: 'What is the difference?' },
          { speaker: 'Mitarbeiter', german: 'Basis ist 30 Euro, Premium ist 50 Euro mit Kursen.', english: 'Basic is 30 euros, Premium is 50 euros with classes.' },
          { speaker: 'Interessent', german: 'Gibt es eine Vertragslaufzeit?', english: 'Is there a contract term?' },
          { speaker: 'Mitarbeiter', german: 'Mindestens 12 Monate.', english: 'At least 12 months.' },
          { speaker: 'Interessent', german: 'Kann ich zuerst eine Probetraining machen?', english: 'Can I do a trial training first?' },
          { speaker: 'Mitarbeiter', german: 'Ja, das ist kostenlos.', english: 'Yes, that is free.' }
        ],
        vocabulary: ['das Fitnessstudio (gym)', 'die Mitgliedschaft (membership)', 'die Vertragslaufzeit (contract term)', 'das Probetraining (trial training)', 'kostenlos (free)']
      },
      {
        id: 'b1-e6', title: 'Complaining at a Store',
        scenario: 'Returning a defective product',
        dialogue: [
          { speaker: 'Kunde', german: 'Ich möchte diese Ware umtauschen.', english: 'I would like to exchange this item.' },
          { speaker: 'Verkäufer', german: 'Was ist das Problem?', english: 'What is the problem?' },
          { speaker: 'Kunde', german: 'Das Gerät funktioniert nicht richtig.', english: 'The device doesn\'t work properly.' },
          { speaker: 'Verkäufer', german: 'Haben Sie den Kassenbon?', english: 'Do you have the receipt?' },
          { speaker: 'Kunde', german: 'Ja, hier ist er.', english: 'Yes, here it is.' },
          { speaker: 'Verkäufer', german: 'Wann haben Sie es gekauft?', english: 'When did you buy it?' },
          { speaker: 'Kunde', german: 'Vor einer Woche.', english: 'A week ago.' },
          { speaker: 'Verkäufer', german: 'Dann können wir es umtauschen oder das Geld zurückgeben.', english: 'Then we can exchange it or refund the money.' }
        ],
        vocabulary: ['umtauschen (to exchange)', 'das Gerät (device)', 'funktionieren (to function)', 'der Kassenbon (receipt)', 'zurückgeben (to return/refund)']
      },
      {
        id: 'b1-e7', title: 'University Registration',
        scenario: 'Enrolling at university',
        dialogue: [
          { speaker: 'Student', german: 'Ich möchte mich für das Sommersemester einschreiben.', english: 'I would like to enroll for the summer semester.' },
          { speaker: 'Beamter', german: 'Haben Sie alle Unterlagen dabei?', english: 'Do you have all the documents with you?' },
          { speaker: 'Student', german: 'Ich glaube schon. Was brauchen Sie?', english: 'I think so. What do you need?' },
          { speaker: 'Beamter', german: 'Zeugnis, Ausweis und Anmeldebestätigung.', english: 'Transcript, ID, and registration confirmation.' },
          { speaker: 'Student', german: 'Hier bitte.', english: 'Here you go.' },
          { speaker: 'Beamter', german: 'Das sieht gut aus. Möchten Sie auch den Semesterticket?', english: 'This looks good. Do you also want the semester ticket?' },
          { speaker: 'Student', german: 'Ja, unbedingt.', english: 'Yes, definitely.' },
          { speaker: 'Beamter', german: 'Dann sind es 250 Euro für das Semester.', english: 'Then it is 250 euros for the semester.' }
        ],
        vocabulary: ['sich einschreiben (to enroll)', 'das Semester (semester)', 'die Unterlagen (documents)', 'das Zeugnis (transcript)', 'die Anmeldebestätigung (registration confirmation)']
      },
      {
        id: 'b1-e8', title: 'Discussing Weekend Plans',
        scenario: 'Making plans with friends',
        dialogue: [
          { speaker: 'Lisa', german: 'Was machst du am Wochenende?', english: 'What are you doing on the weekend?' },
          { speaker: 'Tom', german: 'Noch nichts. Hast du eine Idee?', english: 'Nothing yet. Do you have an idea?' },
          { speaker: 'Lisa', german: 'Wollen wir wandern gehen?', english: 'Do we want to go hiking?' },
          { speaker: 'Tom', german: 'Gute Idee! Wohin sollen wir fahren?', english: 'Good idea! Where should we go?' },
          { speaker: 'Lisa', german: 'In den Schwarzwald. Die Aussicht ist toll.', english: 'To the Black Forest. The view is great.' },
          { speaker: 'Tom', german: 'Sollen wir Samstag früh losfahren?', english: 'Should we leave early Saturday?' },
          { speaker: 'Lisa', german: 'Ja, dann haben wir den ganzen Tag.', english: 'Yes, then we have the whole day.' },
          { speaker: 'Tom', german: 'Ich hole dich um 8 Uhr ab.', english: 'I\'ll pick you up at 8 o\'clock.' }
        ],
        vocabulary: ['das Wochenende (weekend)', 'wandern (to hike)', 'die Aussicht (view)', 'losfahren (to depart)', 'abholen (to pick up)']
      }
    ],
    B2: [
      {
        id: 'b2-e1', title: 'Business Meeting',
        scenario: 'Discussing a project proposal',
        dialogue: [
          { speaker: 'Chef', german: 'Lassen Sie uns über das neue Projekt sprechen.', english: 'Let\'s talk about the new project.' },
          { speaker: 'Mitarbeiter', german: 'Gerne. Ich habe die Unterlagen vorbereitet.', english: 'Gladly. I have prepared the documents.' },
          { speaker: 'Chef', german: 'Was sind die wichtigsten Punkte?', english: 'What are the most important points?' },
          { speaker: 'Mitarbeiter', german: 'Zunächst müssen wir das Budget klären.', english: 'First, we need to clarify the budget.' },
          { speaker: 'Chef', german: 'Wie hoch sind die geschätzten Kosten?', english: 'How high are the estimated costs?' },
          { speaker: 'Mitarbeiter', german: 'Etwa 50.000 Euro für die erste Phase.', english: 'Approximately 50,000 euros for the first phase.' },
          { speaker: 'Chef', german: 'Das ist mehr als erwartet.', english: 'That is more than expected.' },
          { speaker: 'Mitarbeiter', german: 'Aber die Investition wird sich langfristig auszahlen.', english: 'But the investment will pay off in the long term.' }
        ],
        vocabulary: ['das Projekt (project)', 'die Unterlagen (documents)', 'das Budget (budget)', 'die Kosten (costs)', 'sich auszahlen (to pay off)']
      },
      {
        id: 'b2-e2', title: 'Legal Consultation',
        scenario: 'Discussing a contract',
        dialogue: [
          { speaker: 'Mandant', german: 'Ich brauche Ihre Hilfe bei diesem Vertrag.', english: 'I need your help with this contract.' },
          { speaker: 'Anwalt', german: 'Was genau möchten Sie wissen?', english: 'What exactly would you like to know?' },
          { speaker: 'Mandant', german: 'Die Klausel zur Haftung ist unklar.', english: 'The liability clause is unclear.' },
          { speaker: 'Anwalt', german: 'Lassen Sie mich das prüfen.', english: 'Let me check that.' },
          { speaker: 'Mandant', german: 'Könnte das problematisch werden?', english: 'Could that become problematic?' },
          { speaker: 'Anwalt', german: 'Unter bestimmten Umständen, ja.', english: 'Under certain circumstances, yes.' },
          { speaker: 'Mandant', german: 'Was empfehlen Sie?', english: 'What do you recommend?' },
          { speaker: 'Anwalt', german: 'Wir sollten eine Änderung vorschlagen.', english: 'We should propose an amendment.' }
        ],
        vocabulary: ['der Vertrag (contract)', 'die Klausel (clause)', 'die Haftung (liability)', 'prüfen (to examine)', 'die Änderung (amendment)']
      },
      {
        id: 'b2-e3', title: 'Academic Discussion',
        scenario: 'Debating research methodology',
        dialogue: [
          { speaker: 'Professor', german: 'Ihre Methodik ist interessant.', english: 'Your methodology is interesting.' },
          { speaker: 'Student', german: 'Danke. Ich habe einen qualitativen Ansatz gewählt.', english: 'Thank you. I chose a qualitative approach.' },
          { speaker: 'Professor', german: 'Warum nicht quantitativ?', english: 'Why not quantitative?' },
          { speaker: 'Student', german: 'Die Forschungsfrage erfordert tiefere Einblicke.', english: 'The research question requires deeper insights.' },
          { speaker: 'Professor', german: 'Wie groß ist Ihre Stichprobe?', english: 'How large is your sample?' },
          { speaker: 'Student', german: '15 Interviews sind geplant.', english: '15 interviews are planned.' },
          { speaker: 'Professor', german: 'Das könnte für eine Verallgemeinerung zu wenig sein.', english: 'That might be too little for generalization.' },
          { speaker: 'Student', german: 'Das ist mir bewusst, aber es geht um Tiefe, nicht Breite.', english: 'I am aware of that, but it is about depth, not breadth.' }
        ],
        vocabulary: ['die Methodik (methodology)', 'der Ansatz (approach)', 'die Forschungsfrage (research question)', 'die Stichprobe (sample)', 'die Verallgemeinerung (generalization)']
      },
      {
        id: 'b2-e4', title: 'Negotiating Salary',
        scenario: 'Performance review discussion',
        dialogue: [
          { speaker: 'Mitarbeiter', german: 'Ich möchte über meine Gehaltsentwicklung sprechen.', english: 'I would like to talk about my salary development.' },
          { speaker: 'Chef', german: 'Gerne. Was sind Ihre Erwartungen?', english: 'Gladly. What are your expectations?' },
          { speaker: 'Mitarbeiter', german: 'Angesichts meiner Leistungen halte ich 10% für angemessen.', english: 'Given my performance, I consider 10% appropriate.' },
          { speaker: 'Chef', german: 'Das ist über dem üblichen Rahmen.', english: 'That is above the usual range.' },
          { speaker: 'Mitarbeiter', german: 'Ich habe drei große Projekte erfolgreich abgeschlossen.', english: 'I have successfully completed three major projects.' },
          { speaker: 'Chef', german: 'Das stimmt. Aber das Budget ist begrenzt.', english: 'That is true. But the budget is limited.' },
          { speaker: 'Mitarbeiter', german: 'Könnten wir andere Vorteile vereinbaren?', english: 'Could we agree on other benefits?' },
          { speaker: 'Chef', german: 'Mehr Urlaubstage wären möglich.', english: 'More vacation days would be possible.' }
        ],
        vocabulary: ['die Gehaltsentwicklung (salary development)', 'die Leistungen (achievements)', 'angemessen (appropriate)', 'der Rahmen (range)', 'die Vorteile (benefits)']
      },
      {
        id: 'b2-e5', title: 'Medical Emergency',
        scenario: 'Describing symptoms urgently',
        dialogue: [
          { speaker: 'Patient', german: 'Ich brauche sofort Hilfe!', english: 'I need help immediately!' },
          { speaker: 'Arzt', german: 'Was ist passiert?', english: 'What happened?' },
          { speaker: 'Patient', german: 'Ich habe plötzlich starke Brustschmerzen.', english: 'I suddenly have severe chest pain.' },
          { speaker: 'Arzt', german: 'Strahlt der Schmerz aus?', english: 'Does the pain radiate?' },
          { speaker: 'Patient', german: 'Ja, in den linken Arm.', english: 'Yes, into the left arm.' },
          { speaker: 'Arzt', german: 'Sind Sie kurzatmig?', english: 'Are you short of breath?' },
          { speaker: 'Patient', german: 'Ja, und mir ist übel.', english: 'Yes, and I feel nauseous.' },
          { speaker: 'Arzt', german: 'Wir müssen Sie sofort ins Krankenhaus bringen.', english: 'We need to take you to the hospital immediately.' }
        ],
        vocabulary: ['die Brustschmerzen (chest pain)', 'ausstrahlen (to radiate)', 'kurzatmig (short of breath)', 'übel (nauseous)', 'das Krankenhaus (hospital)']
      },
      {
        id: 'b2-e6', title: 'Giving a Presentation',
        scenario: 'Presenting quarterly results',
        dialogue: [
          { speaker: 'Presenter', german: 'Guten Tag, ich stelle Ihnen unsere Quartalszahlen vor.', english: 'Good day, I will present our quarterly figures to you.' },
          { speaker: 'Presenter', german: 'Der Umsatz ist um 15% gestiegen.', english: 'Revenue has increased by 15%.' },
          { speaker: 'Presenter', german: 'Besonders erfolgreich war unser neues Produkt.', english: 'Our new product was particularly successful.' },
          { speaker: 'Zuhörer', german: 'Wie sieht die Prognose aus?', english: 'What does the forecast look like?' },
          { speaker: 'Presenter', german: 'Wir erwarten weiteres Wachstum.', english: 'We expect further growth.' },
          { speaker: 'Zuhörer', german: 'Gibt es Risiken?', english: 'Are there risks?' },
          { speaker: 'Presenter', german: 'Die Marktlage bleibt unsicher.', english: 'The market situation remains uncertain.' },
          { speaker: 'Presenter', german: 'Aber wir sind gut positioniert.', english: 'But we are well positioned.' }
        ],
        vocabulary: ['vorstellen (to present)', 'der Umsatz (revenue)', 'steigen (to increase)', 'die Prognose (forecast)', 'positioniert (positioned)']
      },
      {
        id: 'b2-e7', title: 'Resolving Conflict',
        scenario: 'Mediating a disagreement',
        dialogue: [
          { speaker: 'Mediator', german: 'Lassen Sie uns die Situation besprechen.', english: 'Let\'s discuss the situation.' },
          { speaker: 'Partei A', german: 'Ich fühle mich nicht gehört.', english: 'I feel unheard.' },
          { speaker: 'Partei B', german: 'Das war nicht meine Absicht.', english: 'That was not my intention.' },
          { speaker: 'Mediator', german: 'Was brauchen Sie, um weiterzuarbeiten?', english: 'What do you need to continue working?' },
          { speaker: 'Partei A', german: 'Mehr Kommunikation und Transparenz.', english: 'More communication and transparency.' },
          { speaker: 'Partei B', german: 'Das kann ich anbieten.', english: 'I can offer that.' },
          { speaker: 'Mediator', german: 'Können wir uns darauf einigen?', english: 'Can we agree on that?' },
          { speaker: 'Both', german: 'Ja, das ist akzeptabel.', english: 'Yes, that is acceptable.' }
        ],
        vocabulary: ['die Situation (situation)', 'gehört (heard)', 'die Absicht (intention)', 'die Transparenz (transparency)', 'sich einigen (to agree)']
      },
      {
        id: 'b2-e8', title: 'Discussing Current Events',
        scenario: 'Talking about news',
        dialogue: [
          { speaker: 'Anna', german: 'Hast du die Nachrichten heute gesehen?', english: 'Did you see the news today?' },
          { speaker: 'Max', german: 'Ja, die politische Lage ist angespannt.', english: 'Yes, the political situation is tense.' },
          { speaker: 'Anna', german: 'Was hältst du von den neuen Gesetzen?', english: 'What do you think of the new laws?' },
          { speaker: 'Max', german: 'Sie sind umstritten, aber notwendig.', english: 'They are controversial but necessary.' },
          { speaker: 'Anna', german: 'Die Opposition kritisiert sie stark.', english: 'The opposition criticizes them strongly.' },
          { speaker: 'Max', german: 'Das ist Teil des demokratischen Prozesses.', english: 'That is part of the democratic process.' },
          { speaker: 'Anna', german: 'Hoffentlich finden sie einen Kompromiss.', english: 'Hopefully they will find a compromise.' },
          { speaker: 'Max', german: 'Das wird schwierig, aber nicht unmöglich.', english: 'That will be difficult, but not impossible.' }
        ],
        vocabulary: ['die Nachrichten (news)', 'angespannt (tense)', 'umstritten (controversial)', 'die Opposition (opposition)', 'der Kompromiss (compromise)']
      }
    ]
  }
};

// Export grammar exercises for use in grammatik.html
window.grammarExercises = GRAMMAR_EXERCISES;

const LEVELS = ['A2', 'B1', 'B2'];
const SECTIONS = [
  { id: 'grammar', name: 'Grammar', icon: '📚' },
  { id: 'vocabulary', name: 'Vocabulary', icon: '🔤' },
  { id: 'pronunciation', name: 'Pronunciation', icon: '🗣️' },
  { id: 'everyday', name: 'Everyday German', icon: '🌍' }
];

// Flatten vocabulary for quiz and glossary use
const vocabulary = LESSON_DATA.vocabulary.flatMap((level, levelIdx) => {
  const levelName = ['A2', 'B1', 'B2'][levelIdx];
  return level.flatMap(category => 
    category.words.map(word => ({
      id: word.german.toLowerCase().replace(/\s+/g, '-'),
      german: word.german,
      translation: word.english,
      article: word.german.match(/^(der|die|das)/i)?.[1] || '',
      level: levelName,
      category: category.title.split(' ')[0] // First word of category title
    }))
  );
});

// Glossary terms - using the 123 core vocabulary words
const glossaryTerms = vocabulary.slice(0, 123);

// Export for use in other files
window.vocabulary = vocabulary;
window.glossaryTerms = glossaryTerms;