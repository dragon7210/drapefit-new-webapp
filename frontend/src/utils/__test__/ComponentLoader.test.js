import { expect } from 'chai';

import ComponentLoader from 'utils/ComponentLoader';

describe('ComponentLoader', () => {
  it('should return a promise', () => {
    const lazyComponent = jest.fn();
    expect(ComponentLoader(lazyComponent)).toBeInstanceOf(Promise);
  });

  it('should reject if attemptsLeft is 1', () => {
    const lazyComponent = jest.fn().mockRejectedValue('error');
    const attemptsLeft = 1;
    const interval = 1000;
    expect(ComponentLoader(lazyComponent, attemptsLeft, interval)).rejects.toEqual('error');
  });

  it('should resolve if attemptsLeft is greater than 1', () => {
    const lazyComponent = jest.fn().mockResolvedValue('resolved');
    const attemptsLeft = 2;
    const interval = 1000;
    expect(ComponentLoader(lazyComponent, attemptsLeft, interval)).resolves.toEqual('resolved');
  });
});
