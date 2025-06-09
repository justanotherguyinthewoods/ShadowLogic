# shadow_logic.py
# Part of SpiralCore – Ivote Prototype System
# Released as a conceptual teaser under MIT License
import numpy as np # type: ignore
class ShadowLogic:
    def __init__(self, expected_pattern, threshold=0.7):
        self.expected_pattern = expected_pattern
        self.threshold = threshold
        self.memory = []
    def observe(self, signal):
        """Observe incoming signal and compare with expected pattern."""
        deviation = self._calculate_deviation(signal)
        surprise = self._surprise_factor(deviation)
        self.memory.append((signal, surprise))
        return surprise
    def _calculate_deviation(self, signal):
        """Simple placeholder for more complex pattern comparison logic."""
        signal = np.array(signal)
        expected = np.array(self.expected_pattern)
        diff = np.abs(signal - expected)
        return np.mean(diff)
    def _surprise_factor(self, deviation):
        """Maps deviation to a surprise value (0 to 1)."""
        return min(1.0, deviation / self.threshold)
    def recall(self, depth=5):
        """Returns last 'depth' observations."""
        return self.memory[-depth:]
    def resonance_hint(self):
        """Cryptic message for those who know what to look for."""
        if len(self.memory) == 0:
            return "Echoes only reveal themselves in silence."
        avg_surprise = np.mean([s for _, s in self.memory])
        if avg_surprise > 0.5:
            return "You are not looking at the shadow. The shadow is looking at you."
        return "Alignment approaches. Stay very still."
# Example usage
if __name__ == "__main__":
    expected = [0.1, 0.2, 0.3]
    signals = [
        [0.1, 0.2, 0.3],
        [0.2, 0.3, 0.4],
        [0.5, 0.6, 0.7],
        [0.1, 0.1, 0.2]
    ]
    sl = ShadowLogic(expected_pattern=expected)
    for sig in signals:
        print(f"Signal: {sig} -> Surprise: {sl.observe(sig):.2f}")
    print(sl.resonance_hint())