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
import InvProductType from './productType.js';

const InvRack = sequelize.define(
  'in_rack',
  {
    in_product_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: InvProductType,
        key: 'id'
      }
    },
    rack_number: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    rack_name: {
      type: DataTypes.STRING,
      required: true
    },
    location_note: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.NUMBER,
      default: 1
    }
  },
  {
    timestamps: false,
    tableName: 'in_rack'
  }
);

InvRack.belongsTo(InvProductType, {
  foreignKey: 'in_product_type_id'
});

export default InvRack;
