# Audio provenance and license review

Reviewed on 2026-10-26 against repository commit `d3cebbe38d64b6439eda610d1b69df42a7ab0d11`.

Code and parts of the learning content were created with AI assistance, including ChatGPT/Codex. Oliver Laudan makes project/publication decisions. This is not a claim of complete human pedagogical or legal review. MIT applies to appropriately licensable project code and does not override third-party conditions.

## Result

The missing M-AILABS source and attribution check is resolved. Its upstream README permits commercial use and redistribution subject to retaining notices when redistributing source data, and no implied endorsement. The complete upstream notice is now shipped in [VOICE-NOTICES.txt](../public/audio/VOICE-NOTICES.txt), accessible from the portal legal page.

**The overall voice-rights check is not closed:** following the model training history revealed research/noncommercial terms in the base models behind Thorsten and Kerstin. CC0 on the final German dataset alone is insufficient evidence of an unrestricted grant for the complete chain. The sources do not settle whether those terms attach to these fine-tuned models or synthetic output; this review makes no infringement finding and no unrestricted clearance claim.

| Voice used by the documented generation process | German dataset | Upstream training history | Review conclusion |
| --- | --- | --- | --- |
| Thorsten medium | CC0, Thorsten-Voice | Fine-tuned from Lessac medium; Lessac data has a research license | Further permission/assessment or replacement needed to close unrestricted-use clearance |
| Kerstin low | CC0, rhasspy/dataset-voice-kerstin | Fine-tuned from Ryan low; Ryan card identifies CC BY-NC-SA 4.0 | Further permission/assessment or replacement needed to close unrestricted-use clearance |
| Ramona low | M-AILABS, permissive custom terms | Card says trained from scratch | Retain upstream notice; do not suggest speaker/author endorsement |
| Eva K. x_low | M-AILABS, permissive custom terms | Card says trained from scratch | Retain upstream notice; do not suggest speaker/author endorsement |

Dataset license, model license and generated-output rights are distinct. We retain M-AILABS notices conservatively without asserting all generated audio is source data. We do not assign a new blanket audio license in this PR.

## Evidence and reproducibility

- [Shipped model-card snapshots](../public/audio/licenses/model-cards.txt), collection revision `5041a7a49ae5b3a0f30e6837769eb03fdbb231bd`.
- [45-file inventory](../public/audio/audio-inventory.json) records committed MP3 Git blob SHAs and sizes. No audio bytes were changed. It is not proof of historical model hashes.
- Weekend: [existing generation record](../public/audio/weekend-v1/README.md), Thorsten medium.
- Sets 2–4: `scripts/generate-goethe-b1-audio.py` and `.github/workflows/goethe-b1-audio.yml` document four models and per-character selection.
- Set 1: existing legacy MP3 files; the repository does not preserve a complete per-turn synthesis receipt. Do not imply we reconstructed one.
- [Thorsten dataset source at reviewed revision](https://github.com/thorstenMueller/Thorsten-Voice/blob/29d0c153c55d8ffaa0ebf8ed1ecc879bff9fdf27/README.md)
- [Kerstin dataset source at reviewed revision](https://github.com/rhasspy/dataset-voice-kerstin/blob/f73127135cf80d6ef52aef6af58c49774f4fd625/README.md)
- [M-AILABS license at reviewed revision](https://github.com/i-celeste-aurora/m-ailabs-dataset/blob/53c4c9fe0f63cb0ae85ee7eb46a32b7316223e8e/README.md#license)
- [Lessac source-model card](https://huggingface.co/rhasspy/piper-voices/blob/5041a7a49ae5b3a0f30e6837769eb03fdbb231bd/en/en_US/lessac/medium/MODEL_CARD) and [dataset research license](https://www.cstr.ed.ac.uk/projects/blizzard/2013/lessac_blizzard2013/license.html)
- [Ryan source-model card](https://huggingface.co/rhasspy/piper-voices/blob/5041a7a49ae5b3a0f30e6837769eb03fdbb231bd/en/en_US/ryan/low/MODEL_CARD)
- [Piper maintainer's licensing explanation](https://github.com/rhasspy/piper/discussions/271): use the model cards and training history; no additional model license is imposed by Piper. The discussion is not a legal ruling.

The collection metadata says MIT but its model cards identify independent dataset terms. Neither that metadata nor the portal MIT license is used to override them. Piper is GPL-3.0 generation software, not shipped runtime code. GPLv3 section 2 does not automatically apply GPL to all output; this does not settle model/dataset rights.

## What closes the remaining point

For an unrestricted-use release, obtain written permissions or an appropriate legal assessment for both base-model chains, or regenerate affected recordings with fully reviewed replacement models. Preserve distinguishable dialogue speakers, exercise text, URLs and learner progress if replacing audio. Cover all legacy Set 1 files conservatively when exact speaker receipts are missing. Recheck model versions and record synthesis inputs/hashes for new audio.

## Other boundaries

The scripts/questions are documented as independently created, AI-assisted practice material, not official Goethe content. A comprehensive external-text similarity audit and human German/pedagogical/audio-quality review have not been performed.

Runtime SpeechSynthesis can use local or remote browser/system voices; the portal does not record microphones, assess pronunciation or call an OpenAI API. Legal notices do not change runtime behavior or replace rights clearance.
