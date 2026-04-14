import type { Achievement } from '../types'

export const achievements: Achievement[] = [
  // Streak Achievements
  {
    id: 'streak-1',
    title: 'Getting Started',
    description: 'Learn for 1 day in a row',
    icon: '🌱',
    condition: (p) => p.currentStreak >= 1,
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'streak-3',
    title: 'On Fire',
    description: '3 day streak',
    icon: '🔥',
    condition: (p) => p.currentStreak >= 3,
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: '7 day streak',
    icon: '⚔️',
    condition: (p) => p.currentStreak >= 7,
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: '30 day streak',
    icon: '👑',
    condition: (p) => p.currentStreak >= 30,
    unlocked: false,
    category: 'streak',
  },
  
  // Learning Achievements
  {
    id: 'learn-10',
    title: 'First Steps',
    description: 'Learn 10 words',
    icon: '📚',
    condition: (p) => p.totalWordsLearned >= 10,
    unlocked: false,
    category: 'learning',
  },
  {
    id: 'learn-25',
    title: 'Vocabulary Builder',
    description: 'Learn 25 words',
    icon: '📖',
    condition: (p) => p.totalWordsLearned >= 25,
    unlocked: false,
    category: 'learning',
  },
  {
    id: 'learn-50',
    title: 'Word Collector',
    description: 'Learn 50 words',
    icon: '🎯',
    condition: (p) => p.totalWordsLearned >= 50,
    unlocked: false,
    category: 'learning',
  },
  {
    id: 'learn-100',
    title: 'Century Club',
    description: 'Learn 100 words',
    icon: '💯',
    condition: (p) => p.totalWordsLearned >= 100,
    unlocked: false,
    category: 'learning',
  },
  
  // Quiz Achievements
  {
    id: 'quiz-1',
    title: 'First Quiz',
    description: 'Complete your first quiz',
    icon: '✅',
    condition: (p) => p.totalQuizCount >= 1,
    unlocked: false,
    category: 'quiz',
  },
  {
    id: 'quiz-10',
    title: 'Quiz Enthusiast',
    description: 'Complete 10 quizzes',
    icon: '🎮',
    condition: (p) => p.totalQuizCount >= 10,
    unlocked: false,
    category: 'quiz',
  },
  {
    id: 'quiz-50',
    title: 'Quiz Master',
    description: 'Complete 50 quizzes',
    icon: '🏆',
    condition: (p) => p.totalQuizCount >= 50,
    unlocked: false,
    category: 'quiz',
  },
  
  // Accuracy Achievements
  {
    id: 'accuracy-50',
    title: 'Halfway There',
    description: 'Achieve 50% average accuracy',
    icon: '🎯',
    condition: (p) => p.averageAccuracy >= 50,
    unlocked: false,
    category: 'accuracy',
  },
  {
    id: 'accuracy-75',
    title: 'Sharp Shooter',
    description: 'Achieve 75% average accuracy',
    icon: '🏹',
    condition: (p) => p.averageAccuracy >= 75,
    unlocked: false,
    category: 'accuracy',
  },
  {
    id: 'accuracy-90',
    title: 'Perfect Student',
    description: 'Achieve 90% average accuracy',
    icon: '⭐',
    condition: (p) => p.averageAccuracy >= 90,
    unlocked: false,
    category: 'accuracy',
  },
  
  // Special Achievements
  {
    id: 'special-perfect',
    title: 'Flawless Victory',
    description: 'Get 100% on a quiz with 10+ questions',
    icon: '✨',
    condition: (p) => p.quizHistory.some(q => q.accuracy === 100 && q.total >= 10),
    unlocked: false,
    category: 'special',
  },
  {
    id: 'special-comeback',
    title: 'Comeback Kid',
    description: 'Get 100% on a quiz after scoring below 50%',
    icon: '🦄',
    condition: (p) => {
      const hasBad = p.quizHistory.some(q => q.accuracy < 50)
      const hasPerfect = p.quizHistory.some(q => q.accuracy === 100)
      return hasBad && hasPerfect
    },
    unlocked: false,
    category: 'special',
  },
  {
    id: 'special-marathon',
    title: 'Marathon Runner',
    description: 'Complete a 20-question quiz',
    icon: '🏃',
    condition: (p) => p.quizHistory.some(q => q.total >= 20),
    unlocked: false,
    category: 'special',
  },
]
