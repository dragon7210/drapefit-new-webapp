/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as productCategoryCtrl from '../../controllers/supply/productCategoryCtrl.js';
import { protectSupplier } from '../../middleware/authMdware.js';

const productCategoryRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/admsupplier/manage/category/add
 * @access private
 * @desc Add supplier product category in supplier dashboard
 */
productCategoryRoutes.route('/add').post(protectSupplier, productCategoryCtrl.addSplProdCategory);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/category/edit
 * @access private
 * @desc Edit supplier product category in supplier dashboard
 */
productCategoryRoutes.route('/edit').post(protectSupplier, productCategoryCtrl.editSplProdCategory);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/category/delete
 * @access private
 * @desc Delete supplier product category in supplier dashboard
 */
productCategoryRoutes.route('/delete').post(protectSupplier, productCategoryCtrl.deleteSplProdCategory);

/**
 * @method GET
 * @route dfnew/admsupplier/manage/categories
 * @access private
 * @desc Get supplier product categories in supplier dashboard
 */
productCategoryRoutes.route('/tbllist').get(protectSupplier, productCategoryCtrl.getSplProdCategories);

export default productCategoryRoutes;
