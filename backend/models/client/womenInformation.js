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

const WomenInformation = sequelize.define(
  'women_information',
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
    user_input_birthdate: {
      type: DataTypes.STRING
    },
    occupation_v2: {
      type: DataTypes.STRING
    },
    parent: {
      type: DataTypes.STRING
    },
    pregnant: {
      type: DataTypes.INTEGER
    },
    birthday: {
      type: DataTypes.STRING
    },
    primary_objectives: {
      type: DataTypes.STRING
    },
    final_thoughts: {
      type: DataTypes.STRING
    },
    body_type: {
      type: DataTypes.INTEGER
    },
    skin_tone: {
      type: DataTypes.INTEGER
    },
    comfortable_showing_off: {
      type: DataTypes.STRING
    },
    keep_covered: {
      type: DataTypes.STRING
    },
    is_pregnant: {
      type: DataTypes.INTEGER
    },
    height_feet: {
      type: DataTypes.INTEGER
    },
    height_inch: {
      type: DataTypes.INTEGER
    },
    weight_lbs: {
      type: DataTypes.INTEGER
    },
    bra_size_num: {
      type: DataTypes.INTEGER
    },
    bra_size_label: {
      type: DataTypes.STRING
    },
    shirt_blouse_size_no: {
      type: DataTypes.INTEGER
    },
    shirt_blouse_size_label: {
      type: DataTypes.STRING
    },
    jacket_size: {
      type: DataTypes.STRING
    },
    dress_size_no: {
      type: DataTypes.INTEGER
    },
    dress_size_label: {
      type: DataTypes.STRING
    },
    skirt_size: {
      type: DataTypes.STRING
    },
    pants_size: {
      type: DataTypes.INTEGER
    },
    jeans_size: {
      type: DataTypes.INTEGER
    },
    bottom_size: {
      type: DataTypes.STRING
    },
    shoe_size_num: {
      type: DataTypes.STRING
    },
    shoes_style_label: {
      type: DataTypes.STRING
    },
    heel_height_label: {
      type: DataTypes.STRING
    },
    profession: {
      type: DataTypes.INTEGER
    },
    body_show_in_off: {
      type: DataTypes.STRING
    },
    arms: {
      type: DataTypes.STRING
    },
    shoulders: {
      type: DataTypes.INTEGER
    },
    legs: {
      type: DataTypes.INTEGER
    },
    hips: {
      type: DataTypes.INTEGER
    },
    dueDate: {
      type: DataTypes.STRING
    },
    maternity_fit: {
      type: DataTypes.INTEGER
    },
    loose_fitted: {
      type: DataTypes.INTEGER
    },
    maternity_pants: {
      type: DataTypes.STRING
    },
    maternity_fit: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'women_information'
  }
);

WomenInformation.belongsTo(User, {
  foreignKey: 'user_id'
});
WomenInformation.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default WomenInformation;
