/* eslint-disable no-plusplus */
import * as utility from './utility';
import { formData, lastRow, getListOfRelaseVersions } from './spreadSheet';
import * as init from './spreadSheet';
import FeedbackEntry from './components/FeedBackEntry';
import FeedbackForm from './components/FeedbackForm';
import * as convertData from './dataPorcessors/outgoingData';
import * as printer from './printer';
import * as incomingData from './dataPorcessors/incomingData';
import { artworks, environments, categories, deviceCategories } from './config';
import * as form from './config';

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
    const userDeviceCategory = utility.processDeviceCategoryData(
      formData[i][form.deviceCategoryColumn]
    );
    const userEnvironment = utility.processEnvironmentData(formData[i][form.usageTypeColumn]);
    // eslint-disable-next-line object-shorthand
    formEntries.push(
      new FeedbackEntry({
        version: appVersion,
        country: userCountry,
        gender: usergender,
        ethnicity: userEthnicity,
        skintone: userSkintone,
        deviceCategory: userDeviceCategory,
        environment: userEnvironment,
        effectiveScores: incomingData.processEffectiveScores(formData, i),
      })
    );
  }
  const feedbackForm = new FeedbackForm(formEntries);
  printer.printReleaseVersionObj(
    convertData.generateFinalDataEffectScoreByVersion(
      feedbackForm,
      getListOfRelaseVersions(),
      environments,
      'environment'
    ),
    init.finalDataSheet,
    ['Release Version', 'Overall', 'Indoor', 'Outdoor'],
    0
  );

  let tableStartColumn = 7;
  categories.forEach((category) => {
    const listOfUniqueEntries = init.getAllValuesFor(category);

    printer.printDistroTable(
      convertData.generateScoresForCategory(
        category,
        listOfUniqueEntries,
        ['1.0 (14)'],
        artworks,
        feedbackForm
      ),
      category,
      init.finalDataSheet,
      tableStartColumn
    );
    tableStartColumn += 6;
  });

  printer.printArtworkEffectiveScore(
    convertData.generateEffectiveScoreObjectFor(artworks, '1.0 (14)', feedbackForm),
    init.finalDataSheet,
    31,
    'Average Effective Score'
  );

  printer.printReleaseVersionObj(
    convertData.generateFinalDataEffectScoreByVersion(
      feedbackForm,
      ['1.0 (14)'],
      deviceCategories,
      'device'
    ),
    init.finalDataSheet,
    ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android'],
    35
  );

  printer.printArtworkEffectiveScore(
    convertData.generateEffectiveScoreObjectFor(artworks, '1.0 (14)', feedbackForm, true),
    init.finalDataSheet,
    41,
    'Interactive Portion Effective Score'
  );
}

global.main = main;
