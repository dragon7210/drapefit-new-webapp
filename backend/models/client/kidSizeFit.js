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

const KidSizeFit = sequelize.define(
  'kids_size_fit',
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
    kids_weight: {
      type: DataTypes.NUMBER
    },
    top_size: {
      type: DataTypes.NUMBER
    },
    bottom_size: {
      type: DataTypes.NUMBER
    },
    shoe_size: {
      type: DataTypes.NUMBER
    },
    adult_shoe_size: {
      type: DataTypes.STRING
    },
    shirt_sleeve_length: {
      type: DataTypes.NUMBER
    },
    kids_fit_challenge_shirt_torso_length: {
      type: DataTypes.NUMBER
    },
    kids_fit_challenge_shirt_torso_width: {
      type: DataTypes.NUMBER
    },
    kids_fit_challenge_pant_waist: {
      type: DataTypes.NUMBER
    },
    kids_fit_challenge_pant_leg_length: {
      type: DataTypes.NUMBER
    },
    kids_fit_challenge_pant_leg_width: {
      type: DataTypes.NUMBER
    },
    body_shape: {
      type: DataTypes.NUMBER
    },
    t_shirts: {
      type: DataTypes.NUMBER
    },
    sweats_shirts: {
      type: DataTypes.NUMBER
    },
    button_downs: {
      type: DataTypes.NUMBER
    },
    polo_shirts: {
      type: DataTypes.NUMBER
    },
    pant_wast: {
      type: DataTypes.NUMBER
    },
    shorts: {
      type: DataTypes.NUMBER
    },
    jacket_coats: {
      type: DataTypes.NUMBER
    },
    jeans: {
      type: DataTypes.NUMBER
    },
    trousers_chino: {
      type: DataTypes.NUMBER
    },
    sweatspaint: {
      type: DataTypes.NUMBER
    },
    shoes: {
      type: DataTypes.NUMBER
    },
    pajamas: {
      type: DataTypes.NUMBER
    },
    sweaters: {
      type: DataTypes.NUMBER
    },
    top_blouses: {
      type: DataTypes.NUMBER
    },
    dreses_rompers: {
      type: DataTypes.NUMBER
    },
    leggings: {
      type: DataTypes.NUMBER
    },
    accessories: {
      type: DataTypes.NUMBER
    },
    skirts: {
      type: DataTypes.NUMBER
    },
    paint: {
      type: DataTypes.NUMBER
    }
  },
  {
    timestamps: false,
    tableName: 'kids_size_fit'
  }
);

KidSizeFit.belongsTo(User, {
  foreignKey: 'user_id'
});

KidSizeFit.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default KidSizeFit;
