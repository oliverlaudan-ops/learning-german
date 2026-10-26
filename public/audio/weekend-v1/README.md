# Weekend practice audio

Synthetic speech generated through the OpenAI API (`gpt-realtime-2.1-mini`). Alex uses `marin`, Sam uses `cedar`. The combined dialogue reuses the six exact sentence clips with 550 ms pauses. Six separate pronunciation chunks use the corresponding speaker voice.

- Original text: `src/data/weekend-listening.json`.
- Generator: `scripts/generate-openai-audio.py`.
- [Provider/source notices](../VOICE-NOTICES.txt).
- [Generation receipts](../openai-generation.json).
- [Current source review](../../../docs/content-provenance.md).

MP3 mono, 96 kbit/s. Served statically; the app contains no runtime OpenAI service or API key. Audio is fetched on demand, not on initial page load. Persistent offline downloads and reopening offline are not implemented by this unit.

The former Thorsten/Piper files are replaced. Their historical source information remains in Git history. The two initial OpenAI sample voices passed Oliver's listening review; the full recordings still require human listening review.
