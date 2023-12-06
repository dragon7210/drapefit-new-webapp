/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import mongoose from 'mongoose';

const userMobInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    platform: {
      type: String,
      enum: ['ios', 'android', 'mobileweb']
    },
    udid: {
      type: String
    },
    deviceToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default userMobInfoSchema;
