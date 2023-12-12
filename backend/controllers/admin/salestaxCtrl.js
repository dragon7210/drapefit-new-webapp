/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import SalesNotApplicableState from '../../models/admin/salesNotApplicableState.js';

const addStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const { zip_min, zip_max, ...rest } = req.body;
    if (parseInt(zip_max) < parseInt(zip_min)) {
      console.log('API_addStateSalesTax_400:', 'Invalid Zipcode Min & Max');
      return res.status(400).json({
        msg: 'Invalid Zipcode Min & Max'
      });
    }
    //-- create
    const salesTax = await SalesNotApplicableState.create({
      ...rest,
      zip_min,
      zip_max
    });
    if (!salesTax) {
      console.log('API_addStateSalesTax_400:', 'Failed to add sales tax');
      return res.status(400).json({
        msg: 'Failed to add sales tax'
      });
    }
    //-- okay
    console.log('API_addStateSalesTax_200:', 'Sales tax has been added');
    res.status(200).send(salesTax);
  } catch (e) {
    if (e?.message && e?.message.indexOf('duplicate key error') !== -1) {
      console.log('API_addStateSalesTax_400:', 'State name is duplicated');
      res.status(400).json({
        msg: 'State name is duplicated'
      });
    } else {
      console.log('API_addStateSalesTax_500:', e?.message);
      res.status(500);
      throw new Error('Internal error occurred');
    }
  }
});

const listStateSalesTaxTable = asyncHandler(async (req, res) => {
  try {
    const result = await SalesNotApplicableState.findAll();
    if (result === null) {
      console.log('API_listStateSalesTaxTable_400:', 'Failed to get table list data');
      return res.status(400).json({
        msg: 'Failed to get table list data'
      });
    }
    //-- okay
    console.log('API_listStateSalesTaxTable_200:', 'Table list data is retrieved');
    res.status(200).send(result);
  } catch (e) {
    console.log('API_listStateSalesTaxTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const { id, state_name, zip_min, zip_max, tax_rate } = req.body;
    await SalesNotApplicableState.update({ state_name, zip_min, zip_max, tax_rate }, { where: { id } });
    const salesTax = await SalesNotApplicableState.findOne({ where: { id } });
    console.log('API_editStateSalesTax_200:', 'Sales tax has been updated');
    res.status(200).json(salesTax);
  } catch (e) {
    console.log('API_editStateSalesTax_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteStateSalesTax = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await SalesNotApplicableState.destroy({ where: { id } });
    //-- okay
    console.log('API_deleteStateSalesTax_200:', 'Sales tax has been deleted');
    res.status(200).send('Sales tax has been deleted');
  } catch (e) {
    console.log('API_deleteStateSalesTax_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addStateSalesTax, listStateSalesTaxTable, editStateSalesTax, deleteStateSalesTax };
