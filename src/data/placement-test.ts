export type PlacementLevel = 'A1' | 'A2' | 'B1'

export type PlacementSkill =
  | 'vocabulary'
  | 'grammar'
  | 'articles'
  | 'sentence-order'
  | 'reading'
  | 'perfect-tense'
  | 'cases'
  | 'modal-verbs'
  | 'connectors'
  | 'listening'

export type PlacementQuestion = {
  id: string
  level: PlacementLevel
  skill: PlacementSkill
  prompt: string
  /** German sentence spoken via speechSynthesis for listening questions. */
  audio?: string
  options: string[]
  answer: number
  explanation: string
}

export const placementQuestions: readonly PlacementQuestion[] = [
  { id: 'a1-vocab-1', level: 'A1', skill: 'vocabulary', prompt: 'What does “Mutter” mean?', options: ['father', 'mother', 'sister', 'daughter'], answer: 1, explanation: 'Mutter means mother.' },
  { id: 'a1-grammar-1', level: 'A1', skill: 'grammar', prompt: 'Ich ___ aus Uganda.', options: ['komme', 'kommt', 'kommen', 'kommst'], answer: 0, explanation: 'With ich, the verb is komme: Ich komme aus Uganda.' },
  { id: 'a1-article-1', level: 'A1', skill: 'articles', prompt: 'Which is correct?', options: ['der Mutter', 'das Mutter', 'die Mutter', 'den Mutter'], answer: 2, explanation: 'Mutter is feminine: die Mutter.' },
  { id: 'a1-order-1', level: 'A1', skill: 'sentence-order', prompt: 'Choose the correct sentence.', options: ['Ich heute lerne Deutsch.', 'Heute ich Deutsch lerne.', 'Heute lerne ich Deutsch.', 'Lerne heute ich Deutsch.'], answer: 2, explanation: 'In a normal main clause, the conjugated verb is in position two: Heute lerne ich Deutsch.' },

  { id: 'a2-vocab-1', level: 'A2', skill: 'vocabulary', prompt: 'What does “enttäuscht” mean?', options: ['excited', 'disappointed', 'surprised', 'relaxed'], answer: 1, explanation: 'Enttäuscht means disappointed.' },
  { id: 'a2-grammar-1', level: 'A2', skill: 'grammar', prompt: 'Gestern ___ ich meine Freundin angerufen.', options: ['habe', 'bin', 'werde', 'hat'], answer: 0, explanation: 'Anrufen forms the perfect with haben: Ich habe angerufen.' },
  { id: 'a2-article-1', level: 'A2', skill: 'articles', prompt: 'Ich sehe ___ Mann im Park.', options: ['der', 'den', 'dem', 'des'], answer: 1, explanation: 'Mann is the direct object here, so masculine der becomes den in the accusative.' },
  { id: 'a2-order-1', level: 'A2', skill: 'sentence-order', prompt: 'Choose the natural sentence.', options: ['Weil ich müde bin, gehe ich nach Hause.', 'Weil ich bin müde, gehe ich nach Hause.', 'Weil ich müde, bin ich gehe nach Hause.', 'Weil bin ich müde, gehe nach Hause.'], answer: 0, explanation: 'In a weil-clause, the conjugated verb moves to the end: weil ich müde bin.' },
  { id: 'a2-perfect-1', level: 'A2', skill: 'perfect-tense', prompt: 'Ich ___ gestern ins Kino ___.',
   options: ['bin … gegangen', 'habe … gegangen', 'bin … gefahren', 'habe … gefahren'], answer: 0, explanation: 'Gehen uses sein in the perfect tense: Ich bin gegangen. Fahren would also take sein, but the sentence specifies Kino (going on foot / by transport — gehen fits the walk-to-cinema idea).' },
  { id: 'a2-cases-1', level: 'A2', skill: 'cases', prompt: 'Ich helfe ___ Frau mit dem Koffer.', options: ['die', 'der', 'den', 'dem'], answer: 1, explanation: 'Helfen takes the dative. Feminine die becomes der in the dative: Ich helfe der Frau.' },
  { id: 'a2-modal-1', level: 'A2', skill: 'modal-verbs', prompt: 'Ich ___ heute Abend nicht ausgehen.', options: ['möchte', 'kann', 'darf', 'muss'], answer: 1, explanation: 'Kann (can / am able to) fits the negative statement about not going out. Möchte / darf / muss would each change the meaning.' },
  { id: 'a2-listening-1', level: 'A2', skill: 'listening', prompt: 'Press play. What is the speaker saying?', audio: 'Ich gehe heute ins Kino.', options: ['I am going to the cinema today.', 'I am coming home from the cinema.', 'I want to go to the cinema tomorrow.', 'I have been at the cinema.'], answer: 0, explanation: '“Ich gehe heute ins Kino” — I go / I am going to the cinema today.' },
  { id: 'a2-listening-2', level: 'A2', skill: 'listening', prompt: 'Press play. What time does the speaker mention?', audio: 'Der Zug fährt um acht Uhr dreißig.', options: ['Half past seven.', 'Half past eight.', 'Quarter to nine.', 'A quarter past eight.'], answer: 1, explanation: '“um acht Uhr dreißig” is half past eight.' },

  { id: 'b1-vocab-1', level: 'B1', skill: 'vocabulary', prompt: 'What does “obwohl” introduce?', options: ['a reason', 'a contrast', 'a condition', 'a time expression'], answer: 1, explanation: 'Obwohl introduces a contrast: although/even though.' },
  { id: 'b1-grammar-1', level: 'B1', skill: 'grammar', prompt: 'Wenn ich mehr Zeit ___, würde ich öfter Deutsch lernen.', options: ['habe', 'hätte', 'hatte', 'haben'], answer: 1, explanation: 'The Konjunktiv II hätte expresses a hypothetical situation: Wenn ich mehr Zeit hätte ...' },
  { id: 'b1-article-1', level: 'B1', skill: 'articles', prompt: 'Das ist die Frau, mit ___ ich gesprochen habe.', options: ['die', 'der', 'den', 'deren'], answer: 1, explanation: 'Mit always takes the dative. Die becomes der in the feminine dative.' },
  { id: 'b1-order-1', level: 'B1', skill: 'sentence-order', prompt: 'Choose the correct sentence.', options: ['Obwohl es geregnet hat, sind wir spazieren gegangen.', 'Obwohl es hat geregnet, sind wir spazieren gegangen.', 'Obwohl hat es geregnet, wir sind spazieren gegangen.', 'Obwohl es geregnet, sind wir gegangen spazieren.'], answer: 0, explanation: 'The subordinate clause puts the conjugated verb at the end; the main clause then starts with the verb.' },
  { id: 'b1-reading-1', level: 'B1', skill: 'reading', prompt: '“Anna wollte früher mit dem Bus fahren, aber wegen des Regens nahm sie schließlich den Zug.” Why did Anna take the train?', options: ['The bus was faster.', 'She wanted to travel earlier.', 'Because of the rain.', 'The train was cheaper.'], answer: 2, explanation: 'The text explicitly says she took the train because of the rain.' },
  { id: 'b1-perfect-1', level: 'B1', skill: 'perfect-tense', prompt: 'Er ___ sich schon immer für Musik ___.',
   options: ['hat … interessiert', 'ist … interessiert', 'hat … interessieren', 'ist … interessieren'], answer: 0, explanation: 'Sich interessieren forms the perfect with haben + partizip II: Er hat sich interessiert.' },
  { id: 'b1-connectors-1', level: 'B1', skill: 'connectors', prompt: 'Ich bleibe zu Hause, ___ es regnet.', options: ['weil', 'denn', 'wenn', 'damit'], answer: 0, explanation: 'Weil pushes the verb to the end of the subordinate clause — natural after the comma. Denn would also introduce a reason but keeps normal word order (no comma).' },
  { id: 'b1-listening-1', level: 'B1', skill: 'listening', prompt: 'Press play. When did the speaker read the book?', audio: 'Nachdem ich gegessen hatte, habe ich noch ein Buch gelesen.', options: ['Before eating.', 'While eating.', 'After eating.', 'Instead of eating.'], answer: 2, explanation: '“Nachdem” is a temporal connector that pushes the verb to the end — the perfect tense there (“gegessen hatte”) marks the earlier action. The reading happened after the meal.' },
]

