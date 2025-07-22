const fs = require('fs');
const path = require('path');
const ShadowLogic = require('../shadow_logic');
const Brforeal2 = require('../brforeal2');

describe('ShadowLogic Deviation Engine', () => {
  const shadow = new ShadowLogic(new Brforeal2());

  test('detects exact match (no deviation)', () => {
    const input = 'Signal A';
    const reference = 'Signal A';

    const result = shadow.analyze(input, reference);

    expect(result.deviationScore).toBe(0);
    expect(result.surprise).toBe(false);
    expect(result.match).toBe(true);
  });

  test('detects high deviation between different strings', () => {
    const input = 'Signal Alpha';
    const reference = 'Completely different Signal';

    const result = shadow.analyze(input, reference);

    expect(result.deviationScore).toBeGreaterThan(0.8);
    expect(result.surprise).toBe(true);
    expect(result.match).toBe(false);
  });

  test('detects hidden characters as deviation', () => {
    const input = 'Signal\u200B A'; // hidden char injected
    const reference = 'Signal A';

    const result = shadow.analyze(input, reference);

    expect(result.containsHidden).toBe(true);
    expect(result.deviationScore).toBeGreaterThan(0);
    expect(result.surprise).toBe(true);
  });

  test('handles near-miss typos', () => {
    const input = 'Signal B';
    const reference = 'Signal A';

    const result = shadow.analyze(input, reference);

    expect(result.deviationScore).toBeGreaterThan(0.1);
    expect(result.surprise).toBe(true);
  });

  test('returns default result for empty input', () => {
    const input = '';
    const reference = 'Signal A';

    const result = shadow.analyze(input, reference);

    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });
});
