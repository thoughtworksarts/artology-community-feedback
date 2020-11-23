/* eslint-disable no-plusplus */
import { APP_RELEASE_VERSIONS, FINAL_DATA, FORM_RESPONSE_1 } from './constants';

export const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // Get active sheet
export const ui = SpreadsheetApp.getUi();
export const formResponseSheet = spreadSheet.getSheetByName(FORM_RESPONSE_1);
export const finalDataSheet = spreadSheet.getSheetByName(FINAL_DATA);
export const releaseVersionsSheet = spreadSheet.getSheetByName(APP_RELEASE_VERSIONS);
export const rangeData = formResponseSheet.getDataRange(); // Get Range of data on spreadsheet
export const lastColumn = rangeData.getLastColumn();
export const lastRow = rangeData.getLastRow();
export const searchRange = formResponseSheet.getRange(1, 1, lastRow, lastColumn);
export const formData = searchRange.getValues(); // Raw form

export const effectiveScoreColumns = [13, 15, 17, 20, 23, 25, 27, 30, 32, 34, 37, 39, 43]; // Column numbers for effective score data
export const aflEffectiveScoreColumns = [20, 23, 25]; // Column numbers for effective score data for A Fathers Lulliby
export const outputEffectiveScoreColumns = [27, 30, 32]; // Column numbers for effective score data for Output
export const pioEffectiveScoreColumns = [34, 37, 39]; // Column numbers for effective score data for Perception I/O
export const aflInteractiveExperienceColumns = [23, 25]; // Column numbers for interactive experience score data for A Fathers Lulliby
export const outputInteractiveExperienceColumns = [30, 32]; // Column numbers for interactive experience score data for Output
export const pioInteractiveExperienceColumns = [37, 39]; // Column numbers for interactive experience score data for Output
export const usageTypeColumn = 19; // Column number for usage type (Indoor/Outdoor) data
export const deviceCategoryColumn = 11; // Column number for device category data (high-end, low-end, android)
export const releaseVersionColumn = 2; // Column Number for release dates/versions
export const regionColumn = 5; // Column number for Country
export const genderColumn = 6; // Column number for Gender data
export const skintoneColumn = 8; // Column number for Skintone data
export const ethnicityColumn = 7; // Column number for ethnicity data

export function getListOfRelaseVersions() {
  const range = releaseVersionsSheet.getDataRange();
  const lastRw = range.getLastRow();
  const lastClm = range.getLastColumn();
  const rng = releaseVersionsSheet.getRange(1, 1, lastRw, lastClm);
  const data = rng.getValues();
  const versions = [];
  for (let i = 1; i < lastRw; i++) {
    if (!versions.includes(data[i][0])) {
      versions.push(data[i][0]);
    }
  }

  return versions;
}

const categories = {
  regions: regionColumn,
  gender: genderColumn,
  skintone: skintoneColumn,
  ethnicity: ethnicityColumn,
};

export function getAllValuesFor(category) {
  const items = [];
  const columnNumber = categories[category];
  for (let i = 1; i < lastRow; i++) {
    const value = formData[i][columnNumber].toLowerCase();
    if (!items.includes(value)) {
      items.push(value);
    }
  }

  return items;
}
