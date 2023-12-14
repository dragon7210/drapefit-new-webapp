/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as initialCtrl from '../../controllers/admin/initialCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const initialRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/initial/tbllist
 * @access private
 * @desc get the initial
 */
initialRoutes.route('/tbllist').get(protectAdmin, initialCtrl.getInitial);

export default initialRoutes;
