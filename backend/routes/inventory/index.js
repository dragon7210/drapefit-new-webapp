import express from 'express';
import brandRoutes from './brandRoutes.js';
import colorRoutes from './colorRoutes.js';
import productCategoryRoutes from './productCategoryRoutes.js';
import prodSubCategoryRoutes from './prodSubCategoryRoutes.js';
import productRoutes from './productRoutes.js';

const inventoryRouter = express.Router();

inventoryRouter.use('/manage/brand', brandRoutes);
inventoryRouter.use('/manage/color', colorRoutes);
inventoryRouter.use('/manage/product/subCategory', prodSubCategoryRoutes);
inventoryRouter.use('/manage/product/category', productCategoryRoutes);
inventoryRouter.use('/manage/product', productRoutes);

export default inventoryRouter;
