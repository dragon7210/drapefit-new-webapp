/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';

import { validate } from '../../middleware/validateMdware.js';
import { checkIdRules } from '../../middleware/validateAdmMainMdware.js';
import {
  invAddProdCategoryRules,
  invAddProductForMenRules,
  invAddProductForWomenRules,
  invAddProductForKidsRules,
  invEditProductForMenRules,
  invEditProductForWomenRules,
  invEditProductForKidsRules,
  invEditInvProfileRules,
  invResetInvPwdRules,
  invEditInvValueSetRules,
  invAddInvEmailTplRules,
  invEditInvEmailTplRules
} from '../../middleware/validateAdmInventoryMdware.js';
import { protectInventory } from '../../middleware/authMdware.js';
import { admInventoryCtrl, prodSubCategoryCtrl, productCtrl } from '../../controllers/inventory/index.js';

const router = express.Router();

/**
 * @method GET
 * @route dfnew/adminventory/manage/invsetting/profile
 * @access private
 * @desc Get inventory profile for setting page in inventory dashboard
 */
router.route('/manage/invsetting/profile').get(protectInventory, admInventoryCtrl.getInvProfile);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/profile/edit
 * @access private
 * @desc Edit inventory profile at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/profile/edit')
  .post(protectInventory, invEditInvProfileRules(), validate, admInventoryCtrl.editInvProfile);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/password/reset
 * @access private
 * @desc Reset inventory account password at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/password/reset')
  .post(protectInventory, invResetInvPwdRules(), validate, admInventoryCtrl.resetInvPwd);

/**
 * @method GET
 * @route dfnew/adminventory/manage/invsetting/valueset
 * @access private
 * @desc Get inventory value set for setting page in inventory dashboard
 */
router.route('/manage/invsetting/valueset').get(protectInventory, admInventoryCtrl.getInvValueSet);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/valueset/edit
 * @access private
 * @desc Edit inventory value set at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/valueset/edit')
  .post(protectInventory, invEditInvValueSetRules(), validate, admInventoryCtrl.editInvValueSet);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/emailtpl/tbllist
 * @access private
 * @desc List email templates in table format at setting page in inventory dashboard
 */
router.route('/manage/invsetting/emailtpl/tbllist').post(protectInventory, admInventoryCtrl.listInvEmailTpl);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/emailtpl/add
 * @access private
 * @desc Add email template at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/emailtpl/add')
  .post(protectInventory, invAddInvEmailTplRules(), validate, admInventoryCtrl.addInvEmailTpl);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/emailtpl/edit
 * @access private
 * @desc Edit email template at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/emailtpl/edit')
  .post(protectInventory, invEditInvEmailTplRules(), validate, admInventoryCtrl.editInvEmailTpl);

/**
 * @method POST
 * @route dfnew/adminventory/manage/invsetting/emailtpl/delete
 * @access private
 * @desc Delete email template at setting page in inventory dashboard
 */
router
  .route('/manage/invsetting/emailtpl/delete')
  .post(protectInventory, checkIdRules(), validate, admInventoryCtrl.deleteInvEmailTpl);

export default router;
