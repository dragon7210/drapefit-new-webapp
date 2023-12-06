import { expect } from 'chai';

import MyEnvConfig from 'configs/MyEnvConfig';
import GenS3Link from 'utils/GenS3Link';

describe('GenS3Link', () => {
  it('should return a valid S3 link when given a valid path', () => {
    const path = 'test/path';
    const expectedLink = `https://${MyEnvConfig.aws.s3Bucket}.s3.${MyEnvConfig.aws.region}.amazonaws.com/${path}`;
    expect(GenS3Link(path)).toEqual(expectedLink);
  });

  it('should return a placeholder image link when an error is thrown', () => {
    const path = 'test/path';
    const expectedLink = 'https://via.placeholder.com/518';
    jest.spyOn(MyEnvConfig, 'aws').mockImplementation(() => {
      throw new Error('Error');
    });
    expect(GenS3Link(path)).toEqual(expectedLink);
  });
});
