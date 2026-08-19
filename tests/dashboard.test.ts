/**
 * Tests for the dashboard renderer, especially how a persisted placement
 * snapshot shapes Continue Learning, the Quick Refresher list, and the
 * Smart Review hint.
 */

import { describe, expect, it } from 'vitest'
import { renderDashboard } from '../src/ui/dashboard'
import type { DashboardData } from '../src/ui/dashboard'
import { lessons, getLevels } from '../src/data/lessons'
import type { Level, PlacementSnapshot, ProfileState } from '../src/types'

const levels: Level[] = getLevels()
const levelsMinimal: Level[] = [
  {
    id: 'A1',
    title: 'A1 – Beginner',
    description: '',
    order: 1,
    chapters: [
      { id: 'a1-ch1', title: 'Greetings and Farewells', description: '', category: 'Basics', level: 'A1', wordIds: [], order: 1 },
      { id: 'a1-ch3', title: 'Family and Relationships', description: '', category: 'Personal', level: 'A1', wordIds: [], order: 3 },
    ],
  },
  {
    id: 'A2',
    title: 'A2 – Elementary',
    description: '',
    order: 2,
    chapters: [
      { id: 'a2-ch1', title: 'Travel and Transport', description: '', category: 'Travel', level: 'A2', wordIds: [], order: 1 },
    ],
  },
  {
    id: 'B1',
    title: 'B1 – Intermediate',
    description: '',
    order: 3,
    chapters: [
      { id: 'b1-ch1', title: 'Wohnung & Haushalt', description: '', category: 'Home', level: 'B1', wordIds: [], order: 1 },
    ],
  },
]

function buildProfile(overrides: Partial<ProfileState> = {}): ProfileState {
  const profile: ProfileState = {
    id: 'oliver',
    displayName: 'Oliver',
    createdAt: 0,
    l1: 'en',
    progress: {
      totalWordsLearned: 0,
      wordsByLevel: { A1: 0, A2: 0, B1: 0, B2: 0 },
      currentStreak: 0,
      longestStreak: 0,
      totalQuizCount: 0,
      averageAccuracy: 0,
      lastActive: Date.now(),
      dailyGoal: 10,
      todayLearned: 0,
    },
    levels: {
      A1: { levelId: 'A1', chapters: { 'a1-ch1': { chapterId: 'a1-ch1', levelId: 'A1', wordsLearned: 0, learnedWordIds: [], percent: 0 }, 'a1-ch3': { chapterId: 'a1-ch3', levelId: 'A1', wordsLearned: 0, learnedWordIds: [], percent: 0 } }, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false },
      A2: { levelId: 'A2', chapters: { 'a2-ch1': { chapterId: 'a2-ch1', levelId: 'A2', wordsLearned: 0, learnedWordIds: [], percent: 0 } }, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false },
      B1: { levelId: 'B1', chapters: { 'b1-ch1': { chapterId: 'b1-ch1', levelId: 'B1', wordsLearned: 0, learnedWordIds: [], percent: 0 } }, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false },
      B2: { levelId: 'B2', chapters: {}, completedChapters: [], totalWordsLearned: 0, percent: 0, started: false },
    },
    quizHistory: [],
    learnedWordIds: [],
    srsState: {},
    categoryStats: {},
    ...overrides,
  }
  return profile
}

function snapshot(overrides: Partial<PlacementSnapshot> = {}): PlacementSnapshot {
  return {
    recommendedLevel: 'A2',
    recommendedLevelIsApproximate: false,
    recommendedChapterId: 'a2-ch1',
    refresherIds: ['a1-ch3'],
    focusAreas: ['cases'],
    percentages: { A1: 100, A2: 80, B1: 40 },
    completedAt: 1700000000000,
    ...overrides,
  }
}

function data(profile: ProfileState): DashboardData {
  return { profile, levels: levelsMinimal, vocabulary: [], dueCount: 0 }
}

