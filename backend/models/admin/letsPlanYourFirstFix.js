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
import User from './user.js';
import KidsDetail from '../client/kidsDetail.js';

const LetsPlanYourFirstFix = sequelize.define(
  'lets_plan_your_first_fix',
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    try_new_items_with_scheduled_fixes: {
      type: DataTypes.NUMBER
    },
    how_often_would_you_lik_fixes: {
      type: DataTypes.NUMBER
    },
    applay_dt: {
      type: DataTypes.DATE
    },
    autoMentions: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: 'lets_plan_your_first_fix'
  }
);
LetsPlanYourFirstFix.belongsTo(User, {
  foreignKey: 'user_id'
});
LetsPlanYourFirstFix.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default LetsPlanYourFirstFix;
