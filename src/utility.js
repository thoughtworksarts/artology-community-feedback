/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export function convertEmptyCellToZero(value) {
  if (value != '') {
    return value;
  }

  return 0;
}

export function isValidReleaseVersion(version) {
  const regex = /[0-9]+\.[0-9]+\s\([0-9]+\)/g;
  return !!version.toString().match(regex);
}

export function processGenderData(data) {
  const gender = data.toLowerCase();

  if (!(gender === 'male' || gender === 'female' || gender === 'non-binary' || gender === '')) {
    return 'other';
  }

  return gender;
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

export function processDeviceCategoryData(data) {
  const category = data.toLowerCase();
  if (category.includes('low end')) {
    return 'low end';
  }
  if (category.includes('high end')) {
    return 'high end';
  }
  if (category.includes('android')) {
    return 'android';
  }

  return 'other';
}

export function handleMultipleSelections(data) {
  const regExp = new RegExp(',\\s', 'gi');
  return data.split(regExp);
}

export function moduloWhenOdd(num1, num2) {
  return num1 > num2 ? num1 % num2 : num1;
}
