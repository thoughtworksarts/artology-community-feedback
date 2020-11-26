/* eslint-disable no-undef */
import * as utility from '../utility';

describe('utility', () => {
  it('handleMultipleSelections should return a single selection for each option selected', () => {
    const selections = utility.handleMultipleSelections('Asian, White, Black');
    expect(selections.length).toEqual(3);
    expect(selections[0]).toEqual('Asian');
    expect(selections[1]).toEqual('White');
    expect(selections[2]).toEqual('Black');
  });

  it('moduloWhenOdd should ruturn a modulo when first number is odd and greater than second', () => {
    expect(utility.moduloWhenOdd(5, 3)).toEqual(2);
    expect(utility.moduloWhenOdd(6, 3)).toEqual(0);
    expect(utility.moduloWhenOdd(1, 3)).toEqual(1);
  });

  it('moduloWhenOdd should ruturn a modulo when first number is odd and greater than second', () => {
    expect(utility.moduloWhenOdd(5, 3)).toEqual(2);
    expect(utility.moduloWhenOdd(6, 3)).toEqual(0);
    expect(utility.moduloWhenOdd(1, 3)).toEqual(1);
  });
});
