/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import SupplyProduct from './supplyProduct.js';

const SupplyDeduct = sequelize.define(
  'supply_deduct',
  {
    supply_product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: SupplyProduct,
        key: 'id'
      }
    },
    quatity: {
      type: DataTypes.NUMBER
    },
    order_id: {
      type: DataTypes.INTEGER
    },
    created_on: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'supply_deduct'
  }
);
SupplyDeduct.belongsTo(SupplyProduct, {
  foreignKey: 'supply_product_id'
});

export default SupplyDeduct;
