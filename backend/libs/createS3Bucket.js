/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { CreateBucketCommand } from '@aws-sdk/client-s3';

import { s3Client } from './s3Client.js';

const createS3Bucket = async (bucket) => {
  try {
    const command = new CreateBucketCommand({
      Bucket: bucket
    });
    const { Location } = await s3Client.send(command);
    console.log('LIB_createS3Bucket:', Location);
    return true;
  } catch (e) {
    console.log('LIB_createS3Bucket_ERROR:', e?.message);
    return false;
  }
};

export { createS3Bucket };
