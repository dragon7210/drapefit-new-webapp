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
import KidsDetail from '../client/kidsDetail.js';

const DeliverDate = sequelize.define(
  'deliver_date',
  {
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    date_in_time: {
      type: DataTypes.STRING
    },
    weeks: {
      type: DataTypes.INTEGER
    },
    is_send_me: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'deliver_date'
  }
);

DeliverDate.belongsTo(User, {
  foreignKey: 'user_id'
});
DeliverDate.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default DeliverDate;
