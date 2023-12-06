import { IconDeviceDesktop, IconLogout } from '@tabler/icons';

const icons = { IconDeviceDesktop, IconLogout };

const InventoryMenuItems = {
  items: [
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dfinventory/dashboard',
          icon: icons.IconDeviceDesktop,
          breadcrumbs: false
        },
        {
          id: 'brand',
          title: 'Brand',
          type: 'collapse',
          children: [
            {
              id: 'create-brand',
              title: 'Create Brand',
              type: 'item',
              url: '/dfinventory/brand/create-brand',
              breadcrumbs: false
            },
            {
              id: 'view-brand',
              title: 'View Brand',
              type: 'item',
              url: '/dfinventory/brand/view-brand',
              breadcrumbs: false
            },
            {
              id: 'brand-collaboration',
              title: 'Brand Collaboration',
              type: 'item',
              url: '/dfinventory/brand/brand-collaboration',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manual-return-product',
          title: 'Manual Return Product',
          type: 'item',
          url: '/dfinventory/manual-return-product',
          breadcrumbs: false
        },
        {
          id: 'add-product',
          title: 'Add Product',
          type: 'item',
          url: '/dfinventory/add-product/men',
          breadcrumbs: false
        },
        {
          id: 'product-list',
          title: 'Product List',
          type: 'item',
          url: '/dfinventory/product-list',
          breadcrumbs: false
        },
        {
          id: 'manage-category',
          title: 'Manage Category',
          type: 'collapse',
          children: [
            {
              id: 'product-category',
              title: 'Product Category',
              type: 'item',
              url: '/dfinventory/manage-category/product-category',
              breadcrumbs: false
            },
            {
              id: 'product-sub-category',
              title: 'Product SubCategory',
              type: 'item',
              url: '/dfinventory/manage-category/product-sub-category',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'report',
          title: 'Report',
          type: 'collapse',
          children: [
            {
              id: 'inventory-report',
              title: 'Inventory Report',
              type: 'item',
              url: '/dfinventory/report/inventory-report',
              breadcrumbs: false
            },
            {
              id: 'inventory-summary',
              title: 'Inventory Summary',
              type: 'item',
              url: '/dfinventory/report/inventory-summary',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'manage-color',
          title: 'Manage Color',
          type: 'item',
          url: '/dfinventory/manage-color',
          breadcrumbs: false
        },
        {
          id: 'setting',
          title: 'Setting',
          type: 'item',
          url: '/dfinventory/setting',
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

export default InventoryMenuItems;
