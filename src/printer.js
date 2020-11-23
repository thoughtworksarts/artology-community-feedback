/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export function printReleaseVersionObj(object, finalDataSheet, columnTitles, startTableColumn) {
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

export function printArtworkEffectiveScore(object, finalDataSheet, startTableColumn) {
  finalDataSheet.getRange(2, startTableColumn + 1).setValue('Average Effective Score');
  Object.keys(object).forEach((key, idx) => {
    // Set column Header
    finalDataSheet.getRange(idx + 3, startTableColumn).setValue(key.toUpperCase());
    // Fill in column Data
    finalDataSheet.getRange(idx + 3, 32).setValue(object[key]);
  });
}

// export function printEffectiveScorePerDeviceCategory(releaseVersionObj, finalDataSheet) {}
// export function printEffectiveScorePerDeviceCategory(releaseVersionObj, finalDataSheet) {
//   ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android'].forEach((header, index) =>
//     finalDataSheet.getRange(2, index + 36).setValue(header)
//   );
//   Object.keys(releaseVersionObj)
//     .sort()
//     .reverse()
//     .forEach((key, index) => {
//       const value = releaseVersionObj[`${key}`];
//       const lowEndTotal = value.lowEnd.totalScore;
//       const lowEndTotalCount = value.lowEnd.count;
//       const highEndTotal = value.highEnd.totalScore;
//       const highEndTotalCount = value.highEnd.count;
//       const androidTotal = value.android.totalScore;
//       const androidTotalCount = value.android.count;

//       const avgLowEnd = lowEndTotalCount != 0 ? lowEndTotal / lowEndTotalCount : 0;
//       const avgHighEnd = highEndTotalCount != 0 ? highEndTotal / highEndTotalCount : 0;
//       const avgAndroid = androidTotalCount != 0 ? androidTotal / androidTotalCount : 0;

//       // Set release Date Column
//       finalDataSheet.getRange(index + 3, 36).setValue(key);
//       // Set Low End Average Eff column
//       finalDataSheet.getRange(index + 3, 37).setValue(avgLowEnd);
//       // Set High End Avg Eff Column data
//       finalDataSheet.getRange(index + 3, 38).setValue(avgHighEnd);
//       // Set Android Avg Eff Column
//       finalDataSheet.getRange(index + 3, 39).setValue(avgAndroid);
//     });
// }

export function printInteractiveExpTable(object, finalDataSheet, latestRelease) {
  // Set column Name
  finalDataSheet.getRange(2, 42).setValue('Interactive Portion Effective Score');
  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Set row names
    finalDataSheet.getRange(index + 3, 41).setValue(artwork.toUpperCase());
    // Fill in data
    finalDataSheet
      .getRange(index + 3, 42)
      .setValue(
        object[latestRelease][artwork].interactive.cumAvg /
          object[latestRelease][artwork].interactive.count
      );
  });
}
