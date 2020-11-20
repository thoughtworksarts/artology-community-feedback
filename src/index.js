/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

import { FINAL_DATA, FORM_RESPONSE_1 } from './constants';
import * as utility from './utility';

const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // Get active sheet
const ui = SpreadsheetApp.getUi();
const formResponse = spreadSheet.getSheetByName(FORM_RESPONSE_1);
const finalDataSheet = spreadSheet.getSheetByName(FINAL_DATA);
const rangeData = formResponse.getDataRange(); // Get Range of data on spreadsheet
const lastColumn = rangeData.getLastColumn();
const lastRow = rangeData.getLastRow();
const searchRange = formResponse.getRange(1, 1, lastRow, lastColumn);
let latestRelease;
const effectiveScoreColumns = [13, 15, 17, 20, 23, 25, 27, 30, 32, 36]; // Column numbers for effective score data
const aflEffectiveScoreColumns = [20, 23, 25]; // Column numbers for effective score data for A Fathers Lulliby
const outputEffectiveScoreColumns = [27, 30, 32]; // Column numbers for effective score data for Output
const aflInteractiveExperienceColumns = [23, 25]; // Column numbers for interactive experience score data for A Fathers Lulliby
const outputInteractiveExperienceColumns = [30, 32]; // Column numbers for interactive experience score data for Output
const usageTypeColumn = 19; // Column number for usage type (Indoor/Outdoor) data
const deviceCategoryColumn = 11; // Column number for device category data (high-end, low-end, android)
const releaseVersionColumn = 2; // Column Number for release dates/versions
const regionColumn = 5; // Column number for Country
const genderColumn = 6; // Column number for Gender data
const skintoneColumn = 8; // Column number for Skintone data
const ethnicityColumn = 7; // Column number for ethnicity data

const formData = searchRange.getValues(); // Raw form data

const getLatestReleaseObject = () => {
  const object = {};
  object[`${latestRelease}`] = {
    afl: {
      regions: {},
      gender: {},
      skintone: {},
      ethnicity: {},
      interactive: {},
      cumAvg: 0,
      count: 0,
    },
    output: {
      regions: {},
      gender: {},
      skintone: {},
      ethnicity: {},
      interactive: {},
      cumAvg: 0,
      count: 0,
    },
  };
  return object;
};

function printReleaseVersionObj(releaseVersionObj) {
  // Print Column Headers
  ['Release Version', 'Overall', 'Indoor', 'Outdoor'].forEach((header, index) =>
    finalDataSheet.getRange(2, index + 1).setValue(header)
  );

  //
  Object.keys(releaseVersionObj)
    .sort()
    .reverse()
    .forEach((key, index) => {
      const value = releaseVersionObj[`${key}`];
      const { totalScore, count } = value.all;
      const indoorTotal = value.Indoor.totalScore;
      const indoorTotalCount = value.Indoor.count;
      const outdoorTotal = value.Outdoor.totalScore;
      const outdoorTotalCount = value.Outdoor.count;
      const avgIndoor = indoorTotalCount != 0 ? indoorTotal / indoorTotalCount : 0;
      const avgOutdoor = outdoorTotalCount != 0 ? outdoorTotal / outdoorTotalCount : 0;
      const avgEff = totalScore / count;

      // Set release Date Column
      finalDataSheet.getRange(index + 3, 1).setValue(key);
      // Set Average Eff column
      finalDataSheet.getRange(index + 3, 2).setValue(avgEff);
      // Set Average Idoor
      finalDataSheet.getRange(index + 3, 3).setValue(avgIndoor);
      // Set Average Outdoor
      finalDataSheet.getRange(index + 3, 4).setValue(avgOutdoor);
    });
}

