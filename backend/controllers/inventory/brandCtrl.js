import User, { HashPassword } from '../../models/admin/user.js';
import ProfileBrandStaff from '../../models/admin/profileBrandStaff.js';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import InvCollaborationBrand from '../../models/inventory/collaborationBrand.js';
import { USER_ROLE_BRAND } from '../../utils/constant.js';

const createBrandStaff = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const { first_name, last_name, email, password, phone, address, brand_name } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      console.log('API_createBrandStaff_400:', 'User with that email already exists');
      return res.status(400).json({
        msg: 'User with that email already exists'
      });
    }

    const brandExists = await ProfileBrandStaff.findOne({ where: { brand_name } });
    if (brandExists) {
      console.log('API_createBrandStaff_400:', 'Brand name already exists');
      return res.status(400).json({
        msg: 'Brand name already exists'
      });
    }
    const newPwd = await HashPassword(password);
    //-- create user
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: newPwd,
      emailVerified: true,
      role: USER_ROLE_BRAND
    });
    if (!user) {
      console.log('API_createBrandStaff_400:', 'Failed to create user account for brand');
      return res.status(400).json({
        msg: 'Failed to create user account for brand'
      });
    }
    //-- create stripe customer (?)
    // try {
    //   const customer = await stripe.customers.create({
    //     name: `${firstName} ${lastName}`,
    //     email,
    //     description: `Register Drape Fit brand user [${firstName} ${lastName}] as a Stripe customer`
    //   });
    //   user.stripeCusId = customer.id;
    //   await user.save();
    // } catch (err) {
    //   //-- remove insufficient user without payment info
    //   await UserModel.findByIdAndRemove(user.id);
    //   console.log('API_createBrandStaff_400:', err?.message);
    //   return res.status(400).json({
    //     msg: 'Failed to register brand user as a Stripe customer'
    //   });
    // }
    //-- create brand entity
    const brandStaff = await ProfileBrandStaff.create({
      user_id: user.id,
      first_name,
      last_name,
      email,
      phone,
      address,
      brand_name
    });
    if (!brandStaff) {
      //-- remove orphaned user account with no brand entity
      await UserModel.findByIdAndRemove(user.id);
      console.log('API_createBrandStaff_400:', 'Failed to create brand');
      return res.status(400).json({
        msg: 'Failed to create brand'
      });
    }

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createBrandStaff_200:', 'Brand has been created');
      return res.status(200).send('Brand has been created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
        <p>You have been registered as a brand user of Drape Fit Inc. by inventory manager.</p>
        <p>Please use the following credentials to login the Drape Fit service:</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
        Email: ${email}
        Password: ${password}
        </pre><br>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
    const msgTxt = `Hi, there!\n
        You have been registered as a brand user of Drape Fit Inc. by inventory manager.\n
        Please use the following credentials to login the Drape Fit service:\n\n
        Email: ${email}\n
        Password: ${password}\n\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Account Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_createBrandStaff_200:',
        'Brand has been created, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send('Brand has been created, but failed to send notify-email. Please check if email address is valid.');
    } else {
      //-- okay
      console.log('API_createBrandStaff_200:', 'Brand has been created successfully');
      res.status(200).send('Brand has been created successfully');
    }
  } catch (e) {
    console.log('API_createBrandStaff_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listBrandStaffTable = asyncHandler(async (req, res) => {
  try {
    const data = await ProfileBrandStaff.findAll();
    const totalRowCount = data.length;
    //-- okay
    console.log('API_listBrandStaffTable_200:', 'Table list data is retrieved');
    res.status(200).json({
      data,
      meta: { totalRowCount }
    });
  } catch (e) {
    console.log('API_listBrandStaffTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changeBrandStaffPwd = asyncHandler(async (req, res) => {
  try {
    const { id, email, password } = req.body;
    const brandStaff = await ProfileBrandStaff.findByPk(id);
    const user = await User.findByPk(brandStaff?.user_id);
    const newPwd = await HashPassword(password);
    user.password = newPwd;
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_changeBrandStaffPwd_200:', 'Password has been changed');
      return res.status(200).send('Password has been changed');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
        <p>Your brand account password has been changed by inventory manager.</p>
        <p>Please use the following password to login the Drape Fit service:</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
        Password: ${password}
        </pre><br>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
    const msgTxt = `Hi, there!\n
        Your brand account password has been changed by inventory manager.\n
        Please use the following password to login the Drape Fit service:\n\n
        Password: ${password}\n\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Password Change - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_changeBrandStaffPwd_200:',
        'Password has been changed, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send('Password has been changed, but failed to send notify-email. Please check if email address is valid.');
    } else {
      //-- okay
      console.log('API_changeBrandStaffPwd_200:', 'Password has been changed successfully');
      res.status(200).send('Password has been changed successfully');
    }
  } catch (e) {
    console.log('API_changeBrandStaffPwd_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editBrandStaffInfo = asyncHandler(async (req, res) => {
  try {
    const { id, first_name, last_name, email, phone, address, brand_name } = req.body;
    const brandStaff = await ProfileBrandStaff.update(
      { first_name, last_name, email, phone, address, brand_name },
      { where: { id } }
    );
    const user = await User.findByPk(brandStaff.user_id);
    //-- temporary attachment for table listing
    let resBrandStaff = JSON.parse(JSON.stringify(brandStaff));
    resBrandStaff.is_active = user?.is_active;

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_editBrandStaffInfo_200:', 'Brand info has been updated');
      return res.status(200).json({
        msg: 'Brand info has been updated',
        data: resBrandStaff
      });
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
        <p>Your brand account info has been updated by inventory manager.</p>
        <p>Please confirm the following updates:</p><br>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
        First Name: ${first_name}
        Last Name: ${last_name}
        Phone: ${phone}
        Address: ${address}
        Brand Name: ${brand_name}
        </pre><br>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
    const msgTxt = `Hi, there!\n
        Your brand account info has been updated by inventory manager.\n
        Please confirm the following updates:\n\n
        First Name: ${first_name}\n
        Last Name: ${last_name}\n
        Phone: ${phone}\n
        Address: ${address}\n
        Brand Name: ${brand_name}\n\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Info Update - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_editBrandStaffInfo_200:',
        'Brand info has been updated, but failed to send notify-email. Please check if email address is valid.'
      );
      res.status(200).json({
        msg: 'Brand info has been updated, but failed to send notify-email. Please check if email address is valid.',
        data: resBrandStaff
      });
    } else {
      //-- okay
      console.log('API_editBrandStaffInfo_200:', 'Brand info has been updated successfully');
      res.status(200).json({
        msg: 'Brand info has been updated successfully',
        data: resBrandStaff
      });
    }
  } catch (e) {
    console.log('API_editBrandStaffInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteBrandStaff = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const brandStaff = await ProfileBrandStaff.findByPk(id);
    await User.destroy({ where: { id: brandStaff?.user_id } });
    await ProfileBrandStaff.destroy({ where: { id } });
    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_deleteBrandStaff_200:', 'Brand account has been deleted');
      return res.status(200).send('Brand account has been deleted');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
        <p>Your Drape Fit brand account has been deleted by inventory manager.</p>
        <p>The deleted account information is as follows:</p>
        <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
        Email: ${brandStaff.email}
        First Name: ${brandStaff.first_name}
        Last Name: ${brandStaff.last_name}
        Responsible Brand Name: ${brandStaff.brand_name}
        </pre><br>
        <p>Please contact us if there is any problem or inconvenience.</p>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
    const msgTxt = `Hi, there!\n
        Your Drape Fit brand account has been deleted by inventory manager.\n
        The deleted account information is as follows:\n\n
        Email: ${brandStaff.email}
        First Name: ${brandStaff.first_name}
        Last Name: ${brandStaff.last_name}
        Responsible Brand Name: ${brandStaff.brand_name}
        Please contact us if there is any problem or inconvenience.\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Account Deletion - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_deleteBrandStaff_200:',
        'Brand account has been deleted, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Brand account has been deleted, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log('API_deleteBrandStaff_200:', 'Brand account has been deleted successfully');
      res.status(200).send('Brand account has been deleted successfully');
    }
  } catch (e) {
    console.log('API_deleteBrandStaff_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleActiveBrandStaffStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const brandStaff = await ProfileBrandStaff.findByPk(id);
    const user = await User.findByPk(brandStaff.user_id);
    const { email } = user;
    const status = user.is_active;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    user.is_active = status === 0 ? 1 : 0;
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      message = `Brand account has been ${prefix}activated`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      return res.status(200).send(message);
    }

    //-- send notify-email
    message =
      status === 0
        ? 'You can now log in to the Drape Fit service.'
        : 'Unfortunately, you will not be able to log in to the Drape Fit service while deactivated.';
    const msgHtml = `<h1>Hi, there!</h1>
        <p>Your Drape Fit brand account has been ${prefix}activated by inventory manager.</p>
        <p>${message}</p>
        <p>Please contact us if there is any problem or inconvenience.</p>
        <p>Thanks.</p>
        <p><small>The Support Team at Drape Fit Inc.</small></p>
        <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
      `;
    const msgTxt = `Hi, there!\n
        Your Drape Fit brand account has been ${prefix}activated by inventory manager.\n
        ${message}\n
        Please contact us if there is any problem or inconvenience.\n
        Thanks.\n
        The Support Team at Drape Fit Inc.
      `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Brand Account Activation - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      message = `Brand account has been ${prefix}activated, but failed to send notify-email. Please check if email address is valid.`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      res.status(200).send(message);
    } else {
      //-- okay
      message = `Brand account has been ${prefix}activated successfully`;
      console.log('API_toggleActiveBrandStaffStatus_200:', message);
      res.status(200).send(message);
    }
  } catch (e) {
    console.log('API_toggleActiveBrandStaffStatus_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const countBrandStaff = asyncHandler(async (req, res) => {
  try {
    const dataTotal = await ProfileBrandStaff.findAll({ include: User });
    const countTotal = dataTotal.length;
    const dataActive = dataTotal.map((brand) => {
      if (brand.user.is_active === 1) {
        return brand;
      }
    });
    const countActive = dataActive.filter(Boolean).length;
    const countInactive = countTotal - countActive;
    //-- okay
    console.log('API_countBrandStaff_200:', 'Count data is retrieved');
    res.status(200).json({
      countTotal,
      countActive,
      countInactive
    });
  } catch (e) {
    console.log('API_countBrandStaff_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const createCollaborationBrand = asyncHandler(async (req, res) => {
  try {
    const { ...rest } = req.body;
    await InvCollaborationBrand.create({
      ...rest
    });
    console.log('API_createCollaborationBrand_200:');
    res.status(200).send('Collaboration Brand has been created');
  } catch (e) {
    console.log('API_createCollaborationBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getCollaborationBrand = asyncHandler(async (req, res) => {
  try {
    const data = await InvCollaborationBrand.findAll();
    console.log('API_getCollaborationBrand_200:');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_getCollaborationBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteCollaborationBrand = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await InvCollaborationBrand.destroy({ where: { id } });
    //-- okay
    console.log('API_deleteCollaborationBrand_200:');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_deleteCollaborationBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editCollaborationBrand = asyncHandler(async (req, res) => {
  try {
    let { name, email, id, phone, brandName, website } = req.body;
    colbrand = await InvCollaborationBrand.findByPk(id);
    colbrand.name = name;
    colbrand.email = email;
    colbrand.phone = phone;
    colbrand.brandName = brandName;
    colbrand.website = website;
    await colbrand.save();
    //-- okay
    console.log('API_editCollaborationBrand_200:');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_editCollaborationBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  createBrandStaff,
  listBrandStaffTable,
  changeBrandStaffPwd,
  editBrandStaffInfo,
  deleteBrandStaff,
  toggleActiveBrandStaffStatus,
  countBrandStaff,
  createCollaborationBrand,
  getCollaborationBrand,
  deleteCollaborationBrand,
  editCollaborationBrand
};
