/* eslint-disable radix */
export default class EffectiveScore {
  constructor(score, artwork, isInteractive) {
    this.artwork = artwork;
    this.interactive = isInteractive;
    this.score = score;
  }

  getArtwork() {
    return this.artwork;
  }

  isInteractive() {
    return this.interactive;
  }

  getScore() {
    return this.score !== '' ? parseInt(this.score) : '';
  }
}
