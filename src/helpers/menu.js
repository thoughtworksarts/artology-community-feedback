/* eslint-disable import/prefer-default-export */
export function onOpen() {
  // Or DocumentApp or FormApp.
  SpreadsheetApp.getUi().createMenu('ARtology').addItem('Run Script', 'main').addToUi();
}
