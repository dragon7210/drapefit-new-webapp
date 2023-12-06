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

const MatchingCase = sequelize.define(
  'matching_case',
  {
    payment_id: {
      type: DataTypes.STRING,
      references: {
        model: Payment,
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER
    },
    count: {
      type: DataTypes.INTEGER
    },
    matching: {
      type: DataTypes.STRING
    },
    created_on: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'matching_case'
  }
);

MatchingCase.belongsTo(Payment, {
  foreignKey: 'payment_id'
});
export default MatchingCase;
