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
import Payment from '../admin/payment.js';

const MenFit = sequelize.define(
  'men_fit',
  {
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
    casual_shirts_to_fit: {
      type: DataTypes.STRING
    },
    button_up_shirts_to_fit: {
      type: DataTypes.STRING
    },
    tuck_in_a_button_up_shirt: {
      type: DataTypes.STRING
    },
    jeans_to_fit: {
      type: DataTypes.STRING
    },
    your_pants_to_fit: {
      type: DataTypes.STRING
    },
    prefer_your_shorts: {
      type: DataTypes.STRING
    },
    hem_your_pants: {
      type: DataTypes.STRING
    },
    fit_challenges_shirt_collar: {
      type: DataTypes.STRING
    },
    shirt_shoulder: {
      type: DataTypes.STRING
    },
    sleeve_length: {
      type: DataTypes.STRING
    },
    pant_lower_leg: {
      type: DataTypes.STRING
    },
    pant_thigh: {
      type: DataTypes.STRING
    },
    pant_length: {
      type: DataTypes.STRING
    },
    prefer_color: {
      type: DataTypes.STRING
    },
    take_note_of: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'men_fit'
  }
);

MenFit.belongsTo(User, {
  foreignKey: 'user_id'
});
MenFit.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default MenFit;
