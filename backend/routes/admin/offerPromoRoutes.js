/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as offerPromoCtrl from '../../controllers/admin/offerPromoCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const offerPromoRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/offerPromocode/tbllist
 * @access private
 * @desc get the offerPromocode
 */
offerPromoRoutes.route('/tbllist').get(protectAdmin, offerPromoCtrl.getOfferPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/offerPromocode/add
 * @access private
 * @desc add the offerPromocode
 */
offerPromoRoutes.route('/add').post(protectAdmin, offerPromoCtrl.addOfferPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/offerPromocode/del
 * @access private
 * @desc delete the offerPromocode
 */
offerPromoRoutes.route('/del').post(protectAdmin, offerPromoCtrl.delOfferPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/offerPromocode/update
 * @access private
 * @desc Update the offerPromocode
 */
offerPromoRoutes.route('/update').post(protectAdmin, offerPromoCtrl.updateOfferPromocode);
export default offerPromoRoutes;
