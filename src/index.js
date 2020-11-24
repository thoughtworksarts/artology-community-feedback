/* eslint-disable no-plusplus */
import * as utility from './utility';
import { formData, lastRow, getListOfRelaseVersions } from './init';
import * as init from './init';
import FeedbackEntry from './components/FeedBackEntry';
import FeedbackForm from './components/FeedbackForm';
import * as convertData from './dataPorcessors/outgoingData';
import * as printer from './helpers/printer';
import * as incomingData from './dataPorcessors/incomingData';
import { artworks, environments, categories, deviceCategories } from './config';
import * as form from './config';

// eslint-disable-next-line no-unused-vars

function getFormEntries() {
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
  return formEntries;
}

export default function main() {
  const latestRelease = init.getLatestRelease();
  // Get all user entries
  const formEntries = getFormEntries();

  // Create a new Form
  const feedbackForm = new FeedbackForm(formEntries);

  // Print tables to spreadsheet
  printer.printEffectiveScorePerReleaseTable(
    convertData.generateEffectScorePerReleaseData(
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
        [latestRelease],
        artworks,
        feedbackForm
      ),
      category,
      init.finalDataSheet,
      tableStartColumn
    );
    tableStartColumn += 6;
  });

  printer.printEffectiveScorePerArtworkTable(
    convertData.generateArtworkEffectiveScores(artworks, latestRelease, feedbackForm),
    init.finalDataSheet,
    31,
    'Average Effective Score'
  );

  printer.printEffectiveScorePerReleaseTable(
    convertData.generateEffectScorePerReleaseData(
      feedbackForm,
      [latestRelease],
      deviceCategories,
      'device'
    ),
    init.finalDataSheet,
    ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android'],
    35
  );

  printer.printEffectiveScorePerArtworkTable(
    convertData.generateArtworkEffectiveScores(artworks, latestRelease, feedbackForm, true),
    init.finalDataSheet,
    41,
    'Interactive Portion Effective Score'
  );
}

global.main = main;
