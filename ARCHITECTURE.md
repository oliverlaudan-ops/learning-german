# ARCHITECTURE.md

This document describes the current implementation boundaries of `learning-german`, the persistence model, and the main learner flows that future changes should preserve.

## High-level layout

```text
src/main.ts
   |
   v
src/ui/ui.ts -----------------------------+
   |                                      |
   +--> dashboard / placement / lessons   |
   +--> vocab + grammar session wiring     |
   +--> achievements                      |
   +--> listening renderers               |
   |                                      |
   +----> src/state/state.ts <-------------+
   +----> src/srs/srs.ts
   +----> src/quiz/quiz.ts
   +----> src/grammar/grammar.ts
   +----> src/data/*
```

The architecture is intentionally lightweight: no UI framework, browser storage for learner state, and domain logic split away from DOM code where practical.

## Module map

### `src/main.ts`

Application bootstrap. It imports shared CSS, calls `initApp()`, and enables the learner-dashboard/lesson enhancements.

### `src/ui/ui.ts`

Legacy-compatible orchestration layer and the central owner of the app's DOM-driven quiz/practice flows.

It owns:

- main tab switching;
- vocabulary quiz session state;
- grammar quiz session state;
- Review, Practice and Stats rendering;
- profile access;
- `window.*` compatibility exports;
- achievement evaluation and notification wiring;
- show-tab hooks used by modular enhancements.

`__appState` and `__getProfile` are exported as integration/test seams used by newer UI modules. Avoid multiplying direct state access beyond clear integration points.

### `src/ui/dashboard.ts` + `dashboard-bootstrap.ts`

Learner-focused dashboard layered on top of the established app shell.

Responsibilities include:

- daily goal, streak, accuracy and learned-word summaries;
- A1–B2 level progress;
- Continue Learning;
- placement-result awareness;
- quick refresher links;
- Smart Review hints;
- safe re-rendering through `registerShowTabHook` rather than runtime-patching tab navigation.

### `src/ui/lesson-ui.ts`

Course/lesson routing and chapter presentation.

It:

- renders the Learn index;
- opens chapter pages;
- launches guided lesson sessions;
- registers entry points for dedicated listening exercises;
- displays the Listening Progress summary;
- persists advanced listening results through `recordListeningResult`.

### `src/ui/lesson-session.ts`

Guided lesson experience shared by shipped A1/A2 content.

The intended learning sequence is:

1. Learn
2. Listen
3. Understand
4. Build
5. Speak
6. Real German
7. Review

Keep this sequence coherent when extending guided course content rather than creating unrelated chapter-specific interaction models.

### `src/ui/listening-lesson.ts`

Dedicated renderer for the A2 **Making weekend plans** unit.

This lesson differs from the advanced renderer because it uses bundled static MP3 assets, including chunked audio for speaking practice. It currently does not emit a persisted listening score.

### `src/ui/doctor-listening-lesson.ts`

Despite the historical filename, this is now the shared **advanced listening renderer** for multiple domains:

- doctor's appointment;
- doctor consultation;
- travel disruption;
- housing search.

The renderer is data-driven and supports:

- hidden transcript on first listen;
- browser Speech Synthesis;
- optional multiple German voices by speaker;
- configurable speech rate;
- true/false questions;
- gap-fill questions;
- event ordering;
- replayable transcript review;
- speaking prompts;
- completion scoring;
- per-task score breakdown;
- retry and targeted next-step feedback;
- an optional `onComplete(ListeningResult)` callback.

Do not fork this renderer for every new realistic listening lesson. Add compatible content data unless the interaction genuinely requires a different learning model.

### `src/ui/placement-test.ts`

Interactive 21-question placement check across A1/A2/B1.

It includes browser-synthesized listening items and persists a `PlacementSnapshot` only when the learner acts on the recommendation/refresher path.

Placement remains advisory rather than a formal CEFR assessment.

### `src/ui/achievement-ui.ts`

Vanilla-DOM achievement toast rendering. The core achievement definitions remain in `src/data/achievements.ts`.

### `src/state/state.ts`

Owns persisted application state, migration, and state write-back helpers.

Current keys:

```text
learning-german-v5-state   current
learning-german-v4-state   migration source
learning-german-v3-state   migration source
learning-german-v2-state   migration source
```

Important functions:

- `loadState({ levels })`
- `saveState(state)`
- `createEmptyProfile(id, name, levels)`
- `savePlacementSnapshot(state, snapshot)`
- `recordListeningResult(state, result)`

#### Migration model

- v2 was a flat/single-profile legacy shape;
- v3/v4 used profile-aware state;
- v5 added the optional placement snapshot;
- advanced `listeningHistory` was later added as an **optional field within v5**, so existing valid v5 data remains compatible without another migration.

Migration writes the newer state before removing the older storage key.

#### Listening history

`recordListeningResult` appends to the active profile's optional `listeningHistory` and retains the newest **50 attempts**.

A `ListeningResult` contains:

