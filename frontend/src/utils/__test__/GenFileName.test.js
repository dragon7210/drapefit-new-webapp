import { expect } from 'chai';

import GenFileName from 'utils/GenFileName';

describe('GenFileName', () => {
  it('should generate a filename with the given title and current date', () => {
    const title = 'test';
    const expectedFilename = `${title}_${new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14)}`;
    expect(GenFileName(title)).toEqual(expectedFilename);
  });
});
