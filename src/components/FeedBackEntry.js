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

  getAverageEffectiveScore() {
    let cumScore = 0;
    let count = 0;
    this.effectiveScores.forEach((effectiveScore) => {
      cumScore += effectiveScore.getScore();
      count++;
    });
    return cumScore / count;
  }

  getAverageScoreFor(artwork) {
    let cumScore = 0;
    let count = 0;
    this.effectiveScores.forEach((effectiveScore) => {
      if (effectiveScore.getArtwork() === artwork) {
        cumScore += effectiveScore.getScore();
        count++;
      }
    });
    return cumScore / count;
  }

  getAverageInteractiveScoreFor(artwork) {
    let cumScore = 0;
    let count = 0;
    console.log(this.effectiveScores);
    this.effectiveScores.forEach((effectiveScore) => {
      if (effectiveScore.getArtwork() === artwork && effectiveScore.isInteractive()) {
        cumScore += effectiveScore.getScore();
        count++;
      }
    });
    console.log(count);
    return count === 0 ? cumScore : cumScore / count;
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
