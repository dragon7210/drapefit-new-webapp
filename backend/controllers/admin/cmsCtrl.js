/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Page from '../../models/admin/page.js';

const getCMS = asyncHandler(async (req, res) => {
  try {
    const data = await Page.findAll();
    console.log('API_getCMS_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getCMS_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateCMS = asyncHandler(async (req, res) => {
  try {
    let { id, ...rest } = req.body;
    await Page.update({ ...rest }, { where: { id } });
    console.log('API_updateCMS_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateCMS_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getCMS, updateCMS };
