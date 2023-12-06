import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminMenuItems from 'menu-items/AdminMenuItems';
import SupplierMenuItems from 'menu-items/SupplierMenuItems';
import InventoryMenuItems from 'menu-items/InventoryMenuItems';
import MerchandiseMenuItem from 'menu-items/MerchandiseMenuItem';
import NavGroup from './NavGroup';

const MenuList = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  let SuperAdminMenuItems = AdminMenuItems;
  if (location.pathname.includes('/dfadmin')) {
    SuperAdminMenuItems = AdminMenuItems;
  } else if (location.pathname.includes('/dfinventory')) {
    SuperAdminMenuItems = InventoryMenuItems;
  } else if (location.pathname.includes('/dfmerchandise')) {
    SuperAdminMenuItems = MerchandiseMenuItem;
  } else {
    SuperAdminMenuItems = SupplierMenuItems;
  }
  const MenuItems =
    user?.role === 100
      ? SuperAdminMenuItems
      : user?.role === 101
      ? AdminMenuItems
      : user?.role === 104
      ? InventoryMenuItems
      : user?.role === 107
      ? SupplierMenuItems
      : { items: [] };
  const navItems = MenuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
