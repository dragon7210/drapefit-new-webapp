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

const KidStyle = sequelize.define(
  'kid_style',
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
    kids_older_boy_sporty_v3: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_cali_cool_v3: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_gender_neutral_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_versatile_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_everyday_prep_v4: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_sporty_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_everyday_prep_v3: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_versatile_v3: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_everyday_prep_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_everyday_prep_v2: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_street_style_v2: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_sporty_v4: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_street_style_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_sporty_v2: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_cali_cool_v1: {
      type: DataTypes.NUMBER
    },
    kids_older_boy_versatile_v2: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_red: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_orange: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_yellow: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_green: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_blue: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_purple: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_pink: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_black: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_white: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_grey: {
      type: DataTypes.NUMBER
    },
    colors_affinity_avoid_brown: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_stripes: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_plaid: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_gingham: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_polka_dots: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_camo: {
      type: DataTypes.NUMBER
    },
    kids_boy_prints_affinity_novelty: {
      type: DataTypes.NUMBER
    },
    send_graphic_tshirts: {
      type: DataTypes.NUMBER
    },
    casual_shirts: {
      type: DataTypes.NUMBER
    },
    shorts: {
      type: DataTypes.NUMBER
    },
    jeans_paint: {
      type: DataTypes.NUMBER
    },
    jaket: {
      type: DataTypes.NUMBER
    },
    sweaters: {
      type: DataTypes.NUMBER
    },
    button_downs: {
      type: DataTypes.NUMBER
    },
    casual_bootms: {
      type: DataTypes.NUMBER
    },
    shoes: {
      type: DataTypes.NUMBER
    },
    dresses: {
      type: DataTypes.NUMBER
    },
    jeans: {
      type: DataTypes.NUMBER
    },
    leggings: {
      type: DataTypes.NUMBER
    },
    skirts_shorts: {
      type: DataTypes.NUMBER
    },
    blouses: {
      type: DataTypes.NUMBER
    },
    profile_note: {
      type: DataTypes.STRING
    },
    brands: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
);

KidStyle.belongsTo(User, {
  foreignKey: 'user_id'
});

KidStyle.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default KidStyle;
