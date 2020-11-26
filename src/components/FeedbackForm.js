/* eslint-disable no-unused-expressions */
function sumUpAvgScoresFor(entries, artwork = false) {
  let score = 0;
  let counter = 0;
  entries.forEach((entry) => {
    const { avgScore, count } = entry.getAverageEffectiveScoreFor(artwork);
    if (count !== 0) {
      score += avgScore;
      counter += count;
    }
  });
  return { score, counter };
}

function sumUpAvgInteractiveArtworkScores(entries, artwork) {
  let score = 0;
  let counter = 0;
  entries.forEach((entry) => {
    const { avgScore, count } = entry.getAverageInteractiveScoreFor(artwork);
    if (count !== 0) {
      score += avgScore;
      counter += count;
    }
  });
  return { score, counter };
}

export default class FeedbackForm {
  constructor(feedbackEntries) {
    this.feedbackEntries = feedbackEntries;
  }

  // eslint-disable-next-line class-methods-use-this
  filterBy(feedbackEntries, category, value) {
    return feedbackEntries.filter((feedbackEntry) => {
      let bool;
      if (category === 'version') {
        bool = feedbackEntry.getAppVersion() === value;
      } else if (category === 'region') {
        bool = feedbackEntry.getCountry() === value;
      } else if (category === 'gender') {
        bool = feedbackEntry.getGender() === value;
      } else if (category === 'ethnicity') {
        bool = feedbackEntry.getEthnicity() === value;
      } else if (category === 'skintone') {
        bool = feedbackEntry.getSkintone() === value;
      } else if (category === 'device') {
        bool = feedbackEntry.getDeviceCategory() === value;
      } else if (category === 'environment') {
        bool = feedbackEntry.getEnvironment() === value;
      } else {
        bool = true;
      }

      return bool;
    });
  }

  getOverallEffectiveScoreFor(artwork, filterObject = {}) {
    let { feedbackEntries } = this;
    Object.keys(filterObject).forEach((key) => {
      feedbackEntries = this.filterBy(feedbackEntries, key, filterObject[key]);
    });

    const { score, counter } = sumUpAvgScoresFor(feedbackEntries, artwork);
    return counter === 0 ? 'N/A' : score / counter;
  }

  getArtworkInteractiveEffectiveScoreFor(artwork, filterObject = {}) {
    let { feedbackEntries } = this;
    Object.keys(filterObject).forEach((key) => {
      feedbackEntries = this.filterBy(feedbackEntries, key, filterObject[key]);
    });
    const { score, counter } = sumUpAvgInteractiveArtworkScores(feedbackEntries, artwork);
    return counter === 0 ? 'N/A' : score / counter;
  }
}
