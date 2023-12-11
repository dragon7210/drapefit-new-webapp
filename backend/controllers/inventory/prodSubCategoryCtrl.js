import asyncHandler from 'express-async-handler';
import InvRack from '../../models/inventory/rack.js';
import InvProductType from '../../models/inventory/productType.js';

const addInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const { ...rest } = req.body;
    await InvRack.create({
      ...rest
    });
    console.log('API_addInvProdSubCategoryRack_200:', 'Product sub-category has been added');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_addInvProdSubCategoryRack_500:', e?.message);
    res.status(500);
  }
});

const getInvProdSubCategories = asyncHandler(async (req, res) => {
  try {
    const data = await InvRack.findAll({ include: InvProductType });
    //-- okay
    console.log('API_listInvProdSubCategoriesTable_200:', 'Table list data is retrieved');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_listInvProdSubCategoriesTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    await InvRack.update({ ...rest }, { where: { id } });
    res.status(200).send('success');
  } catch (e) {
    console.log('API_editInvProdSubCategoryRack_500:', e?.message);
    res.status(500);
  }
});

const deleteInvProdSubCategoryRack = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await InvRack.destroy({ where: { id } });
    console.log('API_deleteInvProdSubCategoryRack_200:', 'Product sub-category has been deleted');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_deleteInvProdSubCategoryRack_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addInvProdSubCategoryRack, getInvProdSubCategories, editInvProdSubCategoryRack, deleteInvProdSubCategoryRack };
