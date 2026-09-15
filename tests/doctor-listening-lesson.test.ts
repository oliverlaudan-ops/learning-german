import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import lesson from '../src/data/doctor-appointment-listening.json'
import { disposeDoctorListeningLesson, doctorListeningEntry, renderDoctorListeningLesson } from '../src/ui/doctor-listening-lesson'
import { renderLearnExperience } from '../src/ui/lesson-ui'
import { getLevels } from '../src/data/lessons'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-doctor-next]')

beforeEach(() => {
  target = document.createElement('div')
  document.body.append(target)
  renderDoctorListeningLesson(target, vi.fn())
})

afterEach(() => {
  disposeDoctorListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('doctor appointment listening lesson', () => {
  it('starts without revealing the transcript', () => {
    expect(doctorListeningEntry()).toContain('A2+')
    expect(target.textContent).toContain(lesson.scenario)
    expect(target.textContent).not.toContain(lesson.lines[0].german)
    expect(target.querySelectorAll('.medical-progress li')).toHaveLength(5)
  })

  it('requires and scores every true-or-false answer', () => {
    advance()
    click('[data-true-false] [type="submit"]')
    expect(target.querySelector('[data-tf-result]')!.textContent).toContain('Answer every')
    lesson.trueFalse.forEach((item, index) => click(`[name="tf-${index}"][value="${item.answer}"]`))
    click('[data-true-false] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(lesson.trueFalse.length)
  })

  it('requires and scores every gap', () => {
    advance(); advance()
    click('[data-gaps] [type="submit"]')
    expect(target.querySelector('[data-gap-result]')!.textContent).toContain('Complete every')
    lesson.gaps.forEach((gap, index) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${index}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    click('[data-gaps] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(lesson.gaps.length)
  })

  it('lets the learner reorder and verify all events', () => {
    advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-sequence li')).toHaveLength(lesson.sequence.length)
    for (let pass = 0; pass < lesson.sequence.length; pass++) {
      for (const expected of lesson.sequence) {
        const items = [...target.querySelectorAll<HTMLLIElement>('.listening-sequence li')]
        const index = items.findIndex(item => item.textContent?.includes(expected.text))
        if (index > 0) items[index].querySelector<HTMLButtonElement>('[data-move-up]')!.click()
      }
    }
    click('[data-check-sequence]')
    expect(target.querySelector('[data-sequence-result]')!.textContent).toContain('Correct')
  })

  it('reveals twelve turns and four speaking prompts only in the final step', () => {
    advance(); advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-turns details')).toHaveLength(lesson.lines.length)
    expect(target.querySelectorAll('[data-speak-practice]')).toHaveLength(lesson.practice.length)
    expect(target.textContent).toContain('seit')
  })

  it('finishes without claiming to assess pronunciation', () => {
    const exit = vi.fn()
    renderDoctorListeningLesson(target, exit)
    advance(); advance(); advance(); advance(); advance()
    expect(target.textContent).toContain('PRACTICE COMPLETE')
    expect(target.textContent).not.toContain('pronunciation score')
    click('[data-doctor-done]')
    expect(exit).toHaveBeenCalledOnce()
  })

  it('is reachable from the course index and A2 health chapter', () => {
    const chapters = getLevels().flatMap(level => level.chapters)
    renderLearnExperience(target, chapters)
    click('[data-doctor-listening-start]')
    expect(target.querySelector('[data-stage-heading]')!.textContent).toContain('1. Listen')
    click('[data-doctor-exit]')
    click('[data-open-lesson="a2-ch3"]')
    expect(target.querySelector('[data-doctor-listening-start]')).not.toBeNull()
  })
})
