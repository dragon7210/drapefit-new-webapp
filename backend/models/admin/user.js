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
import { USER_ROLES, USER_ROLE_CLIENT } from '../../utils/constant.js';
import UserDetail from './userDetail.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import KidsDetail from '../client/kidsDetail.js';
import CustomerStylist from './customerStylist.js';

const User = sequelize.define(
  'users',
  {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
    stripe_customer_key: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.NUMBER
    },
    is_active: {
      type: DataTypes.NUMBER
    },
    qstr: {
      type: DataTypes.STRING
    },
    last_login_date: {
      type: Date
    },
    is_redirect: {
      type: DataTypes.NUMBER
    },
    email_preferences: {
      type: DataTypes.NUMBER
    },
    is_progressbar: {
      type: DataTypes.NUMBER
    },
    is_fb_connect: {
      type: DataTypes.NUMBER
    },
    subscribe: {
      type: DataTypes.NUMBER
    },
    is_friend_paid: {
      type: DataTypes.NUMBER
    },
    about: {
      type: DataTypes.STRING
    },
    notCompleteProfile_mail: {
      type: DataTypes.NUMBER
    },
    notPaidOnce: {
      type: DataTypes.NUMBER
    },
    addressNotComplete: {
      type: DataTypes.STRING
    },
    is_influencer: {
      type: DataTypes.NUMBER
    },
    role: {
      type: DataTypes.NUMBER,
      default: USER_ROLE_CLIENT,
      enum: USER_ROLES
    },
    token: {
      type: String
    },
    created_dt: {
      type: DataTypes.DATE
    },
    lastmodify_dt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

User.hasOne(UserDetail, {
  foreignKey: 'user_id'
});
User.hasOne(KidsDetail, {
  foreignKey: 'user_id'
});
User.hasOne(CustomerStylist, {
  foreignKey: 'user_id'
});

export default User;

export const HashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const value = await bcrypt.hash(password, salt);
  return value;
};

export const CreateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const newToken = Jwt.sign({ id: user.id }, secret, { expiresIn: '12h' });
  return newToken;
};
