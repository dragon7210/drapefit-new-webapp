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
import KidsDetail from '../../models/client/kidsDetail.js';
import UserDetail from '../../models/admin/userDetail.js';
import PaymentCardDetail from '../../models/admin/paymentCardDetail.js';
import { Op, Sequelize } from 'sequelize';
import DeliverDate from '../../models/admin/deliverDate.js';
import TypicallyWearMen from '../../models/admin/typicallyWearMen.js';
import MenStyleSphereSelection from '../../models/client/menStyleSphereSelection.js';
import MenFit from '../../models/client/menFit.js';
import MenStats from '../../models/client/menStats.js';
import Product from '../../models/admin/product.js';
import InvProduct from '../../models/inventory/product.js';
import InvColor from '../../models/inventory/color.js';
import InvRack from '../../models/inventory/rack.js';
import PersonalizedFix from '../../models/admin/personalizedFix.js';
import WomenStyle from '../../models/client/women_style.js';
import WomenInformation from '../../models/client/womenInformation.js';
import WomenStyleSphereSelections from '../../models/client/womenStyleSphereSelections.js';
import WomenJeansStyle from '../../models/client/womenJeansStyle.js';
import SizeChart from '../../models/admin/sizeChart.js';
import KidSizeFit from '../../models/client/kidSizeFit.js';

