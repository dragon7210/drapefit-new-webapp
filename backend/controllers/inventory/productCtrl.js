import asyncHandler from 'express-async-handler';
import InvProduct from '../../models/inventory/product.js';
import InvColor from '../../models/inventory/color.js';
import ProfileBrandStaff from '../../models/admin/profileBrandStaff.js';
import InvUser from '../../models/inventory/user.js';

const listInvProductsTable = asyncHandler(async (req, res) => {
  try {
    const { profile, categoryId } = req.body;
    let data = [];
    if (profile && categoryId) {
      data = await InvProduct.findAll({
        where: { profile_type: profile, product_type: categoryId },
        include: InvColor,
        order: [['id', 'DESC']],
        group: ['prod_id']
      });
    } else if (profile) {
      data = await InvProduct.findAll({
        where: { profile_type: profile },
        include: InvColor,
        order: [['id', 'DESC']],
        group: ['prod_id']
      });
    } else if (categoryId) {
      data = await InvProduct.findAll({
        where: { product_type: categoryId },
        include: InvColor,
        order: [['id', 'DESC']],
        group: ['prod_id']
      });
    }
    console.log('API_listInvProductsTable_200:', 'Table list data is retrieved');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_listInvProductsTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteInvProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await InvProduct.destroy({ where: { id } });
    //-- okay
    console.log('API_deleteInvProductForKids_200:', 'Inventory product has been deleted');
    res.status(200).send('Inventory product has been deleted');
  } catch (e) {
    console.log('API_deleteInvProductForKids_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleInvProductActive = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const invProduct = await InvProduct.findByPk(id);
    const status = invProduct.is_active;
    let message = '';
    let prefix = status === 0 ? '' : 'de';
    //-- toggle
    invProduct.is_active = status === 0 ? 1 : 0;
    invProduct.save();
    message = `Inventory product has been ${prefix}activated`;
    //-- okay
    console.log('API_toggleInvProductActiveForMen_200:', message);
    res.status(200).send(message);
  } catch (e) {
    console.log('API_toggleInvProductActiveForMen_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const reportInvProductsTbllist = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll({
      include: [
        {
          model: InvProduct,
          where: {
            match_status: 2
          }
        }
      ]
    });
    console.log('API_reportInvProductsTbllist_200:', 'Report table list data is retrieved');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_reportInvProductsTbllist_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const summaryInvProductsListForMen = asyncHandler(async (req, res) => {
  try {
    let data = await InvUser.findAll();
    console.log('API_summaryInvProductsListForMen_200:', 'Report table list data is retrieved');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_summaryInvProductsListForMen_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getIndProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const invProduct = await InvProduct.findOne({ where: { id }, include: InvColor });
    console.log('API_getIndProduct_200:');
    res.status(200).send(invProduct);
  } catch (e) {
    console.log('API_getIndProduct_500:');
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addInvProduct = asyncHandler(async (req, res) => {
  try {
    const {
      outfit_prefer = '',
      outfit_matches = '',
      better_body_shape = '',
      wo_style_insp = '',
      occasional_dress = '',
      denim_styles = '',
      wo_top_half = '',
      skin_tone = '',
      profession = '',
      prodSubCategoryId,
      ...rest
    } = req.body;
    await InvProduct.create({
      ...rest,
      outfit_prefer: JSON.stringify(outfit_prefer),
      outfit_matches: JSON.stringify(outfit_matches),
      better_body_shape: JSON.stringify(better_body_shape),
      skin_tone: JSON.stringify(skin_tone),
      wo_top_half: JSON.stringify(wo_top_half),
      profession: JSON.stringify(profession),
      wo_top_half: JSON.stringify(wo_top_half),
      denim_styles: JSON.stringify(denim_styles),
      wo_style_insp: JSON.stringify(wo_style_insp),
      occasional_dress: JSON.stringify(occasional_dress),
      rack: prodSubCategoryId
    });
    // //-- okay
    console.log('API_addInvProduct_200:');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_addInvProduct_500:');
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editInvProduct = asyncHandler(async (req, res) => {
  try {
    let {
      id,
      outfit_prefer,
      outfit_matches,
      better_body_shape,
      skin_tone,
      profession,
      prodSubCategoryId,
      sizeType,
      in_color,
      ...rest
    } = req.body;
    await InvProduct.update(
      {
        ...rest,
        outfit_prefer: outfit_prefer.toString(),
        outfit_matches: outfit_matches.toString(),
        better_body_shape: better_body_shape.toString(),
        skin_tone: skin_tone.toString(),
        profession: profession.toString(),
        rack: prodSubCategoryId
      },
      {
        where: { id }
      }
    );
    console.log('API_editInvProduct_200:');
    res.status(200).send('success');
  } catch (e) {
    console.log('API_editInvProduct_500:');
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getManualProduct = asyncHandler(async (req, res) => {
  try {
    let data = await InvProduct.findAll({ where: { brand_id: 0 } });
    console.log('API_getManualProduct_200:');
    res.status(200).send(data);
  } catch (e) {
    console.log('API_getManualProduct_500:');
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  listInvProductsTable,
  deleteInvProduct,
  toggleInvProductActive,
  reportInvProductsTbllist,
  summaryInvProductsListForMen,
  getIndProduct,
  addInvProduct,
  editInvProduct,
  getManualProduct
};
