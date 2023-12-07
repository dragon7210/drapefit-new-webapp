/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import { sequelize } from '../../config/db.js';
import WomenStyle from '../../models/client/women_style.js';
import WomenInformation from '../../models/client/womenInformation.js';
import WomenStyleSphereSelections from '../../models/client/womenStyleSphereSelections.js';
import CustomDesign from '../../models/client/customDesign.js';
import WomenShoePrefer from '../../models/client/womenShoePrefer.js';
import WomenHeelHightPrefer from '../../models/client/womenHeelHightPrefer.js';
import UserDetail from '../../models/admin/userDetail.js';
import PersonalizedFix from '../../models/admin/personalizedFix.js';
import SizeChart from '../../models/admin/sizeChart.js';

const editWomenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    let user_id = req.user.id;
    let { id, are_you_a_parent, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });
    let womenInfo = await WomenInformation.findOne({ where: { user_id } });
    if (womenInfo) {
      await WomenInformation.update({ ...values }, { where: { user_id } });
    } else {
      await WomenInformation.create({ ...values, user_id: user_id });
    }
    let womenS = await WomenStyle.findOne({ where: { user_id } });
    if (womenS) {
      await WomenStyle.update({ ...values }, { where: { user_id } });
    } else {
      await WomenStyle.create({ ...values, user_id });
    }
    let personalizedFix = await PersonalizedFix.findOne({
      where: { user_id }
    });
    if (!personalizedFix) {
      await PersonalizedFix.create({ ...values, user_id });
    } else {
      await PersonalizedFix.update({ ...values }, { where: { user_id } });
    }
    let sizeChart = await SizeChart.findOne({
      where: { user_id }
    });
    if (!sizeChart) {
      await SizeChart.create({ ...values, user_id });
    } else {
      await SizeChart.update({ ...values }, { where: { user_id } });
    }
    let womenShoePrefer = await WomenShoePrefer.findOne({
      where: { user_id }
    });
    if (!womenShoePrefer) {
      await WomenShoePrefer.create({ ...values, user_id });
    } else {
      await WomenShoePrefer.update({ ...values }, { where: { user_id } });
    }
    let womenHeelHightPrefer = await WomenHeelHightPrefer.findOne({
      where: { user_id }
    });
    if (!womenHeelHightPrefer) {
      await WomenHeelHightPrefer.create({ ...values, user_id });
    } else {
      await WomenHeelHightPrefer.update({ ...values }, { where: { user_id } });
    }
    if (is_progressbar < 25) {
      await UserDetail.update({ is_progressbar: 25 }, { where: { user_id } });
    }
    console.log('API_editWomenFPBasicInfo_200:', 'Basic Info of Women Fit Profile has been saved');
    res.status(200).send('Basic Info of Women Fit Profile has been saved');
  } catch (e) {
    console.log('API_editWomenFPBasicInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBasicInfo = asyncHandler(async (req, res) => {
  try {
    let user_id = req.user.id;
    let womenFP = await WomenStyle.findOne({
      where: { user_id },
      attributes: ['linkdin_profile', 'instagram', 'twitter', 'pinterest']
    });
    if (!womenFP) {
      womenFP = await WomenStyle.create({ user_id });
    }
    let womenInfo = await WomenInformation.findOne({
      where: { user_id }
    });
    if (!womenInfo) {
      womenInfo = await WomenInformation.create({ user_id });
    }
    let personalizedFix = await PersonalizedFix.findOne({
      where: { user_id }
    });
    if (!personalizedFix) {
      personalizedFix = await PersonalizedFix.create({ user_id });
    }
    let sizeChart = await SizeChart.findOne({
      where: { user_id }
    });
    if (!sizeChart) {
      sizeChart = await SizeChart.create({ user_id });
    }
    let womenShoePrefer = await WomenShoePrefer.findOne({
      where: { user_id }
    });
    if (!womenShoePrefer) {
      womenShoePrefer = await WomenShoePrefer.create({ user_id });
    }
    let womenHeelHightPrefer = await WomenHeelHightPrefer.findOne({
      where: { user_id }
    });
    if (!womenHeelHightPrefer) {
      womenHeelHightPrefer = await WomenHeelHightPrefer.create({ user_id });
    }
    res.status(200).json({
      ...womenFP?.dataValues,
      ...womenInfo?.dataValues,
      ...personalizedFix.dataValues,
      ...sizeChart.dataValues,
      ...womenShoePrefer.dataValues,
      ...womenHeelHightPrefer.dataValues
    });
    console.log('API_getWomenFPBasicInfo_200:', 'Basic Info of Fit Profile is retrieved');
  } catch (e) {
    console.log('API_getWomenFPBasicInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    const { user_id, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });

    // let womenStyleData = await WomenStyle.findOne({ where: { user_id } });
    // if (womenStyleData) {
    //   await WomenStyle.update({ ...values }, { where: { user_id } });
    // } else {
    //   await WomenStyle.create({ ...values, user_id });
    // }
    let womenInfoData = await WomenStyleSphereSelections.findOne({ where: { user_id } });
    if (womenInfoData) {
      await WomenStyleSphereSelections.update({ ...values }, { where: { user_id } });
    } else {
      await WomenStyleSphereSelections.create({ ...values, user_id });
    }
    if (is_progressbar < 50) {
      await UserDetail.update({ is_progressbar: 50 }, { where: { user_id } });
    }
    console.log('API_editWomenFPStyleFit_200:', 'Style Fit of Women Fit Profile has been saved');
    res.status(200).send('Style Fit of Women Fit Profile has been saved');
  } catch (e) {
    console.log('API_editWomenFPStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPStyleFit = asyncHandler(async (req, res) => {
  try {
    let user_id = req.user.id;
    let womenSel = await WomenStyleSphereSelections.findOne({
      where: { user_id }
    });
    if (!womenSel) {
      womenSel = WomenStyleSphereSelections.create({ user_id });
    }
    let womenDenim = await WomenStyle.findOne({
      where: { user_id },
      attributes: [
        'distressed_denim_non',
        'distressed_denim_minimally',
        'distressed_denim_fairly',
        'distressed_denim_heavily'
      ]
    });
    if (!womenDenim) {
      womenDenim = await WomenStyle.create({ user_id });
    }

    if (!womenSel || !womenDenim) {
      console.log('API_getWomenFPStyleFit_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    console.log('API_getWomenFPStyleFit_200:', 'Style Fit of Fit Profile is retrieved');
    res.status(200).json({ ...womenDenim.dataValues, ...womenSel.dataValues });
  } catch (e) {
    console.log('API_getWomenFPStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    const { id, user_id, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });

    let womenPriceData = await WomenStyle.findOne({ where: { user_id } });
    if (womenPriceData) {
      await WomenStyle.update({ ...values }, { where: { user_id } });
    } else {
      await WomenStyle.create({ ...values, user_id: user_id });
    }
    if (is_progressbar < 75) {
      await UserDetail.update({ is_progressbar: 75 }, { where: { user_id } });
    }
    console.log('API_editWomenFPPriceRange_200:', 'Price Range of Women Fit Profile has been saved');
    res.status(200).send('Price Range of Women Fit Profile has been saved');
  } catch (e) {
    console.log('API_editWomenFPPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPPriceRange = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;

    let womenFP = await WomenStyle.findOne({
      where: { user_id },
      attributes: ['bottoms', 'jewelry', 'outwear', 'jeans', 'accessproes', 'tops', 'dress']
    });
    if (!womenFP) {
      console.log('API_getWomenFPPriceRange_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    console.log('API_getWomenFPPriceRange_200:', 'Price Range of Fit Profile is retrieved');
    res.status(200).json(womenFP);
  } catch (e) {
    console.log('API_getWomenFPPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { user_id, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });

    let womenBrand = await WomenShoePrefer.findOne({
      where: { user_id }
    });
    let womenProfileNote = await WomenStyle.findOne({
      where: { user_id },
      attributes: ['profile_note']
    });
    let womenImgUrl = await CustomDesign.findOne({
      where: { user_id },
      attributes: ['img_1', 'img_2', 'img_3']
    });
    if (womenBrand) {
      await WomenShoePrefer.update({ ...values }, { where: { user_id } });
    } else {
      womenBrand = await WomenShoePrefer.create({
        user_id
      });
    }

    if (!womenProfileNote) {
      await WomenStyle.update({ ...values }, { where: { user_id } });
    } else {
      womenProfileNote = await WomenStyle.create({
        user_id
      });
    }

    if (!womenImgUrl) {
      await CustomDesign.update({ ...values }, { where: { user_id } });
    } else {
      womenImgUrl = await CustomDesign.create({
        user_id
      });
    }

    if (is_progressbar < 100) {
      await UserDetail.update({ is_progressbar: 100 }, { where: { user_id } });
    }
    console.log('API_editWomenFPCustomDsgnBrand_200:', 'Custom Design & Brands of Women Fit Profile has been saved');
    res.status(200).send('Custom Design & Brands of Women Fit Profile has been saved');
  } catch (e) {
    console.log('API_editWomenFPCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;

    let womenBrand = await WomenShoePrefer.findOne({
      where: { user_id }
    });
    let womenProfileNote = await WomenStyle.findOne({
      where: { user_id },
      attributes: ['profile_note']
    });
    let womenImgUrl = await CustomDesign.findOne({
      where: { user_id },
      attributes: ['img_1', 'img_2', 'img_3']
    });
    if (!womenBrand && !womenProfileNote && !womenImgUrl) {
      console.log('API_getWomenFPPriceRange_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    console.log('API_getWomenFPCustomDsgnBrand_200:', 'Custom Design & Brands of Fit Profile is retrieved');
    res.status(200).json({ ...womenBrand?.dataValues, ...womenProfileNote?.dataValues, ...womenImgUrl?.dataValues });
  } catch (e) {
    console.log('API_getWomenFPCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editWomenFPSchedule = asyncHandler(async (req, res) => {
  try {
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log('API_editWomenFPSchedule_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = sequelize.model('WFitProfile', wFitProfileSchema);
    const FitProfileScheduleModel = sequelize.model('FitProfileSchedule', fitProfileScheduleSchema);
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpSchedule = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user.id
      });
      if (!newWomenFP) {
        console.log('API_editWomenFPSchedule_400:', 'Failed to create base of Women Fit Profile');
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP.id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP.id, isNew: false };
    }
    const { ...rest } = req.body;
    const scheduleFields = {
      ...rest,
      profileId: fpStatus.id
    };
    //-- use upsert option (create new if no match is found)
    fpSchedule = await FitProfileScheduleModel.findOneAndUpdate(
      { profileId: fpStatus.id },
      { $set: scheduleFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!fpSchedule) {
      console.log('API_editWomenFPSchedule_400:', 'Failed to edit Schedule of Women Fit Profile');
      return res.status(400).json({
        msg: 'Failed to edit Schedule of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.schedule = {
        itemId: fpSchedule.id,
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.schedule = {
        itemId: fpSchedule.id,
        isComplete: true
      };
      await womenFP.save();
    }
    //-- okay
    console.log('API_editWomenFPSchedule_200:', 'Schedule of Women Fit Profile has been saved');
    res.status(200).send('Schedule of Women Fit Profile has been saved');
  } catch (e) {
    console.log('API_editWomenFPSchedule_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPSchedule = asyncHandler(async (req, res) => {
  try {
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log('API_getWomenFPSchedule_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = sequelize.model('WFitProfile', wFitProfileSchema);
    const FitProfileScheduleModel = sequelize.model('FitProfileSchedule', fitProfileScheduleSchema);
    let womenFP = null;
    let fpSchedule = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPSchedule_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpDsItemId = womenFP?.inputStatus?.schedule?.itemId;
    const fpDsIsComplete = womenFP?.inputStatus?.schedule?.isComplete;
    // const fpDsis_active = womenFP?.inputStatus?.schedule?.is_active;
    if (!fpDsItemId || fpDsIsComplete !== true) {
      //-- no delivery schedule of fit profile yet
      //-- make a deep check again
      fpSchedule = await FitProfileScheduleModel.findOne(
        { profileId: womenFP.id },
        { id: 0, __v: 0, profileId: 0, createdAt: 0, updatedAt: 0 }
      );
      if (!fpSchedule) {
        //-- no delivery schedule yet really
        console.log('API_getWomenFPSchedule_200:', 'No Delivery Schedule of Fit Profile yet');
        return res.status(200).json(null);
      }
      //-- delivery schedule exists in fact
      //-- adjust fit profile status
      womenFP.inputStatus.schedule = {
        itemId: fpSchedule.id,
        isComplete: true,
        is_active: true
      };
      await womenFP.save();
      //-- okay, not bad
      console.log('API_getWomenFPSchedule_200:', 'Delivery Schedule of Fit Profile is returned');
      return res.status(200).json(fpSchedule);
    }
    //-- everything seems fine so far
    fpSchedule = await FitProfileScheduleModel.findById(fpDsItemId, {
      id: 0,
      __v: 0,
      profileId: 0,
      createdAt: 0,
      updatedAt: 0
    });
    if (!fpSchedule) {
      //-- wrong of mismatch
      console.log('API_getWomenFPSchedule_400:', 'No Delivery Schedule of Fit Profile exists');
      return res.status(400).json({
        msg: 'No Delivery Schedule of Fit Profile exists'
      });
    }
    //-- okay
    console.log('API_getWomenFPSchedule_200:', 'Delivery Schedule of Fit Profile is retrieved');
    res.status(200).json(fpSchedule);
  } catch (e) {
    console.log('API_getWomenFPSchedule_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addWomenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log('API_addWomenFPBillingInfo_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = sequelize.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let fpStatus = { id: null, isNew: null };
    let womenFP = null;
    let newWomenFP = null;
    let fpBillingInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!womenFP) {
      //-- add new
      newWomenFP = await WFitProfileModel.create({
        userId: req.user.id
      });
      if (!newWomenFP) {
        console.log('API_addWomenFPBillingInfo_400:', 'Failed to create base of Women Fit Profile');
        return res.status(400).json({
          msg: 'Failed to create base of Women Fit Profile'
        });
      }
      fpStatus = { id: newWomenFP.id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: womenFP.id, isNew: false };
    }
    const { ...rest } = req.body;
    const billingInfoFields = {
      ...rest,
      profileId: fpStatus.id
    };
    //-- create
    fpBillingInfo = await FitProfileBillingInfoModel.create(billingInfoFields);
    if (!fpBillingInfo) {
      console.log('API_addWomenFPBillingInfo_400:', 'Failed to add Billing Info of Women Fit Profile');
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Women Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newWomenFP.inputStatus.billingInfo = {
        itemIDs: [{ itemId: fpBillingInfo.id }],
        isComplete: true
      };
      await newWomenFP.save();
    } else {
      womenFP.inputStatus.billingInfo.itemIDs.push({
        itemId: fpBillingInfo.id
      });
      womenFP.inputStatus.billingInfo.isComplete = true;
      await womenFP.save();
    }
    //-- okay
    console.log('API_addWomenFPBillingInfo_200:', 'Billing Info of Women Fit Profile has been added');
    res.status(200).send(fpBillingInfo);
  } catch (e) {
    console.log('API_addWomenFPBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log('API_getWomenFPBillingInfosAll_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = sequelize.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let womenFP = null;
    let fpBillingInfos = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPBillingInfosAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpBiIsComplete = womenFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfos = await FitProfileBillingInfoModel.find({ profileId: womenFP.id }, { __v: 0, profileId: 0 }).sort({
      updatedAt: -1
    });
    if (!fpBillingInfos) {
      console.log('API_getWomenFPBillingInfosAll_400:', 'Failed to get all Billing Infos of Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get all Billing Infos of Fit Profile'
      });
    }
    if (!fpBillingInfos.length) {
      //-- no billing info exists
      if (fpBiIsComplete) {
        //-- adjust wrong status
        womenFP.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await womenFP.save();
      }
    } else {
      if (!fpBiIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        fpBillingInfos.forEach((item) => {
          tmpIDs.unshift({ itemId: item.id });
          /**
           * use `unshift` instead of `push` because of sort(-1)
           */
        });
        womenFP.inputStatus.billingInfo.itemIDs = tmpIDs;
        womenFP.inputStatus.billingInfo.isComplete = true;
        await womenFP.save();
      }
    }
    //-- okay
    console.log('API_getWomenFPBillingInfosAll_200:', 'All Billing Infos of Fit Profile are retrieved');
    res.status(200).json(fpBillingInfos);
  } catch (e) {
    console.log('API_getWomenFPBillingInfosAll_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getWomenFPBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 0) {
      console.log('API_getWomenFPBillingInfo_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const WFitProfileModel = sequelize.model('WFitProfile', wFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let womenFP = null;
    let fpBillingInfo = null;
    womenFP = await WFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!womenFP) {
      //-- no fit profile yet
      console.log('API_getWomenFPBillingInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiIsComplete = womenFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        id: req.params.id,
        profileId: womenFP.id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpBillingInfo) {
      console.log('API_getWomenFPBillingInfo_400:', 'Failed to get Billing Info of Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Fit Profile'
      });
    }
    if (!fpBiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...womenFP?.inputStatus?.billingInfo?.itemIDs];
      if (!tmpIDs || (tmpIDs && tmpIDs.length === 0)) {
        tmpIDs = [{ itemId: fpBillingInfo.id }];
      } else {
        let isExist = false;
        tmpIDs.forEach((item) => {
          if (String(item.itemId) === String(fpBillingInfo.id)) {
            isExist = true;
          }
        });
        if (!isExist) {
          tmpIDs.push({ itemId: fpBillingInfo.id });
        }
      }
      womenFP.inputStatus.billingInfo.itemIDs = tmpIDs;
      womenFP.inputStatus.billingInfo.isComplete = true;
      await womenFP.save();
    }
    //-- okay
    console.log('API_getWomenFPBillingInfo_200:', 'Billing Info of Fit Profile is retrieved');
    res.status(200).json(fpBillingInfo);
  } catch (e) {
    console.log('API_getWomenFPBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editWomenFPBasicInfo,
  getWomenFPBasicInfo,
  editWomenFPStyleFit,
  getWomenFPStyleFit,
  editWomenFPPriceRange,
  getWomenFPPriceRange,
  editWomenFPCustomDsgnBrand,
  getWomenFPCustomDsgnBrand,
  editWomenFPSchedule,
  getWomenFPSchedule,
  addWomenFPBillingInfo,
  getWomenFPBillingInfosAll,
  getWomenFPBillingInfo
};