export type PlacementResult = {
  score: number
  total: number
  percentages: Record<PlacementLevel, number>
  recommendedLevel: PlacementLevel
  /** True when A1 + A2 are strong but B1 is not yet secure. */
  recommendedLevelIsApproximate: boolean
  /** First chapter the learner should start with (always set). */
  recommendedChapterId: string
  /** Short A1 / A2 refreshers that target specific weak skills. */
  refresherIds: string[]
  strengths: string[]
  focusAreas: string[]
}

/**
 * Maps a recommended CEFR level to the first chapter the learner should open.
 * The choice reflects what is most useful next, not the absolute first chapter.
 */
const RECOMMENDED_CHAPTER: Record<PlacementLevel, string> = {
  A1: 'a1-ch1',
  A2: 'a2-ch1',
  B1: 'b1-ch1',
}

/**
 * Skill → A1 refresher chapter mapping. A1 is treated as a targeted refresher,
 * not a default course, so each weak skill points to one focused chapter.
 */
const SKILL_REFRESHER: Partial<Record<PlacementSkill, string>> = {
  'articles': 'a1-ch3',
  'cases': 'a1-ch3',
  'sentence-order': 'a1-ch1',
  'grammar': 'a1-ch1',
  'perfect-tense': 'a2-ch1',
  'modal-verbs': 'a1-ch5',
  'connectors': 'a2-ch1',
  'listening': 'a2-ch1',
}

