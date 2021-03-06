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

export function processVersionData(data) {
  let version;
  let build;
  data.split(', ').forEach((array, index) => {
    if (index === 0) {
      // eslint-disable-next-line prefer-destructuring
      version = array.split(' ')[1];
    } else {
      // eslint-disable-next-line prefer-destructuring
      build = array.split(' ')[1];
    }
  });

  return `${version} (${build})`;
}

export function processGenderData(data) {
  const gender = data.toLowerCase();

  if (!(gender === 'male' || gender === 'female' || gender === 'non-binary' || gender === '')) {
    return 'other';
  }

  return gender;
}
export function processAgeData(data) {
  const age = data;

  if (
    !(
      age === 'Under 35' ||
      age === '35-54' ||
      age === '55 and over' ||
      age === 'Prefer not to answer' ||
      age === ''
    )
  ) {
    return 'other';
  }

  return age;
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
  if (category.includes('without truedepth')) {
    return 'without truedepth';
  }
  if (category.includes('with truedepth')) {
    return 'with truedepth';
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
