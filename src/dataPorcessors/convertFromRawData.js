/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import EffectiveScore from '../components/EffectveScore';
import * as form from '../spreadSheet';

export function processEffectiveScores(data, idx) {
  const scores = [];
  for (let j = 0; j < form.effectiveScoreColumns.length; j++) {
    const columnNumber = form.effectiveScoreColumns[j];
    if (form.aflEffectiveScoreColumns.includes(columnNumber)) {
      const isInteractive = form.aflInteractiveExperienceColumns.includes(columnNumber);
      scores.push(new EffectiveScore(data[idx][columnNumber], 'afl', isInteractive));
    } else if (form.outputEffectiveScoreColumns.includes(columnNumber)) {
      const isInteractive = form.outputInteractiveExperienceColumns.includes(columnNumber);
      scores.push(new EffectiveScore(data[idx][columnNumber], 'output', isInteractive));
    } else if (form.pioEffectiveScoreColumns.includes(columnNumber)) {
      const isInteractive = form.pioInteractiveExperienceColumns.includes(columnNumber);
      scores.push(new EffectiveScore(data[idx][columnNumber], 'pio', isInteractive));
    } else {
      scores.push(new EffectiveScore(data[idx][columnNumber], 'general', false));
    }
  }
  return scores;
}
