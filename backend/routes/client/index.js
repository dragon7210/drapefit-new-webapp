import express from 'express';
import settingRoutes from './settingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import kidsProfileRoutes from './kidsProfileRoutes.js';
import menProfileRoutes from './menProfileRoutes.js';
import womenProfileRoutes from './womenProfileRoutes.js';

const clientRoutes = express.Router();

clientRoutes.use('/setting', settingRoutes);
clientRoutes.use('/payment/stripe', paymentRoutes);
clientRoutes.use('/fitprofile', womenProfileRoutes);
clientRoutes.use('/kidsprofile', kidsProfileRoutes);
clientRoutes.use('/fitprofile', menProfileRoutes);
clientRoutes.get('/test', (req, res) => res.send('success'));

export default clientRoutes;
