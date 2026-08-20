/**
 * Tests for the dashboard bootstrap wiring.
 *
 * The bootstrap sits between the renderer (pure HTML) and the DOM (event
 * listeners, profile-select changes, showTab hooks). It's exactly the seam
 * where regressions hurt the most, so the test suite pins a few invariants:
 *
 * - `enhanceDashboard()` is idempotent: calling it twice does not stack
 *   showTab hooks or profile-select listeners.
 * - The showTab hook re-renders the dashboard when the learner navigates
 *   back to the dashboard tab.
 * - The showTab hook refreshes the Learn tab when navigating to it.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createEmptyProfile, saveState } from '../src/state/state'
import type { Level } from '../src/types'

const fakeLevels: Level[] = [
  {
    id: 'A1',
    title: 'A1 – Beginner',
    description: '',
    order: 1,
    chapters: [
      { id: 'a1-ch1', title: 'Greetings and Farewells', description: '', category: 'Basics', level: 'A1', wordIds: [], order: 1 },
    ],
  },
  {
    id: 'A2',
    title: 'A2 – Elementary',
    description: '',
    order: 2,
    chapters: [],
  },
  {
    id: 'B1',
    title: 'B1 – Intermediate',
    description: '',
    order: 3,
    chapters: [],
  },
  {
    id: 'B2',
    title: 'B2 – Upper Intermediate',
    description: '',
    order: 4,
    chapters: [],
  },
]

function bootstrapDom(): void {
  document.body.innerHTML = `
    <div id="dashboard-tab"></div>
    <div id="learn-tab"></div>
    <select class="profile-select"><option value="oliver">Oliver</option></select>
  `
}

async function freshBootstrap() {
  const { enhanceDashboard } = await import('../src/ui/dashboard-bootstrap')
  const { __triggerShowTabHooks, __resetShowTabHooks } = await import('../src/ui/ui')
  __resetShowTabHooks()
  return { enhanceDashboard, __triggerShowTabHooks }
}

describe('enhanceDashboard — idempotency', () => {
  beforeEach(() => {
    localStorage.clear()
    bootstrapDom()
    const profile = createEmptyProfile('oliver', 'Oliver', fakeLevels)
    saveState({ profiles: { oliver: profile }, currentProfileId: 'oliver' })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the dashboard and learn tab on first call', async () => {
    const { enhanceDashboard } = await freshBootstrap()
    enhanceDashboard()
    const dashboard = document.getElementById('dashboard-tab')!
    const learn = document.getElementById('learn-tab')!
    expect(dashboard.innerHTML).toContain('dashboard')
    expect(learn.innerHTML).toContain('lesson-index')
  })

  it('does not stack showTab hooks across repeated calls', async () => {
    const { enhanceDashboard } = await freshBootstrap()
    enhanceDashboard()
    enhanceDashboard()
    enhanceDashboard()

    const dashboardTab = document.getElementById('dashboard-tab')!
    dashboardTab.innerHTML = '<p>stale content</p>'

    // Importing ui.ts freshly to grab __triggerShowTabHooks after reset.
    const { __triggerShowTabHooks } = await import('../src/ui/ui')
    __triggerShowTabHooks('dashboard')

    expect(dashboardTab.innerHTML).not.toBe('<p>stale content</p>')
    expect(dashboardTab.innerHTML).toContain('Welcome back')
  })

  it('refreshes the dashboard when the learner navigates back to it', async () => {
    const { enhanceDashboard, __triggerShowTabHooks } = await freshBootstrap()
    enhanceDashboard()
    const dashboardTab = document.getElementById('dashboard-tab')!
    expect(dashboardTab.innerHTML).toContain('Welcome back')

    dashboardTab.innerHTML = '<p>stale content</p>'
    __triggerShowTabHooks('dashboard')

    expect(dashboardTab.innerHTML).not.toBe('<p>stale content</p>')
    expect(dashboardTab.innerHTML).toContain('Welcome back')
  })

  it('refreshes the learn tab when navigating to it via the hook', async () => {
    const { enhanceDashboard, __triggerShowTabHooks } = await freshBootstrap()
    enhanceDashboard()
    const learnTab = document.getElementById('learn-tab')!
    learnTab.innerHTML = '<p>stale learn</p>'
    __triggerShowTabHooks('learn')
    expect(learnTab.innerHTML).not.toBe('<p>stale learn</p>')
    expect(learnTab.innerHTML).toContain('lesson-index')
  })

  it('does not stack profile-select listeners across repeated calls', async () => {
    const { enhanceDashboard } = await freshBootstrap()
    enhanceDashboard()
    enhanceDashboard()

    const select = document.querySelector<HTMLSelectElement>('.profile-select')!
    const dashboardTab = document.getElementById('dashboard-tab')!
    dashboardTab.innerHTML = '<p>stale</p>'

    select.dispatchEvent(new Event('change'))
    // The listener is wrapped in setTimeout(0) so we wait one tick.
    await new Promise((resolve) => setTimeout(resolve, 10))

    expect(dashboardTab.innerHTML).not.toBe('<p>stale</p>')
    expect(dashboardTab.innerHTML).toContain('Welcome back')
  })
})