/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import EffectiveScore from '../components/EffectveScore';
import InnovativeScore from '../components/InnovativeScore';
import * as form from '../config';
import * as utility from '../utility';

export function processEffectiveScores(data, idx) {
  const scores = [];
  for (let j = 0; j < form.effectiveScoreColumns.length; j++) {
    const columnNumber = form.effectiveScoreColumns[j];
    let isNotArtworkColumn = true;
    Object.keys(form.artworks).forEach((artwork) => {
      if (form.esColumnGroup[artwork].includes(columnNumber)) {
        const isInteractive = form.iesColumnGroup[artwork].includes(columnNumber);
        isNotArtworkColumn = false;
        scores.push(
          new EffectiveScore(
            utility.convertEmptyCellToZero(data[idx][columnNumber]),
            artwork,
            isInteractive
          )
        );
      }
    });
    // If the current effectiveness score column does not belong to any artwork its a general effectiveness score entry
    if (isNotArtworkColumn) {
      scores.push(
        new EffectiveScore(
          utility.convertEmptyCellToZero(data[idx][columnNumber]),
          'general',
          false
        )
      );
    }
  }
  return scores;
}

export function processInnovativeScores(data, idx) {
  const scores = [];
  for (let j = 0; j < form.innovativeScoreColumns.length; j++) {
    const columnNumber = form.innovativeScoreColumns[j];
    let isNotArtworkColumn = true;
    Object.keys(form.artworks).forEach((artwork) => {
      if (form.innovativeesColumnGroup[artwork].includes(columnNumber)) {
        isNotArtworkColumn = false;
        scores.push(
          new InnovativeScore(utility.convertEmptyCellToZero(data[idx][columnNumber]), artwork)
        );
      }
    });
    // If the current innovativeness score column does not belong to any artwork its a general innovativeness score entry
    if (isNotArtworkColumn) {
      scores.push(
        new InnovativeScore(
          utility.convertEmptyCellToZero(data[idx][columnNumber]),
          'general',
          false
        )
      );
    }
  }
  return scores;
}
