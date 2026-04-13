import type { GrammarRule } from '../types'

export const grammarRules: GrammarRule[] = [
  {
    id: 'grammar-1',
    title: 'Articles: der, die, das',
    description: 'German has three grammatical genders: masculine (der), feminine (die), and neuter (das).',
    level: 'A1',
    category: 'Grammar Basics',
    examples: [
      { german: 'der Mann', english: 'the man', explanation: 'Masculine noun' },
      { german: 'die Frau', english: 'the woman', explanation: 'Feminine noun' },
      { german: 'das Kind', english: 'the child', explanation: 'Neuter noun' },
    ],
  },
  {
    id: 'grammar-2',
    title: 'Present Tense Conjugation',
    description: 'Regular verbs are conjugated by removing -en and adding personal endings.',
    level: 'A1',
    category: 'Verbs',
    examples: [
      { german: 'ich lerne', english: 'I learn', explanation: '1st person singular' },
      { german: 'du lernst', english: 'you learn', explanation: '2nd person singular' },
      { german: 'er/sie/es lernt', english: 'he/she/it learns', explanation: '3rd person singular' },
      { german: 'wir lernen', english: 'we learn', explanation: '1st person plural' },
      { german: 'ihr lernt', english: 'you (pl.) learn', explanation: '2nd person plural' },
      { german: 'sie/Sie lernen', english: 'they/you (formal) learn', explanation: '3rd person plural / formal' },
    ],
  },
  {
    id: 'grammar-3',
    title: 'Sentence Structure',
    description: 'German word order: The verb is always in the second position in main clauses.',
    level: 'A1',
    category: 'Grammar Basics',
    examples: [
      { german: 'Ich lerne Deutsch.', english: 'I learn German.', explanation: 'Standard word order' },
      { german: 'Heute lerne ich Deutsch.', english: 'Today I learn German.', explanation: 'Time first, then verb, then subject' },
      { german: 'Deutsch lerne ich heute.', english: 'German I learn today.', explanation: 'Object first for emphasis' },
    ],
  },
  {
    id: 'grammar-4',
    title: 'Plural Forms',
    description: 'German nouns have different plural endings: -e, -er, -en, -s, or no change.',
    level: 'A1',
    category: 'Nouns',
    examples: [
      { german: 'der Apfel → die Äpfel', english: 'the apple → the apples', explanation: 'Umlaut + -er' },
      { german: 'die Banane → die Bananen', english: 'the banana → the bananas', explanation: '-en ending' },
      { german: 'das Auto → die Autos', english: 'the car → the cars', explanation: '-s ending' },
    ],
  },
  {
    id: 'grammar-5',
    title: 'Cases: Nominative, Accusative, Dative',
    description: 'German has four cases. The case determines the article and adjective endings.',
    level: 'A2',
    category: 'Grammar Basics',
    examples: [
      { german: 'Der Mann ist hier. (Nominative)', english: 'The man is here.', explanation: 'Subject' },
      { german: 'Ich sehe den Mann. (Accusative)', english: 'I see the man.', explanation: 'Direct object' },
      { german: 'Ich helfe dem Mann. (Dative)', english: 'I help the man.', explanation: 'Indirect object' },
    ],
  },
]
