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

const checkIdRules = () => {
  return [body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required')];
};

const createInfluencerRules = () => {
  return [
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('note').trim().blacklist('<>')
  ];
};

const editInfluencerInfoRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('note').trim().blacklist('<>')
  ];
};

const createEmployeeRules = () => {
  return [
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('about').trim().blacklist('<>'),
    body('address').trim().blacklist('<>')
  ];
};

const changeEmployeePwdRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

const editEmployeeInfoRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Name is required'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email is not valid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number is invalid'),
    body('type')
      .not()
      .isEmpty()
      .withMessage('Account type is required')
      .isInt({ min: 1, max: 4 })
      .withMessage('Account type is invalid')
      .toInt(),
    body('about').trim().blacklist('<>'),
    body('address').trim().blacklist('<>')
  ];
};

const addStateSalesTaxRules = () => {
  return [
    body('state_name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('State name is required'),
    body('zip_min')
      .not()
      .isEmpty()
      .withMessage('Zipcode min is required')
      .trim()
      .custom((value) => {
        value = String(value);
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        if (regexZip.test(value)) {
          return value;
        } else {
          throw new Error('Zipcode min is invalid');
        }
      }),
    body('zip_max')
      .not()
      .isEmpty()
      .withMessage('Zipcode max is required')
      .trim()
      .custom((value) => {
        value = String(value);
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        if (regexZip.test(value)) {
          return value;
        } else {
          throw new Error('Zipcode max is invalid');
        }
      }),
    body('tax_rate')
      .not()
      .isEmpty()
      .withMessage('Tax rate is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 }) || validator.isFloat(value, { min: 0.0 })) {
          return value;
        } else {
          throw new Error('Tax rate is invalid');
        }
      })
  ];
};

const editStateSalesTaxRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('state_name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('State name is required'),
    body('zip_min')
      .not()
      .isEmpty()
      .withMessage('Zipcode min is required')
      .trim()
      .custom((value) => {
        value = String(value);
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        if (regexZip.test(value)) {
          return value;
        } else {
          throw new Error('Zipcode min is invalid');
        }
      }),
    body('zip_max')
      .not()
      .isEmpty()
      .withMessage('Zipcode max is required')
      .trim()
      .custom((value) => {
        value = String(value);
        //-- 5 digit US zipcode
        const regexZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
        if (regexZip.test(value)) {
          return value;
        } else {
          throw new Error('Zipcode max is invalid');
        }
      }),
    body('tax_rate')
      .not()
      .isEmpty()
      .withMessage('Tax rate is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 }) || validator.isFloat(value, { min: 0.0 })) {
          return value;
        } else {
          throw new Error('Tax rate is invalid');
        }
      })
  ];
};

export {
  checkIdRules,
  createInfluencerRules,
  editInfluencerInfoRules,
  createEmployeeRules,
  changeEmployeePwdRules,
  editEmployeeInfoRules,
  addStateSalesTaxRules,
  editStateSalesTaxRules
};
