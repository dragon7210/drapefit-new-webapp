/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as giftcardCtrl from '../../controllers/admin/giftcardCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const giftcardRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/giftcard/tbllist
 * @access private
 * @desc get the giftcard
 */
giftcardRoutes.route('/tbllist').get(protectAdmin, giftcardCtrl.getGiftcard);

/**
 * @method POST
 * @route dfnew/admmain/manage/giftcard/add
 * @access private
 * @desc add the giftcard
 */
giftcardRoutes.route('/add').post(protectAdmin, giftcardCtrl.addGiftcard);

/**
 * @method POST
 * @route dfnew/admmain/manage/giftcard/del
 * @access private
 * @desc delete the giftcard
 */
giftcardRoutes.route('/del').post(protectAdmin, giftcardCtrl.delGiftcard);

/**
 * @method POST
 * @route dfnew/admmain/manage/giftcard/update
 * @access private
 * @desc Update the giftcard
 */
giftcardRoutes.route('/update').post(protectAdmin, giftcardCtrl.updateGiftcard);
/**
 * @method POST
 * @route dfnew/admmain/manage/giftcard/active
 * @access private
 * @desc active the giftcard
 */
giftcardRoutes.route('/active').post(protectAdmin, giftcardCtrl.activeGiftcard);
/**
 * @method GET
 * @route dfnew/admmain/manage/giftcard/giftcardemail
 * @access private
 * @desc get the giftcard Email
 */
giftcardRoutes.route('/giftcardemail').get(protectAdmin, giftcardCtrl.getGiftcardEmail);
/**
 * @method GET
 * @route dfnew/admmain/manage/giftcard/giftcardmail
 * @access private
 * @desc get the giftcard Mail
 */
giftcardRoutes.route('/giftcardmail').get(protectAdmin, giftcardCtrl.getGiftcardMail);
/**
 * @method GET
 * @route dfnew/admmain/manage/giftcard/giftcardprint
 * @access private
 * @desc get the giftcard Print
 */
giftcardRoutes.route('/giftcardprint').get(protectAdmin, giftcardCtrl.getGiftcardPrint);

export default giftcardRoutes;
