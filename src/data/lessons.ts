import type { Chapter, CEFRLevel, Level } from '../types'

export const lessons: Chapter[] = [
  // A1
  { id: 'a1-ch1', title: 'Greetings and Farewells', description: 'Basic greetings and goodbye phrases', category: 'Basics', level: 'A1', wordIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'], order: 1 },
  { id: 'a1-ch2', title: 'Numbers', description: 'Numbers from 1 to 10', category: 'Basics', level: 'A1', wordIds: ['w9', 'w10', 'w11', 'w12', 'w13', 'w14', 'w15', 'w16', 'w17', 'w18'], order: 2 },
  { id: 'a1-ch3', title: 'Family and Relationships', description: 'Family members and relationships', category: 'Personal', level: 'A1', wordIds: ['w19', 'w20', 'w21', 'w22', 'w23', 'w24', 'w25', 'w26', 'w27', 'w28'], order: 3 },
  { id: 'a1-ch4', title: 'Food and Drink', description: 'Food, beverages and meals', category: 'Food', level: 'A1', wordIds: ['w29', 'w30', 'w31', 'w32', 'w33', 'w34', 'w35', 'w36', 'w37', 'w38', 'w39', 'w40', 'w41', 'w42', 'w43'], order: 4 },
  { id: 'a1-ch5', title: 'Shopping', description: 'At the supermarket and market', category: 'Shopping', level: 'A1', wordIds: ['w44', 'w45', 'w46', 'w47', 'w48', 'w49', 'w50', 'w51', 'w52', 'w53', 'w54', 'w55', 'w56', 'w57', 'w58'], order: 5 },
  { id: 'a1-ch6', title: 'Common Words', description: 'Essential everyday words', category: 'Common', level: 'A1', wordIds: ['w104', 'w105', 'w106', 'w107', 'w108', 'w109', 'w110', 'w111', 'w112', 'w113', 'w114', 'w115', 'w116', 'w117', 'w118', 'w119', 'w120', 'w121', 'w122', 'w123'], order: 6 },
  
  // A2
  { id: 'a2-ch1', title: 'Travel and Transport', description: 'Train station, airport, public transport', category: 'Travel', level: 'A2', wordIds: ['w59', 'w60', 'w61', 'w62', 'w63', 'w64', 'w65', 'w66', 'w67', 'w68', 'w69', 'w70', 'w71', 'w72', 'w73'], order: 1 },
  { id: 'a2-ch2', title: 'Work and Profession', description: 'Jobs, workplace, business language', category: 'Work', level: 'A2', wordIds: ['w74', 'w75', 'w76', 'w77', 'w78', 'w79', 'w80', 'w81', 'w82', 'w83', 'w84', 'w85', 'w86', 'w87', 'w88'], order: 2 },
  { id: 'a2-ch3', title: 'Health', description: 'Body, illnesses, at the doctor', category: 'Health', level: 'A2', wordIds: ['w89', 'w90', 'w91', 'w92', 'w93', 'w94', 'w95', 'w96', 'w97', 'w98', 'w99', 'w100', 'w101', 'w102', 'w103'], order: 3 },
  { id: 'a2-ch4', title: 'Vor vs Ver Prefixes', description: 'Master the difference between vor- and ver- prefixes', category: 'Vor-Ver', level: 'A2', wordIds: ['w124', 'w125', 'w126', 'w127', 'w128', 'w129', 'w130', 'w131', 'w132', 'w133', 'w134', 'w135', 'w136', 'w137', 'w138', 'w139', 'w140', 'w141', 'w142', 'w143'], order: 4 },
  { id: 'a2-ch5', title: 'Hobbys & Freizeit', description: 'Hobbys, activities and free time', category: 'Personal', level: 'A2', wordIds: ['w274', 'w275', 'w276', 'w277', 'w278', 'w279', 'w280', 'w281', 'w282', 'w283', 'w284', 'w285'], order: 5 },
  { id: 'a2-ch6', title: 'Wetter & Jahreszeiten', description: 'Weather, seasons and nature', category: 'Environment', level: 'A2', wordIds: ['w286', 'w287', 'w288', 'w289', 'w290', 'w291', 'w292', 'w293', 'w294', 'w295', 'w296', 'w297'], order: 6 },

  // B1
  { id: 'b1-ch1', title: 'Wohnung & Haushalt', description: 'Living, renting and household', category: 'Home', level: 'B1', wordIds: ['w144', 'w145', 'w146', 'w147', 'w148', 'w149', 'w150', 'w151', 'w152', 'w153', 'w154', 'w155'], order: 1 },
  { id: 'b1-ch2', title: 'Berufsleben vertieft', description: 'Professional life, job search and workplace', category: 'Work', level: 'B1', wordIds: ['w156', 'w157', 'w158', 'w159', 'w160', 'w161', 'w162', 'w163', 'w164', 'w165', 'w166', 'w167'], order: 2 },
  { id: 'b1-ch3', title: 'Gesundheit & Körper vertieft', description: 'Advanced health, medical terms and insurance', category: 'Health', level: 'B1', wordIds: ['w168', 'w169', 'w170', 'w171', 'w172', 'w173', 'w174', 'w175', 'w176', 'w177', 'w178', 'w179'], order: 3 },
  { id: 'b1-ch4', title: 'Gefühle & Meinungen', description: 'Expressing emotions, opinions and arguments', category: 'Personal', level: 'B1', wordIds: ['w180', 'w181', 'w182', 'w183', 'w184', 'w185', 'w186', 'w187', 'w188', 'w189', 'w190', 'w191'], order: 4 },
  { id: 'b1-ch5', title: 'Behörden & Dokumente', description: 'Dealing with administration and paperwork', category: 'Life', level: 'B1', wordIds: ['w192', 'w193', 'w194', 'w195', 'w196', 'w197', 'w198', 'w199', 'w200', 'w201', 'w202', 'w203'], order: 5 },
  { id: 'b1-ch6', title: 'Reisen & Urlaub vertieft', description: 'Travel details, booking and sightseeing', category: 'Travel', level: 'B1', wordIds: ['w204', 'w205', 'w206', 'w207', 'w208', 'w209', 'w210', 'w211', 'w212', 'w213', 'w214', 'w215'], order: 6 },
  { id: 'b1-ch7', title: 'Umwelt & Gesellschaft', description: 'Sustainability, politics and social issues', category: 'Society', level: 'B1', wordIds: ['w216', 'w217', 'w218', 'w219', 'w220', 'w221', 'w222', 'w223', 'w224', 'w225', 'w226', 'w227'], order: 7 },
  { id: 'b1-ch8', title: 'Medien & Kommunikation', description: 'Mass media, news and digital communication', category: 'Media', level: 'B1', wordIds: ['w228', 'w229', 'w230', 'w231', 'w232', 'w233', 'w234', 'w235', 'w236', 'w237', 'w238', 'w239'], order: 8 },

  // B2
  { id: 'b2-ch1', title: 'Komplexe Themen', description: 'Abstract concepts and advanced discussion', category: 'Advanced', level: 'B2', wordIds: ['w240', 'w241', 'w242', 'w243', 'w244', 'w245', 'w246', 'w247', 'w248', 'w249', 'w250', 'w251', 'w252', 'w253', 'w254', 'w255', 'w256', 'w257', 'w258', 'w259', 'w260', 'w261', 'w262', 'w263', 'w264', 'w265', 'w266', 'w267', 'w268', 'w269', 'w270', 'w271', 'w272', 'w273'], order: 1 },
]

export const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2']

export const levelMeta: Record<CEFRLevel, { title: string; description: string }> = {
  A1: { title: 'A1 – Beginner', description: 'Foundation: greetings, numbers, family, food, shopping, common words.' },
  A2: { title: 'A2 – Elementary', description: 'Practical topics: travel, work, health, hobbys and prefix patterns.' },
  B1: { title: 'B1 – Intermediate', description: 'Conversational fluency: home, profession, feelings, and social topics.' },
  B2: { title: 'B2 – Upper Intermediate', description: 'Complex texts and nuanced communication about abstract concepts.' },
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
