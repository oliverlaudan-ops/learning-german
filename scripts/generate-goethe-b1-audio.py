"""Render original Goethe-oriented B1 scripts to stable MP3 assets.

Requirements: piper-tts==1.8.0, ffmpeg, and one or two legal German Piper
voice model paths. This script generates *synthetic* audio, not official Goethe
recordings. Use separate voice models for distinguishable dialogue roles.

Usage:
  node scripts/export-goethe-b1-audio.mjs
  python scripts/generate-goethe-b1-audio.py de_DE-thorsten-medium.onnx [second-german-voice.onnx]
"""
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path
import wave

from piper import PiperVoice, SynthesisConfig

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"scripts/goethe-b1-recording-manifest.json"
OUTPUT=ROOT/"public/audio/goethe-b1"

def split_turns(text):
    # Two-way conversation (Teil 3), then panel discussion (Teil 4).
    parts=re.split(r"(?=(?:Miriam|Jonas|Moderatorin|Frau König|Herr Brandt|Frau Yilmaz): )", text)
    turns=[]
    for part in parts:
        part=part.strip()
        if not part:
            continue
        m=re.match(r"^(Miriam|Jonas|Moderatorin|Frau König|Herr Brandt|Frau Yilmaz):\s*(.*)$",part,re.S)
        turns.append((m.group(1) if m else None,(m.group(2) if m else part).strip()))
    return turns

def main():
    if len(sys.argv)<2:
        raise SystemExit("Provide a German Piper .onnx voice model path")
    voices=[PiperVoice.load(p) for p in sys.argv[1:3]]
    scripts=json.loads(MANIFEST.read_text(encoding="utf-8"))
    OUTPUT.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory() as directory:
        tmp=Path(directory)
        for segment in scripts:
            turns=split_turns(segment["script"]) if segment["part"] in (3,4) else [(None,segment["script"])]
            inputs=[]
            for i,(speaker,text) in enumerate(turns):
                if not text:
                    continue
                voice_idx = 0
                if len(voices)>1 and speaker in ("Jonas","Herr Brandt"):
                    voice_idx=1
                voice=voices[voice_idx]
                wav=tmp/f's{segment["id"]}-{i}.wav'
                with wave.open(str(wav),"wb") as f:
                    voice.synthesize_wav(text,f,syn_config=SynthesisConfig(length_scale=1.06))
                inputs.append(wav)
            # Convert turns separately to consistent sample rate then concatenate,
            # adding a 450ms pause to distinguish turns.
            pcm=tmp/f'segment-{segment["id"]}.pcm'
            with pcm.open('wb') as f:
                for wav in inputs:
                    raw=subprocess.check_output(['ffmpeg','-hide_banner','-loglevel','error','-i',str(wav),
                                                '-f','s16le','-acodec','pcm_s16le','-ar','22050','-ac','1','-'])
                    f.write(raw)
                    f.write(b'\x00'*int(22050*.45)*2)
            mp3=OUTPUT/f'segment-{segment["id"]}.mp3'
            subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','s16le','-ar','22050',
                            '-ac','1','-i',str(pcm),'-codec:a','libmp3lame','-b:a','64k',str(mp3)],check=True)
            print(f'{mp3.relative_to(ROOT)}: {mp3.stat().st_size} bytes')
    print('Synthetic audio generated; verify pronunciation and speaker differentiation before publishing.')

if __name__=="__main__":
    main()
