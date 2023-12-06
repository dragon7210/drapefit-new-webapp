import express from 'express';
import productCategoryRoutes from './productCategoryRoutes.js';
import vendorRoutes from './vendorRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import productRoutes from './productRoutes.js';
import purchaseOrderRoutes from './purchaseOrderRoutes.js';

const supplyRouter = express.Router();

supplyRouter.use('/manage/category', productCategoryRoutes);
supplyRouter.use('/manage/vendor', vendorRoutes);
supplyRouter.use('/manage/employee', employeeRoutes);
supplyRouter.use('/manage/splproduct', productRoutes);
supplyRouter.use('/manage/purchaseOrder', purchaseOrderRoutes);

export default supplyRouter;
