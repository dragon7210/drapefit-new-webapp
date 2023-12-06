import { IconDeviceDesktop, IconLogout } from '@tabler/icons';

const icons = { IconDeviceDesktop, IconLogout };

const MerchandiseMenuItem = {
  items: [
    {
      id: 'merchandise',
      title: 'Merchandise',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfmerchandise/dashboard',
          icon: icons.IconDeviceDesktop,
          breadcrumbs: false
        },
        {
          id: 'employee',
          title: 'Employee',
          type: 'collapse',
          children: [
            {
              id: 'create-employee',
              title: 'Create Employee',
              type: 'item',
              url: '/dfmerchandise/employee/create-employee',
              breadcrumbs: false
            },
            {
              id: 'view-employee',
              title: 'View Employee',
              type: 'item',
              url: '/dfmerchandise/employee/view-employee',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'brand',
          title: 'Brand',
          type: 'collapse',
          children: [
            {
              id: 'brand-collaboration',
              title: 'Brand Collaboration',
              type: 'item',
              url: '/dfmerchandise/brand/brand-collaboration',
              breadcrumbs: false
            },
            {
              id: 'new-brand',
              title: 'New Brand',
              type: 'item',
              url: '/dfmerchandise/brand/new-brand',
              breadcrumbs: false
            },
            {
              id: 'view-brand',
              title: 'View Brand',
              type: 'item',
              url: '/dfmerchandise/brand/view-brand',
              breadcrumbs: false
            },
            {
              id: 'brand-demand-report',
              title: 'Brand Demand Report',
              type: 'item',
              url: '/dfmerchandise/brand/brand-demand-report',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'demand-trend',
          title: 'Demand and Trend',
          type: 'collapse',
          children: [
            {
              id: 'prediction-list',
              title: 'Prediction list',
              type: 'item',
              url: '/dfmerchandise/demand/prediction-list',
              breadcrumbs: false
            },
            {
              id: 'customer-demand-report',
              title: 'Customer Demand Report',
              type: 'item',
              url: '/dfmerchandise/demand/customer-demand-report',
              breadcrumbs: false
            },
            {
              id: 'product-research',
              title: 'Products Research and Analysis',
              type: 'item',
              url: '/dfmerchandise/demand/product-research',
              breadcrumbs: false
            }
          ]
        },

        {
          id: 'pricing',
          title: 'Pricing',
          type: 'collapse',
          children: [
            {
              id: 'price-list',
              title: 'Products Price list',
              type: 'item',
              url: '/dfmerchandise/pricing/price-list',
              breadcrumbs: false
            },
            {
              id: 'clearence-price',
              title: 'Clearance Price',
              type: 'item',
              url: '/dfmerchandise/pricing/clearence-price',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'buying',
          title: 'Buying',
          type: 'collapse',
          children: [
            {
              id: 'buying-list',
              title: 'Buying list',
              type: 'item',
              url: '/dfmerchandise/buying/buying-list',
              breadcrumbs: false
            },
            {
              id: 'purchase-order',
              title: 'Purchase Order',
              type: 'item',
              url: '/dfmerchandise/buying/purchase-order',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'product-quality-assurance',
          title: 'Product Quality Assurance',
          type: 'item',
          url: '/dfmerchandise/product-quality-assurance',
          breadcrumbs: false
        },

        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfmerchandise/setting',
          breadcrumbs: false
        },
        {
          id: 'logout',
          title: 'Logout',
          type: 'logout',
          icon: icons.IconLogout,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default MerchandiseMenuItem;
