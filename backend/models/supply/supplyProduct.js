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
import User from '../admin/user.js';
import SupplyProductCategory from './supplyProductCategory.js';

const SupplyProduct = sequelize.define(
  'supply_product',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    product_name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: SupplyProductCategory,
        key: 'id'
      }
    },
    product_photo: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.NUMBER
    },
    price: {
      type: DataTypes.NUMBER
    },
    supplier_name: {
      type: DataTypes.STRING
    },
    supplier_address: {
      type: DataTypes.STRING
    },
    supplier_email: {
      type: DataTypes.STRING
    },
    supplier_phone: {
      type: DataTypes.STRING
    },
    dynamic_deduct: {
      type: DataTypes.NUMBER
    },
    current_stock: {
      type: DataTypes.NUMBER
    },
    used: {
      type: DataTypes.NUMBER
    },
    created_on: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

SupplyProduct.belongsTo(User, {
  foreignKey: 'user_id'
});
SupplyProduct.belongsTo(SupplyProductCategory, {
  foreignKey: 'category'
});

export default SupplyProduct;
