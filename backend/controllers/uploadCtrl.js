/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import path from 'path';
import { readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3Client } from '../libs/s3Client.js';
import { checkS3Bucket } from '../libs/checkS3Bucket.js';
import { createS3Bucket } from '../libs/createS3Bucket.js';

const __dirname = path.resolve();

const uploadTempImage = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    //-- but seems to be useless here
    const imgName = req.file.filename;
    const arg = req.params.arg;
    console.log('API_uploadTempImage_200:', 'Image has been uploaded temporarily');
    res.status(200).send({
      imgName,
      arg
    });
  } catch (e) {
    console.log('API_uploadTempImage_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const testUploadImg2S3 = asyncHandler(async (req, res) => {
  try {
    const { imgName, isRemoveFile } = req.body;
    const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    const fileContent = readFileSync(`${destPath}${imgName}`);
    //-- init S3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    if ((await checkS3Bucket(bucket)) !== true) {
      if ((await createS3Bucket(bucket)) !== true) {
        console.log('API_testUploadImg2S3_400:', 'Failed to Create S3 Bucket');
        return res.status(400).json({
          msg: 'Failed to Create S3 Bucket'
        });
      }
    }
    //-- upload to s3 bucket
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: imgName,
      Body: fileContent
    });
    const response = await s3Client.send(command);
    console.log('API_testUploadImg2S3:', response);
    const objectUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imgName}`;
    if (isRemoveFile === true) {
      unlinkSync(`${destPath}${imgName}`);
    }
    //-- okay
    console.log('API_testUploadImg2S3_200:', objectUrl);
    res.status(200).send(objectUrl);
  } catch (e) {
    console.log('API_testUploadImg2S3_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { uploadTempImage, testUploadImg2S3 };
