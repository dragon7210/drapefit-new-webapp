/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { productCtrl } from '../../controllers/inventory/index.js';
import { protectInventory } from '../../middleware/authMdware.js';

const productRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/add
 * @access private
 * @desc Add inventory products in inventory dashboard
 */
productRoutes.route('/add').post(protectInventory, productCtrl.addInvProduct);
/**
 * @method POST
 * @route dfnew/adminventory/manage/product/edit
 * @access private
 * @desc Edit inventory products in inventory dashboard
 */
productRoutes.route('/edit').post(protectInventory, productCtrl.editInvProduct);
/**
 * @method POST
 * @route dfnew/adminventory/manage/product/tbllist
 * @access private
 * @desc List inventory products in inventory dashboard
 */
productRoutes.route('/tbllist').post(protectInventory, productCtrl.listInvProductsTable);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/delete
 * @access private
 * @desc Delete inventory product in inventory dashboard
 */
productRoutes.route('/delete').post(protectInventory, productCtrl.deleteInvProduct);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/toggleactive
 * @access private
 * @desc Toggle active/inactive status of inventory product for men in inventory dashboard
 */
productRoutes.route('/toggleactive').post(protectInventory, productCtrl.toggleInvProductActive);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/report/tbllist
 * @access private
 * @desc Make report of list type for inventory products in inventory dashboard
 */
productRoutes.route('/report/tbllist').post(protectInventory, productCtrl.reportInvProductsTbllist);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/summary/men/tbllist
 * @access private
 * @desc Summarize list of inventory products for men in inventory dashboard
 */
productRoutes.route('/report/summary').post(protectInventory, productCtrl.summaryInvProductsListForMen);
/**
 * @method POST
 * @route dfnew/adminventory/manage/product/individual
 * @access private
 * @desc Summarize list of inventory products for men in inventory dashboard
 */
productRoutes.route('/individual').post(protectInventory, productCtrl.getIndProduct);

/**
 * @method GET
 * @route dfnew/adminventory/manage/product/manual
 * @access private
 * @desc Summarize list of inventory products for men in inventory dashboard
 */
productRoutes.route('/manual').get(protectInventory, productCtrl.getManualProduct);

export default productRoutes;