function printEffectiveScoreForDeviceCategory(releaseVersionObj) {
  ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android'].forEach((header, index) =>
    finalDataSheet.getRange(2, index + 36).setValue(header)
  );
  Object.keys(releaseVersionObj)
    .sort()
    .reverse()
    .forEach((key, index) => {
      const value = releaseVersionObj[`${key}`];
      const lowEndTotal = value.lowEnd.totalScore;
      const lowEndTotalCount = value.lowEnd.count;
      const highEndTotal = value.highEnd.totalScore;
      const highEndTotalCount = value.highEnd.count;
      const androidTotal = value.android.totalScore;
      const androidTotalCount = value.android.count;

      const avgLowEnd = lowEndTotalCount != 0 ? lowEndTotal / lowEndTotalCount : 0;
      const avgHighEnd = highEndTotalCount != 0 ? highEndTotal / highEndTotalCount : 0;
      const avgAndroid = androidTotalCount != 0 ? androidTotal / androidTotalCount : 0;

      // Set release Date Column
      finalDataSheet.getRange(index + 3, 36).setValue(key);
      // Set Low End Average Eff column
      finalDataSheet.getRange(index + 3, 37).setValue(avgLowEnd);
      // Set High End Avg Eff Column data
      finalDataSheet.getRange(index + 3, 38).setValue(avgHighEnd);
      // Set Android Avg Eff Column
      finalDataSheet.getRange(index + 3, 39).setValue(avgAndroid);
    });
}

function printDistributionTable(object, dataCategory, labelColumn, firstDataColumn) {
  // Print Table first Column header
  finalDataSheet.getRange(2, labelColumn).setValue(dataCategory.toUpperCase());

  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Print Tables Remaining Column headers
    finalDataSheet.getRange(2, index + firstDataColumn).setValue(artwork.toUpperCase());

    Object.keys(object[latestRelease][artwork][dataCategory]).forEach((data, idx) => {
      // Print Tables Row headers
      finalDataSheet.getRange(idx + 3, labelColumn).setValue(data);
      // Fill in table data
      const avg =
        object[latestRelease][artwork][dataCategory][data].cumAvg /
        object[latestRelease][artwork][dataCategory][data].count;
      finalDataSheet.getRange(idx + 3, index + firstDataColumn).setValue(avg);
    });
  });
}

function printInteractiveExpTable(object) {
  // Set column Name
  finalDataSheet.getRange(2, 42).setValue('Interactive Portion Effective Score');
  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Set row names
    finalDataSheet.getRange(index + 3, 41).setValue(artwork.toUpperCase());
    // Fill in data
    finalDataSheet
      .getRange(index + 3, 42)
      .setValue(
        object[latestRelease][artwork].interactive.cumAvg /
          object[latestRelease][artwork].interactive.count
      );
  });
}

function printArtWorkScores(object) {
  finalDataSheet.getRange(2, 32).setValue('Average Effective Score');
  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Set column Header
    finalDataSheet.getRange(index + 3, 31).setValue(artwork.toUpperCase());
    // Fill in column Data
    finalDataSheet
      .getRange(index + 3, 32)
      .setValue(object[latestRelease][artwork].cumAvg / object[latestRelease][artwork].count);
  });
}

function isValidReleaseVersion(version) {
  const regex = /[0-9]+\.[0-9]+\s\([0-9]+\)/g;
  return version.match(regex);
}

function ensureCurrentReleaseHasBeenSet() {
  let currrentReleaseVersion = finalDataSheet.getRange(1, 2).getValue();
  if (!isValidReleaseVersion(currrentReleaseVersion)) {
    while (!isValidReleaseVersion(currrentReleaseVersion)) {
      currrentReleaseVersion = ui.prompt('Enter a valid Release Version').getResponseText();
    }

    finalDataSheet.getRange(1, 2).setValue(currrentReleaseVersion);
  }
  latestRelease = currrentReleaseVersion;
}

function calculateAverages(cumScores, denominator) {
  return cumScores.map((score) => score / denominator);
}

