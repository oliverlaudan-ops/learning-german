import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import lesson from '../src/data/doctor-appointment-listening.json'
import { getLevels } from '../src/data/lessons'
import { createEmptyProfile, recordListeningResult, STORAGE_KEY } from '../src/state/state'
import type { AppState, ListeningResult } from '../src/types'
import { disposeDoctorListeningLesson, renderDoctorListeningLesson } from '../src/ui/doctor-listening-lesson'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-doctor-next]')

function arrangeSequence(): void {
  lesson.sequence.forEach((expected, targetIndex) => {
    let items = [...target.querySelectorAll<HTMLLIElement>('.listening-sequence li')]
    let currentIndex = items.findIndex(item => item.textContent?.includes(expected.text))
    while (currentIndex > targetIndex) {
      items[currentIndex].querySelector<HTMLButtonElement>('[data-move-up]')!.click()
      items = [...target.querySelectorAll<HTMLLIElement>('.listening-sequence li')]
      currentIndex = items.findIndex(item => item.textContent?.includes(expected.text))
    }
  })
}

beforeEach(() => {
  localStorage.clear()
  target = document.createElement('div')
  document.body.append(target)
})

afterEach(() => {
  disposeDoctorListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('advanced listening progress', () => {
  it('emits a scored result and shows a completion summary', () => {
    const onComplete = vi.fn()
    renderDoctorListeningLesson(target, vi.fn(), onComplete)

    advance()
    lesson.trueFalse.forEach((item, index) => {
      const answer = index === 0 ? !item.answer : item.answer
      click(`[name="tf-${index}"][value="${answer}"]`)
    })
    click('[data-true-false] [type="submit"]')

    advance()
    lesson.gaps.forEach((gap, index) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${index}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    click('[data-gaps] [type="submit"]')

    advance()
    arrangeSequence()
    click('[data-check-sequence]')
    advance()
    advance()

    expect(onComplete).toHaveBeenCalledOnce()
    const result = onComplete.mock.calls[0][0] as ListeningResult
    expect(result.lessonId).toBe(lesson.id)
    expect(result.chapterId).toBe(lesson.chapterId)
    expect(result.total).toBe(lesson.trueFalse.length + lesson.gaps.length + 1)
    expect(result.correct).toBe(result.total - 1)
    expect(result.tasks.sequence).toBe(true)
    expect(target.textContent).toContain('COMPREHENSION RESULT')
    expect(target.textContent).toContain(`${result.correct}/${result.total} correct`)
    expect(target.querySelector('[data-doctor-retry]')).not.toBeNull()
  })

  it('persists results on the active profile without requiring a state migration', () => {
    const levels = getLevels()
    const profile = createEmptyProfile('judith', 'Judith', levels)
    const state: AppState = { profiles: { judith: profile }, currentProfileId: 'judith' }
    const result: ListeningResult = {
      lessonId: 'doctor-appointment-v1',
      chapterId: 'a2-ch3',
      level: 'A2+',
      correct: 9,
      total: 11,
      accuracy: 82,
      tasks: {
        trueFalse: { correct: 4, total: 5 },
        gaps: { correct: 4, total: 5 },
        sequence: true,
      },
      completedAt: 123456,
    }

    recordListeningResult(state, result)

    expect(profile.listeningHistory).toEqual([result])
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as AppState
    expect(persisted.profiles.judith.listeningHistory).toEqual([result])
  })

  it('does not treat skipped comprehension tasks as wrong answers', () => {
    const onComplete = vi.fn()
    renderDoctorListeningLesson(target, vi.fn(), onComplete)
    advance(); advance(); advance(); advance(); advance()

    const result = onComplete.mock.calls[0][0] as ListeningResult
    expect(result.total).toBe(0)
    expect(result.accuracy).toBe(0)
    expect(target.textContent).toContain('No comprehension result yet')
  })
})
