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
import { loginRules, mobSignupRules, mobSelFitForRules, verifyRules } from '../../middleware/validateAuthMdware.js';
import { protect } from '../../middleware/authMdware.js';
import * as userMobCtrl from '../controllers/userMobCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfmob/user/moblogin
 * @access public
 * @desc Login user (Client - Customer, Influencer) on mobile
 */
router.post('/moblogin', loginRules(), validate, userMobCtrl.loginMobUser);

/**
 * @method GET
 * @route dfmob/user/mobuinfo
 * @access private
 * @desc Get user's info on mobile
 */
router.route('/mobuinfo').get(protect, userMobCtrl.getMobUserInfo);

/**
 * @method POST
 * @route dfmob/user/moblogout
 * @access private
 * @desc Logout user by destroying token on mobile
 */
router.route('/moblogout').post(protect, userMobCtrl.logoutMobUser);

/**
 * @method POST
 * @route dfmob/user/mobsignup
 * @access public
 * @desc Sign up user (Client - Customer) on mobile
 */
router.post('/mobsignup', mobSignupRules(), validate, userMobCtrl.signupMobUser);

/**
 * @method POST
 * @route dfmob/user/mobsignup/selfitfor
 * @access public
 * @desc Select FitFor right after sign-up on mobile
 */
router.post('/mobsignup/selfitfor', mobSelFitForRules(), validate, userMobCtrl.selFitForAfterMobSignup);

/**
 * @method POST
 * @route dfmob/user/mobverify
 * @access public
 * @desc Verify user's email on mobile
 */
router.post('/mobverify', verifyRules(), validate, userMobCtrl.verifyMobUser);

export default router;
