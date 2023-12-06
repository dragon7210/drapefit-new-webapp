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
import User from './user.js';
import KidsDetail from '../client/kidsDetail.js';
import Payment from './payment.js';

const ShippingAddress = sequelize.define(
  'shipping_address',
  {
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Payment,
        key: 'id'
      }
    },
    full_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    address_line_2: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zipcode: {
      type: DataTypes.STRING
    },
    default_set: {
      type: DataTypes.INTEGER
    },
    country: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    is_billing: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'shipping_address'
  }
);

ShippingAddress.belongsTo(User, {
  foreignKey: 'user_id'
});
ShippingAddress.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});
ShippingAddress.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default ShippingAddress;
