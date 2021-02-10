/* eslint-disable radix */
export default class InnovativeScore {
  constructor(score, artwork) {
    this.artwork = artwork;
    this.score = score;
  }

  getArtwork() {
    return this.artwork;
  }

  getScore() {
    return this.score !== '' ? parseInt(this.score) : '';
  }
}
