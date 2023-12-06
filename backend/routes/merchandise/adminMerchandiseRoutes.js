import express from 'express';
import { protectMerchandise } from '../../middleware/authMdware.js';
// import mercha

import * as admMerchandiseCtrl from '../../controllers/merchandise/admMerchandiseCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/create
 * @access private
 * @desc Add employee
 */
router.route('/manage/employee/create').post(protectMerchandise, admMerchandiseCtrl.createEmployee);
/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/tbllist
 * @access private
 * @desc View employee
 */
router.route('/manage/employee/tbllist').post(protectMerchandise, admMerchandiseCtrl.getEmployee);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/changepwd
 * @access private
 * @desc Change the password
 */
router.route('/manage/employee/changepwd').post(protectMerchandise, admMerchandiseCtrl.changePwdEmployee);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/delete
 * @access private
 * @desc Delete the employee
 */
router.route('/manage/employee/delete').post(protectMerchandise, admMerchandiseCtrl.deleteEmployee);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/toggleactive
 * @access private
 * @desc toggle active the employee
 */
router.route('/manage/employee/toggleactive').post(protectMerchandise, admMerchandiseCtrl.toggleactiveEmployee);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/employee/edit
 * @access private
 * @desc Edit the employee
 */
router.route('/manage/employee/edit').post(protectMerchandise, admMerchandiseCtrl.editEmployee);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/brand/create
 * @access private
 * @desc Create the brand
 */
router.route('/manage/brand/create').post(protectMerchandise, admMerchandiseCtrl.createBrand);
/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/brand/getBrands
 * @access private
 * @desc Get the brands
 */
router.route('/manage/brand/getBrands').post(protectMerchandise, admMerchandiseCtrl.getBrands);

/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/brand/getBrands
 * @access private
 * @desc Delete the brands
 */
router.route('/manage/brand/delete').post(protectMerchandise, admMerchandiseCtrl.deleteBrand);
/**
 * @method POST
 * @route dfnew/adminMerchandise/manage/brand/edit
 * @access private
 * @desc Edit the brands
 */
router.route('/manage/brand/edit').post(protectMerchandise, admMerchandiseCtrl.editBrand);

/**
 * @method GET
 * @route dfnew/adminMerchandise/manage/prediction/getPrediction
 * @access private
 * @desc get the prediction
 */
router.route('/manage/prediction/getPrediction').get(protectMerchandise, admMerchandiseCtrl.getPrediction);

export default router;
