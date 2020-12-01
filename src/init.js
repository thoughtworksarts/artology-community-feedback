/* eslint-disable no-plusplus */
import { APP_RELEASE_VERSIONS, FINAL_DATA, FORM_RESPONSE_1 } from './constants';
import { isValidReleaseVersion, handleMultipleSelections } from './utility';
import * as form from './config';
import { onOpen } from './helpers/menu';

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
  regions: form.regionColumn,
  gender: form.genderColumn,
  skintone: form.skintoneColumn,
  ethnicity: form.ethnicityColumn,
};

export function getAllValuesFor(category) {
  const items = [''];
  const columnNumber = categories[category];
  for (let i = 1; i < lastRow; i++) {
    const values = handleMultipleSelections(formData[i][columnNumber].toLowerCase());
    values.forEach((value) => {
      if (!items.includes(value)) {
        items.push(value);
      }
    });
  }

  return items;
}

const entries = {
  regions: (category) => {
    return getAllValuesFor(category);
  },
  gender: ['male', 'female', 'non-binary', 'other', ''],
  skintone: (category) => {
    return getAllValuesFor(category);
  },
  ethnicity: (category) => {
    return getAllValuesFor(category);
  },
};

export function getAllEntriesFor(category) {
  return category === 'gender' ? entries[category] : entries[category](category);
}

export function getLatestRelease() {
  const data = finalDataSheet.getRange(1, 1, 1, 2).getValues();
  let input = data[0][1];
  while (!isValidReleaseVersion(input)) {
    input = ui.prompt('Input current app release number (ex: 1.0 (13) )').getResponseText();
  }
  finalDataSheet.getRange(1, 2).setValue(input);
  return input;
}

onOpen();
