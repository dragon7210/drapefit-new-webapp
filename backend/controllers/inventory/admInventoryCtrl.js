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
import path from 'path';

import bcrypt from 'bcryptjs';

import User, { HashPassword } from '../../models/admin/user.js';
import { s3Client } from '../../libs/s3Client.js';
import { listMRTableHandler, genUsername, compareStartAndEndDates } from '../../utils/helper.js';
import { sendSesEmail } from '../../libs/sendSesEmail.js';
import { USER_ROLE_INVENTORY, USER_EMPLOYEE_TYPES } from '../../utils/constant.js';
import InvUser from '../../models/inventory/user.js';

const __dirname = path.resolve();

const getInvProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await InvUser.findOne({ user_id: req.user?.id });
    if (!profile) {
      console.log('API_getInvProfile:', 'Inventory employee profile does not exist yet');
      //-- ignore incompleteness
      return res.status(200).send({
        name: req.user?.name,
        email: req.user?.email,
        phone: '',
        address: ''
      });
    }
    //-- okay
    console.log('API_getInvProfile_200:', 'Inventory employee profile is retrieved');
    res.status(200).send(profile);
  } catch (e) {
    console.log('API_getInvProfile_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProfile = asyncHandler(async (req, res) => {
  try {
    const { ...rest } = req.body;
    if (req.user?.role !== USER_ROLE_INVENTORY || req.user?.email !== email) {
      console.log('API_editInvProfile_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const profile = await InvUser.update(
      { new: true, upsert: true, setDefaultsOnInsert: true, type: 1, typeStr: USER_EMPLOYEE_TYPES[1], ...rest },
      { where: { user_id: req.user?.id } }
    );
    if (!profile) {
      console.log('API_editInvProfile_400:', 'Failed to edit inventory employee profile');
      return res.status(400).json({
        msg: 'Failed to edit inventory employee profile'
      });
    }
    //-- okay
    console.log('API_editInvProfile_200:', 'Inventory employee profile has been updated');
    res.status(200).send(profile);
  } catch (e) {
    console.log('API_editInvProfile_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const resetInvPwd = asyncHandler(async (req, res) => {
  try {
    const { currentPwd, newPwd, confirmPwd } = req.body;
    if (req.user?.role !== USER_ROLE_INVENTORY) {
      console.log('API_resetInvPwd_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    if (newPwd !== confirmPwd) {
      console.log('API_resetInvPwd_400:', 'New passwords do not match');
      return res.status(400).json({
        msg: 'New passwords do not match'
      });
    }
    const user = await User.findOne({ where: { user_id: req.user?.id } });
    if (!user) {
      console.log('API_resetInvPwd_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    const isMatch = await bcrypt.compare(currentPwd, user.password);
    if (!isMatch) {
      console.log('API_resetInvPwd_400:', 'Current password is incorrect');
      return res.status(400).json({
        msg: 'Current password is incorrect'
      });
    }
    if (currentPwd === newPwd) {
      console.log('API_resetInvPwd_400:', 'New password must be different from current password');
      return res.status(400).json({
        msg: 'New password must be different from current password'
      });
    }
    const { email } = user;
    user.password = await HashPassword(newPwd);
    user.pwdChangedAt = new Date();
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_resetInvPwd_200:', 'Password has been updated');
      return res.status(200).send('Password has been updated');
    }

    //-- send notify email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your inventory account password has been changed.</p>
      <p>For security reasons, we have sent you this confirmation email.</p>
      <p>If you already know, just ignore it.</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Ex-Password: ${currentPwd}
      New Password: ${newPwd}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your inventory account password has been changed.\n
      For security reasons, we have sent you this confirmation email.\n
      If you already know, just ignore it.\n\n
      Ex-Password: ${currentPwd}\n
      New Password: ${newPwd}\n\n
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
        'API_resetInvPwd_200:',
        'Password has been updated, but failed to send notify-email. Please check if email address is valid.'
      );
      res.status(200).send('Password has been updated');
    } else {
      //-- okay
      console.log('API_resetInvPwd_200:', 'Password has been updated');
      res.status(200).send('Password has been updated');
    }
  } catch (e) {
    console.log('API_resetInvPwd_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getInvValueSet = asyncHandler(async (req, res) => {
  try {
    const valueset = await InvSettingValueSetModel.findOne({}, null, { sort: '-updatedAt' });
    if (!valueset) {
      console.log('API_getInvValueSet:', 'Inventory value setting does not exist yet');
      //-- ignore incompleteness
      return res.status(200).send({});
    }
    //-- okay
    console.log('API_getInvValueSet_200:', 'Inventory value setting is retrieved');
    res.status(200).send(valueset);
  } catch (e) {
    console.log('API_getInvValueSet_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvValueSet = asyncHandler(async (req, res) => {
  try {
    const { ...rest } = req.body;
    const valueset = await InvSettingValueSetModel.findOne({}, null, { sort: '-updatedAt' });
    if (!valueset) {
      //-- create new one
      const valuesetNew = await InvSettingValueSetModel.create({ ...rest });
      if (!valuesetNew) {
        console.log('API_editInvValueSet_400:', 'Failed to create inventory value setting');
        return res.status(400).json({
          msg: 'Failed to create inventory value setting'
        });
      }
      //-- okay
      console.log('API_editInvValueSet_200:', 'Inventory value setting has been created');
      return res.status(200).send(valuesetNew);
    } else {
      //-- update existing one
      const valuesetUpdate = await InvSettingValueSetModel.findOneAndUpdate({ id: valueset.id }, { $set: { ...rest } });
      if (!valuesetUpdate) {
        console.log('API_editInvValueSet_400:', 'Failed to edit inventory value setting');
        return res.status(400).json({
          msg: 'Failed to edit inventory value setting'
        });
      }
      //-- okay
      console.log('API_editInvValueSet_200:', 'Inventory value setting has been updated');
      return res.status(200).send(valuesetUpdate);
    }
  } catch (e) {
    console.log('API_editInvValueSet_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listInvEmailTpl = asyncHandler(async (req, res) => {
  try {
    const result = await listMRTableHandler(InvSettingEmailTplModel, req.body);
    if (result === null) {
      console.log('API_listInvEmailTpl_400:', 'Failed to get table list data');
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log('API_listInvEmailTpl_200:', 'Table list data is retrieved');
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listInvEmailTpl_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvEmailTpl = asyncHandler(async (req, res) => {
  try {
    const { emailName, template } = req.body;
    const emailtpl = await InvSettingEmailTplModel.create({
      emailName,
      template: template ?? ''
    });
    if (!emailtpl) {
      console.log('API_addInvEmailTpl_400:', 'Failed to add email template');
      return res.status(400).json({
        msg: 'Failed to add email template'
      });
    }
    //-- okay
    console.log('API_addInvEmailTpl_200:', 'Email template has been added');
    res.status(200).send(emailtpl);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_addInvEmailTpl_400:', 'Email name is duplicated');
      res.status(400).json({
        msg: 'Email name is duplicated'
      });
    } else {
      console.log('API_addInvEmailTpl_500:', e?.message);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const editInvEmailTpl = asyncHandler(async (req, res) => {
  try {
    const { id, emailName, template } = req.body;
    const emailtpl = await InvSettingEmailTplModel.findById(id);
    if (!emailtpl) {
      console.log('API_editInvEmailTpl_400:', 'Email template not found');
      return res.status(400).json({
        msg: 'Email template not found'
      });
    }
    emailtpl.emailName = emailName;
    emailtpl.template = template ?? '';
    await emailtpl.save();
    //-- okay
    console.log('API_editInvEmailTpl_200:', 'Email template has been updated');
    res.status(200).send(emailtpl);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_editInvEmailTpl_400:', 'Email name is duplicated');
      res.status(400).json({
        msg: 'Email name is duplicated'
      });
    } else {
      console.log('API_editInvEmailTpl_500:', e?.message);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const deleteInvEmailTpl = asyncHandler(async (req, res) => {
  try {
    const InvSettingEmailTplModel = dbInventoryConn.model('InvSettingEmailTpl', invSettingEmailTplSchema);
    const { id } = req.body;

    await InvSettingEmailTplModel.findOneAndRemove({ id });
    //-- okay
    console.log('API_deleteInvEmailTpl_200:', 'Email template has been deleted');
    res.status(200).send('Email template has been deleted');
  } catch (e) {
    console.log('API_deleteInvEmailTpl_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getInvProfile,
  editInvProfile,
  resetInvPwd,
  getInvValueSet,
  editInvValueSet,
  listInvEmailTpl,
  addInvEmailTpl,
  editInvEmailTpl,
  deleteInvEmailTpl
};
