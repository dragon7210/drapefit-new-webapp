import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import ComponentLoader from 'utils/ComponentLoader';
import AuthSupplierRoutes from 'utils/AuthSupplierRoutes';
import PrivateSupplierRoutes from 'utils/PrivateSupplierRoutes';

const SupplierLogin = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/SupplierLogin')))
);
const SupplierForgotPwd = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/SupplierForgotPwd')))
);
const Dashboard = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/dashboard'))));
const ManageProductCategory = Loadable(
  lazy(() => ComponentLoader(() => import('views/supplier/manage-product-category')))
);
const ManageProduct = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/manage-product'))));
const ProductUsedDetails = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/product-used-details'))));
const ProductUsedSummary = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/product-used-summary'))));
const Setting = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/setting'))));
const POSystem = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/po-system'))));
const CreateVendor = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/vendor/CreateVendor.js'))));
const ViewVendor = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/vendor/ViewVendor.js'))));
const CreateEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/employee/CreateEmployee.js'))));
const ViewEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/employee/ViewEmployee.js'))));
const Verify = Loadable(lazy(() => ComponentLoader(() => import('views/supplier/verify'))));

const SupplierRoutes = {
  path: '/dfsupplier',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AuthSupplierRoutes component={SupplierLogin} />
    },
    {
      path: 'login',
      element: <AuthSupplierRoutes component={SupplierLogin} />
    },
    {
      path: 'forgot-pwd',
      element: <AuthSupplierRoutes component={SupplierForgotPwd} />
    },
    {
      path: 'dashboard',
      element: <PrivateSupplierRoutes component={Dashboard} />
    },
    {
      path: 'manage-product-category',
      element: <PrivateSupplierRoutes component={ManageProductCategory} />
    },
    {
      path: 'manage-product',
      element: <PrivateSupplierRoutes component={ManageProduct} />
    },
    {
      path: 'product-used-details',
      element: <PrivateSupplierRoutes component={ProductUsedDetails} />
    },
    {
      path: 'product-used-summary',
      element: <PrivateSupplierRoutes component={ProductUsedSummary} />
    },
    {
      path: 'setting',
      element: <PrivateSupplierRoutes component={Setting} />
    },
    {
      path: 'po-system',
      element: <PrivateSupplierRoutes component={POSystem} />
    },
    {
      path: 'vendor/create-vendor',
      element: <PrivateSupplierRoutes component={CreateVendor} />
    },
    {
      path: 'vendor/view-vendor',
      element: <PrivateSupplierRoutes component={ViewVendor} />
    },
    {
      path: 'employee/create-employee',
      element: <PrivateSupplierRoutes component={CreateEmployee} />
    },
    {
      path: 'employee/view-employee',
      element: <PrivateSupplierRoutes component={ViewEmployee} />
    },
    {
      path: 'verify/:id',
      element: <PrivateSupplierRoutes component={Verify} />
    },
    {
      path: '*',
      element: <Navigate to="/dfsupplier/login" replace />
    }
  ]
};

export default SupplierRoutes;
