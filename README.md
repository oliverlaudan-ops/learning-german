# Deutsch Lernen 🇩🇪

A personal German-learning portal for English speakers, built around practical A2→B1 learning, guided lessons, listening comprehension, spaced repetition, and locally stored progress.

## Current learning experience

- **CEFR path:** A1 foundation/refresh, A2 core course, B1 next level, B2 advanced placeholder/content area.
- **Guided lessons:** learn, listen, understand, build, speak, use real German, then review.
- **Placement check:** 21-question in-app diagnostic across A1, A2, and B1 with chapter-level recommendations and optional refreshers. It is a learning recommendation, not an official CEFR exam.
- **Vocabulary practice:** German↔English, audio dictation, sentence completion, and B1+ sentence typing.
- **Grammar practice:** cloze and sentence-construction exercises across articles, cases, modal verbs, perfect tense, prefixes, subordinate clauses, Konjunktiv II, relative clauses, and more.
- **Smart review:** five-box Leitner spaced repetition with local review state.
- **Profiles and progress:** multiple learner profiles, quiz history, level/chapter progress, streaks, achievements, category statistics, and placement results are stored in the browser.

## Listening and speaking

The portal currently includes seven dedicated listening experiences:

1. **Making weekend plans** — A2, bundled MP3 audio, comprehension questions and pronunciation/chunk practice.
2. **Making a doctor's appointment** — A2+/early B1, realistic phone call with changing details.
3. **At the doctor's consultation** — B1, symptoms, examination, medicine instructions, sick note, and warning signs.
4. **A missed connection at the station** — B1, two-speaker travel disruption with rejected alternatives and final journey details.
5. **Finding the right flat** — B1, three speakers, changing rent/dates/documents and conditional information.
6. **Eine Weiterbildung planen** — B1, workplace training, reasons, conditions and final registration arrangements; German instructions and feedback.
7. **Eine beschädigte Lieferung reklamieren** — B1, damaged delivery, rejected alternatives, exchange conditions and delivery estimates; German instructions and feedback.

The six advanced A2+/B1 listening lessons share a data-driven interaction flow:

- hidden-transcript listening;
- true/false comprehension;
- gap fill;
- event ordering;
- transcript review and speaking practice;
- scored completion summary;
- per-profile listening history and a Listening Progress summary in Learn.

The two newest B1 lessons use German questions, instructions, controls and feedback. English transcript translations are available as optional expandable help. They appear in Learn and in **Berufsleben vertieft** (`b1-ch2`) and **Medien & Kommunikation** (`b1-ch8`) respectively.

The workshop lesson adds a free spoken summary; the complaint lesson adds a short email-writing prompt. These are self-directed exercises without automated assessment or saved written responses.

Skipped comprehension task types are not counted as wrong answers. Pronunciation practice is not presented as automated speech assessment.

## Tech stack

- Vite 8 + TypeScript 6
- Vitest 4 with happy-dom
- browser `localStorage` persistence
- browser Speech Synthesis for advanced listening lessons and as an audio fallback
- bundled static MP3 audio for the weekend lesson and all four Goethe B1 practice sets
- GitHub Actions CI and GitHub Pages deployment
- mobile-first CSS

## Development

```bash
npm ci
npm run dev
```

Verification:

```bash
npm test
npm run build
```

Historical baseline: the PR #14 changes passed 184 tests across 18 test files on 2026-10-01. The repository now contains 22 test files; use the latest GitHub Actions run as the current verification record rather than treating the historical count as the present baseline.

GitHub Actions runs both commands for pull requests targeting `main` and for pushes to `main`. Pages deploys from `main` after merge.

## Project structure

```text
learning-german/
├── .github/workflows/       # CI + Pages deployment
├── public/                  # static assets and bundled listening audio
├── scripts/                 # helper scripts, including audio generation
├── src/
│   ├── data/                # lessons, vocabulary, grammar, placement + listening content
│   ├── grammar/             # pure grammar quiz logic
│   ├── quiz/                # pure vocabulary/sentence quiz logic
│   ├── srs/                 # Leitner spaced-repetition logic
│   ├── state/               # persisted app state + migrations/write-back helpers
│   ├── ui/                  # DOM rendering and interaction wiring
│   ├── main.ts              # application bootstrap
│   ├── style.css            # shared styles
│   └── types.ts             # central TypeScript interfaces
├── tests/                   # Vitest suites
├── ARCHITECTURE.md          # technical architecture and invariants
├── CONTEXT.md               # product direction, shipped work, handoff context
├── DOCUMENTATION_MAINTENANCE.md # documentation audit + AI maintenance policy
├── package.json
└── index.html
```

## State and privacy

Learner data is stored locally in the browser. The current application-state key is `learning-german-v5-state`; older v2/v3/v4 data is migrated forward when found. Advanced-listening history is optional within v5.

Goethe B1 practice uses separate profile-scoped keys:

