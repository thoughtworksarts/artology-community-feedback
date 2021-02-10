/* eslint-disable dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable import/prefer-default-export */
export function generateEffectScorePerReleaseData(
  feedbackForm,
  releaseVersions,
  environments,
  category
) {
  const obj = {};

  releaseVersions.forEach((releaseVersion) => {
    obj[releaseVersion] = {};
    // eslint-disable-next-line dot-notation

    if (category === 'environment') {
      obj[releaseVersion]['overall'] = feedbackForm.getOverallEffectiveScoreFor(false, {
        version: releaseVersion,
      });
    }
    environments.forEach((env) => {
      const filterBy = { version: releaseVersion };
      filterBy[category] = env;
      obj[releaseVersion][env] = feedbackForm.getOverallEffectiveScoreFor(false, filterBy);
    });
  });

  return obj;
}

export function generateScoresForCategory(
  category,
  properties,
  releaseVersions,
  artworks,
  feedbackForm
) {
  const obj = {};

  releaseVersions.forEach((releaseVersion) => {
    obj[releaseVersion] = {};

    artworks.forEach((artwork) => {
      obj[releaseVersion][artwork] = {};
      obj[releaseVersion][artwork][category] = {};
      properties.forEach((property) => {
        const key = category === 'regions' ? 'region' : category;
        const filterBy = { version: releaseVersion };
        filterBy[key] = property;
        obj[releaseVersion][artwork][category][property] = feedbackForm.getOverallEffectiveScoreFor(
          artwork,
          filterBy
        );
      });
    });
  });
  return obj;
}

export function generateArtworkEffectiveScores(
  artworks,
  releaseVersion,
  feedbackForm,
  isInteractive = false
) {
  const obj = {};
  const filterBy = { version: releaseVersion };
  artworks.forEach((artwork) => {
    obj[artwork] = !isInteractive
      ? feedbackForm.getOverallEffectiveScoreFor(artwork, filterBy)
      : feedbackForm.getArtworkInteractiveEffectiveScoreFor(artwork, filterBy);
  });

  return obj;
}
export function generateArtworkInnovativeScores(artworks, releaseVersion, feedbackForm) {
  const obj = {};
  const filterBy = { version: releaseVersion };
  artworks.forEach((artwork) => {
    obj[artwork] = feedbackForm.getOverallInnovativeScoreFor(artwork, filterBy);
  });

  return obj;
}
