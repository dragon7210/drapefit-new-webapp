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

const supplyAddSplProdCategoryRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Name of supplier product category is required')
  ];
};

const supplyEditSplProdCategoryRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('name')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Name of supplier product category is required')
  ];
};

const supplyAddSplProductRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Name of supplier product is required'),
    body('category')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier product category is required'),
    body('supProductImgUrl')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Image URL of supplier product is invalid'),
    body('description')
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
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity of supplier product is required')
      .isInt({ min: 0 })
      .withMessage('Quantity of supplier product is invalid')
      .toInt(),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price of supplier product is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('Price of supplier product is invalid');
        }
      }),
    body('supplierName')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier name is required'),
    body('supplierAddress')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier address is required'),
    body('supplierEmail')
      .not()
      .isEmpty()
      .withMessage('Supplier email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Supplier email is invalid'),
    body('supplierPhone')
      .not()
      .isEmpty()
      .withMessage('Supplier phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Supplier phone number is invalid')
  ];
};

const supplyChkSplProdBeforeUpsertRules = () => {
  return [
    body('category')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier product category is required')
  ];
};

const supplySplProdStockRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('count')
      .not()
      .isEmpty()
      .withMessage('Stock count is required')
      .isInt({ min: 0 })
      .withMessage('Stock count is invalid')
      .toInt()
  ];
};

const supplyEditSplProductRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('name')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Name of supplier product is required'),
    body('category')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier product category is required'),
    body('supProductImgUrl')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Image URL of supplier product is invalid'),
    body('description')
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
      }),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price of supplier product is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('Price of supplier product is invalid');
        }
      }),
    body('supplierName')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier name is required'),
    body('supplierAddress')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier address is required'),
    body('supplierEmail')
      .not()
      .isEmpty()
      .withMessage('Supplier email is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Supplier email is invalid'),
    body('supplierPhone')
      .not()
      .isEmpty()
      .withMessage('Supplier phone number is required')
      .trim()
      .isMobilePhone()
      .withMessage('Supplier phone number is invalid'),
    body('currentStock')
      .not()
      .isEmpty()
      .withMessage('Current in-stock of supplier product is required')
      .isInt({ min: 0 })
      .withMessage('Current in-stock of supplier product is invalid')
      .toInt()
  ];
};

const supplyEditSplProfileRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email of supplier profile is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email of supplier profile is invalid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number of supplier profile is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number of supplier profile is invalid'),
    body('address')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Address of supplier profile is required')
  ];
};

const supplyResetSplPwdRules = () => {
  return [
    body('currentPwd')
      .not()
      .isEmpty()
      .withMessage('Current password is required')
      .isLength({ min: 6 })
      .withMessage('Current password must be at least 6 characters'),
    body('newPwd')
      .not()
      .isEmpty()
      .withMessage('New password is required')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
    body('confirmPwd')
      .not()
      .isEmpty()
      .withMessage('Confirm password is required')
      .isLength({ min: 6 })
      .withMessage('Confirm password must be at least 6 characters')
  ];
};
const supplyPurchaseOrderRules = () => {
  return [
    body('name')
      .not()
      .isEmpty()
      .withMessage('DF BOX is required')
      .isLength({ min: 3 })
      .withMessage('DF BOX must be at least 3 characters'),
    body('category')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Supplier product category is required'),
    body('poSystemImgUrl')
      .trim()
      .custom((value) => {
        return true;
      })
      .withMessage('Image URL of Purchase Order product is invalid'),
    body('description')
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
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('REQUIRED QUANTITY is required')
      .isInt({ min: 0 })
      .withMessage('REQUIRED QUANTITY is invalid')
      .toInt(),
    body('requiredQuantity')
      .not()
      .isEmpty()
      .withMessage('REQUIRED QUANTITY is required')
      .isInt({ min: 0 })
      .withMessage('REQUIRED QUANTITY is invalid')
      .toInt()
  ];
};
export {
  supplyAddSplProdCategoryRules,
  supplyEditSplProdCategoryRules,
  supplyAddSplProductRules,
  supplyChkSplProdBeforeUpsertRules,
  supplySplProdStockRules,
  supplyEditSplProductRules,
  supplyEditSplProfileRules,
  supplyResetSplPwdRules,
  supplyPurchaseOrderRules
};
