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

const WomenPrice = sequelize.define(
  'women_price',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    spendiness_accessories: {
      type: DataTypes.STRING
    },
    spendiness_bottoms: {
      type: DataTypes.STRING
    },
    spendiness_dresses: {
      type: DataTypes.STRING
    },
    spendiness_jewelry: {
      type: DataTypes.STRING
    },
    spendiness_outerwear: {
      type: DataTypes.STRING
    },
    spendiness_tops: {
      type: DataTypes.STRING
    },
    spendiness_shoes: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'women_shoe_prefer'
  }
);

WomenPrice.belongsTo(User, {
  foreignKey: 'user_id'
});
export default WomenPrice;
