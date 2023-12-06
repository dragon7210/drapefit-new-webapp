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

const womenFPBasicInfoRules = () => {
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
    body('shirtBlouseSizeNo')
      .not()
      .isEmpty()
      .withMessage('Shirt & blouse size is required')
      .isInt({ min: 1 })
      .withMessage('Shirt & blouse size is out of range')
      .toInt(),
    body('dressSizeNo')
      .not()
      .isEmpty()
      .withMessage('Dress size is required')
      .isInt({ min: 1 })
      .withMessage('Dress size is out of range')
      .toInt(),
    body('pantsSize')
      .not()
      .isEmpty()
      .withMessage('Pants size is required')
      .isInt({ min: 1 })
      .withMessage('Pants size is out of range')
      .toInt(),
    body('bottomSize')
      .not()
      .isEmpty()
      .withMessage('Bottom size is required')
      .isInt({ min: 1 })
      .withMessage('Bottom size is out of range')
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

const womenFPStyleFitRules = () => {
  return [
    body('styleInspiration')
      .not()
      .isEmpty()
      .withMessage('Style inspiration is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 4, 'Style inspiration', true)),
    body('outFit')
      .not()
      .isEmpty()
      .withMessage('OutFit group is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 7, 'OutFit group', true)),
    body('avoidPattern')
      .not()
      .isEmpty()
      .withMessage('Patterns to avoid is not valid')
      .custom((value) => numsArrValidMdware(value, 0, 5, 'Patterns to avoid', true))
  ];
};

const womenFPCustomDsgnBrandRules = () => {
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
    body('addlComments')
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

const womenFPScheduleRules = () => {
  return [
    body('deliveryMode')
      .not()
      .isEmpty()
      .withMessage('Delivery schedule is required')
      .isInt({ min: 0, max: 2 })
      .withMessage('Delivery schedule is out of range')
      .toInt()
  ];
};

const womenFPShipAddressRules = () => {
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
  womenFPBasicInfoRules,
  womenFPStyleFitRules,
  womenFPCustomDsgnBrandRules,
  womenFPScheduleRules,
  womenFPShipAddressRules
};
