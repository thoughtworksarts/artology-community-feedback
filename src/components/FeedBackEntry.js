/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
export default class FeedbackEntry {
  constructor({
    version,
    country,
    gender,
    ethnicity,
    skintone,
    deviceCategory,
    environment,
    effectiveScores,
  }) {
    this.appVersion = version;
    this.country = country;
    this.gender = gender;
    this.ethnicity = ethnicity;
    this.skintone = skintone;
    this.deviceCategory = deviceCategory;
    this.environment = environment;
    this.effectiveScores = effectiveScores;
  }

  getAverageEffectiveScoreFor(artwork = false) {
    let cumScore = 0;
    let count = 0;
    this.effectiveScores.forEach((effectiveScore) => {
      if (!artwork && !effectiveScore.getScore() == '') {
        cumScore += effectiveScore.getScore();
        count++;
      } else if (effectiveScore.getArtwork() === artwork && !(effectiveScore.getScore() == '')) {
        cumScore += effectiveScore.getScore();
        count++;
      }
    });
    return count === 0 ? { avgScore: 'N/A', count: 0 } : { avgScore: cumScore / count, count: 1};
  }

  getAverageInteractiveScoreFor(artwork) {
    let cumScore = 0;
    let count = 0;
    this.effectiveScores.forEach((effectiveScore) => {
      if (
        effectiveScore.getArtwork() === artwork &&
        effectiveScore.isInteractive() &&
        !(effectiveScore.getScore() === '')
      ) {
        cumScore += effectiveScore.getScore();
        count++;
      }
    });
    return count === 0 ? { avgScore: 'N/A', count: 0 } : { avgScore: cumScore / count, count: 1};
  }

  getCountry() {
    return this.country;
  }

  getEthnicity() {
    return this.ethnicity;
  }

  getSkintone() {
    return this.skintone;
  }

  getGender() {
    return this.gender;
  }

  getEnvironment() {
    return this.environment;
  }

  getAppVersion() {
    return this.appVersion;
  }

  getDeviceCategory() {
    return this.deviceCategory;
  }
}
