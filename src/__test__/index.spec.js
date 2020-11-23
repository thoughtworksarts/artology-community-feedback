/* eslint-disable no-undef */
import App from '../index';

describe('App', () => {
  jest.mock('../../src/spreadSheet');

  it('should', () => {
    App();
  });
});
