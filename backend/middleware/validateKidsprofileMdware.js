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

const kidBasicInfoRules = () => {
  return [
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Child name is required'),
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
        if (age < 0 || age > 17) {
          throw new Error('Please provide certain age for child');
        }
        return true;
      }),
    body('lookingFor')
      .not()
      .isEmpty()
      .withMessage('FIT looking-for is required')
      .isInt({ min: 0, max: 1 })
      .withMessage('FIT looking-for is out of range')
      .toInt(),
    body('relationShip')
      .not()
      .isEmpty()
      .withMessage('Relationship is required')
      .isInt({ min: 0, max: 2 })
      .withMessage('Relationship is out of range')
      .toInt(),
    body('heightFt')
      .not()
      .isEmpty()
      .withMessage('Height(ft.) is required')
      .isInt({ min: 1, max: 6 })
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
      })
  ];
};

const kidGirlStyleFitRules = () => {
  return [
    body('topSize')
      .not()
      .isEmpty()
      .withMessage('Tops size is required')
      .isInt({ min: 0 })
      .withMessage('Tops size is out of range')
      .toInt(),
    body('bottomSize')
      .not()
      .isEmpty()
      .withMessage('Bottoms size is required')
      .isInt({ min: 0 })
      .withMessage('Bottoms size is out of range')
      .toInt(),
    body('shoeSize')
      .not()
      .isEmpty()
      .withMessage('Shoe size is required')
      .isInt({ min: 0 })
      .withMessage('Shoe size is out of range')
      .toInt()
  ];
};

const kidBoyStyleFitRules = () => {
  return [
    body('topSize')
      .not()
      .isEmpty()
      .withMessage('Tops size is required')
      .isInt({ min: 0 })
      .withMessage('Tops size is out of range')
      .toInt(),
    body('bottomSize')
      .not()
      .isEmpty()
      .withMessage('Bottoms size is required')
      .isInt({ min: 0 })
      .withMessage('Bottoms size is out of range')
      .toInt(),
    body('shoeSize')
      .not()
      .isEmpty()
      .withMessage('Shoe size is required')
      .isInt({ min: 0 })
      .withMessage('Shoe size is out of range')
      .toInt()
  ];
};

const kidCustomDsgnBrandRules = () => {
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

const kidScheduleRules = () => {
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

const kidShipAddressRules = () => {
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
  kidBasicInfoRules,
  kidGirlStyleFitRules,
  kidBoyStyleFitRules,
  kidCustomDsgnBrandRules,
  kidScheduleRules,
  kidShipAddressRules
};
