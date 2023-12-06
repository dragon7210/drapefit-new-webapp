/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as salestaxCtrl from '../../controllers/admin/salestaxCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const salesTaxRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/add
 * @access private
 * @desc Add sales tax info over state in admin dashboard
 */
salesTaxRoutes.route('/add').post(protectAdmin, salestaxCtrl.addStateSalesTax);

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/tbllist
 * @access private
 * @desc List sales tax info in table format in admin dashboard
 */
salesTaxRoutes.route('/tbllist').get(protectAdmin, salestaxCtrl.listStateSalesTaxTable);

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/edit
 * @access private
 * @desc Edit sales tax info over state in admin dashboard
 */
salesTaxRoutes.route('/edit').post(protectAdmin, salestaxCtrl.editStateSalesTax);

/**
 * @method POST
 * @route dfnew/admmain/manage/state/salestax/delete
 * @access private
 * @desc Delete sales tax info over state in admin dashboard
 */
salesTaxRoutes.route('/delete').post(protectAdmin, salestaxCtrl.deleteStateSalesTax);

export default salesTaxRoutes;
