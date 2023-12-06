import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import ComponentLoader from 'utils/ComponentLoader';
import AuthMerchandiseRoutes from 'utils/AuthMerchandiseRoutes';
import PrivateMerchandiseRoutes from 'utils/PrivateMerchandiseRoutes';

const MerchandiseLogin = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MerchandiseLogin')))
);
const Dashboard = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/dashboard'))));
const Setting = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/setting'))));
const CollaborationBrand = Loadable(
  lazy(() => ComponentLoader(() => import('views/merchandise/brand/collaborationBrand')))
);
const NewBrand = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/brand/newBrand'))));
const ViewBrand = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/brand/viewBrand'))));
const DemandBrand = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/brand/demandBrand'))));

const CreateEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/employee/CreateEmployee'))));
const ViewEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/employee/ViewEmployee'))));
const Prediction = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/demand/Prediction'))));
const CustomerDemand = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/demand/CustomerDemand'))));
const ProductResearch = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/demand/ProductResearch'))));
const Clearance = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/pricing/Clearance'))));
const ProductList = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/pricing/Product'))));
const Product = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/product'))));

const BuyingList = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/buying/BuyingList'))));
const PurchaseOrder = Loadable(lazy(() => ComponentLoader(() => import('views/merchandise/buying/PruchaseOrder'))));

const MerchandiseRoutes = {
  path: '/dfmerchandise',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AuthMerchandiseRoutes component={MerchandiseLogin} />
    },
    {
      path: 'login',
      element: <AuthMerchandiseRoutes component={MerchandiseLogin} />
    },
    {
      path: 'dashboard',
      element: <PrivateMerchandiseRoutes component={Dashboard} />
    },
    {
      path: 'setting',
      element: <PrivateMerchandiseRoutes component={Setting} />
    },
    {
      path: 'brand/brand-collaboration',
      element: <PrivateMerchandiseRoutes component={CollaborationBrand} />
    },
    {
      path: 'brand/new-brand',
      element: <PrivateMerchandiseRoutes component={NewBrand} />
    },
    {
      path: 'brand/brand-demand-report',
      element: <PrivateMerchandiseRoutes component={DemandBrand} />
    },
    {
      path: 'brand/view-brand',
      element: <PrivateMerchandiseRoutes component={ViewBrand} />
    },
    {
      path: 'employee/create-employee',
      element: <PrivateMerchandiseRoutes component={CreateEmployee} />
    },
    {
      path: 'employee/view-employee',
      element: <PrivateMerchandiseRoutes component={ViewEmployee} />
    },
    {
      path: 'demand/prediction-list',
      element: <PrivateMerchandiseRoutes component={Prediction} />
    },
    {
      path: 'demand/customer-demand-report',
      element: <PrivateMerchandiseRoutes component={CustomerDemand} />
    },
    {
      path: 'demand/product-research',
      element: <PrivateMerchandiseRoutes component={ProductResearch} />
    },
    {
      path: 'pricing/clearence-price',
      element: <PrivateMerchandiseRoutes component={Clearance} />
    },
    {
      path: 'pricing/price-list',
      element: <PrivateMerchandiseRoutes component={ProductList} />
    },
    {
      path: 'product-quality-assurance',
      element: <PrivateMerchandiseRoutes component={Product} />
    },
    {
      path: 'buying/buying-list',
      element: <PrivateMerchandiseRoutes component={BuyingList} />
    },
    {
      path: 'buying/purchase-order',
      element: <PrivateMerchandiseRoutes component={PurchaseOrder} />
    },
    {
      path: '*',
      element: <Navigate to="/dfmerchandise/login" replace />
    }
  ]
};

export default MerchandiseRoutes;
