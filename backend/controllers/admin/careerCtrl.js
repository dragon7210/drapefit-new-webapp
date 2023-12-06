/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Career from '../../models/admin/career.js';

const getCareer = asyncHandler(async (req, res) => {
  try {
    let data = await Career.findAll();
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getCareer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addCareer = asyncHandler(async (req, res) => {
  try {
    let { discipline, school, about_this_job, degree } = req.body;
    await Career.create({ discipline, school, about_this_job, degree });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addCareer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delCareer = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await Career.destory({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addCareer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateCareer = asyncHandler(async (req, res) => {
  try {
    let { id, discipline, school, about_this_job, degree } = req.body;
    await Career.update({ discipline, school, about_this_job, degree }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_addCareer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getCareer, addCareer, delCareer, updateCareer };
