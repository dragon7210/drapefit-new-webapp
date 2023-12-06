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

export default paymentRoutes;
