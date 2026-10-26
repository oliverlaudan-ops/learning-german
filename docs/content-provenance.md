# Content provenance and review status

Code and parts of the teaching material were created and maintained with AI assistance, including ChatGPT/Codex. Oliver Laudan makes project and publication decisions. This is not a claim that all content received human pedagogical or legal review.

The repository declares MIT for the project code. This does not override third-party rights or settle whether individual AI-generated contributions qualify for copyright.

## Audio sources

The bundled MP3s are generated practice recordings, not recordings from Goethe-Institut. The scripts/questions are documented in README as independently created exercises. A complete comparison against external teaching materials has not been performed.

- Weekend recordings: see [existing provenance](../public/audio/weekend-v1/README.md); Thorsten medium.
- B1 recordings: see scripts/generate-goethe-b1-audio.py and .github/workflows/goethe-b1-audio.yml; Thorsten medium, Kerstin low, Ramona low and Eva K. x_low.
- [Thorsten model card](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/thorsten/medium/MODEL_CARD)
- [Kerstin model card](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/kerstin/low/MODEL_CARD)
- [Ramona model card](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/ramona/low/MODEL_CARD)
- [Eva K. model card](https://huggingface.co/rhasspy/piper-voices/blob/main/de/de_DE/eva_k/x_low/MODEL_CARD)

Model cards for Ramona and Eva K. refer to the M-AILABS dataset website for its license. Verify the applicable dataset/model/output conditions and retain required attribution before treating recordings as freely redistributable. Neither the repository-wide MIT label nor the model collection's top-level label alone resolves all these conditions. No infringement has been established by this preliminary check.

Piper and models are generation tools, not shipped runtime dependencies; generated output needs its own rights analysis. Do not label all audio MIT solely because the generator is open source.

## Browser speech

Runtime speech uses the browser SpeechSynthesis API and can depend on local or remote system/browser voices. The code does not restrict selection to localService voices. Do not claim that all speech stays on-device. The portal does not record microphone audio or call an OpenAI API.

## Publication checklist

- Legal/privacy/provenance page is served from public/rechtliches/index.html without scripts, external fonts or analytics.
- Profile/progress keys and hosting must be revisited when adding accounts, syncing, analytics or new remote services.
- Legal notices do not replace rights clearance, technical behavior changes or pedagogical review.
- Check the footer and legal page on mobile and desktop; no visual browser verification was performed for this notice-only change.
