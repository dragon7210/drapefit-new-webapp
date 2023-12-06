import { expect } from 'chai';

import AddZeroPrefix from 'utils/AddZeroPrefix';

describe('AddZeroPrefix', () => {
  it('should return a string with a 0 prefix if the parameter is less than 10', () => {
    const result = AddZeroPrefix(5);
    expect(result).to.equal('05');
  });

  it('should return a string without a 0 prefix if the parameter is greater than or equal to 10', () => {
    const result = AddZeroPrefix(10);
    expect(result).to.equal('10');
  });

  it('should return an empty string if an error occurs', () => {
    const result = AddZeroPrefix('test');
    expect(result).to.equal('');
  });
});
