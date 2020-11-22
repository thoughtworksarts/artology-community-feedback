/* eslint-disable no-undef */
import FeedbackEntry from '../components/FeedBackEntry';
import EffectiveScore from '../components/EffectveScore';

describe('FeedbackEntry', () => {
  let effectiveScores;
  let data;
  beforeEach(() => {
    effectiveScores = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('2', 'output', true),
      new EffectiveScore('2', 'afl', false),
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('4', 'pio', false),
      new EffectiveScore('2', 'general', false),
      new EffectiveScore('3', 'output', false),
      new EffectiveScore('2', 'pio', false),
    ];

    data = {
      version: '1.0 (14)',
      country: 'United States',
      gender: 'Male',
      ethnicity: 'African American/Black',
      skintone: 'Option 1',
      deviceCategory: 'Android',
      environment: 'Indoor low light',
      effectiveScores,
    };
  });

  it('should get the average score for a feedback entry', () => {
    const feedbackEntry = new FeedbackEntry(data);
    expect(feedbackEntry.getAverageEffectiveScore()).toEqual(3.125);
  });

  describe('getAverageScoreFor', () => {
    it('should get the average score for afl for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageScoreFor('afl')).toEqual(4);
    });

    it('should get the average score for output for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageScoreFor('output')).toEqual(2.5);
    });

    it('should get the average score for pio for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageScoreFor('pio')).toEqual(3);
    });
  });

  describe('getAverageInteractiveScoreFor', () => {
    it('should get the average Interactive score for afl for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('afl')).toEqual(5);
    });

    it('should get the average Interactive score for output for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('output')).toEqual(2);
    });

    it('should get the average Interactive score for pio for a feedback entry', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('pio')).toEqual(0);
    });
  });
});
