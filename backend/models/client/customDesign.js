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
import KidsDetail from './kidsDetail.js';

const CustomDesign = sequelize.define(
  'custom_desine',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    img_1: {
      type: DataTypes.STRING
    },
    img_2: {
      type: DataTypes.STRING
    },
    img_3: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'custom_desine'
  }
);

CustomDesign.belongsTo(User, {
  foreignKey: 'user_id'
});
CustomDesign.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});
export default CustomDesign;
