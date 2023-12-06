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
import KidsDetail from '../client/kidsDetail.js';

const CustomerStylist = sequelize.define(
  'customer_stylist',
  {
    created: {
      type: DataTypes.DATE
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'customer_stylist'
  }
);

CustomerStylist.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default CustomerStylist;
