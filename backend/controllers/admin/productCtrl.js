/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Product from '../../models/admin/product.js';
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';
import KidsDetail from '../../models/client/kidsDetail.js';
import PaymentGetway from '../../models/admin/paymentGetway.js';
import DeliverDate from '../../models/admin/deliverDate.js';

const getExchangeProduct = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: 2, is_complete_by_admin: 0 },
      include: [
        { model: User, include: { model: UserDetail } },
        { model: PaymentGetway, include: { model: DeliverDate } },
        KidsDetail
      ]
    });
    console.log('getExchangeProduct_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getExchangeProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getDeclineProduct = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { is_payment_fail: 1 },
      include: [
        { model: User, include: { model: UserDetail } },
        { model: PaymentGetway, include: { model: DeliverDate } },
        KidsDetail
      ]
    });
    console.log('getDeclineProduct_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getDeclineProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const scanProduct = asyncHandler(async (req, res) => {
  try {
    let barcode_value = req.body.product;
    let data = await Product.findAll({ where: { barcode_value, is_complete_by_admin: 0 }, include: User });
    console.log('scanProduct_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('scanProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changeScanProduct = asyncHandler(async (req, res) => {
  try {
    let { keep_status, id } = req.body;
    await Product.update({ keep_status, is_complete_by_admin: 1 }, { where: { id } });
    console.log('changeScanProduct_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('changeScanProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getDefaultCustomer = asyncHandler(async (req, res) => {
  try {
    let data = await PaymentGetway.findAll({
      where: { auto_checkout: 0, payment_type: 1, mail_status: 1, work_status: 1, status: 1 },
      include: User
    });
    console.log('getDefaultCustomer_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('getDefaultCustomer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getExchangeProduct, getDeclineProduct, scanProduct, changeScanProduct, getDefaultCustomer };
