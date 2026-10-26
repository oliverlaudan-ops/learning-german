import importlib.util
from pathlib import Path
import unittest

spec=importlib.util.spec_from_file_location('generation',Path(__file__).with_name('generate-openai-audio.py'))
g=importlib.util.module_from_spec(spec)
spec.loader.exec_module(g)


class GenerationTests(unittest.TestCase):
    def test_preserves_all_45_existing_player_paths(self):
        targets,unique=g.plan()
        paths={t['path'] for t in targets}
        self.assertEqual(len(paths),45)
        for i in range(8):
            self.assertIn(f'public/audio/goethe-b1/segment-{i}.mp3',paths)
            for n in range(2,5):self.assertIn(f'public/audio/goethe-b1/set-{n}/segment-{i}.mp3',paths)
        self.assertIn('public/audio/weekend-v1/dialogue.mp3',paths)
        self.assertLessEqual(len(unique),200)

    def test_four_person_discussions_keep_four_distinct_voices(self):
        targets,_=g.plan()
        for t in targets:
            if t['path'].endswith('segment-7.mp3'):
                self.assertEqual(len({c['voice'] for c in t['clips']}),4)

    def test_chunks_keep_original_words_and_sentence_order(self):
        text='Ein Satz. '*100
        chunks=g.split_text(text)
        self.assertEqual(' '.join(chunks),text.strip())
        self.assertTrue(all(len(c)<=480 for c in chunks))

    def test_punctuation_variations_do_not_hide_missing_words(self):
        self.assertEqual(g.normalize('Oh nein!'),g.normalize('Oh, nein.'))
        self.assertNotEqual(g.normalize('Nicht am Dienstag.'),g.normalize('Am Dienstag.'))

    def test_cache_is_bound_to_voice_and_text(self):
        a={'voice':'marin','text':'Hallo.'}
        self.assertNotEqual(g.cache_key(a),g.cache_key({**a,'voice':'cedar'}))
        self.assertNotEqual(g.cache_key(a),g.cache_key({**a,'text':'Tschüss.'}))


if __name__=='__main__':unittest.main()
