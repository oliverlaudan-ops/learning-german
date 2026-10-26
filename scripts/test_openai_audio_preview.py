"""Offline tests of paid-request safety and stream completion handling."""
import base64
import importlib.util
import json
import time
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('preview', Path(__file__).with_name('openai-audio-preview.py'))
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)


class Socket:
    def __init__(self, events): self.events = iter(events)
    def recv(self, timeout): return json.dumps(next(self.events))


class PreviewTests(unittest.TestCase):
    def audio(self):
        return {'type': 'response.output_audio.delta',
                'delta': base64.b64encode(b'\0\0' * preview.RATE).decode()}

    def test_existing_content_has_fixed_small_plan(self):
        plan = preview.sample_plan()
        self.assertEqual(len(plan), 7)
        self.assertEqual([x['speaker'] for x in plan[1:]], ['Miriam', 'Jonas'] * 3)
        self.assertLess(sum(len(x['text']) for x in plan), 3000)

    def test_complete_audio_retains_transcript_and_usage(self):
        pcm, transcript, usage = preview.collect_audio(Socket([self.audio(),
            {'type': 'response.output_audio_transcript.done', 'transcript': 'Hallo.'},
            {'type': 'response.done', 'response': {'status': 'completed',
                                                  'usage': {'output_tokens': 20}}}]), time.monotonic() + 5)
        self.assertEqual(len(pcm), 2 * preview.RATE)
        self.assertEqual(transcript, 'Hallo.')
        self.assertEqual(usage['output_tokens'], 20)

    def test_truncated_response_is_not_accepted(self):
        with self.assertRaises(preview.PreviewError):
            preview.collect_audio(Socket([self.audio(),
                {'type': 'response.done', 'response': {'status': 'incomplete'}}]), time.monotonic() + 5)

    def test_empty_response_is_not_accepted(self):
        with self.assertRaises(preview.PreviewError):
            preview.collect_audio(Socket([
                {'type': 'response.done', 'response': {'status': 'completed'}}]), time.monotonic() + 5)

    def test_raw_error_details_cannot_reach_logs(self):
        with self.assertRaisesRegex(preview.PreviewError, '^api_error$'):
            preview.check_error({'type': 'error', 'error': {'code': 'untrusted-secret-content',
                                                           'message': 'secret headers'}})


if __name__ == '__main__': unittest.main()
