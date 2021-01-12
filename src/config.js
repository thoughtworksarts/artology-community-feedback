export const artworks = {
  afl: "A Father's Lullaby",
  output: 'Output',
  seismicp:"Seismic Percussion"
};
export const environments = ['indoor', 'outdoor', 'other'];
export const categories = ['regions', 'gender', 'skintone', 'ethnicity'];
export const deviceCategories = ['without truedepth', 'with truedepth', 'android', 'other'];

// Below are column numbers from the Community feedback spreadsheet (Form Responses 1)
// Needs to be updated when column numbers changed on the feedback form.
export const effectiveScoreColumns = [13, 15, 17, 20, 23, 25, 27, 30, 32, 36]; // Column numbers for effective score data
export const aflEffectiveScoreColumns = [20, 23, 25]; // Column numbers for effective score data for A Fathers Lulliby
export const aflInteractiveExperienceColumns = [23, 25]; // Column numbers for interactive experience score data for A Fathers Lulliby
export const outputEffectiveScoreColumns = [27, 30, 32]; // Column numbers for effective score data for Output
export const outputInteractiveExperienceColumns = [30, 32]; // Column numbers for interactive experience score data for Output
export const seismicpEffectiveScoreColumns = [43, 47, 49]; // Column numbers for effective score data for Seismic Percussion
export const seismicpInteractiveExperienceColumns = [47, 49]; // Column numbers for interactive experience score data for Seismic Percussion
export const usageTypeColumn = 19; // Column number for usage type (indoor/outdoor) data
export const deviceCategoryColumn = 11; // Column number for device category data (high-end, low-end, android)
export const releaseVersionColumn = 2; // Column Number for release dates/versions
export const regionColumn = 5; // Column number for Country
export const genderColumn = 6; // Column number for Gender data
export const skintoneColumn = 8; // Column number for Skintone data
export const ethnicityColumn = 7; // Column number for ethnicity data

export const esColumnGroup = {
  afl: aflEffectiveScoreColumns,
  output: outputEffectiveScoreColumns,
  seismicp: seismicpEffectiveScoreColumns,
};

export const iesColumnGroup = {
  afl: aflInteractiveExperienceColumns,
  output: outputInteractiveExperienceColumns,
  seismicp: seismicpInteractiveExperienceColumns
};
