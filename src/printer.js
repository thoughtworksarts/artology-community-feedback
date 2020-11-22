/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */

export function printReleaseVersionObj(object, finalDataSheet) {
  // Print Column Headers
  ['Release Version', 'Overall', 'Indoor', 'Outdoor'].forEach((header, index) =>
    finalDataSheet.getRange(2, index + 1).setValue(header)
  );

  //
  Object.keys(object)
    .sort()
    .reverse()
    .forEach((key, index) => {
      const value = object[`${key}`];
      const { overall, indoor, outdoor } = value;

      // Set release Date Column
      finalDataSheet.getRange(index + 3, 1).setValue(key);
      // Set Average Eff column
      finalDataSheet.getRange(index + 3, 2).setValue(overall);
      // Set Average Idoor
      finalDataSheet.getRange(index + 3, 3).setValue(indoor);
      // Set Average Outdoor
      finalDataSheet.getRange(index + 3, 4).setValue(outdoor);
    });
}

export function printEffectiveScorePerDeviceCategory(releaseVersionObj, finalDataSheet) {
  ['Release Version', 'Low End (iPhone)', 'High End (iPhone)', 'Android'].forEach((header, index) =>
    finalDataSheet.getRange(2, index + 36).setValue(header)
  );
  Object.keys(releaseVersionObj)
    .sort()
    .reverse()
    .forEach((key, index) => {
      const value = releaseVersionObj[`${key}`];
      const lowEndTotal = value.lowEnd.totalScore;
      const lowEndTotalCount = value.lowEnd.count;
      const highEndTotal = value.highEnd.totalScore;
      const highEndTotalCount = value.highEnd.count;
      const androidTotal = value.android.totalScore;
      const androidTotalCount = value.android.count;

      const avgLowEnd = lowEndTotalCount != 0 ? lowEndTotal / lowEndTotalCount : 0;
      const avgHighEnd = highEndTotalCount != 0 ? highEndTotal / highEndTotalCount : 0;
      const avgAndroid = androidTotalCount != 0 ? androidTotal / androidTotalCount : 0;

      // Set release Date Column
      finalDataSheet.getRange(index + 3, 36).setValue(key);
      // Set Low End Average Eff column
      finalDataSheet.getRange(index + 3, 37).setValue(avgLowEnd);
      // Set High End Avg Eff Column data
      finalDataSheet.getRange(index + 3, 38).setValue(avgHighEnd);
      // Set Android Avg Eff Column
      finalDataSheet.getRange(index + 3, 39).setValue(avgAndroid);
    });
}

export function printDistributionTable(
  object,
  dataCategory,
  labelColumn,
  firstDataColumn,
  finalDataSheet,
  latestRelease
) {
  // Print Table first Column header
  finalDataSheet.getRange(2, labelColumn).setValue(dataCategory.toUpperCase());

  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Print Tables Remaining Column headers
    finalDataSheet.getRange(2, index + firstDataColumn).setValue(artwork.toUpperCase());

    Object.keys(object[latestRelease][artwork][dataCategory]).forEach((data, idx) => {
      // Print Tables Row headers
      finalDataSheet.getRange(idx + 3, labelColumn).setValue(data);
      // Fill in table data
      const avg =
        object[latestRelease][artwork][dataCategory][data].cumAvg /
        object[latestRelease][artwork][dataCategory][data].count;
      finalDataSheet.getRange(idx + 3, index + firstDataColumn).setValue(avg);
    });
  });
}

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

export function printArtWorkScores(object, finalDataSheet, latestRelease) {
  finalDataSheet.getRange(2, 32).setValue('Average Effective Score');
  Object.keys(object[latestRelease]).forEach((artwork, index) => {
    // Set column Header
    finalDataSheet.getRange(index + 3, 31).setValue(artwork.toUpperCase());
    // Fill in column Data
    finalDataSheet
      .getRange(index + 3, 32)
      .setValue(object[latestRelease][artwork].cumAvg / object[latestRelease][artwork].count);
  });
}
