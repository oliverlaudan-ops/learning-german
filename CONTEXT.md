# learning-german — Project Context

> **Purpose:** This file is the working context for future contributors and Codex sessions. Read it before changing the learning experience. It captures agreed product direction, the current architecture, work already present on the development branch, and the next priorities.
>
> **Repository:** `oliverlaudan-ops/learning-german`  
> **Working branch:** `agent/dashboard-learning-flow`  
> **Pull request:** [#4 — Introduce learner-focused dashboard](https://github.com/oliverlaudan-ops/learning-german/pull/4) (draft, targeting `main`)  
> **Branch rule:** Work on the branch above. **Do not change, merge into, or deploy from `main` unless explicitly requested.**

## 1. Product mission

`learning-german` is not meant to be a generic vocabulary trainer or a collection of disconnected quizzes.

It is being shaped into a practical, personal German-learning companion for an English-speaking learner living in Uganda. The immediate learner is approximately **A2 moving toward B1**. The portal should help her understand what to learn next, practise it in realistic context, retain it, and see meaningful progress.

The guiding question for every feature is:

> **Will this genuinely help the learner become more confident in real German?**

### Product principles

- **English is the explanation language; German is the language being learned.** Grammar explanations should be simple, natural English, supported by useful German examples.
- **Teach language in context.** Prefer articles, plurals, example sentences, short dialogues, and communicative situations over isolated word pairs.
- **Personalized, not linear by default.** The learner should not be forced to repeat an entire beginner course when she only needs a targeted refresh.
- **Clear next action.** The dashboard should answer “What should I do today?” without making the learner plan the session herself.
- **Mobile-first and offline-first.** This matters for the learner's context: the app should remain useful after an initial load without requiring constant connectivity.
- **Motivation supports learning, not the other way around.** Goals, streaks, XP/progress, achievements, and review counts are useful only when they direct attention toward learning.
- **Build from a good reference lesson.** A1 is the pedagogical reference implementation; later A2–B2 work should reuse and improve its lesson pattern rather than create unrelated experiences.

## 2. Agreed learning architecture

This is the agreed high-level learning model:

```text
Placement Test
      |
      +--> A1 — Foundation & Refresh
      +--> A2 — Core Course
      +--> B1 — Next Level
      |
      v
B2 — Advanced
      |
      v
Smart Review (across all levels)
```

### Placement Test

The entry point is a short diagnostic, not a formal CEFR exam. It should assess vocabulary, grammar, articles/gender and cases, verb forms, sentence structure, reading, and eventually practical language situations/listening.

Its result must be an explanation and recommendation—not merely a score. Example:

> Your estimated level: A2+  
> Your vocabulary is strong, but you should review German cases before moving toward B1.  
> Recommended: A2 → Chapter 5  
> Quick refresher: A1 → Cases

The current implementation is deliberately a prototype. It is helpful for a starting recommendation, but it is not yet fine-grained enough to reliably separate A2, A2+, and B1.

### A1 — Foundation & Refresh

A1 is **not** the default full course for the current learner. It is a targeted foundation and refresh area: articles/gender, basic word order, `sein`, `haben`, modal verbs, accusative basics, essential everyday phrases, and similar gaps.

A1 Chapter 1 is the main lesson-quality reference: a complete session should make the learner understand, hear, build, speak, and use language—not just answer multiple-choice questions.

### A2 — Core Course

A2 is likely the learner's primary course now. Prioritize practical communication around everyday life, work, travel, health, housing, conversations, the past, and increasingly complex sentence structures.

### B1 — Next Level

At B1 the aim shifts from “How do I say this sentence?” toward “How do I express myself naturally in German?” This level should increasingly include feedback, more natural alternatives, connectors, nuanced vocabulary, and independent communication.

### B2 — Advanced

B2 is future work: complex texts, discussion and argumentation, formal language, nuance, idiomatic expressions, and advanced grammar.

### Smart Review

Smart Review runs across every level. It should eventually use existing SRS data and error/category signals to recommend what needs attention (for example, articles, accusative, sentence structure, vocabulary, or listening) rather than simply show a queue of due words.

## 3. Current technical foundation

The application is a **Vite + TypeScript** browser app with **Vitest** tests. It uses browser storage for persistent progress and is designed mobile-first/offline-first.

The established module boundaries are important:

```text
src/
  data/      learning content, lesson metadata, vocabulary, grammar exercises
  grammar/   pure grammar quiz logic
  quiz/      pure vocabulary quiz and sentence-construction logic
  srs/       Leitner-box spaced repetition logic
  state/     AppState persistence and migrations
  ui/        DOM rendering and interaction wiring
  types.ts   central data types
  main.ts    app entry point
```

### Existing learner systems

- CEFR levels A1, A2, B1, and B2, with chapter and level progress.
- Local persistent state with multiple profile support, progress, quiz history, learned word IDs, SRS state, and category statistics.
- State migrations using `learning-german-v4-state`, with v2/v3 migration paths.
- A five-box Leitner SRS schedule: 1, 3, 7, 14, and 30 days.
- Quiz modes including German→English, English→German, audio dictation, sentence completion, and sentence construction.
- Grammar exercise support for articles, conjugation, plural, cases, prepositions, pronouns, negation, modal verbs, perfect tense, prefixes, subordinate clauses, preterite, Konjunktiv II, and relative clauses.
- Existing motivation/progress systems: daily goal, streaks, accuracy, completed quizzes, achievements, and level progress.
- Browser speech synthesis already used for listening/pronunciation support.

### Technical decisions to preserve

- Keep quiz, grammar, and SRS logic DOM-independent and testable; keep DOM work in the UI layer.
- Do not replace established Learn, Practice, Review, quiz, grammar, SRS, stats, or profile flows just to add new UI.
- Preserve local data and migration safety whenever state shape changes.
- Prefer small, modular UI components/styles over returning new complexity to the legacy monolithic UI.
- Continue supporting mobile layouts and offline use.
- Do not present the placement check as an official CEFR assessment.

## 4. Work already implemented on `agent/dashboard-learning-flow`

The branch is represented by draft PR #4 and currently contains the following feature work in addition to the base application.

### Learner dashboard

New dashboard components and styling provide:

- a learner-focused welcome/home state;
- daily goal, streak, words learned, quiz accuracy, due reviews, and completed quizzes;
- A1–B2 progress displays;
- **Continue Learning**, directing the learner to the next unfinished chapter;
- **Smart Review**, surfacing due SRS work;
- a visible **Placement Check** call to action;
- responsive mobile and desktop presentation.

The dashboard enhancement is added alongside the existing UI rather than replacing its established flows.

### Guided lesson experience

A lesson layer is present for A1 chapters, with lesson metadata/content and a guided session component.

The intended session pattern is:

1. **Learn** — goal and useful language;
2. **Listen** — hear a German sentence via browser speech synthesis;
3. **Understand** — concise English grammar explanation with German examples;
4. **Build** — construct a German sentence from word tiles with feedback;
5. **Speak** — hear and repeat a sentence aloud;
6. **Real German** — a short usable dialogue/situation;
7. **Review** — continue into the existing quiz/SRS system.

The A1 content is therefore the model for future A2–B2 lessons, not a separate disposable prototype.

### Placement Test

An interactive in-app test is implemented and opens from the dashboard in the Learn area.

Current verified implementation:

- 21 questions across A1, A2, and B1 (4 A1 + 9 A2 + 8 B1);
- skills: vocabulary, grammar, articles, sentence order, reading, perfect-tense, cases, modal-verbs, connectors, and listening;
- per-level percentages, total score, strengths, focus areas, and a starting-level recommendation;
- a clear disclaimer: it is a starting recommendation, not a formal CEFR assessment;
- placement evaluation tests covering a strong B1 result, secure A1 with uncertain A2 resulting in A2, and an A1 recommendation when foundations are not secure.

Important limitation: the current recommendation model uses a 70% threshold for A1/A2 progression and returns A1/A2/B1. It does **not** yet model A2+ or diagnose individual weak skills deeply enough for a truly personalized path.

### GitHub Actions / Node update

Both verified workflow files use the current CI setup:

- Node.js **24**
- `actions/checkout@v6`
- `actions/setup-node@v7`
- `npm ci`
- `npm test`
- `npm run build`

The test workflow runs on pull requests to `main`, pushes to `main`, and manual dispatch. The Pages deployment workflow runs from `main` only. This preserves the rule that feature-branch work must not directly deploy or modify `main`.

## 5. Verification and CI status

This context was written after checking PR #4, its changed-file list, and the branch versions of `package.json`, `ARCHITECTURE.md`, the workflow files, `src/main.ts`, state, dashboard wiring, and placement-test files.

- PR #4 is **open** (`state: OPEN`, `mergeable: MERGEABLE`, awaiting review), targets `main`, and has head branch `agent/dashboard-learning-flow`.
- The branch contains the dashboard, lesson, placement, and workflow changes described above.
- Previous project work reported successful test/build runs after the Node 24 workflow update.
- The workflow definitions are verified in the repository; however, the authoring environment for this file did not have authenticated GitHub CLI access to retrieve live PR check results. Treat the current check conclusion as **workflow configuration verified; live check status should be confirmed in GitHub before merging**.
- `main` has not been changed by this documentation work.

## 6. Recommended next steps

Prioritize in this order unless a new user request changes it:

1. **Strengthen the Placement Test**
   - Expand beyond 21 questions and distinguish A2, A2+, and B1 more reliably.
   - Add targeted diagnostics for perfect tense, subordinate clauses, connectors, modal verbs, Konjunktiv II, prepositions/cases, and vocabulary by real-life domain.
   - Add more substantial A2/B1 reading and, later, listening.
   - Convert results into chapter-level recommendations and optional A1 refreshers.

2. **Connect recommendations to a personalized path**
   - Let placement and learning data choose the recommended A2/B1 lesson and any short A1 refreshers.
   - Use category statistics and SRS/error history for Smart Review recommendations.
   - Avoid routing the learner through a rigid A1→B2 sequence.

3. **Finish and validate the A1 reference course**
   - Make the first lesson pedagogically strong and complete.
   - Then apply the same session structure consistently across A1 chapters.
   - Keep explanations simple English and examples practical, natural German.

4. **Build the A2 core course**
   - This is the learner's most immediately valuable content area.
   - Focus on everyday situations, work, travel, health, housing, conversation, past tense, and more complex sentence patterns.

5. **Evolve B1 and Smart Review**
   - Add more natural expression, correction, connectors, and self-expression.
   - Make review increasingly individual rather than a generic due-word list.

6. **Only then extend B2 / richer speaking-listening**
   - Build advanced content after the personalized A2→B1 path is solid.
   - Explore listening comprehension and optional speech/recording only when they serve the core learning flow.

## 7. Handoff checklist for a new session

Before implementing anything:

1. Read this file and `ARCHITECTURE.md`.
2. Confirm the current branch is `agent/dashboard-learning-flow`.
3. Inspect [PR #4](https://github.com/oliverlaudan-ops/learning-german/pull/4) and its live checks.
4. Keep changes scoped; do not alter `main`.
5. Run `npm test` and `npm run build` where a runtime is available.
6. Evaluate each change against the core question: does it make the learner's next German-learning step clearer, more practical, or more effective?

## 8. Short prompt for future Codex sessions

> Read `CONTEXT.md` and `ARCHITECTURE.md` first. Work only on `agent/dashboard-learning-flow` / PR #4, not `main`. We are building a personal, English-guided, mobile/offline-friendly German-learning companion for an A2→B1 learner in Uganda. Preserve the existing quiz/SRS/state architecture; continue toward personalized placement, A2/B1 learning paths, contextual lessons, and smart review.
