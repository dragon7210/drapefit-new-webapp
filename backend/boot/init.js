/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import Stripe from 'stripe';

import User, { HashPassword } from '../models/admin/user.js';
import { genUsername } from '../utils/helper.js';
import { checkS3Bucket } from '../libs/checkS3Bucket.js';
import { createS3Bucket } from '../libs/createS3Bucket.js';
import { addS3BucketCorsRules } from '../libs/addS3BucketCorsRules.js';
import { addS3BucketPolicyPublic } from '../libs/addS3BucketPolicyPublic.js';
import bcrypt from 'bcryptjs';

const initMainDB = async () => {
  try {
    //-- CREATE [Super Admin] ACCOUNT
    const email = process.env.SUPER_ADMIN_EMAIL;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      await User.create({
        name: genUsername('Secret', 'Guard'),
        email,
        password: HashPassword(process.env.SUPER_ADMIN_INITPWD),
        role: 100
      });
    } else {
      console.log('BOOT_initMainDB:', 'Yup, super admin already exists');
      return true;
    }
  } catch (err) {
    console.log('BOOT_initMainDB_ERROR:', err?.message);
    return false;
  }
};

const initS3 = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const bucket = process.env.S3_BUCKET_NAME;
      if ((await checkS3Bucket(bucket)) !== true) {
        if ((await createS3Bucket(bucket)) !== true) {
          console.log('BOOT_initS3_ERROR:', 'Failed to Create S3 Bucket');
          return false;
        }
      }
      if ((await addS3BucketCorsRules(bucket)) !== true) {
        console.log('BOOT_initS3_ERROR:', 'Failed to Add CORS rules to S3 Bucket');
        return false;
      }
      if ((await addS3BucketPolicyPublic(bucket)) !== true) {
        console.log('BOOT_initS3_ERROR:', 'Failed to Add Public Policy to S3 Bucket');
        return false;
      }
      console.log('BOOT_initS3:', 'S3 Bucket is configured');
    } else {
      console.log('BOOT_initS3:', 'No need to configure S3 Bucket in development mode');
    }
    return true;
  } catch (err) {
    console.log('BOOT_initS3_ERROR:', err?.message);
    return false;
  }
};

export { initMainDB, initS3 };
