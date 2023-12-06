/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as productCtrl from '../../controllers/supply/productCtrl.js';
import { protectSupplier } from '../../middleware/authMdware.js';

const productRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/add
 * @access private
 * @desc Add supplier product in supplier dashboard
 */
productRoutes.route('/add').post(protectSupplier, productCtrl.addSplProduct);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/check/before/upsert
 * @access private
 * @desc Check supplier product existence with same category before add in supplier dashboard
 */
productRoutes.route('/check/before/upsert').post(protectSupplier, productCtrl.chkSplProdBeforeUpsert);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/tbllist
 * @access private
 * @desc List supplier products in table format in supplier dashboard
 */
productRoutes.route('/tbllist').post(protectSupplier, productCtrl.listSplProductsTable);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/addmore/stock
 * @access private
 * @desc Add more stock of supplier products in supplier dashboard
 */
productRoutes.route('/addmore/stock').post(protectSupplier, productCtrl.addMoreSplProdStock);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/manualdeduct/stock
 * @access private
 * @desc Deduct stock of supplier products manually in supplier dashboard
 */
productRoutes.route('/manualdeduct/stock').post(protectSupplier, productCtrl.manualDeductSplProdStock);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/edit
 * @access private
 * @desc Edit supplier product in supplier dashboard
 */
productRoutes.route('/edit').post(protectSupplier, productCtrl.editSplProduct);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/delete
 * @access private
 * @desc Delete supplier product in supplier dashboard
 */
productRoutes.route('/delete').post(protectSupplier, productCtrl.deleteSplProduct);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/deduct/details/tbllist
 * @access private
 * @desc List supplier product used(deduct) details in table format in supplier dashboard
 */
productRoutes.route('/deduct/details/tbllist').post(protectSupplier, productCtrl.listSplProdDeductDetailsTable);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/splproduct/deduct/summary/tbllist
 * @access private
 * @desc List supplier product used(deduct) summary in table format in supplier dashboard
 */
productRoutes.route('/deduct/summary/tbllist').post(protectSupplier, productCtrl.listSplProdDeductSummaryTable);

export default productRoutes;
