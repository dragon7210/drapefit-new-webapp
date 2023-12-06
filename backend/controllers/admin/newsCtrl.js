/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import News from '../../models/admin/new.js';

import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../libs/s3Client.js';
import path from 'path';

const __dirname = path.resolve();
const bucket = process.env.S3_BUCKET_NAME;

const getNews = asyncHandler(async (req, res) => {
  try {
    let data = await News.findAll();
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNews_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addNews = asyncHandler(async (req, res) => {
  try {
    let { news_name, news_link, post_by, news_image } = req.body;
    let reqImgUrl = news_image;
    if (news_image) {
      if (!news_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${news_image}`)) {
          return res.status(400).json({
            msg: 'Author image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${news_image}`);
          const key = `supplier/supproducts/${news_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          news_image = s3Url;
        }
      }
    }
    await News.create({ news_name, news_link, post_by, news_image, is_active: 1 });
    if (reqImgUrl) {
      if (!reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addNews_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delNews = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await News.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addNews_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateNews = asyncHandler(async (req, res) => {
  try {
    let { id, news_name, news_link, post_by, news_image } = req.body;
    let reqImgUrl = news_image;
    if (news_image) {
      if (!news_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${news_image}`)) {
          return res.status(400).json({
            msg: 'News image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${news_image}`);
          const key = `supplier/supproducts/${news_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          news_image = s3Url;
        }
      }
    }
    await News.update({ news_name, news_link, post_by, news_image }, { where: { id } });
    if (reqImgUrl) {
      if (!reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addNews_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getNews, addNews, delNews, updateNews };
