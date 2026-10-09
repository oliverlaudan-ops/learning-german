"""Generate eight fixed MP3 recordings for the original B1 Hören practice set.

Uses four distinguishable German Piper voices and assigns a stable voice to
each speaker. The output is synthetic *practice* audio, never official Goethe
recordings. Voice models must be legally obtained and their licenses checked.

Usage:
  node scripts/export-goethe-b1-audio.mjs
  python scripts/generate-goethe-b1-audio.py \
    --thorsten voices/de_DE-thorsten-medium.onnx \
    --kerstin voices/de_DE-kerstin-low.onnx \
    --ramona voices/de_DE-ramona-low.onnx \
    --eva voices/de_DE-eva_k-x_low.onnx
"""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path
import wave

from piper import PiperVoice, SynthesisConfig

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/goethe-b1-recording-manifest.json"
OUTPUT = ROOT / "public/audio/goethe-b1"
SPEAKERS = ("Moderatorin", "Frau König", "Herr Brandt", "Frau Yilmaz", "Miriam", "Jonas")
VOICE_BY_SPEAKER = {
    "Miriam": "kerstin",
    "Jonas": "thorsten",
    "Moderatorin": "eva",
    "Frau König": "kerstin",
    "Herr Brandt": "thorsten",
    "Frau Yilmaz": "ramona",
}
VOICE_BY_SEGMENT = {
    0: "ramona", 1: "thorsten", 2: "kerstin", 3: "eva",
    4: "ramona", 5: "kerstin",
}
TURN_PATTERN = re.compile(r"(Moderatorin|Frau König|Herr Brandt|Frau Yilmaz|Miriam|Jonas):\\s*")

def split_turns(script: str, part: int):
    """Split only at explicit character labels, preserving their entire turns."""
    if part not in (3, 4):
        return [(None, script.strip())]
    tokens = TURN_PATTERN.split(script)
    if len(tokens) < 3 or tokens[0].strip():
        raise ValueError("Dialogue must start with an identified speaker")
    turns = [(tokens[i], tokens[i + 1].strip()) for i in range(1, len(tokens), 2)]
    if not turns or any(not text for _, text in turns):
        raise ValueError("Empty turn detected in dialogue")
    return turns

def pcm_from_wav(path: Path) -> bytes:
    return subprocess.check_output([
        "ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(path),
        "-f", "s16le", "-acodec", "pcm_s16le", "-ar", "22050", "-ac", "1", "-"
    ])

def generate(manifest: list[dict], voices: dict[str, PiperVoice]):
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="goethe-b1-") as directory:
        tmp = Path(directory)
        for segment in manifest:
            index = segment["id"]
            part = segment["part"]
            turns = split_turns(segment["script"], part)
            if part == 4 and len({speaker for speaker, _ in turns}) < 4:
                raise ValueError("Teil 4 must include four distinct speaker roles")
            pcm_path = tmp / f"segment-{index}.pcm"
            with pcm_path.open("wb") as output:
                for turn_index, (speaker, text) in enumerate(turns):
                    voice_name = VOICE_BY_SPEAKER.get(speaker, VOICE_BY_SEGMENT.get(index, "thorsten"))
                    voice = voices[voice_name]
                    wav_path = tmp / f"s{index}-t{turn_index}.wav"
                    with wave.open(str(wav_path), "wb") as file:
                        voice.synthesize_wav(
                            text, file, syn_config=SynthesisConfig(length_scale=1.06)
                        )
                    output.write(pcm_from_wav(wav_path))
                    # 400 ms between turns helps listeners follow discussion flow.
                    output.write(b"\\x00" * int(22050 * 0.4) * 2)
            mp3_path = OUTPUT / f"segment-{index}.mp3"
            subprocess.run([
                "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                "-f", "s16le", "-ar", "22050", "-ac", "1", "-i", str(pcm_path),
                "-codec:a", "libmp3lame", "-b:a", "64k", str(mp3_path)
            ], check=True)
            if mp3_path.stat().st_size < 1024:
                raise RuntimeError(f"Empty audio output: {mp3_path}")
            print(f"{mp3_path.relative_to(ROOT)} {mp3_path.stat().st_size} bytes; {len(turns)} turn(s)", flush=True)

def main():
    parser = argparse.ArgumentParser()
    for speaker in ("thorsten", "kerstin", "ramona", "eva"):
        parser.add_argument("--" + speaker, type=Path, required=True)
    args = parser.parse_args()
    voices = {name: PiperVoice.load(str(getattr(args, name))) for name in
              ("thorsten", "kerstin", "ramona", "eva")}
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if len(manifest) != 8 or sorted(item["id"] for item in manifest) != list(range(8)):
        raise ValueError("Expected exactly eight audio segments with IDs 0–7")
    generate(manifest, voices)
    print("Finished eight synthetic recordings; manual pronunciation review is recommended.", flush=True)

if __name__ == "__main__":
    main()
