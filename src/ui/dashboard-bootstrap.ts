import './dashboard.css'
import './lesson.css'
import './placement-test.css'
import { vocabulary } from '../data/vocabulary'
import { getLevels } from '../data/lessons'
import { getDueSrsWords } from '../srs/srs'
import { renderDashboard } from './dashboard'
import { renderLearnExperience } from './lesson-ui'
import { renderPlacementTest } from './placement-test'
import { __getProfile, registerShowTabHook } from './ui'

const levels = getLevels()
const a1Chapters = levels.find((level) => level.id === 'A1')?.chapters ?? []

function showTab(tabName: string): void {
  (window as unknown as { showTab: (tabName: string) => void }).showTab(tabName)
}

function refreshDashboard(): void {
  const target = document.getElementById('dashboard-tab')
  if (!target) return
  const profile = __getProfile()
  const dueCount = getDueSrsWords(vocabulary, profile.srsState).length
  target.innerHTML = renderDashboard({ profile, levels, vocabulary, dueCount })

  target.querySelectorAll<HTMLElement>('[data-dashboard-action="review"]').forEach((button) => {
    button.addEventListener('click', () => showTab('review'))
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-action="placement"]').forEach((button) => {
    button.addEventListener('click', () => {
      refreshPlacement()
      showTab('learn')
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-action="retake-placement"]').forEach((button) => {
    button.addEventListener('click', () => {
      refreshPlacement()
      showTab('learn')
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-action="refresher"]').forEach((button) => {
    const chapterId = button.dataset.chapterId
    if (!chapterId) return
    button.addEventListener('click', () => {
      refreshLearn(chapterId)
      showTab('learn')
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-action="continue"]').forEach((button) => {
    button.addEventListener('click', () => {
      const chapterId = button.dataset.chapterId
      if (chapterId) {
        refreshLearn(chapterId)
        showTab('learn')
      } else {
        showTab('review')
      }
    })
  })
  target.querySelectorAll<HTMLElement>('[data-dashboard-level]').forEach((button) => {
    button.addEventListener('click', () => showTab('learn'))
  })
}

function refreshLearn(chapterId?: string): void {
  const target = document.getElementById('learn-tab')
  if (!target) return
  delete target.dataset.placement
  if (chapterId) target.dataset.lessonId = chapterId
  else if (!target.dataset.lessonId) delete target.dataset.lessonId
  renderLearnExperience(target, a1Chapters)
}

function refreshPlacement(): void {
  const target = document.getElementById('learn-tab')
  if (!target) return
  delete target.dataset.lessonId
  target.dataset.placement = 'true'
  renderPlacementTest(target)
}

export function enhanceDashboard(): void {
  refreshDashboard()
  refreshLearn()

  // Unregister any previous hook so calling enhanceDashboard() twice (HMR,
  // future refactor, double-invoked main entry) does not stack listeners.
  if (unregisterShowTabHook) unregisterShowTabHook()
  unregisterShowTabHook = registerShowTabHook((tabName) => {
    if (tabName === 'dashboard') refreshDashboard()
    else if (tabName === 'learn') {
      const learnTarget = document.getElementById('learn-tab')
      if (learnTarget?.dataset.placement === 'true') renderPlacementTest(learnTarget)
      else refreshLearn()
    }
  })

  // profile-select: tear down the previous listener before attaching a new
  // one, otherwise repeated enhanceDashboard() calls would stack listeners.
  const profileSelect = document.querySelector('.profile-select')
  if (profileSelect) {
    if (profileSelectListener) profileSelect.removeEventListener('change', profileSelectListener)
    profileSelectListener = () => {
      window.setTimeout(() => {
        refreshDashboard()
        refreshLearn()
      }, 0)
    }
    profileSelect.addEventListener('change', profileSelectListener)
  }
}

let unregisterShowTabHook: (() => void) | undefined
let profileSelectListener: (() => void) | undefined
