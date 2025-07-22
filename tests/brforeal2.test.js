
const Brforeal2 = require('../brforeal2');

describe('Brforeal2 Hidden Character Scanner', () => {
  test('detects hidden characters in a string', () => {
    const bf = new Brforeal2();
    const input = 'visible\u200Btext';
    
    const matchArray = bf.findAll(input);
    
    expect(matchArray.length).toBe(1);
    expect(bf.scan(input)).toBe(true);
  });

  test('returns false when no hidden characters are present', () => {
    const bf = new Brforeal2();
    const input = 'clean text';
    
    const matchArray = bf.findAll(input);
    
    expect(matchArray.length).toBe(0);
    expect(bf.scan(input)).toBe(false);
  });
});
