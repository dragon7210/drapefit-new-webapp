/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as vendorCtrl from '../../controllers/supply/vendorCtrl.js';
import { protectSupplier } from '../../middleware/authMdware.js';

const vendorRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/create
 * @access private
 * @desc Create new supply vendor
 */
vendorRoutes.route('/create').post(protectSupplier, vendorCtrl.addVendor);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/tbllist
 * @access private
 * @desc Get the all supply vendor
 */
vendorRoutes.route('/tbllist').post(protectSupplier, vendorCtrl.getVendors);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/edit
 * @access private
 * @desc Edit new supply vendor
 */
vendorRoutes.route('/edit').post(protectSupplier, vendorCtrl.editVendor);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/delete
 * @access private
 * @desc Delete new supply vendor
 */
vendorRoutes.route('/delete').post(protectSupplier, vendorCtrl.deleteVendor);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/changepwd
 * @access private
 * @desc change new password
 */
vendorRoutes.route('/changepwd').post(protectSupplier, vendorCtrl.changepwdVendor);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/vendor/toggleactive
 * @access private
 * @desc change the active state
 */
vendorRoutes.route('/toggleactive').post(protectSupplier, vendorCtrl.toggleactiveVendor);

export default vendorRoutes;
