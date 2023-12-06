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
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';
import Product from '../../models/admin/product.js';
import KidsDetail from '../../models/client/kidsDetail.js';
import { Op } from 'sequelize';
import CustomerStylist from '../../models/admin/customerStylist.js';
import ShippingAddress from '../../models/admin/shippingAdress.js';
import BatchMailingReport from '../../models/admin/batchMailingReport.js';
import InvUser from '../../models/inventory/user.js';
import InvProduct from '../../models/inventory/product.js';
import InvColor from '../../models/inventory/color.js';

const getAutoList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: {
        is_parent_auto_checkout: 0,
        payment_type: 2,
        auto_checkout: '1'
      },
      include: [{ model: User, include: { model: UserDetail } }, KidsDetail]
    });
    console.log('API_getAutoList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getAutoList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getStyleList = asyncHandler(async (req, res) => {
  try {
    let data = await PaymentGetway.findAll({
      where: {
        payment_type: 1,
        status: 1,
        work_status: {
          [Op.or]: [1, 2]
        }
      },
      include: [{ model: User, include: { model: CustomerStylist, model: UserDetail } }, KidsDetail]
    });
    console.log('API_getStyleList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getStyleList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getStateList = asyncHandler(async (req, res) => {
  try {
    let data = await ShippingAddress.findAll({
      include: [{ model: User, include: { model: UserDetail } }, KidsDetail]
    });
    console.log('API_getStateList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getStateList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBatchProcessReport = asyncHandler(async (req, res) => {
  try {
    let data = await BatchMailingReport.findAll({ include: [User, KidsDetail] });
    console.log('API_getBatchProcessReport_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getBatchProcessReport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBatchProcessSubscription = asyncHandler(async (req, res) => {
  try {
    let data = await BatchMailingReport.findAll({
      where: {
        process: {
          [Op.or]: ['boxUpdate()', 'boxUpdateKid()']
        }
      },
      include: [User, KidsDetail]
    });
    console.log('API_getBatchProcessSubscription_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getBatchProcessSubscription_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getClientBirthday = asyncHandler(async (req, res) => {
  try {
    let data = await User.findAll({ where: { type: 2 }, include: [KidsDetail, UserDetail] });
    console.log('API_getClientBirthday_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotCheckedOutCustomer = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { checkedout: 'N' },
      include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }],
      group: 'payment_id'
    });
    console.log('API_getNotCheckedOutCustomer_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getReturnNotProcessed = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: { [Op.or]: [1, 2] }, store_return_status: { [Op.not]: ['Y'] } },
      include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }],
      group: 'payment_id'
    });
    console.log('API_getReturnNotProcessed_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckedOutProductDetail = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: { [Op.or]: [3] }, store_return_status: { [Op.not]: ['Y'] } },
      group: 'payment_id',
      include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getCheckedOutProductDetail_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProductAssingendButNotFinalized = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { is_finalize: { [Op.not]: [1] } },
      group: ['payment_id'],
      include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getProductAssingendButNotFinalized_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getListOfProductNotReturned = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: {
        where: { keep_status: { [Op.or]: [1, 2] }, store_return_status: { [Op.not]: ['Y'] } },
        group: 'payment_id',
        include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }]
      }
    });
    console.log('API_getListOfProductNotReturned_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlySale = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: 3, customer_purchase_status: 'Y' },
      group: 'payment_id',
      include: [PaymentGetway, KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlySale_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckedOutNotReturnDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvProduct.findAll({
      group: 'payment_id',
      include: {
        model: Product,
        where: {
          store_return_status: { [Op.not]: ['Y'] },
          checkedout: 'Y',
          keep_status: { [Op.not]: [2, 3] }
        }
      }
    });
    console.log('API_getCheckedOutNotReturnDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getTotalProductsInInventory = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: { match_status: 2, quantity: { [Op.gt]: [0] } },
        include: InvColor
      }
    });
    console.log('API_getTotalProductsInInventory_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProductFinalizeSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({ include: InvProduct });
    console.log('API_getProductFinalizeSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProductFinalizeDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvProduct.findAll({ where: { quantity: { [Op.gt]: [0] } } });
    console.log('API_getProductFinalizeDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProductDeclinedSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: {
          model: Product,
          where: {
            keep_status: 99
          }
        }
      }
    });
    console.log('API_getProductDeclinedSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProductDeclinedDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvProduct.findAll({
      group: 'payment_id',
      include: {
        model: Product,
        where: {
          keep_status: 99
        }
      }
    });
    console.log('API_getProductDeclinedDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotCheckedOutSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: { model: Product, where: { checkedout: { [Op.not]: ['Y'] } } }
      }
    });
    console.log('API_getNotCheckedOutSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotCheckedOutDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: { model: Product, where: { checkedout: { [Op.not]: ['Y'] } } }
      }
    });
    console.log('API_getNotCheckedOutDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlyclientConsumed = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: 3 },
      include: [KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlyclientConsumed_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlyRevenue = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: 3, customer_purchase_status: 'Y' },
      group: 'payment_id',
      include: [KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlyRevenue_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlyProductNotReturned = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: 1, return_inventory: 2 },
      include: [KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlyProductNotReturned_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlyProductDeclined = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { is_payment_fail: 1 },
      include: [KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlyProductDeclined_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMonthlyLoss = asyncHandler(async (req, res) => {
  try {
    let data = await Product.findAll({
      where: { keep_status: { [Op.or]: [1, 2] }, store_return_status: { [Op.not]: ['Y'] } },
      group: 'payment_id',
      include: [KidsDetail, { model: User, include: { model: UserDetail } }]
    });
    console.log('API_getMonthlyLoss_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getClientCheckedOutSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: { model: Product, where: { checkedout: 'Y' } }
      }
    });
    console.log('API_getClientCheckedOutSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getClientCheckedOutDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: { model: Product, where: { checkedout: 'Y' } }
      }
    });
    console.log('API_getClientCheckedOutDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckedOutReturnSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: {
          model: Product,
          where: {
            checkedout: 'Y'
          }
        }
      }
    });
    console.log('API_getCheckedOutReturnSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckedOutReturnDetails = asyncHandler(async (req, res) => {
  try {
    let data = await InvProduct.findAll({
      group: 'payment_id',
      include: {
        model: Product,
        where: {
          checkedout: 'Y'
        }
      }
    });
    console.log('API_getCheckedOutReturnDetails_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCheckedOutNotReturnSummary = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: {
        model: InvProduct,
        where: {
          quantity: { [Op.gt]: [0] }
        },
        include: {
          model: Product,
          where: {
            checkedout: 'Y',
            store_return_status: { [Op.not]: ['Y'] },
            keep_status: { [Op.not]: [2, 3] }
          }
        }
      }
    });
    console.log('API_getCheckedOutNotReturnSummary_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getClientBirthday_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getAutoList,
  getStyleList,
  getStateList,
  getBatchProcessReport,
  getBatchProcessSubscription,
  getClientBirthday,
  getNotCheckedOutCustomer,
  getReturnNotProcessed,
  getCheckedOutProductDetail,
  getProductAssingendButNotFinalized,
  getListOfProductNotReturned,
  getMonthlySale,
  getCheckedOutNotReturnDetails,
  getTotalProductsInInventory,
  getProductFinalizeSummary,
  getProductFinalizeDetails,
  getProductDeclinedSummary,
  getProductDeclinedDetails,
  getNotCheckedOutSummary,
  getNotCheckedOutDetails,
  getMonthlyclientConsumed,
  getMonthlyRevenue,
  getMonthlyProductNotReturned,
  getMonthlyProductDeclined,
  getMonthlyLoss,
  getClientCheckedOutSummary,
  getClientCheckedOutDetails,
  getCheckedOutReturnSummary,
  getCheckedOutReturnDetails,
  getCheckedOutNotReturnSummary
};
