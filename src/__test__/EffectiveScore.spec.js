/* eslint-disable no-undef */
import EffectiveScore from '../components/EffectveScore';

describe('EffectiveScore', () => {
  let effectiveScore;
  let anotherEffectiveScore;

  beforeEach(() => {
    effectiveScore = new EffectiveScore('5', 'afl', true);
    anotherEffectiveScore = new EffectiveScore('3', 'pio', false);
  });

  it('should get artwork', () => {
    expect(effectiveScore.getArtwork()).toEqual('afl');
    expect(anotherEffectiveScore.getArtwork()).toEqual('pio');
  });

  it('should return true if score was submited for an Interactive portion', () => {
    expect(effectiveScore.isInteractive()).toBe(true);
    expect(anotherEffectiveScore.isInteractive()).toBe(false);
  });

  it('should retun value submitted for the Effective score', () => {
    expect(effectiveScore.getScore()).toBe(5);
    expect(anotherEffectiveScore.getScore()).toBe(3);
  });
});
