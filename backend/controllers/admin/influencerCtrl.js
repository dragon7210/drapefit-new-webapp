/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import { genKebabCaseStr } from '../../utils/helper.js';
import { sendSesEmail } from '../../libs/sendSesEmail.js';
import { USER_ROLE_CLIENT } from '../../utils/constant.js';
import User from '../../models/admin/user.js';
import Influencer from '../../models/admin/influencer.js';

const createInfluencer = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, note } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_createInfluencer_400:', 'User with that email does not exist');
      return res.status(400).json({
        msg: 'User with that email does not exist'
      });
    }
    if (user.role !== USER_ROLE_CLIENT || user.is_influencer === 1) {
      console.log('API_createInfluencer_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const influencerExists = await Influencer.findOne({ where: { email } });
    if (influencerExists) {
      console.log('API_createInfluencer_400:', 'Influencer entity already exists');
      return res.status(400).json({
        msg: 'Influencer entity already exists'
      });
    }
    
    //-- create influencer
    const influencer = await Influencer.create({
      name,
      email,
      phone,
      note
    });
    if (!influencer) {
      console.log('API_createInfluencer_400:', 'Failed to create influencer');
      return res.status(400).json({
        msg: 'Failed to create influencer'
      });
    }
    const link = `http://${process.env.SERVER_DOMAIN}/dfnew/user/influencer/${genKebabCaseStr(influencer.id)}`;
    influencer.link = link;
    await influencer.save();
    user.is_influencer = 1;
    await user.save();
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createInfluencer_200:', 'Influencer has been created');
      return res.status(200).send('Influencer has been created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit account has been registered as an influencer.</p>
      <p>Please use this link to confirm your registration:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">${reglink}</pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit account has been registered as an influencer.\n
      Please use this link to confirm your registration:\n\n
      ${reglink}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Influencer Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      console.log('API_createInfluencer_400:', 'Influencer has been created, but failed to send notify-email');
      return res.status(400).json({
        msg: 'Influencer has been created, but failed to send notify-email'
      });
    } else {
      //-- okay
      console.log('API_createInfluencer_200:', 'Influencer has been created successfully');
      res.status(200).send('Influencer has been created successfully');
    }
  } catch (e) {
    console.log('API_createInfluencer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listInfluencersTable = asyncHandler(async (req, res) => {
  try {
    const result = await Influencer.findAll();
    if (result === null) {
      console.log('API_listInfluencersTable_400:', 'Failed to get table list data');
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log('API_listInfluencersTable_200:', 'Table list data is retrieved');
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listInfluencersTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInfluencerInfo = asyncHandler(async (req, res) => {
  try {
    const { id, name, email, phone, note } = req.body;

    const influencer = await Influencer.findByPk(id);
    if (!influencer) {
      console.log('API_editInfluencerInfo_400:', 'Influencer not found');
      return res.status(400).json({
        msg: 'Influencer not found'
      });
    }
    if (influencer.email !== email) {
      console.log('API_editInfluencerInfo_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    //-- exception handler - check data correctness
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('API_editInfluencerInfo_400:', 'Client user account not found');
      return res.status(400).json({
        msg: 'Client user account not found'
      });
    }
    //-- edit now
    influencer.name = name;
    influencer.phone = phone;
    influencer.note = note;
    await influencer.save();
    //-- okay
    console.log('API_editInfluencerInfo_200:', 'Influencer info has been updated');
    res.status(200).send(influencer);
  } catch (e) {
    console.log('API_editInfluencerInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInfluencer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const influencer = await Influencer.findByPk(id);
    if (!influencer) {
      console.log('API_deleteInfluencer_400:', 'Influencer not found');
      return res.status(400).json({
        msg: 'Influencer not found'
      });
    }
    const user = await User.findOne({ where: { email: influencer.email } });
    if (!user) {
      console.log('API_deleteInfluencer_400:', 'Failed to check user info');
      return res.status(400).json({
        msg: 'Failed to check user info'
      });
    }
    if (user.role !== USER_ROLE_CLIENT) {
      console.log('API_deleteInfluencer_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }
    const { email } = user;
    //-- delete influencer entity
    await Influencer.destroy({ where: { id } });
    //-- update user status
    user.is_influencer = 0;
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_deleteInfluencer_200:', 'Influencer info has been removed');
      return res.status(200).send('Influencer info has been removed');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>The influencer membership for your Drape Fit account has been removed by admin.</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      The influencer membership for your Drape Fit account has been removed by admin.\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Influencer Membership Cancellation - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure
      console.log(
        'API_deleteInfluencer_200:',
        'Influencer info has been removed, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Influencer info has been removed, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log('API_deleteInfluencer_200:', 'Influencer info has been removed successfully');
      res.status(200).send('Influencer info has been removed successfully');
    }
  } catch (e) {
    console.log('API_deleteInfluencer_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { createInfluencer, listInfluencersTable, editInfluencerInfo, deleteInfluencer };
