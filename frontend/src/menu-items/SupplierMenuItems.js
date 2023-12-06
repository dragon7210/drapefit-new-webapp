import { IconDeviceDesktop, IconLogout } from '@tabler/icons';

const icons = { IconDeviceDesktop, IconLogout };

const SupplierMenuItems = {
  items: [
    {
      id: 'supplier',
      title: 'Supplier',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfsupplier/dashboard',
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
              url: '/dfsupplier/employee/create-employee',
              breadcrumbs: false
            },
            {
              id: 'view-employee',
              title: 'View Employee',
              type: 'item',
              url: '/dfsupplier/employee/view-employee',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'vendor',
          title: 'Vendor',
          type: 'collapse',
          children: [
            {
              id: 'create-vendor',
              title: 'Create Vendor',
              type: 'item',
              url: '/dfsupplier/vendor/create-vendor',
              breadcrumbs: false
            },
            {
              id: 'view-vendor',
              title: 'View Vendor',
              type: 'item',
              url: '/dfsupplier/vendor/view-vendor',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manage-product-category',
          title: 'Manage Product Category',
          type: 'item',
          url: '/dfsupplier/manage-product-category',
          breadcrumbs: false
        },
        {
          id: 'manage-product',
          title: 'Manage Product',
          type: 'item',
          url: '/dfsupplier/manage-product',
          breadcrumbs: false
        },
        {
          id: 'product-used-details',
          title: 'Product Used Details',
          type: 'item',
          url: '/dfsupplier/product-used-details',
          breadcrumbs: false
        },
        {
          id: 'product-used-summary',
          title: 'Product Used Summary',
          type: 'item',
          url: '/dfsupplier/product-used-summary',
          breadcrumbs: false
        },
        {
          id: 'po-system',
          title: 'Purchase Order',
          type: 'item',
          url: '/dfsupplier/po-system',
          breadcrumbs: false
        },
        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfsupplier/setting',
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

export default SupplierMenuItems;