function updateTableData(
  object,
  i,
  rowAverageScore,
  rowAverageIndoorScore,
  rowAverageOutdoorScore,
  rowAverageLowEndScore,
  rowAverageHighEndScore,
  rowAverageAndroidScore
) {
  if (object[formData[i][2]] != null) {
    if (utility.isUsage('Indoor', formData, i, usageTypeColumn)) {
      object[formData[i][2]].Indoor.count++;
      object[formData[i][2]].Indoor.totalScore += rowAverageScore;
    } else if (utility.isUsage('Outdoor', formData, i, usageTypeColumn)) {
      object[formData[i][2]].Outdoor.count++;
      object[formData[i][2]].Outdoor.totalScore += rowAverageScore;
    }

    if (utility.isUsage('High end', formData, i, deviceCategoryColumn)) {
      object[formData[i][2]].highEnd.count++;
      object[formData[i][2]].highEnd.totalScore += rowAverageScore;
    } else if (utility.isUsage('Low end', formData, i, deviceCategoryColumn)) {
      object[formData[i][2]].lowEnd.count++;
      object[formData[i][2]].lowEnd.totalScore += rowAverageScore;
    } else if (utility.isUsage('Android', formData, i, deviceCategoryColumn)) {
      object[formData[i][2]].android.count++;
      object[formData[i][2]].android.totalScore += rowAverageScore;
    }

    object[formData[i][2]].all.count++;
    object[formData[i][2]].all.totalScore += rowAverageScore;
  } else {
    object[formData[i][2]] = {
      all: { totalScore: rowAverageScore, count: 1 },
      Indoor: {
        totalScore: rowAverageIndoorScore,
        count: utility.isUsage('Indoor', formData, i, usageTypeColumn) ? 1 : 0,
      },
      Outdoor: {
        totalScore: rowAverageOutdoorScore,
        count: utility.isUsage('Outdoor', formData, i, usageTypeColumn) ? 1 : 0,
      },
      highEnd: {
        totalScore: rowAverageHighEndScore,
        count: utility.isUsage('High end', formData, i, deviceCategoryColumn) ? 1 : 0,
      },
      lowEnd: {
        totalScore: rowAverageLowEndScore,
        count: utility.isUsage('Low end', formData, i, deviceCategoryColumn) ? 1 : 0,
      },
      android: {
        totalScore: rowAverageAndroidScore,
        count: utility.isUsage('Android', formData, i, deviceCategoryColumn) ? 1 : 0,
      },
    };
  }
}

function calculateEffectiveScore(rawData, idx, columnNumbers) {
  let cumScore = 0;
  for (let i = 0; i < columnNumbers.length; i++) {
    cumScore += rawData[idx][columnNumbers[i]];
  }

  return cumScore / columnNumbers.length;
}

function processGenderData(data) {
  const gender = data.toLowerCase();
  if (gender === 'male' || gender === 'female' || gender === 'non-binary') {
    return data;
  }

  return 'Other';
}

