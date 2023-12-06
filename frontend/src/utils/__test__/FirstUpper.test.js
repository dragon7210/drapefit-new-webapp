import { expect } from 'chai';

import FirstUpper from 'utils/FirstUpper';

describe('FirstUpper', () => {
  it('should return the word with the first letter capitalized', () => {
    const result = FirstUpper('word');
    expect(result).to.equal('Word');
  });

  it('should return an empty string if an error is thrown', () => {
    const result = FirstUpper();
    expect(result).to.equal('');
  });
});
