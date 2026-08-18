import './dashboard.css'
import './lesson.css'
import { vocabulary } from '../data/vocabulary'
import { getLevels } from '../data/lessons'
import { getDueSrsWords } from '../srs/srs'
import { renderDashboard } from './dashboard'
import { renderLearnExperience } from './lesson-ui'
import { __appState, __getProfile } from './ui'

const levels = getLevels()
const a1Chapters = levels.find((level) => level.id === 'A1')?.chapters ?? []

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
      if (chapterId) {
        // The learner now starts with the guided lesson rather than being
        // dropped directly into a quiz.
        refreshLearn(chapterId)
        ;(window as AppWindow).showTab('learn')
      } else {
        ;(window as AppWindow).showTab('review')
      }
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-level]').forEach((button) => {
    button.addEventListener('click', () => (window as AppWindow).showTab('learn'))
  })
}

function refreshLearn(chapterId?: string): void {
  const target = document.getElementById('learn-tab')
  if (!target) return
  if (chapterId) target.dataset.lessonId = chapterId
  else if (!target.dataset.lessonId) delete target.dataset.lessonId
  renderLearnExperience(target, a1Chapters)
}

export function enhanceDashboard(): void {
  refreshDashboard()
  refreshLearn()

  const appWindow = window as AppWindow
  const originalShowTab = appWindow.showTab
  if ((appWindow.showTab as unknown as { __dashboardWrapped?: boolean }).__dashboardWrapped) return

  const wrapped = (tabName: string): void => {
    originalShowTab(tabName)
    if (tabName === 'dashboard') refreshDashboard()
    if (tabName === 'learn') refreshLearn()
  }
  ;(wrapped as unknown as { __dashboardWrapped?: boolean }).__dashboardWrapped = true
  appWindow.showTab = wrapped

  document.querySelector('.profile-select')?.addEventListener('change', () => {
    window.setTimeout(() => {
      refreshDashboard()
      refreshLearn()
    }, 0)
  })

  void __appState
}
