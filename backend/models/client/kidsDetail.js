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

const KidsDetail = sequelize.define(
  'kids_detail',
  {
    user_id: {
      type: DataTypes.INTEGER
    },
    kid_count: {
      type: DataTypes.NUMBER
    },
    emp_id: {
      type: DataTypes.INTEGER
    },
    barcode_image: {
      type: DataTypes.STRING
    },
    payment_id: {
      type: DataTypes.INTEGER
    },
    kids_first_name: {
      type: DataTypes.STRING
    },
    kids_birthdate: {
      type: DataTypes.DATE
    },
    kids_relationship_to_child: {
      type: DataTypes.STRING
    },
    kids_clothing_gender: {
      type: DataTypes.STRING
    },
    tall_feet: {
      type: DataTypes.NUMBER
    },
    tell_inch: {
      type: DataTypes.NUMBER
    },
    weight_lb: {
      type: DataTypes.NUMBER
    },
    child_personality: {
      type: DataTypes.STRING
    },
    size_prefer_wear: {
      type: DataTypes.NUMBER
    },
    prefer_color: {
      type: DataTypes.STRING
    },
    kids_frequency_arts_and_crafts: {
      type: DataTypes.STRING
    },
    kids_frequency_biking: {
      type: DataTypes.STRING
    },
    kids_frequency_theatre: {
      type: DataTypes.STRING
    },
    kids_frequency_dance: {
      type: DataTypes.STRING
    },
    kids_frequency_sports: {
      type: DataTypes.STRING
    },
    kids_frequency_playing_outside: {
      type: DataTypes.STRING
    },
    kids_frequency_musical_instruments: {
      type: DataTypes.STRING
    },
    kids_frequency_reading: {
      type: DataTypes.STRING
    },
    kids_frequency_video_games: {
      type: DataTypes.STRING
    },
    is_redirect: {
      type: DataTypes.NUMBER
    },
    is_progressbar: {
      type: DataTypes.NUMBER
    },
    created_dt: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

export default KidsDetail;
