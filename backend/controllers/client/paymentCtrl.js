/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import PaymentGetway from '../../models/admin/paymentGetway.js';

const createCustomerSecret = asyncHandler(async (req, res) => {
  try {
    let customerId = '';

    const stripe = new Stripe(process.env.STRIPE_TEST_SK);

    if (req?.user?.stripe_customer_key) {
      customerId = req?.user?.stripe_customer_key;
    } else {
      return res.status(200).json({
        code: 400,
        message: 'Add address before add card'
      });
    }

    const intent = await stripe.setupIntents.create({ customer: customerId, payment_method_types: ['card'] });
    const clientSecret = intent.client_secret;

    return res.status(200).json({
      code: 200,
      message: 'success',
      clientSecret,
      user: req.user
    });
  } catch (error) {
    console.log('API_CreateCustomer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const confirmCard = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;
  if (!userId) {
    console.log('API_ConfirmCard_400');
    return res.status(400).send('User not found');
  }

  try {
    console.log('body: ', req.body);
    console.log('user: ', req.user);
  } catch (error) {
    console.log('API_ConfirmCard_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const attachPayMethod = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const customerId = req.user?.stripe_customer_key;
    if (!customerId) {
      console.log('API_attachPayMethod_400:', 'User has no Stripe customer ID');
      return res.status(400).json({
        msg: 'User has no Stripe customer ID'
      });
    }
    const { paymentMethod } = req.body;
    const method = await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId
    });
    console.log('API_attachPayMethod_200:', method);
    res.status(200).send('Payment method attached successfully');
  } catch (e) {
    console.log('API_attachPayMethod_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPayMethods = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK);
    const customerId = req.user?.stripe_customer_key;
    if (!customerId) {
      console.log('API_getPayMethods_400:', 'User has no Stripe customer ID');
      return res.status(400).json({
        msg: 'User has no Stripe customer ID'
      });
    }
    const methods = await stripe.customers.listPaymentMethods(customerId, {
      type: 'card'
    });
    console.log('API_getPayMethods_200:', 'Payment methods are retrieved');
    res.status(200).json(methods);
  } catch (e) {
    console.log('API_getPayMethods_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const createPayIntentOfStyleFee = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    //-- `req.user` was set in [authMdware.js]
    const customerId = req.user?.stripe_customer_key;
    if (!customerId) {
      console.log('API_createPayIntentOfStyleFee_400:', 'User has no Stripe customer ID');
      return res.status(400).json({
        msg: 'User has no Stripe customer ID'
      });
    }

    const { paymentMethod } = req.body;
    let amountOfStyleFee = 20; // *

    const payintent = await stripe.paymentIntents.create({
      amount: amountOfStyleFee * 100, // *
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethod,
      confirmation_method: 'manual', //-- For 3D Security
      description: 'Buy Styling FIT',
      confirm: true
    });
    //-- TODO | add payment intent record to the DB | webhook ?
    console.log('API_createPayIntentOfStyleFee_200:', 'Payment intent has been created', payintent);

    if (payintent.status === 'succeeded') {
      const profile_type = req.user.user_detail.gender;
      const paymentGetwayObj = {
        user_id: req.user.id,
        price: amountOfStyleFee,
        kid_id: 0,
        count: 0,
        payment_card_details_id: paymentMethod,
        profile_type,
        payment_type: 1,
        status: 0,
        created_dt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        shipping_address_id: payintent.shipping
      };
      if (profile_type === 3) {
        paymentGetwayObj.kid_id = req.user.id;
        paymentGetwayObj.count = (await PaymentGetway.findAll({ where: { kid_id: req.user.id } })).length + 1;
      } else if (profile_type === 1) {
        paymentGetwayObj.count = (await PaymentGetway.findAll({ where: { user_id: req.user.id } })).length + 1;
      } else {
        paymentGetwayObj.count = (await PaymentGetway.findAll({ where: { user_id: req.user.id } })).length + 1;
      }

      await PaymentGetway.create(paymentGetwayObj);
    }

    res.status(200).json(payintent);
  } catch (e) {
    console.log('API_createPayIntentOfStyleFee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const confirmPayIntent = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    //-- `req.user` was set in [authMdware.js]
    const customerId = req.user?.stripe_customer_key;
    if (!customerId) {
      console.log('API_confirmPayIntent_400:', 'User has no Stripe customer ID');
      return res.status(400).json({
        msg: 'User has no Stripe customer ID'
      });
    }
    const { paymentIntent, paymentMethod } = req.body;

    const intent = await stripe.paymentIntents.confirm(paymentIntent, {
      payment_method: paymentMethod
    });
    //-- TODO | update payment intent record to the DB | webhook ?
    console.log('API_confirmPayIntent_200:', 'Payment has been confirmed');
    res.status(200).json(intent);
  } catch (e) {
    console.log('API_confirmPayIntent_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const payWebhookHandler = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const endpointSecret = process.env.STRIPE_ENDPT_SECRET;
    const { payload } = req.body;
    const sig = req.headers['stripe-signature'];
    const PaymentStripeLogModel = sequelize.model('PaymentStripeLog', paymentStripeLogSchema);

    let event = null;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log('API_payWebhookHandler_400:', err?.message);
      return res.status(400).json({
        msg: `Webhook error: ${err?.message}`
      });
    }

    //-- TODO | handle the event
    console.log('API_payWebhookHandler:', event.type);

    if (event.type === 'checkout.session.completed') {
      //-- save the payment details in DB
      const session = event.data.object;
      const paymentLog = new PaymentStripeLogModel({
        customerEmail: session?.customer_email,
        amount: session?.amount_total / 100,
        paymentId: session?.id,
        paymentStatus: session?.payment_status,
        transactedAt: session?.created
      });
      await paymentLog.save();
    }
    console.log('API_payWebhookHandler_200:', 'Fulfill the order');
    res.status(200).end();
  } catch (e) {
    console.log('API_payWebhookHandler_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  attachPayMethod,
  getPayMethods,
  createPayIntentOfStyleFee,
  confirmPayIntent,
  payWebhookHandler,
  createCustomerSecret,
  confirmCard
};
