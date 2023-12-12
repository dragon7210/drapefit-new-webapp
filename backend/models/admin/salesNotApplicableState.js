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

const SalesNotApplicableState = sequelize.define(
  'sales_not_applicable_state',
  {
    state_name: {
      type: DataTypes.STRING
    },
    zip_min: {
      type: DataTypes.NUMBER
    },
    zip_max: {
      type: DataTypes.NUMBER
    },
    tax_rate: {
      type: DataTypes.NUMBER
    }
  },
  {
    timestamps: false,
    tableName: 'sales_not_applicable_state'
  }
);

export default SalesNotApplicableState;
