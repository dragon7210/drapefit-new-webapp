import express from 'express';
import { protect } from '../../middleware/authMdware.js';
import * as menProfileCtrl from '../../controllers/client/menProfileCtrl.js';

const menProfileRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/men/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of men fit profile
 */
menProfileRoutes.route('/basicinfo/men/edit').post(protect, menProfileCtrl.editMenBasicInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/basicinfo/men
 * @access private
 * @desc Get male user's basic information of men fit profile
 */
menProfileRoutes.route('/basicinfo/men').post(protect, menProfileCtrl.getMenBasicInfo);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/men/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of men fit profile
 */
menProfileRoutes.route('/stylefit/men/edit').post(protect, menProfileCtrl.editMenStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/stylefit/men
 * @access private
 * @desc Get male user's style fit of men fit profile
 */
menProfileRoutes.route('/stylefit/men').post(protect, menProfileCtrl.getMenStyleFit);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/men/edit
 * @access private
 * @desc Edit (Add/Modify) price range of men fit profile
 */
menProfileRoutes.route('/pricerange/men/edit').post(protect, menProfileCtrl.editMenPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/pricerange/men
 * @access private
 * @desc Get male user's price range of men fit profile
 */
menProfileRoutes.route('/pricerange/men').post(protect, menProfileCtrl.getMenPriceRange);

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/men/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of men fit profile
 */
menProfileRoutes.route('/customdsgnbrand/men/edit').post(protect, menProfileCtrl.editMenCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/fitprofile/customdsgnbrand/men
 * @access private
 * @desc Get male user's custom design & brands of men fit profile
 */
menProfileRoutes.route('/customdsgnbrand/men').post(protect, menProfileCtrl.getMenCustomDsgnBrand);

/**
 * @method POST
 * @route dfnew/fitprofile/billinginfo/men/add
 * @access private
 * @desc Add card payment billing info of men fit profile
 */
menProfileRoutes.route('/billinginfo/men/add').post(protect, menProfileCtrl.addMenBillingInfo);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfos/men/all
 * @access private
 * @desc Get male user's all billing infos of men fit profile
 */
menProfileRoutes.route('/billinginfos/men/all').get(protect, menProfileCtrl.getMenBillingInfosAll);

/**
 * @method GET
 * @route dfnew/fitprofile/billinginfo/men/:id
 * @access private
 * @desc Get male user's billing info of men fit profile by ID
 */
menProfileRoutes.route('/billinginfo/men/:id').get(protect, menProfileCtrl.getMenBillingInfo);

export default menProfileRoutes;
