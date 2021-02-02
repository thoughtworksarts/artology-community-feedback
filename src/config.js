export const artworks = {
  afl: "A Father's Lullaby",
  output: 'Output',
  sp: 'Seismic Percussion',
};
export const environments = ['indoor', 'outdoor', 'other'];
export const categories = ['regions', 'gender', 'skintone', 'ethnicity', 'age'];
export const deviceCategories = ['without truedepth', 'with truedepth', 'android', 'other'];

// Below are column numbers from the Community feedback spreadsheet (Form Responses 1)
// Needs to be updated when column numbers changed on the feedback form.
export const effectiveScoreColumns = [15, 19, 24, 28, 30, 32, 35, 39, 40, 42, 47, 56, 51, 52]; // Column numbers for effective score data
export const aflEffectiveScoreColumns = [24, 28, 30, 32]; // Column numbers for effective score data for A Fathers Lulliby
export const aflInteractiveExperienceColumns = [28]; // Column numbers for interactive experience score data for A Fathers Lulliby
export const outputEffectiveScoreColumns = [35, 39, 40, 42]; // Column numbers for effective score data for Output
export const outputInteractiveExperienceColumns = [39, 40]; // Column numbers for interactive experience score data for Output
export const spEffectiveScoreColumns = [47, 56, 51, 52]; // Column numbers for effective score data for Seismic Percussion
export const spInteractiveExperienceColumns = [51, 52]; // Column numbers for interactive experience score data for Seismic Percussion
export const usageTypeColumn = 12; // Column number for usage type (indoor/outdoor) data
export const deviceCategoryColumn = 2; // Column number for device category data (high-end, low-end, android)
export const releaseVersionColumn = 1; // Column Number for release dates/versions
export const regionColumn = 7; // Column number for Country
export const genderColumn = 8; // Column number for Gender data
export const skintoneColumn = 11; // Column number for Skintone data
export const ethnicityColumn = 10; // Column number for ethnicity data
export const ageColumn = 9; // Column number for age data

export const esColumnGroup = {
  afl: aflEffectiveScoreColumns,
  output: outputEffectiveScoreColumns,
  sp: spEffectiveScoreColumns,
};

export const iesColumnGroup = {
  afl: aflInteractiveExperienceColumns,
  output: outputInteractiveExperienceColumns,
  sp: spInteractiveExperienceColumns,
};
