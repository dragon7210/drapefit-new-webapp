/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import BlogCategory from '../../models/admin/blogCategory.js';
import Blog from '../../models/admin/blog.js';
import BlogTag from '../../models/admin/blogTag.js';
import { sequelize } from '../../config/db.js';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../libs/s3Client.js';
import path from 'path';

const __dirname = path.resolve();
const bucket = process.env.S3_BUCKET_NAME;

const getBlogCategory = asyncHandler(async (req, res) => {
  try {
    let data = await BlogCategory.findAll();
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getBlogCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addBlogCategory = asyncHandler(async (req, res) => {
  try {
    let { category_name } = req.body;
    await BlogCategory.create({ category_name, is_active: 1 });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlogCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delBlogCategory = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await BlogCategory.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_delBlogCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
  try {
    let { id, category_name } = req.body;
    await BlogCategory.update({ category_name }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateBlogCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBlog = asyncHandler(async (req, res) => {
  try {
    let data = await Blog.findAll({ include: BlogCategory });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getBlog_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addBlog = asyncHandler(async (req, res) => {
  try {
    let { auther_image, auther_name, author_description, blog_category_id, blog_title, blog_image, blog_description } =
      req.body;

    const reqImgUrl1 = auther_image;
    const reqImgUrl2 = blog_image;
    if (auther_image) {
      if (!auther_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${auther_image}`)) {
          return res.status(400).json({
            msg: 'Author image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${auther_image}`);
          const key = `supplier/supproducts/${auther_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          auther_image = s3Url;
        }
      }
    }
    if (blog_image) {
      if (!blog_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${blog_image}`)) {
          return res.status(400).json({
            msg: 'Author image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${blog_image}`);
          const key = `supplier/supproducts/${blog_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          blog_image = s3Url;
        }
      }
    }
    await Blog.create({
      auther_image,
      blog_image,
      auther_name,
      author_description,
      blog_category_id,
      blog_title
    });
    if (reqImgUrl1) {
      if (!reqImgUrl1.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl1}`);
      }
    }
    if (reqImgUrl2) {
      if (!reqImgUrl2.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl2}`);
      }
    }
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlog_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delBlog = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await Blog.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlog_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    let {
      id,
      auther_image,
      auther_name,
      author_description,
      blog_category_id,
      blog_title,
      blog_image,
      blog_description
    } = req.body;
    const reqImgUrl1 = auther_image;
    const reqImgUrl2 = blog_image;
    if (auther_image) {
      if (!auther_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${auther_image}`)) {
          return res.status(400).json({
            msg: 'Author image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${auther_image}`);
          const key = `supplier/supproducts/${auther_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          auther_image = s3Url;
        }
      }
    }
    if (blog_image) {
      if (!blog_image.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${blog_image}`)) {
          return res.status(400).json({
            msg: 'Author image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${blog_image}`);
          const key = `supplier/supproducts/${blog_image}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          blog_image = s3Url;
        }
      }
    }
    await Blog.update(
      { auther_image, auther_name, author_description, blog_category_id, blog_title, blog_image, blog_description },
      { where: { id } }
    );
    if (reqImgUrl1) {
      if (!reqImgUrl1.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl1}`);
      }
    }
    if (reqImgUrl2) {
      if (!reqImgUrl2.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl2}`);
      }
    }
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlog_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBlogTag = asyncHandler(async (req, res) => {
  try {
    let data = await BlogTag.findAll({ include: Blog });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getBlogTag_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addBlogTag = asyncHandler(async (req, res) => {
  try {
    let { tag_name, blog_id } = req.body;
    await BlogTag.create({ tag_name, blog_id });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlogTag_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delBlogTag = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await BlogTag.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlogTag_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateBlogTag = asyncHandler(async (req, res) => {
  try {
    let { id, tag_name, blog_id } = req.body;
    await BlogTag.update({ tag_name, blog_id }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addBlogTag_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getBlogCategory,
  addBlogCategory,
  delBlogCategory,
  updateBlogCategory,
  getBlog,
  addBlog,
  delBlog,
  updateBlog,
  getBlogTag,
  addBlogTag,
  delBlogTag,
  updateBlogTag
};
