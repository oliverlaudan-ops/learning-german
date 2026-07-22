/**
 * Achievement toast notifications.
 *
 * Vanilla-DOM, no library. Each toast slides in from the bottom-right,
 * auto-dismisses after 4.5s, and supports stacking for multiple unlocks at
 * once.
 */

export interface UnlockedAchievement {
  id: string
  title: string
  description: string
  icon: string
}

const TOAST_DURATION_MS = 4500
const TOAST_GAP_PX = 8

let host: HTMLElement | null = null
const active: HTMLElement[] = []

function getHost(): HTMLElement {
  if (host && document.body.contains(host)) return host
  host = document.getElementById('achievement-toast-host')
  if (!host) {
    host = document.createElement('div')
    host.id = 'achievement-toast-host'
    host.className = 'achievement-toast-host'
    document.body.appendChild(host)
  }
  return host
}

function layout(): void {
  if (!host) return
  let offset = 0
  for (const el of active) {
    el.style.bottom = `${offset}px`
    offset += el.offsetHeight + TOAST_GAP_PX
  }
}

function showOne(a: UnlockedAchievement): void {
  const root = getHost()
  const el = document.createElement('div')
  el.className = 'achievement-toast'
  el.setAttribute('role', 'status')
  el.setAttribute('aria-live', 'polite')
  el.innerHTML = `
    <span class="achievement-toast-icon">${a.icon}</span>
    <div class="achievement-toast-body">
      <strong>Achievement unlocked</strong>
      <span class="achievement-toast-title">${a.title}</span>
      <span class="achievement-toast-desc">${a.description}</span>
    </div>
  `
  root.appendChild(el)
  active.push(el)
  // animate in next frame
  requestAnimationFrame(() => {
    el.classList.add('achievement-toast-in')
    layout()
  })
  const timer = window.setTimeout(() => dismiss(el), TOAST_DURATION_MS)
  el.addEventListener('click', () => {
    window.clearTimeout(timer)
    dismiss(el)
  })
}

function dismiss(el: HTMLElement): void {
  const i = active.indexOf(el)
  if (i >= 0) active.splice(i, 1)
  el.classList.remove('achievement-toast-in')
  el.classList.add('achievement-toast-out')
  el.addEventListener('transitionend', () => {
    el.remove()
    layout()
  }, { once: true })
}

export function showAchievementToast(achievements: readonly UnlockedAchievement[]): void {
  if (!achievements || achievements.length === 0) return
  // Stagger: 200ms between consecutive toasts so they don't visually collide.
  let i = 0
  const emit = (): void => {
    const a = achievements[i]
    if (!a) return
    showOne(a)
    i++
    if (i < achievements.length) {
      window.setTimeout(emit, 200)
    }
  }
  emit()
}
