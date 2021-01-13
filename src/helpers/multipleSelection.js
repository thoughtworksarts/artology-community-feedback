/* eslint-disable import/prefer-default-export */
import * as utility from '../utility';
import FeedbackEntry from '../components/FeedBackEntry';
import * as incomingData from '../dataPorcessors/incomingData';

export function handleMultipleSections(
  {
    appVersion,
    userCountry,
    usergender,
    userEthnicitys,
    userSkintones,
    userDeviceCategory,
    userEnvironment,
  },
  formData,
  i
) {
  const ethnicitysLen = userEthnicitys.length;
  const skintonesLen = userSkintones.length;
  const formEntries = [];
  // If multiple option were selected for ethnicity or skintone add a seperate formEntry for each selection
  if (ethnicitysLen > 1 || skintonesLen > 1) {
    // eslint-disable-next-line no-unused-expressions
    if (ethnicitysLen > skintonesLen) {
      userEthnicitys.forEach((ethnicity, idx) => {
        formEntries.push(
          new FeedbackEntry({
            version: appVersion,
            country: userCountry,
            gender: usergender,
            ethnicity: userEthnicitys[idx],
            skintone: userSkintones[utility.moduloWhenOdd(idx, skintonesLen - 1)],
            deviceCategory: userDeviceCategory,
            environment: userEnvironment,
            effectiveScores: incomingData.processEffectiveScores(formData, i),
          })
        );
      });
    } else {
      userSkintones.forEach((skintone, idx) => {
        formEntries.push(
          new FeedbackEntry({
            version: appVersion,
            country: userCountry,
            gender: usergender,
            ethnicity: userEthnicitys[utility.moduloWhenOdd(idx, ethnicitysLen - 1)],
            skintone: userSkintones[idx],
            deviceCategory: userDeviceCategory,
            environment: userEnvironment,
            effectiveScores: incomingData.processEffectiveScores(formData, i),
          })
        );
      });
    }
  } else {
    // eslint-disable-next-line object-shorthand
    formEntries.push(
      new FeedbackEntry({
        version: appVersion,
        country: userCountry,
        gender: usergender,
        ethnicity: userEthnicitys[0],
        skintone: userSkintones[0],
        deviceCategory: userDeviceCategory,
        environment: userEnvironment,
        effectiveScores: incomingData.processEffectiveScores(formData, i),
      })
    );
  }
  return formEntries;
}
