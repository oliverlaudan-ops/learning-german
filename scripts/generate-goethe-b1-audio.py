"""Synthesize fixed German practice MP3s from the original B1 scripts.

This is artificial speech, not Goethe audio. Set 1 legacy MP3 files remain in
public/audio/goethe-b1/segment-N.mp3; new sets use set-2/.., set-3/.., set-4/..
All speaker turns in dialogue and radio segments are synthesized separately.
"""
import argparse
import json
import re
import subprocess
import tempfile
import wave
from pathlib import Path
from piper import PiperVoice, SynthesisConfig

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"scripts/goethe-b1-recording-manifest.json"
OUTPUT=ROOT/"public/audio/goethe-b1"
VOICE_BY_SPEAKER={
    "Miriam":"kerstin","Jonas":"thorsten",
    "Mara":"kerstin","Ben":"thorsten",
    "Nina":"ramona","Paul":"thorsten",
    "Tobias":"thorsten","Sarah":"kerstin",
    "Moderatorin":"eva","Moderator":"thorsten",
    "Frau König":"kerstin","Herr Brandt":"thorsten","Frau Yilmaz":"ramona",
    "Frau Seidel":"kerstin","Herr Kurz":"thorsten","Frau Özdemir":"ramona",
    "Frau Beck":"kerstin","Herr Simon":"thorsten","Frau Arslan":"ramona",
    "Frau Lange":"kerstin","Herr Weber":"thorsten","Frau Demir":"ramona",
}
VOICE_BY_SHORT=("ramona","thorsten","kerstin","eva","ramona","eva")
# Colon-qualified dialogue turns, not incidental mentions of characters.
TURN_PATTERN=re.compile(r"("+ "|".join(re.escape(x) for x in sorted(VOICE_BY_SPEAKER,key=len,reverse=True))+r"):\s*")

def split_turns(script,part):
    if part not in (3,4):return [(None,script.strip())]
    tokens=TURN_PATTERN.split(script)
    if len(tokens)<3 or tokens[0].strip() or len(tokens)%2!=1:
        raise ValueError("Unrecognized speaker labels in dialogue")
    turns=[(tokens[i],tokens[i+1].strip()) for i in range(1,len(tokens),2)]
    if any(not speech for _,speech in turns):raise ValueError("An empty dialogue turn was found")
    names=set(s for s,_ in turns)
    if (part==3 and len(names)!=2) or (part==4 and len(names)!=4):
        raise ValueError(f"Expected 2/4 identifiable speakers in part {part}; found {names}")
    return turns

def pcm_from_wav(path):
    return subprocess.check_output(["ffmpeg","-hide_banner","-loglevel","error","-i",str(path),
                                    "-f","s16le","-acodec","pcm_s16le","-ar","22050","-ac","1","-"])

def produce(manifest,voices,sets):
    with tempfile.TemporaryDirectory(prefix="goethe-b1-") as directory:
        temp=Path(directory)
        for record in manifest:
            set_id=record["setId"]
            if set_id not in sets:continue
            clip_id=record["id"]
            turns=split_turns(record["script"],record["part"])
            destination=OUTPUT/set_id
            destination.mkdir(parents=True,exist_ok=True)
            pcm=temp/"mix.pcm"
            with pcm.open("wb") as out:
                for n,(speaker,utterance) in enumerate(turns):
                    name=VOICE_BY_SPEAKER[speaker] if speaker else VOICE_BY_SHORT[clip_id]
                    wav=temp/f"turn-{n}.wav"
                    with wave.open(str(wav),"wb") as file:
                        voices[name].synthesize_wav(utterance,file,syn_config=SynthesisConfig(length_scale=1.06))
                    out.write(pcm_from_wav(wav))
                    # Short natural transition between turns.
                    out.write(b"\x00"*int(22050*0.4)*2)
            target=destination/f"segment-{clip_id}.mp3"
            subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-f","s16le",
                            "-ar","22050","-ac","1","-i",str(pcm),"-codec:a","libmp3lame",
                            "-b:a","64k",str(target)],check=True)
            if target.stat().st_size<20000:raise RuntimeError(f"Too-small output: {target}")
            print(f"{set_id}: segment-{clip_id}.mp3, {len(turns)} turns, {target.stat().st_size} bytes",flush=True)

def main():
    parser=argparse.ArgumentParser()
    for name in ("thorsten","kerstin","ramona","eva"):
        parser.add_argument("--"+name,type=Path,required=True)
    parser.add_argument("--sets",nargs="+",choices=["set-2","set-3","set-4"],default=["set-2","set-3","set-4"])
    args=parser.parse_args()
    voices={name:PiperVoice.load(str(getattr(args,name))) for name in ("thorsten","kerstin","ramona","eva")}
    manifest=json.loads(MANIFEST.read_text(encoding="utf-8"))
    if len(manifest)!=32:raise ValueError("Expected 32 manifest records")
    produce(manifest,voices,set(args.sets))

if __name__=="__main__":main()
