export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2'

export interface VocabWord {
  id: string
  german: string
  translation: string
  article?: string
  plural?: string
  example?: string
  level: CEFRLevel | 'C1' | 'C2'
  category: string
  createdAt: number
}

/** A chapter is a learnable unit inside a CEFR level. Maps 1:1 to the legacy Lesson. */
export interface Chapter {
  id: string
  title: string
  description: string
  category: string
  level: CEFRLevel
  wordIds: string[]
  /** Sequence position inside the level (1-based). */
  order: number
}

/** A level groups chapters in CEFR order. */
export interface Level {
  id: CEFRLevel
  title: string
  description: string
  order: number
  chapters: Chapter[]
}

export interface QuizResult {
  chapterId: string
  levelId: CEFRLevel
  correct: number
  total: number
  accuracy: number
  completedAt: number
  timeSpent: number
}

export interface ChapterProgress {
  chapterId: string
  levelId: CEFRLevel
  /** Number of words in this chapter that the user has learned. */
  wordsLearned: number
  /** Word ids completed in this chapter. */
  learnedWordIds: string[]
  /** Percentage completion (0-100). */
  percent: number
  /** Timestamp of last quiz start for this chapter. */
  lastActive?: number
}

export interface LevelProgress {
  levelId: CEFRLevel
  chapters: Record<string, ChapterProgress>
  completedChapters: string[]
  totalWordsLearned: number
  percent: number
  /** Soft unlock: a level is considered started once the user enters it. */
  started: boolean
}

export interface UserProgress {
  totalWordsLearned: number
  wordsByLevel: Record<CEFRLevel, number>
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

export interface GrammarExercise {
  id: string
  type: 'article' | 'conjugation' | 'plural' | 'case' | 'preposition' | 'pronoun' | 'negation' | 'modal' | 'perfect' | 'prefix'
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  category: string
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

/** Legacy Lesson type kept for migration paths. A Chapter is the new concept. */
export interface Lesson extends Chapter {}
