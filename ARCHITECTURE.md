# ARCHITECTURE.md

This document describes the module layout of `learning-german` after the
refactor, the rationale for each split, and the wiring changes that fixed
the Achievement system.

## High-level layout

```
┌─────────────────────────────────────────────────────────────────┐
│                        src/main.ts                              │
│                  (entry — calls initApp)                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       src/ui/ui.ts                              │
│   DOM rendering, event listeners, window.* exports,             │
│   quiz/grammar session orchestration                            │
│   ┌────────────────────────────┐                                │
│   │ src/ui/achievement-ui.ts   │  toast notifications           │
│   └────────────────────────────┘                                │
└──┬──────────┬──────────┬──────────┬──────────┬──────────────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────────┐
│state │  │ srs  │  │ quiz │  │grammar│ │ data/*   │
│      │  │      │  │      │  │       │ │(json+ts) │
└──────┘  └──────┘  └──────┘  └──────┘  └──────────┘
```

The UI layer owns all DOM and storage writes. Everything else is pure
(functions over plain data) and is unit-tested in `tests/`.

## Module map

### `src/state/state.ts`

AppState types, persistence, and migrations.

- `STORAGE_KEY = 'learning-german-v4-state'` (bumped from v3)
- `LEGACY_V3_KEY`, `LEGACY_V2_KEY` — old keys migrated on first load and
  removed
- `loadState({ levels })` — try current → v3 → v2 → fresh
- `saveState(state)` — single write path
- `createEmptyProfile(id, name, levels)` — used for "new profile" and
  the v2 migration

Migrations are idempotent and preserve all user data. They never run on
every load — only on first detection of an old key.

### `src/srs/srs.ts`

Leitner-box spaced-repetition logic. Pure functions, no DOM, no storage.

- `SRS_INTERVALS_MS` — the canonical 5-box schedule (1d, 3d, 7d, 14d, 30d)
- `applySrsReview(entry, correct, now?)` — mutates an entry, returns it
- `getDueSrsWords(vocab, srsState, now?)` — list of words due for review
- `initSrsForLearnedWord(now?)` — schedule a brand-new entry on first
  correct quiz answer
- `boxCounts(srsState)` — aggregation used by the Review tab

### `src/quiz/quiz.ts`

Vocab-quiz generators and sentence-construction helpers.

- `generateQuiz(options, ctx)` — pure, returns `VocabQuizQuestion[]`
  for all 5 modes (`de-en`, `en-de`, `audio-dictation`,
  `sentence-completion`, `type-sentence`)
- `tokenizeSentence(s)` — splits a sentence into word tiles, preserving
  punctuation
- `sentencesEqual(userTiles, correct)` — case-insensitive,
  whitespace-tolerant, umlaut-tolerant (ASCII fallbacks `ae/oe/ue/ss`)

The injected `rng?: () => number` lets tests assert deterministic
behaviour.

### `src/grammar/grammar.ts`

Pure grammar quiz logic, no DOM.

- `pickExercises(pool, count, rng?)` — Fisher–Yates shuffle with bounded
  size
- `scoreCloze(ex, answer)` — strict equality for multiple-choice
- `scoreSentenceConstruction(ex, userTiles)` — delegates to
  `sentencesEqual`
- `tilesForExercise(ex)` — `tokenizeSentence(ex.correctAnswer)`
- `createGrammarQuizState / currentExercise / isFinished` — small state
  machine the UI layer advances after each answer

### `src/ui/ui.ts`

The only module that touches the DOM. Owns:

- All `render*` functions (Dashboard, Review, Learn, Practice, Stats)
- The quiz session state machines (vocab + grammar)
- The `window.*` exports that the inline `onclick` attributes need
- Achievement detection + persistence side-effect (see Achievement
  changelog below)

`initApp()` is the public entry — `src/main.ts` just calls it.

### `src/ui/achievement-ui.ts`

Vanilla-DOM toast notifications. No library, no framework.

- `showAchievementToast(achievements)` queues and animates a stack of
  toasts in the bottom-right corner. Each toast auto-dismisses after
  4.5s and can be clicked to dismiss early. Multiple unlocks stagger by
  200ms so they don't visually collide.

### `src/data/`

Data and types:

