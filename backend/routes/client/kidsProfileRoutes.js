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
import * as kidsProfileCtrl from '../../controllers/client/kidsProfileCtrl.js';

const kidsProfileRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/kidsprofile/basicinfo/edit
 * @access private
 * @desc Edit (Add/Modify) basic information of child's fit profile
 */
kidsProfileRoutes.route('/basicinfo/edit').post(protect, kidsProfileCtrl.editKidBasicInfo);

/**
 * @method GET
 * @route dfnew/kidsprofile/basicinfo
 * @access private
 * @desc Get child's basic information of fit profile
 */
kidsProfileRoutes.route('/basicinfo').post(protect, kidsProfileCtrl.getKidBasicInfo);

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit/edit
 * @access private
 * @desc Edit (Add/Modify) style fit of Girl child's fit profile
 */
kidsProfileRoutes.route('/stylefit/edit').post(protect, kidsProfileCtrl.editKidStyleFit);

/**
 * @method POST
 * @route dfnew/kidsprofile/stylefit
 * @access private
 * @desc POST Girl child's style fit of fit profile
 */
kidsProfileRoutes.route('/stylefit').post(protect, kidsProfileCtrl.getKidStyleFit);

/**
 * @method POST
 * @route dfnew/kidsprofile/pricerange/kid/edit
 * @access private
 * @desc Edit (Add/Modify) price range of Girl child's fit profile
 */
kidsProfileRoutes.route('/pricerange/kid/edit').post(protect, kidsProfileCtrl.editKidPriceRange);

/**
 * @method GET
 * @route dfnew/kidsprofile/pricerange/kid
 * @access private
 * @desc Get Boy child's price range of fit profile
 */
kidsProfileRoutes.route('/pricerange/kid').post(protect, kidsProfileCtrl.getKidPriceRange);

/**
 * @method POST
 * @route dfnew/kidsprofile/customdsgnbrand/kid/edit
 * @access private
 * @desc Edit (Add/Modify) custom design & brands of Girl child's fit profile
 */
kidsProfileRoutes.route('/customdsgnbrand/kid/edit').post(protect, kidsProfileCtrl.editKidCustomDsgnBrand);

/**
 * @method GET
 * @route dfnew/kidsprofile/customdsgnbrand/kid
 * @access private
 * @desc Get Girl child's custom design & brands of fit profile
 */
kidsProfileRoutes.route('/customdsgnbrand/kid').post(protect, kidsProfileCtrl.getKidCustomDsgnBrand);


// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/girl/:order/edit
//  * @access private
//  * @desc Edit (Add/Modify) shipping address of Girl child's fit profile
//  */
// kidsProfileRoutes.route('/shipaddress/girl/:order/edit').post(protect, kidsProfileCtrl.editKidShipAddress);

// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/boy/:order/edit
//  * @access private
//  * @desc Edit (Add/Modify) shipping address of Boy child's fit profile
//  */
// kidsProfileRoutes.route('/shipaddress/boy/:order/edit').post(protect, kidsProfileCtrl.editKidShipAddress);

// /**
//  * @method GET
//  * @route dfnew/kidsprofile/shipaddresses/girl/:order/all
//  * @access private
//  * @desc Get Girl child's all ship addresses of fit profile
//  */
// kidsProfileRoutes.route('/shipaddresses/girl/:order/all').get(protect, kidsProfileCtrl.getKidShipAddressesAll);

// /**
//  * @method GET
//  * @route dfnew/kidsprofile/shipaddresses/boy/:order/all
//  * @access private
//  * @desc Get Boy child's all ship addresses of fit profile
//  */
// kidsProfileRoutes.route('/shipaddresses/boy/:order/all').get(protect, kidsProfileCtrl.getKidShipAddressesAll);

// /**
//  * @method GET
//  * @route dfnew/kidsprofile/shipaddress/girl/:order/:id
//  * @access private
//  * @desc Get Girl child's ship address of fit profile by ID
//  */
// kidsProfileRoutes.route('/shipaddress/girl/:order/:id').get(protect, kidsProfileCtrl.getKidShipAddress);

// /**
//  * @method GET
//  * @route dfnew/kidsprofile/shipaddress/boy/:order/:id
//  * @access private
//  * @desc Get Boy child's ship address of fit profile by ID
//  */
// kidsProfileRoutes.route('/shipaddress/boy/:order/:id').get(protect, kidsProfileCtrl.getKidShipAddress);

// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/girl/:order/delete/:id
//  * @access private
//  * @desc Delete Girl child's ship address of fit profile by ID
//  */
// kidsProfileRoutes.route('/shipaddress/girl/:order/delete/:id').post(protect, kidsProfileCtrl.deleteKidShipAddress);

// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/boy/:order/delete/:id
//  * @access private
//  * @desc Delete Boy child's ship address of fit profile by ID
//  */
// kidsProfileRoutes.route('/shipaddress/boy/:order/delete/:id').post(protect, kidsProfileCtrl.deleteKidShipAddress);

// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/girl/:order/setdefault/:id
//  * @access private
//  * @desc Set Girl child's ship address of fit profile as Default by ID
//  */
// kidsProfileRoutes
//   .route('/shipaddress/girl/:order/setdefault/:id')
//   .post(protect, kidsProfileCtrl.setKidShipAddressDefault);

// /**
//  * @method POST
//  * @route dfnew/kidsprofile/shipaddress/boy/:order/setdefault/:id
//  * @access private
//  * @desc Set Boy child's ship address of fit profile as Default by ID
//  */
// kidsProfileRoutes
//   .route('/shipaddress/boy/:order/setdefault/:id')
//   .post(protect, kidsProfileCtrl.setKidShipAddressDefault);

/**
 * @method POST
 * @route dfnew/kidsprofile/billinginfo/girl/:order/add
 * @access private
 * @desc Add card payment billing info of Girl child's fit profile
 */
kidsProfileRoutes.route('/billinginfo/girl/:order/add').post(protect, kidsProfileCtrl.addKidBillingInfo);

/**
 * @method POST
 * @route dfnew/kidsprofile/billinginfo/boy/:order/add
 * @access private
 * @desc Add card payment billing info of Boy child's fit profile
 */
kidsProfileRoutes.route('/billinginfo/boy/:order/add').post(protect, kidsProfileCtrl.addKidBillingInfo);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfos/girl/:order/all
 * @access private
 * @desc Get Girl child's all billing infos of fit profile
 */
kidsProfileRoutes.route('/billinginfos/girl/:order/all').get(protect, kidsProfileCtrl.getKidBillingInfosAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfos/boy/:order/all
 * @access private
 * @desc Get Boy child's all billing infos of fit profile
 */
kidsProfileRoutes.route('/billinginfos/boy/:order/all').get(protect, kidsProfileCtrl.getKidBillingInfosAll);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfo/girl/:order/:id
 * @access private
 * @desc Get Girl child's billing info of fit profile by ID
 */
kidsProfileRoutes.route('/billinginfo/girl/:order/:id').get(protect, kidsProfileCtrl.getKidBillingInfo);

/**
 * @method GET
 * @route dfnew/kidsprofile/billinginfo/boy/:order/:id
 * @access private
 * @desc Get Boy child's billing info of fit profile by ID
 */
kidsProfileRoutes.route('/billinginfo/boy/:order/:id').get(protect, kidsProfileCtrl.getKidBillingInfo);

export default kidsProfileRoutes;
