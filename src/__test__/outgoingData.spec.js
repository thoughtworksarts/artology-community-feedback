/* eslint-disable no-undef */
import EffectiveScore from '../components/EffectveScore';
import FeedbackEntry from '../components/FeedbackEntry';
import FeedbackForm from '../components/FeedbackForm';
import { artworks, categories, environments } from '../config';
import * as convertData from '../dataPorcessors/outgoingData';

describe('generateEffectScorePerReleaseData', () => {
  it('should return an object with overall/indoor/outdoor/other effetive scores for each release version', () => {
    const releaseVersions = ['1.0 (13)', '1.0 (14)'];
    const category = 'environment';
    const scores1 = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('3', 'output', false),
      new EffectiveScore('4', 'sp', false),
    ];

    const scores2 = [
      new EffectiveScore('10', 'afl', true),
      new EffectiveScore('13', 'output', false),
      new EffectiveScore('1', 'sp', false),
    ];

    const object1 = {
      version: '1.0 (14)',
      country: 'canada',
      gender: 'male',
      ethnicity: 'asian',
      skintone: 'option 1',
      deviceCategory: 'low end',
      environment: 'indoor',
      effectiveScores: scores1,
    };

    const object2 = {
      version: '1.0 (14)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const object3 = {
      version: '1.0 (13)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const feedbackEntries = [
      new FeedbackEntry(object1),
      new FeedbackEntry(object2),
      new FeedbackEntry(object3),
    ];
    const feedbackForm = new FeedbackForm(feedbackEntries);
    expect(
      convertData.generateEffectScorePerReleaseData(
        feedbackForm,
        releaseVersions,
        environments,
        category
      )
    ).toEqual({
      '1.0 (13)': {
        overall: 8,
        indoor: 0,
        outdoor: 8,
        other: 0,
      },
      '1.0 (14)': {
        overall: 6,
        indoor: 4,
        outdoor: 8,
        other: 0,
      },
    });
  });
});

describe('generateScoresForCategory', () => {
  describe('given gender as the category and a list of all artworks', () => {
    const category = 'gender';
    const properties = ['male', 'female', 'non-binary', 'other', ''];
    const releaseVersions = ['1.0 (14)'];

    it('should generate an object with effective scores for each gender per artowrk', () => {
      const scores1 = [
        new EffectiveScore('5', 'afl', true),
        new EffectiveScore('3', 'output', false),
        new EffectiveScore('4', 'sp', false),
      ];

      const scores2 = [
        new EffectiveScore('10', 'afl', true),
        new EffectiveScore('13', 'output', false),
        new EffectiveScore('1', 'sp', false),
      ];

      const object1 = {
        version: '1.0 (14)',
        country: 'canada',
        gender: 'male',
        ethnicity: 'asian',
        skintone: 'option 1',
        deviceCategory: 'low end',
        environment: 'indoor',
        effectiveScores: scores1,
      };

      const object2 = {
        version: '1.0 (14)',
        country: 'france',
        gender: 'female',
        ethnicity: 'none',
        skintone: 'option 3',
        deviceCategory: 'high end',
        environment: 'outdoor',
        effectiveScores: scores2,
      };

      const object3 = {
        version: '1.0 (13)',
        country: 'france',
        gender: 'female',
        ethnicity: 'none',
        skintone: 'option 3',
        deviceCategory: 'high end',
        environment: 'outdoor',
        effectiveScores: scores2,
      };

      const feedbackEntries = [
        new FeedbackEntry(object1),
        new FeedbackEntry(object2),
        new FeedbackEntry(object3),
      ];
      const feedbackForm = new FeedbackForm(feedbackEntries);

      expect(
        convertData.generateScoresForCategory(
          category,
          properties,
          releaseVersions,
          Object.keys(artworks),
          feedbackForm
        )
      ).toEqual({
        '1.0 (14)': {
          afl: {
            gender: {
              male: 5,
              female: 10,
              'non-binary': 0,
              other: 0,
              '': 0,
            },
          },
          output: {
            gender: {
              male: 3,
              female: 13,
              'non-binary': 0,
              other: 0,
              '': 0,
            },
          },
        },
      });
    });
  });
});

describe('generateArtworkEffectiveScores', () => {
  it('should get the overall effective score for each artwork', () => {
    const releaseVersion = '1.0 (14)';
    const scores1 = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('3', 'output', false),
      new EffectiveScore('4', 'sp', false),
    ];

    const scores2 = [
      new EffectiveScore('10', 'afl', true),
      new EffectiveScore('13', 'output', false),
      new EffectiveScore('1', 'sp', false),
    ];

    const object1 = {
      version: '1.0 (14)',
      country: 'canada',
      gender: 'male',
      ethnicity: 'asian',
      skintone: 'option 1',
      deviceCategory: 'low end',
      environment: 'indoor',
      effectiveScores: scores1,
    };

    const object2 = {
      version: '1.0 (14)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const object3 = {
      version: '1.0 (13)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const feedbackEntries = [
      new FeedbackEntry(object1),
      new FeedbackEntry(object2),
      new FeedbackEntry(object3),
    ];
    const feedbackForm = new FeedbackForm(feedbackEntries);
    expect(
      convertData.generateArtworkEffectiveScores(
        Object.keys(artworks),
        releaseVersion,
        feedbackForm
      )
    ).toEqual({
      afl: 7.5,
      output: 8,
    });
  });

  it('should get the overall interactive effective score for each artwork', () => {
    const releaseVersion = '1.0 (14)';
    const scores1 = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('3', 'output', false),
      new EffectiveScore('4', 'sp', false),
    ];

    const scores2 = [
      new EffectiveScore('10', 'afl', true),
      new EffectiveScore('13', 'output', false),
      new EffectiveScore('1', 'sp', false),
    ];

    const object1 = {
      version: '1.0 (14)',
      country: 'canada',
      gender: 'male',
      ethnicity: 'asian',
      skintone: 'option 1',
      deviceCategory: 'low end',
      environment: 'indoor',
      effectiveScores: scores1,
    };

    const object2 = {
      version: '1.0 (14)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const object3 = {
      version: '1.0 (13)',
      country: 'france',
      gender: 'female',
      ethnicity: 'none',
      skintone: 'option 3',
      deviceCategory: 'high end',
      environment: 'outdoor',
      effectiveScores: scores2,
    };

    const feedbackEntries = [
      new FeedbackEntry(object1),
      new FeedbackEntry(object2),
      new FeedbackEntry(object3),
    ];
    const feedbackForm = new FeedbackForm(feedbackEntries);
    expect(
      convertData.generateArtworkEffectiveScores(
        Object.keys(artworks),
        releaseVersion,
        feedbackForm,
        true
      )
    ).toEqual({
      afl: 7.5,
      output: 0,
    });
  });
});