function getDistroData() {
  const latestReleaseObject = getLatestReleaseObject();

  for (let i = 1; i < lastRow; i++) {
    // if latest release
    if (formData[i][releaseVersionColumn] === latestRelease) {
      // Then calculate average effectiveness score for AFL, OUTPUT
      const aflAvg = calculateEffectiveScore(formData, i, aflEffectiveScoreColumns);
      const outputAvg = calculateEffectiveScore(formData, i, outputEffectiveScoreColumns);
      const aflIEAvg = calculateEffectiveScore(formData, i, aflInteractiveExperienceColumns);
      const outputIEAvg = calculateEffectiveScore(formData, i, outputInteractiveExperienceColumns);

      latestReleaseObject[latestRelease].afl.cumAvg += aflAvg;
      latestReleaseObject[latestRelease].afl.count++;

      latestReleaseObject[latestRelease].output.cumAvg += outputAvg;
      latestReleaseObject[latestRelease].output.count++;

      // If object inner properties already exist add current avgs and increment count otherwise initialize the object with current avgs and set count to 1
      if (latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]] != null) {
        latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]].cumAvg += aflAvg;
        latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]] = {};
        latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]].cumAvg = aflAvg;
        latestReleaseObject[latestRelease].afl.regions[formData[i][regionColumn]].count = 1;
      }

      if (
        latestReleaseObject[latestRelease].afl.gender[
          processGenderData(formData[i][genderColumn])
        ] != null
      ) {
        latestReleaseObject[latestRelease].afl.gender[
          processGenderData(formData[i][genderColumn])
        ].cumAvg += aflAvg;
        latestReleaseObject[latestRelease].afl.gender[processGenderData(formData[i][genderColumn])]
          .count++;
      } else {
        latestReleaseObject[latestRelease].afl.gender[
          processGenderData(formData[i][genderColumn])
        ] = {};
        latestReleaseObject[latestRelease].afl.gender[
          processGenderData(formData[i][genderColumn])
        ].cumAvg = aflAvg;
        latestReleaseObject[latestRelease].afl.gender[
          processGenderData(formData[i][genderColumn])
        ].count = 1;
      }

      if (latestReleaseObject[latestRelease].afl.skintone[formData[i][skintoneColumn]] != null) {
        latestReleaseObject[latestRelease].afl.skintone[
          formData[i][skintoneColumn]
        ].cumAvg += aflAvg;
        latestReleaseObject[latestRelease].afl.skintone[formData[i][skintoneColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].afl.skintone[formData[i][skintoneColumn]] = {};
        latestReleaseObject[latestRelease].afl.skintone[
          formData[i][skintoneColumn]
        ].cumAvg = aflAvg;
        latestReleaseObject[latestRelease].afl.skintone[formData[i][skintoneColumn]].count = 1;
      }

      if (latestReleaseObject[latestRelease].afl.ethnicity[formData[i][ethnicityColumn]] != null) {
        latestReleaseObject[latestRelease].afl.ethnicity[
          formData[i][ethnicityColumn]
        ].cumAvg += aflAvg;
        latestReleaseObject[latestRelease].afl.ethnicity[formData[i][ethnicityColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].afl.ethnicity[formData[i][ethnicityColumn]] = {};
        latestReleaseObject[latestRelease].afl.ethnicity[
          formData[i][ethnicityColumn]
        ].cumAvg = aflAvg;
        latestReleaseObject[latestRelease].afl.ethnicity[formData[i][ethnicityColumn]].count = 1;
      }

      if (
        latestReleaseObject[latestRelease].afl.interactive.cumAvg != null &&
        latestReleaseObject[latestRelease].afl.interactive.count != null
      ) {
        latestReleaseObject[latestRelease].afl.interactive.cumAvg += aflIEAvg;
        latestReleaseObject[latestRelease].afl.interactive.count++;
      } else {
        latestReleaseObject[latestRelease].afl.interactive = {};
        latestReleaseObject[latestRelease].afl.interactive.cumAvg = aflIEAvg;
        latestReleaseObject[latestRelease].afl.interactive.count = 1;
      }

      if (latestReleaseObject[latestRelease].output.regions[formData[i][regionColumn]] != null) {
        latestReleaseObject[latestRelease].output.regions[
          formData[i][regionColumn]
        ].cumAvg += outputAvg;
        latestReleaseObject[latestRelease].output.regions[formData[i][regionColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].output.regions[formData[i][regionColumn]] = {};
        latestReleaseObject[latestRelease].output.regions[
          formData[i][regionColumn]
        ].cumAvg = outputAvg;
        latestReleaseObject[latestRelease].output.regions[formData[i][regionColumn]].count = 1;
      }

      if (
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ] != null
      ) {
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ].cumAvg += outputAvg;
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ].count++;
      } else {
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ] = {};
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ].cumAvg = aflAvg;
        latestReleaseObject[latestRelease].output.gender[
          processGenderData(formData[i][genderColumn])
        ].count = 1;
      }

      if (latestReleaseObject[latestRelease].output.skintone[formData[i][skintoneColumn]] != null) {
        latestReleaseObject[latestRelease].output.skintone[
          formData[i][skintoneColumn]
        ].cumAvg += outputAvg;
        latestReleaseObject[latestRelease].output.skintone[formData[i][skintoneColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].output.skintone[formData[i][skintoneColumn]] = {};
        latestReleaseObject[latestRelease].output.skintone[
          formData[i][skintoneColumn]
        ].cumAvg = outputAvg;
        latestReleaseObject[latestRelease].output.skintone[formData[i][skintoneColumn]].count = 1;
      }

      if (
        latestReleaseObject[latestRelease].output.ethnicity[formData[i][ethnicityColumn]] != null
      ) {
        latestReleaseObject[latestRelease].output.ethnicity[
          formData[i][ethnicityColumn]
        ].cumAvg += outputAvg;
        latestReleaseObject[latestRelease].output.ethnicity[formData[i][ethnicityColumn]].count++;
      } else {
        latestReleaseObject[latestRelease].output.ethnicity[formData[i][ethnicityColumn]] = {};
        latestReleaseObject[latestRelease].output.ethnicity[
          formData[i][ethnicityColumn]
        ].cumAvg = outputAvg;
        latestReleaseObject[latestRelease].output.ethnicity[formData[i][ethnicityColumn]].count = 1;
      }

      if (
        latestReleaseObject[latestRelease].output.interactive.cumAvg != null &&
        latestReleaseObject[latestRelease].output.interactive.count != null
      ) {
        latestReleaseObject[latestRelease].output.interactive.cumAvg += outputIEAvg;
        latestReleaseObject[latestRelease].output.interactive.count++;
      } else {
        latestReleaseObject[latestRelease].output.interactive = {};
        latestReleaseObject[latestRelease].output.interactive.cumAvg = outputIEAvg;
        latestReleaseObject[latestRelease].output.interactive.count = 1;
      }
    }
  }

  // Logger.log(latestReleaseObject);
  return latestReleaseObject;
}

