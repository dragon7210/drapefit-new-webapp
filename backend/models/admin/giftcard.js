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

const Giftcard = sequelize.define(
  'giftcard',
  {
    giftcode: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.NUMBER
    },
    msg: {
      type: DataTypes.STRING
    },
    expiry_date: {
      type: DataTypes.DATE
    },
    is_active: {
      type: DataTypes.NUMBER
    },
    to_name: {
      type: DataTypes.STRING
    },
    to_email: {
      type: DataTypes.STRING
    },
    from_name: {
      type: DataTypes.STRING
    },
    from_email: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.NUMBER
    },
    delivery_date: {
      type: DataTypes.DATE
    },
    card_holder_name: {
      type: DataTypes.STRING
    },
    cvv: {
      type: DataTypes.NUMBER
    },
    mail_status: {
      type: DataTypes.NUMBER
    },
    charge_id: {
      type: DataTypes.STRING
    },
    receipt_url: {
      type: DataTypes.STRING
    },
    transactions_id: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    recipinet_name: {
      type: DataTypes.STRING
    },
    recipinet_address: {
      type: DataTypes.STRING
    },
    address_line2: {
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
    created_dt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'giftcard'
  }
);

export default Giftcard;
