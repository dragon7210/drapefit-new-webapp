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
import Payment from '../admin/payment.js';

const MenStyle = sequelize.define(
  'men_style',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Payment,
        key: 'id'
      }
    },
    leisure_wear: {
      type: DataTypes.STRING
    },
    everyday_casual: {
      type: DataTypes.NUMBER
    },
    business_casual: {
      type: DataTypes.NUMBER
    },
    business_formal: {
      type: DataTypes.NUMBER
    },
    night_out_attire: {
      type: DataTypes.NUMBER
    },
    workout_gear: {
      type: DataTypes.NUMBER
    },
    special_occasion_formal_wear: {
      type: DataTypes.NUMBER
    },
    style_or_comfort: {
      type: DataTypes.NUMBER
    },
    office_dress_code: {
      type: DataTypes.NUMBER
    },
    dry_clean_your_clothes_at_least_once_per_month: {
      type: DataTypes.NUMBER
    },
    button_shirts: {
      type: DataTypes.NUMBER
    },
    tees_polos: {
      type: DataTypes.NUMBER
    },
    weaters_sweatshirts: {
      type: DataTypes.NUMBER
    },
    pants_denim: {
      type: DataTypes.NUMBER
    },
    shorts: {
      type: DataTypes.NUMBER
    },
    blazers_outerwear: {
      type: DataTypes.NUMBER
    },
    shoes: {
      type: DataTypes.NUMBER
    },
    black: {
      type: DataTypes.NUMBER
    },
    blue: {
      type: DataTypes.NUMBER
    },
    brown: {
      type: DataTypes.NUMBER
    },
    green: {
      type: DataTypes.NUMBER
    },
    grey: {
      type: DataTypes.NUMBER
    },
    khaki: {
      type: DataTypes.NUMBER
    },
    light_Blue: {
      type: DataTypes.NUMBER
    },
    navy: {
      type: DataTypes.NUMBER
    },
    olive: {
      type: DataTypes.NUMBER
    },
    pink: {
      type: DataTypes.NUMBER
    },
    purple: {
      type: DataTypes.NUMBER
    },
    white: {
      type: DataTypes.NUMBER
    },
    yellow: {
      type: DataTypes.NUMBER
    },
    red: {
      type: DataTypes.NUMBER
    },
    salmon: {
      type: DataTypes.NUMBER
    },
    pattern_conversational_print_mens: {
      type: DataTypes.STRING
    },
    pattern_large_floral_mens: {
      type: DataTypes.STRING
    },
    pattern_dot_geo_mens: {
      type: DataTypes.STRING
    },
    pattern_gingham_mens: {
      type: DataTypes.STRING
    },
    pattern_micro_check_mens: {
      type: DataTypes.STRING
    },
    pattern_buffalo_check_mens: {
      type: DataTypes.STRING
    },
    pattern_small_floral_mens: {
      type: DataTypes.STRING
    },
    pattern_windowpane_mens: {
      type: DataTypes.STRING
    },
    pattern_plaid_mens: {
      type: DataTypes.STRING
    },
    pattern_vertical_stripes_mens: {
      type: DataTypes.STRING
    },
    pattern_tartan_mens: {
      type: DataTypes.STRING
    },
    pattern_horizontal_stripes_mens: {
      type: DataTypes.STRING
    },
    loafer_slip: {
      type: DataTypes.NUMBER
    },
    druver: {
      type: DataTypes.NUMBER
    },
    casual_sneaker: {
      type: DataTypes.NUMBER
    },
    performance_senkar: {
      type: DataTypes.NUMBER
    },
    sandal: {
      type: DataTypes.NUMBER
    },
    boot: {
      type: DataTypes.NUMBER
    },
    Laceup_dress: {
      type: DataTypes.NUMBER
    },
    boatshoe: {
      type: DataTypes.NUMBER
    },
    adventurous_fixes: {
      type: DataTypes.NUMBER
    },
    linkdin_profile: {
      type: DataTypes.STRING
    },
    instagram: {
      type: DataTypes.STRING
    },
    twitter: {
      type: DataTypes.STRING
    },
    pinterest: {
      type: DataTypes.STRING
    },
    profile_note: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'men_style'
  }
);

MenStyle.belongsTo(User, {
  foreignKey: 'user_id'
});
MenStyle.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default MenStyle;
