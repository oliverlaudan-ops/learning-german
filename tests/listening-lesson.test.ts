import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { existsSync, statSync } from 'node:fs'
import lesson from '../src/data/weekend-listening.json'
import { disposeListeningLesson, renderListeningLesson } from '../src/ui/listening-lesson'
import { renderLearnExperience } from '../src/ui/lesson-ui'
import { getLevels } from '../src/data/lessons'

let target: HTMLDivElement
const click = (selector: string) => target.querySelector<HTMLButtonElement>(selector)!.click()
const advance = () => click('[data-next]')

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
  target = document.createElement('div')
  document.body.append(target)
  renderListeningLesson(target, vi.fn())
})

afterEach(() => {
  disposeListeningLesson()
  target.remove()
  vi.restoreAllMocks()
})

describe('weekend listening and speaking', () => {
  it('does not reveal the transcript or download audio before play', () => {
    expect(target.textContent).not.toContain(lesson.lines[0].german)
    expect(target.querySelector('audio')!.getAttribute('src')).toBeNull()
    expect(target.querySelector('audio')!.preload).toBe('none')
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled()
  })

  it('requires all answers, explains the changed time and allows corrections', () => {
    advance()
    click('[type="submit"]')
    expect(target.querySelector('[data-result]')!.textContent).toContain('Choose an answer')
    lesson.questions.forEach((_, i) => click(`[name="question-${i}"][value="0"]`))
    click('[type="submit"]')
    expect(target.querySelector('[data-result]')!.textContent).toContain('1 of 4')
    expect(target.querySelectorAll('.listening-feedback')[1].textContent).toContain('final time is 3:00 pm')
    lesson.questions.forEach((q, i) => click(`[name="question-${i}"][value="${q.answer}"]`))
    expect(target.querySelectorAll('.listening-feedback')).toHaveLength(0)
    click('[type="submit"]')
    expect(target.querySelector('[data-result]')!.textContent).toContain('4 of 4')
    advance()
    click('[data-previous]')
    expect(target.querySelectorAll('input:checked')).toHaveLength(4)
    expect(target.querySelector('[data-result]')!.textContent).toContain('4 of 4')
  })

  it('offers six initially closed transcript turns and six pronunciation chunks', () => {
    advance(); advance()
    expect(target.querySelectorAll('details')).toHaveLength(6)
    expect(target.querySelectorAll('details[open]')).toHaveLength(0)
    expect(target.querySelector('[lang="de"]')!.textContent).toBe(lesson.lines[0].german)
    advance()
    expect(target.querySelectorAll('[data-clip^="chunk-"]')).toHaveLength(6)
    expect(target.textContent).toContain('No microphone is needed')
    expect(target.textContent).toContain('German w')
  })

  it('uses a single player, changes speed and stops on navigation or disposal', async () => {
    click('[data-clip="dialogue"]')
    await Promise.resolve()
    const player = target.querySelector('audio')!
    expect(player.src).toContain('/audio/weekend-v1/dialogue.mp3')
    const speed = target.querySelector<HTMLSelectElement>('[data-speed]')!
    speed.value = '0.8'
    speed.dispatchEvent(new Event('change'))
    expect(player.playbackRate).toBe(0.8)
    advance()
    expect(player.getAttribute('src')).toBeNull()
    const nextPlayer = target.querySelector('audio')!
    expect(target.querySelector<HTMLSelectElement>('[data-speed]')!.value).toBe('0.8')
    click('[data-clip="dialogue"]')
    disposeListeningLesson()
    expect(nextPlayer.getAttribute('src')).toBeNull()
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled()
  })

  it('explains playback failure and still allows text and speaking practice', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new Error('unavailable'))
    click('[data-clip="dialogue"]')
    await Promise.resolve(); await Promise.resolve()
    expect(target.querySelector('[data-audio-status]')!.textContent).toContain('Audio could not play')
    advance(); advance()
    expect(target.querySelectorAll('details')).toHaveLength(6)
  })

  it('finishes and exits without implying an assessed pronunciation score', () => {
    const exit = vi.fn()
    renderListeningLesson(target, exit)
    advance(); advance(); advance(); advance()
    expect(target.textContent).toContain('PRACTICE COMPLETE')
    click('[data-done]')
    expect(exit).toHaveBeenCalledOnce()
  })

  it('is reachable from the course index and the A2 hobbies chapter', () => {
    const chapters = getLevels().flatMap(level => level.chapters)
    renderLearnExperience(target, chapters)
    click('[data-listening-start]')
    expect(target.querySelector('[data-stage-heading]')!.textContent).toContain('1. Listen')
    click('[data-listening-exit]')
    click('[data-open-lesson="a2-ch5"]')
    expect(target.querySelector('[data-listening-start]')).not.toBeNull()
    click('[data-listening-start]')
    expect(target.querySelector('audio')).not.toBeNull()
  })

  it('ships every referenced audio clip within a small download budget', () => {
    const ids = ['dialogue', ...lesson.lines.map(line => line.id), ...lesson.practice.flatMap(p => p.chunks.map(c => c.id))]
    let total = 0
    for (const id of ids) {
      const path = `public/audio/${lesson.id}/${id}.mp3`
      expect(existsSync(path), path).toBe(true)
      const size = statSync(path).size
      expect(size).toBeGreaterThan(1000)
      total += size
    }
    expect(total).toBeLessThan(1_000_000)
  })
})
