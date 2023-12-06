/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { protect } from '../../middleware/authMdware.js';
import * as womenProfileCtrl from '../../controllers/client/womenProfileCtrl.js';

const womenProfileRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/women/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of women fit profile
 */
womenProfileRoutes.route('/basicinfo/women/edit').post(protect, womenProfileCtrl.editWomenFPBasicInfo);

/**
 * @method PosT
 * @route dfnew/fitprofile/basicinfo/women
 * @access private
 * @desc Get female user's basic information of women fit profile
 */
womenProfileRoutes.route('/basicinfo/women').post(protect, womenProfileCtrl.getWomenFPBasicInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/women/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of women fit profile
 */
womenProfileRoutes.route('/stylefit/women/edit').post(protect, womenProfileCtrl.editWomenFPStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/women
 * @access private
 * @desc Get female user's style fit of women fit profile
 */
womenProfileRoutes.route('/stylefit/women').post(protect, womenProfileCtrl.getWomenFPStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/women/edit
 * @access private
 * @desc Edit (Add/Modify) price range of women fit profile
 */
womenProfileRoutes.route('/pricerange/women/edit').post(protect, womenProfileCtrl.editWomenFPPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/women
 * @access private
 * @desc Get female user's price range of women fit profile
 */
womenProfileRoutes.route('/pricerange/women').post(protect, womenProfileCtrl.getWomenFPPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/women/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of women fit profile
 */
womenProfileRoutes.route('/customdsgnbrand/women/edit').post(protect, womenProfileCtrl.editWomenFPCustomDsgnBrand);

/**
 * @method PoST
 * @route dfnew/fitprofile/customdsgnbrand/women
 * @access private
 * @desc Get female user's custom design & brands of women fit profile
 */
womenProfileRoutes.route('/customdsgnbrand/women').post(protect, womenProfileCtrl.getWomenFPCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/fitprofile/billinginfo/women/add
 * @access private
 * @desc Add card payment billing info of women fit profile
 */
womenProfileRoutes.route('/billinginfo/women/add').post(protect, womenProfileCtrl.addWomenFPBillingInfo);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfos/women/all
 * @access private
 * @desc Get female user's all billing infos of women fit profile
 */
womenProfileRoutes.route('/billinginfos/women/all').get(protect, womenProfileCtrl.getWomenFPBillingInfosAll);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfo/women/:id
 * @access private
 * @desc Get female user's billing info of women fit profile by ID
 */
womenProfileRoutes.route('/billinginfo/women/:id').get(protect, womenProfileCtrl.getWomenFPBillingInfo);

export default womenProfileRoutes;
