"""Generate the static lesson audio. Requires piper-tts==1.8.0 and ffmpeg.

Download de_DE-thorsten-medium with piper.download_voices, then run:
python scripts/generate-weekend-audio.py /path/to/de_DE-thorsten-medium.onnx
The model and build dependencies are not shipped to the browser.
"""

import json
from pathlib import Path
import subprocess
import sys
import tempfile
import wave

from piper import PiperVoice, SynthesisConfig

root = Path(__file__).resolve().parents[1]
lesson = json.loads((root / "src/data/weekend-listening.json").read_text())
output = root / "public/audio" / lesson["id"]
output.mkdir(parents=True, exist_ok=True)
voice = PiperVoice.load(sys.argv[1])
config = SynthesisConfig(length_scale=1.08)
clips = lesson["lines"] + [chunk for item in lesson["practice"] for chunk in item["chunks"]]

with tempfile.TemporaryDirectory() as directory:
    temp = Path(directory)
    for clip in clips:
        wav_path = temp / (clip["id"] + ".wav")
        with wave.open(str(wav_path), "wb") as wav:
            voice.synthesize_wav(clip["german"], wav, syn_config=config)

    # Use the exact sentence recordings in the dialogue, with a short turn pause.
    with wave.open(str(temp / "dialogue.wav"), "wb") as combined:
        for index, line in enumerate(lesson["lines"]):
            with wave.open(str(temp / (line["id"] + ".wav")), "rb") as wav:
                if index == 0:
                    combined.setparams(wav.getparams())
                combined.writeframes(wav.readframes(wav.getnframes()))
                combined.writeframes(b"\x00" * int(wav.getframerate() * 0.55) * wav.getsampwidth())

    for wav_path in sorted(temp.glob("*.wav")):
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav_path),
                        "-codec:a", "libmp3lame", "-b:a", "64k", "-ac", "1",
                        str(output / (wav_path.stem + ".mp3"))], check=True)

print(f"Generated {len(clips) + 1} clips, {sum(p.stat().st_size for p in output.glob('*.mp3')):,} bytes")
