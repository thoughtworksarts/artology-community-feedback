/* eslint-disable no-undef */
import FeedbackEntry from '../components/FeedbackEntry';
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

  describe('getAverageEffectiveScoreFor', () => {
    it("should get a single entry's overall average Effective score", () => {
      const feedbackEntry = new FeedbackEntry(data);
      const { avgScore, count } = feedbackEntry.getAverageEffectiveScoreFor();
      expect(avgScore).toEqual(3.125);
      expect(count).toEqual(1);
    });

    it('should not include an empty score in overall average score calculation', () => {
      const emptyScore = new EffectiveScore('', 'output', true);

      const scores = [
        new EffectiveScore('5', 'afl', true),
        new EffectiveScore('2', 'afl', false),
        new EffectiveScore('5', 'output', false),
        emptyScore,
      ];

      const entryData = {
        version: '1.0 (14)',
        country: 'United States',
        gender: 'Male',
        ethnicity: 'African American/Black',
        skintone: 'Option 1',
        deviceCategory: 'Android',
        environment: 'Indoor low light',
        effectiveScores: scores,
      };

      const entry = new FeedbackEntry(entryData);
      expect(entry.getAverageEffectiveScoreFor()).toEqual({ avgScore: 4, count: 1 });
    });

    it('should get the average score for afl', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageEffectiveScoreFor('afl')).toEqual({ avgScore: 4, count: 1 });
    });

    it('should get the average score for output', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageEffectiveScoreFor('output')).toEqual({
        avgScore: 2.5,
        count: 1,
      });
    });

    it('should get the average score for pio', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageEffectiveScoreFor('pio')).toEqual({ avgScore: 3, count: 1 });
    });

    it('should not include an empty score in calculation of artwork average Effective score', () => {
      const emptyScoreAfl = new EffectiveScore('', 'afl', true);
      const emptyScoreOutput = new EffectiveScore('', 'output', true);
      const emptyScorePio = new EffectiveScore('', 'pio', false);

      const scores = [
        new EffectiveScore('5', 'afl', true),
        new EffectiveScore('2', 'afl', false),
        new EffectiveScore('5', 'output', false),
        emptyScoreAfl,
        emptyScoreOutput,
        emptyScorePio,
      ];

      const entryData = {
        version: '1.0 (14)',
        country: 'United States',
        gender: 'Male',
        ethnicity: 'African American/Black',
        skintone: 'Option 1',
        deviceCategory: 'Android',
        environment: 'Indoor low light',
        effectiveScores: scores,
      };

      const feedbackEntry = new FeedbackEntry(entryData);
      expect(feedbackEntry.getAverageEffectiveScoreFor('afl')).toEqual({ avgScore: 3.5, count: 1 });
      expect(feedbackEntry.getAverageEffectiveScoreFor('output')).toEqual({
        avgScore: 5,
        count: 1,
      });
      expect(feedbackEntry.getAverageEffectiveScoreFor('pio')).toEqual({
        avgScore: 'N/A',
        count: 0,
      });
    });
  });

  describe('getAverageInteractiveScoreFor', () => {
    it('should get the average Interactive score for afl', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('afl')).toEqual({ avgScore: 5, count: 1 });
    });

    it('should get the average Interactive score for output', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('output')).toEqual({
        avgScore: 2,
        count: 1,
      });
    });

    it('should get the average Interactive score for pio', () => {
      const feedbackEntry = new FeedbackEntry(data);
      expect(feedbackEntry.getAverageInteractiveScoreFor('pio')).toEqual({
        avgScore: 'N/A',
        count: 0,
      });
    });

    it('should not include an empty score in calculation of artowrk Interactive Score', () => {
      const emptyScoreAfl = new EffectiveScore('', 'afl', true);
      const emptyScoreOutput = new EffectiveScore('', 'output', true);
      const emptyScorePio = new EffectiveScore('', 'pio', true);

      const scores = [
        new EffectiveScore('5', 'afl', true),
        new EffectiveScore('2', 'afl', true),
        new EffectiveScore('5', 'output', true),
        emptyScoreAfl,
        emptyScoreOutput,
        emptyScorePio,
      ];

      const entryData = {
        version: '1.0 (14)',
        country: 'United States',
        gender: 'Male',
        ethnicity: 'African American/Black',
        skintone: 'Option 1',
        deviceCategory: 'Android',
        environment: 'Indoor low light',
        effectiveScores: scores,
      };

      const feedbackEntry = new FeedbackEntry(entryData);
      expect(feedbackEntry.getAverageInteractiveScoreFor('afl')).toEqual({
        avgScore: 3.5,
        count: 1,
      });
      expect(feedbackEntry.getAverageInteractiveScoreFor('output')).toEqual({
        avgScore: 5,
        count: 1,
      });
      expect(feedbackEntry.getAverageInteractiveScoreFor('pio')).toEqual({
        avgScore: 'N/A',
        count: 0,
      });
    });
  });
});
