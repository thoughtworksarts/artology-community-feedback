/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export function printEffectiveScorePerReleaseTable(
  object,
  finalDataSheet,
  columnTitles,
  startTableColumn
) {
  // Print Column columnTitles
  columnTitles.forEach((header, index) =>
    finalDataSheet.getRange(2, index + startTableColumn + 1).setValue(header)
  );

  Object.keys(object)
    .sort()
    .reverse()
    .forEach((key, index) => {
      const properties = [];
      Object.keys(object[`${key}`]).forEach((property) => {
        properties.push(object[`${key}`][property]);
      });

      // Set release Date Column
      finalDataSheet.getRange(index + 3, startTableColumn + 1).setValue(key);
      // Set Average Eff column
      finalDataSheet.getRange(index + 3, startTableColumn + 2).setValue(properties[0]);
      // Set Average Idoor
      finalDataSheet.getRange(index + 3, startTableColumn + 3).setValue(properties[1]);
      // Set Average Outdoor
      finalDataSheet.getRange(index + 3, startTableColumn + 4).setValue(properties[2]);
    });
}

export function printDistroTable(object, category, finalDataSheet, startTableColumn) {
  // Print Table first Column header
  finalDataSheet.getRange(2, startTableColumn).setValue(category.toUpperCase());

  Object.keys(object).forEach((version) => {
    Object.keys(object[version]).forEach((artwork, j) => {
      // Print Table first Column header
      finalDataSheet.getRange(2, j + startTableColumn + 1).setValue(artwork.toUpperCase());
      Object.keys(object[version][artwork][category]).forEach((property, i) => {
        const value = object[version][artwork][category][property];
        // Print Tables Row columnTitles
        finalDataSheet.getRange(i + 3, startTableColumn).setValue(property.toUpperCase());
        // Fill in data
        finalDataSheet.getRange(i + 3, j + startTableColumn + 1).setValue(value);
      });
    });
  });
}

export function printEffectiveScorePerArtworkTable(
  object,
  finalDataSheet,
  startTableColumn,
  columnTitle
) {
  finalDataSheet.getRange(2, startTableColumn + 1).setValue(columnTitle);
  Object.keys(object).forEach((key, idx) => {
    // Set column Header
    finalDataSheet.getRange(idx + 3, startTableColumn).setValue(key.toUpperCase());
    // Fill in column Data
    finalDataSheet.getRange(idx + 3, startTableColumn + 1).setValue(object[key]);
  });
}
