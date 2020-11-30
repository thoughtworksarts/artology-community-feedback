/* eslint-disable no-undef */
import FeedbackForm from '../components/FeedbackForm';
import EffectiveScore from '../components/EffectveScore';
import FeedbackEntry from '../components/FeedbackEntry';

describe('FeedbackForm', () => {
  let data1;
  let data2;
  let data3;
  let data4;

  beforeEach(() => {
    // avg: 3
    const effectiveScores1 = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('2', 'output', true),
      new EffectiveScore('2', 'pio', false),
    ];

    // avg: 4
    const effectiveScores2 = [
      new EffectiveScore('3', 'pio', true),
      new EffectiveScore('4', 'output', true),
      new EffectiveScore('5', 'afl', false),
    ];

    // avg: 8
    const effectiveScores3 = [
      new EffectiveScore('5', 'pio', true),
      new EffectiveScore('9', 'output', true),
      new EffectiveScore('10', 'afl', false),
    ];

    data1 = {
      version: '1.0 (14)',
      country: 'united states',
      gender: 'male',
      ethnicity: 'african american/black',
      skintone: 'option 1',
      deviceCategory: 'android',
      environment: 'outdoor',
      effectiveScores: effectiveScores1,
    };

    data2 = {
      version: '1.0 (14)',
      country: 'brazil',
      gender: 'female',
      ethnicity: 'white',
      skintone: 'option 4',
      deviceCategory: 'low end',
      environment: 'indoor',
      effectiveScores: effectiveScores2,
    };

    data3 = {
      version: '1.0 (13)',
      country: 'united states',
      gender: 'female',
      ethnicity: 'white',
      skintone: 'option 3',
      deviceCategory: 'low end',
      environment: 'indoor',
      effectiveScores: effectiveScores3,
    };

    // feedbackEntries = [
    //   new FeedbackEntry(data1),
    //   new FeedbackEntry(data2),
    //   new FeedbackEntry(data3),
    // ];
  });

  describe('filterBy', () => {
    let feedbackEntries;
    beforeEach(() => {
      feedbackEntries = [
        new FeedbackEntry(data1),
        new FeedbackEntry(data2),
        new FeedbackEntry(data3),
      ];
    });

    it('should filter by region', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.filterBy(feedbackEntries, 'region', 'united states').length).toEqual(2);
      expect(feedbackForm.filterBy(feedbackEntries, 'region', 'canada').length).toEqual(0);
    });

    it('should filter by gender', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.filterBy(feedbackEntries, 'gender', 'female').length).toEqual(2);
      expect(feedbackForm.filterBy(feedbackEntries, 'gender', 'male').length).toEqual(1);
    });

    it('should filter by Ethnicity', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.filterBy(feedbackEntries, 'ethnicity', 'white').length).toEqual(2);
      expect(feedbackForm.filterBy(feedbackEntries, 'ethnicity', 'yellow').length).toEqual(0);
    });

    it('should filter by device category', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.filterBy(feedbackEntries, 'device', 'android').length).toEqual(1);
      expect(feedbackForm.filterBy(feedbackEntries, 'device', 'low end').length).toEqual(2);
    });
  });

  describe('getOverallEffectiveScoreFor', () => {
    let feedbackEntries;
    beforeEach(() => {
      feedbackEntries = [
        new FeedbackEntry(data1),
        new FeedbackEntry(data2),
        new FeedbackEntry(data3),
      ];
    });

    it('should get the overall Effective score for all feedbacks (unfiltered form)', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor()).toEqual(5);
    });

    it('should get the overall Effective score for all feedback where region is united states', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor(false, { region: 'united states' })).toEqual(
        5.5
      );
    });

    it('should get the overall Effective score for all feedback where gender is female', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor(false, { gender: 'female' })).toEqual(6);
    });

    it('should get the overall Effective score for all feedback where skintone is option 4', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor(false, { skintone: 'option 4' })).toEqual(4);
    });

    it('should get the overall Effective score for all feedback where environment is indoor', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor(false, { environment: 'indoor' })).toEqual(6);
    });

    it('should get the overall Effective score for all feedback where region is africa', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor(false, { region: 'africa' })).toEqual(0);
    });

    it('should get the overall Effective score for feedback where version 1.0 (14) and country brazil', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(
        feedbackForm.getOverallEffectiveScoreFor(false, { version: '1.0 (14)', region: 'brazil' })
      ).toEqual(4);
    });

    it('should get the overall Effective score for feedback where gender is female and environment is indoor', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(
        feedbackForm.getOverallEffectiveScoreFor(false, {
          gender: 'female',
          environment: 'indoor',
          region: 'brazil',
        })
      ).toEqual(4);
    });

    it('an empty score for an entry should not impact the overall effective score for the entire form', () => {
      const scores = [
        new EffectiveScore('', 'afl', true),
        new EffectiveScore('9', 'output', true),
        new EffectiveScore('', 'pio', true),
      ];

      data4 = {
        version: '1.0 (13)',
        country: 'united states',
        gender: 'female',
        ethnicity: 'white',
        skintone: 'option 3',
        deviceCategory: 'low end',
        environment: 'indoor',
        effectiveScores: scores,
      };
      const newEntry = new FeedbackEntry(data4);
      feedbackEntries.push(newEntry);
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor()).toEqual(6);
    });
  });

  describe('getArtworkEffectiveScoreFor', () => {
    let feedbackEntries;

    beforeEach(() => {
      feedbackEntries = [
        new FeedbackEntry(data1),
        new FeedbackEntry(data2),
        new FeedbackEntry(data3),
      ];
    });

    it('should get overall effective score for output', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getOverallEffectiveScoreFor('output')).toEqual(5);
    });

    it('should get overall effective score for output where version is 1.0 (14) and ethnicity is white, indoor', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(
        feedbackForm.getOverallEffectiveScoreFor('output', {
          version: '1.0 (14)',
          ethnicity: 'white',
        })
      ).toEqual(4);
    });
  });

  describe('getArtworkInteractvieEffectiveScoreFor', () => {
    let feedbackEntries;

    beforeEach(() => {
      const scores = [
        new EffectiveScore('', 'afl', true),
        new EffectiveScore('', 'output', true),
        new EffectiveScore('', 'pio', true),
      ];

      data4 = {
        version: '1.0 (14)',
        country: 'united states',
        gender: 'female',
        ethnicity: 'white',
        skintone: 'option 3',
        deviceCategory: 'low end',
        environment: 'indoor',
        effectiveScores: scores,
      };

      feedbackEntries = [
        new FeedbackEntry(data1),
        new FeedbackEntry(data2),
        new FeedbackEntry(data3),
        new FeedbackEntry(data4),
      ];
    });

    it('should get Overal Interactive effective score for output', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(feedbackForm.getArtworkInteractiveEffectiveScoreFor('output')).toEqual(5);
    });

    it('should get overall interactive effective score for output where version is 1.0 (14) and ethnicity is white, indoor', () => {
      const feedbackForm = new FeedbackForm(feedbackEntries);
      expect(
        feedbackForm.getOverallEffectiveScoreFor('output', {
          version: '1.0 (14)',
          ethnicity: 'white',
        })
      ).toEqual(4);
    });
  });
});
