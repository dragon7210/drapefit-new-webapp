/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as customerCtrl from '../../controllers/admin/customerCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const customerRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/customer/paidList
 * @access private
 * @desc get the customer paid list
 */
customerRoutes.route('/paidList').get(protectAdmin, customerCtrl.getPaidList);
/**
 * @method Post
 * @route dfnew/admmain/manage/customer/payment/update
 * @access private
 * @desc update the paymentrefund
 */
customerRoutes.route('/payment/update').post(protectAdmin, customerCtrl.updatePaymentRefund);

/**
 * @method Get
 * @route dfnew/admmain/manage/customer/payment/tblist
 * @access private
 * @desc get the paymentrefund
 */
customerRoutes.route('/payment/tblist').get(protectAdmin, customerCtrl.getPaymentRefund);

/**
 * @method Get
 * @route dfnew/admmain/manage/customer/paymentRefund/tblist
 * @access private
 * @desc get the paymentrefund list
 */
customerRoutes.route('/paymentRefund/tblist').get(protectAdmin, customerCtrl.getPaymentRefundList);
/**
 * @method Post
 * @route dfnew/admmain/manage/customer/paymentRefund/info
 * @access private
 * @desc Get the sel payment refund info
 */
customerRoutes.route('/paymentRefund/info').post(protectAdmin, customerCtrl.getSelPaymentRefundInfo);

/**
 * @method Post
 * @route dfnew/admmain/manage/customer/paymentRefund/update
 * @access private
 * @desc Get the sel payment refund info
 */
customerRoutes.route('/paymentRefund/update').post(protectAdmin, customerCtrl.updateSelPaymentRefundInfo);
/**
 * @method Get
 * @route dfnew/admmain/manage/customer/notPaidList
 * @access private
 * @desc Get the not paid list
 */
customerRoutes.route('/notPaidList').get(protectAdmin, customerCtrl.getNotPaidLsit);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/notPaidList/del
 * @access private
 * @desc delete the not paid list
 */
customerRoutes.route('/notPaidList/del').get(protectAdmin, customerCtrl.delNotPaidList);

/**
 * @method GET
 * @route dfnew/admmain/manage/customer/tbllist;
 * @access private
 * @desc Delete sales tax info over state in admin dashboard
 */
customerRoutes.route('/tbllist').get(protectAdmin, customerCtrl.getCustomers);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/updateStylist;
 * @access private
 * @desc update the stylist
 */
customerRoutes.route('/updateStylist').post(protectAdmin, customerCtrl.updateStylist);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/updateSupport;
 * @access private
 * @desc update the Support
 */
customerRoutes.route('/updateSupport').post(protectAdmin, customerCtrl.updateSupport);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/updateQA;
 * @access private
 * @desc update the QA
 */
customerRoutes.route('/updateQA').post(protectAdmin, customerCtrl.updateQA);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/updateInventory;
 * @access private
 * @desc update the Inventory
 */
customerRoutes.route('/updateInventory').post(protectAdmin, customerCtrl.updateInventory);

/**
 * @method GET
 * @route dfnew/admmain/manage/customer/previewWorkList/tblist;
 * @access private
 * @desc get the priview work list
 */
customerRoutes.route('/previewWorkList/tblist').get(protectAdmin, customerCtrl.getPreviewWorkList);

/**
 * @method POST
 * @route dfnew/admmain/manage/customer/previewWorkList/del;
 * @access private
 * @desc delete the priview work list
 */
customerRoutes.route('/previewWorkList/del').post(protectAdmin, customerCtrl.delPreviewWorkList);

/**
 * @method POST
 * @route dfnew/admmain/manage/customer/paidList/del;
 * @access private
 * @desc delete the paid list
 */
customerRoutes.route('/paidList/del').post(protectAdmin, customerCtrl.delPaidList);

/**
 * @method POST
 * @route dfnew/admmain/manage/customer/paidList/matching;
 * @access private
 * @desc matching the list
 */
customerRoutes.route('/paidList/matching').post(protectAdmin, customerCtrl.matching);
/**
 * @method POST
 * @route dfnew/admmain/manage/customer/paidList/browser
 * @access private
 * @desc matching the list
 */
customerRoutes.route('/paidList/browser').post(protectAdmin, customerCtrl.browser);

/**
 * @method GET
 * @route dfnew/admmain/manage/customer/junk/tblist;
 * @access private
 * @desc matching the list
 */
customerRoutes.route('/junk/tblist').get(protectAdmin, customerCtrl.getJunk);
/**
 * @method GET
 * @route dfnew/admmain/manage/customer/block/tblist;
 * @access private
 * @desc matching the list
 */
customerRoutes.route('/block/tblist').get(protectAdmin, customerCtrl.getBlock);

export default customerRoutes;
