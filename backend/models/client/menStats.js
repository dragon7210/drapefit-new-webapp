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

const MenStats = sequelize.define(
  'men_stat',
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
    best_describes_you: {
      type: String
    },
    tall_feet: {
      type: String
    },
    tell_inch: {
      type: String
    },
    weight_lb: {
      type: String
    },
    birthday: {
      type: Date
    },
    your_occupation: {
      type: String
    },
    commute_to_work: {
      type: Date
    },
    are_you_a_parent: {
      type: String
    }
  },
  {
    timestamps: false
  }
);

MenStats.belongsTo(User, {
  foreignKey: 'user_id'
});
MenStats.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default MenStats;
