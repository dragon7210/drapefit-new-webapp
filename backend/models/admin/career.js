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

const Career = sequelize.define(
  'career',
  {
    school: {
      type: DataTypes.STRING
    },
    degree: {
      type: DataTypes.STRING
    },
    about_this_job: {
      type: DataTypes.STRING
    },
    discipline: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'career_dynamic'
  }
);

export default Career;
