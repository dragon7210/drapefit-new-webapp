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

const WomenJeansStyle = sequelize.define(
  'women_jeans_style',
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
    jeans_style: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'women_jeans_style'
  }
);

WomenJeansStyle.belongsTo(User, {
  foreignKey: 'user_id'
});
WomenJeansStyle.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default WomenJeansStyle;
