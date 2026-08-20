export interface LessonContent {
  chapterId: string
  goal: string
  whyItMatters: string
  grammar: { title: string; explanation: string; examples: { german: string; english: string }[] }[]
  communication: { german: string; english: string }[]
  tips: string[]
}

/**
 * Teaching layer for the first A1 chapters.
 * Vocabulary remains in vocabulary.json; this file adds the explanation and
 * communication context that turns a word list into a lesson.
 */
export const lessonContent: readonly LessonContent[] = [
  {
    chapterId: 'a1-ch1',
    goal: 'Introduce yourself, greet people, thank someone, and say goodbye.',
    whyItMatters: 'These are the first phrases you can use immediately in everyday German.',
    grammar: [
      { title: 'du vs. Sie', explanation: 'Use du with friends and people you know well. Sie is the polite/formal form.', examples: [
        { german: 'Wie geht es dir?', english: 'How are you? (informal)' },
        { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)' },
      ] },
      { title: 'A useful first pattern', explanation: 'German often puts the verb early in simple questions.', examples: [
        { german: 'Wie geht es dir?', english: 'How are you?' },
        { german: 'Wie heißen Sie?', english: 'What is your name? (formal)' },
      ] },
    ],
    communication: [
      { german: 'Hallo! Ich heiße ...', english: 'Hello! My name is ...' },
      { german: 'Ich komme aus Uganda.', english: 'I come from Uganda.' },
      { german: 'Freut mich!', english: 'Nice to meet you!' },
      { german: 'Danke! – Bitte!', english: 'Thank you! – You’re welcome!' },
    ],
    tips: ['Learn phrases as complete chunks, not only as individual words.', 'Say every new phrase aloud at least once.', 'Notice the difference between informal du and formal Sie.'],
  },
  {
    chapterId: 'a1-ch2',
    goal: 'Recognise and use numbers 1–10 in simple everyday situations.',
    whyItMatters: 'Numbers appear everywhere: prices, times, addresses, phone numbers, and quantities.',
    grammar: [
      { title: 'Numbers as answers', explanation: 'German numbers do not need a special ending when used alone.', examples: [
        { german: 'eins, zwei, drei', english: 'one, two, three' },
        { german: 'Ich habe zwei Bücher.', english: 'I have two books.' },
      ] },
    ],
    communication: [
      { german: 'Wie viel?', english: 'How much? / How many?' },
      { german: 'Zwei, bitte.', english: 'Two, please.' },
      { german: 'Das kostet zehn Euro.', english: 'That costs ten euros.' },
    ],
    tips: ['Practise saying the numbers forwards and backwards.', 'Connect numbers to real objects around you.', 'Later, we will extend this to dates, prices and time.'],
  },
  {
    chapterId: 'a1-ch3',
    goal: 'Talk about close family members and ask simple questions about family.',
    whyItMatters: 'Talking about people you know is one of the easiest ways to start real conversations.',
    grammar: [
      { title: 'Possessives: mein / meine', explanation: 'Mein means my. The ending changes with the noun: mein Vater, meine Mutter.', examples: [
        { german: 'mein Vater', english: 'my father' },
        { german: 'meine Mutter', english: 'my mother' },
      ] },
      { title: 'Simple questions', explanation: 'Hast du ...? means Do you have ...? It is a useful question pattern.', examples: [
        { german: 'Hast du einen Bruder?', english: 'Do you have a brother?' },
        { german: 'Hast du eine Schwester?', english: 'Do you have a sister?' },
      ] },
    ],
    communication: [
      { german: 'Das ist meine Mutter.', english: 'This is my mother.' },
      { german: 'Ich habe einen Bruder.', english: 'I have a brother.' },
      { german: 'Meine Familie wohnt in Uganda.', english: 'My family lives in Uganda.' },
    ],
    tips: ['Always learn a noun together with its article: der Vater, die Mutter.', 'Use the vocabulary to describe your own family, not an imaginary one.'],
  },
  {
    chapterId: 'a1-ch4',
    goal: 'Understand common food and drink words and use them when ordering or talking about meals.',
    whyItMatters: 'Food is a high-frequency everyday topic and gives you many opportunities to practise articles.',
    grammar: [
      { title: 'Noun gender', explanation: 'German nouns have grammatical gender. The article is part of the word you should memorise.', examples: [
        { german: 'das Brot', english: 'the bread' },
        { german: 'der Kaffee', english: 'the coffee' },
        { german: 'die Milch', english: 'the milk' },
      ] },
      { title: 'möchte', explanation: 'Ich möchte ... is a polite and very useful way to say I would like ...', examples: [
        { german: 'Ich möchte einen Kaffee.', english: 'I would like a coffee.' },
        { german: 'Ich möchte Wasser, bitte.', english: 'I would like water, please.' },
      ] },
    ],
    communication: [
      { german: 'Was möchtest du?', english: 'What would you like?' },
      { german: 'Ich möchte einen Kaffee, bitte.', english: 'I would like a coffee, please.' },
      { german: 'Das Essen schmeckt gut.', english: 'The food tastes good.' },
    ],
    tips: ['Do not memorise Kaffee alone; memorise der Kaffee.', 'Listen for articles when people speak.', 'Practise ordering aloud, even when you are studying at home.'],
  },
  {
    chapterId: 'a1-ch5',
    goal: 'Use essential German when buying things and asking about prices.',
    whyItMatters: 'Shopping combines vocabulary, numbers, polite requests, and real-world questions.',
    grammar: [
      { title: 'Polite requests', explanation: 'Bitte makes a request sound polite. You will hear it constantly in shops.', examples: [
        { german: 'Ein Wasser, bitte.', english: 'A water, please.' },
        { german: 'Ich möchte das, bitte.', english: 'I would like that, please.' },
      ] },
      { title: 'Price questions', explanation: 'Wie viel kostet ...? is the standard pattern for asking the price of one thing.', examples: [
        { german: 'Wie viel kostet das?', english: 'How much does that cost?' },
        { german: 'Das kostet fünf Euro.', english: 'That costs five euros.' },
      ] },
    ],
    communication: [
      { german: 'Wie viel kostet das?', english: 'How much does that cost?' },
      { german: 'Ich nehme das.', english: 'I’ll take that.' },
      { german: 'Haben Sie ...?', english: 'Do you have ...? (formal)' },
    ],
    tips: ['Practise prices with the numbers from Chapter 2.', 'Use formal Sie in most shop situations with strangers.', 'Focus on understanding the question before trying to answer.'],
  },
  {
    chapterId: 'a1-ch6',
    goal: 'Build a small core of everyday words that can be reused across many situations.',
    whyItMatters: 'High-frequency words make every later lesson easier to understand.',
    grammar: [
      { title: 'Build sentences from patterns', explanation: 'At A1, a few reliable sentence patterns are more useful than memorising isolated grammar rules.', examples: [
        { german: 'Ich bin ...', english: 'I am ...' },
        { german: 'Ich habe ...', english: 'I have ...' },
        { german: 'Ich möchte ...', english: 'I would like ...' },
      ] },
    ],
    communication: [
      { german: 'Ich verstehe.', english: 'I understand.' },
      { german: 'Ich verstehe nicht.', english: 'I do not understand.' },
      { german: 'Bitte langsam.', english: 'Slowly, please.' },
      { german: 'Können Sie das wiederholen?', english: 'Can you repeat that? (formal)' },
    ],
    tips: ['These words should become automatic, not just recognisable.', 'Use the phrases when speaking with a German speaker.', 'If you do not understand, ask for repetition instead of switching immediately to English.'],
  },
  {
    chapterId: 'a2-ch1',
    goal: 'Find your way through German train stations, airports and public transport, and ask for or understand basic travel information.',
    whyItMatters: 'Almost every long-distance trip in Germany starts with a Fahrkarte and ends with a platform number. These phrases are the difference between making your connection and missing it.',
    grammar: [
      {
        title: 'Two-way prepositions: an, in, mit, nach, zu',
        explanation: 'These prepositions take the accusative when you describe movement towards a place (Wohin?) and the dative when you describe a location (Wo?). Most travel phrases use both directions of the same preposition, so the article is what changes, not the preposition itself.',
        examples: [
          { german: 'Ich fahre zum Bahnhof.', english: 'I am travelling to the train station.' },
          { german: 'Ich warte am Bahnhof auf Anna.', english: 'I am waiting for Anna at the train station.' },
          { german: 'Wie komme ich zum Flughafen?', english: 'How do I get to the airport?' },
        ],
      },
      {
        title: 'Transport by mit + dative',
        explanation: 'Mit (by, with) is followed by the dative. With vehicles, the article shifts: das Auto becomes mit dem Auto, die Bahn becomes mit der Bahn. This is the cleanest way to say how you travelled.',
        examples: [
          { german: 'Ich fahre mit der Bahn.', english: 'I travel by train.' },
          { german: 'Wir fahren mit dem Bus in die Stadt.', english: 'We take the bus into town.' },
          { german: 'Fährst du mit dem Fahrrad zur Arbeit?', english: 'Do you cycle to work?' },
        ],
      },
    ],
    communication: [
      { german: 'Eine Fahrkarte nach Berlin, bitte.', english: 'One ticket to Berlin, please.' },
      { german: 'Von welchem Gleis fährt der Zug?', english: 'From which platform does the train leave?' },
      { german: 'Wie komme ich zum Flughafen?', english: 'How do I get to the airport?' },
      { german: 'Der Zug hat zehn Minuten Verspätung.', english: 'The train is ten minutes late.' },
      { german: 'Ich möchte ein Hotel in der Stadtmitte.', english: 'I would like a hotel in the city centre.' },
    ],
    tips: [
      'Memorise the pair am Bahnhof / zum Bahnhof as a single unit — the meaning flips but the preposition stays.',
      'When you hear a platform number, it is almost always Gleis followed by the number: Gleis 7.',
      'Carry your Fahrkarte visibly between platforms — ticket checks on trains are normal, not a sign that something is wrong.',
    ],
  },
  {
    chapterId: 'a2-ch2',
    goal: 'Say what you do for work, describe a typical working day, and ask polite questions about jobs, hours and time off.',
    whyItMatters: 'Most adult introductions in German end with "Und was machst du beruflich?" The phrases in this chapter let you answer that question and hold a real conversation about work — the topic Germans ask about most when they first meet you.',
    grammar: [
      {
        title: 'Ich arbeite als + Beruf',
        explanation: 'When you describe your profession, German uses "als" (as) followed by the bare job noun. The verb is "arbeiten". The preposition stays the same whether you talk about today or in general.',
        examples: [
          { german: 'Ich arbeite als Ingenieur.', english: 'I work as an engineer.' },
          { german: 'Er arbeitet als Lehrer an einer Grundschule.', english: 'He works as a teacher at an elementary school.' },
          { german: 'Was bist du von Beruf?', english: 'What is your profession?' },
        ],
      },
      {
        title: 'Modal verbs at work: müssen, dürfen, können, möchten',
        explanation: 'The work day runs on modal verbs: what you must do, what you are allowed to do, what you can do, and what you would like to do. They conjugate like other verbs but the second idea (the infinitive) goes at the very end of the sentence.',
        examples: [
          { german: 'Ich muss um acht Uhr im Büro sein.', english: 'I have to be in the office at eight.' },
          { german: 'Darf ich heute früher gehen?', english: 'May I leave earlier today?' },
          { german: 'Ich kann das morgen erledigen.', english: 'I can take care of that tomorrow.' },
        ],
      },
    ],
    communication: [
      { german: 'Ich bin von Beruf Ingenieurin.', english: 'I am an engineer by profession.' },
      { german: 'Ich arbeite heute im Home-Office.', english: 'I am working from home today.' },
      { german: 'Haben Sie einen Moment Zeit für mich?', english: 'Do you have a moment for me?' },
      { german: 'Ich habe nächste Woche Urlaub.', english: 'I am on vacation next week.' },
      { german: 'Wann wird das Gehalt bezahlt?', english: 'When is the salary paid?' },
    ],
    tips: [
      'Many job titles have a feminine form. Use "Lehrerin / Ärztin / Ingenieurin" if you are a woman — the masculine form is for men only.',
      'In most workplaces people use "du" with colleagues and "Sie" with the boss until the boss explicitly invites you to use "du". Watch and listen before you decide.',
      'Modal verbs are the key to polite requests: "Darf ich ..." is softer than "Ich will ..." even when both are grammatically correct.',
    ],
  },
  {
    chapterId: 'a2-ch3',
    goal: 'Describe common symptoms, ask for help at a pharmacy or doctor, and handle a real medical situation from "I do not feel well" to "I have an appointment".',
    whyItMatters: 'When you live abroad, a flu at the wrong moment turns into a small crisis if you cannot explain what hurts, where to go, or how urgently you need help. These phrases turn a panic moment into a short, clear conversation.',
    grammar: [
      {
        title: 'Ich habe + Schmerz / Schmerzen',
        explanation: 'German describes most symptoms with "haben" plus the symptom noun. Some symptoms are fixed compounds ("Kopfschmerzen", plural only) and some take the plural ("Schmerzen") when the pain is general. The word order stays the same as English: "Ich habe Kopfschmerzen."',
        examples: [
          { german: 'Ich habe Kopfschmerzen.', english: 'I have a headache.' },
          { german: 'Ich habe hohes Fieber.', english: 'I have a high fever.' },
          { german: 'Haben Sie Schmerzen?', english: 'Are you in pain?' },
        ],
      },
      {
        title: 'Mir tut X weh (dative of body parts)',
        explanation: 'When something hurts *in* a body part, German uses "tun ... weh" with the body part as the subject and the person as the dative object: "Mir tut der Kopf weh." Use the possessive ("mein") if you want to be specific about *which* one.',
        examples: [
          { german: 'Mir tut der Kopf weh.', english: 'My head hurts.' },
          { german: 'Mein rechtes Ohr tut weh.', english: 'My right ear hurts.' },
          { german: 'Wo tut es Ihnen weh?', english: 'Where does it hurt (formal)?' },
        ],
      },
    ],
    communication: [
      { german: 'Ich fühle mich nicht gut.', english: 'I do not feel well.' },
      { german: 'Ich habe seit gestern Fieber.', english: 'I have had a fever since yesterday.' },
      { german: 'Ich brauche einen Termin beim Arzt.', english: 'I need an appointment with the doctor.' },
      { german: 'Wo ist die nächste Apotheke?', english: 'Where is the nearest pharmacy?' },
      { german: 'Rufen Sie bitte einen Krankenwagen!', english: 'Please call an ambulance.' },
    ],
    tips: [
      'Pharmacies rotate an emergency "Notdienst" outside business hours. Any pharmacy door will display the address of the nearest one on duty.',
      'For a real emergency, "Rufen Sie einen Krankenwagen" or the European emergency number 112 works in every EU country. You do not need perfect German to be understood.',
      'If you only remember one symptom phrase, remember "Ich habe Kopfschmerzen" — it covers the most common minor ailment and gets you a pharmacy recommendation fast.',
    ],
  },
  {
    chapterId: 'a2-ch4',
    goal: 'Tell apart the inseparable-looking pair "vor-" and "ver-" so you can recognise and use the twenty most common verbs that start with them.',
    whyItMatters: 'These two prefixes are spelled almost the same but mean different things: "vor-" is about what comes before, in front, or earlier; "ver-" is about going wrong, finishing, or moving things together. Mixing them up makes "I introduce myself" sound like "I lock myself up".',
    grammar: [
      {
        title: 'vor-verbs: what comes before, in front, or earlier',
        explanation: 'The prefix "vor-" means *before* in time (vorher, vorbereiten, vorlesen), *in front* in space (vorne, vorschlagen = throw forward), or *to introduce* (sich vorstellen = put yourself in front of someone). "vor-" is the stressed syllable when the verb is spoken.',
        examples: [
          { german: 'Darf ich mich vorstellen?', english: 'May I introduce myself?' },
          { german: 'Ich muss das Abendessen vorbereiten.', english: 'I have to prepare dinner.' },
          { german: 'Kannst du mir eine Geschichte vorlesen?', english: 'Can you read me a story?' },
        ],
      },
      {
        title: 'ver-verbs: going wrong, finishing, or bringing together',
        explanation: 'The prefix "ver-" often signals something that goes away (vergessen = slip out of memory), gets finished (verkaufen = sell off), changes (sich verändern), or joins together (verbinden). "ver-" is also the stressed syllable.',
        examples: [
          { german: 'Ich verstehe dich nicht.', english: 'I do not understand you.' },
          { german: 'Ich habe meinen Schlüssel verloren.', english: 'I have lost my key.' },
          { german: 'Kannst du mich mit der Zentrale verbinden?', english: 'Can you connect me with the switchboard?' },
        ],
      },
    ],
    communication: [
      { german: 'Darf ich mich vorstellen?', english: 'May I introduce myself?' },
      { german: 'Ich verstehe dich nicht.', english: 'I do not understand you.' },
      { german: 'Ich habe meinen Schlüssel verloren.', english: 'I have lost my key.' },
      { german: 'Kannst du mir eine Geschichte vorlesen?', english: 'Can you read me a story?' },
      { german: 'Ich versuche, mein Bestes zu geben.', english: 'I am trying to do my best.' },
    ],
    tips: [
      'Both "vor-" and "ver-" are *separable* prefixes in the present tense. In a normal sentence the prefix drops to the end: "Ich stelle mich vor." In a yes/no question or "du"-imperative the prefix leads: "Stellst du dich vor?"',
      'Stress is your friend: the prefix is always the stressed syllable ("vorSTELLen", "verSTEhen", "verGESsen"). If you cannot hear the stress, you probably misidentified the prefix.',
      'Watch out for the false friend "verstellen" (to adjust or block) versus "vorstellen" (to introduce). They share no meaning at all even though they share most of their letters.',
    ],
  },
]

export function getLessonContent(chapterId: string): LessonContent | undefined {
  return lessonContent.find((lesson) => lesson.chapterId === chapterId)
}
