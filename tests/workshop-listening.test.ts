import { describe, expect, it, afterEach } from 'vitest'
import { renderWorkshopListeningLesson, disposeDoctorListeningLesson } from '../src/ui/doctor-listening-lesson'
import lesson from '../src/data/workshop-planning-listening.json'
import type { ListeningResult } from '../src/types'

afterEach(() => disposeDoctorListeningLesson())
describe('German B1 workshop lesson', () => {
  it('uses German instructions, checks answers and keeps scoring intact', () => {
    const target = document.createElement('div')
    let saved: ListeningResult | undefined
    renderWorkshopListeningLesson(target, () => {}, result => { saved = result })
    const next = () => target.querySelector<HTMLButtonElement>('[data-doctor-next]')!.click()
    expect(target.textContent).toContain('Ganzes Gespräch abspielen')
    next()
    expect(target.textContent).toContain('Entscheide, ob die Aussagen')
    target.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(target.textContent).toContain('Beantworte zuerst alle Aussagen.')
    lesson.trueFalse.forEach((item, index) => {
      const input = target.querySelector<HTMLInputElement>(`[name="tf-${index}"][value="${item.answer}"]`)!
      input.checked = true
      input.dispatchEvent(new Event('change'))
    })
    target.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit', { cancelable: true }))
    expect(target.querySelectorAll('.listening-feedback.correct')).toHaveLength(lesson.trueFalse.length)
    expect(target.textContent).toContain('✓ Richtig.')
    next()
    expect(target.textContent).toContain('Ergänze den Satz')
    next()
    expect(target.textContent).toContain('Reihenfolge prüfen')
    next()
    expect(target.textContent).toContain('ohne automatische Bewertung')
    next()
    expect(saved?.correct).toBe(lesson.trueFalse.length)
    expect(saved?.total).toBe(lesson.trueFalse.length)
    expect(target.textContent).toContain('ERGEBNIS HÖRVERSTEHEN')
    expect(target.textContent).toContain('nicht geprüft')
    expect(target.textContent).not.toContain('not checked')
  })
})
