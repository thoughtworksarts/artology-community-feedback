/* eslint-disable no-undef */
import * as formData from './test_data';
import * as incomingData from '../dataPorcessors/incomingData';

describe('incomingData', () => {
  it('should retrieve 14 Effective scores for each ES entry', () => {
    const effectiveScores = incomingData.processEffectiveScores(formData.formData, 0);
    expect(effectiveScores.length).toEqual(13);
    expect(effectiveScores[0].getScore()).toEqual(5);
  });
});
