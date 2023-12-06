/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as productCtrl from '../../controllers/admin/productCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const productRoutes = express.Router();
/**
 * @method Get
 * @route dfnew/admmain/manage/exchageProduct/tblist
 * @access private
 * @desc get the exchange products
 */
productRoutes.route('/exchageProduct/tblist').get(protectAdmin, productCtrl.getExchangeProduct);
/**
 * @method Get
 * @route dfnew/admmain/manage/declineProduct/tblist
 * @access private
 * @desc get the decline products
 */
productRoutes.route('/declineProduct/tblist').get(protectAdmin, productCtrl.getDeclineProduct);
/**
 * @method Post
 * @route dfnew/admmain/manage/scanProduct/tblist
 * @access private
 * @desc scan the products
 */
productRoutes.route('/scanProduct/tblist').post(protectAdmin, productCtrl.scanProduct);
/**
 * @method Post
 * @route dfnew/admmain/manage/scan/change
 * @access private
 * @desc change the scan products
 */
productRoutes.route('/scan/change').post(protectAdmin, productCtrl.changeScanProduct);

/**
 * @method GET
 * @route dfnew/admmain/manage/finance-report/tblist
 * @access private
 * @desc change the scan products
 */
productRoutes.route('/finance-report/tblist').get(protectAdmin, productCtrl.getDefaultCustomer);

export default productRoutes;
