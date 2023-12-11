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

const invCollaborationBrand = sequelize.define(
  'in_collaboration_brand',
  {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    brand_name: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
);

export default invCollaborationBrand;
