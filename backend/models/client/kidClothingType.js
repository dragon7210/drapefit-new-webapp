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

const KidClothingType = sequelize.define(
  'kid_clothing_type',
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
    kids_tees_frequency: {
      type: DataTypes.NUMBER
    },
    kids_sweatshirts_frequency: {
      type: DataTypes.NUMBER
    },
    kids_polos_frequency: {
      type: DataTypes.NUMBER
    },
    kids_sweaters_frequency: {
      type: DataTypes.NUMBER
    },
    kids_shorts_frequency: {
      type: DataTypes.NUMBER
    },
    kids_trousers_and_chinos_frequency: {
      type: DataTypes.NUMBER
    },
    kids_shoes_frequency: {
      type: DataTypes.NUMBER
    },
    kids_school_uniform: {
      type: DataTypes.NUMBER
    },
    kids_commonly_dresses: {
      type: DataTypes.NUMBER
    },
    stripes: {
      type: DataTypes.STRING
    },
    plaid: {
      type: DataTypes.STRING
    },
    gingham: {
      type: DataTypes.STRING
    },
    novelty: {
      type: DataTypes.STRING
    },
    polkadots: {
      type: DataTypes.STRING
    },
    camo: {
      type: DataTypes.STRING
    },
    animal_print: {
      type: DataTypes.STRING
    },
    floral: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'kid_clothing_type'
  }
);

KidClothingType.belongsTo(User, {
  foreignKey: 'user_id'
});

KidClothingType.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default KidClothingType;
