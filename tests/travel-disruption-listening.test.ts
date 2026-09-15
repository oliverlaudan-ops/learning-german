import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import lesson from '../src/data/travel-disruption-listening.json'
import { disposeDoctorListeningLesson, renderTravelListeningLesson, selectGermanVoices, travelListeningEntry } from '../src/ui/doctor-listening-lesson'
import { renderLearnExperience } from '../src/ui/lesson-ui'
import { getLevels } from '../src/data/lessons'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-doctor-next]')

beforeEach(() => {
  target = document.createElement('div')
  document.body.append(target)
  renderTravelListeningLesson(target, vi.fn())
})

afterEach(() => {
  disposeDoctorListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('travel disruption listening lesson', () => {
  it('starts as a faster two-voice B1 exercise with hidden details', () => {
    expect(travelListeningEntry()).toContain('TWO VOICES')
    expect(lesson.speechRate).toBeGreaterThan(1)
    expect(lesson.useTwoVoices).toBe(true)
    expect(target.textContent).toContain(lesson.scenario)
    expect(target.textContent).not.toContain(lesson.lines[0].german)
    expect(target.textContent).toContain('Two different German voices')
    expect(target.querySelector<HTMLSelectElement>('[data-doctor-speed]')!.value).toBe('1.08')
  })

  it('prefers available German voices and preserves a fallback', () => {
    const english = { lang: 'en-US', name: 'English' } as SpeechSynthesisVoice
    const germanOne = { lang: 'de-DE', name: 'German one' } as SpeechSynthesisVoice
    const germanTwo = { lang: 'de-AT', name: 'German two' } as SpeechSynthesisVoice
    expect(selectGermanVoices([english, germanOne, germanTwo])).toEqual([germanOne, germanTwo])
    expect(selectGermanVoices([english])).toEqual([english])
  })

  it('uses plausible wrong trains, times and platforms as distractors', () => {
    advance()
    expect(target.textContent).toContain('14:48 ICE')
    expect(target.textContent).toContain('platform 7')
    lesson.trueFalse.forEach((item, index) => click(`[name="tf-${index}"][value="${item.answer}"]`))
    click('[data-true-false] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(6)
    expect(target.textContent).toContain('cancelled')
  })

  it('checks the final valid travel details in five gaps', () => {
    advance(); advance()
    lesson.gaps.forEach((gap, index) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${index}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    click('[data-gaps] [type="submit"]')
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(5)
    expect(target.textContent).toContain('Gleis zwölf')
    expect(target.textContent).toContain('ursprüngliche Fahrkarte')
  })

  it('allows eight travel events to be put in order', () => {
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

  it('provides fourteen review turns, five speaking prompts and a travel summary', () => {
    advance(); advance(); advance(); advance()
    expect(target.querySelectorAll('.listening-turns details')).toHaveLength(14)
    expect(target.querySelectorAll('[data-speak-practice]')).toHaveLength(5)
    expect(target.textContent).toContain('nicht Gleis elf')
    advance()
    expect(target.textContent).toContain('You solved a disrupted journey')
    expect(target.textContent).toContain('platform change')
  })

  it('is reachable from the course index and A2 Travel chapter', () => {
    const chapters = getLevels().flatMap(level => level.chapters)
    renderLearnExperience(target, chapters)
    click('[data-travel-listening-start]')
    expect(target.textContent).toContain(lesson.scenario)
    click('[data-doctor-exit]')
    click('[data-open-lesson="a2-ch1"]')
    expect(target.querySelector('[data-travel-listening-start]')).not.toBeNull()
  })
})
