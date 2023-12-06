/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { sequelize } from '../../config/db.js';
import { DataTypes } from 'sequelize';
import SupplyProduct from './supplyProduct.js';
import SupplyVendor from './supplyVendor.js';

const PurchaseOrder = sequelize.define(
  'supply_purchase_order',
  {
    name: {
      type: DataTypes.STRING
    },
    supply_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SupplyProduct,
        key: 'id'
      }
    },
    product_photo: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    required_quantity: {
      type: DataTypes.NUMBER
    },
    supply_vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SupplyVendor,
        key: 'id'
      }
    },

    state: {
      type: DataTypes.STRING
    },
    supplier_type: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.INTEGER
    },
    order: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

PurchaseOrder.belongsTo(SupplyProduct, {
  foreignKey: 'supply_product_id'
});
PurchaseOrder.belongsTo(SupplyVendor, {
  foreignKey: 'supply_vendor_id'
});

export default PurchaseOrder;
