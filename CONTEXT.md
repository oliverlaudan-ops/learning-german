# learning-german — Project Context

> **Purpose:** Current product and implementation context for future contributors and AI coding sessions. Read this before changing the learning experience.
>
> **Repository:** `oliverlaudan-ops/learning-german`  
> **Working branch:** `main`  
> **Current documented feature baseline:** PR #22 — four complete recorded Goethe B1 listening practice sets  
> **Documentation refreshed:** 2026-10-17  
> **Branch rule:** Branch from current `main`, keep work scoped, verify it, and merge through a pull request. GitHub Pages deploys from `main`.

## 1. Product mission

`learning-german` is a personal German-learning companion for an English-speaking learner moving from approximately A2 toward B1.

The portal should help the learner:

- understand what to learn next;
- practise useful German in realistic situations;
- improve listening and speaking confidence;
- retain vocabulary and grammar through review;
- see meaningful progress without being forced through a rigid beginner course.

### Product principles

- **German-first advanced practice.** B1 questions, instructions and feedback should normally be German. English may remain optional help.
- **Teach in context.** Prefer situations, complete phrases, corrections and final agreements over isolated translations.
- **A2→B1 is the immediate priority.** A1 is primarily foundation/refresh; B2 is a later priority.
- **Clear next action.** The learner should not need to design every study session.
- **Mobile-first.** Controls, layouts, audio and feedback must remain usable on a phone.
- **Local-first progress.** Learner data stays in browser storage and upgrades must remain backward-safe.
- **Do not overclaim.** Placement is advisory, pronunciation repetition is not automated assessment, and Goethe-oriented practice is neither official material nor an official score.
- **Evidence before confidence.** Documentation must distinguish shipped behaviour, historical verification and future work.

## 2. Current learner experience

### Course and review

- A1 foundation and refresher content;
- A2 guided core lessons;
- B1 chapter and realistic-listening content;
- B2 placeholder/advanced direction;
- 21-question A1–B1 placement check;
- vocabulary practice in five modes;
- grammar cloze and sentence-construction practice;
- five-box Leitner spaced repetition;
- profiles, progress, streaks, achievements and category statistics.

Guided lessons use this sequence:

1. Learn
2. Listen
3. Understand
4. Build
5. Speak
6. Real German
7. Review

### Dedicated real-life listening

The portal includes:

1. Making weekend plans — A2, bundled MP3 and speaking chunks.
2. Making a doctor's appointment — A2+/early B1.
3. At the doctor's consultation — B1.
4. A missed connection at the station — B1.
5. Finding the right flat — B1.
6. Eine Weiterbildung planen — B1, German-first interface.
7. Eine beschädigte Lieferung reklamieren — B1, German-first interface.

The last six use the shared data-driven advanced-listening renderer. Checked comprehension tasks contribute to a score; skipped task types are excluded rather than counted wrong. Free speaking and writing prompts are not automatically assessed or stored.

### Goethe B1 Hören preparation

A dedicated **B1 Exam** navigation tab contains:

- a focused Teil 1 practice with five texts and ten questions;
- four full practice sets;
- 30 questions per set across Parts 1–4, distributed 10 / 5 / 7 / 8;
- guided and automatic exam-like modes;
- a five-minute answer-transfer stage;
- a dated seven-stage study plan;
- daily completion flags;
- per-part averages, weakest-part guidance and distinct-set coverage.

All four sets have bundled synthetic MP3 recordings: 32 files in total. The browser's German Speech Synthesis API is a visible fallback when an MP3 cannot play.

The exam-like flow uses shortened preparation pauses and is not a time-faithful 40-minute official simulation. All scripts, questions and recordings are independently created study material.

The confirmed target stored in the current study-plan data is **21 November 2026**. Reading, writing and speaking exam modules are outside the present scope.

## 3. Technical foundation

The application is a Vite 8 + TypeScript 6 browser app with Vitest 4 and happy-dom. It has no UI framework and uses browser `localStorage`.

```text
src/
  data/      learning content, placement, listening and Goethe exam data
  grammar/   pure grammar scoring/state
  quiz/      pure vocabulary and sentence logic
  srs/       pure Leitner review logic
  state/     AppState persistence and migrations
  ui/        DOM rendering and interaction wiring
  types.ts   central application interfaces
  main.ts    bootstrap
```

Important Goethe modules:

```text
src/data/goethe-b1-part1.ts
src/data/goethe-b1-parts.ts
src/data/goethe-b1-alternative-sets.ts
src/data/goethe-b1-study-plan.ts
src/ui/goethe-b1.ts
src/ui/goethe-b1-full-exam.ts
src/ui/goethe-b1-study-plan.ts
src/ui/goethe-b1.css
```

See `ARCHITECTURE.md` for module responsibilities, exported functions, scoring, storage and the audio pipeline.

## 4. Persistence

The main state is stored under `learning-german-v5-state`. Older v2/v3/v4 data is migrated forward. Each profile may contain course progress, learned words, quiz/SRS data, statistics, placement results and optional advanced-listening history.

Goethe practice deliberately uses separate profile-scoped keys:

