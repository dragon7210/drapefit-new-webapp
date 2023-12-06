/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import MenFit from '../../models/client/menFit.js';
import MenStats from '../../models/client/menStats.js';
import MenStyle from '../../models/client/menStyle.js';
import MenBrand from '../../models/client/menBrand.js';
import MenAccessory from '../../models/client/menAccessory.js';
import CustomDesign from '../../models/client/customDesign.js';
import UserDetail from '../../models/admin/userDetail.js';
import TypicallyWearMen from '../../models/admin/typicallyWearMen.js';

const editMenBasicInfo = asyncHandler(async (req, res) => {
  try {
    const { id, are_you_a_parent, user_id, ...values } = req.body;
    console.log(values);
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });
    let parent = are_you_a_parent === 'Yes' ? 1 : are_you_a_parent === 'No' ? 2 : 0;
    await MenStats.update({ ...values, are_you_a_parent: parent }, { where: { user_id } });
    await MenStyle.update({ ...values }, { where: { user_id } });
    await TypicallyWearMen.update({ ...values }, { where: { user_id } });
    if (is_progressbar < 25) {
      await UserDetail.update({ is_progressbar: 25 }, { where: { user_id } });
    }
    console.log('API_editMenBasicInfo_200:', 'Basic Info of Men Fit Profile has been saved');
    res.status(200).send('Basic Info of Men Fit Profile has been saved');
  } catch (e) {
    console.log('API_editMenBasicInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenBasicInfo = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    let menState = await MenStats.findOne({ where: { user_id } });
    if (!menState) {
      menState = await MenStats.create({
        user_id
      });
    }
    let menStyle = await MenStyle.findOne({ where: { user_id } });
    if (!menStyle) {
      menStyle = await MenStyle.create({
        user_id
      });
    }
    let typicallyWearMan = await TypicallyWearMen.findOne({ where: { user_id } });
    if (!typicallyWearMan) {
      typicallyWearMan = await TypicallyWearMen.create({
        user_id
      });
    }
    let data = { ...menState?.dataValues, ...menStyle?.dataValues, ...typicallyWearMan?.dataValues };
    console.log('API_getMenBasicInfo_200:');
    res.status(200).json(data);
  } catch (e) {
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenStyleFit = asyncHandler(async (req, res) => {
  try {
    const {
      shirt_shoulder,
      casual_shirts_to_fit,
      button_up_shirts_to_fit,
      jeans_to_fit,
      tuck_in_a_button_up_shirt,
      your_pants_to_fit,
      prefer_color,
      prefer_your_shorts,
      take_note_of,
      user_id
    } = req.body;
    await MenFit.update(
      {
        shirt_shoulder: shirt_shoulder.toString(),
        casual_shirts_to_fit: casual_shirts_to_fit.toString(),
        button_up_shirts_to_fit: button_up_shirts_to_fit.toString(),
        jeans_to_fit: jeans_to_fit.toString(),
        tuck_in_a_button_up_shirt: tuck_in_a_button_up_shirt.toString(),
        your_pants_to_fit: your_pants_to_fit.toString(),
        prefer_color: JSON.stringify(prefer_color),
        prefer_your_shorts: prefer_your_shorts.toString(),
        take_note_of: take_note_of.toString()
      },
      { where: { user_id } }
    );
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });
    if (is_progressbar < 50) {
      await UserDetail.update({ is_progressbar: 50 }, { where: { user_id } });
    }
    console.log('API_editMenStyleFit_200:', 'Style Fit of Men Fit Profile has been saved');
    res.status(200).send('Style Fit of Men Fit Profile has been saved');
  } catch (e) {
    console.log('API_editMenStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenStyleFit = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;
    let data = await MenFit.findOne({
      where: {
        user_id
      }
    });
    if (!data) {
      await MenFit.create({
        user_id
      });
    }
    console.log('AP_getMenStyleFit_200:');
    res.status(200).json(data);
  } catch (e) {
    console.log('API_getMenStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenPriceRange = asyncHandler(async (req, res) => {
  try {
    const { id, user_id, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });
    let menAccess = await MenAccessory.findOne({ where: { user_id } });
    if (menAccess) {
      await MenAccessory.update({ ...values }, { where: { user_id } });
    } else {
      await MenAccessory.create({ ...values, user_id });
    }
    let menStyle = await MenStyle.findOne({ where: { user_id } });
    if (menStyle) {
      await MenStyle.update({ ...values }, { where: { user_id } });
    } else {
      await MenStyle.create({ ...values, user_id });
    }
    if (is_progressbar < 75) {
      await UserDetail.update({ is_progressbar: 75 }, { where: { user_id } });
    }
    console.log('API_editMenPriceRange_200:', 'Price Range of Men Fit Profile has been saved');
    res.status(200).send('Price Range of Men Fit Profile has been saved');
  } catch (e) {
    console.log('API_editMenPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenPriceRange = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;
    let men = await MenStyle.findOne({
      where: { user_id },
      attributes: [
        'button_shirts',
        'tees_polos',
        'weaters_sweatshirts',
        'pants_denim',
        'shorts',
        'shoes',
        'blazers_outerwear'
      ]
    });
    let menAccessory = await MenAccessory.findOne({
      where: { user_id }
    });
    if (!menAccessory) {
      menAccessory = await MenAccessory.create({
        user_id
      });
    }
    console.log('API_getMenPriceRange_200:', 'Price Range of Fit Profile is retrieved');
    res.status(200).json({ ...men.dataValues, ...menAccessory.dataValues });
  } catch (e) {
    console.log('API_getMenPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editMenCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { user_id, ...values } = req.body;
    let { is_progressbar } = await UserDetail.findOne({ where: { user_id } });
    await MenBrand.update({ ...values }, { where: { user_id } });
    await MenStats.update({ ...values }, { where: { user_id } });
    await MenStyle.update({ ...values }, { where: { user_id } });
    if (is_progressbar < 100) {
      await UserDetail.update({ is_progressbar: 100 }, { where: { user_id } });
    }
    console.log('API_editMenCustomDsgnBrand_200:', 'Custom Design & Brands of Men Fit Profile has been saved');
    res.status(200).send('Custom Design & Brands of Men Fit Profile has been saved');
  } catch (e) {
    console.log('API_editMenCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { user_id } = req.body;

    let menBs = await MenBrand.findOne({
      where: { user_id },
      attributes: ['mens_brands', 'user_id']
    });
    let menProfileNote = await MenStyle.findOne({
      where: { user_id },
      attributes: ['profile_note']
    });
    let menImgUrl = await CustomDesign.findOne({
      where: { user_id },
      attributes: ['img_1', 'img_2', 'img_3']
    });

    if (!menBs) {
      menBs = await MenBrand.create({
        user_id
      });
    }
    if (!menProfileNote) {
      menProfileNote = await MenStyle.create({
        user_id
      });
    }
    if (!menImgUrl) {
      menImgUrl = await CustomDesign.create({
        user_id
      });
    }
    console.log('API_getMenCustomDsgnBrand_200:', 'Custom Design & Brands of Fit Profile is retrieved');
    res.status(200).json({ ...menBs.dataValues, ...menProfileNote.dataValues, ...menImgUrl.dataValues });
  } catch (e) {
    console.log('API_getMenCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addMenBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log('API_addMenBillingInfo_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = sequelize.model('MFitProfile', MenFit);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let Status = { id: null, isNew: null };
    let men = null;
    let newMen = null;
    let BillingInfo = null;
    men = await MFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!men) {
      //-- add new
      newMen = await MFitProfileModel.create({
        userId: req.user.id
      });
      if (!newMen) {
        console.log('API_addMenBillingInfo_400:', 'Failed to create base of Men Fit Profile');
        return res.status(400).json({
          msg: 'Failed to create base of Men Fit Profile'
        });
      }
      Status = { id: newMen.id, isNew: true };
    } else {
      //-- modify existing one
      Status = { id: men.id, isNew: false };
    }
    const { ...rest } = req.body;
    const billingInfoFields = {
      ...rest,
      profileId: Status.id
    };
    //-- create
    BillingInfo = await FitProfileBillingInfoModel.create(billingInfoFields);
    if (!BillingInfo) {
      console.log('API_addMenBillingInfo_400:', 'Failed to add Billing Info of Men Fit Profile');
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Men Fit Profile'
      });
    }
    if (Status.isNew) {
      newMen.inputStatus.billingInfo = {
        itemIDs: [{ itemId: BillingInfo.id }],
        isComplete: true
      };
      await newMen.save();
    } else {
      men.inputStatus.billingInfo.itemIDs.push({
        itemId: BillingInfo.id
      });
      men.inputStatus.billingInfo.isComplete = true;
      await men.save();
    }
    //-- okay
    console.log('API_addMenBillingInfo_200:', 'Billing Info of Men Fit Profile has been added');
    res.status(200).send(BillingInfo);
  } catch (e) {
    console.log('API_addMenBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log('API_getMenBillingInfosAll_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = sequelize.model('MFitProfile', MenFit);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let men = null;
    let BillingInfos = null;
    men = await MFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!men) {
      //-- no fit profile yet
      console.log('API_getMenBillingInfosAll_200:', 'No Fit Profile yet');
      return res.status(200).json([]);
    }
    const BiIsComplete = men?.inputStatus?.billingInfo?.isComplete;
    BillingInfos = await FitProfileBillingInfoModel.find({ profileId: men.id }, { __v: 0, profileId: 0 }).sort({
      updatedAt: -1
    });
    if (!BillingInfos) {
      console.log('API_getMenBillingInfosAll_400:', 'Failed to get all Billing Infos of Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get all Billing Infos of Fit Profile'
      });
    }
    if (!BillingInfos.length) {
      //-- no billing info exists
      if (BiIsComplete) {
        //-- adjust wrong status
        men.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await men.save();
      }
    } else {
      if (!BiIsComplete) {
        //-- adjust wrong status
        let tmpIDs = [];
        BillingInfos.forEach((item) => {
          tmpIDs.unshift({ itemId: item.id });
          //-- use `unshift` instead of `push` because of sort(-1)
        });
        men.inputStatus.billingInfo.itemIDs = tmpIDs;
        men.inputStatus.billingInfo.isComplete = true;
        await men.save();
      }
    }
    //-- okay
    console.log('API_getMenBillingInfosAll_200:', 'All Billing Infos of Fit Profile are retrieved');
    res.status(200).json(BillingInfos);
  } catch (e) {
    console.log('API_getMenBillingInfosAll_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMenBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const fitFor = req.user?.fitFor;
    if (fitFor !== 1) {
      console.log('API_getMenBillingInfo_400:', 'Invalid access of mismatching gender');
      return res.status(400).json({
        msg: 'Invalid access of mismatching gender'
      });
    }
    const MFitProfileModel = sequelize.model('MFitProfile', MenFit);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    let men = null;
    let BillingInfo = null;
    men = await MFitProfileModel.findOne({
      userId: req.user.id
    });
    if (!men) {
      //-- no fit profile yet
      console.log('API_getMenBillingInfo_200:', 'No Fit Profile yet');
      return res.status(200).json(null);
    }
    const BiIsComplete = men?.inputStatus?.billingInfo?.isComplete;
    BillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        id: req.params.id,
        profileId: men.id
      },
      { __v: 0, profileId: 0 }
    );
    if (!BillingInfo) {
      console.log('API_getMenBillingInfo_400:', 'Failed to get Billing Info of Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Fit Profile'
      });
    }
    if (!BiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...men?.inputStatus?.billingInfo?.itemIDs];
      if (!tmpIDs || (tmpIDs && tmpIDs.length === 0)) {
        tmpIDs = [{ itemId: BillingInfo.id }];
      } else {
        let isExist = false;
        tmpIDs.forEach((item) => {
          if (String(item.itemId) === String(BillingInfo.id)) {
            isExist = true;
          }
        });
        if (!isExist) {
          tmpIDs.push({ itemId: BillingInfo.id });
        }
      }
      men.inputStatus.billingInfo.itemIDs = tmpIDs;
      men.inputStatus.billingInfo.isComplete = true;
      await men.save();
    }
    //-- okay
    console.log('API_getMenBillingInfo_200:', 'Billing Info of Fit Profile is retrieved');
    res.status(200).json(BillingInfo);
  } catch (e) {
    console.log('API_getMenBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editMenBasicInfo,
  getMenBasicInfo,
  editMenStyleFit,
  getMenStyleFit,
  editMenPriceRange,
  getMenPriceRange,
  editMenCustomDsgnBrand,
  getMenCustomDsgnBrand,
  addMenBillingInfo,
  getMenBillingInfosAll,
  getMenBillingInfo
};
