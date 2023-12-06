/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as masterSupportCtrl from '../../controllers/admin/masterSupportCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const masterSupportRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/master-support/paid
 * @access private
 * @desc get the career
 */
masterSupportRoutes.route('/paid').post(protectAdmin, masterSupportCtrl.getCustomPaidList);

/**
 * @method POST
 * @route dfnew/admmain/manage/master-support/previous
 * @access private
 * @desc add the career
 */
masterSupportRoutes.route('/previous').post(protectAdmin, masterSupportCtrl.getPreviewWorkList);

export default masterSupportRoutes;
