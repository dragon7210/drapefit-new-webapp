/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { PutBucketCorsCommand } from '@aws-sdk/client-s3';

import { s3Client } from './s3Client.js';

const addS3BucketCorsRules = async (bucket) => {
  try {
    const command = new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'PUT', 'HEAD'],
            AllowedOrigins: [
              `http://localhost:${process.env.PORT}`,
              `http://localhost:${process.env.PORT_REACT}`,
              `http://${process.env.SERVER_IP}`,
              `https://${process.env.SERVER_IP}`,
              `http://${process.env.SERVER_DOMAIN}`,
              `https://${process.env.SERVER_DOMAIN}`
            ],
            ExposeHeaders: ['ETag', 'Access-Control-Allow-Origin'],
            MaxAgeSeconds: 3600
          }
        ]
      }
    });
    await s3Client.send(command);
    return true;
  } catch (e) {
    console.log('LIB_addS3BucketCorsRules_ERROR:', e?.message);
    return false;
  }
};

export { addS3BucketCorsRules };
