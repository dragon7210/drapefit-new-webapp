/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import SocialMedia from '../../models/admin/socialMedia.js';

const getSocialMedia = asyncHandler(async (req, res) => {
  try {
    let data = await SocialMedia.findAll();
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getSocialMedia_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addSocialMedia = asyncHandler(async (req, res) => {
  try {
    let { name, vector, link } = req.body;
    await SocialMedia.create({ name, vector, link, is_active: 1 });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addSocialMedia_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delSocialMedia = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await SocialMedia.destory({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_delSocialMedia_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const activeSocialMedia = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let data = await SocialMedia.findByPk(id);
    if (data.is_active === 1) {
      data.is_active = 0;
    } else {
      data.is_active = 1;
    }
    await data.save();
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_activeSocialMedia_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSocialMedia = asyncHandler(async (req, res) => {
  try {
    let { id, name, vector, link } = req.body;
    await SocialMedia.update({ name, vector, link }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_editSocialMedia_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getSocialMedia, addSocialMedia, delSocialMedia, activeSocialMedia, editSocialMedia };
