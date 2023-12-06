/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as cmsCtrl from '../../controllers/admin/cmsCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const cmsRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/cms/tbllist
 * @access private
 * @desc get the customer paid list
 */
cmsRoutes.route('/tbllist').get(protectAdmin, cmsCtrl.getCMS);
/**
 * @method POST
 * @route dfnew/admmain/manage/cms/update
 * @access private
 * @desc get the customer paid list
 */
cmsRoutes.route('/update').post(protectAdmin, cmsCtrl.updateCMS);

export default cmsRoutes;