describe('renderDashboard', () => {
  it('shows the placement callout as a CTA when no snapshot exists', () => {
    const html = renderDashboard(data(buildProfile()))
    expect(html).toContain('NEW · PLACEMENT CHECK')
    expect(html).toContain('data-dashboard-action="placement"')
    expect(html).toContain('Find my level')
  })

  it('shows retake callout when a snapshot exists', () => {
    const html = renderDashboard(data(buildProfile({ placement: snapshot() })))
    expect(html).toContain('PLACEMENT CHECK · A2')
    expect(html).toContain('data-dashboard-action="retake-placement"')
    expect(html).toContain('Retake placement')
    expect(html).not.toContain('NEW · PLACEMENT CHECK')
  })

  it('flags the callout as approximate when the snapshot says so', () => {
    const html = renderDashboard(data(buildProfile({ placement: snapshot({ recommendedLevel: 'A2', recommendedLevelIsApproximate: true }) })))
    expect(html).toContain('PLACEMENT CHECK · A2 (approximate)')
  })

  it('uses the placement recommended chapter when no explicit nextChapterId is given', () => {
    const html = renderDashboard(data(buildProfile({ placement: snapshot({ recommendedChapterId: 'a2-ch1' }) })))
    expect(html).toContain('FROM YOUR PLACEMENT · CONTINUE LEARNING')
    expect(html).toContain('data-chapter-id="a2-ch1"')
    expect(html).toContain('Travel and Transport')
  })

  it('prefers an explicit nextChapterId over the placement recommendation', () => {
    const html = renderDashboard({
      ...data(buildProfile({ placement: snapshot({ recommendedChapterId: 'a2-ch1' }) })),
      nextChapterId: 'a1-ch3',
    })
    expect(html).not.toContain('FROM YOUR PLACEMENT · CONTINUE LEARNING')
    expect(html).toContain('CONTINUE LEARNING')
    expect(html).toContain('data-chapter-id="a1-ch3"')
    expect(html).toContain('Family and Relationships')
  })

  it('falls back to next-unfinished chapter when no placement exists', () => {
    const profile = buildProfile()
    profile.levels.A1.chapters['a1-ch1']!.percent = 50
    const html = renderDashboard(data(profile))
    expect(html).toContain('CONTINUE LEARNING')
    expect(html).toContain('data-chapter-id="a1-ch1"')
  })

  it('renders the quick refresher pills block from placement.refresherIds', () => {
    const html = renderDashboard(data(buildProfile({ placement: snapshot({ refresherIds: ['a1-ch3'] }) })))
    expect(html).toContain('FROM YOUR PLACEMENT · QUICK REFRESHERS')
    expect(html).toContain('Close small gaps first')
    expect(html).toContain('data-dashboard-action="refresher"')
    expect(html).toContain('data-chapter-id="a1-ch3"')
    expect(html).toContain('Family and Relationships')
  })

  it('skips the refresher block when the snapshot has none', () => {
    const html = renderDashboard(data(buildProfile({ placement: snapshot({ refresherIds: [] }) })))
    expect(html).not.toContain('FROM YOUR PLACEMENT · QUICK REFRESHERS')
    expect(html).not.toContain('data-dashboard-action="refresher"')
  })

  it('shows a Smart Review hint when focus areas include cases / articles / sentence-order', () => {
    const html = renderDashboard(data(buildProfile({
      placement: snapshot({ focusAreas: ['cases', 'articles'] }),
    })))
    expect(html).toContain('placement-review-hint')
    expect(html).toContain('cases, articles')
    expect(html).toContain('Smart Review will surface these first')
  })

  it('does not show a Smart Review hint for non-fundamental focus areas', () => {
    const html = renderDashboard(data(buildProfile({
      placement: snapshot({ focusAreas: ['listening', 'perfect-tense'] }),
    })))
    expect(html).not.toContain('placement-review-hint')
  })

  it('does not show a Smart Review hint when no placement exists', () => {
    const html = renderDashboard(data(buildProfile()))
    expect(html).not.toContain('placement-review-hint')
  })

  it('sanity-checks the snapshot percentage fields render in the callout', () => {
    const html = renderDashboard(data(buildProfile({
      placement: snapshot({ percentages: { A1: 100, A2: 80, B1: 40 } }),
    })))
    expect(html).toContain('A1 100%')
    expect(html).toContain('A2 80%')
    expect(html).toContain('B1 40%')
  })

  it('uses the lesson catalogue for known refresher ids (no orphan titles)', () => {
    const html = renderDashboard(data(buildProfile({
      placement: snapshot({ refresherIds: ['a1-ch3', 'a2-ch1'] }),
    })))
    expect(html).toContain('Family and Relationships')
    expect(html).toContain('Travel and Transport')
    // No raw id leakage.
    expect(html).not.toMatch(/>a1-ch3</)
  })

  it('falls back to the id as title for unknown refresher chapters', () => {
    const html = renderDashboard(data(buildProfile({
      placement: snapshot({ refresherIds: ['unknown-ch1'] }),
    })))
    expect(html).toContain('unknown-ch1')
  })
})

// Sanity check: lessons catalogue still matches the IDs we reference in tests.
// If this fails, the chapter ids in src/data/lessons.ts have drifted.
describe('lessons catalogue sanity', () => {
  it('exposes the chapter ids the dashboard tests rely on', () => {
    const ids = new Set(lessons.flatMap((l) => [l.id]))
    for (const id of ['a1-ch1', 'a1-ch3', 'a2-ch1', 'b1-ch1']) {
      expect(ids.has(id), `lessons catalogue missing ${id}`).toBe(true)
    }
  })

  it('builds the levels list in CEFR order', () => {
    expect(levels.map((l) => l.id)).toEqual(['A1', 'A2', 'B1', 'B2'])
  })
})