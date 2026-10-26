# Weekend practice audio

Computer-generated German speech, generated locally with Piper 1.8.0 and
`de_DE-thorsten-medium`. Both fictional speakers use the same voice.

- Voice dataset: [Thorsten Voice](https://github.com/thorstenMueller/Thorsten-Voice), CC0.
- [Voice model card](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/thorsten/medium/MODEL_CARD).
- Generator: [Piper](https://github.com/OHF-Voice/piper1-gpl), GPL-3.0. The generator and model are build tools, not distributed with the app.
- Original dialogue and exercise text: `src/data/weekend-listening.json`.
- Rebuild: `scripts/generate-weekend-audio.py`; requires the downloaded voice, `piper-tts==1.8.0`, and ffmpeg.

MP3, mono, 64 kbit/s. The full dialogue reuses the six sentence recordings
with 550 ms pauses. Six separate chunks support pronunciation practice.
All files are served by the site; there is no runtime TTS service or API key.
Audio is fetched on demand, not during the initial page load. Persistent
offline downloads and offline page reopening are not implemented by this unit.

## License review (2026-10-26)

CC0 above describes the Thorsten dataset. The Piper model card also records fine-tuning from Lessac medium, whose dataset is subject to a research license. We have not established an unrestricted grant for that full chain or these outputs. See [audio notices](../VOICE-NOTICES.txt) and the [review](../../../docs/content-provenance.md); do not treat the code MIT license as blanket audio clearance.
