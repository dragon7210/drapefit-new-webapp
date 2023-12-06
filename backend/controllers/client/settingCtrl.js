/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import ShippingAddress from '../../models/admin/shippingAdress.js';
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';
import bcrypt from 'bcryptjs';
import LetsPlanYourFirstFix from '../../models/admin/letsPlanYourFirstFix.js';

const editShipAddress = asyncHandler(async (req, res) => {
  try {
    let { id, ...rest } = req.body;
    await ShippingAddress.update({ ...rest }, { where: { id } });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_editShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addShipAddress = asyncHandler(async (req, res) => {
  try {
    let { ...rest } = req.body;
    await ShippingAddress.create({
      ...rest
    });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_addShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getShipAddress = asyncHandler(async (req, res) => {
  try {
    let user_id = req.user.id;
    let data = await ShippingAddress.findAll({ where: { user_id } });
    res.status(200).send(data);
  } catch (e) {
    console.log('API_getShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const delShipAddress = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await ShippingAddress.destroy({ where: { id } });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_delShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const defaultShipAddress = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await ShippingAddress.update({ default_set: 1 }, { where: { id } });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_delShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deliverShipAddress = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await ShippingAddress.update({ is_billing: 1 }, { where: { id } });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_delShipAddress_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editLoginDetails = asyncHandler(async (req, res) => {
  try {
    let user = await User.findByPk(req.user.id);
    if (!user) {
      console.log('API_editLoginDetails_400:', 'User not found');
      return res.status(400).json({
        msg: 'User not found'
      });
    }
    const { first_name, last_name, currentPwd, newPwd, confirmPwd } = req.body;
    const isMatch = await bcrypt.compare(currentPwd, user.password);
    if (!isMatch) {
      console.log('API_editLoginDetails_400:', 'Current Password is incorrect');
      return res.status(400).json({
        msg: 'Current Password is incorrect'
      });
    }
    if (currentPwd) {
      if (newPwd === '' || confirmPwd === '') {
        console.log('API_editLoginDetails_400:', 'New Passwords are required');
        return res.status(400).json({
          msg: 'New Passwords are required'
        });
      } else if (newPwd !== confirmPwd) {
        console.log('API_editLoginDetails_400:', 'New Passwords do not match');
        return res.status(400).json({
          msg: 'New Passwords do not match'
        });
      }
    }
    await UserDetail.update({ first_name, last_name }, { where: { user_id: user.id } });
    user.password = await HashPassword(newPwd);
    user.name = genUsername(first_name, last_name);
    user.lastmodify_dt = new Date();
    await user.save();
    //-- okay
    console.log('API_editLoginDetails_200:', 'Login Details have been updated');
    res.status(200).send('Login Details have been updated');
  } catch (e) {
    console.log('API_editLoginDetails_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSchedule = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    let { try_new_items_with_scheduled_fixes, applay_dt } = req.body;
    let data = await LetsPlanYourFirstFix.findOne({ where: { user_id } });
    if (data === null) {
      await LetsPlanYourFirstFix.create({
        user_id,
        try_new_items_with_scheduled_fixes,
        applay_dt
      });
    } else {
      await LetsPlanYourFirstFix.update(
        {
          try_new_items_with_scheduled_fixes,
          applay_dt
        },
        { where: { user_id } }
      );
    }
    await UserDetail.update({ is_progressbar: 100 }, { where: { user_id } });
    console.log('API_editMenFPSchedule_200:', 'Schedule of Men Fit Profile has been saved');
    res.status(200).send('Schedule of Men Fit Profile has been saved');
  } catch (e) {
    console.log('API_editMenFPSchedule_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getSchedule = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.id;
    let data = await LetsPlanYourFirstFix.findOne({ where: { user_id } });
    //-- okay
    console.log('API_getSchedule_200:', 'Delivery Schedule of Fit Profile is retrieved');
    res.status(200).json(data);
  } catch (e) {
    console.log('API_getSchedule_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  editShipAddress,
  addShipAddress,
  getShipAddress,
  delShipAddress,
  editLoginDetails,
  editSchedule,
  getSchedule,
  defaultShipAddress,
  deliverShipAddress
};
