import type { GrammarRule } from '../types'

export const grammarRules: GrammarRule[] = [
  {
    id: 'gr-1',
    title: 'Bestimmte Artikel (Nominativ)',
    description: 'Im Deutschen gibt es drei Geschlechter: maskulin (der), feminin (die) und neutral (das).',
    level: 'A1',
    category: 'article',
    examples: [
      { german: 'der Vater', english: 'the father' },
      { german: 'die Mutter', english: 'the mother' },
      { german: 'das Kind', english: 'the child' },
    ],
  },
  {
    id: 'gr-2',
    title: 'Personalpronomen',
    description: 'Wörter, die Personen oder Sachen ersetzen.',
    level: 'A1',
    category: 'pronoun',
    examples: [
      { german: 'ich, du, er, sie, es', english: 'I, you, he, she, it' },
      { german: 'wir, ihr, sie, Sie', english: 'we, you (pl), they, You (formal)' },
    ],
  },
  {
    id: 'gr-3',
    title: 'Konjugation Präsens',
    description: 'Regelmäßige Verben enden im Präsens auf -e, -st, -t, -en, -t, -en.',
    level: 'A1',
    category: 'conjugation',
    examples: [
      { german: 'ich lerne', english: 'I learn' },
      { german: 'du lernst', english: 'you learn' },
      { german: 'er/sie/es lernt', english: 'he/she/it learns' },
    ],
  },
  {
    id: 'gr-4',
    title: 'Pluralbildung',
    description: 'Es gibt viele verschiedene Pluralformen im Deutschen.',
    level: 'A1',
    category: 'plural',
    examples: [
      { german: 'das Auto -> die Autos', english: 'the car -> the cars' },
      { german: 'das Kind -> die Kinder', english: 'the child -> the children' },
    ],
  },
  {
    id: 'gr-5',
    title: 'Perfekt mit "haben"',
    description: 'Die meisten Verben bilden das Perfekt mit "haben" und dem Partizip II.',
    level: 'A2',
    category: 'perfect',
    examples: [
      { german: 'Ich habe gelernt.', english: 'I have learned.' },
      { german: 'Du hast gegessen.', english: 'You have eaten.' },
    ],
  },
  {
    id: 'gr-6',
    title: 'Perfekt mit "sein"',
    description: 'Verben der Bewegung oder Zustandsänderung nutzen "sein".',
    level: 'A2',
    category: 'perfect',
    examples: [
      { german: 'Ich bin gegangen.', english: 'I have gone / I went.' },
      { german: 'Wir sind gefahren.', english: 'We have driven / we drove.' },
    ],
  },
  {
    id: 'gr-7',
    title: 'Modalverben',
    description: 'können, müssen, wollen, dürfen, sollen, mögen.',
    level: 'A2',
    category: 'modal',
    examples: [
      { german: 'Ich kann Deutsch sprechen.', english: 'I can speak German.' },
      { german: 'Du musst lernen.', english: 'You must study.' },
    ],
  },
  {
    id: 'gr-8',
    title: 'Präfixe: vor- und ver-',
    description: 'Vorsilben verändern die Bedeutung von Verben.',
    level: 'A2',
    category: 'prefix',
    examples: [
      { german: 'vorstellen', english: 'to introduce / imagine' },
      { german: 'verstehen', english: 'to understand' },
    ],
  },
  {
    id: 'gr-9',
    title: 'Nebensätze mit "weil", "dass", "wenn"',
    description: 'In Nebensätzen steht das konjugierte Verb am Ende.',
    level: 'B1',
    category: 'nebensatz',
    examples: [
      { german: 'Ich lerne Deutsch, weil ich in Berlin wohne.', english: 'I learn German because I live in Berlin.' },
      { german: 'Er sagt, dass er morgen kommt.', english: 'He says that he is coming tomorrow.' },
    ],
  },
  {
    id: 'gr-10',
    title: 'Präteritum (Einfache Vergangenheit)',
    description: 'Wird oft in geschriebenen Texten oder bei Hilfsverben genutzt.',
    level: 'B1',
    category: 'präteritum',
    examples: [
      { german: 'Ich war müde.', english: 'I was tired.' },
      { german: 'Er hatte Glück.', english: 'He was lucky (had luck).' },
      { german: 'Wir sagten nichts.', english: 'We said nothing.' },
    ],
  },
  {
    id: 'gr-11',
    title: 'Konjunktiv II (Wünsche & Irrealität)',
    description: 'Wird für höfliche Fragen oder irreale Wünsche genutzt (würde, hätte, wäre).',
    level: 'B1',
    category: 'konjunktiv2',
    examples: [
      { german: 'Ich würde gerne nach Uganda reisen.', english: 'I would like to travel to Uganda.' },
      { german: 'Wenn ich Zeit hätte, käme ich vorbei.', english: 'If I had time, I would come over.' },
    ],
  },
  {
    id: 'gr-12',
    title: 'Relativsätze',
    description: 'Beschreiben Nomen näher. Das Relativpronomen richtet sich nach dem Nomen.',
    level: 'B1',
    category: 'relativsatz',
    examples: [
      { german: 'Der Mann, der dort steht, ist mein Onkel.', english: 'The man who stands there is my uncle.' },
      { german: 'Das Haus, das wir kaufen wollen, ist groß.', english: 'The house that we want to buy is big.' },
    ],
  },
]
