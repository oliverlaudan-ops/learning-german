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
- browser Speech Synthesis for most advanced listening lessons
- bundled static MP3 audio for the weekend lesson
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

Latest local verification for the lesson changes on 2026-10-01: **184 tests across 18 test files passed**, and the production TypeScript/Vite build passed.

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
├── package.json
└── index.html
```

## State and privacy

Learner data is stored locally in the browser. The current state key is `learning-german-v5-state`; older v2/v3/v4 data is migrated forward when found. Listening history is optional within v5, so the listening-progress feature did not require another storage-version bump.

## Product direction

The immediate goal is not to build a generic language platform. The portal is optimized for a learner moving from A2 toward B1, with practical real-life German, increasingly demanding listening, clear next actions, and review driven by actual learning data.

See `CONTEXT.md` for the current roadmap and `ARCHITECTURE.md` for implementation details.

## License

See `LICENSE` and the `license` field in `package.json` for repository licensing information.