export function evaluatePlacement(answers: Record<string, number>): PlacementResult {
  const scores: Record<PlacementLevel, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
  }
  const skillTotals = new Map<PlacementSkill, { correct: number; total: number }>()
  let score = 0

  for (const question of placementQuestions) {
    scores[question.level].total += 1
    const skill = skillTotals.get(question.skill) ?? { correct: 0, total: 0 }
    skill.total += 1
    if (answers[question.id] === question.answer) {
      score += 1
      scores[question.level].correct += 1
      skill.correct += 1
    }
    skillTotals.set(question.skill, skill)
  }

  const percentages = Object.fromEntries(
    (Object.keys(scores) as PlacementLevel[]).map((level) => [
      level,
      scores[level].total === 0 ? 0 : Math.round((scores[level].correct / scores[level].total) * 100),
    ]),
  ) as Record<PlacementLevel, number>

  // Recommend A2 once A1 is secure. Only escalate to B1 when A1 + A2 are both
  // solid AND B1 shows at least some competence — otherwise A2 with an A1
  // refresher is the honest answer.
  let recommendedLevel: PlacementLevel = 'A1'
  let recommendedLevelIsApproximate = false
  if (percentages.A1 >= 70 && percentages.A2 >= 70 && percentages.B1 >= 50) {
    recommendedLevel = 'B1'
  } else if (percentages.A1 >= 70) {
    recommendedLevel = 'A2'
  }
  if (recommendedLevel === 'A2' && percentages.A1 >= 90 && percentages.B1 >= 30 && percentages.B1 < 50) {
    recommendedLevelIsApproximate = true
  }

  const strengths = [...skillTotals.entries()]
    .filter(([, value]) => value.total > 0 && value.correct / value.total >= 0.75)
    .map(([skill]) => skill)
  const focusAreas = [...skillTotals.entries()]
    .filter(([, value]) => value.total > 0 && value.correct / value.total < 0.75)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([skill]) => skill)

  // Build a small, deduplicated set of refresher chapter ids from the weakest
  // skills. Skip when the learner is already strong in a level — A1 refreshers
  // only make sense when A2/B1 still wobble on fundamentals.
  const seenChapters = new Set<string>()
  const refresherIds: string[] = []
  if (recommendedLevel !== 'A1') {
    for (const skill of focusAreas) {
      const chapterId = SKILL_REFRESHER[skill]
      if (!chapterId) continue
      if (chapterId === RECOMMENDED_CHAPTER[recommendedLevel]) continue
      if (seenChapters.has(chapterId)) continue
      seenChapters.add(chapterId)
      refresherIds.push(chapterId)
      if (refresherIds.length >= 2) break
    }
  }

  return {
    score,
    total: placementQuestions.length,
    percentages,
    recommendedLevel,
    recommendedLevelIsApproximate,
    recommendedChapterId: RECOMMENDED_CHAPTER[recommendedLevel],
    refresherIds,
    strengths,
    focusAreas,
  }
}