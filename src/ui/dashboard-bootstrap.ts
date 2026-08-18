import './dashboard.css'
import { vocabulary } from '../data/vocabulary'
import { getLevels } from '../data/lessons'
import { getDueSrsWords } from '../srs/srs'
import { renderDashboard } from './dashboard'
import { __appState, __getProfile } from './ui'

const levels = getLevels()

type AppWindow = Window & {
  showTab: (tabName: string) => void
  startQuiz: (chapterId?: string, mode?: 'de-en' | 'en-de' | 'audio-dictation' | 'sentence-completion' | 'type-sentence', isReview?: boolean) => void
}

function refreshDashboard(): void {
  const target = document.getElementById('dashboard-tab')
  if (!target) return
  const profile = __getProfile()
  const dueCount = getDueSrsWords(vocabulary, profile.srsState).length
  target.innerHTML = renderDashboard({ profile, levels, vocabulary, dueCount })

  target.querySelectorAll<HTMLElement>('[data-dashboard-action="review"]').forEach((button) => {
    button.addEventListener('click', () => (window as AppWindow).showTab('review'))
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-action="continue"]').forEach((button) => {
    button.addEventListener('click', () => {
      const chapterId = button.dataset.chapterId
      if (chapterId) (window as AppWindow).startQuiz(chapterId, 'de-en')
      else (window as AppWindow).showTab('review')
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-level]').forEach((button) => {
    button.addEventListener('click', () => (window as AppWindow).showTab('learn'))
  })
}

export function enhanceDashboard(): void {
  // ui.ts owns the existing application shell. This adapter upgrades only the
  // dashboard surface, keeping the existing learning/review/practice flows intact.
  refreshDashboard()

  const appWindow = window as AppWindow
  const originalShowTab = appWindow.showTab
  if ((appWindow.showTab as unknown as { __dashboardWrapped?: boolean }).__dashboardWrapped) return

  const wrapped = (tabName: string): void => {
    originalShowTab(tabName)
    if (tabName === 'dashboard') refreshDashboard()
  }
  ;(wrapped as unknown as { __dashboardWrapped?: boolean }).__dashboardWrapped = true
  appWindow.showTab = wrapped

  // Keep the active profile's dashboard fresh after profile switching.
  document.querySelector('.profile-select')?.addEventListener('change', () => {
    window.setTimeout(refreshDashboard, 0)
  })

  void __appState
}
