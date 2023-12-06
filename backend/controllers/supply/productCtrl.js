/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import SupplyProduct from '../../models/supply/supplyProduct.js';
import SupplyProductCategory from '../../models/supply/supplyProductCategory.js';
import { Op } from 'sequelize';
import SupplyDeduct from '../../models/supply/supplyDeduct.js';

const addSplProduct = asyncHandler(async (req, res) => {
  try {
    let { category, product_photo, quantity, dynamic_deduct, ...rest } = req.body;
    if (DEFAULT_SPL_PROD_CATEGORIES.includes(category)) {
      if (dynamic_deduct) {
        if (!validator.isInt(String(dynamic_deduct), { min: 1 })) {
          console.log('API_addSplProduct_400:', 'Dynamic deduct of product must be greater than or equal to 1');
          return res.status(400).json({
            msg: 'Dynamic deduct of product must be greater than or equal to 1'
          });
        }
      }
    }
    //-- duplication check
    let splProductExist = false;
    const splProduct = await SupplyProduct.findAll({ where: { category } });
    if (splProduct) {
      splProductExist = true;
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = product_photo; //-- backup for local image removal below
    if (product_photo) {
      if (product_photo.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${product_photo}`)) {
          console.log('API_addSplProduct_400:', 'Supplier product image file does not exist');
          return res.status(400).json({
            msg: 'Supplier product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${product_photo}`);
          const key = `supplier/supproducts/${product_photo}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_addSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          product_photo = s3Url;
        }
      }
    }
    const dataFields = {
      ...rest,
      category,
      product_photo
    };
    if (DEFAULT_SPL_PROD_CATEGORIES.includes(category)) {
      if (dynamic_deduct && validator.isInt(String(dynamic_deduct), { min: 1 })) {
        Object.assign(dataFields, {
          dynamic_deduct: parseInt(dynamic_deduct)
        });
      }
    }
    if (splProductExist) {
      Object.assign(dataFields, {
        quantity: splProduct.quantity + quantity,
        current_stock: splProduct.current_stock + quantity
      });
    } else {
      Object.assign(dataFields, {
        quantity,
        current_stock: quantity
      });
    }
    //-- use upsert option (create new if no match is found)
    const splProductNew = await SupProductModel.findOneAndUpdate(
      { category },
      { $set: dataFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    if (!splProductNew) {
      console.log('API_addSplProduct_400:', 'Failed to add supplier product');
      return res.status(400).json({
        msg: 'Failed to add supplier product'
      });
    }
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    const resMsg = splProductExist
      ? 'Supplier product has been updated for the selected category'
      : 'New supplier product has been added';
    console.log('API_addSplProduct_200:', resMsg);
    res.status(200).send({
      product: splProductNew,
      msg: resMsg
    });
  } catch (e) {
    console.log('API_addSplProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const chkSplProdBeforeUpsert = asyncHandler(async (req, res) => {
  try {
    const { category } = req.body;
    const splProductExist = SupplyProduct.findAll({ where: { category } });
    let msg = '';
    if (splProductExist) {
      msg = 'Supplier product for the selected category already exists';
    } else {
      msg = 'No problem';
    }
    //-- okay
    console.log('API_chkSplProdBeforeUpsert_200:', msg);
    res.status(200).send(msg);
  } catch (e) {
    console.log('API_chkSplProdBeforeUpsert_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSplProductsTable = asyncHandler(async (req, res) => {
  try {
    const result = await SupplyProduct.findAll();
    console.log('API_listSplProductsTable_200:', 'Table list data is retrieved');
    res.status(200).json(result);
  } catch (e) {
    console.log('API_listSplProductsTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addMoreSplProdStock = asyncHandler(async (req, res) => {
  try {
    const { id, count } = req.body;

    const supProduct = await SupplyProduct.findByPk(id);
    if (!supProduct) {
      console.log('API_addMoreSplProdStock_400:', 'Supplier product not found');
      return res.status(400).json({
        msg: 'Supplier product not found'
      });
    }
    supProduct.quantity += Number(count);
    supProduct.current_stock += Number(count);
    await supProduct.save();
    //-- okay
    console.log('API_addMoreSplProdStock_200:', 'Added more stock to supplier products');
    res.status(200).json(supProduct);
  } catch (e) {
    console.log('API_addMoreSplProdStock_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const manualDeductSplProdStock = asyncHandler(async (req, res) => {
  try {
    const { id, count } = req.body;

    const supProduct = await SupplyProduct.findByPk(id);
    if (!supProduct) {
      console.log('API_manualDeductSplProdStock_400:', 'Supplier product not found');
      return res.status(400).json({
        msg: 'Supplier product not found'
      });
    }
    if (supProduct.current_stock < count) {
      console.log('API_manualDeductSplProdStock_400:', 'Deduct count cannot be greater than current in-stock');
      return res.status(400).json({
        msg: 'Deduct count cannot be greater than current in-stock'
      });
    }
    supProduct.current_stock -= Number(count);
    supProduct.used += Number(count);
    await supProduct.save();
    //-- okay
    console.log('API_manualDeductSplProdStock_200:', 'Deducted stock manually from supplier products');
    res.status(200).json(supProduct);
  } catch (e) {
    console.log('API_manualDeductSplProdStock_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editSplProduct = asyncHandler(async (req, res) => {
  try {
    let { id, category, product_photo, current_stock, dynamic_deduct, ...rest } = req.body;

    const splProduct = await SupplyProduct.findByPk(id);
    if (!splProduct) {
      console.log('API_editSplProduct_400:', 'Supplier product not found');
      return res.status(400).json({
        msg: 'Supplier product not found'
      });
    }
    //-- conditional data validation
    if (DEFAULT_SPL_PROD_CATEGORIES.includes(category)) {
      if (dynamic_deduct) {
        if (!validator.isInt(String(dynamic_deduct), { min: 1 })) {
          console.log('API_editSplProduct_400:', 'Dynamic deduct of product must be greater than or equal to 1');
          return res.status(400).json({
            msg: 'Dynamic deduct of product must be greater than or equal to 1'
          });
        }
      }
    }
    //-- FORCED duplication check
    let isMustReplace = false;
    const splProductExist = await SupplyProduct.findAll({ where: { category } });
    if (!splProductExist) {
      if (category === splProduct.category) {
        //-- impossible case
        console.log('API_editSplProduct_400:', 'Supplier product not found');
        return res.status(400).json({
          msg: 'Supplier product not found'
        });
      } else {
        //-- category is changed, update category as well :-P
      }
    } else {
      if (category === splProduct.category) {
        //-- category is unchanged, just update normally :)
      } else {
        //-- category is changed, must replace :D
        isMustReplace = true;
      }
    }
    //-- read uploaded local image file to upload to s3 bucket
    const bucket = process.env.S3_BUCKET_NAME;
    const reqImgUrl = product_photo; //-- backup for local image removal below
    if (product_photo) {
      if (product_photo.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        //-- no need to upload
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        if (!existsSync(`${destPath}${product_photo}`)) {
          console.log('API_editSplProduct_400:', 'Supplier product image file does not exist');
          return res.status(400).json({
            msg: 'Supplier product image file does not exist'
          });
        } else {
          const fileContent = readFileSync(`${destPath}${product_photo}`);
          const key = `supplier/supproducts/${product_photo}`;
          const s3Cmd = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent
          });
          const s3Res = await s3Client.send(s3Cmd);
          console.log('API_editSplProduct:', s3Res);
          const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
          product_photo = s3Url;
        }
      }
    }
    const dataFields = {
      ...rest,
      category,
      product_photo,
      current_stock
    };
    if (DEFAULT_SPL_PROD_CATEGORIES.includes(category)) {
      if (dynamic_deduct && validator.isInt(String(dynamic_deduct), { min: 1 })) {
        Object.assign(dataFields, {
          dynamic_deduct: parseInt(dynamic_deduct)
        });
      }
    }
    Object.assign(dataFields, {
      quantity: splProduct.usedAmount + current_stock
    });
    const splProductNew = await SupProductModel.findOneAndUpdate({ id }, { $set: dataFields });
    if (!splProductNew) {
      console.log('API_editSplProduct_400:', 'Failed to edit supplier product');
      return res.status(400).json({
        msg: 'Failed to edit supplier product'
      });
    }
    if (isMustReplace) {
      await SupProductModel.remove({ where: { id: splProductExist.id } });
    }
    //-- remove uploaded temp image file after uploading to s3
    if (reqImgUrl) {
      if (reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
        //-- no need to remove
        //-- silence is gold
      } else {
        const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
        unlinkSync(`${destPath}${reqImgUrl}`);
      }
    }
    //-- okay
    console.log('API_editSplProduct_200:', 'Supplier product has been updated');
    res.status(200).json(splProductNew);
  } catch (e) {
    console.log('API_editSplProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteSplProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await SupplyProduct.destroy({ where: { id } });
    //-- okay
    console.log('API_deleteSplProduct_200:', 'Supplier product has been deleted');
    res.status(200).send('Supplier product has been deleted');
  } catch (e) {
    console.log('API_deleteSplProduct_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSplProdDeductDetailsTable = asyncHandler(async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const data = await SupplyDeduct.findAll({
      where: { created_on: { [Op.between]: [startDate, endDate] } },
      include: SupplyProduct
    });
    //-- okay
    console.log('API_listSplProdDeductDetailsTable_200:', 'Table list data is retrieved');
    res.status(200).send({
      data
    });
  } catch (e) {
    console.log('API_listSplProdDeductDetailsTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const listSplProdDeductSummaryTable = asyncHandler(async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const data = await SupplyDeduct.findAll({
      where: { created_on: { [Op.between]: [startDate, endDate] } },
      include: SupplyProduct
    });
    //-- okay
    console.log('API_listSplProdDeductSummaryTable_200:', 'Table list data is retrieved');
    res.status(200).json({
      data
    });
  } catch (e) {
    console.log('API_listSplProdDeductSummaryTable_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
export {
  addSplProduct,
  chkSplProdBeforeUpsert,
  listSplProductsTable,
  addMoreSplProdStock,
  manualDeductSplProdStock,
  editSplProduct,
  deleteSplProduct,
  listSplProdDeductDetailsTable,
  listSplProdDeductSummaryTable
};
