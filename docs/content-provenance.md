# Current audio provenance

The 45 bundled MP3 files are generated through the OpenAI API using `gpt-realtime-2.1-mini`, replacing the former Piper recordings. Source exercise texts and URLs are preserved. This change removes the former Thorsten/Lessac and Kerstin/Ryan chains from the current bundled audio; it does not retroactively adjudicate historical versions.

## Current generation

- 32 B1 files: the four sets in `scripts/goethe-b1-recording-manifest.json`, derived from the existing TypeScript content.
- 13 weekend files: six sentence clips, six pronunciation chunks and a combined dialogue, from `src/data/weekend-listening.json`.
- Voices: `marin` and `cedar` for two-person dialogue; `coral` and `sage` additionally provide four distinct discussion roles.
- No original dataset recordings or voice models are shipped. These are newly synthesized portal scripts; no real-person voice cloning was requested.
- [Generation receipts](../public/audio/openai-generation.json) preserve text/voice choices, returned transcripts, API usage and output hashes.
- [Inventory](../public/audio/audio-inventory.json) records all 45 MP3 files.
- [Audio notices](../public/audio/VOICE-NOTICES.txt) are linked directly from the portal legal page.

`scripts/generate-openai-audio.py` uses the authenticated API only during generation. The browser receives static MP3s, has no API key and makes no OpenAI requests. The separate browser SpeechSynthesis fallback may use local or remote system voices; it is unchanged.

## Published permissions and limits

The relevant sources are the [OpenAI Services Agreement](https://openai.com/policies/services-agreement/) and [Service Terms](https://openai.com/policies/service-terms/), together with [API documentation](https://developers.openai.com/api/docs/guides/realtime-conversations). The recordings are API output, not a capture of ChatGPT Voice or Read Aloud. Appropriate synthetic-speech disclosure appears in the portal legal page and audio notices.

MIT applies to appropriately licensable project code. It is not a grant to redistribute OpenAI model weights, use voice identities outside provider conditions, or bypass other third-party rights. No independent audit of all underlying provider training data or legal certification is claimed. The historical Piper review is retained in Git history.

## Cost and repeatability

The fixed plan is bounded to 200 unique requests, 2,048 output tokens per request, and USD 2 in estimated model charges per run, with a reserve before each new request. Actual account billing and taxes can differ; this is not an account-wide hard spending limit. A hash-bound cache ties each saved WAV to the model, instructions, voice and input text and preserves its transcript/usage. Set the resume run ID to reuse a previous cache. Network/API failures are not automatically retried.

## Quality evidence

Oliver approved the two initial OpenAI samples for clarity and distinct voices. Those samples used `marin`/`cedar`. Full exercises and the added discussion voices require further listening review. Normalized API-returned transcript matching blocks obvious text differences but is not independent transcription or proof of audible correctness. German/pedagogical/audio review remains necessary. The exercises and results are independent training materials, not official Goethe tasks, grading or certification.
