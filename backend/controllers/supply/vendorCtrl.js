/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import SupplyVendor from '../../models/supply/supplyVendor.js';
import { HashPassword } from '../../models/admin/user.js';

const addVendor = asyncHandler(async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const newPwd = await HashPassword(password);
    await SupplyVendor.create({
      ...rest,
      password: newPwd,
      created: new Date(),
      is_active: 0
    });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_addVendor_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editVendor = asyncHandler(async (req, res) => {
  try {
    const { password, id, ...rest } = req.body;
    const newPwd = await HashPassword(password);
    await SupplyVendor.update({ password: newPwd, ...rest }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_editVendor_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getVendors = asyncHandler(async (req, res) => {
  try {
    const Vendors = await SupplyVendor.findAll();
    res.status(200).send(Vendors);
  } catch (error) {
    console.log('API_getVendors_500:', error);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteVendor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await SupVendorModel.destroy({ where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_getVendors_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changepwdVendor = asyncHandler(async (req, res) => {
  try {
    const { id, password } = req.body;
    const newPwd = await HashPassword(password);
    await SupVendorModel.update({ password: newPwd }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_changepwdVendor_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleactiveVendor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let vendor = await SupplyVendor.findOne({ where: { id } });
    let is_active = vendor.is_active === 0 ? 1 : 0;
    console.log('Current is_active value:', is_active);
    await SupplyVendor.update({ is_active }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('toggleactiveVendor error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
export { addVendor, getVendors, editVendor, deleteVendor, toggleactiveVendor, changepwdVendor };
