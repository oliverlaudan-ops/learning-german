import type { Lesson } from '../types'

export const lessons: Lesson[] = [
  { id: 'lesson-1', title: 'Greetings and Farewells', description: 'Basic greetings and goodbye phrases', category: 'Basics', level: 'A1', wordIds: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'], order: 1 },
  { id: 'lesson-2', title: 'Numbers', description: 'Numbers from 1 to 10', category: 'Basics', level: 'A1', wordIds: ['w9', 'w10', 'w11', 'w12', 'w13', 'w14', 'w15', 'w16', 'w17', 'w18'], order: 2 },
  { id: 'lesson-3', title: 'Family and Relationships', description: 'Family members and relationships', category: 'Personal', level: 'A1', wordIds: ['w19', 'w20', 'w21', 'w22', 'w23'], order: 3 },
  { id: 'lesson-4', title: 'Food and Drink', description: 'Food, beverages and meals', category: 'Food', level: 'A1', wordIds: ['w24', 'w25', 'w26', 'w27', 'w28', 'w29', 'w30'], order: 4 },
  { id: 'lesson-5', title: 'Shopping', description: 'At the supermarket and market', category: 'Daily Life', level: 'A1', wordIds: [], order: 5 },
  { id: 'lesson-6', title: 'Travel and Transport', description: 'Train station, airport, public transport', category: 'Travel', level: 'A2', wordIds: [], order: 6 },
  { id: 'lesson-7', title: 'Work and Profession', description: 'Jobs, workplace, business language', category: 'Work', level: 'A2', wordIds: [], order: 7 },
  { id: 'lesson-8', title: 'Health', description: 'Body, illnesses, at the doctor', category: 'Health', level: 'A2', wordIds: [], order: 8 },
]
