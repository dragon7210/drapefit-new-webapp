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

const MenStyleSphereSelection = sequelize.define(
  'men_style_sphere_selection',
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
    style_sphere_selections_v2: {
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
    }
  },
  {
    timestamps: false
  }
);

MenStyleSphereSelection.belongsTo(User, {
  foreignKey: 'user_id'
});
MenStyleSphereSelection.belongsTo(Payment, {
  foreignKey: 'payment_id'
});

export default MenStyleSphereSelection;
