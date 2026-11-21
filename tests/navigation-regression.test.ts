import { afterEach, describe, expect, it } from 'vitest'
import { initApp } from '../src/ui/ui'
import { enhanceDashboard } from '../src/ui/dashboard-bootstrap'

describe('primary navigation', () => {
  afterEach(() => { document.body.innerHTML = '' })

  it('keeps every area accessible after returning to the dashboard', () => {
    document.body.innerHTML = '<div id="app"></div>'
    initApp()
    enhanceDashboard()
    const expected = ['dashboard', 'exam', 'reading', 'adverbs', 'review', 'learn', 'pronunciation', 'practice', 'stats']
    const assertTabs = () => {
      for (const name of expected) {
        expect(document.querySelectorAll(`.tab[data-tab="${name}"]`)).toHaveLength(1)
        expect(document.getElementById(`${name}-tab`)).not.toBeNull()
      }
    }
    assertTabs()
    document.querySelector<HTMLButtonElement>('[data-tab="reading"]')!.click()
    expect(document.getElementById('reading-tab')!.textContent).toContain('Lesen verstehen')
    document.querySelector<HTMLButtonElement>('[data-tab="dashboard"]')!.click()
    assertTabs()
    document.querySelector<HTMLButtonElement>('[data-tab="adverbs"]')!.click()
    expect(document.getElementById('adverbs-tab')!.textContent).toContain('Adverb Workshop')
    document.querySelector<HTMLButtonElement>('[data-tab="dashboard"]')!.click()
    assertTabs()
    document.querySelector<HTMLButtonElement>('[data-tab="pronunciation"]')!.click()
    expect(document.getElementById('pronunciation-tab')!.classList.contains('hidden')).toBe(false)
  })
})
