# Documentation maintenance

This file records documentation ownership, the 2026-10-17 audit and the maintenance rules for this AI-written and AI-maintained repository.

## Source-of-truth map

| Subject | Primary source | Documentation that must follow |
| --- | --- | --- |
| User-visible capabilities and setup | Current code on `main` | `README.md` |
| Product direction and handoff state | Current code, merged PRs and learner goals | `CONTEXT.md` |
| Module boundaries, exported integration points, storage and data flow | TypeScript, scripts and workflows | `ARCHITECTURE.md` |
| Dependencies and commands | `package.json`, lockfile and workflows | `README.md`, `CONTEXT.md` |
| Browser storage keys and retention | `src/state/` and feature modules using `localStorage` | All three main documents |
| Audio generation | TypeScript exam data, scripts and audio workflow | `README.md`, `ARCHITECTURE.md` |
| Test status | Latest completed local/CI run | PR description; documentation only when dated clearly |
| License | `LICENSE` | `package.json` and `README.md` |

Documentation describes the current merged state unless a section is explicitly labelled historical or planned.

## Audit closed on 2026-10-17

The audit compared documentation at the PR #15 handoff with `main` at commit `81ed5710` (PR #22).

Resolved gaps:

- replaced the stale PR #14 handoff in `CONTEXT.md`;
- documented the dedicated B1 Exam navigation and refresh flow;
- added the Goethe UI, data and study-plan modules to the architecture map;
- documented the exported scoring, planning and progress helpers;
- documented all three Goethe profile-scoped storage keys and their retention limits;
- corrected the full-exam retention limit from 30 to 50;
- removed the obsolete claim of a 40-minute in-app countdown;
- consolidated contradictory MP3/TTS statements into the current 32-file model;
- corrected the audio-generation command to use four named voice-model arguments;
- aligned the documented Piper version with the workflow;
- marked the old 184-test/18-file result as historical rather than current;
- aligned package metadata with the MIT license;
- recorded the repository's AI maintenance model.

## Documentation rules for future changes

Update documentation in the same pull request when a change does any of the following:

- adds, removes or renames a user-visible feature or primary navigation item;
- adds a module with an exported integration point;
- changes a browser storage key, persisted shape, retention limit or migration;
- changes scoring, recommendations or assessment language;
- adds or changes generated assets, generation scripts or workflows;
- changes development commands, dependencies, CI or deployment;
- changes privacy, licensing, attribution or external-service use;
- invalidates a stated limitation or roadmap item.

Use present tense only for behaviour on the branch being documented. Put release history in a changelog or PR description instead of appending old “now” sections to the README.

## AI maintenance policy

AI authors and maintainers must treat repository text, earlier chat context and generated output as fallible.

For every substantive task:

1. inspect the current repository tree and recent commits;
2. identify the code or workflow that is authoritative for each factual claim;
3. preserve backward compatibility for learner data;
4. run relevant tests and the production build, or state precisely why they were not run;
5. review diffs for accidental unrelated changes;
6. update affected documentation and this audit record when structure changes;
7. avoid fabricated test results, live-deployment claims or external compliance claims;
8. request human review for pedagogy, German-language quality, audio quality, licensing interpretation and other areas that tests cannot establish.

A green test suite confirms implemented expectations; it does not by itself confirm pedagogical quality, accessibility, audio naturalness or official-exam equivalence.

## Pull-request documentation checklist

- [ ] README matches the user-visible current state.
- [ ] CONTEXT names the current feature baseline and next priorities.
- [ ] ARCHITECTURE contains new modules, exported seams and data flows.
- [ ] All new or changed storage keys and retention rules are listed.
- [ ] Commands and dependency versions match executable files.
- [ ] Test claims are dated and supported by an actual run.
- [ ] Historical notes do not contradict current-state guidance.
- [ ] License and attribution changes are reflected consistently.
- [ ] AI-generated learning content received appropriate human review.

## Voice-license source review — 2026-10-26

Added shipped notices, pinned model-card references and a 45-file MP3 inventory; updated the portal legal page and README. M-AILABS source terms have been located and retained. Training-chain review identified Lessac research terms and Ryan CC BY-NC-SA behind Thorsten/Kerstin. Overall unrestricted-use clearance remains open pending suitable permission/assessment or replacement audio. No audio assets or learner data were changed. See docs/content-provenance.md for evidence and scope.

## OpenAI audio preview workflow — 2026-10-26

Added the fixed-size review-only Realtime sample generator, an Actions workflow using the repository secret, and offline stream/error-handling tests. README describes triggers, paid reruns, bounds, artifact retention and listening-review requirements. Existing application behavior, local learner data and production audio remain unchanged. Live API results are recorded by the workflow, rather than asserted by the local offline checks.
