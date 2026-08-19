export type PlacementLevel = 'A1' | 'A2' | 'B1'

export type PlacementQuestion = {
  id: string
  level: PlacementLevel
  skill: 'vocabulary' | 'grammar' | 'articles' | 'sentence-order' | 'reading'
  prompt: string
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
  { id: 'b1-vocab-1', level: 'B1', skill: 'vocabulary', prompt: 'What does “obwohl” introduce?', options: ['a reason', 'a contrast', 'a condition', 'a time expression'], answer: 1, explanation: 'Obwohl introduces a contrast: although/even though.' },
  { id: 'b1-grammar-1', level: 'B1', skill: 'grammar', prompt: 'Wenn ich mehr Zeit ___, würde ich öfter Deutsch lernen.', options: ['habe', 'hätte', 'hatte', 'haben'], answer: 1, explanation: 'The Konjunktiv II hätte expresses a hypothetical situation: Wenn ich mehr Zeit hätte ...' },
  { id: 'b1-article-1', level: 'B1', skill: 'articles', prompt: 'Das ist die Frau, mit ___ ich gesprochen habe.', options: ['die', 'der', 'den', 'deren'], answer: 1, explanation: 'Mit always takes the dative. Die becomes der in the feminine dative.' },
  { id: 'b1-order-1', level: 'B1', skill: 'sentence-order', prompt: 'Choose the correct sentence.', options: ['Obwohl es geregnet hat, sind wir spazieren gegangen.', 'Obwohl es hat geregnet, sind wir spazieren gegangen.', 'Obwohl hat es geregnet, wir sind spazieren gegangen.', 'Obwohl es geregnet, sind wir gegangen spazieren.'], answer: 0, explanation: 'The subordinate clause puts the conjugated verb at the end; the main clause then starts with the verb.' },
  { id: 'b1-reading-1', level: 'B1', skill: 'reading', prompt: '“Anna wollte früher mit dem Bus fahren, aber wegen des Regens nahm sie schließlich den Zug.” Why did Anna take the train?', options: ['The bus was faster.', 'She wanted to travel earlier.', 'Because of the rain.', 'The train was cheaper.'], answer: 2, explanation: 'The text explicitly says she took the train because of the rain.' },
]

export type PlacementResult = {
  score: number
  total: number
  percentages: Record<PlacementLevel, number>
  recommendedLevel: PlacementLevel
  strengths: string[]
  focusAreas: string[]
}

export function evaluatePlacement(answers: Record<string, number>): PlacementResult {
  const scores: Record<PlacementLevel, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
  }
  const skillTotals = new Map<string, { correct: number; total: number }>()
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
    (Object.keys(scores) as PlacementLevel[]).map((level) => [level, Math.round((scores[level].correct / scores[level].total) * 100)]),
  ) as Record<PlacementLevel, number>

  let recommendedLevel: PlacementLevel = 'A1'
  if (percentages.A1 >= 70) recommendedLevel = 'A2'
  if (percentages.A1 >= 70 && percentages.A2 >= 70) recommendedLevel = 'B1'

  const strengths = [...skillTotals.entries()]
    .filter(([, value]) => value.correct / value.total >= 0.75)
    .map(([skill]) => skill)
  const focusAreas = [...skillTotals.entries()]
    .filter(([, value]) => value.correct / value.total < 0.75)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([skill]) => skill)

  return { score, total: placementQuestions.length, percentages, recommendedLevel, strengths, focusAreas }
}
