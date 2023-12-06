/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import { colorCtrl } from '../../controllers/inventory/index.js';
import { protectInventory } from '../../middleware/authMdware.js';

const colorRouter = express.Router();

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/add
 * @access private
 * @desc Add color in inventory dashboard
 */
colorRouter.route('/add').post(protectInventory, colorCtrl.addColor);

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/edit
 * @access private
 * @desc Edit color in inventory dashboard
 */
colorRouter.route('/edit').post(protectInventory, colorCtrl.editColor);

/**
 * @method POST
 * @route dfnew/adminventory/manage/color/delete
 * @access private
 * @desc Delete color in inventory dashboard
 */
colorRouter.route('/delete').post(protectInventory, colorCtrl.deleteColor);

/**
 * @method GET
 * @route dfnew/adminventory/manage/colors
 * @access private
 * @desc Get colors in inventory dashboard
 */
colorRouter.route('/tbllist').get(protectInventory, colorCtrl.getColors);

export default colorRouter;
