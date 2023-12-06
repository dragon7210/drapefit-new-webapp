/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';
import User from '../admin/user.js';

const WomenStyleSphereSelections = sequelize.define(
  'wemen_style_sphere_selection',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    style_sphere_selections_v2: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v3_3: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v3: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v4: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v5: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v6: {
      type: DataTypes.INTEGER
    },
    style_sphere_selections_v7: {
      type: DataTypes.INTEGER
    },
    style_sphere_selections_v8: {
      type: DataTypes.INTEGER
    },
    style_sphere_selections_v9: {
      type: DataTypes.INTEGER
    },
    style_sphere_selections_v10: {
      type: DataTypes.STRING
    },
    style_sphere_selections_v11: {
      type: DataTypes.INTEGER
    },
    wo_dress_length: {
      type: DataTypes.STRING
    },
    wo_top_half: {
      type: DataTypes.STRING
    },
    wo_pant_length: {
      type: DataTypes.STRING
    },
    wo_pant_rise: {
      type: DataTypes.STRING
    },
    wo_pant_style: {
      type: DataTypes.STRING
    },
    wo_appare: {
      type: DataTypes.STRING
    },
    wo_bottom_style: {
      type: DataTypes.STRING
    },
    wo_top_style: {
      type: DataTypes.STRING
    },
    color_prefer: {
      type: DataTypes.STRING
    },
    color_mostly_wear: {
      type: DataTypes.STRING
    },
    missing_from_your_fIT: {
      type: DataTypes.STRING
    },
    following_occasions: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
);

WomenStyleSphereSelections.belongsTo(User, {
  foreignKey: 'user_id'
});

export default WomenStyleSphereSelections;
