/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const merEmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    phone: {
      type: String
    },
    type: {
      type: String
    },
    about: {
      type: String
    },
    address: {
      type: String
    },
    is_active: {
      type: Boolean,
      default: 'true'
    }
  },
  {
    timestamps: true
  }
);

export default merEmployeeSchema;