- `vocabulary.json` — 289 words, the source of truth
- `vocabulary.ts` — re-export + frozen + `findVocabById` helper
- `vocabulary-schema.ts` — hand-rolled runtime validator
- `grammar-exercises.ts` — index that aggregates the three sources
- `grammar-exercises-legacy.ts` — original 17 cloze exercises
- `grammar-exercises-genitiv.ts` — 20 new genitiv exercises
- `grammar-exercises-infinitiv.ts` — 20 new infinitiv-zu exercises
- `lessons.ts` — chapter/level metadata
- `achievements.ts` — achievement definitions
- `grammar.ts` — long-form grammar reference (informational)
- `glossary.ts` — vocabulary glossary (informational)

The `grammar-exercises-genitiv.ts` and `grammar-exercises-infinitiv.ts`
files each mix cloze multiple-choice and sentence-construction tile
exercises. The renderer decides per-exercise based on `isTileExercise`:

```ts
function isTileExercise(ex: GrammarExercise): boolean {
  const c = ex.correctAnswer
  if (!c.includes(' ')) return false              // single word → cloze
  if (!/^[A-ZÄÖÜ]/.test(c)) return false          // lowercase → not a sentence
  return ex.options.length === 2
      && ex.options[0] === 'Build the sentence'   // marker option
}
```

This convention keeps the `GrammarExercise` type unchanged so every
existing call site keeps working.

## Achievement changelog

The old `checkAchievements()` in `app.ts` was a one-liner that just
called `saveState`. It never evaluated any conditions, so no achievement
could ever unlock. The refactor wires the real detection:

1. `checkAchievements()` in `src/ui/ui.ts` now iterates over all
   achievement definitions, evaluates their `condition()` against the
   live profile (`progress` + `quizHistory`), and flags newly-satisfied
   entries by setting `unlocked = true` and `unlockedAt = Date.now()`.
2. Unlocked entries are pushed to a local `pendingAchievements` queue.
3. `flushAchievements()` is called at the end of `finishQuiz()` and
   renders them as toasts via `src/ui/achievement-ui.ts`.
4. The `saveState` side-effect on every check ensures `unlockedAt`
   timestamps survive a page reload.

Triggers now fire from:
- `finishQuiz()` — after every vocabulary quiz, evaluates quiz/accuracy
  /streak/special achievements
- `markWordLearned()` — implicitly through `progress.totalWordsLearned`
  being incremented, which unlocks the `learn-*` achievements on the
  next `checkAchievements()` call
- `renderDashboard()` — runs the day-rollover (streak increment /
  reset) before rendering, which can unlock `streak-*` achievements
  the first time the user comes back the next day

The `achievement-ui` toast is the only visible signal of an unlock; the
underlying state is durable.

## Sentence-construction mix UI

The user's chosen UI direction is **Mix**:

- **Tile mode** (sentence-construction) for grammar sentences
  (genitiv + infinitiv-zu tile exercises)
- **Cloze mode** for vocabulary sentences (existing `sentence-completion`
  and `type-sentence` modes are unchanged)

The renderer in `src/ui/ui.ts` builds the tile UI in
`renderTileQuestion(exercise)`:

- The correct sentence is tokenized via `tokenizeSentence` and shuffled
  for display in the "pool" area.
- Each tile in the pool is a `<button>`; clicking moves it into the
  "built" area in click-order.
- A tile in the built area can be clicked again to send it back to the
  pool.
- "Undo" pops the most recently added tile back to the pool.
- "Reset" empties the built area.
- "Check" scores the built sequence with `scoreSentenceConstruction` →
  `sentencesEqual` (case/whitespace/umlaut-tolerant).

## Testing

- `tests/srs.test.ts` — 10 tests: intervals, apply, due, box counts
- `tests/quiz.test.ts` — 13 tests: generation per mode, sentence helpers
- `tests/grammar.test.ts` — 14 tests: tile vs cloze, scoring, state
  machine, new exercise categories
- `tests/state.test.ts` — 7 tests: round-trip, v2/v3 migration, fresh
- `tests/vocabulary-schema.test.ts` — 9 tests: validation, bundled JSON

Total: **53 tests** in 5 files. All green via `npm test`.

Vitest is configured with `happy-dom` (lighter than jsdom) — we only
need `localStorage` and a few browser globals for the tests, and
happy-dom starts up in milliseconds with a much smaller install footprint.

## Migration safety

- `STORAGE_KEY` bumps to `learning-german-v4-state`.
- On first load, `loadState()` tries the current key, then v3, then v2.
  Whichever is found is migrated forward and persisted to v4, then the
  old key is removed.
- All migrations preserve the full shape: `progress`, `levels`,
  `quizHistory`, `learnedWordIds`, `srsState`, `categoryStats`.
- Migrations are non-destructive — the old keys are removed *after* the
  new state is written.
