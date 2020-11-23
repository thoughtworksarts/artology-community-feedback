/* eslint-disable import/prefer-default-export */
export function onOpen(ui) {
  // Or DocumentApp or FormApp.
  ui.createMenu('ARtology').addItem('Update Charts', 'main').addToUi();
}
