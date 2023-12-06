/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import OfferPromocode from '../../models/admin/offerPromocode.js';

const getOfferPromocode = asyncHandler(async (req, res) => {
  try {
    let data = await OfferPromocode.findAll();
    console.log('getOfferPromocode_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getOfferPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addOfferPromocode = asyncHandler(async (req, res) => {
  try {
    let { code, minimum_purchase, price, comments, expiry_date, created_dt } = req.body;
    await OfferPromocode.create({ code, price, minimum_purchase, comments, expiry_date, created_dt, is_active: 1 });
    console.log('addOfferPromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('addOfferPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delOfferPromocode = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await OfferPromocode.destroy({ where: { id } });
    console.log('delOfferPromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('delOfferPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateOfferPromocode = asyncHandler(async (req, res) => {
  try {
    let { code, minimum_purchase, price, comments, expiry_date, created_dt, id } = req.body;
    await OfferPromocode.update(
      { code, minimum_purchase, price, comments, expiry_date, created_dt },
      { where: { id } }
    );
    console.log('uupdateOfferPromocode_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('uupdateOfferPromocode_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getOfferPromocode, addOfferPromocode, delOfferPromocode, updateOfferPromocode };
