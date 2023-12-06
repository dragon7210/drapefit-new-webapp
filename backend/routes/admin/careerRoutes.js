/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as careerCtrl from '../../controllers/admin/careerCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const careerRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/career/tbllist
 * @access private
 * @desc get the career
 */
careerRoutes.route('/tbllist').get(protectAdmin, careerCtrl.getCareer);

/**
 * @method POST
 * @route dfnew/admmain/manage/career/add
 * @access private
 * @desc add the career
 */
careerRoutes.route('/add').post(protectAdmin, careerCtrl.addCareer);

/**
 * @method POST
 * @route dfnew/admmain/manage/career/del
 * @access private
 * @desc delete the career
 */
careerRoutes.route('/del').post(protectAdmin, careerCtrl.delCareer);

/**
 * @method POST
 * @route dfnew/admmain/manage/career/update
 * @access private
 * @desc Update the career
 */
careerRoutes.route('/update').post(protectAdmin, careerCtrl.updateCareer);

export default careerRoutes;
