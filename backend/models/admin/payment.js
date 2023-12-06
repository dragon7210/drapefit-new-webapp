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
import WomenPrice from '../client/womenPrice.js'
const Payment = sequelize.define(
  'payment',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER
    },
    sub_total: {
      type: DataTypes.NUMBER
    },

    sales_tax: {
      type: DataTypes.NUMBER
    },
    tax: {
      type: DataTypes.NUMBER
    },
    tax_price: {
      type: DataTypes.NUMBER
    },
    wallet_balance: {
      type: DataTypes.NUMBER
    },
    wallet_check: {
      type: DataTypes.NUMBER
    },
    promo_balance: {
      type: DataTypes.NUMBER
    },
    total_price: {
      type: DataTypes.NUMBER
    },
    stylist_picks_subtotal: {
      type: DataTypes.STRING
    },
    style_fit_fee: {
      type: DataTypes.STRING
    },
    keep_all_discount: {
      type: DataTypes.STRING
    },
    paid_status: {
      type: DataTypes.NUMBER
    },
    product_ids: {
      type: DataTypes.INTEGER
    },
    refund: {
      type: DataTypes.NUMBER
    },
    refund_type: {
      type: DataTypes.NUMBER
    },
    created_dt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

Payment.belongsTo(User, {
  foreignKey: 'user_id'
});
Payment.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default Payment;
