import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import housingLesson from '../src/data/housing-search-listening.json'
import travelLesson from '../src/data/travel-disruption-listening.json'
import {
  disposeDoctorListeningLesson,
  housingListeningEntry,
  renderHousingListeningLesson,
} from '../src/ui/doctor-listening-lesson'
import { renderLearnExperience } from '../src/ui/lesson-ui'
import { getLevels } from '../src/data/lessons'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-doctor-next]')

beforeEach(() => {
  target = document.createElement('div')
  document.body.append(target)
  renderHousingListeningLesson(target, vi.fn())
})

afterEach(() => {
  disposeDoctorListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('housing search listening lesson', () => {
  it('is more demanding than the travel exercise', () => {
    expect(housingListeningEntry()).toContain('THREE SPEAKERS')
    expect(housingLesson.speechRate).toBeGreaterThan(travelLesson.speechRate)
    expect(new Set(housingLesson.lines.map(line => line.speaker))).toHaveLength(3)
    expect(housingLesson.lines.length).toBeGreaterThan(travelLesson.lines.length)
    expect(target.textContent).toContain(housingLesson.scenario)
    expect(target.textContent).not.toContain(housingLesson.lines[0].german)
    expect(target.textContent).toContain('Three different German voices')
  })

  it('gives direct, explanatory feedback for every true-or-false answer', () => {
    advance()
    housingLesson.trueFalse.forEach((item, index) => {
      const selected = index === 0 ? item.answer : !item.answer
      click(`[name="tf-${index}"][value="${selected}"]`)
    })
    click('[data-true-false] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(1)
    expect(target.querySelectorAll('.listening-feedback.retry')).toHaveLength(housingLesson.trueFalse.length - 1)
    expect(target.textContent).toContain('Painting delays the earliest move-in date')
  })

  it('checks six detailed gaps covering dates, costs and conditions', () => {
    advance(); advance()
    housingLesson.gaps.forEach((gap, index) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${index}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    click('[data-gaps] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(6)
    expect(target.textContent).toContain('einschließlich Heizung')
    expect(target.textContent).toContain('zwei Tage später')
  })

  it('lets the learner reconstruct both connected conversations', () => {
    advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-sequence li')).toHaveLength(housingLesson.sequence.length)
    housingLesson.sequence.forEach((expected, targetIndex) => {
      let items = [...target.querySelectorAll<HTMLLIElement>('.listening-sequence li')]
      let currentIndex = items.findIndex(item => item.textContent?.includes(expected.text))
      while (currentIndex > targetIndex) {
        items[currentIndex].querySelector<HTMLButtonElement>('[data-move-up]')!.click()
        items = [...target.querySelectorAll<HTMLLIElement>('.listening-sequence li')]
        currentIndex = items.findIndex(item => item.textContent?.includes(expected.text))
      }
    })
    click('[data-check-sequence]')
    expect(target.querySelector('[data-sequence-result]')!.textContent).toContain('Correct')
  })

  it('offers a full review and a scenario-specific completion summary', () => {
    advance(); advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-turns details')).toHaveLength(19)
    expect(target.querySelectorAll('[data-speak-practice]')).toHaveLength(6)
    expect(target.textContent).toContain('bis Freitagmittag')
    advance()
    expect(target.textContent).toContain(housingLesson.completionTitle)
    expect(target.textContent).toContain('separated old information from final arrangements')
  })

  it('is reachable from the course index and the B1 housing chapter', () => {
    const chapters = getLevels().flatMap(level => level.chapters)
    renderLearnExperience(target, chapters)
    click('[data-housing-listening-start]')
    expect(target.textContent).toContain(housingLesson.scenario)
    click('[data-doctor-exit]')
    click('[data-open-lesson="b1-ch1"]')
    expect(target.querySelector('[data-housing-listening-start]')).not.toBeNull()
  })
})
