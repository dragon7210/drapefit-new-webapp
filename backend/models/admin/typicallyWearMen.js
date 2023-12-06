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
import Payment from './payment.js';
import User from './user.js';

const TypicallyWearMen = sequelize.define(
  'typically_wear_men',
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
    shirt: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    waist: {
      type: DataTypes.STRING
    },
    waist_size_run: {
      type: DataTypes.STRING
    },
    inseam: {
      type: DataTypes.STRING
    },
    men_bottom: {
      type: DataTypes.STRING
    },
    bleazer: {
      type: DataTypes.STRING
    },
    shoe: {
      type: DataTypes.STRING
    },
    shoe_medium: {
      type: DataTypes.STRING
    },
    body_type: {
      type: DataTypes.INTEGER
    },
    skin_tone: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'typically_wear_men'
  }
);
TypicallyWearMen.belongsTo(User, {
  foreignKey: 'user_id'
});
TypicallyWearMen.belongsTo(Payment, {
  foreignKey: 'payment_id'
});
export default TypicallyWearMen;
