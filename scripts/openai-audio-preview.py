"""Create two review-only samples using a bounded Realtime API job.

The key is supplied by a GitHub Actions secret, never a CLI argument or output.
No browser assets are changed. No request is retried automatically.
"""
import argparse
import base64
import hashlib
import json
import os
import re
import subprocess
import sys
import time
import wave
from pathlib import Path

MODEL = 'gpt-realtime-2.1-mini'
ENDPOINT = 'wss://api.openai.com/v1/realtime?model=' + MODEL
RATE = 24000
MAX_REQUESTS = 7
MAX_OUTPUT_TOKENS = 1024
MAX_PCM_BYTES = RATE * 2 * 60
ROOT = Path(__file__).resolve().parents[1]
INSTRUCTIONS = (
    'Du bist ein Sprecher fuer deutsche Hoeruebungen auf Niveau A2 bis B1. '
    'Lies ausschliesslich den vom Nutzer gelieferten Text wortgetreu auf Deutsch vor. '
    'Keine Einleitung, keine Antwort, keine Erklaerung, nichts hinzufuegen oder auslassen. '
    'Sprich klar, natuerlich und in gemaessigtem Lerntempo. '
    'Sprich Zahlen und Uhrzeiten passend auf Deutsch aus.'
)
SAFE_CODES = {'invalid_api_key', 'insufficient_quota', 'rate_limit_exceeded',
              'model_not_found', 'permission_denied', 'invalid_request_error',
              'unsupported_value'}


class PreviewError(Exception):
    """Only fixed, non-secret-bearing messages may be shown to a user."""


def check_error(event):
    if event.get('type') == 'error':
        code = event.get('error', {}).get('code')
        raise PreviewError(code if code in SAFE_CODES else 'api_error')


def sample_plan():
    manifest = json.loads((ROOT / 'scripts/goethe-b1-recording-manifest.json').read_text())
    first = {r['id']: r for r in manifest if r['setId'] == 'set-1'}
    tokens = re.split(r'(Miriam|Jonas):\s*', first[6]['script'])
    turns = [(tokens[i], tokens[i + 1].strip()) for i in range(1, len(tokens), 2)][:6]
    if len(turns) != 6 or any(not t for _, t in turns):
        raise PreviewError('Unexpected dialogue structure; no API calls made')
    clips = [{'id': 'announcement', 'speaker': 'Durchsage', 'voice': 'cedar',
              'text': first[1]['script']}]
    clips += [{'id': 'dialog-' + str(i + 1), 'speaker': speaker,
               'voice': 'marin' if speaker == 'Miriam' else 'cedar', 'text': text}
              for i, (speaker, text) in enumerate(turns)]
    # Fixed small plan, no arbitrary model/prompt or whole-portal mode.
    if len(clips) != MAX_REQUESTS or sum(len(c['text']) for c in clips) > 3000:
        raise PreviewError('Preview size limit exceeded; no API calls made')
    if any(len(c['text']) > 600 for c in clips):
        raise PreviewError('Preview segment limit exceeded; no API calls made')
    return clips


def receive_event(socket, deadline):
    remaining = deadline - time.monotonic()
    if remaining <= 0:
        raise PreviewError('Response deadline exceeded; no automatic retry')
    event = json.loads(socket.recv(timeout=remaining))
    check_error(event)
    return event


def collect_audio(socket, deadline):
    audio = bytearray()
    transcript = ''
    while True:
        event = receive_event(socket, deadline)
        kind = event.get('type')
        if kind == 'response.output_audio.delta':
            audio.extend(base64.b64decode(event['delta'], validate=True))
            if len(audio) > MAX_PCM_BYTES:
                raise PreviewError('Audio size limit exceeded; no automatic retry')
        elif kind == 'response.output_audio_transcript.done':
            transcript = event.get('transcript', '')
        elif kind == 'response.done':
            response = event.get('response', {})
            if response.get('status') != 'completed':
                raise PreviewError('Response incomplete; sample rejected, no automatic retry')
            if len(audio) < RATE or len(audio) % 2:
                raise PreviewError('Empty or invalid PCM audio; sample rejected')
            return bytes(audio), transcript, response.get('usage', {})


