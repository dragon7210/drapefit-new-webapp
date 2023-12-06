/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as promoCtrl from '../../controllers/admin/promoCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const promocodeRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/promocode/tbllist
 * @access private
 * @desc get the promocode
 */
promocodeRoutes.route('/tbllist').get(protectAdmin, promoCtrl.getPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/promocode/add
 * @access private
 * @desc add the promocode
 */
promocodeRoutes.route('/add').post(protectAdmin, promoCtrl.addPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/promocode/del
 * @access private
 * @desc delete the promocode
 */
promocodeRoutes.route('/del').post(protectAdmin, promoCtrl.delPromocode);

/**
 * @method POST
 * @route dfnew/admmain/manage/promocode/update
 * @access private
 * @desc Update the promocode
 */
promocodeRoutes.route('/update').post(protectAdmin, promoCtrl.updatePromocode);
export default promocodeRoutes;