- `goethe-b1-hoeren-v1-<profileId>` — Teil 1 prototype history, newest 30 attempts;
- `goethe-b1-hoeren-full-v1-<profileId>` — four-part practice history, newest 50 attempts;
- `goethe-b1-daily-checks-v1-<profileId>` — completed-today study-plan checkboxes.

All of these remain local to the browser. No learner data is sent to a server by the application.

## Product direction

The immediate goal is not to build a generic language platform. The portal is optimized for a learner moving from A2 toward B1, with practical real-life German, increasingly demanding listening, clear next actions, and review driven by actual learning data.

See `CONTEXT.md` for the current roadmap and `ARCHITECTURE.md` for implementation details.

## License

The project is licensed under the MIT License. See `LICENSE`; `package.json` uses the same license identifier.

## Goethe B1 Hören preparation

The dedicated **🎧 B1 Exam** primary-navigation tab contains:

- a focused Teil 1 practice with five short texts and ten questions;
- four complete practice sets, each with 30 German-language questions across Parts 1–4;
- guided and exam-like modes;
- a dated study plan, daily recommendation and completion checkbox;
- per-part score summaries and practice-set coverage.

The four-part practice contains eight texts per set: five short announcements, one presentation or guided tour, one extended conversation and one panel/radio discussion. Question totals are **10 / 5 / 7 / 8** for Parts 1–4.

### Modes and scoring

In guided mode, recordings can be replayed, transcripts are available and selected answers receive immediate feedback. In exam-like mode, the eight recordings advance automatically with shortened preparation pauses and their configured replay limits. It finishes with a five-minute answer-transfer screen.

This is deliberately an **exam-like training flow**, not a time-faithful 40-minute simulation. Scores and the 80% training target are not official Goethe grading.

Completed four-part attempts are stored per profile under `goethe-b1-hoeren-full-v1-<profileId>`. The newest 50 attempts are retained. Each result contains the practice-set ID, mode, overall score, percentage, per-part scores and completion time. Results created before practice-set IDs were introduced are treated as Set 1.

### Audio assets and fallback

All four practice sets have pre-generated synthetic MP3 recordings:

- Set 1: `public/audio/goethe-b1/segment-0.mp3` through `segment-7.mp3`;
- Sets 2–4: `public/audio/goethe-b1/set-N/segment-0.mp3` through `segment-7.mp3`.

The 32 recordings use four German Piper voices. Dialogues and discussions synthesize each labelled speaker turn separately and insert short pauses between turns. If an MP3 cannot be loaded, the player falls back to German browser Speech Synthesis and labels that fallback visibly.

All scripts, questions and recordings are independently created practice material. They are not official Goethe content, human voice acting or a formal assessment. Manual listening review remains necessary for pronunciation, names, rhythm, intelligibility and speaker differentiation.

### Rebuilding the recordings

The canonical script manifest is generated from the TypeScript data:

```bash
node scripts/export-goethe-b1-audio.mjs
```

The Python generator requires FFmpeg, `piper-tts==1.3.0` and four downloaded ONNX voice models:

```bash
python scripts/generate-goethe-b1-audio.py \
  --thorsten /path/to/de_DE-thorsten-medium.onnx \
  --kerstin /path/to/de_DE-kerstin-low.onnx \
  --ramona /path/to/de_DE-ramona-low.onnx \
  --eva /path/to/de_DE-eva_k-x_low.onnx
```

By default the generator rebuilds Sets 2–4. Use `--sets` to select one or more of `set-2`, `set-3` and `set-4`. Set 1 remains in its legacy root path.

The [audio workflow](.github/workflows/goethe-b1-audio.yml) exports the manifest, generates and validates the 24 Set 2–4 recordings and commits changed assets to the triggering feature branch. The ordinary production build needs only the committed MP3 files, not Piper or the voice models.

The confirmed study-plan target in the current data is **21 November 2026**. Reading, writing and speaking examination modules are outside the present feature scope.

## AI maintenance model

The project is written and maintained with AI assistance. AI-generated changes are still expected to satisfy the same evidence standards as human changes: inspect current `main`, preserve learner data, update tests and documentation together, run verification, and avoid claims that are not supported by code or current CI results.

See [`DOCUMENTATION_MAINTENANCE.md`](DOCUMENTATION_MAINTENANCE.md) for the documentation ownership map, audit record and maintenance checklist.

## Legal information and provenance

The app footer links to `/rechtliches/` for operator details, portal-specific privacy information and AI/content provenance. See [content provenance and open review points](docs/content-provenance.md), especially for synthetic voice recordings and the unresolved Thorsten/Lessac and Kerstin/Ryan base-model chains. [Shipped audio notices](public/audio/VOICE-NOTICES.txt) include the full M-AILABS terms. These notices do not by themselves close unrestricted-use clearance. Browser speech may use remote voices depending on the user's browser and system; local progress storage does not imply all audio processing is local.