def synthesize(clip, key):
    from websockets.sync.client import connect
    # Fresh session per segment: no audio input, tool access or growing history.
    with connect(ENDPOINT, additional_headers={'Authorization': 'Bearer ' + key},
                 open_timeout=20, close_timeout=5, max_size=4 * 1024 * 1024) as socket:
        deadline = time.monotonic() + 75
        while receive_event(socket, deadline).get('type') != 'session.created':
            pass
        socket.send(json.dumps({'type': 'session.update', 'session': {
            'type': 'realtime', 'model': MODEL, 'instructions': INSTRUCTIONS,
            'output_modalities': ['audio'], 'max_output_tokens': MAX_OUTPUT_TOKENS,
            'audio': {'input': {'turn_detection': None}, 'output': {
                'format': {'type': 'audio/pcm', 'rate': RATE}, 'voice': clip['voice']}}
        }}))
        while receive_event(socket, deadline).get('type') != 'session.updated':
            pass
        socket.send(json.dumps({'type': 'conversation.item.create', 'item': {
            'type': 'message', 'role': 'user',
            'content': [{'type': 'input_text', 'text': clip['text']}]}}))
        socket.send(json.dumps({'type': 'response.create', 'response': {
            'output_modalities': ['audio'], 'max_output_tokens': MAX_OUTPUT_TOKENS}}))
        return collect_audio(socket, deadline)


def write_wav(path, pcm):
    with wave.open(str(path), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(RATE)
        out.writeframes(pcm)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true', help='No credentials or network needed')
    args = parser.parse_args()
    clips = sample_plan()
    if args.dry_run:
        print(json.dumps({'model': MODEL, 'requests': len(clips),
                          'input_characters': sum(len(c['text']) for c in clips),
                          'max_output_tokens_per_request': MAX_OUTPUT_TOKENS,
                          'voices': sorted({c['voice'] for c in clips})}))
        return
    key = os.environ.get('OPENAI_API_KEY', '').strip()
    if not key:
        raise PreviewError('OPENAI_API_KEY is missing; no API calls made')
    output = ROOT / 'audio-preview'
    output.mkdir(exist_ok=True)
    report = {'model': MODEL, 'commit': os.environ.get('GITHUB_SHA'),
              'status': 'incomplete', 'ai_generated': True, 'requests_started': 0,
              'automatic_retries': 0, 'clips': []}
    receipt = output / 'provenance.json'
    receipt.write_text(json.dumps(report, ensure_ascii=False, indent=2))
    dialog = bytearray()
    for clip in clips:
        report['requests_started'] += 1
        receipt.write_text(json.dumps(report, ensure_ascii=False, indent=2))
        pcm, transcript, usage = synthesize(clip, key)
        report['clips'].append({**clip, 'transcript': transcript, 'usage': usage,
                                'duration_seconds': len(pcm) / (RATE * 2)})
        receipt.write_text(json.dumps(report, ensure_ascii=False, indent=2))
        if clip['id'] == 'announcement':
            write_wav(output / 'OpenAI-Hoerprobe-Durchsage.wav', pcm)
        else:
            dialog.extend(pcm)
            dialog.extend(b'\0\0' * int(RATE * 0.4))
        print('Completed preview segment', report['requests_started'], 'of', MAX_REQUESTS)
    write_wav(output / 'OpenAI-Hoerprobe-Dialog.wav', dialog)
    for stem in ['OpenAI-Hoerprobe-Durchsage', 'OpenAI-Hoerprobe-Dialog']:
        target = output / (stem + '.mp3')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(output / (stem + '.wav')),
                        '-codec:a', 'libmp3lame', '-b:a', '96k',
                        '-metadata', 'artist=Synthetische Sprache / OpenAI', str(target)],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        report.setdefault('files', []).append({'name': target.name,
            'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
    report['status'] = 'completed'
    receipt.write_text(json.dumps(report, ensure_ascii=False, indent=2))
    (output / 'BITTE-LESEN.txt').write_text(
        'KI-generierte Hoerproben / AI-generated speech.\n'
        'Modell: ' + MODEL + '; Stimmen: marin und cedar.\n'
        'Nur zur Hoerpruefung: Aussprache, Worttreue und Vollstaendigkeit kontrollieren.\n'
        'Die API kann Texte trotz Anweisung veraendern; Transkripte stehen in provenance.json.\n'
        'Diese Dateien ersetzen keine vorhandenen Portalaufnahmen automatisch.\n'
        'provenance.json dokumentiert Modell, Texte, Stimmen, Usage und Dateipruefsummen.\n',
        encoding='utf-8')


if __name__ == '__main__':
    try:
        main()
    except PreviewError as error:
        print('Preview stopped:', str(error), file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        # Never log network exception messages, headers, raw server events or credentials.
        print('Preview stopped:', type(error).__name__, '(details suppressed; no automatic retry)',
              file=sys.stderr)
        sys.exit(1)
