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
import InvProduct from './product.js';

const InvUser = sequelize.define(
  'in_user',
  {
    name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    brand_name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.INTEGER
    },
    is_active: {
      type: DataTypes.INTEGER
    },
    token: {
      type: DataTypes.STRING
    },
    qstr: {
      type: DataTypes.STRING
    },
    reg_ip: {
      type: DataTypes.STRING
    },
    created_dt: {
      type: DataTypes.DATE
    },
    lastmodify_dt: {
      type: DataTypes.DATE
    },
    last_login_date: {
      type: DataTypes.DATE
    },
    last_login_ip: {
      type: DataTypes.STRING
    },
    is_redirect: {
      type: DataTypes.DATE
    },
    email_preferences: {
      type: DataTypes.DATE
    },
    is_progressbar: {
      type: DataTypes.DATE
    },
    is_fb_connect: {
      type: DataTypes.DATE
    },
    facebook_id: {
      type: DataTypes.STRING
    },
    set_email: {
      type: DataTypes.STRING
    },
    subscribe: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

InvUser.hasMany(InvProduct, {
  foreignKey: 'brand_id'
});

export default InvUser;
