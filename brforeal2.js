// brforeal2.js
class Brforeal2 {
  constructor() {
    this.hiddenCharRegex = /[\u200B-\u200D\uFEFF]/g;
  }

  scan(text) {
    return this.hiddenCharRegex.test(text);
  }

  findAll(text) {
    return [...text.matchAll(this.hiddenCharRegex)];
  }
}

module.exports = Brforeal2;
