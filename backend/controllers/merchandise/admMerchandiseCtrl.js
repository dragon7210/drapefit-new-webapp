/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import path from 'path';

import merEmployeeSchema from '../../models/merchandise/merEmployeeSchema.js';
import merBrandSchema from '../../models/merchandise/merBrandSchema.js';
import merPredictionSchema from '../../models/merchandise/merPredictionSchema.js';
import { dbMerchandiseConn } from '../../config/db.js';

const __dirname = path.resolve();

const createEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);
    let { name, email, password, phone, type, about, address } = req.body;

    await MerEmployeeModel.create({
      name,
      email,
      password,
      phone,
      type,
      about,
      address
    });
    //-- okay
    console.log('API_createEmployee_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('API_createEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);

    let employee = await MerEmployeeModel.find();
    //-- okay
    console.log('API_getEmployee_200:', 'Table list data is retrieved');
    res.status(200).json(employee);
  } catch (e) {
    console.log('API_getEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changePwdEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);
    let { id, password } = req.body;
    await MerEmployeeModel.findOneAndUpdate({ id }, { password });
    //-- okay
    console.log('changePwdEmployee_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('changePwdEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);
    let { id } = req.body;
    await MerEmployeeModel.remove({ id });
    //-- okay
    console.log('deleteEmployee_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('deleteEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleactiveEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);
    let { id } = req.body;
    const employee = await MerEmployeeModel.findOne({ id });
    let is_active = employee.is_active;
    is_active = !is_active;
    console.log('Current is_active value:', is_active);
    await MerEmployeeModel.findOneAndUpdate({ id }, { is_active });
    //-- okay
    res.status(200).json('success');
  } catch (e) {
    console.log('deleteEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editEmployee = asyncHandler(async (req, res) => {
  try {
    const MerEmployeeModel = dbMerchandiseConn.model('MerEmployee', merEmployeeSchema);
    console.log(req.body);
    let { name, phone, type, about, address, id } = req.body;

    await MerEmployeeModel.findOneAndUpdate(
      { id },
      {
        name,
        phone,
        type,
        about,
        address
      }
    );
    //-- okay
    console.log('API_createEmployee_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('API_createEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const createBrand = asyncHandler(async (req, res) => {
  try {
    const MerBrandModel = dbMerchandiseConn.model('MerBrand', merBrandSchema);
    let { name, email, phone, brandName, website } = req.body;

    await MerBrandModel.create({
      name,
      email,
      phone,
      brandName,
      website
    });
    console.log('API_createBrand_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('API_createBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getBrands = asyncHandler(async (req, res) => {
  try {
    const MerBrandModel = dbMerchandiseConn.model('MerBrand', merBrandSchema);
    let Brands = await MerBrandModel.find();
    console.log('API_getBrands_200:');
    res.status(200).json(Brands);
  } catch (e) {
    console.log('API_getBrands_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    const MerBrandModel = dbMerchandiseConn.model('MerBrand', merBrandSchema);
    await MerBrandModel.remove({ id });
    console.log('API_deleteBrand_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('API_deleteBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editBrand = asyncHandler(async (req, res) => {
  try {
    let { id, name, email, phone, brandName, website } = req.body;
    const MerBrandModel = dbMerchandiseConn.model('MerBrand', merBrandSchema);
    await MerBrandModel.findOneAndUpdate({ id }, { name, email, phone, brandName, website });
    console.log('API_editBrand_200:');
    res.status(200).json('success');
  } catch (e) {
    console.log('API_editBrand_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPrediction = asyncHandler(async (req, res) => {
  try {
    const MePredictionModel = dbMerchandiseConn.model('MePrediction', merPredictionSchema);
    const Prediction = await MePredictionModel.find();
    console.log('API_getPrediction_200:');
    res.status(200).json(Prediction);
  } catch (e) {
    console.log('API_getPrediction_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  createEmployee,
  getEmployee,
  changePwdEmployee,
  deleteEmployee,
  toggleactiveEmployee,
  editEmployee,
  createBrand,
  getBrands,
  deleteBrand,
  editBrand,
  getPrediction
};
