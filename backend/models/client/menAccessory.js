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

const MenAccessory = sequelize.define(
  'men_accessory',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    men_tites: {
      type: DataTypes.STRING
    },
    men_belts: {
      type: DataTypes.STRING
    },
    men_wallets_begs: {
      type: DataTypes.STRING
    },
    men_sunglass: {
      type: DataTypes.STRING
    },
    men_hets: {
      type: DataTypes.STRING
    },
    men_socks: {
      type: DataTypes.STRING
    },
    men_underwear: {
      type: DataTypes.STRING
    },
    men_grooming: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
);

MenAccessory.belongsTo(User, {
  foreignKey: 'user_id'
});

export default MenAccessory;
