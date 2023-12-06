import { useRoutes } from 'react-router-dom';

import AdminRoutes from './AdminRoutes';
import InventoryRoutes from './InventoryRoutes';
import SupplierRoutes from './SupplierRoutes';
import MerchandiseRoutes from './MerchandiseRoutes';
import UserRoutes from './UserRoutes';

export default function ThemeRoutes() {
  return useRoutes([AdminRoutes, InventoryRoutes, SupplierRoutes, MerchandiseRoutes, UserRoutes]);
}
