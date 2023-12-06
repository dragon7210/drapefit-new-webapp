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

const InvProductType = sequelize.define(
  'in_product_type',
  {
    product_type: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    note: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.NUMBER,
      default: 1
    },
    created: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'in_product_type'
  }
);

export default InvProductType;
