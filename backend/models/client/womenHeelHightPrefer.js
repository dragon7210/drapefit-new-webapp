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

const WomenHeelHightPrefer = sequelize.define(
  'women_heel_hight_prefer',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    height: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'women_heel_hight_prefer'
  }
);

WomenHeelHightPrefer.belongsTo(User, {
  foreignKey: 'user_id'
});

export default WomenHeelHightPrefer;
