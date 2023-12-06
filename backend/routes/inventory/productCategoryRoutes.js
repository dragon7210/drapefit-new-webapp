/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { productCategoryCtrl } from '../../controllers/inventory/index.js';
import { protectInventory } from '../../middleware/authMdware.js';

const productCategoryRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/add
 * @access private
 * @desc Add category of inventory product in inventory dashboard
 */
productCategoryRoutes.route('/add').post(protectInventory, productCategoryCtrl.addInvProdType);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/tbllist
 * @access private
 * @desc List categories of inventory product in table format in inventory dashboard
 */
productCategoryRoutes.route('/tbllist').get(protectInventory, productCategoryCtrl.getInvProdTypes);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/edit
 * @access private
 * @desc Edit category of inventory product in inventory dashboard
 */
productCategoryRoutes.route('/edit').post(protectInventory, productCategoryCtrl.editInvProdType);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/delete
 * @access private
 * @desc Delete category of inventory product in inventory dashboard
 */
productCategoryRoutes.route('/delete').post(protectInventory, productCategoryCtrl.deleteInvProdType);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/category/subCategories
 * @access private
 * @desc Delete category of inventory product in inventory dashboard
 */
productCategoryRoutes.route('/subCategories').post(protectInventory, productCategoryCtrl.getSubCategories);

export default productCategoryRoutes;
