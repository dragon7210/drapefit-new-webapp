/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
const { createHmac } = await import('node:crypto');
import Stripe from 'stripe';

import userSchema from '../../models/admin/user.js';
// import userLoginLogSchema from '../models/admin/userLoginLogSchema.js';
// import kidSchema from '../models/admin/kidSchema.js';
// import wFitProfileSchema from '../models/admin/wFitProfileSchema.js';
// import mFitProfileSchema from '../models/admin/mFitProfileSchema.js';
// import kgFitProfileSchema from '../models/admin/kgFitProfileSchema.js';
// import kbFitProfileSchema from '../models/admin/kbFitProfileSchema.js';
import { sequelize } from '../../config/db.js';
import { chkEmailVeriToken, genUsername, isValidEmailVeriTokenTTL } from '../../utils/helper.js';
import { sendSesEmail } from '../../libs/sendSesEmail.js';
import { USER_ROLE_CLIENT, MOB_PLT_LIST } from '../../utils/constant.js';
import User from '../../models/admin/user.js';

const loginMobUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, platform } = req.body;

    if (!MOB_PLT_LIST.includes(platform)) {
      console.log('API_loginMobUser_400:', 'Invalid platform access');
      return res.status(400).json({
        msg: 'Invalid platform access'
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log('API_loginMobUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (user.role !== USER_ROLE_CLIENT) {
      console.log('API_loginMobUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginMobUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user.id,
        loginAt: now,
        loginPlatform: platform
      });
      //-- okay
      console.log('API_loginMobUser_200:', 'okay');
      res.status(200).json({ token });
    } else {
      console.log('API_loginMobUser_403:', 'Email has not been verified yet');
      res.status(403).json({
        msg: 'Email has not been verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginMobUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getMobUserInfo = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    if (user) {
      let pRoute = '';
      let pStatus = 0;
      const kids = [];
      if (user.emailVerified) {
        //-- get fit profile's input status
        const fitFor = user.fitFor;
        if (fitFor === 2) {
          pRoute = '/select-gender';
        } else {
          const wORm = fitFor === 0 ? 'women' : 'men';
          const UserFitProfileModel = fitFor === 0 ? WFitProfileModel : MFitProfileModel;
          const userFP = await UserFitProfileModel.findOne({ userId });
          if (!userFP) {
            pRoute = `/welcome/basic-info/${wORm}`;
          } else {
            const inputStatus = userFP?.inputStatus || {};
            const statusArr = [
              { label: `/welcome/basic-info/${wORm}`, value: inputStatus.basicInfo?.isComplete },
              { label: `/welcome/style-fit/${wORm}`, value: inputStatus.styleFit?.isComplete },
              { label: `/welcome/price-range/${wORm}`, value: inputStatus.priceRange?.isComplete },
              { label: `/welcome/style-custom/${wORm}`, value: inputStatus.customDsgnBrand?.isComplete },
              { label: `/welcome/schedule`, value: inputStatus.schedule?.isComplete },
              { label: `/welcome/addressbook`, value: inputStatus.shipAddress?.isComplete },
              { label: `/welcome/payment`, value: inputStatus.billingInfo?.isComplete }
            ];
            const incompleteStatusIndex = statusArr.findIndex((item) => !item.value);
            if (incompleteStatusIndex === -1) {
              pRoute = '/welcome/schedule';
              pStatus = 7;
            } else {
              pRoute = statusArr[incompleteStatusIndex].label;
              pStatus = incompleteStatusIndex;
            }
          }
        }
        //-- get children info
        const myKids = await KidsModel.find({ parentId: userId }).sort({ kidOrder: 1 });
        if (myKids?.length) {
          for (const kid of myKids) {
            const { gender, name, isCheckoutPending } = kid;
            let kRoute = '';
            let kStatus = 0;
            if (gender === 0) {
              kRoute = '/welcome/basic-info/kids';
            } else {
              const gORb = gender === 1 ? 'girl' : 'boy';
              const KidFitProfileModel = gender === 1 ? KgFitProfileModel : KbFitProfileModel;
              const kidFP = await KidFitProfileModel.findOne({
                kidId: kid.id
              });
              if (!kidFP) {
                kRoute = '/welcome/basic-info/kids';
              } else {
                const inputStatus = kidFP?.inputStatus || {};
                const statusArr = [
                  { label: '/welcome/basic-info/kids', value: inputStatus.basicInfo?.isComplete },
                  { label: `/welcome/style-fit/kids/${gORb}`, value: inputStatus.styleFit?.isComplete },
                  { label: `/welcome/price-range/kids/${gORb}`, value: inputStatus.priceRange?.isComplete },
                  { label: `/welcome/style-custom/kids/${gORb}`, value: inputStatus.customDsgnBrand?.isComplete },
                  { label: `/welcome/schedule`, value: inputStatus.schedule?.isComplete },
                  { label: `/welcome/addressbook`, value: inputStatus.shipAddress?.isComplete },
                  { label: `/welcome/payment`, value: inputStatus.billingInfo?.isComplete }
                ];
                const incompleteStatusIndex = statusArr.findIndex((item) => !item.value);
                if (incompleteStatusIndex === -1) {
                  kRoute = '/welcome/schedule';
                  kStatus = 7;
                } else {
                  kRoute = statusArr[incompleteStatusIndex].label;
                  kStatus = incompleteStatusIndex;
                }
              }
            }
            kids.push({
              order: kid.kidOrder,
              name,
              gender,
              isCheckoutPending, //-- LATER
              kRoute,
              kStatus
            });
          }
        }
      } else {
        console.log('API_getMobUserInfo_403:', 'User has not been verified yet');
        return res.status(403).json({
          msg: 'User has not been verified yet'
        });
      }
      //-- okay
      console.log('API_getMobUserInfo_200:', 'okay');
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        fitFor: user.fitFor,
        isCheckoutPending: user.isCheckoutPending, //-- LATER
        pRoute,
        pStatus,
        kids
      });
    } else {
      console.log('API_getMobUserInfo_404:', 'User not found');
      res.status(404).json({
        msg: 'User not found'
      });
    }
  } catch (e) {
    console.log('API_getMobUserInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const logoutMobUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` & `req.token` was set in [authMdware.js]
    req.user.tokens = req.user.tokens.filter((token) => {
      return token?.token !== req.token;
    });
    await req.user.save();
    //-- okay
    console.log('API_logoutMobUser_200:', 'User logged out');
    res.status(200).send('User logged out');
  } catch (e) {
    console.log('API_logoutMobUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const signupMobUser = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const UserModel = sequelize.model('User', userSchema);
    const UserSignTokenModel = sequelize.model('UserSignToken', userSignTokenSchema);

    const { firstName, lastName, email, password, platform } = req.body;
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      if (userExists.emailVerified === true) {
        console.log('API_signupMobUser_403:', 'User already exists');
        return res.status(403).json({
          msg: 'User already exists'
        });
      } else {
        console.log('API_signupMobUser_400:', 'User already exists, but email has not yet been verified');
        return res.status(400).json({
          msg: 'User already exists, but email has not yet been verified'
        });
      }
    }
    //-- create user
    const user = await UserModel.create({
      firstName,
      lastName,
      username: genUsername(firstName, lastName),
      email,
      password,
      // emailVerified: process.env.NODE_ENV === 'development' ? true : false, // *
      emailVerified: true, //-- for the purpose of milestone testing!!!
      role: USER_ROLE_CLIENT,
      signupPlatform: platform
    });
    if (user) {
      //-- create stripe customer
      try {
        const customer = await stripe.customers.create({
          name: `${firstName} ${lastName}`,
          email,
          description: `Register Drape Fit user [${firstName} ${lastName}] as a Stripe customer`
        });
        user.stripeCusId = customer.id;
        await user.save();
      } catch (err) {
        //-- remove insufficient user without payment info
        await UserModel.findByIdAndRemove(user.id);
        console.log('API_signupMobUser_400:', err?.message);
        return res.status(400).json({
          msg: 'Failed to register user as a Stripe customer'
        });
      }

      //-- skip verify-email for development stage
      // if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV) {
        //-- temporary measure for dev milestone testing!!!
        console.log('API_signupMobUser_200:', 'Please select your FitFor in the next step');
        return res.status(200).send({
          id: user.id
        });
      }

      //-- create verify token
      const now = new Date();
      const hash = createHmac('sha256', process.env.JWT_SECRET)
        .update(`${firstName} ${lastName} - ${now.getTime()}`)
        .digest('hex');
      const signToken = await UserSignTokenModel.create({
        userId: user.id,
        token: hash,
        tokenSetAt: now
      });
      if (signToken) {
        //-- send verify email
        const msgHtml = `<h1>Hi, there!</h1>
          <p>Welcome to our Drape Fit Inc.</p>
          <p>Please use this token string to verify your email address:</p>
          <p>(※ Note that this token is valid only for 1 day.)</p><br>
          <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${user.id}-${hash}</pre><br>
          <p>Thanks.</p>
          <p><small>The Support Team at Drape Fit Inc.</small></p>
          <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
        `;
        const msgTxt = `Hi, there!\n
          Welcome to our Drape Fit Inc.\n
          Please use this token string to verify your email address:\n
          (※ Note that this token is valid only for 1 day.)\n\n
          ${user.id}-${hash}\n\n
          Thanks.\n
          The Support Team at Drape Fit Inc.
        `;
        const emailSent = await sendSesEmail(
          email,
          process.env.DRAPEFIT_SVC_MAIL,
          'Notice on Email Verification - Drape Fit Inc.',
          msgHtml,
          msgTxt
        );
        if (emailSent && emailSent.message === 'Failed to send email') {
          //-- remove orphaned user & token
          await UserModel.findByIdAndRemove(user.id);
          await UserSignTokenModel.findByIdAndRemove(signToken.id);
          console.log('API_signupMobUser_400:', 'Failed to send verify-email');
          res.status(400).json({
            msg: 'Failed to send verify-email'
          });
        } else {
          //-- okay
          console.log('API_signupMobUser_200:', 'Please select your FitFor in the next step');
          res.status(200).send({
            id: user.id
          });
        }
      } else {
        console.log('API_signupMobUser_400:', 'Failed to make verify-token');
        res.status(400).json({
          msg: 'Failed to make verify-token'
        });
      }
    } else {
      console.log('API_signupMobUser_400:', 'Failed to create user');
      res.status(400).json({
        msg: 'Failed to create user'
      });
    }
  } catch (e) {
    console.log('API_signupMobUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const selFitForAfterMobSignup = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', userSchema);
    const KidsModel = sequelize.model('Kids', kidsSchema);

    const { id, fitFor } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      console.log('API_selFitForAfterMobSignup_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    user.fitFor = fitFor;
    await user.save();
    if (fitFor === 2) {
      const firstChild = new KidsModel({
        parentId: user.id,
        kidOrder: 1,
        name: 'YOUR FIRST CHILD',
        gender: 0
      });
      await firstChild.save();
    }
    //-- okay
    console.log('API_selFitForAfterMobSignup_200:', 'Please verify email sent to your account');
    res.status(200).send('Please verify email sent to your account');
  } catch (e) {
    console.log('API_selFitForAfterMobSignup_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const verifyMobUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', userSchema);
    const UserSignTokenModel = sequelize.model('UserSignToken', userSignTokenSchema);
    const UserLoginLogModel = sequelize.model('UserLoginLog', userLoginLogSchema);
    const { tokenStr, platform } = req.body;

    if (!MOB_PLT_LIST.includes(platform)) {
      console.log('API_verifyMobUser_400:', 'Invalid platform access');
      return res.status(400).json({
        msg: 'Invalid platform access'
      });
    }
    if (tokenStr === '20200518') {
      //-- temporary ghost key token
      console.log('API_verifyMobUser_200:', 'Please go login');
      return res.status(200).send('Please go login');
    }
    if (!chkEmailVeriToken(tokenStr)) {
      console.log('API_verifyMobUser_400:', 'Invalid token string(0)');
      return res.status(400).json({
        msg: 'Invalid token string(0)'
      });
    }
    const _uid = tokenStr.split('-')[0];
    const _token = tokenStr.split('-')[1];
    const user = await UserModel.findById(_uid);
    if (!user) {
      console.log('API_verifyMobUser_400:', 'Invalid token string(1)');
      return res.status(400).json({
        msg: 'Invalid token string(1)'
      });
    }
    const { id, email, firstName, lastName } = user;
    const now = new Date();
    const signToken = await UserSignTokenModel.findOne({
      userId: id,
      token: _token
    });
    if (!signToken) {
      console.log('API_verifyMobUser_400:', 'Invalid token string(2)');
      return res.status(400).json({
        msg: 'Invalid token string(2)'
      });
    }
    if (isValidEmailVeriTokenTTL(signToken)) {
      await UserModel.updateOne({ id }, { emailVerified: true });
      await UserSignTokenModel.findByIdAndRemove(signToken.id);
      const authToken = await user.newAuthToken();
      //-- leave login log
      await UserLoginLogModel.create({
        userId: id,
        loginAt: now,
        loginPlatform: platform
      });
      //-- okay
      console.log('API_verifyMobUser_200:', 'Email verified');
      res.status(200).json({
        token: authToken
      });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('API_verifyMobUser_400:', 'Expired token string');
        return res.status(400).json({
          msg: 'Expired token string'
        });
      }
      //-- renew TTL of expired token
      const tNow = now.getTime();
      const hashNew = createHmac('sha256', process.env.JWT_SECRET)
        .update(`${firstName} ${lastName} - ${tNow}`)
        .digest('hex');
      signToken.token = hashNew;
      signToken.tokenSetAt = now;
      await signToken.save();
      //-- send verify email again
      const msgHtml = `<h1>Hi, there!</h1>
        <p>Welcome to our Drape Fit Inc.</p>
        <p>Please use this renewed token string to verify your email address:</p>
        <p>(※ Note that this renewed token is valid only for 1 day.)</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${id}-${hashNew}</pre><br>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
      const msgTxt = `Hi, there!\n
        Welcome to our Drape Fit Inc.\n
        Please use this renewed token string to verify your email address:\n
        (※ Note that this renewed token is valid only for 1 day.)\n\n
        ${id}-${hashNew}\n\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
      const emailSent = await sendSesEmail(
        email,
        process.env.DRAPEFIT_SVC_MAIL,
        'Notice on Email Verification - Drape Fit Inc.',
        msgHtml,
        msgTxt
      );
      if (emailSent && emailSent.message === 'Failed to send email') {
        //-- ignore email failure
        console.log('API_verifyMobUser_400:', 'Failed to verify user');
        res.status(400).json({
          msg: 'Failed to verify user'
        });
      } else {
        console.log('API_verifyMobUser_498:', 'Expired token. Please verify email again for renewed token');
        res.status(498).json({
          msg: 'Expired token. Please verify email again for renewed token'
        });
      }
    }
  } catch (e) {
    console.log('API_verifyMobUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { loginMobUser, getMobUserInfo, logoutMobUser, signupMobUser, selFitForAfterMobSignup, verifyMobUser };
