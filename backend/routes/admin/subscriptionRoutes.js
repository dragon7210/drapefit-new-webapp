/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { protectAdmin } from '../../middleware/authMdware.js';
import * as subscriptionCtrl from '../../controllers/admin/subscriptionCtrl.js';

const subscriptionRoutes = express.Router();

/**
 * @method GET
 * @route dfnew/admmain/manage/subscription/tbllist
 * @access private
 * @desc get the subscription
 */
subscriptionRoutes.route('/tbllist').get(protectAdmin, subscriptionCtrl.getLetsPlanYourFirstFix);
/**
 * @method Post
 * @route dfnew/admmain/manage/subscription/update
 * @access private
 * @desc edit the subscription
 */
subscriptionRoutes.route('/update').post(protectAdmin, subscriptionCtrl.updateLetsPlanYourFirstFix);

export default subscriptionRoutes;
