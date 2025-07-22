
// __tests__/shadowLogic.test.js
// Part of SpiralCore – Ivote Prototype System
// Jest test suite for shadow_logic.js

const { ShadowLogic } = require('../shadow_logic');

describe('ShadowLogic', () => {
  let expected;
  let logic;

  beforeEach(() => {
    expected = [0.1, 0.2, 0.3];
    logic = new ShadowLogic(expected);
  });

  test('should return 0 surprise for exact match', () => {
    const surprise = logic.observe([0.1, 0.2, 0.3]);
    expect(surprise).toBeCloseTo(0.0);
  });

  test('should return high surprise for large deviation', () => {
    const surprise = logic.observe([1.0, 1.0, 1.0]);
    expect(surprise).toBeGreaterThan(0.9);
  });

  test('should recall last N observations', () => {
    logic.observe([0.1, 0.2, 0.3]);
    logic.observe([0.2, 0.3, 0.4]);
    const history = logic.recall(2);
    expect(history.length).toBe(2);
  });

  test('should return silence message if memory is empty', () => {
    const newLogic = new ShadowLogic(expected);
    expect(newLogic.resonanceHint()).toMatch(/silence/i);
  });

  test('should return shadow message after high surprise input', () => {
    logic.observe([0.9, 0.9, 0.9]);
    expect(logic.resonanceHint()).toMatch(/shadow/i);
  });
});
