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

const WomenStyle = sequelize.define(
  'women_style',
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
    rating_preppy: {
      type: DataTypes.STRING
    },
    rating_romantic: {
      type: DataTypes.STRING
    },
    rating_casual: {
      type: DataTypes.STRING
    },
    rating_edgy: {
      type: DataTypes.STRING
    },
    rating_boho: {
      type: DataTypes.STRING
    },
    rating_glam: {
      type: DataTypes.STRING
    },
    rating_classic: {
      type: DataTypes.STRING
    },
    occasion_work_casual: {
      type: DataTypes.STRING
    },
    occasion_special_event: {
      type: DataTypes.STRING
    },
    occasion_casual: {
      type: DataTypes.STRING
    },
    occasion_night_out: {
      type: DataTypes.STRING
    },
    desired_work_casual: {
      type: DataTypes.STRING
    },
    desired_special_event: {
      type: DataTypes.STRING
    },
    desired_casual: {
      type: DataTypes.STRING
    },
    desired_date_night: {
      type: DataTypes.STRING
    },
    jeans_frequency: {
      type: DataTypes.STRING
    },
    distressed_denim_non: {
      type: DataTypes.STRING
    },
    distressed_denim_minimally: {
      type: DataTypes.STRING
    },
    distressed_denim_fairly: {
      type: DataTypes.STRING
    },
    distressed_denim_heavily: {
      type: DataTypes.STRING
    },
    adventure: {
      type: DataTypes.STRING
    },
    style_accessories: {
      type: DataTypes.STRING
    },
    jewelry_tone: {
      type: DataTypes.STRING
    },
    piercings: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_tops: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_blazers: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_jackets_coats: {
      type: DataTypes.STRING
    },
    apparel_type_affinity_avoid_skirts: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_shorts: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_pants: {
      type: DataTypes.STRING
    },
    apparel_affinity_avoid_dresses: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_bags: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_scarves: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_earrings: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_necklaces: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_bracelets: {
      type: DataTypes.STRING
    },
    accessory_affinity_avoid_shoes: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_heels: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_wedges: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_booties: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_flats: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_sandals: {
      type: DataTypes.STRING
    },
    shoes_affinity_avoid_fashion_sneakers: {
      type: DataTypes.STRING
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
    tops: {
      type: DataTypes.INTEGER
    },
    bottoms: {
      type: DataTypes.INTEGER
    },
    outwear: {
      type: DataTypes.INTEGER
    },
    jeans: {
      type: DataTypes.INTEGER
    },
    jewelry: {
      type: DataTypes.INTEGER
    },
    accessproes: {
      type: DataTypes.INTEGER
    },
    dress: {
      type: DataTypes.INTEGER
    },
    profile_note: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'women_style'
  }
);

WomenStyle.belongsTo(User, {
  foreignKey: 'user_id'
});
WomenStyle.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default WomenStyle;
