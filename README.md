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

## Goethe B1 Hören – exam-oriented practice (October 2026)

The dashboard now offers two separate learning experiences:

- **Teil 1 practice:** Five short original scripts and ten comprehension questions, with guided and timed modes (the initial prototype).
- **Full four-part practice:** Eight original scripts in total (five short announcements, one guided tour, one extended conversation, and one radio discussion), with **30 questions** divided into **10 / 5 / 7 / 8** across parts 1–4. All prompts, answer choices, and explanations are in German.
- **Guided mode:** Replays without limit, transcript on demand, and instant explanations.
- **Exam-style mode:** A 40-minute countdown, a maximum of two plays per Teil 1 text and Teil 4 discussion, one play for Teil 2 and Teil 3, answer checking before final submission, no transcript until results, and scores per part.
- **Progress:** The last 30 attempts are saved locally per learner profile in the browser under `goethe-b1-hoeren-full-v1-<profileId>`. They do not alter existing learner-profile storage or lesson progress.

**Limitations:** This is *original practice*, **not** an official Goethe examination or equivalent scoring instrument. Audio currently comes from the browser's German text-to-speech engine. Browser TTS does **not** reproduce real multi-speaker recordings, fixed pauses, the automatic playback sequence, reliable acoustic quality, or the formal five-minute paper answer-transfer procedure. The timed section is a training convenience rather than a faithful full exam recording. Learners should also use the [official Goethe B1 model test](https://bfu.goethe.de/b1_mod/hoeren.php). Planned next step: recorded multi-speaker audio with a deterministic sequence, additional original sets, and a personalised study plan.

**Exam date:** The Kampala appointment needs confirmation against Judith's booking; the study target currently assumes 21–23 November 2026.

## B1 Hören study-plan and pre-recorded audio support

The Goethe B1 card now contains Judith's dated seven-stage learning schedule (9 October–23 November 2026), a daily practice recommendation and a per-profile completed-today checkbox. The schedule uses **21 November 2026 as a conservative target** while her reported 23 November examination date is still to be reconciled with the centre's booking confirmation. Full-practice results are taken from the existing profile-scoped local history, and the weakest part is selected using the *percentage* of each part rather than the raw number correct.

The full four-part practice tries to load bundled `public/audio/goethe-b1/segment-0.mp3` through `segment-7.mp3`; if a file is not supplied, it visibly falls back to the browser's German speech synthesizer. **No new MP3 recordings have been included in this PR.** A repeatable recording workflow is provided:

```bash
node scripts/export-goethe-b1-audio.mjs
python scripts/generate-goethe-b1-audio.py /path/to/german-voice-one.onnx /path/to/german-voice-two.onnx
```

The generator requires Piper TTS (`piper-tts==1.8.0`) and FFmpeg, exports eight fixed MP3 recordings at 64 kbps, and uses the second voice for Jonas and Herr Brandt if provided. You must review audio quality and pronunciation and then commit the actual generated assets in a later PR. The synthetic recordings are not original human voice acting or official Goethe audio. Existing listening lessons remain unchanged.

Known limitations: the browser-speech fallback and player still need a more faithful automatic exam sequence, calibrated pauses, audio-completion guard and truly distinct female/male voices for all panel members. Do not claim formal Goethe exam equivalence.
