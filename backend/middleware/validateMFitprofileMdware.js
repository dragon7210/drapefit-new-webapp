/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { body } from 'express-validator';
import validator from 'validator';

import { numsArrValidMdware } from '../utils/helper.js';

const menFPBasicInfoRules = () => {
  return [
    body('heightFt')
      .not()
      .isEmpty()
      .withMessage('Height(ft.) is required')
      .isInt({ min: 1, max: 3 })
      .withMessage('Height(ft.) is out of range')
      .toInt(),
    body('weightLbs')
      .not()
      .isEmpty()
      .withMessage('Weight(lbs.) is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 10, max: 999 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 10.0, max: 999.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('Weight(lbs.) is invalid');
        }
      }),
    body('birthday')
      .not()
      .isEmpty()
      .withMessage('Birthday is required')
      .custom((value) => {
        const d = new Date(value);
        const isDate = d instanceof Date && !isNaN(d);
        if (!isDate) {
          throw new Error('Birthday is invalid');
        }
        const age = new Date(new Date() - d).getFullYear() - 1970;
        if (age < 18) {
          if (age < 1) {
            throw new Error('Please provide certain age');
          } else {
            throw new Error('Under 18 years of age is forbidden');
          }
        }
        if (age > 120) {
          throw new Error('Please provide certain age');
        }
        return true;
      }),
    body('waistSizeNum')
      .not()
      .isEmpty()
      .withMessage('Waist size is required')
      .isInt({ min: 1 })
      .withMessage('Waist size is out of range')
      .toInt(),
    body('shirtSizeNo')
      .not()
      .isEmpty()
      .withMessage('Shirt size is required')
      .isInt({ min: 1, max: 7 })
      .withMessage('Shirt size is out of range')
      .toInt(),
    body('inseamSizeNum')
      .not()
      .isEmpty()
      .withMessage('Inseam size is required')
      .isInt({ min: 1 })
      .withMessage('Inseam size is out of range')
      .toInt(),
    body('snsLinkedin')
      .trim()
      .custom((value) => {
        if (!value) return true;
        return validator.isURL(value);
      })
      .withMessage('Linkedin profile URL is invalid'),
    body('snsInstagram')
      .trim()
      .blacklist('<>')
      .custom((value) => {
        if (!value) return true;
        return !/\s/.test(value); //-- detect whitespace character
      })
      .withMessage('Instagram handle is invalid'),
    body('snsTwitter')
      .trim()
      .blacklist('<>')
      .custom((value) => {
        if (!value) return true;
        return !/\s/.test(value);
      })
      .withMessage('Twitter handle is invalid'),
    body('snsPinterest')
      .trim()
      .blacklist('<>')
      .custom((value) => {
        if (!value) return true;
        return !/\s/.test(value);
      })
      .withMessage('Pinterest handle is invalid')
  ];
};

const menFPStyleFitRules = () => {
  return [
    body('casual_shirts_to_fit')
      .not()
      .isEmpty()
      .withMessage('Casual shirts is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 1, 'Casual shirts', true)),
    body('button_up_shirts_to_fit')
      .not()
      .isEmpty()
      .withMessage('Button-up shirts is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 1, 'Button-up shirts', true)),
    body('jeans_to_fit')
      .not()
      .isEmpty()
      .withMessage('Jeans is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 3, 'Jeans', true)),
    body('tuck_in_a_button_up_shirt')
      .not()
      .isEmpty()
      .withMessage('Bottoms is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 1, 'Bottoms', true)),
    body('your_pants_to_fit')
      .not()
      .isEmpty()
      .withMessage('Shorts is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 3, 'Shorts', true)),
    body('prefer_your_shorts')
      .not()
      .isEmpty()
      .withMessage('Outfits is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 19, 'Outfits', true))
  ];
};

const menFPCustomDsgnBrandRules = () => {
  return [
    body('dsgnImgUrl1st')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('First design URL is invalid'),
    body('dsgnImgUrl2nd')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Second design URL is invalid'),
    body('dsgnImgUrl3rd')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Third design URL is invalid'),
    body('profile_note')
      .trim()
      .blacklist('<>')
      .custom((value) => {
        if (!value) return true;
        const words = value.match(/\b\w+\b/g);
        if (words && words.length >= 2) {
          return true;
        } else {
          throw new Error('Please input at least 2 words');
        }
      })
  ];
};

const menFPScheduleRules = () => {
  return [
    body('autoMentions')
      .not()
      .isEmpty()
      .withMessage('Delivery schedule is required')
      .isInt({ min: 0, max: 2 })
      .withMessage('Delivery schedule is out of range')
      .toInt()
  ];
};

const menFPShipAddressRules = () => {
  return [
    body('fullName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Full name is required'),
    body('addrLine1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Address line 1 is required'),
    body('addrLine2').trim().blacklist('<>'),
    body('city').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('City is required'),
    body('stateProvcRegion')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('State/Province/Region is required'),
    body('zip')
      .not()
      .isEmpty()
      .withMessage('Zipcode is required')
      .trim()
      .custom((value) => {
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        return regexZip.test(value);
      })
      .withMessage('Zipcode is invalid'),
    body('country').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Country is required'),
    body('phoneNum')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid')
  ];
};

export {
  menFPBasicInfoRules,
  menFPStyleFitRules,
  menFPCustomDsgnBrandRules,
  menFPScheduleRules,
  menFPShipAddressRules
};
