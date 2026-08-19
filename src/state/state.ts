/**
 * AppState types, persistence, and migrations.
 *
 * State shape lives in `types.ts`. This module owns the storage key, the
 * load/save pair, and v2→v3, v3→v4 and v4→v5 migration paths.
 */

import type {
  AppState,
  CEFRLevel,
  LegacyState,
  Level,
  LevelProgress,
  PlacementSnapshot,
  ProfileState,
  UserProgress,
} from '../types'

/** Current storage key. Bump suffix when changing the on-disk shape. */
export const STORAGE_KEY = 'learning-german-v5-state'
/** Previous shape — kept for one-shot migration on first load. */
export const LEGACY_V4_KEY = 'learning-german-v4-state'
/** Older shape (single AppState, no profiles). */
export const LEGACY_V3_KEY = 'learning-german-v3-state'
/** Oldest shape (flat state, no profiles). */
export const LEGACY_V2_KEY = 'learning-german-v2-state'

// ---------------------------------------------------------------------------
// Initial value factories
// ---------------------------------------------------------------------------

export function defaultProgress(): UserProgress {
  return {
    totalWordsLearned: 0,
    wordsByLevel: { A1: 0, A2: 0, B1: 0, B2: 0 },
    currentStreak: 0,
    longestStreak: 0,
    totalQuizCount: 0,
    averageAccuracy: 0,
    lastActive: Date.now(),
    dailyGoal: 10,
    todayLearned: 0,
  }
}

export function initialLevelProgress(level: Level): LevelProgress {
  return {
    levelId: level.id,
    chapters: Object.fromEntries(
      level.chapters.map((ch) => [
        ch.id,
        {
          chapterId: ch.id,
          levelId: ch.level,
          wordsLearned: 0,
          learnedWordIds: [],
          percent: 0,
        },
      ]),
    ),
    completedChapters: [],
    totalWordsLearned: 0,
    percent: 0,
    started: false,
  }
}

export function createEmptyProfile(id: string, name: string, levels: Level[]): ProfileState {
  const out: Partial<Record<CEFRLevel, LevelProgress>> = {}
  for (const level of levels) {
    out[level.id] = initialLevelProgress(level)
  }
  return {
    id,
    displayName: name,
    createdAt: Date.now(),
    l1: 'en',
    progress: defaultProgress(),
    levels: out as Record<CEFRLevel, LevelProgress>,
    quizHistory: [],
    learnedWordIds: [],
    srsState: {},
    categoryStats: {},
  }
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

/**
 * v4 already uses the { profiles, currentProfileId } shape. v5 only adds an
 * optional `placement` field per profile, so v4 data migrates by simply
 * re-writing under the new key — the field is omitted until the learner
 * completes a placement check.
 */
function migrateV4ToV5(raw: LegacyState): AppState | null {
  if (!raw || typeof raw !== 'object') return null
  if (!('profiles' in raw) || !('currentProfileId' in raw)) return null
  return raw as unknown as AppState
}

/**
 * v3 stored a single `AppState` (profiles + currentProfileId).
 * The shape is identical to v4; we just re-write the key.
 */
function migrateV3ToV4(raw: LegacyState): AppState | null {
  if (!raw || typeof raw !== 'object') return null
  if (!('profiles' in raw) || !('currentProfileId' in raw)) return null
  return raw as unknown as AppState
}

/**
 * v2 stored a flat shape (no profiles). Wrap it in a single default profile.
 */
function migrateV2ToV4(raw: LegacyState, levels: Level[]): AppState | null {
  if (!raw || typeof raw !== 'object') return null
  const profile = createEmptyProfile('oliver', 'Oliver', levels)
  if (raw.progress) profile.progress = { ...defaultProgress(), ...raw.progress }
  if (raw.levels) profile.levels = raw.levels as Record<CEFRLevel, LevelProgress>
  if (Array.isArray(raw.quizHistory)) profile.quizHistory = raw.quizHistory
  if (Array.isArray(raw.learnedWordIds)) profile.learnedWordIds = raw.learnedWordIds
  if (raw.srsState && typeof raw.srsState === 'object') profile.srsState = raw.srsState as ProfileState['srsState']
  if (raw.categoryStats && typeof raw.categoryStats === 'object') profile.categoryStats = raw.categoryStats as ProfileState['categoryStats']
  return { profiles: { oliver: profile }, currentProfileId: 'oliver' }
}

// ---------------------------------------------------------------------------
// Placement write-back
// ---------------------------------------------------------------------------

/**
 * Persist a placement snapshot on the current profile. The caller (the
 * placement UI) supplies the full snapshot so this module stays free of
 * evaluation logic.
 */
export function savePlacementSnapshot(state: AppState, snapshot: PlacementSnapshot): AppState {
  const profile = state.profiles[state.currentProfileId]
  if (!profile) return state
  const next: AppState = {
    ...state,
    profiles: {
      ...state.profiles,
      [profile.id]: {
        ...profile,
        placement: snapshot,
      },
    },
  }
  saveState(next)
  return next
}

// ---------------------------------------------------------------------------
// Load / save
// ---------------------------------------------------------------------------

export interface LoadOptions {
  levels: Level[]
}

export function loadState(opts: LoadOptions): AppState {
  // 1) Try current key (v5)
  const current = readKey<LegacyState>(STORAGE_KEY)
  if (current && typeof current === 'object' && 'profiles' in current && 'currentProfileId' in current) {
    return current as unknown as AppState
  }

  // 2) Try v4
  const v4 = readKey<LegacyState>(LEGACY_V4_KEY)
  if (v4) {
    const migrated = migrateV4ToV5(v4)
    if (migrated) {
      saveState(migrated)
      try { localStorage.removeItem(LEGACY_V4_KEY) } catch { /* ignore */ }
      return migrated
    }
  }

  // 3) Try v3
  const v3 = readKey<LegacyState>(LEGACY_V3_KEY)
  if (v3) {
    const migrated = migrateV3ToV4(v3)
    if (migrated) {
      saveState(migrated)
      try { localStorage.removeItem(LEGACY_V3_KEY) } catch { /* ignore */ }
      return migrated
    }
  }

  // 4) Try v2
  const v2 = readKey<LegacyState>(LEGACY_V2_KEY)
  if (v2) {
    const migrated = migrateV2ToV4(v2, opts.levels)
    if (migrated) {
      saveState(migrated)
      try { localStorage.removeItem(LEGACY_V2_KEY) } catch { /* ignore */ }
      return migrated
    }
  }

  // 5) Fresh start
  const firstProfile = createEmptyProfile('oliver', 'Oliver', opts.levels)
  const fresh: AppState = { profiles: { oliver: firstProfile }, currentProfileId: 'oliver' }
  saveState(fresh)
  return fresh
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    // Quota or private-mode failure — log but don't crash the app.
    console.error('Failed to persist app state:', err)
  }
}

function readKey<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}