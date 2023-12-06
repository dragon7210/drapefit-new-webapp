import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import ComponentLoader from 'utils/ComponentLoader';
import AuthInventoryRoutes from 'utils/AuthInventoryRoutes';
import PrivateInventoryRoutes from 'utils/PrivateInventoryRoutes';

const InventoryLogin = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/InventoryLogin')))
);
const InventoryForgotPwd = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/InventoryForgotPwd')))
);
const Dashboard = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/dashboard'))));
const MenProduct = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/add-product/MenProduct'))));
const WomenProduct = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/add-product/WomenProduct'))));
const GirlProduct = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/add-product/GirlProduct'))));
const BoyProduct = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/add-product/BoyProduct'))));
const CreateBrand = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/brand/CreateBrand'))));
const ViewBrand = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/brand/ViewBrand'))));
const BrandCollaboration = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/brand/BrandCollaboration')))
);
const OverviewTotal = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/product-list/OverviewTotal'))));
const ProductCategory = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/manage-category/ProductCategory')))
);
const ProductSubCategory = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/manage-category/ProductSubCategory')))
);
const ManageColor = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/manage-color'))));
const ManualReturnProduct = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/manual-return-product/ManualReturnProduct')))
);
const AddManualProduct = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/manual-return-product/AddManualProduct')))
);
const ProductList = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/product-list/ProductList'))));
const IndividualProduct = Loadable(
  lazy(() => ComponentLoader(() => import('views/inventory/product-list/IndividualProduct')))
);
const InventoryReport = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/report/InventoryReport'))));
const InventorySummary = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/report/InventorySummary'))));
const Setting = Loadable(lazy(() => ComponentLoader(() => import('views/inventory/setting'))));

const SupplierRoutes = {
  path: '/dfinventory',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AuthInventoryRoutes component={InventoryLogin} />
    },
    {
      path: 'login',
      element: <AuthInventoryRoutes component={InventoryLogin} />
    },
    {
      path: 'forgot-pwd',
      element: <AuthInventoryRoutes component={InventoryForgotPwd} />
    },
    {
      path: 'dashboard',
      element: <PrivateInventoryRoutes component={Dashboard} />
    },
    {
      path: 'add-product/men',
      element: <PrivateInventoryRoutes component={MenProduct} />
    },
    {
      path: 'edit-product/men',
      element: <PrivateInventoryRoutes component={MenProduct} />
    },
    {
      path: 'add-product/women',
      element: <PrivateInventoryRoutes component={WomenProduct} />
    },
    {
      path: 'edit-product/women',
      element: <PrivateInventoryRoutes component={WomenProduct} />
    },
    {
      path: 'add-product/boykids',
      element: <PrivateInventoryRoutes component={BoyProduct} />
    },
    {
      path: 'edit-product/boykids',
      element: <PrivateInventoryRoutes component={BoyProduct} />
    },
    {
      path: 'add-product/girlkids',
      element: <PrivateInventoryRoutes component={GirlProduct} />
    },
    {
      path: 'edit-product/girlkids',
      element: <PrivateInventoryRoutes component={GirlProduct} />
    },
    {
      path: 'brand/create-brand',
      element: <PrivateInventoryRoutes component={CreateBrand} />
    },
    {
      path: 'brand/view-brand',
      element: <PrivateInventoryRoutes component={ViewBrand} />
    },
    {
      path: 'brand/brand-collaboration',
      element: <PrivateInventoryRoutes component={BrandCollaboration} />
    },
    {
      path: 'brand/view-brand',
      element: <PrivateInventoryRoutes component={ViewBrand} />
    },
    {
      path: 'manage-category/product-category',
      element: <PrivateInventoryRoutes component={ProductCategory} />
    },
    {
      path: 'manage-category/product-sub-category/:id?',
      element: <PrivateInventoryRoutes component={ProductSubCategory} />
    },
    {
      path: 'manage-color',
      element: <PrivateInventoryRoutes component={ManageColor} />
    },
    {
      path: 'manual-return-product',
      element: <PrivateInventoryRoutes component={ManualReturnProduct} />
    },
    {
      path: 'add-manual-product',
      element: <PrivateInventoryRoutes component={AddManualProduct} />
    },
    {
      path: 'product-list',
      element: <PrivateInventoryRoutes component={ProductList} />
    },
    {
      path: 'product-list/individual/:id',
      element: <PrivateInventoryRoutes component={IndividualProduct} />
    },
    {
      path: 'product-list/view/:id?/:gender?',
      element: <PrivateInventoryRoutes component={OverviewTotal} />
    },
    {
      path: 'product-list/edit/:id?/:gender?',
      element: <PrivateInventoryRoutes component={OverviewTotal} />
    },
    {
      path: 'report/inventory-report',
      element: <PrivateInventoryRoutes component={InventoryReport} />
    },
    {
      path: 'report/inventory-summary',
      element: <PrivateInventoryRoutes component={InventorySummary} />
    },
    {
      path: 'setting',
      element: <PrivateInventoryRoutes component={Setting} />
    },
    {
      path: '*',
      element: <Navigate to="/dfinventory/login" replace />
    }
  ]
};

export default SupplierRoutes;
