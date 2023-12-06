/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import PaymentGetway from '../../models/admin/paymentGetway.js';
import { Op } from 'sequelize';
import KidsDetail from '../../models/client/kidsDetail.js';
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';

const getCustomPaidList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: {
        status: 1,
        payment_type: 1,
        work_status: { [Op.or]: [0, 1] }
      },
      include: [User, KidsDetail]
    });
    console.log('API_getCustomPaidList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getCustomPaidList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPreviewWorkList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: {
        status: 1,
        payment_type: 1,
        work_status: 2
      },
      include: [{ model: User, include: { model: UserDetail } }, KidsDetail]
    });
    console.log('API_getPreviewWorkList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPreviewWorkList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getCustomPaidList, getPreviewWorkList };
