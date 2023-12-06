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
import { sendSesEmail } from '../../libs/sendSesEmail.js';
import { USER_ROLE_STYLIST, USER_EMPLOYEE_TYPES } from '../../utils/constant.js';
import User, { HashPassword } from '../../models/admin/user.js';
import { Op } from 'sequelize';

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_TEST_SK); // *
    const { name, email, password, phone, type, about, address } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      console.log('API_createEmployee_400:', 'User with that email already exists');
      return res.status(400).json({
        msg: 'User with that email already exists'
      });
    }
    let newType;
    switch (type) {
      case 0:
        newType = 3;
        break;
      case 1:
        newType = 7;
        break;
      case 2:
        newType = 8;
      default:
        newType = 9;
        break;
    }
    //-- create user
    const user = await User.create({
      name,
      email,
      password: await HashPassword(password),
      phone,
      address,
      type: newType,
      role: USER_ROLE_STYLIST + type,
      about,
      created_dt: new Date()
    });
    if (!user) {
      console.log('API_createEmployee_400:', 'Failed to create employee user account');
      return res.status(400).json({
        msg: 'Failed to create employee user account'
      });
    }
    //-- create stripe customer (?)
    // try {
    //   const customer = await stripe.customers.create({
    //     name,
    //     email,
    //     description: `Register Drape Fit employee user [${name}] as a Stripe customer`
    //   });
    //   user.stripe_customer_key = customer.id;
    //   await user.save();
    // } catch (err) {
    //   //-- remove insufficient user without payment info
    //   console.log('API_createEmployee_400:', err?.message);
    //   return res.status(400).json({
    //     msg: 'Failed to register employee as a Stripe customer'
    //   });
    // }

    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_createEmployee_200:', 'Employee account has been created');
      return res.status(200).send('Employee account has been created');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>You have been registered as an employee of Drape Fit Inc. by admin.</p>
      <p>Please use the following credentials to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Email: ${email}
      Password: ${password}
      Role: ${USER_EMPLOYEE_TYPES[type]}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      You have been registered as an employee of Drape Fit Inc. by admin.\n
      Please use the following credentials to login the Drape Fit service:\n\n
      Email: ${email}\n
      Password: ${password}\n
      Role: ${USER_EMPLOYEE_TYPES[type]}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Account Registration - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_createEmployee_200:',
        'Employee account has been created, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Employee account has been created, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log('API_createEmployee_200:', 'Employee account has been created successfully');
      res.status(200).send('Employee account has been created successfully');
    }
  } catch (e) {
    console.log('API_createEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listEmployeesTable = asyncHandler(async (req, res) => {
  try {
    const data = await User.findAll({
      where: {
        type: {
          [Op.or]: [7, 3, 8, 9]
        }
      }
    });
    //-- okay
    console.log('API_listEmployeesTable_200:', 'Table list data is retrieved');
    res.status(200).json({
      data
    });
  } catch (e) {
    console.log('API_listEmployeesTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changeEmployeePwd = asyncHandler(async (req, res) => {
  try {
    const { id, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      console.log('API_changeEmployeePwd_400:', 'Employee account not found');
      return res.status(400).json({
        msg: 'Employee account not found'
      });
    }
    if (user.email !== email) {
      console.log('API_changeEmployeePwd_400:', 'Invalid API request');
      return res.status(400).json({
        msg: 'Invalid API request'
      });
    }

    user.password = HashPassword(password);
    await user.save();

    //-- skip notify-email for development stage
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_changeEmployeePwd_200:', 'Password has been changed');
      return res.status(200).send('Password has been changed');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your employee account password has been changed by admin.</p>
      <p>Please use the following password to login the Drape Fit service:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Password: ${password}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your employee account password has been changed by admin.\n
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
        'API_changeEmployeePwd_200:',
        'Password has been changed, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send('Password has been changed, but failed to send notify-email. Please check if email address is valid.');
    } else {
      //-- okay
      console.log('API_changeEmployeePwd_200:', 'Password has been changed successfully');
      res.status(200).send('Password has been changed successfully');
    }
  } catch (e) {
    console.log('API_changeEmployeePwd_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editEmployeeInfo = asyncHandler(async (req, res) => {
  try {
    const { id, name, email, phone, type, about, address } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      console.log('API_editEmployeeInfo_400:', 'Employee account not found');
      return res.status(400).json({
        msg: 'Employee account not found'
      });
    }
    //-- edit employee user account
    let newType;
    switch (type) {
      case 0:
        newType = 3;
        break;
      case 1:
        newType = 7;
        break;
      case 2:
        newType = 8;
      default:
        newType = 9;
        break;
    }
    await User.update({ name, email, phone, type: newType, about, address }, { where: { id } });
    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_editEmployeeInfo_200:', 'Employee info has been updated');
      return res.status(200).json({
        msg: 'Employee info has been updated',
        data: resEmployee
      });
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your employee account info has been updated by admin.</p>
      <p>Please confirm the following updates:</p><br>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Name: ${name}
      Phone: ${phone}
      Role: ${USER_EMPLOYEE_TYPES[type]}
      About: ${about}
      Address: ${address}
      </pre><br>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your employee account info has been updated by admin.\n
      Please confirm the following updates:\n\n
      Name: ${name}\n
      Phone: ${phone}\n
      Role: ${USER_EMPLOYEE_TYPES[type]}\n
      About: ${about}\n
      Address: ${address}\n\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Info Update - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_editEmployeeInfo_200:',
        'Employee info has been updated, but failed to send notify-email. Please check if email address is valid.'
      );
      res.status(200).json({
        msg: 'Employee info has been updated, but failed to send notify-email. Please check if email address is valid.',
        data: resEmployee
      });
    } else {
      //-- okay
      console.log('API_editEmployeeInfo_200:', 'Employee info has been updated successfully');
      res.status(200).json({
        msg: 'Employee info has been updated successfully',
        data: resEmployee
      });
    }
  } catch (e) {
    console.log('API_editEmployeeInfo_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      console.log('API_deleteEmployee_400:', 'Employee account not found');
      return res.status(400).json({
        msg: 'Employee account not found'
      });
    }

    await User.destroy({ where: { id } });

    // if (process.env.NODE_ENV === 'development') {
    if (process.env.NODE_ENV) {
      //-- temporary measure for dev milestone testing!!!
      console.log('API_deleteEmployee_200:', 'Employee account has been deleted');
      return res.status(200).send('Employee account has been deleted');
    }

    //-- send notify-email
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit employee account has been deleted by admin.</p>
      <p>The deleted account information is as follows:</p>
      <pre style="border:1px solid #232f3e;border-radius:0.5em;padding:1em;color:#f76c02;max-width:600px">
      Email: ${email}
      First Name: ${firstName}
      Last Name: ${lastName}
      Employee Type: ${typeStr}
      </pre><br>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit employee account has been deleted by admin.\n
      The deleted account information is as follows:\n\n
      Email: ${email}\n
      First Name: ${firstName}\n
      Last Name: ${lastName}\n
      Employee Type: ${typeStr}\n\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Account Deletion - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      console.log(
        'API_deleteEmployee_200:',
        'Employee account has been deleted, but failed to send notify-email. Please check if email address is valid.'
      );
      res
        .status(200)
        .send(
          'Employee account has been deleted, but failed to send notify-email. Please check if email address is valid.'
        );
    } else {
      //-- okay
      console.log('API_deleteEmployee_200:', 'Employee account has been deleted successfully');
      res.status(200).send('Employee account has been deleted successfully');
    }
  } catch (e) {
    console.log('API_deleteEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleActiveEmployeeStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      console.log('API_toggleActiveEmployeeStatus_400:', 'Employee account not found');
      return res.status(400).json({
        msg: 'Employee account not found'
      });
    }
    // if (USER_ROLE_STYLIST + (employee.type - 1) !== user.role) {
    //   console.log('API_toggleActiveEmployeeStatus_400:', 'Invalid API request');
    //   return res.status(400).json({
    //     msg: 'Invalid API request'
    //   });
    // }
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
      message = `Employee account has been ${prefix}activated`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      return res.status(200).send(message);
    }

    //-- send notify-email
    message =
      status === 0
        ? 'You can now log in to the Drape Fit service.'
        : 'Unfortunately, you will not be able to log in to the Drape Fit service while deactivated.';
    const msgHtml = `<h1>Hi, there!</h1>
      <p>Your Drape Fit employee account has been ${prefix}activated by admin.</p>
      <p>${message}</p>
      <p>Please contact us if there is any problem or inconvenience.</p>
      <p>Thanks.</p>
      <p><small>The Support Team at Drape Fit Inc.</small></p>
      <p><img src="https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/landing/images/logo_full.png" width="160" alt="Drape Fit" /></p>
    `;
    const msgTxt = `Hi, there!\n
      Your Drape Fit employee account has been ${prefix}activated by admin.\n
      ${message}\n
      Please contact us if there is any problem or inconvenience.\n
      Thanks.\n
      The Support Team at Drape Fit Inc.
    `;
    const emailSent = await sendSesEmail(
      email,
      process.env.DRAPEFIT_SVC_MAIL,
      'Notice on Employee Account Activation - Drape Fit Inc.',
      msgHtml,
      msgTxt
    );
    if (emailSent && emailSent.message === 'Failed to send email') {
      //-- ignore failure of sending email
      message = `Employee account has been ${prefix}activated, but failed to send notify-email. Please check if email address is valid.`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      res.status(200).send(message);
    } else {
      //-- okay
      message = `Employee account has been ${prefix}activated successfully`;
      console.log('API_toggleActiveEmployeeStatus_200:', message);
      res.status(200).send(message);
    }
  } catch (e) {
    console.log('API_toggleActiveEmployeeStatus_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  createEmployee,
  listEmployeesTable,
  changeEmployeePwd,
  editEmployeeInfo,
  deleteEmployee,
  toggleActiveEmployeeStatus
};
