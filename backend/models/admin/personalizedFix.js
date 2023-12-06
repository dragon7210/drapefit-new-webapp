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
import Payment from './payment.js';

const PersonalizedFix = sequelize.define(
  'personalized_fix',
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
    tell_in_feet: {
      type: DataTypes.INTEGER
    },
    tell_in_inch: {
      type: DataTypes.INTEGER
    },
    weight_lbs: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'personalized_fix'
  }
);
PersonalizedFix.belongsTo(Payment, {
  foreignKey: 'payment_id'
});
PersonalizedFix.belongsTo(User, {
  foreignKey: 'user_id'
});

export default PersonalizedFix;