```ts
interface ListeningResult {
  lessonId: string
  chapterId: string
  level: string
  correct: number
  total: number
  accuracy: number
  tasks: {
    trueFalse?: { correct: number; total: number }
    gaps?: { correct: number; total: number }
    sequence?: boolean
  }
  completedAt: number
}
```

The Learn UI deliberately does not persist an advanced-listening run when `total === 0`, because finishing speaking practice without checking any comprehension tasks is not evidence of 0% comprehension.

### `src/srs/srs.ts`

Pure five-box Leitner spaced-repetition logic.

Canonical intervals:

- Box 1: 1 day
- Box 2: 3 days
- Box 3: 7 days
- Box 4: 14 days
- Box 5: 30 days

Key helpers include `applySrsReview`, `getDueSrsWords`, `initSrsForLearnedWord`, and `boxCounts`.

### `src/quiz/quiz.ts`

Pure vocabulary and sentence helpers.

Supported modes:

- `de-en`
- `en-de`
- `audio-dictation`
- `sentence-completion`
- `type-sentence`

Sentence comparison is tolerant of case/whitespace and German-character ASCII fallbacks where intended by the existing implementation.

### `src/grammar/grammar.ts`

Pure grammar-quiz state and scoring logic. Tile-based sentence construction and cloze-style exercises share the same domain module while DOM handling stays in `src/ui/ui.ts`.

### `src/data/`

Learning content and metadata, including:

- vocabulary and schema validation;
- chapter/level metadata;
- guided lesson content;
- placement questions/scoring data;
- grammar exercise sources;
- achievements and glossary/reference content;
- listening lesson JSON files.

Current dedicated listening content includes:

```text
weekend-listening.json
doctor-appointment-listening.json
doctor-consultation-listening.json
travel-disruption-listening.json
housing-search-listening.json
```

## Advanced listening scoring model

The advanced listening renderer only scores task types the learner explicitly checks.

### True/false

Once submitted, score is:

```text
number of answers matching the lesson key / number of statements
```

### Gap fill

Once submitted, score is:

```text
number of selected exact answers matching the lesson key / number of gaps
```

### Event ordering

Once the learner presses **Check order**, this contributes one scored item:

```text
1/1 if the full sequence is correct
0/1 otherwise
```

If a task type is never checked, it is excluded from both numerator and denominator.

This matters pedagogically: an incomplete run must not silently become a low-confidence assessment.

## Audio model

There are two audio approaches.

### Bundled MP3

The weekend lesson uses pre-generated Piper audio from `public/audio/`. This gives a consistent voice and supports replayable chunks but increases static assets and requires generated files to be maintained.

### Browser Speech Synthesis

Advanced lessons use the browser/device Speech Synthesis implementation:

- `de-DE` language;
- lesson-configurable playback rate;
- multiple installed German voices used by speaker when available;
- fallback to one voice when necessary;
- visible text fallback when speech synthesis is unavailable.

Do not assume the same voice inventory or sound quality on every device/browser.

## Persistence boundaries

Persist only learning evidence that has a clear product use.

Currently persisted:

- learned words;
- quiz/SRS progress;
- category stats;
- placement result;
- scored advanced-listening attempts.

Currently **not** persisted as assessment:

- repeat-after-me pronunciation;
- whether a transcript/details element was opened;
- raw audio playback counts;
- unsubmitted comprehension answers.

## Testing

Vitest uses `happy-dom`.

Current main baseline after PR #10:

- **175 tests across 15 test files**;
- CI runs `npm test` and `npm run build`;
- PR #10 passed both before merge.

Coverage includes:

- state migrations and persistence;
- SRS logic;
- vocab quiz generation/scoring;
- grammar scoring/state;
- vocabulary schema;
- dashboard and dashboard bootstrap;
- placement evaluation/UI helpers;
- guided lesson content;
- weekend listening playback/navigation;
- doctor appointment listening;
- doctor consultation listening;
- travel disruption listening and voice selection;
- housing listening;
- advanced listening result emission, persistence and skipped-task handling.

## CI and deployment

`.github/workflows/test.yml` uses:

- `actions/checkout@v6`
- `actions/setup-node@v7`
- Node 24
- `npm ci`
- `npm test`
- `npm run build`

It runs on pull requests to `main`, pushes to `main`, and manual dispatch.

The Pages workflow builds and deploys `dist/` from `main`. Feature branches should be reviewed through PRs; they should not be treated as independently deployed production versions.

## Architectural invariants

Future work should preserve these unless there is a strong reason to change them:

1. **Learning content belongs in `src/data/`.**
2. **Pure scoring/review logic should not depend on the DOM.**
3. **DOM/event wiring belongs in `src/ui/`.**
4. **Persisted state changes must be backward-safe.**
5. **Do not replace established Learn/Practice/Review/profile flows just to add a new feature.**
6. **Prefer the shared advanced-listening renderer over per-lesson copies.**
7. **Skipped tasks must not be interpreted as wrong answers without explicit product intent.**
8. **Placement is advisory, not certification.**
9. **Speaking practice is practice, not automated pronunciation assessment.**
10. **Mobile usability and audio fallbacks are first-class requirements.**
