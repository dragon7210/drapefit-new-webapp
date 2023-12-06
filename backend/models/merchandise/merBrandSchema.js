/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const merBrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    brandName: {
      type: String
    },
    phone: {
      type: String
    },
    website: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default merBrandSchema;
