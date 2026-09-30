import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { lessons, getLevels } from '../src/data/lessons'
import { getLessonContent } from '../src/data/lesson-content'
import { createEmptyProfile, recordGuidedLessonCompletion, STORAGE_KEY } from '../src/state/state'
import type { AppState } from '../src/types'
import { renderGuidedSession } from '../src/ui/lesson-session'

let target: HTMLDivElement

beforeEach(() => {
  localStorage.clear()
  target = document.createElement('div')
  document.body.append(target)
})

afterEach(() => {
  target.remove()
  vi.restoreAllMocks()
  delete (window as unknown as { startQuiz?: unknown }).startQuiz
})

describe('engagement upgrade', () => {
  it('turns existing travel phrases into contextual Real German retrieval practice', () => {
    const chapter = lessons.find((item) => item.id === 'a2-ch1')!
    const content = getLessonContent(chapter.id)!

    renderGuidedSession(target, chapter, 'Real German', 'Judith')

    expect(target.textContent).toContain('Use German in Travel and Transport')
    expect(target.textContent).toContain('retrieval practice')
    expect(target.textContent).toContain(content.communication[0]!.english)
    expect(target.textContent).toContain(content.communication[0]!.german)
    expect(target.textContent).not.toContain('Imagine you meet someone for the first time')
  })

  it('uses different communication phrases across Listen, Build and Speak', () => {
    const chapter = lessons.find((item) => item.id === 'a2-ch1')!
    const content = getLessonContent(chapter.id)!

    renderGuidedSession(target, chapter, 'Listen', 'Judith')
    expect(target.textContent).toContain(content.communication[0]!.german)

    renderGuidedSession(target, chapter, 'Build', 'Judith')
    expect(target.querySelector('[data-builder]')?.getAttribute('data-expected')).toBe(content.communication[1]!.german)

    renderGuidedSession(target, chapter, 'Speak', 'Judith')
    expect(target.textContent).toContain(content.communication[2]!.german)
  })

  it('emits guided completion only when the learner reaches the Review step', () => {
    const chapter = lessons.find((item) => item.id === 'a2-ch1')!
    const onComplete = vi.fn()
    ;(window as unknown as { startQuiz?: ReturnType<typeof vi.fn> }).startQuiz = vi.fn()

    renderGuidedSession(target, chapter, 'Review', 'Judith', onComplete)
    target.querySelector<HTMLButtonElement>('[data-guided-review]')!.click()

    expect(onComplete).toHaveBeenCalledWith('a2-ch1')
  })

  it('persists guided completions without a storage migration', () => {
    const profile = createEmptyProfile('judith', 'Judith', getLevels())
    const state: AppState = { profiles: { judith: profile }, currentProfileId: 'judith' }

    recordGuidedLessonCompletion(state, { chapterId: 'a2-ch1', completedAt: 123456 })

    expect(profile.guidedLessonHistory).toEqual([{ chapterId: 'a2-ch1', completedAt: 123456 }])
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as AppState
    expect(persisted.profiles.judith.guidedLessonHistory).toEqual([{ chapterId: 'a2-ch1', completedAt: 123456 }])
  })
})
