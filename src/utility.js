/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export function calculateAverages(cumScores, denominator) {
  return cumScores.map((score) => score / denominator);
}

export function covertEmptyCellToZero(value) {
  if (value != '') {
    return value;
  }

  return 0;
}

export function isUsage(usageType, data, row, column) {
  return data[row][column].includes(`${usageType}`);
}

export function isValidReleaseVersion(version) {
  const regex = /[0-9]+\.[0-9]+\s\([0-9]+\)/g;
  return version.match(regex);
}
