/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';

import { validate } from '../middleware/validateMdware.js';
import {
  signupRules,
  loginRules,
  verifyRules,
  resetpwdRules,
  selectFitRules
} from '../middleware/validateAuthMdware.js';
import { protect } from '../middleware/authMdware.js';
import * as userCtrl from '../controllers/userCtrl.js';

const router = express.Router();

/**
 * @method POST
 * @route dfnew/user/signup
 * @access public
 * @desc Sign up user (Client - Customer)
 */
router.post('/signup', signupRules(), validate, userCtrl.signupUser);

/**
 * @method POST
 * @route dfnew/user/login
 * @access public
 * @desc Login user (Client - Customer, Influencer)
 */
router.post('/login', loginRules(), validate, userCtrl.loginUser);

/**
 * @method POST
 * @route dfnew/user/login/admin
 * @access public
 * @desc Login admin user (Super Admin, Admin)
 */
router.post('/login/admin', loginRules(), validate, userCtrl.loginAdminUser);

/**
 * @method POST
 * @route dfnew/user/login/inventory
 * @access public
 * @desc Login inventory user (Inventory Manager)
 */
router.post('/login/inventory', loginRules(), validate, userCtrl.loginInventoryUser);

/**
 * @method POST
 * @route dfnew/user/login/supplier
 * @access public
 * @desc Login supplier user (Supplier Agent)
 */
router.post('/login/supplier', loginRules(), validate, userCtrl.loginSupplierUser);

/**
 * @method POST
 * @route dfnew/user/login/stylist
 * @access public
 * @desc Login stylist user (Stylist)
 */
router.post('/login/stylist', loginRules(), validate, userCtrl.loginStylistUser);

/**
 * @method POST
 * @route dfnew/user/login/qa
 * @access public
 * @desc Login QA user (Quality Assurance)
 */
router.post('/login/qa', loginRules(), validate, userCtrl.loginQAUser);

/**
 * @method POST
 * @route dfnew/user/login/support
 * @access public
 * @desc Login support user (Support Guy)
 */
router.post('/login/support', loginRules(), validate, userCtrl.loginSupportUser);

/**
 * @method POST
 * @route dfnew/user/login/brand
 * @access public
 * @desc Login brand user (Brand)
 */
router.post('/login/brand', loginRules(), validate, userCtrl.loginBrandUser);

/**
 * @method GET
 * @route dfnew/user/uinfo
 * @access private
 * @desc Get user's info
 */
router.route('/uinfo').get(protect, userCtrl.getUserInfo);

/**
 * @method POST
 * @route dfnew/user/verify
 * @access public
 * @desc Verify user's email
 */
router.post('/verify', verifyRules(), validate, userCtrl.verifyUser);

/**
 * @method POST
 * @route dfnew/user/forgotpwd
 * @access public
 * @desc Accept request from user who has forgotten password
 */
router.post('/forgotpwd', userCtrl.handleForgotPwd);

/**
 * @method POST
 * @route dfnew/user/resetpwd
 * @access public
 * @desc Reset user's password
 */
router.post('/resetpwd', resetpwdRules(), validate, userCtrl.resetUserPwd);

/**
 * @method POST
 * @route dfnew/user/selectfit
 * @access private
 * @desc Select user's gender fit when initial fitFor is 2
 */
router.route('/selectfit').post(protect, selectFitRules(), validate, userCtrl.selectUserFit);

/**
 * @method POST
 * @route dfnew/user/logout
 * @access private
 * @desc Logout user by destroying token
 */
router.route('/logout').post(protect, userCtrl.logoutUser);

/**
 * @method POST
 * @route dfnew/user/logout/strict
 * @access private
 * @desc Logout user strictly by removing all the tokens | by admin
 */
router.route('/logout/strict').post(protect, userCtrl.strictLogoutUser);

/**
 * @method POST
 * @route dfnew/user/kids/add/:order
 * @access private
 * @desc Add user's kid (with order of 1 ~ 4)
 */
router.route('/kids/add/:order').post(protect, userCtrl.addChild);

/**
 * @method GET
 * @route dfnew/user/influencer/:arg
 * @access public
 * @desc Confirm influencer registration
 */
router.get('/influencer/:arg', userCtrl.confirmInfluencer);

/**
 * @method POST
 * @route dfnew/user/profile
 * @access private
 * @desc update the profile
 */
router.route('/profile').post(protect, userCtrl.updateProfie);

/**
 * @method GET
 * @route dfnew/user/getEmail
 * @access private
 * @desc get the Email
 */
router.route('/getEmail').get(protect, userCtrl.getEmails);

/**
 * @method POST
 * @route dfnew/user/updatePassword
 * @access private
 * @desc get the Email
 */
router.route('/updatePassword').post(protect, userCtrl.updatePassword);

/**
 * @method POST
 * @route dfnew/user/getProfile
 * @access private
 * @desc get the Email
 */
router.route('/getProfile').post(protect, userCtrl.getProfile);

/**
 * @method GET
 * @route dfnew/user/getProducts
 * @access private
 * @desc get the producsts of user
 */

router.route('/getProducts').get(protect, userCtrl.getProducts);

/**
 * @method Post
 * @route dfnew/user/orderReview
 * @access private
 * @desc Update reviews for products
 */

router.route('/orderReview').post(protect, userCtrl.orderReview);

/**
 * @method Get
 * @route dfnew/user/tax
 * @access private
 * @desc Get tax info with zipcode
 */

router.route('/tax').get(protect, userCtrl.getTax);

export default router;
