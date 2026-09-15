import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import lesson from '../src/data/doctor-consultation-listening.json'
import { consultationListeningEntry, disposeDoctorListeningLesson, renderConsultationListeningLesson } from '../src/ui/doctor-listening-lesson'
import { renderLearnExperience } from '../src/ui/lesson-ui'
import { getLevels } from '../src/data/lessons'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-doctor-next]')

beforeEach(() => {
  target = document.createElement('div')
  document.body.append(target)
  renderConsultationListeningLesson(target, vi.fn())
})

afterEach(() => {
  disposeDoctorListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('doctor consultation listening lesson', () => {
  it('is a longer B1 exercise with a hidden transcript', () => {
    expect(consultationListeningEntry()).toContain('B1')
    expect(lesson.lines).toHaveLength(14)
    expect(target.textContent).toContain(lesson.scenario)
    expect(target.textContent).not.toContain(lesson.lines[0].german)
  })

  it('tests differences in symptom duration and medical advice', () => {
    advance()
    expect(target.textContent).toContain('all her symptoms for three days')
    lesson.trueFalse.forEach((item, index) => click(`[name="tf-${index}"][value="${item.answer}"]`))
    click('[data-true-false] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(6)
    expect(target.textContent).toContain('fever and headache began yesterday')
  })

  it('checks exact medicine language in five gaps', () => {
    advance(); advance()
    expect(target.querySelectorAll('[name^="gap-"]')).toHaveLength(5)
    lesson.gaps.forEach((gap, index) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${index}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    click('[data-gaps] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(5)
    expect(target.textContent).toContain('sechs Stunden')
  })

  it('allows all seven consultation events to be ordered', () => {
    advance(); advance(); advance()
    lesson.sequence.forEach((expected, targetIndex) => {
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

  it('provides fourteen review turns and five speaking prompts', () => {
    advance(); advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-turns details')).toHaveLength(14)
    expect(target.querySelectorAll('[data-speak-practice]')).toHaveLength(5)
    expect(target.textContent).toContain('Wie soll ich das Medikament einnehmen?')
    expect(target.textContent).toContain('Wenn')
  })

  it('finishes with a consultation-specific summary', () => {
    advance(); advance(); advance(); advance(); advance()
    expect(target.textContent).toContain('You understood a medical consultation')
    expect(target.textContent).toContain('medication instructions')
  })

  it('is reachable from the course index and A2 Health chapter', () => {
    const chapters = getLevels().flatMap(level => level.chapters)
    renderLearnExperience(target, chapters)
    click('[data-consultation-listening-start]')
    expect(target.textContent).toContain(lesson.scenario)
    click('[data-doctor-exit]')
    click('[data-open-lesson="a2-ch3"]')
    expect(target.querySelector('[data-consultation-listening-start]')).not.toBeNull()
  })
})
