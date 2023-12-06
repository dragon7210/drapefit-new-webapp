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

const promocode = sequelize.define(
  'promocode',
  {
    promocode: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.NUMBER
    },
    comments: {
      type: DataTypes.STRING
    },
    expiry_date: {
      type: DataTypes.DATE
    },
    created_dt: {
      type: DataTypes.DATE
    },
    is_active: {
      type: DataTypes.NUMBER
    }
  },
  {
    timestamps: false,
    tableName: 'promocode'
  }
);

export default promocode;
