/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import User from '../../models/admin/user.js';
import SupplyProductCategory from '../../models/supply/supplyProductCategory.js';
import { DEFAULT_SPL_PROD_CATEGORIES } from '../../utils/constant.js';

const addSplProdCategory = asyncHandler(async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findAll({ where: { email } });
    //-- case: default category
    if (DEFAULT_SPL_PROD_CATEGORIES.includes(name)) {
      const categoryExist = await SupplyProductCategory.findAll({ where: { name } });
      if (categoryExist) {
        console.log('API_addSplProdCategory_400:', 'Default supplier product category already exists');
        return res.status(400).json({
          msg: 'Default supplier product category already exists'
        });
      }
      const defaultCategory = await SupplyProductCategory.create({
        name
      });
      console.log('API_addSplProdCategory_200:', 'Default supplier product category has been added');
      return res.status(200).send(defaultCategory);
    }
    //-- case: custom category
    const customCategory = await SupplyProductCategory.create({ name, user_id: user[0].id });
    if (!customCategory) {
      console.log('API_addSplProdCategory_400:', 'Failed to add supplier product category');
      return res.status(400).json({
        msg: 'Failed to add supplier product category'
      });
    }
    //-- okay
    console.log('API_addSplProdCategory_200:', 'Custom supplier product category has been added');
    res.status(200).send(customCategory);
  } catch (e) {
    console.log('API_addSplProdCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSplProdCategory = asyncHandler(async (req, res) => {
  try {
    const { id, name } = req.body;
    await SupplyProductCategory.update({ name }, { where: { id } });
    console.log('API_editSplProdCategory_200:');
    res.status(200).json('Supplier product category has been updated');
  } catch (e) {
    console.log('API_editSplProdCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteSplProdCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await SupplyProductCategory.destroy({ where: { id } });
    //-- okay
    console.log('API_deleteSplProdCategory_200:');
    res.status(200).send('Supplier product category has been deleted');
  } catch (e) {
    console.log('API_deleteSplProdCategory_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getSplProdCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await SupplyProductCategory.findAll();
    //-- okay
    console.log('API_getSplProdCategories_200:', 'Supplier product categories are retrieved');
    res.status(200).send(categories);
  } catch (e) {
    console.log('API_getSplProdCategories_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addSplProdCategory, editSplProdCategory, deleteSplProdCategory, getSplProdCategories };
