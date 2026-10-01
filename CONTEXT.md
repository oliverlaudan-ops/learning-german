# learning-german — Project Context

> **Purpose:** Working context for future contributors and coding sessions. Read this before changing the learning experience.
>
> **Repository:** `oliverlaudan-ops/learning-german`  
> **Working branch:** `main`  
> **Last shipped:** [#10 — Track advanced listening progress](https://github.com/oliverlaudan-ops/learning-german/pull/10), merged 2026-09-30.  
> **Branch rule:** Branch off `main` for feature or documentation work. Keep changes scoped. GitHub Pages deploys from `main` after merge.

## 1. Product mission

`learning-german` is a practical, personal German-learning companion for an English-speaking learner moving from approximately **A2 toward B1**.

The portal should help the learner:

- understand what to learn next;
- practise useful German in realistic situations;
- improve listening and speaking confidence;
- retain vocabulary and grammar through review;
- see meaningful progress without being forced through a rigid beginner course.

The guiding question for every feature is:

> **Will this genuinely help the learner become more confident in real German?**

### Product principles

- **German-first advanced practice.** New B1 listening lessons use German questions, instructions and feedback. English transcript translations remain optional disclosure help; earlier foundation lessons can retain English explanations.
- **Teach in context.** Prefer dialogues, situations, sentence patterns, articles/plurals, and complete phrases over isolated word pairs.
- **A2→B1 is the immediate priority.** A1 exists mainly as foundation/refresh; B2 is secondary until the current path is strong.
- **Clear next action.** The learner should not need to plan the learning session herself.
- **Mobile-first.** The learner primarily uses a phone, so controls, layouts, audio and feedback must remain usable on small screens.
- **Local-first progress.** Learning data lives in browser storage and should survive upgrades through safe migrations.
- **Motivation supports learning.** Streaks, achievements and progress indicators should direct attention toward useful practice, not become the product goal.
- **Do not overclaim assessment.** Placement is advisory; pronunciation practice is not automatic pronunciation scoring.

## 2. Learning architecture

```text
Placement Check
      |
      +--> A1 — Foundation & Refresh
      +--> A2 — Core Course
      +--> B1 — Next Level
      |
      v
Smart Review / SRS
      |
      v
B2 — Advanced (later priority)
```

### Placement Check

The in-app placement check currently contains **21 questions across A1, A2 and B1**. It covers vocabulary, grammar, articles, sentence order, reading, perfect tense, cases, modal verbs, connectors and listening.

It returns:

- per-level percentages;
- strengths/focus areas;
- a recommended level;
- a recommended chapter;
- up to two refresher chapters;
- an approximate flag for borderline A2/B1 cases.

It is a starting recommendation, not a formal CEFR examination.

### A1 — Foundation & Refresh

A1 is not the default full course for the current learner. It provides targeted refreshers for gaps such as articles, cases, word order, modal verbs, `sein`/`haben`, accusative basics and everyday phrases.

The guided lesson pattern established here is the reference pattern for later levels.

### A2 — Core Course

A2 is the current core. Guided A2 content covers practical domains including travel, work, health, prefixes and hobbies/free time.

Dedicated A2/A2+ listening extends this with realistic conversations and increasingly demanding comprehension.

### B1 — Next Level

B1 shifts from producing isolated correct sentences toward understanding and expressing more natural, connected German. Current B1 listening work already introduces faster speech, changing information, multiple speakers, distractors and conditional details.

### B2 — Advanced

B2 remains a later priority: longer texts, argumentation, formal language, nuance, idiomatic language and advanced grammar.

### Smart Review

The portal already has Leitner SRS and category statistics. The longer-term direction is to combine SRS, quiz errors, placement focus areas and listening history into clearer review recommendations.

## 3. Current technical foundation

The application is a **Vite + TypeScript browser app** with **Vitest + happy-dom** tests.

```text
src/
  data/      learning content, lesson metadata, placement and listening JSON
  grammar/   pure grammar quiz logic
  quiz/      pure vocabulary/sentence quiz logic
  srs/       pure Leitner spaced-repetition logic
  state/     AppState persistence, migrations and write-back helpers
  ui/        DOM rendering and interaction wiring
  types.ts   central types
  main.ts    app bootstrap
```

### Persisted learner systems

The current storage key is **`learning-german-v5-state`**.

Each profile can contain:

- overall and per-level progress;
- chapter progress and learned word IDs;
- quiz history;
- SRS state;
- category statistics;
- placement snapshot;
- optional advanced-listening history.

Older v2/v3/v4 storage is migrated forward. Listening history was added as an optional v5 field, so PR #10 did not need a v6 migration.

### Existing practice systems

- five-box Leitner schedule: 1, 3, 7, 14 and 30 days;
- vocab quiz modes: German→English, English→German, audio dictation, sentence completion and B1+ sentence typing;
- grammar categories including articles, conjugation, plural, cases, prepositions, pronouns, negation, modal verbs, perfect tense, prefixes, subordinate clauses, preterite, Konjunktiv II and relative clauses;
- daily goal, streaks, achievements, quiz accuracy and level progress;
- browser Speech Synthesis for pronunciation and most advanced listening lessons;
- bundled MP3 audio for the weekend lesson.

## 4. Guided lesson experience

Guided lessons follow this sequence:

1. **Learn** — goal and useful language;
2. **Listen** — hear German;
3. **Understand** — concise English explanation;
4. **Build** — construct a German sentence;
5. **Speak** — listen and repeat;
6. **Real German** — use a practical phrase/dialogue;
7. **Review** — continue into quiz/SRS practice.

The Learn index and chapter pages coexist with existing vocabulary, grammar, practice and review flows rather than replacing them.

## 5. Listening path shipped on `main`

### #5 — Making weekend plans

- level: A2;
- six-turn conversation;
- bundled Piper/Thorsten MP3 audio;
- hidden transcript on first listen;
- comprehension questions;
- replayable turns;
- chunked speaking/pronunciation guidance;
- normal and slower playback;
- no microphone or pronunciation score.

This unit uses a dedicated MP3 renderer and is not currently part of scored listening history.

### #6 — Making a doctor's appointment

- target: A2+/early B1;
- realistic phone call with symptoms and changing appointment details;
- true/false, gap fill, event ordering, transcript review and speaking prompts;
- browser Speech Synthesis with fallback text.

### #7 — At the doctor's consultation

- target: B1;
- symptoms, examination, likely diagnosis, medication instructions, sick note and warning signs;
- uses the shared advanced-listening renderer.

### #8 — A missed connection at the station

- target: B1;
- two speakers when multiple installed German voices are available;
- faster normal playback;
- rejected times/routes/platforms and one final valid connection;
- linked from Travel and Transport.

### #9 — Finding the right flat

- target: B1;
- three speakers when available;
- phone call plus viewing;
- changing rent, move-in dates, documents, fixtures and pet conditions;
- deliberately includes old, corrected and conditional information;
- linked from B1 housing.

### #10 — Listening progress

The four advanced A2+/B1 listening lessons now produce optional scored results when comprehension tasks are actually checked.

A saved listening result includes:

- lesson and chapter IDs;
- pedagogical level label such as `A2+` or `B1`;
- correct/total/accuracy;
- per-task scores for true/false and gap fill;
- event-order result;
- completion timestamp.

Important behaviour:

- skipped task types are excluded from the denominator rather than counted wrong;
- a run with no checked comprehension tasks is not persisted as a 0% result;
- the completion screen shows a task breakdown and next-step recommendation;
- the learner can retry immediately;
- Learn shows a Listening Progress summary with latest result, number of scored sessions and number of different advanced lessons practised;
- only the newest 50 listening attempts are retained per profile.

### #13 — Eine Weiterbildung planen

- merged 2026-10-01;
- B1 workplace dialogue with reasons, conditions, corrected prices and registration order;
- German questions, instructions, controls, feedback and results;
- optional English transcript help and a free spoken summary;
- linked from Learn and Berufsleben vertieft.

### New lesson — Eine beschädigte Lieferung reklamieren

- B1 customer-service dialogue with rejected alternatives, photo requirements, return deadline and a delivery estimate that is not a guarantee;
- same German task flow and optional English transcript help as #13;
- true/false, gap fill, event ordering and free email-writing practice;
- linked from Learn and Medien & Kommunikation;
- free writing is not automatically assessed; checked comprehension uses existing per-profile listening history.

## 6. CI and deployment

GitHub Actions currently uses:

- Node.js **24**;
- `actions/checkout@v6`;
- `actions/setup-node@v7`;
- `npm ci`;
- `npm test`;
- `npm run build`.

The test workflow runs on pull requests targeting `main`, pushes to `main`, and manual dispatch.

GitHub Pages deploys from `main` after merge using the production `dist/` build.

### Current verified baseline

After PR #10:

- **175 tests across 15 test files** (172 before PR #10 + 3 new listening-progress tests);
- production TypeScript/Vite build passes in CI;
- PR #10 CI passed before merge.

## 7. Recommended next steps

Listening has enough content now that the next value should come from **better adaptation and progression**, not simply adding near-identical exercises.

Prioritize roughly in this order unless a new user request changes direction:

1. **Use listening history for recommendations**
   - identify weak task types or repeated low scores;
   - recommend a specific listening retry or related chapter;
   - avoid turning one attempt into a permanent label.

2. **Strengthen placement and path personalization**
   - improve separation between A2, A2+ and B1;
   - add more diagnostic reading/listening;
   - combine placement with actual learning and listening evidence.

3. **Expand B1 guided content**
   - housing now has an advanced listening entry but broader B1 guided lesson coverage remains limited;
   - add natural connectors, explanation/correction and self-expression.

4. **Improve Smart Review**
   - use SRS, category errors, placement focus areas and listening results together;
   - surface one or two useful next actions rather than a generic queue.

5. **Offline resilience**
   - fixed MP3 assets work once cached by the browser but there is no explicit service-worker/offline-download system;
   - consider deliberate asset caching only when it improves the learner's real usage.

6. **Richer speaking only when useful**
   - recording and automated speech assessment are intentionally absent;
   - do not add them merely for novelty or imply reliable pronunciation scoring without a sound evaluation design.

## 8. Technical decisions to preserve

- Keep quiz, grammar and SRS logic DOM-independent where possible.
- Keep DOM interaction in `src/ui/`.
- Preserve existing Learn, Practice, Review, profile and stats flows when adding features.
- Protect local learner data whenever state changes.
- Prefer optional state additions when a version bump is unnecessary and backward-compatible.
- Keep listening content data-driven rather than copying renderers per lesson.
- Preserve mobile usability and audio fallbacks.
- Do not present placement as official CEFR certification.
- Do not present repeat-after-me practice as automated pronunciation assessment.

## 9. Handoff checklist

Before implementing new work:

1. Read `CONTEXT.md` and `ARCHITECTURE.md`.
2. Start from current `main` and create a scoped branch.
3. Run or rely on a green baseline for `npm test` and `npm run build` before making substantial changes.
4. Keep learning content in `src/data/`, pure logic in its domain module, persistence in `src/state/`, and DOM wiring in `src/ui/`.
5. Add or update tests for the behaviour being changed.
6. Open a PR rather than committing feature work directly to `main`.
7. Let the Pages workflow deploy only after merge.

## 10. Short handoff prompt

> Read `CONTEXT.md` and `ARCHITECTURE.md`, inspect current `main`, preserve existing learner data and interaction flows, choose the next feature based on actual A2→B1 learning value, implement it on a scoped branch with tests, and open a PR. Do not deploy a feature branch directly.
