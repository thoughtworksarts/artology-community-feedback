import { FINAL_DATA, FORM_RESPONSE_1 } from './constants';

export const effectiveScoreColumns = [13, 15, 17, 20, 23, 25, 27, 30, 32, 36]; // Column numbers for effective score data
export const aflEffectiveScoreColumns = [20, 23, 25]; // Column numbers for effective score data for A Fathers Lulliby
export const outputEffectiveScoreColumns = [27, 30, 32]; // Column numbers for effective score data for Output
export const aflInteractiveExperienceColumns = [23, 25]; // Column numbers for interactive experience score data for A Fathers Lulliby
export const outputInteractiveExperienceColumns = [30, 32]; // Column numbers for interactive experience score data for Output
export const usageTypeColumn = 19; // Column number for usage type (Indoor/Outdoor) data
export const deviceCategoryColumn = 11; // Column number for device category data (high-end, low-end, android)
export const releaseVersionColumn = 2; // Column Number for release dates/versions
export const regionColumn = 5; // Column number for Country
export const genderColumn = 6; // Column number for Gender data
export const skintoneColumn = 8; // Column number for Skintone data
export const ethnicityColumn = 7; // Column number for ethnicity data

export const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // Get active sheet
export const ui = SpreadsheetApp.getUi();
export const formResponseSheet = spreadSheet.getSheetByName(FORM_RESPONSE_1);
export const finalDataSheet = spreadSheet.getSheetByName(FINAL_DATA);
export const rangeData = formResponseSheet.getDataRange(); // Get Range of data on spreadsheet
export const lastColumn = rangeData.getLastColumn();
export const lastRow = rangeData.getLastRow();
export const searchRange = formResponseSheet.getRange(1, 1, lastRow, lastColumn);
export const formData = searchRange.getValues(); // Raw form data
