/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as socialCtrl from '../../controllers/admin/socialCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const socialRoutes = express.Router();
/**
 * @method Get
 * @route dfnew/admmain/manage/socialMedia/tbllist
 * @access private
 * @desc get the social media list
 */
socialRoutes.route('/tbllist').get(protectAdmin, socialCtrl.getSocialMedia);

/**
 * @method POST
 * @route dfnew/admmain/manage/cms/update
 * @access private
 * @desc add the social media
 */
socialRoutes.route('/add').post(protectAdmin, socialCtrl.addSocialMedia);

/**
 * @method POST
 * @route dfnew/admmain/manage/socialMedia/delete
 * @access private
 * @desc delete the social media
 */
socialRoutes.route('/delete').post(protectAdmin, socialCtrl.delSocialMedia);

/**
 * @method POST
 * @route dfnew/admmain/manage/socialMedia/active
 * @access private
 * @desc active the social media
 */
socialRoutes.route('/active').post(protectAdmin, socialCtrl.activeSocialMedia);
/**
 * @method POST
 * @route dfnew/admmain/manage/socialMedia/edit
 * @access private
 * @desc edit the social media
 */
socialRoutes.route('/edit').post(protectAdmin, socialCtrl.editSocialMedia);

export default socialRoutes;
