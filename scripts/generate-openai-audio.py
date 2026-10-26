"""Replace the 45 bundled MP3s; fixed inputs, USD 2 per-run estimate guard."""
import argparse
import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys
import unicodedata
import wave
from datetime import datetime, timezone
from pathlib import Path

spec = importlib.util.spec_from_file_location('preview', Path(__file__).with_name('openai-audio-preview.py'))
api = importlib.util.module_from_spec(spec)
spec.loader.exec_module(api)
api.MAX_OUTPUT_TOKENS = 2048
ROOT = Path(__file__).resolve().parents[1]
MAX_USD = 2.0
MAX_CALLS = 200
VOICES = {'thorsten': 'cedar', 'kerstin': 'marin', 'ramona': 'coral', 'eva': 'sage'}
SPEAKERS = {
    'Miriam':'kerstin', 'Jonas':'thorsten', 'Mara':'kerstin', 'Ben':'thorsten',
    'Nina':'ramona', 'Paul':'thorsten', 'Tobias':'thorsten', 'Sarah':'kerstin',
    'Moderatorin':'eva', 'Moderator':'eva',
    'Frau König':'kerstin', 'Herr Brandt':'thorsten', 'Frau Yilmaz':'ramona',
    'Frau Seidel':'kerstin', 'Herr Kurz':'thorsten', 'Frau Özdemir':'ramona',
    'Frau Beck':'kerstin', 'Herr Simon':'thorsten', 'Frau Arslan':'ramona',
    'Frau Lange':'kerstin', 'Herr Weber':'thorsten', 'Frau Demir':'ramona',
}
# Targeted narration hints for the three differences reviewed in run 40359867544.
READING_CORRECTIONS = {
    '2882b62a6e2ff28db3c4605062818a12f80c08209e0954fbc1fe33837d33b3b9':
        " Behalte exakt die Verspaetung 'zehn Minuten'; fuege keine Zeitspanne hinzu.",
    '0d6660b26c680323884d929039b2904013bb26d2f38364e00364a0a82f9922d3':
        " Behalte am Schluss exakt das Wort 'oefter', ohne zusaetzliches s.",
    '61fecb153015b6e64e9f6e5c64cf45fe36f93416e2f578607356fb9ee1e8e8b1':
        " Behalte exakt die Formulierung 'dauert er'. Korrigiere keine Grammatik.",
}
PATTERN = re.compile(r'(' + '|'.join(re.escape(x) for x in sorted(SPEAKERS, key=len, reverse=True)) + r'):\s*')


def split_text(text):
    chunks, current = [], ''
    for sentence in re.split(r'(?<=[.!?])\s+', text.strip()):
        if len(sentence) > 480:
            raise api.PreviewError('Unexpected long sentence; no automatic text alteration')
        if current and len(current) + len(sentence) + 1 > 480:
            chunks.append(current)
            current = ''
        current = (current + ' ' + sentence).strip()
    if current:
        chunks.append(current)
    return chunks


def normalize(text):
    return ''.join(c for c in unicodedata.normalize('NFKC', text).casefold() if c.isalnum())


