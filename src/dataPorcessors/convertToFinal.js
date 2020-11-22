/* eslint-disable import/prefer-default-export */
export function generateFinalDataEffectScoreByVersion(feedbackForm, releaseVersions, environments) {
  const obj = {};

  releaseVersions.forEach((releaseVersion) => {
    obj[releaseVersion] = {};
    // eslint-disable-next-line dot-notation
    obj[releaseVersion]['overall'] = feedbackForm.getOverallEffectiveScoreFor({
      version: releaseVersion,
    });
    environments.forEach((env) => {
      obj[releaseVersion][env] = feedbackForm.getOverallEffectiveScoreFor({
        version: releaseVersion,
        environment: env,
      });
    });
  });
  return obj;
}
