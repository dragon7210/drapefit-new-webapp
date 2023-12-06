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
import KidsDetail from '../client/kidsDetail.js';
import User from './user.js';

const BatchMailingReport = sequelize.define(
  'batch_mailing_report',
  {
    kid_id: {
      type: DataTypes.INTEGER,
      references: {
        model: KidsDetail,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING
    },
    support_status: {
      type: DataTypes.STRING
    },
    support_email: {
      type: DataTypes.STRING
    },
    support_subject: {
      type: DataTypes.STRING
    },
    process: {
      type: DataTypes.STRING
    },
    sending_datetime: {
      type: DataTypes.STRING
    },
    subject: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    kid_name: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    client_id: {
      type: DataTypes.STRING
    },
    client: {
      type: DataTypes.STRING
    },
    day: {
      type: DataTypes.STRING
    },
    payment_message: {
      type: DataTypes.STRING
    },
    transctions_id: {
      type: DataTypes.STRING
    },
    fit_number: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  }
);
BatchMailingReport.belongsTo(User, {
  foreignKey: 'user_id'
});
BatchMailingReport.belongsTo(KidsDetail, {
  foreignKey: 'kid_id'
});

export default BatchMailingReport;
