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

const addVendor = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, phone, about, address_one, address_two } = req.body;
    await SupplyVendor.create({
      name,
      email,
      password,
      phone,
      about,
      address_one,
      address_two,
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
    const { name, email, password, phone, about, address_one, address_two, id } = req.body;
    await SupplyVendor.update({ name, email, password, phone, about, address_one, address_two }, { where: { id } });
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
    await SupVendorModel.update({ password }, { where: { id } });
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
    let vendor = await SupplyVendor.findByPk(id);
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
