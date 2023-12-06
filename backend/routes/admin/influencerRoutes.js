/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as InfluencerCtrl from '../../controllers/admin/influencerCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const influencerRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/create
 * @access private
 * @desc Create influencer in admin dashboard
 */
influencerRoutes.route('/create').post(protectAdmin, InfluencerCtrl.createInfluencer);

/**
 * @method GET
 * @route dfnew/admmain/manage/influencer/tbllist
 * @access private
 * @desc List influencers in table format in admin dashboard
 */
influencerRoutes.route('/tbllist').get(protectAdmin, InfluencerCtrl.listInfluencersTable);

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/edit
 * @access private
 * @desc Edit influencer info in admin dashboard
 */
influencerRoutes.route('/edit').post(protectAdmin, InfluencerCtrl.editInfluencerInfo);

/**
 * @method POST
 * @route dfnew/admmain/manage/influencer/delete
 * @access private
 * @desc Delete influencer entity in admin dashboard
 */
influencerRoutes.route('/delete').post(protectAdmin, InfluencerCtrl.deleteInfluencer);

export default influencerRoutes;