const getCustomers = asyncHandler(async (req, res) => {
  try {
    const data = await User.findAll({
      where: {
        type: 2
      },
      include: [UserDetail, KidsDetail]
    });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPaidList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPaidList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: {
        status: 1,
        payment_type: 1,
        work_status: {
          [Op.or]: [0, 1, 2]
        },
        count: 1
      },
      order: [['created_dt', 'DESC']],
      include: [{ model: User, include: { model: UserDetail } }, KidsDetail, DeliverDate]
    });
    console.log('API_getPaidList_200');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPaidList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delPaidList = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await PaymentGetway.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_delPaidList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPaymentRefund = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: {
        status: 1,
        refound_status: {
          [Op.not]: 1
        },
        work_status: {
          [Op.or]: [0, 1, 2]
        }
      },
      include: [{ model: User, include: { model: UserDetail } }, PaymentCardDetail]
    });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPaymentRefund_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updatePaymentRefund = asyncHandler(async (req, res) => {
  try {
    let { id, price, refund_msg } = req.body;
    await PaymentGetway.update({ price, refund_msg }, { where: { id } });
    return res.status(200).send('succses');
  } catch (e) {
    console.log('API_updatePaymentRefund_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPaymentRefundList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: { status: 1, refound_status: 1 },
      include: [{ model: User, include: { model: UserDetail } }]
    });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPaymentRefundList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getSelPaymentRefundInfo = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;
    if (user_id) {
      const data = await PaymentCardDetail.findAll({
        where: { user_id },
        include: [{ model: User, include: { model: UserDetail } }]
      });
      return res.status(200).send(data);
    } else {
      return res.status(200).send('success');
    }
  } catch (e) {
    console.log('API_getSelPaymentRefundInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateSelPaymentRefundInfo = asyncHandler(async (req, res) => {
  try {
    let { user_id, price } = req.body;
    await PaymentGetway.update({ price }, { where: { user_id } });
    console.log('API_updateSelPaymentRefundInfo_200:');
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateSelPaymentRefundInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getNotPaidLsit = asyncHandler(async (req, res) => {
  try {
    const data = await User.findAll({
      where: { type: 2 },
      include: [UserDetail, KidsDetail],
      group: ['id']
    });
    console.log('API_getNotPaidLsit_200:');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getNotPaidLsit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateStylist = asyncHandler(async (req, res) => {
  try {
    let { id, stylist } = req.body;
    await PaymentGetway.update({ emp_id: stylist }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateStylist_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
const updateSupport = asyncHandler(async (req, res) => {
  try {
    let { id, support_id } = req.body;
    await PaymentGetway.update({ support_id }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateSupport_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
const updateQA = asyncHandler(async (req, res) => {
  try {
    let { id, qa_id } = req.body;
    await PaymentGetway.update({ qa_id }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateQA_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
const updateInventory = asyncHandler(async (req, res) => {
  try {
    let { id, inv_id } = req.body;
    await PaymentGetway.update({ inv_id }, { where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateInventory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPreviewWorkList = asyncHandler(async (req, res) => {
  try {
    const data = await PaymentGetway.findAll({
      where: { status: 1, payment_type: 1, work_status: 2 },
      include: [
        {
          model: User,
          include: { model: UserDetail }
        },
        KidsDetail
      ],
      order: [['created_dt', 'DESC']]
    });
    console.log('API_getPreviewWorkList_200:');
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getPreviewWorkList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delPreviewWorkList = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await PaymentGetway.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_delPreviewWorkList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const matching = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let data = await PaymentGetway.findOne({
      where: { id },
      include: [{ model: User, include: UserDetail }, KidsDetail]
    });
    let user_id = data.user_id;
    let kid_id = data.kid_id;
    let gender = Number(data.user.user_detail.gender);
    let matchingData, condition;
    if (gender === 1) {
      condition = await menMatching(user_id);
    } else if (gender === 2) {
      condition = await womenMatching(user_id);
    } else {
      let kidGender = data.kids_detail.kids_clothing_gender;
      if (kidGender === 'girls') {
        condition = await girlsMatching(user_id, kid_id);
      } else {
        condition = await boysMatching(user_id, kid_id);
      }
    }
    matchingData = await InvProduct.findAll({
      where: {
        id: Object.keys(condition)
      },
      include: [InvColor, InvRack]
    });
    res.status(200).send({ matchingData, condition });
  } catch (e) {
    console.log('API_matching_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const menMatching = async (user_id) => {
  let typicallyWearMenData = await TypicallyWearMen.findOne({ where: { user_id } });
  let styleSphereSelection = await MenStyleSphereSelection.findOne({ where: { user_id } });
  let menFit = await MenFit.findOne({ where: { user_id } });
  let menStats = await MenStats.findOne({ where: { user_id } });
  let matching = [];
  let products = await Product.findAll({ where: { user_id }, attributes: ['prod_id'] });
  let prev_products = products.map((product) => product.prod_id).filter(Boolean);
  let new_cnd_match = {};
  if (prev_products.length > 0) {
    new_cnd_match['prod_id'] = { [Sequelize.Op.notIn]: prev_products };
  }
  if (menStats.tall_feet) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        tall_feet: menStats.tall_feet,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_feet'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menStats.tell_inch) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        tall_inch: menStats.tell_inch,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tell_inch'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menStats.weight_lb) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        best_fit_for_weight: menStats.weight_lb,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['weight_lb'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.waist) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        waist_size: typicallyWearMenData.waist,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['waist_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        shirt_size: typicallyWearMenData.size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.shirt) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        shirt_size_run: typicallyWearMenData.shirt,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_size_run'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.inseam) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        inseam_size: typicallyWearMenData.inseam,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['inseam_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.men_bottom) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        men_bottom: typicallyWearMenData.inseam,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['men_bottom'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.shoe) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        shoe_size: typicallyWearMenData.shoe,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shoe_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.waist_size_run) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        waist_size_run: typicallyWearMenData.waist_size_run,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['waist_size_run'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.shoe_medium) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        shoe_size_run: typicallyWearMenData.shoe_medium,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shoe_size_run'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.body_type) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        better_body_shape: typicallyWearMenData.body_type,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['better_body_shape'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (typicallyWearMenData.skin_tone) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        skin_tone: typicallyWearMenData.skin_tone,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['skin_tone'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menFit.jeans_to_fit) {
    const dataArr = menFit.jeans_to_fit.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        jeans_Fit: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['jeans_Fit'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menFit.your_pants_to_fit) {
    const dataArr = menFit.your_pants_to_fit.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        men_bottom_prefer: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['men_bottom_prefer'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menFit.prefer_your_shorts) {
    const dataArr = menFit.prefer_your_shorts.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        shorts_long: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shorts_long'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menFit.prefer_color) {
    const dataArr = JSON.parse(menFit.prefer_color);
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        color: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['color'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (menFit.take_note_of) {
    const dataArr = menFit.take_note_of.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        take_note_of: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['take_note_of'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelection.style_sphere_selections_v2) {
    const dataArr = styleSphereSelection.style_sphere_selections_v2.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        work_type: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['work_type'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelection.style_sphere_selections_v3) {
    const dataArr = styleSphereSelection.style_sphere_selections_v3.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        casual_shirts_type: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['casual_shirts_type'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelection.style_sphere_selections_v4) {
    const dataArr = styleSphereSelection.style_sphere_selections_v4.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 1,
        bottom_up_shirt_fit: { [Sequelize.Op.in]: dataArr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['bottom_up_shirt_fit'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }

  const invProducts = await InvProduct.findAll({
    where: {
      profile_type: 1,
      primary_size: 'free_size',
      available_status: 1,
      match_status: 2,
      ...new_cnd_match
    },
    group: ['prod_id']
  });
  invProducts?.forEach((ip) => {
    if (!products.includes(ip.prodcut_id)) {
      matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
      matching[ip.id]['primary_size'] = 1;
      matching[ip.id]['product_id'] = ip.id;
    }
  });
  return matching;
};

const womenMatching = async (user_id) => {
  let stats = await PersonalizedFix.findOne({ where: { user_id } });
  let womenStyle = await WomenStyle.findOne({ where: { user_id } });
  let womenInfo = await WomenInformation.findOne({ where: { user_id } });
  let sizeChart = await SizeChart.findOne({ where: { user_id } });
  let styleSphereSelections = await WomenStyleSphereSelections.findOne({ where: { user_id } });
  let jeansStyle = await WomenJeansStyle.findOne({ where: { user_id } });
  let products = await Product.findAll({ where: { user_id }, attributes: ['prod_id'] });

  let matching = [];
  let prev_products = products.map((product) => product.prod_id).filter(Boolean);
  let new_cnd_match = {};
  if (prev_products.length > 0) {
    new_cnd_match['prod_id'] = { [Sequelize.Op.notIn]: prev_products };
  }

  if (womenStyle.birthday) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        age1: { $gte: womenStyle.birthday },
        age2: { $lte: womenStyle.birthday },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['birthday'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.tell_in_feet) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        tall_feet: { $gte: stats.tell_in_feet },
        tall_feet2: { $lte: stats.tell_in_feet },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_feet'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.tell_in_inch && stats.tell_in_feet) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        tall_feet: { [Op.gte]: stats.tell_in_feet },
        tall_feet2: { [Op.lte]: stats.tell_in_feet },
        tall_inch: stats.tell_in_inch,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_inch'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.weight_lbs) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        best_fit_for_weight: { [Op.gte]: stats.weight_lbs },
        best_fit_for_weight2: { [Op.lte]: stats.weight_lbs },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['weight_lbs'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.maternity_pants || sizeChart.maternity_pants === '0' || sizeChart.maternity_pants === '00') {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        pants: sizeChart.maternity_pants,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['pants'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.bra) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        bra: sizeChart.bra,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['bra'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.bra_recomend) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        bra_recomend: sizeChart.bra_recomend,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['bra_recomend'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.skirt) {
    let invProducts = [];
    if (['XL', '1X'].includes(sizeChart.skirt)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          skirt: { [Op.in]: ['XL', '1X'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else if (['XXL', '2X'].includes(sizeChart.skirt)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          skirt: { [Op.in]: ['XXL', '2X'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          skirt: sizeChart.skirt,
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    }
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['skirt'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.shirt_blouse) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        shirt_blouse: sizeChart.shirt_blouse,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_blouse'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.shirt_blouse_recomend) {
    let invProducts = [];
    if (['XL (14)', '1X (14W-16W)'].includes(sizeChart.shirt_blouse_recomend)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          shirt_blouse_recomend: { [Op.in]: ['XL (14)', '1X (14W-16W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else if (['XXL (16)', '2X (18W-20W)'].includes(sizeChart.shirt_blouse_recomend)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          shirt_blouse_recomend: { [Op.in]: ['XXL (16)', '2X (18W-20W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          shirt_blouse_recomend: sizeChart.shirt_blouse_recomend,
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    }

    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_blouse_recomend'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.pantsr1) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        pantsr1: sizeChart.pantsr1,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['pantsr1'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.pantsr2) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        pantsr2: sizeChart.pantsr2,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['pantsr2'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.jeans || sizeChart.jeans === '0' || sizeChart.jeans === '00') {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        jeans: sizeChart.jeans,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['jeans'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.active_wr) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        active_wr: sizeChart.active_wr,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['active_wr'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.wo_jackect_size) {
    let invProducts = [];
    if (['XL(14)', '1X(14W-16W)'].includes(sizeChart.wo_jackect_size)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_jackect_size: { [Op.in]: ['XL(14)', '1X(14W-16W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else if (['XXL (16)', '2X(18W-20W)'].includes(sizeChart.wo_jackect_size)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_jackect_size: { [Op.in]: ['XXL (16)', '2X(18W-20W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_jackect_size: sizeChart.wo_jackect_size,
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    }

    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_jackect_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.wo_bottom) {
    let invProducts = [];
    if (['XL(14)', '1X(14W-16W)'].includes(sizeChart.wo_bottom)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_bottom: { [Op.in]: ['XL(14)', '1X(14W-16W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else if (['XXL (16)', '2X(18W-20W)'].includes(sizeChart.wo_bottom)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_bottom: { [Op.in]: ['XXL (16)', '2X(18W-20W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          wo_bottom: sizeChart.wo_bottom,
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    }

    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_bottom'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.shoe) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        shoe_size: sizeChart.shoe,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shoe_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.dress) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        dress: sizeChart.dress,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['dress'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeChart.dress_recomended) {
    let invProducts = [];
    if (['XL(14)', '1X(14W-16W)'].includes(sizeChart.dress_recomended)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          dress_recomended: { [Op.in]: ['XL(14)', '1X(14W-16W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else if (['XXL (16)', '2X(18W-20W)'].includes(sizeChart.dress_recomended)) {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          dress_recomended: { [Op.in]: ['XXL (16)', '2X(18W-20W)'] },
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    } else {
      invProducts = await InvProduct.findAll({
        where: {
          profile_type: 2,
          dress_recomended: sizeChart.dress_recomended,
          available_status: 1,
          match_status: 2,
          ...new_cnd_match
        },
        group: ['prod_id']
      });
    }

    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['dress_recomended'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v3 && styleSphereSelections.style_sphere_selections_v3 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v3,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v3'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v4 && styleSphereSelections.style_sphere_selections_v4 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v4,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v4'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v5 && styleSphereSelections.style_sphere_selections_v5 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v5,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v5'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v6 && styleSphereSelections.style_sphere_selections_v6 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v6,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v6'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v7 && styleSphereSelections.style_sphere_selections_v7 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v7,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v7'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v8 && styleSphereSelections.style_sphere_selections_v8 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v8,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v8'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v9 && styleSphereSelections.style_sphere_selections_v9 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v9,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v9'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.style_sphere_selections_v11 && styleSphereSelections.style_sphere_selections_v11 !== 5) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        outfit_prefer: styleSphereSelections.style_sphere_selections_v11,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['style_sphere_selections_v11'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.missing_from_your_fIT) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        missing_from_your_fIT: styleSphereSelections.missing_from_your_fIT,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['missing_from_your_fIT'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (jeansStyle.jeans_style) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        jeans_style: jeansStyle.jeans_style,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['jeans_style'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (womenInfo.skin_tone) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        skin_tone: womenInfo.skin_tone,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['skin_tone'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (womenInfo.occupation_v2) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        profession: womenInfo.occupation_v2,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['profession'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (womenInfo.body_type) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        better_body_shape: womenInfo.body_type,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['better_body_shape'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_dress_length) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_dress_length: styleSphereSelections.wo_dress_length,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_dress_length'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.following_occasions) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        occasional_dress: styleSphereSelections.following_occasions,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['occasional_dress'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }

  if (
    styleSphereSelections.wo_top_half ||
    styleSphereSelections.style_sphere_selections_v2 ||
    womenStyle.distressed_denim_non ||
    womenStyle.distressed_denim_minimally ||
    womenStyle.distressed_denim_fairly ||
    womenStyle.distressed_denim_heavily
  ) {
    const da_li = styleSphereSelections.wo_top_half ? styleSphereSelections.wo_top_half.split(',') : [];
    const styl_insp_dt = styleSphereSelections.style_sphere_selections_v2
      ? styleSphereSelections.style_sphere_selections_v2.split(',')
      : [];
    const wo_dnm_sty = [];

    if (womenStyle.distressed_denim_non && ['Maybe', 'Yes'].includes(womenStyle.distressed_denim_non)) {
      wo_dnm_sty.push('distressed_denim_non');
    }
    if (womenStyle.distressed_denim_minimally && ['Maybe', 'Yes'].includes(womenStyle.distressed_denim_minimally)) {
      wo_dnm_sty.push('distressed_denim_minimally');
    }
    if (womenStyle.distressed_denim_fairly && ['Maybe', 'Yes'].includes(womenStyle.distressed_denim_fairly)) {
      wo_dnm_sty.push('distressed_denim_fairly');
    }
    if (womenStyle.distressed_denim_heavily && ['Maybe', 'Yes'].includes(womenStyle.distressed_denim_heavily)) {
      wo_dnm_sty.push('distressed_denim_heavily');
    }

    const inStyleInsp = await InvProduct.findAll({
      where: {
        profile_type: 2,
        [Op.or]: [
          { wo_top_half: { [Op.in]: da_li } },
          { wo_style_insp: { [Op.in]: styl_insp_dt } },
          { denim_styles: { [Op.in]: wo_dnm_sty } }
        ],
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      attributes: ['id', 'prodcut_id'],
      group: ['prod_id']
    });

    for (const ss_li of inStyleInsp) {
      if (da_li.length && ss_li.id && !products.includes(ss_li.prodcut_id)) {
        for (const wth_li of da_li) {
          if (ss_li.wo_top_half && JSON.parse(ss_li.wo_top_half).includes(wth_li)) {
            matching[ss_li.id] = {
              wo_top_half: 1,
              product_id: ss_li.prodcut_id
            };
          }
        }
      }

      if (styl_insp_dt.length && ss_li.id && !products.includes(ss_li.prodcut_id)) {
        for (const sty_inp_li of styl_insp_dt) {
          if (ss_li.wo_style_insp && JSON.parse(ss_li.wo_style_insp).includes(sty_inp_li)) {
            matching[ss_li.id] = {
              wo_style_insp: 1,
              product_id: ss_li.prodcut_id
            };
          }
        }
      }

      if (wo_dnm_sty.length && ss_li.id && !products.includes(ss_li.prodcut_id)) {
        for (const wds_li of wo_dnm_sty) {
          if (ss_li.denim_styles && JSON.parse(ss_li.denim_styles).includes(wds_li)) {
            matching[ss_li.id] = {
              denim_styles: 1,
              product_id: ss_li.prodcut_id
            };
          }
        }
      }
    }
  }
  if (styleSphereSelections.wo_pant_length) {
    let data = styleSphereSelections.wo_pant_length.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_pant_length: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_pant_length'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_pant_rise) {
    let data = styleSphereSelections.wo_pant_rise.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_pant_rise: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_pant_rise'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_pant_style) {
    let data = styleSphereSelections.wo_pant_style.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_pant_style: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_pant_style'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_appare) {
    let data = styleSphereSelections.wo_appare.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_appare: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_appare'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_bottom_style) {
    let data = styleSphereSelections.wo_bottom_style.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_bottom_style: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_bottom_style'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (styleSphereSelections.wo_top_style) {
    let data = styleSphereSelections.wo_top_style.split(',');
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 2,
        wo_top_style: { [Op.in]: data },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['wo_top_style'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (
    styleSphereSelections.color_prefer &&
    styleSphereSelections.color_prefer !== 'null' &&
    styleSphereSelections.color_prefer.length > 2
  ) {
    const da_li = JSON.parse(styleSphereSelections.color_prefer);
    const inStyleInsp = await InvProduct.findAll({
      where: {
        profile_type: 2,
        color: { [Op.in]: da_li },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      attributes: ['id', 'prodcut_id'],
      group: ['prod_id']
    });

    for (const ss_li of inStyleInsp) {
      if (ss_li.id && !products.includes(ss_li.prodcut_id)) {
        matching[ss_li.id] = {
          color: 1,
          product_id: ss_li.prodcut_id
        };
      }
    }
  }
  const invProducts = await InvProduct.findAll({
    where: {
      profile_type: 2,
      primary_size: 'free_size',
      available_status: 1,
      match_status: 2,
      ...new_cnd_match
    },
    group: ['prod_id']
  });
  invProducts?.forEach((ip) => {
    if (!products.includes(ip.prodcut_id)) {
      matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
      matching[ip.id]['free_size'] = 1;
      matching[ip.id]['product_id'] = ip.id;
    }
  });
  return matching;
};

const girlsMatching = async (user_id, kid_id) => {
  let stats = await KidsDetail.findOne({ where: { user_id, id: kid_id } });
  let sizeFit = await KidSizeFit.findOne({ where: { user_id, kid_id } });
  let matching = [];
  let products = await Product.findAll({ where: { user_id, kid_id }, attributes: ['prod_id'] });
  let prev_products = products.map((product) => product.prod_id).filter(Boolean);
  let new_cnd_match = {};
  if (prev_products.length > 0) {
    new_cnd_match['prod_id'] = { [Sequelize.Op.notIn]: prev_products };
  }
  if (stats.tall_feet) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        tall_feet: stats.tall_feet,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_feet'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.tell_inch) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        tall_inch: stats.tell_inch,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_inch'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.weight_lb) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        best_fit_for_weight: stats.weight_lb,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['best_fit_for_weight'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.top_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        top_size: sizeFit.top_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['top_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.bottom_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        bottom_size: sizeFit.bottom_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['bottom_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.shoe_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        shoe_size: sizeFit.shoe_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shoe_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.t_shirts) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        shirt_size: sizeFit.t_shirts,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.paint) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        pants: sizeFit.paint,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['pants'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.body_shape) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        better_body_shape: sizeFit.body_shape,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['better_body_shape'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.prefer_color && stats.prefer_color !== 'null' && stats.prefer_color.length > 2) {
    const prefer_color_arr = JSON.parse(stats.prefer_color);
    const inProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        color: { [Op.in]: prefer_color_arr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      attributes: ['id', 'prodcut_id'],
      group: ['prod_id']
    });

    for (const ip of inProducts) {
      if (ip.id && !products.includes(ip.prodcut_id)) {
        matching[ip.id] = {
          color: 1,
          product_id: ip.prodcut_id
        };
      }
    }
  }
  if (sizeFit.skirt) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 4,
        better_skirt: sizeFit.skirt,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['better_skirt'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  const invProducts = await InvProduct.findAll({
    where: {
      profile_type: 4,
      primary_size: 'free_size',
      available_status: 1,
      match_status: 2,
      ...new_cnd_match
    },
    group: ['prod_id']
  });
  invProducts?.forEach((ip) => {
    if (!products.includes(ip.prodcut_id)) {
      matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
      matching[ip.id]['pants'] = 1;
      matching[ip.id]['product_id'] = ip.id;
    }
  });

  return matching;
};

const boysMatching = async (user_id, kid_id) => {
  let stats = await KidsDetail.findOne({ where: { user_id, id: kid_id } });
  let sizeFit = await KidSizeFit.findOne({ where: { user_id, kid_id } });
  let matching = [];
  let products = await Product.findAll({ where: { user_id, kid_id }, attributes: ['prod_id'] });
  let prev_products = products.map((product) => product.prod_id).filter(Boolean);
  let new_cnd_match = {};
  if (prev_products.length > 0) {
    new_cnd_match['prod_id'] = { [Sequelize.Op.notIn]: prev_products };
  }

  if (stats.tall_feet) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        tall_feet: stats.tall_feet,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_feet'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.tell_inch) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        tall_inch: stats.tell_inch,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['tall_inch'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.weight_lb) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        best_fit_for_weight: stats.weight_lb,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['best_fit_for_weight'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.top_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        top_size: sizeFit.top_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['top_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.bottom_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        bottom_size: sizeFit.bottom_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['bottom_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.shoe_size) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        shoe_size: sizeFit.shoe_size,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shoe_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.t_shirts) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        shirt_size: sizeFit.t_shirts,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['shirt_size'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.paint) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        pants: sizeFit.paint,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['pants'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (stats.prefer_color && stats.prefer_color !== 'null' && stats.prefer_color.length > 2) {
    const prefer_color_arr = JSON.parse(stats.prefer_color);
    const inProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        color: { [Op.in]: prefer_color_arr },
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      attributes: ['id', 'prodcut_id'],
      group: ['prod_id']
    });

    for (const ip of inProducts) {
      if (ip.id && !products.includes(ip.prodcut_id)) {
        matching[ip.id] = {
          color: 1,
          product_id: ip.prodcut_id
        };
      }
    }
  }
  if (sizeFit.body_shape) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        better_body_shape: sizeFit.body_shape,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['better_body_shape'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  if (sizeFit.skirt) {
    const invProducts = await InvProduct.findAll({
      where: {
        profile_type: 3,
        skirt: sizeFit.skirt,
        available_status: 1,
        match_status: 2,
        ...new_cnd_match
      },
      group: ['prod_id']
    });
    invProducts?.forEach((ip) => {
      if (!products.includes(ip.prodcut_id)) {
        matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
        matching[ip.id]['skirt'] = 1;
        matching[ip.id]['product_id'] = ip.id;
      }
    });
  }
  const invProducts = await InvProduct.findAll({
    where: {
      profile_type: 3,
      primary_size: 'free_size',
      available_status: 1,
      match_status: 2,
      ...new_cnd_match
    },
    group: ['prod_id']
  });
  invProducts?.forEach((ip) => {
    if (!products.includes(ip.prodcut_id)) {
      matching[ip.id] = matching[ip.id] ? matching[ip.id] : {};
      matching[ip.id]['pants'] = 1;
      matching[ip.id]['product_id'] = ip.id;
    }
  });
  return matching;
};

const delNotPaidList = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await PaymentGetway.destroy({ where: { id } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_delNotPaidList_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getJunk = asyncHandler(async (req, res) => {
  try {
    let data = await User.findAll({ where: { type: 2, is_active: 0 } });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getJunk_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBlock = asyncHandler(async (req, res) => {
  try {
    let data1 = await User.findAll({ where: { type: 2, is_active: 0 } });
    let data2 = await User.findAll({ where: { type: 3, is_active: 1 } });
    let data = data1.concat(data2);
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getJunk_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const browser = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let data = await PaymentGetway.findOne({
      where: { id },
      include: [{ model: User, include: UserDetail }, KidsDetail]
    });
    let { kid_id } = data;
    let gender;
    if (kid_id === 0) {
      gender = data.user.user_detail.gender;
    } else {
      gender = data.kids_detail.kids_clothing_gender === 'boys' ? 3 : 4;
    }
    let returnData = await InvProduct.findAll({
      where: { profile_type: gender, quantity: { [Op.gt]: 0 }, match_status: 2 },
      include: [InvRack, InvColor],
      group: ['prod_id']
    });
    res.status(200).send(returnData);
  } catch (e) {
    console.log('API_browser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getCustomers,
  getPaidList,
  updatePaymentRefund,
  getPaymentRefund,
  getPaymentRefundList,
  getSelPaymentRefundInfo,
  updateSelPaymentRefundInfo,
  getNotPaidLsit,
  updateStylist,
  updateQA,
  updateInventory,
  updateSupport,
  getPreviewWorkList,
  delPreviewWorkList,
  delPaidList,
  matching,
  delNotPaidList,
  getJunk,
  getBlock,
  browser
};
