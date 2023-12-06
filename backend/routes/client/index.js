import express from 'express';
import settingRoutes from './settingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import kidsprofileRoutes from './kidsProfileRoutes.js';
import menProfileRoutes from './menProfileRoutes.js';
import womenProfileRoutes from './womenProfileRoutes.js';

const clientRoutes = express.Router();

clientRoutes.use('/setting', settingRoutes);
clientRoutes.use('/payment/stripe', paymentRoutes);
clientRoutes.use('/fitprofile', womenProfileRoutes);
clientRoutes.use('/kidsprofile', kidsprofileRoutes);
clientRoutes.use('/fitprofile', menProfileRoutes);

export default clientRoutes;
