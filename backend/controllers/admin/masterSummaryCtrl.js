/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import InvProduct from '../../models/inventory/product.js';
import InvUser from '../../models/inventory/user.js';
import { Op } from 'sequelize';
import Product from '../../models/admin/product.js';
import PaymentGetway from '../../models/admin/paymentGetway.js';
import KidsDetail from '../../models/client/kidsDetail.js';
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';

const getFinalizedSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          }
        }
      ]
    });
    console.log('API_getFinalizedSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getFinalizedSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getFinalizedDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } }
    });
    console.log('API_getFinalizedDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getFinalizedDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckoutSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              checkedout: 'Y'
            }
          }
        }
      ]
    });
    console.log('API_getCheckoutSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getCheckoutSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckoutDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: { model: Product, where: { checkedout: 'Y' } }
    });
    console.log('API_getCheckoutDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getCheckoutDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotCheckoutSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              checkedout: 'Y',
              store_return_status: { [Op.notIn]: ['Y'] },
              keep_status: { [Op.notIn]: [3, 2] }
            }
          }
        }
      ]
    });
    console.log('API_getNotCheckoutSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotCheckoutSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotCheckoutDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { checkedout: 'Y', store_return_status: { [Op.notIn]: ['Y'] }, keep_status: { [Op.notIn]: [3, 2] } }
      }
    });
    console.log('API_getNotCheckoutDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotCheckoutDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotReturnDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { store_return_status: { [Op.notIn]: ['Y'] }, keep_status: { [Op.notIn]: [3, 2] } }
      }
    });
    console.log('API_getNotReturnDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotReturnDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getDeclineDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { is_payment_fail: 1 }
      }
    });
    console.log('API_getDeclineDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getDeclineDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getExchangeDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { is_complete_by_admin: { [Op.notIn]: [1] }, keep_status: 2 }
      }
    });
    console.log('API_getExchangeDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getExchangeDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getReturnProcessDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { is_complete: 'Y', keep_status: { [Op.or]: [1, 2] } }
      }
    });
    console.log('API_getReturnProcessDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getReturnProcessDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotRtExDetailReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvProduct.findAll({
      where: { profile_type: profile, created: { [Op.between]: [startDate, endDate] } },
      include: {
        model: Product,
        where: { is_complete_by_admin: 1, keep_status: 2 }
      }
    });
    console.log('API_getNotRtExDetailReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotRtExDetailReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getExchangeSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: { is_complete_by_admin: { [Op.notIn]: [1] }, keep_status: 2 }
          }
        }
      ]
    });
    console.log('API_getExchangeSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getExchangeSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getDeclineSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              is_payment_fail: 1
            }
          }
        }
      ]
    });
    console.log('API_getDeclineSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getDeclineSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotReturnSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              store_return_status: { [Op.notIn]: ['Y'] },
              keep_status: { [Op.notIn]: [3, 2] }
            }
          }
        }
      ]
    });
    console.log('API_getNotReturnSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotReturnSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotRtExSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              is_complete_by_admin: 1,
              keep_status: 2
            }
          }
        }
      ]
    });
    console.log('API_getNotRtExSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotRtExSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getReturnProcessSummaryReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;
    const data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            profile_type: profile,
            created: { [Op.between]: [startDate, endDate] }
          },
          include: {
            model: Product,
            where: {
              is_complete: 1,
              keep_status: { [Op.or]: [1, 2] }
            }
          }
        }
      ]
    });
    console.log('API_getReturnProcessSummaryReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getReturnProcessSummaryReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getStylingFeeReport = asyncHandler(async (req, res) => {
  try {
    let { profile, startDate, endDate } = req.body;

    const data = await InvProduct.findAll({
      where: {
        profile_type: profile,
        created: { [Op.between]: [startDate, endDate] }
      },
      include: [{ model: Product, include: [User, KidsDetail, PaymentGetway] }]
    });
    console.log('API_getStylingFeeReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getStylingFeeReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getChangeAutoCheckout = asyncHandler(async (req, res) => {
  try {
    const data = await Product.findAll({
      include: [{ model: User, include: { model: UserDetail } }, PaymentGetway, KidsDetail],
      group: ['payment_id', 'auto_checkout_date']
    });
    console.log('API_getChangeAutoCheckout_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getChangeAutoCheckout_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateChangeAutoCheckout = asyncHandler(async (req, res) => {
  try {
    let { payment_id, auto_checkout_date } = req.body;
    let data = await Product.findAll({
      where: { payment_id }
    });
    data.map(async (item) => {
      item.auto_checkout_date = auto_checkout_date;
      await item.save();
    });
    console.log('API_updateChangeAutoCheckout_200');
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateChangeAutoCheckout_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getFinalizedSummaryReport,
  getFinalizedDetailReport,
  getCheckoutSummaryReport,
  getCheckoutDetailReport,
  getNotCheckoutSummaryReport,
  getNotCheckoutDetailReport,
  getDeclineDetailReport,
  getExchangeDetailReport,
  getNotReturnDetailReport,
  getReturnProcessDetailReport,
  getNotRtExDetailReport,
  getExchangeSummaryReport,
  getDeclineSummaryReport,
  getNotReturnSummaryReport,
  getNotRtExSummaryReport,
  getReturnProcessSummaryReport,
  getStylingFeeReport,
  getChangeAutoCheckout,
  updateChangeAutoCheckout
};
