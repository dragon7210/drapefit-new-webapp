/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
const { createHmac, createHash } = await import('node:crypto');
import converter from 'number-to-words';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { format } from 'date-fns';

import { chkEmailVeriToken, genUsername, isValidEmailVeriTokenTTL } from '../utils/helper.js';
import { sendSesEmail } from '../libs/sendSesEmail.js';
import {
  USER_ROLE_SUPER,
  USER_ROLE_ADMIN,
  USER_ROLE_CLIENT,
  USER_ROLE_STYLIST,
  USER_ROLE_INVENTORY,
  USER_ROLE_QA,
  USER_ROLE_SUPPORT,
  USER_ROLE_SUPPLIER,
  USER_ROLE_BRAND
} from '../utils/constant.js';

import User, { CreateToken, HashPassword } from '../models/admin/user.js';
import KidsDetail from '../models/client/kidsDetail.js';
import UserDetail from '../models/admin/userDetail.js';
import Product from '../models/admin/product.js';
import PaymentGetway from '../models/admin/paymentGetway.js';
import SalesNotApplicableState from '../models/admin/salesNotApplicableState.js';

const signupUser = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const { firstName, lastName, email, password, fitFor } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      console.log('API_signupUser_403:', 'User already exists');
      return res.status(403).json({
        msg: 'User already exists'
      });
    }
    const newPwd = await HashPassword(password);
    //-- create user
    const user = await User.create({
      name: genUsername(firstName, lastName),
      email,
      password: newPwd,
      fitFor,
      role: USER_ROLE_CLIENT,
      type: 2
    });
    const userDetail = await UserDetail.create({
      first_name: firstName,
      last_name: lastName,
      gender: fitFor,
      user_id: user.id,
      is_progressbar: 0
    });
    if (user) {
      if (userDetail.gender === 3) {
        //-- create child together
        await KidsDetail.create({
          user_id: user.id,
          kid_count: 1,
          name: 'YOUR FIRST CHILD',
          gender: 0
        });
      }
      //-- create stripe customer
      // try {
      //   const customer = await stripe.customers.create({
      //     name: `${firstName} ${lastName}`,
      //     email,
      //     description: `Register Drape Fit user [${firstName} ${lastName}] as a Stripe customer`
      //   });
      //   user.stripe_customer_key = customer.id;
      //   await user.save();
      // } catch (err) {
      //   //-- remove insufficient user without payment info
      //   await User.destroy({ where: { id: user.id } });
      //   console.log('API_signupUser_400:', err?.message);
      //   return res.status(400).json({
      //     msg: 'Failed to register user as a Stripe customer'
      //   });
      // }

      //-- skip verify-email for development stage
      // if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV) {
        //-- temporary measure for dev milestone testing!!!
        console.log('API_signupUser_200:', 'Please login to your account');
        return res.status(200).send('Please login to your account');
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
          console.log('API_signupUser_400:', 'Failed to send verify-email');
          res.status(400).json({
            msg: 'Failed to send verify-email'
          });
        } else {
          //-- okay
          console.log('API_signupUser_200:', 'Please verify email sent to your account');
          res.status(200).send('Please verify email sent to your account');
        }
      } else {
        console.log('API_signupUser_400:', 'Failed to make verify-token');
        res.status(400).json({
          msg: 'Failed to make verify-token'
        });
      }
    } else {
      console.log('API_signupUser_400:', 'Failed to create user');
      res.status(400).json({
        msg: 'Failed to create user'
      });
    }
  } catch (e) {
    console.log('API_signupUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_loginUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_CLIENT].includes(user.role)) {
      console.log('API_loginUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('API_loginUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    const token = CreateToken(user);
    res.status(200).json({
      token,
      name: user.name
    });
  } catch (e) {
    console.log('API_loginUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginAdminUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_loginAdminUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_ADMIN].includes(user.role)) {
      console.log('API_loginAdminUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('API_loginAdminUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    let newToken = CreateToken(user);
    user.token = newToken;
    await user.save();

    console.log('API_loginAdminUser_200:', 'okay');
    res.status(200).json({
      name: user.name,
      token: newToken
    });
  } catch (e) {
    console.log('API_loginAdminUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginInventoryUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_loginInventoryUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_INVENTORY].includes(user.role)) {
      console.log('API_loginInventoryUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('API_loginInventoryUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    const newToken = CreateToken(user);
    user.token = newToken;
    await user.save();
    res.status(200).json({
      name: user.name,
      token: newToken
    });
  } catch (e) {
    console.log('API_loginInventoryUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginSupplierUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_loginSupplierUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_SUPPLIER].includes(user.role)) {
      console.log('API_loginSupplierUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('API_loginSupplierUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    // if (user.emailVerified) {
    if (user.role === USER_ROLE_SUPPLIER && user.is_allow !== 1) {
      console.log('API_loginSupplierUser_400:', 'Supplier account not yet allowed');
      return res.status(400).json({
        msg: 'Supplier account not yet allowed'
      });
    }
    if (user.role === USER_ROLE_SUPPLIER && user.is_active !== 1) {
      console.log('API_loginSupplierUser_400:', 'Supplier account has been deactivated by admin');
      return res.status(400).json({
        msg: 'Supplier account has been deactivated by admin'
      });
    }
    const token = CreateToken(user);
    user.token = token;
    await user.save();
    //-- okay
    console.log('API_loginSupplierUser_200:', 'okay');
    res.status(200).json({
      token,
      name: user.name
    });
    // } else {
    //   console.log('API_loginSupplierUser_403:', 'Email has not been verified yet');
    //   res.status(403).json({
    //     msg: 'Email has not been verified yet'
    //   });
    // }
  } catch (e) {
    console.log('API_loginSupplierUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginStylistUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', User);
    const UserLoginLogModel = sequelize.model('UserLoginLog', userLoginLogSchema);
    const ProfileEmployeeModel = sequelize.model('ProfileEmployee', profileEmployeeSchema);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('API_loginStylistUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_STYLIST].includes(user.role)) {
      console.log('API_loginStylistUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginStylistUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      if (user.role === USER_ROLE_STYLIST && user.isAllowed !== 1) {
        console.log('API_loginStylistUser_400:', 'Stylist account not yet allowed');
        return res.status(400).json({
          msg: 'Stylist account not yet allowed'
        });
      }
      if (user.role === USER_ROLE_STYLIST && user.is_active !== 1) {
        console.log('API_loginStylistUser_400:', 'Stylist account has been deactivated by admin');
        return res.status(400).json({
          msg: 'Stylist account has been deactivated by admin'
        });
      }
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user.id,
        loginAt: now,
        loginPlatform: 'web'
      });
      if (user.role === USER_ROLE_STYLIST) {
        await ProfileEmployeeModel.findOneAndUpdate(
          { userId: user.id },
          { $set: { lastLoginAt: format(now, 'yyyy-MM-dd HH:mm:ss') } }
        );
      }
      //-- okay
      console.log('API_loginStylistUser_200:', 'okay');
      res.status(200).json({
        token,
        firstName: user.firstName
      });
    } else {
      console.log('API_loginStylistUser_403:', 'Email has not been verified yet');
      res.status(403).json({
        msg: 'Email has not been verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginStylistUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginQAUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', User);
    const UserLoginLogModel = sequelize.model('UserLoginLog', userLoginLogSchema);
    const ProfileEmployeeModel = sequelize.model('ProfileEmployee', profileEmployeeSchema);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('API_loginQAUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_QA].includes(user.role)) {
      console.log('API_loginQAUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginQAUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      if (user.role === USER_ROLE_QA && user.isAllowed !== 1) {
        console.log('API_loginQAUser_400:', 'QA account not yet allowed');
        return res.status(400).json({
          msg: 'QA account not yet allowed'
        });
      }
      if (user.role === USER_ROLE_QA && user.is_active !== 1) {
        console.log('API_loginQAUser_400:', 'QA account has been deactivated by admin');
        return res.status(400).json({
          msg: 'QA account has been deactivated by admin'
        });
      }
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user.id,
        loginAt: now,
        loginPlatform: 'web'
      });
      if (user.role === USER_ROLE_QA) {
        await ProfileEmployeeModel.findOneAndUpdate(
          { userId: user.id },
          { $set: { lastLoginAt: format(now, 'yyyy-MM-dd HH:mm:ss') } }
        );
      }
      //-- okay
      console.log('API_loginQAUser_200:', 'okay');
      res.status(200).json({
        token,
        firstName: user.firstName
      });
    } else {
      console.log('API_loginQAUser_403:', 'Email has not been verified yet');
      res.status(403).json({
        msg: 'Email has not been verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginQAUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginSupportUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', User);
    const UserLoginLogModel = sequelize.model('UserLoginLog', userLoginLogSchema);
    const ProfileEmployeeModel = sequelize.model('ProfileEmployee', profileEmployeeSchema);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('API_loginSupportUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_SUPPORT].includes(user.role)) {
      console.log('API_loginSupportUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginSupportUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      if (user.role === USER_ROLE_SUPPORT && user.isAllowed !== 1) {
        console.log('API_loginSupportUser_400:', 'Support account not yet allowed');
        return res.status(400).json({
          msg: 'Support account not yet allowed'
        });
      }
      if (user.role === USER_ROLE_SUPPORT && user.is_active !== 1) {
        console.log('API_loginSupportUser_400:', 'Support account has been deactivated by admin');
        return res.status(400).json({
          msg: 'Support account has been deactivated by admin'
        });
      }
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user.id,
        loginAt: now,
        loginPlatform: 'web'
      });
      if (user.role === USER_ROLE_SUPPORT) {
        await ProfileEmployeeModel.findOneAndUpdate(
          { userId: user.id },
          { $set: { lastLoginAt: format(now, 'yyyy-MM-dd HH:mm:ss') } }
        );
      }
      //-- okay
      console.log('API_loginSupportUser_200:', 'okay');
      res.status(200).json({
        token,
        firstName: user.firstName
      });
    } else {
      console.log('API_loginSupportUser_403:', 'Email has not been verified yet');
      res.status(403).json({
        msg: 'Email has not been verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginSupportUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const loginBrandUser = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', User);
    const UserLoginLogModel = sequelize.model('UserLoginLog', userLoginLogSchema);
    const ProfileBrandStaffModel = sequelize.model('ProfileBrandStaff', profileBrandStaffSchema);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('API_loginBrandUser_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (![USER_ROLE_SUPER, USER_ROLE_BRAND].includes(user.role)) {
      console.log('API_loginBrandUser_400:', 'Invalid sign-in access');
      return res.status(400).json({
        msg: 'Invalid sign-in access'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('API_loginBrandUser_400:', 'Invalid credentials');
      return res.status(400).json({
        msg: 'Invalid credentials'
      });
    }
    if (user.emailVerified) {
      if (user.role === USER_ROLE_BRAND && user.isAllowed !== 1) {
        console.log('API_loginBrandUser_400:', 'Brand account not yet allowed');
        return res.status(400).json({
          msg: 'Brand account not yet allowed'
        });
      }
      if (user.role === USER_ROLE_BRAND && user.is_active !== 1) {
        console.log('API_loginBrandUser_400:', 'Brand account has been deactivated by admin');
        return res.status(400).json({
          msg: 'Brand account has been deactivated by admin'
        });
      }
      const token = await user.newAuthToken();
      //-- leave login log
      const now = new Date();
      await UserLoginLogModel.create({
        userId: user.id,
        loginAt: now,
        loginPlatform: 'web'
      });
      if (user.role === USER_ROLE_BRAND) {
        await ProfileBrandStaffModel.findOneAndUpdate(
          { userId: user.id },
          { $set: { lastLoginAt: format(now, 'yyyy-MM-dd HH:mm:ss') } }
        );
      }
      //-- okay
      console.log('API_loginBrandUser_200:', 'okay');
      res.status(200).json({
        token,
        firstName: user.firstName
      });
    } else {
      console.log('API_loginBrandUser_403:', 'Email has not been verified yet');
      res.status(403).json({
        msg: 'Email has not been verified yet'
      });
    }
  } catch (e) {
    console.log('API_loginBrandUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getUserInfo = asyncHandler(async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id },
      include: UserDetail
    });
    if (user) {
      let pRoute = '';
      let pStatus = 0;
      const kids = [];
      switch (user.role) {
        case USER_ROLE_SUPER:
          pRoute = '/dfadmin/dashboard';
          break;
        case USER_ROLE_ADMIN:
          pRoute = '/dfadmin/dashboard';
          break;
        case USER_ROLE_STYLIST:
          break;
        case USER_ROLE_INVENTORY:
          pRoute = '/dfinventory/dashboard';
          break;
        case USER_ROLE_QA:
          break;
        case USER_ROLE_SUPPORT:
          break;
        case USER_ROLE_SUPPLIER:
          pRoute = '/dfsupplier/dashboard';
          break;
        case USER_ROLE_BRAND:
          break;
        case USER_ROLE_CLIENT:
          //-- get fit profile's input status
          const gender = Number(user.user_detail.gender);
          const is_progressbar = user.user_detail.is_progressbar;
          if (gender === 3) {
            pRoute = '/select-gender';
          } else {
            const wORm = gender === 2 ? 'women' : 'men';
            if (is_progressbar === 0) {
              pRoute = `/welcome/basic-info/${wORm}`;
              pStatus = 0;
            } else if (is_progressbar === 25) {
              pRoute = `/welcome/style-fit/${wORm}`;
              pStatus = 1;
            } else if (is_progressbar === 50) {
              pRoute = `/welcome/price-range/${wORm}`;
              pStatus = 2;
            } else if (is_progressbar === 75) {
              pRoute = `/welcome/style-custom/${wORm}`;
              pStatus = 3;
            } else if (is_progressbar === 100) {
              pRoute = `/welcome/schedule`;
              pStatus = 4;
            }
          }
          //-- get children info
          const myKids = await KidsDetail.findAll({ where: { user_id: id } });
          if (myKids?.length) {
            for (const kid of myKids) {
              const { kids_clothing_gender, name, is_progressbar, kids_first_name } = kid;
              let kRoute = '';
              let kStatus = 0;
              let kGender = kids_clothing_gender === 'boys' ? 3 : 4;
              if (kids_clothing_gender === '') {
                kRoute = '/welcome/basic-info/kids';
              } else {
                const gORb = kids_clothing_gender;
                if (is_progressbar === 0) {
                  kRoute = `/welcome/basic-info/kids`;
                  kStatus = 0;
                } else if (is_progressbar === 25) {
                  kRoute = `/welcome/style-fit/kids/${gORb}`;
                  kStatus = 1;
                } else if (is_progressbar === 50) {
                  kRoute = `/welcome/price-range/kids/${gORb}`;
                  kStatus = 2;
                } else if (is_progressbar === 75) {
                  kRoute = `/welcome/style-custom/kids/${gORb}`;
                  kStatus = 3;
                } else if (is_progressbar === 100) {
                  kRoute = `/welcome/schedule`;
                  kStatus = 4;
                }
              }
              kids.push({
                order: kid.kid_count,
                name,
                kGender,
                kRoute,
                kStatus,
                name: kids_first_name
              });
              break;
            }
          }
      }
      console.log('API_getUserInfo_200:', 'okay');
      res.status(200).send({
        name: user.name,
        email: user.email,
        role: user.role,
        fitFor: Number(user.user_detail?.gender),
        address: user.address,
        phone: user.phone,
        user_id: user.id,
        pRoute,
        pStatus,
        kids,
        user_detail: user?.user_detail
      });
    } else {
      console.log('API_getUserInfo_404:', 'User not found');
      res.status(404).json({
        msg: 'User not found'
      });
    }
  } catch (e) {
    console.log('API_getUserInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  try {
    const { tokenStr } = req.body;

    if (!chkEmailVeriToken(tokenStr)) {
      console.log('API_verifyUser_400:', 'Invalid token string(0)');
      return res.status(400).json({
        msg: 'Invalid token string(0)'
      });
    }
    const _uid = tokenStr.split('-')[0];
    const _token = tokenStr.split('-')[1];
    const user = await UserModel.findById(_uid);
    if (!user) {
      console.log('API_verifyUser_400:', 'Invalid token string(1)');
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
      console.log('API_verifyUser_400:', 'Invalid token string(2)');
      return res.status(400).json({
        msg: 'Invalid token string(2)'
      });
    }
    if (isValidEmailVeriTokenTTL(signToken)) {
      await User.updateOne({ id }, { emailVerified: true });
      await UserSignTokenModel.findByIdAndRemove(signToken.id);
      const authToken = await user.newAuthToken();
      //-- leave login log
      await UserLoginLogModel.create({
        userId: id,
        loginAt: now,
        loginPlatform: 'web'
      });
      //-- okay
      console.log('API_verifyUser_200:', 'Email verified');
      res.status(200).json({
        token: authToken
      });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('API_verifyUser_400:', 'Expired token string');
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
        console.log('API_verifyUser_400:', 'Failed to verify user');
        res.status(400).json({
          msg: 'Failed to verify user'
        });
      } else {
        console.log('API_verifyUser_498:', 'Expired token. Please verify email again for renewed token');
        res.status(498).json({
          msg: 'Expired token. Please verify email again for renewed token'
        });
      }
    }
  } catch (e) {
    console.log('API_verifyUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const handleForgotPwd = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_handleForgotPwd_403:', 'There is no user with that email');
      return res.status(403).json({
        msg: 'There is no user with that email'
      });
    }
    //-- generate reset token
    user.token = CreateToken(user);
    await user.save();

    if (process.env.NODE_ENV === 'development') {
      console.log('API_handleForgotPwd_200:', 'Reset token has been created');
      return res.status(200).send(user.token);
    }

    //-- send token email
    try {
      const msgHtml = `<h2>Forgot your password?</h2>
        <p>No worries, we'll get you back on track.</p>
        <p>Please use this token string to reset your password:</p>
        <p>(※ Note that this token is valid only for 1 hour.)</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${resetToken}</pre><br>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
      const msgTxt = `Forgot your password?\n
        No worries, we'll get you back on track.\n
        Please use this token string to reset your password:\n
        (※ Note that this token is valid only for 1 hour.)\n\n
        ${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n
        The Support Team at Drape Fit Inc.
      `;
      const emailSent = await sendSesEmail(
        email,
        process.env.DRAPEFIT_SVC_MAIL,
        'Notice on Password Reset - Drape Fit Inc.',
        msgHtml,
        msgTxt
      );
      if (emailSent && emailSent.message === 'Failed to send email') {
        //-- ignore email failure
        console.log('API_handleForgotPwd_400:', 'Failed to send reset-email');
        res.status(400).json({
          msg: 'Failed to send reset-email'
        });
      } else {
        //-- okay
        console.log('API_handleForgotPwd_200:', 'Message with reset token sent to that email');
        res.status(200).send('Message with reset token sent to that email');
      }
    } catch (err) {
      console.log('API_handleForgotPwd:', err?.message);
      user.pwdResetToken = undefined;
      user.pwdResetExpiresAt = undefined;
      await user.save();
      console.log('API_handleForgotPwd_400:', 'Failed to handle request to reset');
      res.status(400).json({
        msg: 'Failed to handle request to reset'
      });
    }
  } catch (e) {
    console.log('API_handleForgotPwd_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const resetUserPwd = asyncHandler(async (req, res) => {
  try {
    const { tokenStr, newPwd } = req.body;
    const hashedToken = createHash('sha256').update(tokenStr).digest('hex');
    //-- find user based on the token
    const user = await User.findOne({
      pwdResetToken: hashedToken,
      pwdResetExpiresAt: { $gt: Date.now() }
    });
    if (!user) {
      console.log('API_resetUserPwd_400:', 'Token is invalid or has expired');
      return res.status(400).json({
        msg: 'Token is invalid or has expired'
      });
    }
    user.password = newPwd;
    user.pwdChangedAt = new Date();
    user.pwdResetToken = undefined;
    user.pwdResetExpiresAt = undefined;
    await user.save();
    //-- okay
    console.log('API_resetUserPwd_200:', 'Password has been reset');
    res.status(200).send('Password has been reset');
  } catch (e) {
    console.log('API_resetUserPwd_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const selectUserFit = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    let user = await User.findById(req.user.id);
    if (!user) {
      console.log('API_selectUserFit_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    if (user.fitFor !== 2) {
      console.log('API_selectUserFit_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const { fitFor } = req.body;
    user.fitFor = fitFor;
    await user.save();
    //-- okay
    const result = fitFor === 2 ? 'women' : 'men';
    console.log('API_selectUserFit_200:', 'User FitFor has been updated');
    res.status(200).send(result);
  } catch (e) {
    console.log('API_selectUserFit_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` & `req.token` was set in [authMdware.js]
    let user = await User.findByPk(req.user.id);
    user.token = '';
    await user.save();
    //-- okay
    console.log('API_logoutUser_200:', 'User logged out');
    res.status(200).send('User logged out');
  } catch (e) {
    console.log('API_logoutUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const strictLogoutUser = asyncHandler(async (req, res) => {
  try {
    //-- `req.user` was set in [authMdware.js]
    req.user.tokens = [];
    await req.user.save();
    //-- okay
    console.log('API_strictLogoutUser_200:', 'User has been strictly logged out');
    res.status(200).send('User has been strictly logged out');
  } catch (e) {
    console.log('API_strictLogoutUser_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addChild = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    const order = parseInt(req.params.order);
    const kidOrders = [1, 2, 3, 4];
    if (!kidOrders.includes(order)) {
      let msg = 'Invalid access of mismatching child order';
      if (order > 4) {
        msg = 'You can add up to 4 children';
      }
      console.log('API_addChild_400:', msg);
      return res.status(400).json({ msg });
    }
    //-- check count of children for order correctness of child
    const ordinal = converter.toWordsOrdinal(order).toUpperCase();
    await KidsDetail.create({
      user_id,
      kid_count: order,
      gender: 0,
      name: `YOUR ${ordinal} CHILD`,
      created_dt: new Date()
    });
    //-- okay
    console.log('API_addChild_200:', `${ordinal} child has been added`);
    res.status(200).send(ordinal);
  } catch (e) {
    console.log('API_addChild_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const confirmInfluencer = asyncHandler(async (req, res) => {
  try {
    const UserModel = sequelize.model('User', User);
    const InfluencerModel = sequelize.model('Influencer', influencerSchema);

    const infId = req.params.arg.replace(/-/g, '');
    const influencer = await InfluencerModel.findById(infId);
    if (!influencer) {
      console.log('API_confirmInfluencer_400:', 'Influencer entity not found');
      return res.status(400).send('Influencer entity not found');
    }
    const user = await UserModel.findById(influencer.userId);
    if (!user) {
      console.log('API_confirmInfluencer_400:', 'User not found');
      return res.status(400).send('User not found');
    }
    //-- update confirmation
    influencer.isConfirmed = true;
    await influencer.save();
    user.isInfluencer = 1;
    await user.save();
    //-- okay
    console.log('API_confirmInfluencer_302:', 'okay');
    res.redirect('/confirm-influencer/success');
  } catch (e) {
    console.log('API_confirmInfluencer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateProfie = asyncHandler(async (req, res) => {
  try {
    let { email, phone, address, name } = req.body;
    await User.update({ phone, address, name }, { where: { email } });
    return res.status(200).send('success');
  } catch (e) {
    console.log('API_updateProfie_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getEmails = asyncHandler(async (req, res) => {
  try {
    let data = await User.findAll();
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getEmails_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  try {
    let { currentPwd, newPwd, confirmPwd, email } = req.body;
    let user = await User.findOne({ where: { email } });
    const isMatch = await bcrypt.compare(currentPwd, user.password);
    if (!isMatch) {
      return res.status(200).send({ msg: 'Current password is wrong', type: 'error' });
    }
    if (newPwd !== confirmPwd) {
      return res.status(200).send({ msg: 'Password is not same', type: 'error' });
    }
    user.password = await HashPassword(newPwd);
    await user.save();
    return res.status(200).send({ msg: 'Success', type: 'success' });
  } catch (e) {
    console.log('API_getEmails_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProfile = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    let data = await User.findOne({ where: { id }, include: [KidsDetail, UserDetail] });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getEmails_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    let userId = req.user.id;
    const paymentGetway = await PaymentGetway.findOne({
      where: { user_id: userId, payment_type: 1 },
      order: [['id', 'DESC']]
    });
    if (!paymentGetway) {
      return res.status(200).send({
        paidStatus: 1, // didn't pay for stylefit fee($20)
        products: []
      });
    }
    const products = (
      await Product.findAll({
        where: { user_id: userId, kid_id: 0, payment_id: paymentGetway.id }
      })
    ).filter((p) => p.checkedout === 'Y' || p.checkedout === 'N');
    let paidStatus;

    if (products.length === 0) {
      paidStatus = 2; // paid for stylefit fee but products are not shipped yet
    } else if (
      products.filter((p) => p.keep_status === 2 && p.checkedout === 'Y').length !==
      products.filter((p) => p.is_replace).length
    ) {
      paidStatus = 3; // paid for stylefit fee and products for exchange are not shipped yet
    } else {
      paidStatus = 4; // last paid stylefit is completed so should reschedule and pay for the new stylefit fee.
    }

    return res.status(200).send({
      paidStatus,
      products: products.filter((p) => p.checkedout === 'Y' || p.checkedout === 'N')
    });
  } catch (error) {
    console.log('API_getProducts_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const orderReview = asyncHandler(async (req, res) => {
  try {
    const { products, productStatus } = req.body;
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findOne({ where: { id: products[i].id } });

      product.keep_status = productStatus[i];

      if (productStatus[i] === 3) {
        // keep
        product.customer_purchase_status = 'Y';
        product.exchange_status = 'N';
        product.return_status = 'N';

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        product.customer_purchasedate = year + '-' + month + '-' + day;
      } else if (productStatus[i] === 2) {
        // exchange
        product.customer_purchasedate = '';
        product.customer_purchase_status = 'N';
        product.exchange_status = 'Y';
        product.return_status = 'N';
      } else {
        product.customer_purchasedate = '';
        product.customer_purchase_status = 'N';
        product.exchange_status = 'N';
        product.return_status = 'Y';

        const currentDate = new Date();
        product.product_valid_return_date = currentDate.toISOString().slice(0, 19).replace('T', ' ');
      }
      await product.save();
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log('API_orderReview_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getTax = asyncHandler(async (req, res) => {
  try {
    const taxes = await SalesNotApplicableState.findAll();
    const zipcode = parseInt(req.query.zipcode + '');
    let tax = 0;

    for (let i = 0; i < taxes.length; i++) {
      if (zipcode >= taxes[i].zip_min && zipcode < taxes[i].zip_max) {
        tax = taxes[i].tax_rate / 100;
        break;
      }
    }

    return res.status(200).send({ tax, taxes });
  } catch (error) {
    console.log('API_orderReview_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  signupUser,
  loginUser,
  loginAdminUser,
  loginInventoryUser,
  loginSupplierUser,
  loginStylistUser,
  loginQAUser,
  loginSupportUser,
  loginBrandUser,
  getUserInfo,
  verifyUser,
  handleForgotPwd,
  resetUserPwd,
  selectUserFit,
  logoutUser,
  strictLogoutUser,
  addChild,
  confirmInfluencer,
  updateProfie,
  getEmails,
  updatePassword,
  getProfile,
  getProducts,
  orderReview,
  getTax
};