def plan():
    targets = []
    manifest = json.loads((ROOT / 'scripts/goethe-b1-recording-manifest.json').read_text())
    if len(manifest) != 32:
        raise api.PreviewError('Expected 32 B1 recordings')
    for record in manifest:
        if record['part'] in (3, 4):
            tokens = PATTERN.split(record['script'])
            if len(tokens) < 3 or tokens[0].strip():
                raise api.PreviewError('Unrecognized dialogue speakers')
            turns = [(tokens[i], tokens[i+1].strip()) for i in range(1, len(tokens), 2)]
            if len(set(s for s, _ in turns)) != (2 if record['part'] == 3 else 4):
                raise api.PreviewError('Unexpected dialogue speaker count')
        else:
            turns = [(None, record['script'])]
        clips = []
        for speaker, text in turns:
            slot = SPEAKERS[speaker] if speaker else ('ramona','thorsten','kerstin','eva','ramona','eva')[record['id']]
            for chunk in split_text(text):
                clips.append({'speaker': speaker or 'Narrator', 'voice': ('cedar' if slot=='thorsten' else 'marin') if record['part']==3 else VOICES[slot], 'text': chunk})
        base = 'public/audio/goethe-b1/'
        if record['setId'] != 'set-1':
            base += record['setId'] + '/'
        targets.append({'path': base + 'segment-' + str(record['id']) + '.mp3', 'clips': clips, 'pause': .4})
    lesson = json.loads((ROOT / 'src/data/weekend-listening.json').read_text())
    lines = {line['id']: line for line in lesson['lines']}
    for line in lesson['lines']:
        targets.append({'path': 'public/audio/weekend-v1/' + line['id'] + '.mp3',
            'clips': [{'speaker': line['speaker'], 'voice': 'marin' if line['speaker'] == 'Alex' else 'cedar', 'text': line['german']}], 'pause': 0})
    for exercise in lesson['practice']:
        line = lines[exercise['lineId']]
        for chunk in exercise['chunks']:
            targets.append({'path': 'public/audio/weekend-v1/' + chunk['id'] + '.mp3',
                'clips': [{'speaker': line['speaker'], 'voice': 'marin' if line['speaker'] == 'Alex' else 'cedar', 'text': chunk['german']}], 'pause': 0})
    targets.append({'path': 'public/audio/weekend-v1/dialogue.mp3', 'pause': .55,
        'clips': [{'speaker': line['speaker'], 'voice': 'marin' if line['speaker'] == 'Alex' else 'cedar', 'text': line['german']} for line in lesson['lines']]})
    if len(targets) != 45 or len({t['path'] for t in targets}) != 45:
        raise api.PreviewError('Expected exactly 45 unique audio paths')
    for target in targets:
        for clip in target['clips']:
            correction = READING_CORRECTIONS.get(cache_key(clip))
            if correction:
                clip['instructions'] = api.INSTRUCTIONS + correction
    unique = {cache_key(c): c for t in targets for c in t['clips']}
    if len(unique) > MAX_CALLS or sum(len(c['text']) for c in unique.values()) > 22000:
        raise api.PreviewError('Generation plan exceeds authorized fixed scope')
    return targets, unique


def cache_key(clip):
    return hashlib.sha256(json.dumps({'model':api.MODEL, 'instructions':clip.get('instructions',api.INSTRUCTIONS),
        'voice':clip['voice'], 'text':clip['text']}, sort_keys=True).encode()).hexdigest()


