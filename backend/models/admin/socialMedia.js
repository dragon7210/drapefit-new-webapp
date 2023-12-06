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

const SocialMedia = sequelize.define(
  'social_media',
  {
    name: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.STRING
    },
    vector: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.NUMBER
    },
    created: {
      type: DataTypes.DATE
    },
    sort_order: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    taleName: 'social_media'
  }
);

export default SocialMedia;
