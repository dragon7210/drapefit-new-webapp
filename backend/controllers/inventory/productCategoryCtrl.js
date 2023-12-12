import asyncHandler from 'express-async-handler';
import InvProductType from '../../models/inventory/productType.js';
import InvRack from '../../models/inventory/rack.js';

const editInvProdType = asyncHandler(async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    await InvProductType.update({ ...rest }, { where: { id } });
    const prodType = await InvProductType.findOne({ where: { id } });
    console.log('API_editInvProdType_200:', 'Product category has been updated');
    res.status(200).json(prodType);
  } catch (e) {
    console.log('API_editInvProdType_500:', e?.message);
    res.status(500);
  }
});

const deleteInvProdType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await InvProductType.destroy({ where: { id } });
    console.log('API_deleteInvProdType_200:', 'Product category has been deleted');
    res.status(200).send('Product category has been deleted');
  } catch (e) {
    console.log('API_deleteInvProdType_500:', e?.message);
    res.status(500);
  }
});

const addInvProdType = asyncHandler(async (req, res) => {
  try {
    const { ...rest } = req.body;
    const prodCategory = await InvProductType.create({
      ...rest
    });
    console.log('API_addInvProdType_200:', 'Product category has been added');
    res.status(200).send(prodCategory);
  } catch (e) {
    console.log('API_addInvProdType_500:', e?.message);
    res.status(500);
  }
});

const getInvProdTypes = asyncHandler(async (req, res) => {
  try {
    const prodCategories = await InvProductType.findAll();
    //-- okay
    console.log('API_getInvProdTypes_200:', 'Product categories are retrieved');
    res.status(200).send(prodCategories);
  } catch (e) {
    console.log('API_getInvProdTypes_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getSubCategories = asyncHandler(async (req, res) => {
  try {
    let { in_product_type_id } = req.body;
    const data = await InvRack.findAll({ where: { in_product_type_id } });
    //-- okay
    console.log('API_getSubCategories_200:', 'Product categories are retrieved');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_getSubCategories_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addInvProdType, editInvProdType, deleteInvProdType, getInvProdTypes, getSubCategories };
