/* eslint-disable no-plusplus */
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

export function processGenderData(data) {
  const gender = data.toLowerCase();
  if (gender === 'male' || gender === 'female' || gender === 'non-binary') {
    return gender;
  }

  return 'other';
}

export function processEnvironmentData(data) {
  let env;
  if (data.includes('Indoor')) {
    env = 'indoor';
  } else if (data.includes('Outdoor')) {
    env = 'outdoor';
  } else {
    env = 'other';
  }

  return env;
}

export function calculateEffectiveScore(rawData, idx, columnNumbers) {
  let cumScore = 0;
  for (let i = 0; i < columnNumbers.length; i++) {
    cumScore += rawData[idx][columnNumbers[i]];
  }

  return cumScore / columnNumbers.length;
}
