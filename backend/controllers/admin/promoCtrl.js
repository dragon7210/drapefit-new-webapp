/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Promocode from '../../models/admin/promocode.js';

const getPromocode = asyncHandler(async (req, res) => {
  try {
    let data = await Promocode.findAll();
    console.log('getPromocode_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addPromocode = asyncHandler(async (req, res) => {
  try {
    let { promocode, price, comments, expiry_date, created_dt } = req.body;
    await Promocode.create({ promocode, price, comments, expiry_date, created_dt, is_active: 1 });
    console.log('addPromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('addPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delPromocode = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await Promocode.destroy({ where: { id } });
    console.log('addPromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('addPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updatePromocode = asyncHandler(async (req, res) => {
  try {
    let { promocode, price, comments, expiry_date, created_dt, id } = req.body;
    await Promocode.update({ promocode, price, comments, expiry_date, created_dt }, { where: { id } });
    console.log('updatePromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('updatePromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getPromocode, addPromocode, delPromocode, updatePromocode };
