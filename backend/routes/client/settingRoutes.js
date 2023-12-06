/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as settingCtrl from '../../controllers/client/settingCtrl.js';
import { protect } from '../../middleware/authMdware.js';

const settingRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/setting/shipaddresses/edit
 * @access private
 * @desc Edit (Add/Modify) shipping address of men fit profile
 */
settingRoutes.route('/shipaddress/edit').post(protect, settingCtrl.editShipAddress);

/**
 * @method POST
 * @route dfnew/setting/shipaddresses/all
 * @access private
 * @desc Get male user's all ship addresses of men fit profile
 */
settingRoutes.route('/shipaddress/all').get(protect, settingCtrl.getShipAddress);

/**
 * @method POST
 * @route dfnew/setting/shipaddress/delete
 * @access private
 * @desc Delete male user's ship address of men fit profile by ID
 */
settingRoutes.route('/shipaddress/delete').post(protect, settingCtrl.delShipAddress);

/**
 * @method POST
 * @route dfnew/setting/shipaddress/default
 * @access private
 * @desc Set the default as this address
 */
settingRoutes.route('/shipaddress/default').post(protect, settingCtrl.defaultShipAddress);
/**
 * @method POST
 * @route dfnew/setting/shipaddress/deliver
 * @access private
 * @desc Deliver as this address
 */
settingRoutes.route('/shipaddress/deliver').post(protect, settingCtrl.deliverShipAddress);

/**
 * @method POST
 * @route dfnew/setting/shipaddress/delete
 * @access private
 * @desc Add the shipaddress
 */
settingRoutes.route('/shipaddress/add').post(protect, settingCtrl.addShipAddress);

/**
 * @method POST
 * @route dfnew/setting/logindetails/edit
 * @access private
 * @desc Edit user's login details including Full Name, Password, etc.
 */
settingRoutes.route('/logindetails/edit').post(protect, settingCtrl.editLoginDetails);

/**
 * @method POST
 * @route dfnew/setting/schedule/edit
 * @access private
 * @desc Edit (Add/Modify) delivery schedule of women fit profile
 */
settingRoutes.route('/schedule/edit').post(protect, settingCtrl.editSchedule);

/**
 * @method POST
 * @route dfnew/setting/schedule
 * @access private
 * @desc Get user's delivery schedule of women fit profile
 */
settingRoutes.route('/schedule').get(protect, settingCtrl.getSchedule);

export default settingRoutes;