- `goethe-b1-hoeren-v1-<profileId>` — focused Teil 1 history, newest 30;
- `goethe-b1-hoeren-full-v1-<profileId>` — four-part history, newest 50;
- `goethe-b1-daily-checks-v1-<profileId>` — dated completion flags.

Do not rename, merge or discard these keys without a migration and backward-compatibility plan.

## 5. Goethe scoring and study guidance

`gradeB1` scores the selected practice set and returns total score, percentage and raw scores for Parts 1–4.

Part sizes differ, so comparison and progress displays normalize by 10, 5, 7 and 8 questions respectively.

- `weakestPart` uses the latest valid full attempt for targeted advice.
- `listeningProgress` averages valid attempts by part and counts distinct practice sets.
- Older full-attempt records without `setId` are treated as Set 1.
- A completed full attempt is retained even if not every question was answered; unanswered questions score zero.

The 80% goal is a training target, not an official Goethe threshold.

## 6. Audio generation and validation

The audio source chain is:

```text
TypeScript exam data
  → scripts/export-goethe-b1-audio.mjs
  → scripts/goethe-b1-recording-manifest.json
  → scripts/generate-goethe-b1-audio.py
  → public/audio/goethe-b1/**/*.mp3
```

The manifest contains 32 rows: four sets × eight texts. The generator requires FFmpeg, `piper-tts==1.3.0` and four German ONNX voice models supplied through `--thorsten`, `--kerstin`, `--ramona` and `--eva`.

`.github/workflows/goethe-b1-audio.yml` regenerates Sets 2–4 on designated feature branches or by manual dispatch. It is separate from normal application CI and commits changed generated assets to the triggering branch.

Before redistributing regenerated audio:

- review the voice-model licenses and attribution requirements;
- listen for pronunciation, proper names, intelligibility and rhythm;
- confirm dialogue speaker separation;
- run the audio asset tests.

## 7. CI, deployment and verification

`.github/workflows/test.yml` runs on pull requests to `main`, pushes to `main` and manual dispatch. It uses Node 24 and runs:

```bash
npm ci
npm test
npm run build
```

The Pages workflow builds and deploys from `main`.

Historical baseline: PR #14 passed 184 tests in 18 files on 2026-10-01. The repository now contains 22 test files, so that number is not the current baseline. Use the latest completed GitHub Actions run when reporting current verification.

Coverage now includes Goethe full-exam grading, alternative sets, study-plan logic, audio-file presence and manifest/script parity in addition to the established state, quiz, SRS, grammar, placement, dashboard, lessons and real-life listening coverage.

## 8. Current priorities

Prioritize roughly in this order unless the learner requests something else:

1. **Use evidence for recommendations**
   - combine SRS, placement, quiz errors and listening results;
   - recommend one or two concrete next actions.

2. **Improve B1 progression**
   - broaden guided B1 production, connectors, correction and self-expression;
   - avoid adding repetitive listening sets without a clear learning gain.

3. **Improve exam-practice realism carefully**
   - perform human audio quality review;
   - improve timing only when it remains clearly labelled as practice;
   - never imply official Goethe equivalence.

4. **Offline resilience**
   - consider deliberate service-worker caching only when it improves real usage.

5. **Documentation sustainability**
   - update product, architecture and handoff documents in the same PR as structural or persistence changes;
   - move historical release narratives to a changelog instead of appending contradictory current-state sections.

## 9. Technical decisions to preserve

- Keep pure scoring and review logic independent of the DOM.
- Keep DOM/event wiring in `src/ui/`.
- Keep learning and exam content in `src/data/`.
- Protect existing browser data through backward-safe changes.
- Preserve Learn, Practice, Review, profile and statistics flows.
- Prefer the shared advanced-listening renderer for compatible real-life lessons.
- Keep Goethe scoring separate from official-exam claims.
- Preserve mobile usability and visible audio fallbacks.
- Do not treat skipped advanced-listening tasks as incorrect unless product intent changes explicitly.

## 10. AI maintenance model

This repository is written and maintained with AI assistance. That is part of the project's operating model, not evidence that changes are automatically correct.

Every AI session should:

1. inspect current `main`, not rely only on prior conversation context;
2. read `README.md`, `CONTEXT.md`, `ARCHITECTURE.md` and `DOCUMENTATION_MAINTENANCE.md`;
3. preserve user data and architectural boundaries;
4. add or update tests for changed behaviour;
5. update documentation in the same pull request;
6. distinguish verified facts from assumptions and historical results;
7. use a scoped branch and pull request;
8. report what was actually run and what was not.

Generated learning content and audio require human pedagogical and listening review even when structural tests pass.

## 11. Handoff checklist

Before implementing new work:

1. Fetch current `main` and inspect recent commits.
2. Create a scoped feature or documentation branch.
3. Confirm the relevant persistence and UI integration points.
4. Implement the smallest coherent change.
5. Run `npm test` and `npm run build`.
6. Update affected documentation and the documentation audit record.
7. Open a pull request with limitations and verification evidence.
8. Let GitHub Pages deploy only after merge.
