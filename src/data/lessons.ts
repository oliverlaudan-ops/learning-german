import type { Chapter, CEFRLevel, Level } from '../types'

export const lessons: Chapter[] = [
  { id: 'a1-ch1', title: 'Greetings and Farewells', description: 'Basic greetings and goodbye phrases', category: 'Basics', level: 'A1' as CEFRLevel, wordIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'], order: 1 },
  { id: 'a1-ch2', title: 'Numbers', description: 'Numbers from 1 to 10', category: 'Basics', level: 'A1' as CEFRLevel, wordIds: ['w9', 'w10', 'w11', 'w12', 'w13', 'w14', 'w15', 'w16', 'w17', 'w18'], order: 2 },
  { id: 'a1-ch3', title: 'Family and Relationships', description: 'Family members and relationships', category: 'Personal', level: 'A1' as CEFRLevel, wordIds: ['w19', 'w20', 'w21', 'w22', 'w23', 'w24', 'w25', 'w26', 'w27', 'w28'], order: 3 },
  { id: 'a1-ch4', title: 'Food and Drink', description: 'Food, beverages and meals', category: 'Food', level: 'A1' as CEFRLevel, wordIds: ['w29', 'w30', 'w31', 'w32', 'w33', 'w34', 'w35', 'w36', 'w37', 'w38', 'w39', 'w40', 'w41', 'w42', 'w43'], order: 4 },
  { id: 'a1-ch5', title: 'Shopping', description: 'At the supermarket and market', category: 'Shopping', level: 'A1' as CEFRLevel, wordIds: ['w44', 'w45', 'w46', 'w47', 'w48', 'w49', 'w50', 'w51', 'w52', 'w53', 'w54', 'w55', 'w56', 'w57', 'w58'], order: 5 },
  { id: 'a2-ch1', title: 'Travel and Transport', description: 'Train station, airport, public transport', category: 'Travel', level: 'A2' as CEFRLevel, wordIds: ['w59', 'w60', 'w61', 'w62', 'w63', 'w64', 'w65', 'w66', 'w67', 'w68', 'w69', 'w70', 'w71', 'w72', 'w73'], order: 1 },
  { id: 'a2-ch2', title: 'Work and Profession', description: 'Jobs, workplace, business language', category: 'Work', level: 'A2' as CEFRLevel, wordIds: ['w74', 'w75', 'w76', 'w77', 'w78', 'w79', 'w80', 'w81', 'w82', 'w83', 'w84', 'w85', 'w86', 'w87', 'w88'], order: 2 },
  { id: 'a2-ch3', title: 'Health', description: 'Body, illnesses, at the doctor', category: 'Health', level: 'A2' as CEFRLevel, wordIds: ['w89', 'w90', 'w91', 'w92', 'w93', 'w94', 'w95', 'w96', 'w97', 'w98', 'w99', 'w100', 'w101', 'w102', 'w103'], order: 3 },
  { id: 'a1-ch6', title: 'Common Words', description: 'Essential everyday words', category: 'Common', level: 'A1' as CEFRLevel, wordIds: ['w104', 'w105', 'w106', 'w107', 'w108', 'w109', 'w110', 'w111', 'w112', 'w113', 'w114', 'w115', 'w116', 'w117', 'w118', 'w119', 'w120', 'w121', 'w122', 'w123'], order: 6 },
  { id: 'a2-ch4', title: 'Vor vs Ver Prefixes', description: 'Master the difference between vor- and ver- prefixes', category: 'Vor-Ver', level: 'A2' as CEFRLevel, wordIds: ['w124', 'w125', 'w126', 'w127', 'w128', 'w129', 'w130', 'w131', 'w132', 'w133', 'w134', 'w135', 'w136', 'w137', 'w138', 'w139', 'w140', 'w141', 'w142', 'w143'], order: 4 },
]

export const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2']

export const levelMeta: Record<CEFRLevel, { title: string; description: string }> = {
  A1: { title: 'A1 – Beginner', description: 'Foundation: greetings, numbers, family, food, shopping, common words.' },
  A2: { title: 'A2 – Elementary', description: 'Practical topics: travel, work, health, and prefix patterns.' },
  B1: { title: 'B1 – Intermediate', description: 'Conversational fluency (content coming soon).' },
  B2: { title: 'B2 – Upper Intermediate', description: 'Complex texts and nuanced communication (content coming soon).' },
}

/** Builds Level objects from chapter data. */
export function getLevels(): Level[] {
  return levelOrder.map(id => ({
    id,
    ...levelMeta[id],
    order: levelOrder.indexOf(id) + 1,
    chapters: lessons
      .filter(l => l.level === id)
      .sort((a, b) => a.order - b.order),
  }))
}

