/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Giftcard from '../../models/admin/giftcard.js';

const getGiftcard = asyncHandler(async (req, res) => {
  try {
    let data = await Giftcard.findAll({ where: { type: 4 } });
    console.log('getGiftcard_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getGiftcard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addGiftcard = asyncHandler(async (req, res) => {
  try {
    let { giftcode, price, comments, expiry_date, created_dt } = req.body;
    await Giftcard.create({
      giftcode,
      price,
      comments,
      expiry_date,
      created_dt,
      type: 4,
      is_active: 1
    });
    console.log('addGiftcard_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('addGiftcard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delGiftcard = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await Giftcard.remove({ id: id });
    console.log('addGiftcard_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('addGiftcard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateGiftcard = asyncHandler(async (req, res) => {
  try {
    let { giftcode, price, comments, expiry_date, created_dt, id } = req.body;
    await Giftcard.findOneAndUpdate({ id }, { giftcode, price, comments, expiry_date, created_dt });
    console.log('updateGiftcard_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('updateGiftcard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const activeGiftcard = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let data = await Giftcard.findOne({ id });
    if (data.is_active === 1) {
      data.is_active = 0;
    } else {
      data.is_active = 1;
    }
    await data.save();
    console.log('activeGiftcard_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('activeGiftcard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getGiftcardEmail = asyncHandler(async (req, res) => {
  try {
    let data = await Giftcard.findAll({ where: { type: 1 } });
    console.log('getGiftcardEmail_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getGiftcardEmail_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getGiftcardMail = asyncHandler(async (req, res) => {
  try {
    let data = await Giftcard.findAll({ where: { type: 2 } });
    console.log('getGiftcardMail_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getGiftcardMail_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getGiftcardPrint = asyncHandler(async (req, res) => {
  try {
    let data = await Giftcard.findAll({ where: { type: 3 } });
    console.log('getGiftcardPrint_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getGiftcardPrint_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getGiftcard,
  addGiftcard,
  delGiftcard,
  updateGiftcard,
  activeGiftcard,
  getGiftcardEmail,
  getGiftcardMail,
  getGiftcardPrint
};
