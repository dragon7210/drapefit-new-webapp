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

const SupplyProductCategory = sequelize.define(
  'supply_product_category',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    created_on: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);
SupplyProductCategory.belongsTo(User, {
  foreignKey: 'user_id'
});

export default SupplyProductCategory;
