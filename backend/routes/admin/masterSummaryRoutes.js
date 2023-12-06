/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as masterSummaryCtrl from '../../controllers/admin/masterSummaryCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const masterSummaryRoutes = express.Router();
/**
 * @method post
 * @route dfnew/admmain/manage/master/finalalizedSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/finalalizedSummaryReport').post(protectAdmin, masterSummaryCtrl.getFinalizedSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/finalalizedDetailReport
 * @access private
 */
masterSummaryRoutes.route('/finalalizedDetailReport').post(protectAdmin, masterSummaryCtrl.getFinalizedDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/checkoutSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/checkoutSummaryReport').post(protectAdmin, masterSummaryCtrl.getCheckoutSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/checkoutDetailReport
 * @access private
 */
masterSummaryRoutes.route('/checkoutDetailReport').post(protectAdmin, masterSummaryCtrl.getCheckoutDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notCheckoutSummaryReport
 * @access private
 */
masterSummaryRoutes
  .route('/notCheckoutSummaryReport')
  .post(protectAdmin, masterSummaryCtrl.getNotCheckoutSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notCheckoutDetailReport
 * @access private
 */
masterSummaryRoutes.route('/notCheckoutDetailReport').post(protectAdmin, masterSummaryCtrl.getNotCheckoutDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/declineDetailReport
 * @access private
 */
masterSummaryRoutes.route('/declineDetailReport').post(protectAdmin, masterSummaryCtrl.getDeclineDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/exchangeDetailReport
 * @access private
 */
masterSummaryRoutes.route('/exchangeDetailReport').post(protectAdmin, masterSummaryCtrl.getExchangeDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notReturnDetailReport
 * @access private
 */
masterSummaryRoutes.route('/notReturnDetailReport').post(protectAdmin, masterSummaryCtrl.getNotReturnDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/returnProcessDetailReport
 * @access private
 */
masterSummaryRoutes
  .route('/returnProcessDetailReport')
  .post(protectAdmin, masterSummaryCtrl.getReturnProcessDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notRtExDetailReport
 * @access private
 */
masterSummaryRoutes.route('/notRtExDetailReport').post(protectAdmin, masterSummaryCtrl.getNotRtExDetailReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/exchangeSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/exchangeSummaryReport').post(protectAdmin, masterSummaryCtrl.getExchangeSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/declineSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/declineSummaryReport').post(protectAdmin, masterSummaryCtrl.getDeclineSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notReturnSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/notReturnSummaryReport').post(protectAdmin, masterSummaryCtrl.getNotReturnSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/notRtExSummaryReport
 * @access private
 */
masterSummaryRoutes.route('/notRtExSummaryReport').post(protectAdmin, masterSummaryCtrl.getNotRtExSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/returnProcessSummaryReport
 * @access private
 */
masterSummaryRoutes
  .route('/returnProcessSummaryReport')
  .post(protectAdmin, masterSummaryCtrl.getReturnProcessSummaryReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/stylingFeeReport
 * @access private
 */
masterSummaryRoutes.route('/stylingFeeReport').post(protectAdmin, masterSummaryCtrl.getStylingFeeReport);
/**
 * @method post
 * @route dfnew/admmain/manage/master/changeAutoCheckout
 * @access private
 */
masterSummaryRoutes.route('/changeAutoCheckout').get(protectAdmin, masterSummaryCtrl.getChangeAutoCheckout);
/**
 * @method post
 * @route dfnew/admmain/manage/master/changeAutoCheckout/update
 * @access private
 */
masterSummaryRoutes.route('/changeAutoCheckout/update').post(protectAdmin, masterSummaryCtrl.updateChangeAutoCheckout);

export default masterSummaryRoutes;
