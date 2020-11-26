/* eslint-disable no-plusplus */
import * as utility from './utility';
import { formData, lastRow, getListOfRelaseVersions } from './init';
import * as init from './init';
import FeedbackForm from './components/FeedbackForm';
import * as convertData from './dataPorcessors/outgoingData';
import * as printer from './helpers/printer';
import { artworks, environments, categories, deviceCategories } from './config';
import * as form from './config';
import { handleMultipleSections } from './helpers/multipleSelection';

// eslint-disable-next-line no-unused-vars
function getFormEntries() {
  const formEntries = [];
  for (let i = 1; i < lastRow; i++) {
    const intialData = {
      appVersion: formData[i][form.releaseVersionColumn],
      userCountry: formData[i][form.regionColumn].toLowerCase(),
      usergender: utility.processGenderData(formData[i][form.genderColumn]),
      userEthnicitys: utility.handleMultipleSelections(
        formData[i][form.ethnicityColumn].toLowerCase()
      ),
      userSkintones: utility.handleMultipleSelections(
        formData[i][form.skintoneColumn].toLowerCase()
      ),
      userDeviceCategory: utility.processDeviceCategoryData(formData[i][form.deviceCategoryColumn]),
      userEnvironment: utility.processEnvironmentData(formData[i][form.usageTypeColumn]),
    };

    handleMultipleSections(intialData, formData, i).forEach((entry) => formEntries.push(entry));
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
    ['Release Version', 'Overall', 'Indoor', 'Outdoor', 'Other'],
    0
  );

  let tableStartColumn = 7;
  categories.forEach((category) => {
    const listOfUniqueEntries = init.getAllEntriesFor(category);

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
    ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android', 'Other'],
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
