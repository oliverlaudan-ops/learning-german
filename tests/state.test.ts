/**
 * Tests for state persistence and migration.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  STORAGE_KEY,
  LEGACY_V2_KEY,
  LEGACY_V3_KEY,
  LEGACY_V4_KEY,
  loadState,
  saveState,
  savePlacementSnapshot,
  createEmptyProfile,
  defaultProgress,
  initialLevelProgress,
} from '../src/state/state'
import type { AppState, Level, PlacementSnapshot } from '../src/types'

const fakeLevels: Level[] = [
  {
    id: 'A1',
    title: 'A1',
    description: '',
    order: 1,
    chapters: [
      { id: 'a1-ch1', title: 'A1.1', description: '', category: 'x', level: 'A1', wordIds: ['w1'], order: 1 },
    ],
  },
  {
    id: 'A2',
    title: 'A2',
    description: '',
    order: 2,
    chapters: [],
  },
]

describe('defaultProgress', () => {
  it('starts with zeroed counters', () => {
    const p = defaultProgress()
    expect(p.totalWordsLearned).toBe(0)
    expect(p.wordsByLevel.A1).toBe(0)
    expect(p.dailyGoal).toBe(10)
  })
})

describe('createEmptyProfile', () => {
  it('builds a profile with empty per-level state', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    expect(profile.id).toBe('oliver')
    expect(profile.displayName).toBe('Oliver')
    expect(profile.levels.A1.chapters['a1-ch1']?.wordsLearned).toBe(0)
    expect(profile.levels.A2.chapters).toEqual({})
  })
})

describe('initialLevelProgress', () => {
  it('creates per-chapter zero entries', () => {
    const lp = initialLevelProgress(fakeLevels[0]!)
    expect(lp.chapters['a1-ch1']?.percent).toBe(0)
    expect(lp.completedChapters).toEqual([])
  })
})

describe('loadState / saveState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('writes to STORAGE_KEY and round-trips', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    const state: AppState = { profiles: { oliver: profile }, currentProfileId: 'oliver' }
    saveState(state)
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).toBeTruthy()
    const loaded = loadState({ levels: fakeLevels })
    expect(loaded.currentProfileId).toBe('oliver')
    expect(loaded.profiles['oliver']?.id).toBe('oliver')
  })

  it('migrates from v3 to v4', () => {
    const v3State = {
      profiles: {
        oliver: {
          id: 'oliver',
          displayName: 'Oliver',
          createdAt: 0,
          l1: 'en',
          progress: defaultProgress(),
          levels: { A1: { levelId: 'A1', chapters: {}, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false } as never, A2: { levelId: 'A2', chapters: {}, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false } as never, B1: { levelId: 'B1', chapters: {}, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false } as never, B2: { levelId: 'B2', chapters: {}, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false } as never },
          quizHistory: [],
          learnedWordIds: ['w1'],
          srsState: {},
          categoryStats: {},
        },
      },
      currentProfileId: 'oliver',
    }
    localStorage.setItem(LEGACY_V3_KEY, JSON.stringify(v3State))
    const loaded = loadState({ levels: fakeLevels })
    expect(loaded.profiles['oliver']?.learnedWordIds).toEqual(['w1'])
    // v3 key should be cleaned up
    expect(localStorage.getItem(LEGACY_V3_KEY)).toBeNull()
    // v4 key should hold the migrated state
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('migrates from v4 to v5 (placement field is optional)', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    const v4State = { profiles: { oliver: profile }, currentProfileId: 'oliver' }
    localStorage.setItem(LEGACY_V4_KEY, JSON.stringify(v4State))
    const loaded = loadState({ levels: fakeLevels })
    expect(loaded.profiles['oliver']?.id).toBe('oliver')
    expect(loaded.profiles['oliver']?.placement).toBeUndefined()
    expect(localStorage.getItem(LEGACY_V4_KEY)).toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('migrates from v2 flat shape', () => {
    const v2State = {
      progress: { ...defaultProgress(), totalWordsLearned: 5 },
      levels: {},
      quizHistory: [],
      learnedWordIds: ['w1', 'w2'],
      srsState: {},
      categoryStats: {},
    }
    localStorage.setItem(LEGACY_V2_KEY, JSON.stringify(v2State))
    const loaded = loadState({ levels: fakeLevels })
    expect(loaded.profiles['oliver']?.learnedWordIds).toEqual(['w1', 'w2'])
    expect(loaded.profiles['oliver']?.progress.totalWordsLearned).toBe(5)
  })

  it('creates a fresh profile when no state exists', () => {
    const loaded = loadState({ levels: fakeLevels })
    expect(loaded.currentProfileId).toBe('oliver')
    expect(Object.keys(loaded.profiles)).toContain('oliver')
  })
})

describe('savePlacementSnapshot', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persists a snapshot on the current profile', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    const state: AppState = { profiles: { oliver: profile }, currentProfileId: 'oliver' }
    const snapshot: PlacementSnapshot = {
      recommendedLevel: 'A2',
      recommendedLevelIsApproximate: false,
      recommendedChapterId: 'a2-ch1',
      refresherIds: ['a1-ch3'],
      focusAreas: ['cases'],
      percentages: { A1: 100, A2: 80, B1: 40 },
      completedAt: 1700000000000,
    }
    const next = savePlacementSnapshot(state, snapshot)
    expect(next.profiles['oliver']?.placement).toEqual(snapshot)
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(raw!) as AppState
    expect(parsed.profiles['oliver']?.placement?.recommendedChapterId).toBe('a2-ch1')
  })

  it('overwrites an existing snapshot (retake replaces)', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    const first: PlacementSnapshot = {
      recommendedLevel: 'A2',
      recommendedLevelIsApproximate: false,
      recommendedChapterId: 'a2-ch1',
      refresherIds: [],
      focusAreas: [],
      percentages: { A1: 100, A2: 80, B1: 40 },
      completedAt: 1700000000000,
    }
    const second: PlacementSnapshot = {
      ...first,
      recommendedLevel: 'B1',
      recommendedChapterId: 'b1-ch1',
      completedAt: 1800000000000,
    }
    let state: AppState = { profiles: { oliver: profile }, currentProfileId: 'oliver' }
    state = savePlacementSnapshot(state, first)
    state = savePlacementSnapshot(state, second)
    expect(state.profiles['oliver']?.placement?.recommendedLevel).toBe('B1')
    expect(state.profiles['oliver']?.placement?.completedAt).toBe(1800000000000)
  })

  it('leaves other profile fields intact', () => {
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    profile.learnedWordIds = ['w1', 'w2']
    profile.progress.totalWordsLearned = 7
    let state: AppState = { profiles: { oliver: profile }, currentProfileId: 'oliver' }
    state = savePlacementSnapshot(state, {
      recommendedLevel: 'A2',
      recommendedLevelIsApproximate: false,
      recommendedChapterId: 'a2-ch1',
      refresherIds: [],
      focusAreas: [],
      percentages: { A1: 100, A2: 80, B1: 40 },
      completedAt: 1700000000000,
    })
    expect(state.profiles['oliver']?.learnedWordIds).toEqual(['w1', 'w2'])
    expect(state.profiles['oliver']?.progress.totalWordsLearned).toBe(7)
  })

  it('returns the same state reference when the active profile is missing', () => {
    const state: AppState = { profiles: {}, currentProfileId: 'ghost' }
    const next = savePlacementSnapshot(state, {
      recommendedLevel: 'A1',
      recommendedLevelIsApproximate: false,
      recommendedChapterId: 'a1-ch1',
      refresherIds: [],
      focusAreas: [],
      percentages: { A1: 0, A2: 0, B1: 0 },
      completedAt: 1700000000000,
    })
    expect(next).toBe(state)
  })
})
