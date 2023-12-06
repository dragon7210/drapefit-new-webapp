/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as reportCtrl from '../../controllers/admin/reportCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const reportRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/report/auto
 * @access private
 * @desc get the career
 */
reportRoutes.route('/auto').get(protectAdmin, reportCtrl.getAutoList);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/style
 * @access private
 * @desc get the career
 */
reportRoutes.route('/style').get(protectAdmin, reportCtrl.getStyleList);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/state
 * @access private
 * @desc get the career
 */
reportRoutes.route('/state').get(protectAdmin, reportCtrl.getStateList);

/**
 * @method GET
 * @route dfnew/admmain/manage/report/batchProcessReport
 * @access private
 * @desc get the career
 */
reportRoutes.route('/batchProcessReport').get(protectAdmin, reportCtrl.getBatchProcessReport);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/batchProcessSubscription
 * @access private
 * @desc get the career
 */
reportRoutes.route('/batchProcessSubscription').get(protectAdmin, reportCtrl.getBatchProcessSubscription);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/clientBirthday
 * @access private
 * @desc get the career
 */
reportRoutes.route('/clientBirthday').get(protectAdmin, reportCtrl.getClientBirthday);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/notCheckedOutCustomer
 * @access private
 * @desc get the career
 */
reportRoutes.route('/notCheckedOutCustomer').get(protectAdmin, reportCtrl.getNotCheckedOutCustomer);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/returnNotProcessed
 * @access private
 * @desc get the career
 */
reportRoutes.route('/returnNotProcessed').get(protectAdmin, reportCtrl.getReturnNotProcessed);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/checkedOutProductDetail
 * @access private
 * @desc get the career
 */
reportRoutes.route('/checkedOutProductDetail').get(protectAdmin, reportCtrl.getCheckedOutProductDetail);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/productAssingendButNotFinalized
 * @access private
 * @desc get the career
 */
reportRoutes.route('/productAssingendButNotFinalized').get(protectAdmin, reportCtrl.getProductAssingendButNotFinalized);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/listOfProductNotReturned
 * @access private
 * @desc get the career
 */
reportRoutes.route('/listOfProductNotReturned').get(protectAdmin, reportCtrl.getListOfProductNotReturned);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/monthlySale
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlySale').get(protectAdmin, reportCtrl.getMonthlySale);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/checkedOutNotReturnDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/checkedOutNotReturnDetails').get(protectAdmin, reportCtrl.getCheckedOutNotReturnDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/totalProductsInInventory
 * @access private
 * @desc get the career
 */
reportRoutes.route('/totalProductsInInventory').get(protectAdmin, reportCtrl.getTotalProductsInInventory);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/productFinalizeSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/productFinalizeSummary').get(protectAdmin, reportCtrl.getProductFinalizeSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/productFinalizeDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/productFinalizeDetails').get(protectAdmin, reportCtrl.getProductFinalizeDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/productDeclinedSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/productDeclinedSummary').get(protectAdmin, reportCtrl.getProductDeclinedSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/productDeclinedDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/productDeclinedDetails').get(protectAdmin, reportCtrl.getProductDeclinedDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/notCheckedOutSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/notCheckedOutSummary').get(protectAdmin, reportCtrl.getNotCheckedOutSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/notCheckedOutDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/notCheckedOutDetails').get(protectAdmin, reportCtrl.getNotCheckedOutDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/monthlyclientConsumed
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlyclientConsumed').get(protectAdmin, reportCtrl.getMonthlyclientConsumed);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/monthlyRevenue
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlyRevenue').get(protectAdmin, reportCtrl.getMonthlyRevenue);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/monthlyProductNotReturned
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlyProductNotReturned').get(protectAdmin, reportCtrl.getMonthlyProductNotReturned);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/monthlyProductDeclined
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlyProductDeclined').get(protectAdmin, reportCtrl.getMonthlyProductDeclined);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/clientCheckedOutSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/clientCheckedOutSummary').get(protectAdmin, reportCtrl.getClientCheckedOutSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/clientCheckedOutDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/clientCheckedOutDetails').get(protectAdmin, reportCtrl.getClientCheckedOutDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/checkedOutReturnSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/checkedOutReturnSummary').get(protectAdmin, reportCtrl.getCheckedOutReturnSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/checkedOutReturnDetails
 * @access private
 * @desc get the career
 */
reportRoutes.route('/checkedOutReturnDetails').get(protectAdmin, reportCtrl.getCheckedOutReturnDetails);
/**
 * @method GET
 * @route dfnew/admmain/manage/report/checkedOutNotReturnSummary
 * @access private
 * @desc get the career
 */
reportRoutes.route('/checkedOutNotReturnSummary').get(protectAdmin, reportCtrl.getCheckedOutNotReturnSummary);
/**
 * @method GET
 * @route dfnew/admmain/manage/monthlyloss
 * @access private
 * @desc get the career
 */
reportRoutes.route('/monthlyloss').get(protectAdmin, reportCtrl.getMonthlyLoss);

export default reportRoutes;
