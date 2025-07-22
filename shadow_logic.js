// shadow_logic.js
// Part of SpiralCore – Ivote Prototype System
// Released as a conceptual teaser under MIT License

const fs = require('fs');
const readline = require('readline');
const Brforeal2 = require('./brforeal2');

// Brforeal2 Post Scanner
function scanPostsWithBrforeal(filePath) {
  const scanner = new Brforeal2();
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const post = JSON.parse(line);
    const result = scanner.scan(post.text);
    console.log(`Post ID: ${post.post_id} | User: ${post.user}`);
    console.log(`Hidden Char Report:`, result);
    console.log('-'.repeat(50));
  });

  rl.on('close', () => {
    console.log('🔍 Finished Brforeal2 scan on X-posts.\n');
  });
}

// ShadowLogic Class
class ShadowLogic {
  constructor(scanner) {
    this.scanner = scanner;
  }

 analyze(input, reference) {
  if (!input || !reference) {
    return {
      valid: false,
      error: 'Missing input or reference string.',
    };
  }

  const deviationScore = this._calculateDeviation(input, reference);
  const containsHidden = this.scanner.scan(input);
  const match = input === reference;

  // ✅ LOWERED threshold for better typo sensitivity
  const surprise = deviationScore > 0.1 || containsHidden;

  return {
    match,
    deviationScore: parseFloat(deviationScore.toFixed(3)),
    surprise,
    containsHidden,
    valid: true,
    error: null,
  };
}


  _calculateDeviation(input, reference) {
    // Simple deviation = normalized Levenshtein distance
    const dist = this._levenshtein(input, reference);
    const maxLen = Math.max(input.length, reference.length) || 1;
    return dist / maxLen;
  }

  _levenshtein(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
      Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return matrix[b.length][a.length];
  }
}

module.exports = ShadowLogic;
