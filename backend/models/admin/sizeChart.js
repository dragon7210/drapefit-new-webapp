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
import Payment from './payment.js';
import User from './user.js';

const SizeChart = sequelize.define(
  'size_chart',
  {
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    },
    payment_id: {
      type: DataTypes.STRING,
      references: {
        model: Payment,
        key: 'id'
      }
    },
    dress: {
      type: DataTypes.STRING
    },
    dress_recomended: {
      type: DataTypes.STRING
    },
    shirt_blouse: {
      type: DataTypes.STRING
    },
    shirt_blouse_recomend: {
      type: DataTypes.STRING
    },
    bra: {
      type: DataTypes.STRING
    },
    bra_recomend: {
      type: DataTypes.STRING
    },
    skirt: {
      type: DataTypes.STRING
    },
    pants: {
      type: DataTypes.STRING
    },
    pantsr1: {
      type: DataTypes.STRING
    },
    pantsr2: {
      type: DataTypes.STRING
    },
    jeans: {
      type: DataTypes.STRING
    },
    active_wr: {
      type: DataTypes.STRING
    },
    wo_jackect_size: {
      type: DataTypes.STRING
    },
    wo_bottom: {
      type: DataTypes.STRING
    },
    shoe: {
      type: DataTypes.STRING
    },
    is_pregnant: {
      type: DataTypes.INTEGER
    },
    proportion_arms: {
      type: DataTypes.STRING
    },
    proportion_shoulders: {
      type: DataTypes.STRING
    },
    proportion_torso: {
      type: DataTypes.STRING
    },
    proportion_hips: {
      type: DataTypes.STRING
    },
    proportion_legs: {
      type: DataTypes.STRING
    },
    expected_due_date: {
      type: DataTypes.DATE
    },
    is_prefer_maternity: {
      type: DataTypes.INTEGER
    },
    what_kind_pants: {
      type: DataTypes.INTEGER
    },
    is_styles_designed_nursing: {
      type: DataTypes.INTEGER
    },
    loose_fitted: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'size_chart'
  }
);

SizeChart.belongsTo(Payment, {
  foreignKey: 'payment_id'
});
SizeChart.belongsTo(User, {
  foreignKey: 'user_id'
});
export default SizeChart;
