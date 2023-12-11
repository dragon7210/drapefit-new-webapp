/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import PurchaseOrder from '../../models/supply/purchaseOrder.js';
import SupplyProduct from '../../models/supply/supplyProduct.js';
import SupplyVendor from '../../models/supply/supplyVendor.js';

const getPurchaseOrders = asyncHandler(async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({ where: { state: 'default' }, include: SupplyProduct });
    //-- okay
    console.log('API_getPurchaseOrders_200:', 'Supplier purchase orders are retrieved');
    res.status(200).send(purchaseOrders);
  } catch (e) {
    console.log('API_getPurchaseOrders_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPurchaseOrdersApproved = asyncHandler(async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({ where: { state: 'approve' }, include: SupplyProduct });
    //-- okay
    console.log('API_getPurchaseOrdersApproved_200:', 'Supplier purchase orders are retrieved');
    res.status(200).send(purchaseOrders);
  } catch (e) {
    console.log('API_getPurchaseOrdersApproved_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let { product_photo, required_quantity, supply_product_id, name, deadline, description } = req.body;
    // const bucket = process.env.S3_BUCKET_NAME;
    // const reqImgUrl = product_photo;
    // if (product_photo) {
    //   if (!product_photo.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
    //     const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    //     if (!existsSync(`${destPath}${product_photo}`)) {
    //       console.log('API_addSplProduct_400:', 'Supplier product image file does not exist');
    //       return res.status(400).json({
    //         msg: 'Supplier product image file does not exist'
    //       });
    //     } else {
    //       const fileContent = readFileSync(`${destPath}${product_photo}`);
    //       const key = `supplier/posystem/${product_photo}`;
    //       const s3Cmd = new PutObjectCommand({
    //         Bucket: bucket,
    //         Key: key,
    //         Body: fileContent
    //       });
    //       const s3Res = await s3Client.send(s3Cmd);
    //       console.log('API_addSplProduct:', s3Res);
    //       const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    //       product_photo = s3Url;
    //     }
    //   }
    // }
    await PurchaseOrder.create({
      product_photo,
      required_quantity,
      supply_product_id,
      name,
      description,
      deadline,
      state: 'default'
    });

    // if (reqImgUrl) {
    //   if (!reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
    //     const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    //     unlinkSync(`${destPath}${reqImgUrl}`);
    //   }
    // }
    res.status(200).send('success');
  } catch (error) {
    console.log('API_addPurchaseOrders_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deletePurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await PurchaseOrder.destroy({ where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_deletePurchaseOrder_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let { name, supply_product_id, product_photo, description, required_quantity, deadline, id } = req.body;
    // const bucket = process.env.S3_BUCKET_NAME;
    // const reqImgUrl = product_photo;
    // if (product_photo) {
    //   if (!product_photo.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
    //     const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    //     if (!existsSync(`${destPath}${product_photo}`)) {
    //       console.log('API_addSplProduct_400:', 'Supplier product image file does not exist');
    //       return res.status(400).json({
    //         msg: 'Supplier product image file does not exist'
    //       });
    //     } else {
    //       const fileContent = readFileSync(`${destPath}${product_photo}`);
    //       const key = `supplier/posystem/${product_photo}`;
    //       const s3Cmd = new PutObjectCommand({
    //         Bucket: bucket,
    //         Key: key,
    //         Body: fileContent
    //       });
    //       const s3Res = await s3Client.send(s3Cmd);
    //       console.log('API_addSplProduct:', s3Res);
    //       const s3Url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    //       product_photo = s3Url;
    //     }
    //   }
    // }
    await PurchaseOrder.update(
      {
        name,
        supply_product_id,
        product_photo,
        description,
        required_quantity,
        deadline
      },
      { where: { id } }
    );
    // if (reqImgUrl) {
    //   if (!reqImgUrl.includes(`https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/`)) {
    //     const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    //     unlinkSync(`${destPath}${reqImgUrl}`);
    //   }
    // }
    res.status(200).send('success');
  } catch (error) {
    console.log('API_editPurchaseOrder_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setAssignPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await PurchaseOrder.update({ assign: 'true' }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_setAssignPurchaseOrder_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setAssignedPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let { id } = req.body;
    await id.map(async (item) => {
      await PurchaseOrder.update({ state: 'assign' }, { where: { id: item } });
    });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_setApprovePurchaseOrderAssigned_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getpurchaseOrdersAssigned = asyncHandler(async (req, res) => {
  try {
    const assignedPurchaseOrders = await PurchaseOrder.findAll({ where: { state: 'assign' }, include: SupplyProduct });
    res.status(200).send(assignedPurchaseOrders);
  } catch (error) {
    console.log('API_getpurchaseOrdersAssigned_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const setApprovePurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { id, vendor } = req.body;
    for (let i = 0; i < id.length; i++) {
      await PurchaseOrder.update(
        { supply_vendor_id: vendor[i], state: 'approve', created: new Date() },
        { where: { id: id[i] } }
      );
    }
    res.status(200).send('success');
    console.log('setApprovePurchaseOrder success');
  } catch (error) {
    console.log('toggleactiveVendor error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const addRequiredQuantityPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { id, add } = req.body;
    let purchase = await PurchaseOrder.findByPk(id);
    await PurchaseOrder.update({ required_quantity: purchase.required_quantity + Number(add) }, { where: { id } });
    res.status(200).send('success');
    console.log('addStocksPurchaseOrder success');
  } catch (error) {
    console.log('toggleactiveVendor error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});
const closePurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await PurchaseOrder.update({ state: 'close' }, { where: { id } });
    res.status(200).send('success');
    console.log('closePurchaseOrder success');
  } catch (error) {
    console.log('closePurchaseOrder error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changePurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { id, supplier_type } = req.body;
    await PurchaseOrder.update({ supplier_type }, { where: { id } });
    res.status(200).send('success');
    console.log('changePurchaseOrder success');
  } catch (error) {
    console.log('changePurchaseOrder error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const orderedPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    const { data, order } = req.body;
    for (let i = 0; i < data.length; i++) {
      await PurchaseOrder.update({ state: 'order', order }, { where: { id: data[i].id } });
    }
    res.status(200).send('success');
    console.log('orderedPurchaseOrder success');
  } catch (error) {
    console.log('orderedPurchaseOrder error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getPurchaseOrdered = asyncHandler(async (req, res) => {
  try {
    const PurchaseOrders = await PurchaseOrder.findAll({
      where: { state: 'order' },
      include: [SupplyProduct, SupplyVendor]
    });
    res.status(200).send(PurchaseOrders);
    console.log('getPurchaseOrdered success');
  } catch (error) {
    console.log('getPurchaseOrdered error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const handleOrderedEdit = asyncHandler(async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    await PurchaseOrder.update({ ...rest }, { where: { id } });
    res.status(200).send('success');
    console.log('handleOrderedEdit success');
  } catch (error) {
    console.log('handleOrderedEdit error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getAllPurchaseOrder = asyncHandler(async (req, res) => {
  try {
    let purchaseOrders = await PurchaseOrder.findAll({ include: [SupplyProduct, SupplyVendor] });
    res.status(200).send(purchaseOrders);
    console.log('handleOrderedEdit success');
  } catch (error) {
    console.log('handleOrderedEdit error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export {
  getPurchaseOrders,
  addPurchaseOrder,
  setAssignPurchaseOrder,
  deletePurchaseOrder,
  editPurchaseOrder,
  setAssignedPurchaseOrder,
  getpurchaseOrdersAssigned,
  setApprovePurchaseOrder,
  addRequiredQuantityPurchaseOrder,
  getPurchaseOrdersApproved,
  closePurchaseOrder,
  changePurchaseOrder,
  orderedPurchaseOrder,
  getPurchaseOrdered,
  handleOrderedEdit,
  getAllPurchaseOrder
};
