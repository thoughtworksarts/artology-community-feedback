/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import * as index from '../helpers/multipleSelection';
import { formData } from './test_data';
import EffectiveScore from '../components/EffectveScore';

describe('App', () => {
  it('handleMultipleSelection should return a FeedbackEntry for each ethnicity option selected', () => {
    const effectiveScores = [
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('2', 'output', true),
      new EffectiveScore('2', 'afl', false),
      new EffectiveScore('5', 'afl', true),
      new EffectiveScore('4', 'pio', false),
      new EffectiveScore('2', 'general', false),
      new EffectiveScore('3', 'output', false),
      new EffectiveScore('2', 'pio', false),
    ];

    const data = {
      appVersion: '1.0 (14)',
      userCountry: 'United States',
      usergender: 'Male',
      userEthnicitys: ['African American/Black', 'White', 'Asian'],
      userage:35,
      userSkintones: ['Option 1', 'Option 2'],
      userDeviceCategory: 'Android',
      userEnvironment: 'Indoor low light',
      effectiveScores: effectiveScores,
    };

    const formEntries = index.handleMultipleSections(data, formData, 0);

    expect(formEntries.length).toEqual(3);
    expect(formEntries[0].ethnicity).toEqual('African American/Black');
    expect(formEntries[0].skintone).toEqual('Option 1');
    expect(formEntries[1].ethnicity).toEqual('White');
    expect(formEntries[1].skintone).toEqual('Option 2');
    expect(formEntries[2].ethnicity).toEqual('Asian');
    expect(formEntries[2].skintone).toEqual('Option 1');
  });
});
