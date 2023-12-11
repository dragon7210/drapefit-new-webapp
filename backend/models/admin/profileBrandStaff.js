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

const ProfileBrandStaff = sequelize.define(
  'profile_brand_staff',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    brand_name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
);

ProfileBrandStaff.belongsTo(User, {
  foreignKey: 'user_id'
});

export default ProfileBrandStaff;
