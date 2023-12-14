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
import PaymentCardDetail from './paymentCardDetail.js';
import KidsDetail from '../client/kidsDetail.js';
import DeliverDate from './deliverDate.js';
import ShippingAddress from './shippingAdress.js';

const PaymentGetway = sequelize.define(
  'payment_getway',
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
    emp_id: {
      type: DataTypes.INTEGER
    },
    inv_id: {
      type: DataTypes.INTEGER
    },
    qa_id: {
      type: DataTypes.INTEGER
    },
    support_id: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    profile_type: {
      type: DataTypes.INTEGER
    },
    count: {
      type: DataTypes.INTEGER
    },
    payment_type: {
      type: DataTypes.INTEGER
    },
    mail_status: {
      type: DataTypes.INTEGER
    },
    work_status: {
      type: DataTypes.INTEGER
    },
    transactions_id: {
      type: DataTypes.STRING
    },
    refound_date: {
      type: DataTypes.DATE
    },
    refound_status: {
      type: DataTypes.INTEGER
    },
    refund_msg: {
      type: DataTypes.STRING
    },
    refund_transactions_id: {
      type: DataTypes.STRING
    },
    refund_amount: {
      type: DataTypes.INTEGER
    },
    payment_card_details_id: {
      type: DataTypes.INTEGER,
      references: {
        model: PaymentCardDetail,
        key: 'id'
      }
    },
    auto_checkout: {
      type: DataTypes.INTEGER
    },
    auto_check_out_date: {
      type: DataTypes.DATE
    },
    parent_id: {
      type: DataTypes.STRING
    },
    is_parent_auto_checkout: {
      type: DataTypes.INTEGER
    },
    is_style_fee: {
      type: DataTypes.INTEGER
    },
    finalize_date: {
      type: DataTypes.DATE
    },
    finalize_count: {
      type: DataTypes.INTEGER
    },
    tr_count: {
      type: DataTypes.INTEGER
    },
    delivery_id: {
      type: DataTypes.INTEGER,
      references: {
        model: DeliverDate,
        key: 'id'
      }
    },
    shipping_address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ShippingAddress,
        key: 'id'
      }
    },
    payment_intent_id: {
      type: DataTypes.STRING
    },
    charge_id: {
      type: DataTypes.STRING
    },
    receipt_url: {
      type: DataTypes.STRING
    },
    done_status: {
      type: DataTypes.INTEGER
    },
    created_dt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

PaymentGetway.belongsTo(User, {
  foreignKey: 'user_id'
});
PaymentGetway.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});
PaymentGetway.belongsTo(PaymentCardDetail, {
  foreignKey: 'payment_card_details_id'
});
PaymentGetway.belongsTo(DeliverDate, {
  foreignKey: 'delivery_id'
});
PaymentGetway.belongsTo(ShippingAddress, {
  foreignKey: 'shipping_address_id'
});

export default PaymentGetway;
