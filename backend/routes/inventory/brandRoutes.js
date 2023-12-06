/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { brandCtrl } from '../../controllers/inventory/index.js';
import { protectInventory } from '../../middleware/authMdware.js';

const brandRouter = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/create
 * @access private
 * @desc Create brand account in inventory dashboard
 */
brandRouter.route('/staff/create').post(protectInventory, brandCtrl.createBrandStaff);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/tbllist
 * @access private
 * @desc List brands in table format in inventory dashboard
 */
brandRouter.route('/staff/tbllist').get(protectInventory, brandCtrl.listBrandStaffTable);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/changepwd
 * @access private
 * @desc Change brand account password in inventory dashboard
 */
brandRouter.route('/staff/changepwd').post(protectInventory, brandCtrl.changeBrandStaffPwd);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/edit
 * @access private
 * @desc Edit brand info in inventory dashboard
 */
brandRouter.route('/staff/edit').post(protectInventory, brandCtrl.editBrandStaffInfo);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/delete
 * @access private
 * @desc Delete brand account in inventory dashboard
 */
brandRouter.route('/staff/delete').post(protectInventory, brandCtrl.deleteBrandStaff);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/staff/toggleactive
 * @access private
 * @desc Toggle active/inactive status of brand account in inventory dashboard
 */
brandRouter.route('/staff/toggleactive').post(protectInventory, brandCtrl.toggleActiveBrandStaffStatus);

/**
 * @method GET
 * @route dfnew/adminventory/manage/brand/staff/count
 * @access private
 * @desc Count numbers of brand in inventory dashboard
 */
brandRouter.route('/staff/count').get(protectInventory, brandCtrl.countBrandStaff);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/collaborationBrand/create
 * @access private
 * @desc Create new collaboration brand
 */
brandRouter.route('/collaborationBrand/create').post(protectInventory, brandCtrl.createCollaborationBrand);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/collaborationBrand/tbllist
 * @access private
 * @desc get collaboration brand
 */
brandRouter.route('/collaborationBrand/tbllist').get(protectInventory, brandCtrl.getCollaborationBrand);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/collaborationBrand/delete
 * @access private
 * @desc get collaboration brand
 */
brandRouter.route('/collaborationBrand/delete').post(protectInventory, brandCtrl.deleteCollaborationBrand);

/**
 * @method POST
 * @route dfnew/adminventory/manage/brand/collaborationBrand/edit
 * @access private
 * @desc Edit collaboration brand
 */
brandRouter.route('/collaborationBrand/edit').post(protectInventory, brandCtrl.editCollaborationBrand);

export default brandRouter;
