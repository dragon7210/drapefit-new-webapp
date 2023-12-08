/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import path from 'path';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import converter from 'number-to-words';

import { s3Client } from '../../libs/s3Client.js';
import KidsDetail from '../../models/client/kidsDetail.js';
import kidClothingType from '../../models/client/kidClothingType.js';
import KidSizeFit from '../../models/client/kidSizeFit.js';
import KidStyle from '../../models/client/kidStyle.js';
import CustomDesign from '../../models/client/customDesign.js';
const __dirname = path.resolve();

const editKidBasicInfo = asyncHandler(async (req, res) => {
  try {
    const { prefer_color, kids_clothing_gender, size_prefer_wear, child_personality, id, ...rest } = req.body;

    let gender = kids_clothing_gender === `Girl's Product` ? 'girls' : 'boys';
    let wear = size_prefer_wear === 'Bottom Size' ? 0 : size_prefer_wear === 'Top Size' ? 1 : 2;

    await KidsDetail.update(
      {
        prefer_color: JSON.stringify(prefer_color),
        is_progressbar: 25,
        kids_clothing_gender: gender,
        size_prefer_wear: wear,
        child_personality: child_personality.toString(),
        ...rest
      },
      {
        where: {
          id
        }
      }
    );
    console.log('API_editKidBasicInfo_200:', 'Basic Info of Kid Fit Profile has been saved');
    res.status(200).send('Basic Info of Kid Fit Profile has been saved');
  } catch (e) {
    console.log('API_editKidBasicInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBasicInfo = asyncHandler(async (req, res) => {
  try {
    let { kid_count } = req.body;
    let user_id = req.user.id;
    let kid = await KidsDetail.findOne({
      where: { user_id, kid_count },
      attributes: [
        'kids_first_name',
        'kids_birthdate',
        'kids_relationship_to_child',
        'kids_clothing_gender',
        'tall_feet',
        'tell_inch',
        'weight_lb',
        'child_personality',
        'size_prefer_wear',
        'prefer_color',
        'user_id',
        'id'
      ]
    });
    if (!kid) {
      console.log('API_getKidBasicInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    console.log('API_getKidBasicInfo_200:', 'Basic Info of Kid Fit Profile is retrieved');
    res.status(200).json(kid);
  } catch (e) {
    console.log('API_getKidBasicInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidStyleFit = asyncHandler(async (req, res) => {
  try {
    const { id, kid_id, ...rest } = req.body;
    await KidsDetail.update({ ...rest, is_progressbar: 50 }, { where: { id: kid_id } });
    await kidClothingType.update({ ...rest }, { where: { kid_id } });
    await KidSizeFit.update({ ...rest }, { where: { kid_id } });
    //-- okay
    console.log('API_editKidStyleFit_200:', 'Style Fit of Kid Fit Profile has been saved');
    res.status(200).send('Style Fit of Kid Fit Profile has been saved');
  } catch (e) {
    console.log('API_editKidStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidStyleFit = asyncHandler(async (req, res) => {
  try {
    let { kid_count } = req.body;
    let user_id = req.user.id;
    let kidFPStyle, kidFit, kidsDetail;
    kidsDetail = await KidsDetail.findOne({
      where: { user_id, kid_count },
      attributes: [
        'id',
        'kids_frequency_dance',
        'kids_frequency_playing_outside',
        'kids_frequency_musical_instruments',
        'kids_frequency_reading',
        'kids_frequency_arts_and_crafts',
        'kids_frequency_biking'
      ]
    });
    let kid_id = kidsDetail.id;

    kidFPStyle = await kidClothingType.findOne({
      where: {
        kid_id
      }
    });
    if (!kidFPStyle) {
      kidFPStyle = await kidClothingType.create({
        user_id,
        kid_id
      });
    }
    kidFit = await KidSizeFit.findOne({
      where: { kid_id }
    });
    if (!kidFit) {
      kidFit = await KidSizeFit.create({
        user_id,
        kid_id
      });
    }
    console.log('API_getKidStyleFit_200:', 'Style Fit of Kid Fit Profile is retrieved');
    res.status(200).json({ ...kidFit.dataValues, ...kidsDetail.dataValues, ...kidFPStyle.dataValues });
  } catch (e) {
    console.log('API_getKidStyleFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidPriceRange = asyncHandler(async (req, res) => {
  try {
    const { id, kid_count, user_id, ...rest } = req.body;
    await KidsDetail.update({ is_progressbar: 75 }, { where: { kid_count, user_id } });
    await KidStyle.update({ ...rest }, { where: { id } });

    //-- okay
    console.log('API_editKidPriceRange_200:', 'Price Range of Kid Fit Profile has been saved');
    res.status(200).send('Price Range of Kid Fit Profile has been saved');
  } catch (e) {
    console.log('API_editKidPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidPriceRange = asyncHandler(async (req, res) => {
  try {
    let { kid_count } = req.body;
    let user_id = req.user.id;
    let kidsDetail = await KidsDetail.findOne({
      where: { user_id, kid_count }
    });
    let kid_id = kidsDetail.id;
    let kidsPriceValue = await KidStyle.findOne({
      where: { kid_id }
    });
    if (!kidsPriceValue) {
      kidsPriceValue = await KidStyle.create({
        user_id,
        kid_id
      });
    }
    console.log('API_getKidPriceRange_200:', 'Price Range of Kid Fit Profile is retrieved');
    res.status(200).send(kidsPriceValue);
  } catch (e) {
    console.log('API_getKidPriceRange_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editKidCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { brands, kid_id, ...rest } = req.body;
    await KidStyle.update({ brands }, { where: { kid_id } });
    console.log('API_editKidCustomDsgnBrand_200:', 'Custom Design & Brands of Kid Fit Profile has been saved');
    res.status(200).send('Custom Design & Brands of Kid Fit Profile has been saved');
  } catch (e) {
    console.log('API_editKidCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidCustomDsgnBrand = asyncHandler(async (req, res) => {
  try {
    let { kid_count } = req.body;
    let user_id = req.user.id;
    let kidsDetail = await KidsDetail.findOne({
      where: { user_id, kid_count }
    });
    let kid_id = kidsDetail.id;
    let kidCustomValues = await KidStyle.findOne({
      where: { kid_id },
      attributes: ['profile_note', 'brands']
    });
    let kidImgUrl = await CustomDesign.findOne({
      kid_id
    });
    if (kidImgUrl) {
      kidImgUrl = await CustomDesign.create({
        user_id,
        kid_id
      });
    }
    console.log('API_getKidCustomDsgnBrand_200:', 'Custom Design & Brands of Kid Fit Profile is retrieved');
    res.status(200).json({ ...kidCustomValues.dataValues, ...kidImgUrl.dataValues });
  } catch (e) {
    console.log('API_getKidCustomDsgnBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addKidBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user.id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log('API_addKidBillingInfo_400:', 'Invalid access of mismatching child order');
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = sequelize.model('Kids', kidSchema);
    const KgFitProfileModel = sequelize.model('KgFitProfile', kgFitProfileSchema);
    const KbFitProfileModel = sequelize.model('KbFitProfile', kbFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_addKidBillingInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if ((gender === 1 && reqUrl.includes('/girl/')) || (gender === 2 && reqUrl.includes('/boy/'))) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_addKidBillingInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const kidId = kid.id;
    const KidFitProfileModel = gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let fpStatus = { id: null, isNew: null };
    let kidFP = null;
    let newKidFP = null;
    let fpBillingInfo = null;
    kidFP = await KidFitProfileModel.findOne({ kidId });
    if (!kidFP) {
      //-- add new
      newKidFP = await KidFitProfileModel.create({ kidId });
      if (!newKidFP) {
        console.log('API_addKidBillingInfo_400:', 'Failed to create base of Kid Fit Profile');
        return res.status(400).json({
          msg: 'Failed to create base of Kid Fit Profile'
        });
      }
      fpStatus = { id: newKidFP.id, isNew: true };
    } else {
      //-- modify existing one
      fpStatus = { id: kidFP.id, isNew: false };
    }
    const { ...rest } = req.body;
    const billingInfoFields = {
      ...rest,
      profileId: fpStatus.id
    };
    //-- create
    fpBillingInfo = await FitProfileBillingInfoModel.create(billingInfoFields);
    if (!fpBillingInfo) {
      console.log('API_addKidBillingInfo_400:', 'Failed to add Billing Info of Kid Fit Profile');
      return res.status(400).json({
        msg: 'Failed to add Billing Info of Kid Fit Profile'
      });
    }
    if (fpStatus.isNew) {
      newKidFP.inputStatus.billingInfo = {
        itemIDs: [{ itemId: fpBillingInfo.id }],
        isComplete: true
      };
      await newKidFP.save();
    } else {
      kidFP.inputStatus.billingInfo.itemIDs.push({
        itemId: fpBillingInfo.id
      });
      kidFP.inputStatus.billingInfo.isComplete = true;
      await kidFP.save();
    }
    //-- okay
    console.log('API_addKidBillingInfo_200:', 'Billing Info of Kid Fit Profile has been added');
    res.status(200).send(fpBillingInfo);
  } catch (e) {
    console.log('API_addKidBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBillingInfosAll = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user.id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log('API_getKidBillingInfosAll_400:', 'Invalid access of mismatching child order');
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = sequelize.model('Kids', kidSchema);
    const KgFitProfileModel = sequelize.model('KgFitProfile', kgFitProfileSchema);
    const KbFitProfileModel = sequelize.model('KbFitProfile', kbFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidBillingInfosAll_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if ((gender === 1 && reqUrl.includes('/girl/')) || (gender === 2 && reqUrl.includes('/boy/'))) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidBillingInfosAll_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const KidFitProfileModel = gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpBillingInfos = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid.id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidBillingInfosAll_200:', 'No Kid Fit Profile yet');
      return res.status(200).json([]);
    }
    const fpBiIsComplete = kidFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfos = await FitProfileBillingInfoModel.find({ profileId: kidFP.id }, { __v: 0, profileId: 0 }).sort({
      updatedAt: -1
    });
    if (!fpBillingInfos) {
      console.log('API_getKidBillingInfosAll_400:', 'Failed to get all Billing Infos of Kid Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get all Billing Infos of Kid Fit Profile'
      });
    }
    if (!fpBillingInfos.length) {
      //-- no billing info exists
      if (fpBiIsComplete) {
        //-- adjust wrong status
        kidFP.inputStatus.billingInfo = {
          itemIDs: [],
          isComplete: false
        };
        await kidFP.save();
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
        kidFP.inputStatus.billingInfo.itemIDs = tmpIDs;
        kidFP.inputStatus.billingInfo.isComplete = true;
        await kidFP.save();
      }
    }
    //-- okay
    console.log('API_getKidBillingInfosAll_200:', 'All Billing Infos of Kid Fit Profile are retrieved');
    res.status(200).json(fpBillingInfos);
  } catch (e) {
    console.log('API_getKidBillingInfosAll_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getKidBillingInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user.id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      console.log('API_getKidBillingInfo_400:', 'Invalid access of mismatching child order');
      return res.status(400).json({
        msg: 'Invalid access of mismatching child order'
      });
    }
    const KidsModel = sequelize.model('Kids', kidSchema);
    const KgFitProfileModel = sequelize.model('KgFitProfile', kgFitProfileSchema);
    const KbFitProfileModel = sequelize.model('KbFitProfile', kbFitProfileSchema);
    const FitProfileBillingInfoModel = sequelize.model('FitProfileBillingInfo', fitProfileBillingInfoSchema);
    //-- check child's existence
    const kid = await KidsModel.findOne({
      parentId: userId,
      kidOrder: order
    });
    if (!kid) {
      console.log('API_getKidBillingInfo_400:', 'No child exists');
      return res.status(400).json({
        msg: 'No child exists'
      });
    }
    const gender = kid.gender;
    const reqUrl = req.originalUrl;
    let isValidRequest = false;
    if ((gender === 1 && reqUrl.includes('/girl/')) || (gender === 2 && reqUrl.includes('/boy/'))) {
      isValidRequest = true;
    }
    if (!isValidRequest) {
      console.log('API_getKidBillingInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- now, billing info
    const KidFitProfileModel = gender === 1 ? KgFitProfileModel : KbFitProfileModel;
    let kidFP = null;
    let fpBillingInfo = null;
    kidFP = await KidFitProfileModel.findOne({
      kidId: kid.id
    });
    if (!kidFP) {
      //-- no fit profile yet
      console.log('API_getKidBillingInfo_200:', 'No Kid Fit Profile yet');
      return res.status(200).json(null);
    }
    const fpBiIsComplete = kidFP?.inputStatus?.billingInfo?.isComplete;
    fpBillingInfo = await FitProfileBillingInfoModel.findOne(
      {
        id: req.params.id,
        profileId: kidFP.id
      },
      { __v: 0, profileId: 0 }
    );
    if (!fpBillingInfo) {
      console.log('API_getKidBillingInfo_400:', 'Failed to get Billing Info of Kid Fit Profile');
      return res.status(400).json({
        msg: 'Failed to get Billing Info of Kid Fit Profile'
      });
    }
    if (!fpBiIsComplete) {
      //-- adjust wrong status
      let tmpIDs = [...kidFP?.inputStatus?.billingInfo?.itemIDs];
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
      kidFP.inputStatus.billingInfo.itemIDs = tmpIDs;
      kidFP.inputStatus.billingInfo.isComplete = true;
      await kidFP.save();
    }
    //-- okay
    console.log('API_getKidBillingInfo_200:', 'Billing Info of Kid Fit Profile is retrieved');
    res.status(200).json(fpBillingInfo);
  } catch (e) {
    console.log('API_getKidBillingInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editKidBasicInfo,
  getKidBasicInfo,
  editKidStyleFit,
  getKidStyleFit,
  editKidPriceRange,
  getKidPriceRange,
  editKidCustomDsgnBrand,
  getKidCustomDsgnBrand,
  addKidBillingInfo,
  getKidBillingInfosAll,
  getKidBillingInfo
};
