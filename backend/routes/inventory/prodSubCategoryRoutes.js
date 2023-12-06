/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { prodSubCategoryCtrl } from '../../controllers/inventory/index.js';
import { protectInventory } from '../../middleware/authMdware.js';

const prodSubCategoryRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subCategory/add
 * @access private
 * @desc Add sub-category (rack) of inventory product in inventory dashboard
 */
prodSubCategoryRoutes.route('/add').post(protectInventory, prodSubCategoryCtrl.addInvProdSubCategoryRack);

/**
 * @method Get
 * @route dfnew/adminventory/manage/product/subcategory/tbllist
 * @access private
 * @desc List sub-categories of inventory product in inventory dashboard
 */
prodSubCategoryRoutes.route('/tbllist').get(protectInventory, prodSubCategoryCtrl.getInvProdSubCategories);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/edit
 * @access private
 * @desc Edit sub-category (rack) of inventory product in inventory dashboard
 */
prodSubCategoryRoutes.route('/edit').post(protectInventory, prodSubCategoryCtrl.editInvProdSubCategoryRack);

/**
 * @method POST
 * @route dfnew/adminventory/manage/product/subcategory/delete
 * @access private
 * @desc Delete sub-category (rack) of inventory product in inventory dashboard
 */
prodSubCategoryRoutes.route('/delete').post(protectInventory, prodSubCategoryCtrl.deleteInvProdSubCategoryRack);
export default prodSubCategoryRoutes;
