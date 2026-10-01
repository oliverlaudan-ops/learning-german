import { afterEach, describe, expect, it } from 'vitest'
import { disposeDoctorListeningLesson, renderComplaintListeningLesson, complaintListeningEntry } from '../src/ui/doctor-listening-lesson'
import lesson from '../src/data/complaint-delivery-listening.json'
import type { ListeningResult } from '../src/types'

afterEach(() => disposeDoctorListeningLesson())
describe('German B1 complaint lesson', () => {
  it('checks gaps and event order, emits a score, and supports retry', () => {
    const target = document.createElement('div')
    let saved: ListeningResult | undefined
    renderComplaintListeningLesson(target, () => {}, result => { saved = result })
    const next = () => target.querySelector<HTMLButtonElement>('[data-doctor-next]')!.click()
    expect(complaintListeningEntry()).toContain('data-complaint-listening-start')
    expect(target.textContent).toContain('Eine beschädigte Lieferung reklamieren')
    next()
    expect(target.textContent).toContain('Der Kundenservice garantiert')
    next()
    const submit = () => target.querySelector<HTMLFormElement>('[data-gaps]')!.dispatchEvent(new Event('submit', { cancelable: true }))
    submit()
    expect(target.textContent).toContain('Ergänze zuerst alle Lücken.')
    lesson.gaps.forEach((gap, i) => {
      const select = target.querySelector<HTMLSelectElement>(`[name="gap-${i}"]`)!
      select.value = gap.answer
      select.dispatchEvent(new Event('change'))
    })
    submit()
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(lesson.gaps.length)
    expect(target.textContent).toContain('✓ Richtig.')
    next()
    target.querySelector<HTMLButtonElement>('[data-check-sequence]')!.click()
    expect(target.textContent).toContain('Noch nicht ganz.')
    lesson.sequence.forEach((item, i) => {
      const currentIndex = () => Array.from(target.querySelectorAll('[data-move-up]')).findIndex(button => (button as HTMLElement).dataset.moveUp === item.id)
      while (currentIndex() > i) target.querySelector<HTMLButtonElement>(`[data-move-up="${item.id}"]`)!.click()
    })
    target.querySelector<HTMLButtonElement>('[data-check-sequence]')!.click()
    expect(target.textContent).toContain('Das ist die Reihenfolge im Gespräch.')
    next()
    expect(target.textContent).toContain('freie Schreibübung ohne automatische Bewertung')
    next()
    expect(saved?.lessonId).toBe(lesson.id)
    expect(saved?.total).toBe(lesson.gaps.length + 1)
    expect(saved?.accuracy).toBe(100)
    expect(saved?.tasks.trueFalse).toBeUndefined()
    expect(target.textContent).toContain('nicht geprüft')
    target.querySelector<HTMLButtonElement>('[data-doctor-retry]')!.click()
    expect(target.querySelector('[data-stage-heading]')?.textContent).toContain('Hören')
  })
})
