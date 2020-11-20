/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
export function covertEmptyCellToZero(value) {
  if (value != '') {
    return value;
  }

  return 0;
}

export function isUsage(usageType, data, row, column) {
  return data[row][column].includes(`${usageType}`);
}
