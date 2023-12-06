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

const PaymentCardDetail = sequelize.define(
  'payment_card_detail',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    card_name: {
      type: DataTypes.STRING,
      required: true
    },
    card_type: {
      type: DataTypes.STRING,
      required: true
    },
    card_number: {
      type: DataTypes.STRING
    },
    card_expire: {
      type: DataTypes.STRING
    },
    cvv: {
      type: DataTypes.STRING
    },
    stripe_payment_key: {
      type: DataTypes.STRING
    },
    stripe_client_secret_key: {
      type: DataTypes.STRING
    },
    stripe_setup_intent: {
      type: DataTypes.STRING
    },
    is_save: {
      type: DataTypes.NUMBER
    },
    use_card: {
      type: DataTypes.NUMBER
    }
  },
  {
    timestamps: false
  }
);

PaymentCardDetail.belongsTo(User, {
  foreignKey: 'user_id'
});

export default PaymentCardDetail;