// Program Execution begins with the main method.
// eslint-disable-next-line no-unused-vars
function main() {
  const releaseVersionObj = {};

  ensureCurrentReleaseHasBeenSet();

  for (let i = 1; i < lastRow; i++) {
    // Initialize variables to hold average and cummulative scores for each
    let rowAverageScore = 0;
    let rowAverageIndoorScore = 0;
    let rowAverageOutdoorScore = 0;
    let rowAverageHighEndScore = 0;
    let rowAverageLowEndScore = 0;
    let rowAverageAndroidScore = 0;

    let rowCumScore = 0;
    let rowCumIndoorScore = 0;
    let rowCumOutdoorScore = 0;
    let rowCumHighEndScore = 0;
    let rowCumLowEndScore = 0;
    let rowCumAndroidScore = 0;

    for (let j = 0; j < effectiveScoreColumns.length; j++) {
      // Gets score value from cell
      const score = utility.covertEmptyCellToZero(formData[i][effectiveScoreColumns[j]]);

      // add to cummulative score for current row
      rowCumScore += score;

      // Update usageType Effectiveness score
      if (utility.isUsage('Indoor', formData, i, usageTypeColumn)) {
        rowCumIndoorScore += score;
      } else if (utility.isUsage('Outdoor', formData, i, usageTypeColumn)) {
        rowCumOutdoorScore += score;
      }

      if (utility.isUsage('High end', formData, i, deviceCategoryColumn)) {
        rowCumHighEndScore += score;
      } else if (utility.isUsage('Low end', formData, i, deviceCategoryColumn)) {
        rowCumLowEndScore += score;
      } else if (utility.isUsage('Android', formData, i, deviceCategoryColumn)) {
        rowCumAndroidScore += score;
      }
    }

    // Calculates average scores for Overall/Indoor/Outdoor/HighEnd/LowEnd/Android for each row
    const numberOfEffectiveScoreColumns = effectiveScoreColumns.length;
    const cumScores = [
      rowCumScore,
      rowCumIndoorScore,
      rowCumOutdoorScore,
      rowCumHighEndScore,
      rowCumLowEndScore,
      rowCumAndroidScore,
    ];

    [
      rowAverageScore,
      rowAverageIndoorScore,
      rowAverageOutdoorScore,
      rowAverageHighEndScore,
      rowAverageLowEndScore,
      rowAverageAndroidScore,
    ] = calculateAverages(cumScores, numberOfEffectiveScoreColumns);

    // Updates tables with calculated average for the current row.
    updateTableData(
      releaseVersionObj,
      i,
      rowAverageScore,
      rowAverageIndoorScore,
      rowAverageOutdoorScore,
      rowAverageLowEndScore,
      rowAverageHighEndScore,
      rowAverageAndroidScore
    );
  }

  const distroDataObject = getDistroData();

  printReleaseVersionObj(releaseVersionObj);

  printDistributionTable(distroDataObject, 'regions', 7, 8);
  printDistributionTable(distroDataObject, 'gender', 13, 14);
  printDistributionTable(distroDataObject, 'skintone', 19, 20);
  printDistributionTable(distroDataObject, 'ethnicity', 25, 26);
  printArtWorkScores(distroDataObject);
  printEffectiveScoreForDeviceCategory(releaseVersionObj);
  printInteractiveExpTable(distroDataObject);
}

global.main = main;

/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The onEdit event.
 */

// function onEdit(e) {
//   // Set a comment on the edited cell to indicate when it was changed.
//   // myFunction();
// }