def charge(usage):
    source = usage.get('input_token_details', {})
    out = usage.get('output_token_details', {})
    # Missing usage cannot silently disable the estimate guard.
    required = [source.get('text_tokens'), out.get('text_tokens'), out.get('audio_tokens')]
    if any(not isinstance(n, int) or n < 0 for n in required):
        raise api.PreviewError('Incomplete API usage; no further paid calls')
    # Current published USD / million token rates; use these only as an estimate.
    cached = source.get('cached_tokens', 0)
    return ((source.get('text_tokens', 0)-cached)*.6 + cached*.06 +
            out.get('text_tokens', 0)*2.4 + out.get('audio_tokens', 0)*20) / 1_000_000


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    targets, unique = plan()
    if args.dry_run:
        print(json.dumps({'files':len(targets), 'unique_requests':len(unique),
                          'input_characters':sum(len(c['text']) for c in unique.values()),
                          'model':api.MODEL, 'voices':VOICES, 'per_run_estimate_limit_USD':MAX_USD}))
        return
    key = os.environ.get('OPENAI_API_KEY', '').strip()
    if not key:
        raise api.PreviewError('OPENAI_API_KEY is missing; no API calls made')
    cache = ROOT / 'audio-generation-cache'
    cache.mkdir(exist_ok=True)
    report = {'provider':'OpenAI', 'model':api.MODEL, 'input_commit':os.environ.get('GITHUB_SHA'),
        'generated_at':datetime.now(timezone.utc).isoformat(), 'voices':VOICES,
        'calls_this_run':0, 'estimated_USD_this_run':0, 'clips':[], 'status':'incomplete'}
    mismatch = []
    pcm_by_key = {}
    for ident, clip in unique.items():
        metadata_path = cache / (ident + '.json')
        wav_path = cache / (ident + '.wav')
        if metadata_path.exists() and wav_path.exists():
            metadata = json.loads(metadata_path.read_text())
            if metadata.get('input_hash') != ident or cache_key(metadata) != ident or metadata.get('model') != api.MODEL or metadata.get('wav_sha256') != hashlib.sha256(wav_path.read_bytes()).hexdigest():
                raise api.PreviewError('Invalid resume cache; stopped')
            with wave.open(str(wav_path), 'rb') as f:
                if f.getframerate()!=api.RATE or f.getnchannels()!=1 or f.getsampwidth()!=2:
                    raise api.PreviewError('Invalid cached audio format')
                pcm = f.readframes(f.getnframes())
        else:
            # Reserve conservatively for one capped response before making a paid call.
            if report['estimated_USD_this_run'] + .05 > MAX_USD:
                raise api.PreviewError('USD 2 estimate guard reached; resume cache retained')
            report['calls_this_run'] += 1
            pcm, transcript, usage = api.synthesize(clip, key)
            api.write_wav(wav_path, pcm)
            metadata = {**clip, 'input_hash':ident, 'model':api.MODEL, 'transcript':transcript,
                'usage':usage, 'duration_seconds':len(pcm)/(api.RATE*2),
                'wav_sha256':hashlib.sha256(wav_path.read_bytes()).hexdigest()}
            metadata_path.write_text(json.dumps(metadata, ensure_ascii=False, indent=2))
            report['estimated_USD_this_run'] += charge(usage)
        if normalize(metadata['transcript']) != normalize(clip['text']):
            mismatch.append({'input_hash':ident, 'expected':clip['text'], 'transcript':metadata['transcript']})
        pcm_by_key[ident] = pcm
        report['clips'].append(metadata)
        (cache/'run-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
        print('Prepared segment',len(report['clips']),'of',len(unique),flush=True)
    (cache/'transcript-mismatches.json').write_text(json.dumps(mismatch, ensure_ascii=False, indent=2))
    if mismatch:
        raise api.PreviewError('Transcript differences require review; no production files written')
    for target in targets:
        pcm = bytearray()
        for clip in target['clips']:
            pcm.extend(pcm_by_key[cache_key(clip)])
            if target['pause']:
                pcm.extend(b'\0\0'*int(api.RATE*target['pause']))
        staged = cache/'combined.wav'
        api.write_wav(staged, pcm)
        path = ROOT/target['path']
        path.parent.mkdir(parents=True,exist_ok=True)
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(staged),'-codec:a','libmp3lame',
            '-b:a','96k','-metadata','artist=AI-generated speech / OpenAI',str(path)],
            check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    report['status']='completed'
    report['files']=[]
    for target in targets:
        data=(ROOT/target['path']).read_bytes()
        report['files'].append({'path':target['path'],'bytes':len(data),
            'sha256':hashlib.sha256(data).hexdigest(),
            'gitBlobSha':hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest(),
            'voices':sorted({c['voice'] for c in target['clips']})})
    (ROOT/'public/audio/openai-generation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    (ROOT/'public/audio/audio-inventory.json').write_text(json.dumps({
        'reviewedAt':datetime.now(timezone.utc).date().isoformat(),'provider':'OpenAI',
        'scope':'45 bundled replacement MP3s; see openai-generation.json for inputs and transcripts',
        'files':report['files']},ensure_ascii=False,indent=2))
    (cache/'run-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    print('Completed 45 files; computed new-call charges USD',round(report['estimated_USD_this_run'],4),flush=True)


if __name__=='__main__':
    try:
        main()
    except api.PreviewError as error:
        print('Generation stopped:',str(error),file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        print('Generation stopped:',type(error).__name__,'(details suppressed; no automatic retry)',file=sys.stderr)
        sys.exit(1)
