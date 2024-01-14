/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import bodyParser from 'body-parser';

import { protect } from '../../middleware/authMdware.js';
import * as paymentCtrl from '../../controllers/client/paymentCtrl.js';

const paymentRoutes = express.Router();

/**
 * @method POST
 * @route dfnew/payment/stripe/customer/create
 * @access private
 * @desc Create a stripe customer
 */

paymentRoutes.route('/customer/create').post(protect, paymentCtrl.createCustomerSecret);

/**
 * @method POST
 * @route dfnew/payment/stripe/card/confirm
 * @access private
 * @desc Create a stripe customer
 */

paymentRoutes.route('/card/confirm/:userId').post(paymentCtrl.confirmCard);

/**
 * @method POST
 * @route dfnew/payment/stripe/paymethod/attach
 * @access private
 * @desc Add payment method
 */
paymentRoutes.route('/paymethod/attach').post(protect, paymentCtrl.attachPayMethod);

/**
 * @method GET
 * @route dfnew/payment/stripe/paymethods/list
 * @access private
 * @desc List payment methods
 */
paymentRoutes.route('/paymethods/list').get(protect, paymentCtrl.getPayMethods);

/**
 * @method POST
 * @route dfnew/payment/stripe/payintent/stylingfee/create
 * @access private
 * @desc Create payment intent of styling fee
 */
paymentRoutes.route('/payintent/stylingfee/create').post(protect, paymentCtrl.createPayIntentOfStyleFee);

/**
 * @method POST
 * @route dfnew/payment/stripe/payintent/confirm
 * @access private
 * @desc Confirm payment intent
 */
paymentRoutes.route('/payintent/confirm').post(protect, paymentCtrl.confirmPayIntent);

/**
 * @method POST
 * @route dfnew/payment/stripe/webhook
 * @access public
 * @desc Listen to Stripe events by webhook
 */
paymentRoutes.post('/webhook', bodyParser.raw({ type: 'application/json' }), paymentCtrl.payWebhookHandler);

/**
 * @method POST
 * @route dfnew/payment/stripe/card/add
 * @access private
 * @desc Add card details
 */
paymentRoutes.route('/card/add').post(protect, paymentCtrl.addCardDetails);

/**
 * @method POST
 * @route dfnew/payment/stripe/pay/products
 * @access private
 * @desc pay for products
 */
paymentRoutes.route('/pay/products').post(protect, paymentCtrl.payForProducts);

export default paymentRoutes;
