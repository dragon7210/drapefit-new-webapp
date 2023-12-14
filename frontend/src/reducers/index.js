import { combineReducers } from 'redux';
import customization from './customization';
//-- Customer

import profile from './client/profile';
import kids from './client/kids';
import payment from './payment';
//-- Admin
import influencer from './admin/influencer';
import stateSalesTax from './admin/stateSalesTax';
import customer from './admin/customer';
import cms from './admin/cms';
import socialMedia from './admin/socialMedia';
import product from './admin/product';
import promocode from './admin/promocode';
import offerPromocode from './admin/offerPromocode';
import giftcard from './admin/giftcard';
import career from './admin/career';
import blog from './admin/blog';
import news from './admin/news';
import subscription from './admin/subscription';
import report from './admin/report';
import initial from './admin/initial';
//-- Supplier
import splProdCategory from './supply/prodCategory';
import splProduct from './supply/product';
import splProdUsedDetails from './supply/prodUsedDetails';
import splProdUsedSummary from './supply/prodUsedSummary';
import splPurchaseOrders from './supply/purchaseOrders';
import splVendor from './supply/vendor';
//-- Inventory
import invColor from './inventory/color';
import invBrand from './inventory/brand';
import invProductCategory from './inventory/productCategory';
import invProdSubCategory from './inventory/prodSubCategory';
import invProduct from './inventory/product';
//-- Merchandise
import merBrand from './merBrand';
import prediction from './merPrediction';
//--common
import employee from './common/employee';
import alert from './common/alert';
import auth from './common/auth';
import masterSummary from './admin/masterSummary';
import masterSupport from './admin/masterSupport';

export default combineReducers({
  alert,
  auth,
  customization,
  profile,
  kids,
  payment,
  influencer,
  stateSalesTax,
  employee,
  splProdCategory,
  splProduct,
  splProdUsedDetails,
  splProdUsedSummary,
  invColor,
  invBrand,
  invProductCategory,
  invProdSubCategory,
  invProduct,
  splPurchaseOrders,
  splVendor,
  merBrand,
  prediction,
  customer,
  cms,
  socialMedia,
  product,
  promocode,
  offerPromocode,
  giftcard,
  career,
  blog,
  news,
  subscription,
  report,
  masterSummary,
  masterSupport,
  initial
});
