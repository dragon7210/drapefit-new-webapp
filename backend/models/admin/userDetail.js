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

const UserDetail = sequelize.define(
  'user_detail',
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    dateofbirth: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.NUMBER
    },
    country: {
      type: DataTypes.STRING
    },
    province: {
      type: DataTypes.STRING
    },
    profile_photo: {
      type: DataTypes.STRING
    },
    is_update: {
      type: DataTypes.NUMBER
    },
    refer_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    is_progressbar: {
      type: DataTypes.NUMBER
    },
    barcode_image: {
      type: DataTypes.STRING
    },
    is_friend_paid: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
);

export default UserDetail;
