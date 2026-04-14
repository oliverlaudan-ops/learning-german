export interface VocabWord {
  id: string
  german: string
  translation: string
  article?: string
  plural?: string
  example?: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: string
  createdAt: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  category: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  wordIds: string[]
  order: number
}

export interface QuizResult {
  lessonId: string
  correct: number
  total: number
  accuracy: number
  completedAt: number
  timeSpent: number
}

export interface UserProgress {
  totalWordsLearned: number
  wordsByLevel: Record<string, number>
  currentStreak: number
  longestStreak: number
  totalQuizCount: number
  averageAccuracy: number
  lastActive: number
  dailyGoal: number
  todayLearned: number
}

export interface GrammarRule {
  id: string
  title: string
  description: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: string
  examples: GrammarExample[]
}

export interface GrammarExample {
  german: string
  english: string
  explanation?: string
}

export interface GlossaryTerm {
  id: string
  term: string
  translation: string
  explanation: string
  examples: string[]
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (progress: UserProgress & { quizHistory: QuizResult[] }) => boolean
  unlocked: boolean
  unlockedAt?: number
  category: 'streak' | 'learning' | 'quiz' | 'accuracy' | 'special'
}
