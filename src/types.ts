export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2'

export type L1Language = 'en'

export type QuizMode = 'de-en' | 'en-de' | 'audio-dictation' | 'sentence-completion' | 'type-sentence'

export interface VocabWord {
  id: string
  german: string
  translation: string
  article?: string
  plural?: string
  example?: string
  /** English translation of the example sentence. */
  exampleTranslation?: string
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
  /** Mode of the quiz that produced this result. */
  mode?: QuizMode
  /** Optional category filter used (e.g. weakness tracker drilling). */
  categoryFilter?: string
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

export type GrammarExerciseType =
  | 'article'
  | 'conjugation'
  | 'plural'
  | 'case'
  | 'preposition'
  | 'pronoun'
  | 'negation'
  | 'modal'
  | 'perfect'
  | 'prefix'
  | 'nebensatz'
  | 'präteritum'
  | 'konjunktiv2'
  | 'relativsatz'

export interface GrammarExercise {
  id: string
  type: GrammarExerciseType
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

/** Spaced-repetition (Leitner-Box) state for a single word. */
export interface SrsEntry {
  /** Box number 1..5. Higher = more confident. */
  box: number
  /** Next review timestamp (ms). */
  nextReviewAt: number
  /** Last review timestamp (ms). 0 if never reviewed. */
  lastReviewedAt: number
  /** Number of times the user has been correct in reviews. */
  correctCount: number
  /** Number of times the user has been wrong in reviews. */
  wrongCount: number
}

/** Per-category aggregate stats for the weakness tracker. */
export interface CategoryStat {
  correct: number
  total: number
}

/** A complete learner profile. All per-user data lives here. */
export interface ProfileState {
  id: string
  displayName: string
  createdAt: number
  l1: L1Language
  /** Legacy fields (kept for migration of single-profile state). */
  progress: UserProgress
  levels: Record<CEFRLevel, LevelProgress>
  quizHistory: QuizResult[]
  learnedWordIds: string[]
  srsState: Record<string, SrsEntry>
  categoryStats: Record<string, CategoryStat>
}

/** Root persisted shape: a dict of profiles + the active profile id. */
export interface AppState {
  profiles: Record<string, ProfileState>
  currentProfileId: string
}

/** Backward-compat shape: original flat structure. */
export interface LegacyState {
  progress?: UserProgress
  levels?: Record<CEFRLevel, LevelProgress>
  quizHistory?: QuizResult[]
  learnedWordIds?: string[]
  srsState?: Record<string, SrsEntry>
  categoryStats?: Record<string, CategoryStat>
  [k: string]: unknown
}

/** Legacy Lesson type kept for migration paths. A Chapter is the new concept. */
export interface Lesson extends Chapter {}