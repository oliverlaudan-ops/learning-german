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
  vocabulary: {
    A2: [
      {
        id: 'a2-v1', title: 'Family & Relationships',
        words: [
          { german: 'die Familie', english: 'family' },
          { german: 'die Eltern', english: 'parents' },
          { german: 'der Vater', english: 'father' },
          { german: 'die Mutter', english: 'mother' },
          { german: 'der Bruder', english: 'brother' },
          { german: 'die Schwester', english: 'sister' },
          { german: 'die Großeltern', english: 'grandparents' },
          { german: 'der Onkel', english: 'uncle' },
          { german: 'die Tante', english: 'aunt' },
          { german: 'der Cousin', english: 'cousin (male)' },
          { german: 'die Cousine', english: 'cousin (female)' },
          { german: 'die Kinder', english: 'children' },
          { german: 'der Sohn', english: 'son' },
          { german: 'die Tochter', english: 'daughter' }
        ]
      },
      {
        id: 'a2-v2', title: 'Food & Drinks',
        words: [
          { german: 'das Essen', english: 'food' },
          { german: 'das Frühstück', english: 'breakfast' },
          { german: 'das Mittagessen', english: 'lunch' },
          { german: 'das Abendessen', english: 'dinner' },
          { german: 'das Brot', english: 'bread' },
          { german: 'der Käse', english: 'cheese' },
          { german: 'die Milch', english: 'milk' },
          { german: 'das Wasser', english: 'water' },
          { german: 'der Kaffee', english: 'coffee' },
          { german: 'der Tee', english: 'tea' },
          { german: 'das Fleisch', english: 'meat' },
          { german: 'der Fisch', english: 'fish' },
          { german: 'das Gemüse', english: 'vegetables' },
          { german: 'das Obst', english: 'fruit' },
          { german: 'der Apfel', english: 'apple' }
        ]
      },
      {
        id: 'a2-v3', title: 'Daily Routine',
        words: [
          { german: 'aufstehen', english: 'to get up' },
          { german: 'sich waschen', english: 'to wash oneself' },
          { german: 'frühstücken', english: 'to have breakfast' },
          { german: 'arbeiten', english: 'to work' },
          { german: 'lernen', english: 'to study' },
          { german: 'essen', english: 'to eat' },
          { german: 'schlafen', english: 'to sleep' },
          { german: 'einkaufen', english: 'to shop' },
          { german: 'kochen', english: 'to cook' },
          { german: 'fernsehen', english: 'to watch TV' },
          { german: 'lesen', english: 'to read' },
          { german: 'musizieren', english: 'to make music' },
          { german: 'spazieren gehen', english: 'to go for a walk' },
          { german: 'sich ausruhen', english: 'to rest' }
        ]
      },
      {
        id: 'a2-v4', title: 'City & Places',
        words: [
          { german: 'die Stadt', english: 'city' },
          { german: 'das Dorf', english: 'village' },
          { german: 'die Straße', english: 'street' },
          { german: 'der Platz', english: 'square' },
          { german: 'die Schule', english: 'school' },
          { german: 'die Universität', english: 'university' },
          { german: 'das Krankenhaus', english: 'hospital' },
          { german: 'die Apotheke', english: 'pharmacy' },
          { german: 'der Supermarkt', english: 'supermarket' },
          { german: 'die Bank', english: 'bank' },
          { german: 'die Post', english: 'post office' },
          { german: 'das Restaurant', english: 'restaurant' },
          { german: 'das Café', english: 'café' },
          { german: 'der Bahnhof', english: 'train station' },
          { german: 'die Haltestelle', english: 'bus stop' }
        ]
      },
      {
        id: 'a2-v5', title: 'Weather & Seasons',
        words: [
          { german: 'das Wetter', english: 'weather' },
          { german: 'die Sonne', english: 'sun' },
          { german: 'der Regen', english: 'rain' },
          { german: 'der Schnee', english: 'snow' },
          { german: 'der Wind', english: 'wind' },
          { german: 'die Wolke', english: 'cloud' },
          { german: 'warm', english: 'warm' },
          { german: 'kalt', english: 'cold' },
          { german: 'heiß', english: 'hot' },
          { german: 'der Frühling', english: 'spring' },
          { german: 'der Sommer', english: 'summer' },
          { german: 'der Herbst', english: 'autumn' },
          { german: 'der Winter', english: 'winter' },
          { german: 'es regnet', english: 'it is raining' },
          { german: 'es schneit', english: 'it is snowing' }
        ]
      },
      {
        id: 'a2-v6', title: 'Clothing',
        words: [
          { german: 'die Kleidung', english: 'clothing' },
          { german: 'das Hemd', english: 'shirt' },
          { german: 'die Hose', english: 'pants' },
          { german: 'das Kleid', english: 'dress' },
          { german: 'der Rock', english: 'skirt' },
          { german: 'die Jacke', english: 'jacket' },
          { german: 'der Mantel', english: 'coat' },
          { german: 'die Schuhe', english: 'shoes' },
          { german: 'die Socken', english: 'socks' },
          { german: 'die Mütze', english: 'cap' },
          { german: 'der Hut', english: 'hat' },
          { german: 'die Handschuhe', english: 'gloves' },
          { german: 'der Schal', english: 'scarf' },
          { german: 'anhaben', english: 'to wear' },
          { german: 'ausziehen', english: 'to take off' }
        ]
      },
      {
        id: 'a2-v7', title: 'Numbers & Time',
        words: [
          { german: 'eins, zwei, drei', english: 'one, two, three' },
          { german: 'vier, fünf, sechs', english: 'four, five, six' },
          { german: 'sieben, acht, neun', english: 'seven, eight, nine' },
          { german: 'zehn, elf, zwölf', english: 'ten, eleven, twelve' },
          { german: 'zwanzig', english: 'twenty' },
          { german: 'dreißig', english: 'thirty' },
          { german: 'fünfzig', english: 'fifty' },
          { german: 'hundert', english: 'hundred' },
          { german: 'die Uhr', english: 'clock/watch' },
          { german: 'die Stunde', english: 'hour' },
          { german: 'die Minute', english: 'minute' },
          { german: 'der Tag', english: 'day' },
          { german: 'die Woche', english: 'week' },
          { german: 'der Monat', english: 'month' },
          { german: 'das Jahr', english: 'year' }
        ]
      }
    ],
    B1: [
      {
        id: 'b1-v1', title: 'Work & Professions',
        words: [
          { german: 'der Beruf', english: 'profession' },
          { german: 'die Arbeit', english: 'work' },
          { german: 'der Arbeitsplatz', english: 'workplace' },
          { german: 'der Kollege', english: 'colleague' },
          { german: 'der Chef', english: 'boss' },
          { german: 'die Bewerbung', english: 'application' },
          { german: 'das Gehalt', english: 'salary' },
          { german: 'der Urlaub', english: 'vacation' },
          { german: 'die Pause', english: 'break' },
          { german: 'der Ingenieur', english: 'engineer' },
          { german: 'die Lehrerin', english: 'teacher (f)' },
          { german: 'der Arzt', english: 'doctor' },
          { german: 'die Krankenschwester', english: 'nurse' },
          { german: 'der Verkäufer', english: 'salesperson' },
          { german: 'die Bürokauffrau', english: 'office clerk (f)' }
        ]
      },
      {
        id: 'b1-v2', title: 'Health & Body',
        words: [
          { german: 'die Gesundheit', english: 'health' },
          { german: 'der Körper', english: 'body' },
          { german: 'der Kopf', english: 'head' },
          { german: 'der Arm', english: 'arm' },
          { german: 'das Bein', english: 'leg' },
          { german: 'die Hand', english: 'hand' },
          { german: 'der Fuß', english: 'foot' },
          { german: 'das Auge', english: 'eye' },
          { german: 'das Ohr', english: 'ear' },
          { german: 'die Krankheit', english: 'illness' },
          { german: 'die Schmerzen', english: 'pain' },
          { german: 'das Fieber', english: 'fever' },
          { german: 'die Medizin', english: 'medicine' },
          { german: 'die Tablette', english: 'pill' },
          { german: 'gesund', english: 'healthy' }
        ]
      },
      {
        id: 'b1-v3', title: 'Travel & Transport',
        words: [
          { german: 'die Reise', english: 'trip/journey' },
          { german: 'das Flugzeug', english: 'airplane' },
          { german: 'der Zug', english: 'train' },
          { german: 'der Bus', english: 'bus' },
          { german: 'das Auto', english: 'car' },
          { german: 'das Fahrrad', english: 'bicycle' },
          { german: 'das Ticket', english: 'ticket' },
          { german: 'der Flughafen', english: 'airport' },
          { german: 'der Bahnhof', english: 'train station' },
          { german: 'das Hotel', english: 'hotel' },
          { german: 'die Buchung', english: 'booking' },
          { german: 'der Koffer', english: 'suitcase' },
          { german: 'der Pass', english: 'passport' },
          { german: 'das Gepäck', english: 'luggage' },
          { german: 'reisen', english: 'to travel' }
        ]
      },
      {
        id: 'b1-v4', title: 'Media & Technology',
        words: [
          { german: 'die Medien', english: 'media' },
          { german: 'das Internet', english: 'internet' },
          { german: 'der Computer', english: 'computer' },
          { german: 'das Smartphone', english: 'smartphone' },
          { german: 'die App', english: 'app' },
          { german: 'die Website', english: 'website' },
          { german: 'die E-Mail', english: 'email' },
          { german: 'die Nachricht', english: 'message/news' },
          { german: 'das soziale Netzwerk', english: 'social network' },
          { german: 'online', english: 'online' },
          { german: 'herunterladen', english: 'to download' },
          { german: 'hochladen', english: 'to upload' },
          { german: 'die Datei', english: 'file' },
          { german: 'der Bildschirm', english: 'screen' },
          { german: 'die Tastatur', english: 'keyboard' }
        ]
      },
      {
        id: 'b1-v5', title: 'Environment & Nature',
        words: [
          { german: 'die Umwelt', english: 'environment' },
          { german: 'die Natur', english: 'nature' },
          { german: 'der Wald', english: 'forest' },
          { german: 'der Baum', english: 'tree' },
          { german: 'die Blume', english: 'flower' },
          { german: 'das Tier', english: 'animal' },
          { german: 'der Vogel', english: 'bird' },
          { german: 'der Fluss', english: 'river' },
          { german: 'der See', english: 'lake' },
          { german: 'das Meer', english: 'sea' },
          { german: 'der Berg', english: 'mountain' },
          { german: 'die Luft', english: 'air' },
          { german: 'der Müll', english: 'trash' },
          { german: 'recyceln', english: 'to recycle' },
          { german: 'umweltfreundlich', english: 'eco-friendly' }
        ]
      },
      {
        id: 'b1-v6', title: 'Feelings & Emotions',
        words: [
          { german: 'das Gefühl', english: 'feeling' },
          { german: 'die Freude', english: 'joy' },
          { german: 'die Trauer', english: 'sadness' },
          { german: 'die Angst', english: 'fear' },
          { german: 'der Ärger', english: 'anger' },
          { german: 'die Überraschung', english: 'surprise' },
          { german: 'glücklich', english: 'happy' },
          { german: 'traurig', english: 'sad' },
          { german: 'wütend', english: 'angry' },
          { german: 'nervös', english: 'nervous' },
          { german: 'aufgeregt', english: 'excited' },
          { german: 'enttäuscht', english: 'disappointed' },
          { german: 'stolz', english: 'proud' },
          { german: 'müde', english: 'tired' },
          { german: 'gelangweilt', english: 'bored' }
        ]
      },
      {
        id: 'b1-v7', title: 'Education & Learning',
        words: [
          { german: 'die Bildung', english: 'education' },
          { german: 'das Studium', english: 'university studies' },
          { german: 'die Ausbildung', english: 'training/apprenticeship' },
          { german: 'die Prüfung', english: 'exam' },
          { german: 'die Note', english: 'grade' },
          { german: 'das Zeugnis', english: 'certificate/report card' },
          { german: 'der Kurs', english: 'course' },
          { german: 'die Vorlesung', english: 'lecture' },
          { german: 'das Seminar', english: 'seminar' },
          { german: 'die Hausaufgabe', english: 'homework' },
          { german: 'lernen', english: 'to study/learn' },
          { german: 'üben', english: 'to practice' },
          { german: 'bestehen', english: 'to pass' },
          { german: 'durchfallen', english: 'to fail' },
          { german: 'die Sprache', english: 'language' }
        ]
      },
      {
        id: 'b1-v8', title: 'Shopping & Money',
        words: [
          { german: 'das Geld', english: 'money' },
          { german: 'der Euro', english: 'euro' },
          { german: 'der Preis', english: 'price' },
          { german: 'die Rechnung', english: 'bill/invoice' },
          { german: 'die Quittung', english: 'receipt' },
          { german: 'der Rabatt', english: 'discount' },
          { german: 'der Sale', english: 'sale' },
          { german: 'teuer', english: 'expensive' },
          { german: 'billig', english: 'cheap' },
          { german: 'kostenlos', english: 'free' },
          { german: 'bezahlen', english: 'to pay' },
          { german: 'die Kreditkarte', english: 'credit card' },
          { german: 'das Bargeld', english: 'cash' },
          { german: 'die Bank', english: 'bank' },
          { german: 'das Konto', english: 'account' }
        ]
      }
    ],
    B2: [
      {
        id: 'b2-v1', title: 'Politics & Society',
        words: [
          { german: 'die Politik', english: 'politics' },
          { german: 'die Regierung', english: 'government' },
          { german: 'das Parlament', english: 'parliament' },
          { german: 'die Wahl', english: 'election' },
          { german: 'die Partei', english: 'party' },
          { german: 'der Bürger', english: 'citizen' },
          { german: 'die Gesellschaft', english: 'society' },
          { german: 'die Demokratie', english: 'democracy' },
          { german: 'das Gesetz', english: 'law' },
          { german: 'die Freiheit', english: 'freedom' },
          { german: 'die Gerechtigkeit', english: 'justice' },
          { german: 'die Gleichheit', english: 'equality' },
          { german: 'die Menschenrechte', english: 'human rights' },
          { german: 'die Verantwortung', english: 'responsibility' },
          { german: 'wählen', english: 'to vote' }
        ]
      },
      {
        id: 'b2-v2', title: 'Economy & Business',
        words: [
          { german: 'die Wirtschaft', english: 'economy' },
          { german: 'das Unternehmen', english: 'company' },
          { german: 'die Firma', english: 'firm' },
          { german: 'der Markt', english: 'market' },
          { german: 'der Handel', english: 'trade' },
          { german: 'die Investition', english: 'investment' },
          { german: 'der Gewinn', english: 'profit' },
          { german: 'der Verlust', english: 'loss' },
          { german: 'die Steuer', english: 'tax' },
          { german: 'die Versicherung', english: 'insurance' },
          { german: 'der Vertrag', english: 'contract' },
          { german: 'die Konkurrenz', english: 'competition' },
          { german: 'die Nachfrage', english: 'demand' },
          { german: 'das Angebot', english: 'supply/offer' },
          { german: 'wirtschaftlich', english: 'economic' }
        ]
      },
      {
        id: 'b2-v3', title: 'Science & Research',
        words: [
          { german: 'die Wissenschaft', english: 'science' },
          { german: 'die Forschung', english: 'research' },
          { german: 'das Experiment', english: 'experiment' },
          { german: 'die Theorie', english: 'theory' },
          { german: 'die Hypothese', english: 'hypothesis' },
          { german: 'das Ergebnis', english: 'result' },
          { german: 'die Entdeckung', english: 'discovery' },
          { german: 'die Entwicklung', english: 'development' },
          { german: 'die Technologie', english: 'technology' },
          { german: 'die Innovation', english: 'innovation' },
          { german: 'der Forscher', english: 'researcher' },
          { german: 'das Labor', english: 'laboratory' },
          { german: 'studieren', english: 'to study/research' },
          { german: 'experimentieren', english: 'to experiment' },
          { german: 'wissenschaftlich', english: 'scientific' }
        ]
      },
      {
        id: 'b2-v4', title: 'Culture & Arts',
        words: [
          { german: 'die Kultur', english: 'culture' },
          { german: 'die Kunst', english: 'art' },
          { german: 'das Museum', english: 'museum' },
          { german: 'die Galerie', english: 'gallery' },
          { german: 'die Ausstellung', english: 'exhibition' },
          { german: 'das Theater', english: 'theater' },
          { german: 'die Oper', english: 'opera' },
          { german: 'das Konzert', english: 'concert' },
          { german: 'die Musik', english: 'music' },
          { german: 'die Literatur', english: 'literature' },
          { german: 'der Roman', english: 'novel' },
          { german: 'die Dichtung', english: 'poetry' },
          { german: 'der Künstler', english: 'artist' },
          { german: 'das Werk', english: 'work (of art)' },
          { german: 'kreativ', english: 'creative' }
        ]
      },
      {
        id: 'b2-v5', title: 'Abstract Concepts',
        words: [
          { german: 'die Möglichkeit', english: 'possibility' },
          { german: 'die Wahrscheinlichkeit', english: 'probability' },
          { german: 'die Gelegenheit', english: 'opportunity' },
          { german: 'die Erfahrung', english: 'experience' },
          { german: 'die Kenntnis', english: 'knowledge' },
          { german: 'die Fähigkeit', english: 'ability' },
          { german: 'die Meinung', english: 'opinion' },
          { german: 'die Entscheidung', english: 'decision' },
          { german: 'die Lösung', english: 'solution' },
          { german: 'das Problem', english: 'problem' },
          { german: 'die Herausforderung', english: 'challenge' },
          { german: 'der Vorteil', english: 'advantage' },
          { german: 'der Nachteil', english: 'disadvantage' },
          { german: 'der Unterschied', english: 'difference' },
          { german: 'die Ähnlichkeit', english: 'similarity' }
        ]
      },
      {
        id: 'b2-v6', title: 'Communication & Discussion',
        words: [
          { german: 'die Kommunikation', english: 'communication' },
          { german: 'die Diskussion', english: 'discussion' },
          { german: 'die Debatte', english: 'debate' },
          { german: 'die Argumentation', english: 'argumentation' },
          { german: 'das Argument', english: 'argument' },
          { german: 'die Begründung', english: 'reasoning' },
          { german: 'die Zustimmung', english: 'agreement' },
          { german: 'die Ablehnung', english: 'rejection' },
          { german: 'der Kompromiss', english: 'compromise' },
          { german: 'die Kritik', english: 'criticism' },
          { german: 'das Lob', english: 'praise' },
          { german: 'der Vorschlag', english: 'suggestion' },
          { german: 'diskutieren', english: 'to discuss' },
          { german: 'überzeugen', english: 'to convince' },
          { german: 'zustimmen', english: 'to agree' }
        ]
      },
      {
        id: 'b2-v7', title: 'Global Issues',
        words: [
          { german: 'die Globalisierung', english: 'globalization' },
          { german: 'der Klimawandel', english: 'climate change' },
          { german: 'die Umweltverschmutzung', english: 'pollution' },
          { german: 'die Armut', english: 'poverty' },
          { german: 'die Ungleichheit', english: 'inequality' },
          { german: 'die Migration', english: 'migration' },
          { german: 'der Flüchtling', english: 'refugee' },
          { german: 'die Integration', english: 'integration' },
          { german: 'die Nachhaltigkeit', english: 'sustainability' },
          { german: 'die Ressource', english: 'resource' },
          { german: 'die Energie', english: 'energy' },
          { german: 'die Krise', english: 'crisis' },
          { german: 'die Pandemie', english: 'pandemic' },
          { german: 'die Solidarität', english: 'solidarity' },
          { german: 'global', english: 'global' }
        ]
      },
      {
        id: 'b2-v8', title: 'Idioms & Expressions',
        words: [
          { german: 'Das ist mir Wurst.', english: 'It\'s all the same to me.' },
          { german: 'Ich verstehe nur Bahnhof.', english: 'I don\'t understand anything.' },
          { german: 'Das ist nicht mein Bier.', english: 'That\'s not my business.' },
          { german: 'Hals und Beinbruch!', english: 'Good luck! (Break a leg!)' },
          { german: 'Da steppt der Bär.', english: 'That\'s where the action is.' },
          { german: 'jemandem auf den Wecker gehen', english: 'to get on someone\'s nerves' },
          { german: 'die Nase voll haben', english: 'to be fed up' },
          { german: 'ins Schwarze treffen', english: 'to hit the bullseye' },
          { german: 'Tomaten auf den Augen haben', english: 'to not see what\'s obvious' },
          { german: 'einen Korb bekommen', english: 'to be rejected' },
          { german: 'unter vier Augen', english: 'in private' },
          { german: 'auf Wolke sieben sein', english: 'to be on cloud nine' },
          { german: 'den Nagel auf den Kopf treffen', english: 'to hit the nail on the head' },
          { german: 'Schwein haben', english: 'to have luck' },
          { german: 'um den heißen Brei reden', english: 'to beat around the bush' }
        ]
      }
    ]
  },
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

const LEVELS = ['A2', 'B1', 'B2'];
const SECTIONS = [
  { id: 'grammar', name: 'Grammar', icon: '📚' },
  { id: 'vocabulary', name: 'Vocabulary', icon: '🔤' },
  { id: 'pronunciation', name: 'Pronunciation', icon: '🗣️' },
  { id: 'everyday', name: 'Everyday German', icon: '🌍' }
];