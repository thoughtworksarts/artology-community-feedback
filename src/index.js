/* eslint-disable no-plusplus */
import * as utility from './utility';
import { formData, lastRow } from './spreadSheet';
import * as form from './spreadSheet';
import FeedbackEntry from './components/FeedBackEntry';
import FeedbackForm from './components/FeedbackForm';
import * as convertData from './dataPorcessors/convertToFinal';
import * as printer from './printer';
import * as processRawData from './dataPorcessors/convertFromRawData';

// eslint-disable-next-line no-unused-vars

export default function main() {
  // Get Raw data an process
  const formEntries = [];
  for (let i = 1; i < lastRow; i++) {
    const appVersion = formData[i][form.releaseVersionColumn];
    const userCountry = formData[i][form.regionColumn].toLowerCase();
    const usergender = utility.processGenderData(formData[i][form.genderColumn]);
    const userEthnicity = formData[i][form.ethnicityColumn].toLowerCase();
    const userSkintone = formData[i][form.skintoneColumn].toLowerCase();
    const userDeviceCategory = formData[i][form.deviceCategoryColumn].toLowerCase();
    const userEnvironment = utility.processEnvironmentData(formData[i][form.usageTypeColumn]);
    // eslint-disable-next-line object-shorthand
    formEntries.push(
      new FeedbackEntry({
        version: appVersion,
        country: userCountry,
        gender: usergender,
        ethnicity: userEthnicity,
        skintone: userSkintone,
        devieCategory: userDeviceCategory,
        environment: userEnvironment,
        effectiveScores: processRawData.processEffectiveScores(formData, i),
      })
    );
  }

  const feedbackForm = new FeedbackForm(formEntries);

  // generateFinalDataEffectScoreByVersion()
  const releaseVersions = ['1.0 (13)', '1.0 (14)'];
  const environments = ['indoor', 'outdoor'];

  printer.printReleaseVersionObj(
    convertData.generateFinalDataEffectScoreByVersion(feedbackForm, releaseVersions, environments),
    form.finalDataSheet
  );
}

global.main = main;
