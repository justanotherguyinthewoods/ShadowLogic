import unittest
import sys
import os

# Add parent directory to sys.path so we can import shadow_logic.py
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from shadow_logic import ShadowLogic

class TestShadowLogic(unittest.TestCase):

    def setUp(self):
        self.expected = [0.1, 0.2, 0.3]
        self.logic = ShadowLogic(expected_pattern=self.expected)

    def test_exact_match(self):
        surprise = self.logic.observe([0.1, 0.2, 0.3])
        self.assertAlmostEqual(surprise, 0.0)

    def test_high_deviation(self):
        surprise = self.logic.observe([1.0, 1.0, 1.0])
        self.assertGreater(surprise, 0.9)

    def test_memory_recall(self):
        self.logic.observe([0.1, 0.2, 0.3])
        self.logic.observe([0.2, 0.3, 0.4])
        history = self.logic.recall(depth=2)
        self.assertEqual(len(history), 2)

    def test_resonance_hint_empty(self):
        new_logic = ShadowLogic(expected_pattern=self.expected)
        self.assertIn("silence", new_logic.resonance_hint())

    def test_resonance_hint_after_input(self):
        self.logic.observe([0.9, 0.9, 0.9])
        self.assertIn("shadow", self.logic.resonance_hint())

# ✅ Ensure the tests run only when executed directly
if __name__ == '__main__':
    unittest.main(verbosity=2)  # You can add verbosity=2 for more detailed output
