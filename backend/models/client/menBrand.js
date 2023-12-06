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

const MenBrand = sequelize.define(
  'mens_brand',
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
    mens_brands: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
);

MenBrand.belongsTo(User, {
  foreignKey: 'user_id'
});
MenBrand.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default MenBrand;
