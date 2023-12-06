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

const invAddColorRules = () => {
  return [
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Color name is required')
  ];
};

const invEditColorRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Color name is required')
  ];
};

const changeBrandStaffPwdRules = () => {
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

const editBrandStaffInfoRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('firstName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('First name is required'),
    body('lastName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Last name is required'),
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
    body('address').trim().blacklist('<>'),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required')
  ];
};

const invAddProdCategoryRules = () => {
  return [
    body('product_type')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product category is required'),
    body('name').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Product name is required'),
    body('note').trim().blacklist('<>')
  ];
};

const invEditProdCategoryRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('category')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product category is required'),
    body('prodName')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name is required'),
    body('note').trim().blacklist('<>')
  ];
};

const invAddProductForMenRules = () => {
  return [
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('fromHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightFt is invalid');
      }
    }),
    body('fromHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightIn is invalid');
      }
    }),
    body('toHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightFt is invalid');
      }
    }),
    body('toHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightIn is invalid');
      }
    }),
    body('fromWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('FromWeight is invalid');
      }
    }),
    body('toWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ToWeight is invalid');
      }
    }),
    body('fromAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromAge is invalid');
      }
    }),
    body('toAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToAge is invalid');
      }
    }),
    body('profession').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Profession is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 5 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('waistSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('WaistSizeNum is invalid');
      }
    }),
    body('waistSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('WaistSizeLabel is invalid');
      }
    }),
    body('shirtSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtSizeNo is invalid');
      }
    }),
    body('shirtSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtSizeLabel is invalid');
      }
    }),
    body('inseamSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('InseamSizeNum is invalid');
      }
    }),
    body('bottomSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomSizeNo is invalid');
      }
    }),
    body('shoeSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeNum is invalid');
      }
    }),
    body('shoeSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeLabel is invalid');
      }
    }),
    body('bodyShape').custom((value) => numsArrValidMdware(value, 0, 4, 'BodyShape', false)),
    body('skinToneLabel').custom((value) => numsArrValidMdware(value, 0, 5, 'SkinToneLabel', false)),
    body('typicalWear2Work').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('TypicalWear2Work is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('casualShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('CasualShirts is invalid');
      }
    }),
    body('btnUpShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('btnUpShirts is invalid');
      }
    }),
    body('jeansFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JeansFit is invalid');
      }
    }),
    body('shortsLong').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShortsLong is invalid');
      }
    }),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('bottomFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomFit is invalid');
      }
    }),
    body('outFits').custom((value) => numsArrValidMdware(value, 0, 19, 'OutFits', false)),
    body('fitIssues').custom((value) => numsArrValidMdware(value, 0, 14, 'FitIssues', false)),
    body('budgetType').custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('BudgetType is invalid');
      }
      if (validator.isInt(value, { min: 0, max: 14 })) {
        return true;
      } else {
        throw new Error('BudgetType is invalid');
      }
    }),
    body('budgetShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShirts is invalid');
      }
    }),
    body('budgetTeesPolos').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTeesPolos is invalid');
      }
    }),
    body('budgetSweatersShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSweatersShirts is invalid');
      }
    }),
    body('budgetPantsDenim').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetPantsDenim is invalid');
      }
    }),
    body('budgetShorts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShorts is invalid');
      }
    }),
    body('budgetShoes').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShoes is invalid');
      }
    }),
    body('budgetOuterwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetOuterwear is invalid');
      }
    }),
    body('budgetTies').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTies is invalid');
      }
    }),
    body('budgetBelts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetBelts is invalid');
      }
    }),
    body('budgetWalletsBags').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetWalletsBags is invalid');
      }
    }),
    body('budgetSunglasses').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSunglasses is invalid');
      }
    }),
    body('budgetHats').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetHats is invalid');
      }
    }),
    body('budgetSocks').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSocks is invalid');
      }
    }),
    body('budgetUnderwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetUnderwear is invalid');
      }
    }),
    body('budgetGrooming').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetGrooming is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invAddProductForWomenRules = () => {
  return [
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('fromHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightFt is invalid');
      }
    }),
    body('fromHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightIn is invalid');
      }
    }),
    body('toHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightFt is invalid');
      }
    }),
    body('toHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightIn is invalid');
      }
    }),
    body('fromWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('FromWeight is invalid');
      }
    }),
    body('toWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ToWeight is invalid');
      }
    }),
    body('fromAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromAge is invalid');
      }
    }),
    body('toAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToAge is invalid');
      }
    }),
    body('profession').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Profession is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('occasions').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Occasions is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('bodyType').custom((value) => numsArrValidMdware(value, 0, 4, 'BodyType', false)),
    body('skinToneLabel').custom((value) => numsArrValidMdware(value, 0, 5, 'SkinToneLabel', false)),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 11 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('pantsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantsSize is invalid');
      }
    }),
    body('braSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BraSizeNum is invalid');
      }
    }),
    body('braSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BraSizeLabel is invalid');
      }
    }),
    body('skirtSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SkirtSize is invalid');
      }
    }),
    body('jeansSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JeansSize is invalid');
      }
    }),
    body('activeWearSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ActiveWearSize is invalid');
      }
    }),
    body('jacketSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JacketSize is invalid');
      }
    }),
    body('bottomSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomSize is invalid');
      }
    }),
    body('dressSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressSizeNo is invalid');
      }
    }),
    body('dressSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressSizeLabel is invalid');
      }
    }),
    body('shirtBlouseSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtBlouseSizeNo is invalid');
      }
    }),
    body('shirtBlouseSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtBlouseSizeLabel is invalid');
      }
    }),
    body('shoeSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeNum is invalid');
      }
    }),
    body('heelHeightLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('HeelHeightLabel is invalid');
      }
    }),
    body('shoesStyleLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoesStyleLabel is invalid');
      }
    }),
    body('topSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopSizeNo is invalid');
      }
    }),
    body('topSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopSizeLabel is invalid');
      }
    }),
    body('styleInspiration').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('StyleInspiration is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('dressLength').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressLength is invalid');
      }
    }),
    body('topHalf').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('TopHalf is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('pantLength').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantLength is invalid');
      }
    }),
    body('pantRaise').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantRaise is invalid');
      }
    }),
    body('pantStyle').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantStyle is invalid');
      }
    }),
    body('appareType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AppareType is invalid');
      }
    }),
    body('bottomsType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomsType is invalid');
      }
    }),
    body('topType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopType is invalid');
      }
    }),
    body('patternsType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PatternsType is invalid');
      }
    }),
    body('denimStyles').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('DenimStyles is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('missingFromFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('MissingFromFit is invalid');
      }
    }),
    body('outFits').custom((value) => numsArrValidMdware(value, 0, 7, 'OutFits', false)),
    body('budgetType').custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('BudgetType is invalid');
      }
      if (validator.isInt(value, { min: 0, max: 6 })) {
        return true;
      } else {
        throw new Error('BudgetType is invalid');
      }
    }),
    body('budgetTops').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTops is invalid');
      }
    }),
    body('budgetBottoms').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetBottoms is invalid');
      }
    }),
    body('budgetOuterwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetOuterwear is invalid');
      }
    }),
    body('budgetJeans').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetJeans is invalid');
      }
    }),
    body('budgetJewelry').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetJewelry is invalid');
      }
    }),
    body('budgetAccessories').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetAccessories is invalid');
      }
    }),
    body('budgetDress').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetDress is invalid');
      }
    }),
    body('sizeShoulders').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeShoulders is invalid');
      }
    }),
    body('sizeArms').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeArms is invalid');
      }
    }),
    body('sizeHips').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeHips is invalid');
      }
    }),
    body('sizeLegs').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeLegs is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invAddProductForKidsRules = () => {
  return [
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('childHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ChildHeightFt is invalid');
      }
    }),
    body('childHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ChildHeightIn is invalid');
      }
    }),
    body('childWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ChildWeight is invalid');
      }
    }),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 3 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('topsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopsSize is invalid');
      }
    }),
    body('bottomsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomsSize is invalid');
      }
    }),
    body('shoeSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSize is invalid');
      }
    }),
    body('bodyShape').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BodyShape is invalid');
      }
    }),
    body('typeOfPrint').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TypeOfPrint is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invEditProductForMenRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('fromHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightFt is invalid');
      }
    }),
    body('fromHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightIn is invalid');
      }
    }),
    body('toHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightFt is invalid');
      }
    }),
    body('toHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightIn is invalid');
      }
    }),
    body('fromWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('FromWeight is invalid');
      }
    }),
    body('toWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ToWeight is invalid');
      }
    }),
    body('fromAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromAge is invalid');
      }
    }),
    body('toAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToAge is invalid');
      }
    }),
    body('profession').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Profession is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 5 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('waistSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('WaistSizeNum is invalid');
      }
    }),
    body('waistSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('WaistSizeLabel is invalid');
      }
    }),
    body('shirtSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtSizeNo is invalid');
      }
    }),
    body('shirtSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtSizeLabel is invalid');
      }
    }),
    body('inseamSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('InseamSizeNum is invalid');
      }
    }),
    body('bottomSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomSizeNo is invalid');
      }
    }),
    body('shoeSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeNum is invalid');
      }
    }),
    body('shoeSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeLabel is invalid');
      }
    }),
    body('bodyShape').custom((value) => numsArrValidMdware(value, 0, 4, 'BodyShape', false)),
    body('skinToneLabel').custom((value) => numsArrValidMdware(value, 0, 5, 'SkinToneLabel', false)),
    body('typicalWear2Work').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('TypicalWear2Work is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('casualShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('CasualShirts is invalid');
      }
    }),
    body('btnUpShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('btnUpShirts is invalid');
      }
    }),
    body('jeansFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JeansFit is invalid');
      }
    }),
    body('shortsLong').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShortsLong is invalid');
      }
    }),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('bottomFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomFit is invalid');
      }
    }),
    body('outFits').custom((value) => numsArrValidMdware(value, 0, 19, 'OutFits', false)),
    body('fitIssues').custom((value) => numsArrValidMdware(value, 0, 14, 'FitIssues', false)),
    body('budgetType').custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('BudgetType is invalid');
      }
      if (validator.isInt(value, { min: 0, max: 14 })) {
        return true;
      } else {
        throw new Error('BudgetType is invalid');
      }
    }),
    body('budgetShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShirts is invalid');
      }
    }),
    body('budgetTeesPolos').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTeesPolos is invalid');
      }
    }),
    body('budgetSweatersShirts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSweatersShirts is invalid');
      }
    }),
    body('budgetPantsDenim').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetPantsDenim is invalid');
      }
    }),
    body('budgetShorts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShorts is invalid');
      }
    }),
    body('budgetShoes').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetShoes is invalid');
      }
    }),
    body('budgetOuterwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetOuterwear is invalid');
      }
    }),
    body('budgetTies').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTies is invalid');
      }
    }),
    body('budgetBelts').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetBelts is invalid');
      }
    }),
    body('budgetWalletsBags').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetWalletsBags is invalid');
      }
    }),
    body('budgetSunglasses').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSunglasses is invalid');
      }
    }),
    body('budgetHats').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetHats is invalid');
      }
    }),
    body('budgetSocks').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetSocks is invalid');
      }
    }),
    body('budgetUnderwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetUnderwear is invalid');
      }
    }),
    body('budgetGrooming').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetGrooming is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invEditProductForWomenRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('fromHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightFt is invalid');
      }
    }),
    body('fromHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromHeightIn is invalid');
      }
    }),
    body('toHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightFt is invalid');
      }
    }),
    body('toHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToHeightIn is invalid');
      }
    }),
    body('fromWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('FromWeight is invalid');
      }
    }),
    body('toWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ToWeight is invalid');
      }
    }),
    body('fromAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('FromAge is invalid');
      }
    }),
    body('toAge').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ToAge is invalid');
      }
    }),
    body('profession').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Profession is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('occasions').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('Occasions is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('bodyType').custom((value) => numsArrValidMdware(value, 0, 4, 'BodyType', false)),
    body('skinToneLabel').custom((value) => numsArrValidMdware(value, 0, 5, 'SkinToneLabel', false)),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 11 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('pantsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantsSize is invalid');
      }
    }),
    body('braSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BraSizeNum is invalid');
      }
    }),
    body('braSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BraSizeLabel is invalid');
      }
    }),
    body('skirtSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SkirtSize is invalid');
      }
    }),
    body('jeansSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JeansSize is invalid');
      }
    }),
    body('activeWearSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ActiveWearSize is invalid');
      }
    }),
    body('jacketSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('JacketSize is invalid');
      }
    }),
    body('bottomSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomSize is invalid');
      }
    }),
    body('dressSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressSizeNo is invalid');
      }
    }),
    body('dressSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressSizeLabel is invalid');
      }
    }),
    body('shirtBlouseSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtBlouseSizeNo is invalid');
      }
    }),
    body('shirtBlouseSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShirtBlouseSizeLabel is invalid');
      }
    }),
    body('shoeSizeNum').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSizeNum is invalid');
      }
    }),
    body('heelHeightLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('HeelHeightLabel is invalid');
      }
    }),
    body('shoesStyleLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoesStyleLabel is invalid');
      }
    }),
    body('topSizeNo').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopSizeNo is invalid');
      }
    }),
    body('topSizeLabel').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopSizeLabel is invalid');
      }
    }),
    body('styleInspiration').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('StyleInspiration is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('dressLength').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('DressLength is invalid');
      }
    }),
    body('topHalf').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('TopHalf is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('pantLength').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantLength is invalid');
      }
    }),
    body('pantRaise').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantRaise is invalid');
      }
    }),
    body('pantStyle').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PantStyle is invalid');
      }
    }),
    body('appareType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AppareType is invalid');
      }
    }),
    body('bottomsType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomsType is invalid');
      }
    }),
    body('topType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopType is invalid');
      }
    }),
    body('patternsType').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('PatternsType is invalid');
      }
    }),
    body('denimStyles').custom((value) => {
      if (!value) return true;
      const data = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(data)) {
        throw new Error('DenimStyles is invalid');
      }
      const newValue = [];
      data.forEach((val) => {
        newValue.push(validator.blacklist(validator.trim(val), '<>'));
      });
      return newValue;
    }),
    body('missingFromFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('MissingFromFit is invalid');
      }
    }),
    body('outFits').custom((value) => numsArrValidMdware(value, 0, 7, 'OutFits', false)),
    body('budgetType').custom((value) => {
      if (!value) return true;
      if (typeof value !== 'string') {
        throw new Error('BudgetType is invalid');
      }
      if (validator.isInt(value, { min: 0, max: 6 })) {
        return true;
      } else {
        throw new Error('BudgetType is invalid');
      }
    }),
    body('budgetTops').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetTops is invalid');
      }
    }),
    body('budgetBottoms').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetBottoms is invalid');
      }
    }),
    body('budgetOuterwear').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetOuterwear is invalid');
      }
    }),
    body('budgetJeans').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetJeans is invalid');
      }
    }),
    body('budgetJewelry').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetJewelry is invalid');
      }
    }),
    body('budgetAccessories').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetAccessories is invalid');
      }
    }),
    body('budgetDress').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BudgetDress is invalid');
      }
    }),
    body('sizeShoulders').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeShoulders is invalid');
      }
    }),
    body('sizeArms').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeArms is invalid');
      }
    }),
    body('sizeHips').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeHips is invalid');
      }
    }),
    body('sizeLegs').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('SizeLegs is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invEditProductForKidsRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('prodCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product category ID is required'),
    body('prodSubCategoryId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage('Product sub-category ID is required'),
    body('productName1')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 1 is required'),
    body('productName2')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Product name 2 is required'),
    body('childHeightFt').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ChildHeightFt is invalid');
      }
    }),
    body('childHeightIn').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ChildHeightIn is invalid');
      }
    }),
    body('childWeight').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ChildWeight is invalid');
      }
    }),
    body('colorName').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    }),
    body('sizeType')
      .not()
      .isEmpty()
      .withMessage('SizeType is required')
      .custom((value) => {
        if (typeof value !== 'string') {
          throw new Error('SizeType is invalid');
        }
        if (validator.isInt(value, { min: 0, max: 3 })) {
          return true;
        } else {
          throw new Error('SizeType is invalid');
        }
      }),
    body('bestSizeFit').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BestSizeFit is invalid');
      }
    }),
    body('topsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TopsSize is invalid');
      }
    }),
    body('bottomsSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BottomsSize is invalid');
      }
    }),
    body('shoeSize').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('ShoeSize is invalid');
      }
    }),
    body('bodyShape').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('BodyShape is invalid');
      }
    }),
    body('typeOfPrint').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('TypeOfPrint is invalid');
      }
    }),
    body('purchasePrice').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('PurchasePrice is invalid');
      }
    }),
    body('salePrice')
      .not()
      .isEmpty()
      .withMessage('SalePrice is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 0 })) {
          return validator.toInt(value);
        } else if (validator.isFloat(value, { min: 0.0 })) {
          return validator.toFloat(value);
        } else {
          throw new Error('SalePrice is invalid');
        }
      }),
    body('quantity')
      .not()
      .isEmpty()
      .withMessage('Quantity is required')
      .custom((value) => {
        value = String(value);
        if (validator.isInt(value, { min: 1 })) {
          return validator.toInt(value);
        } else {
          throw new Error('Quantity is invalid');
        }
      }),
    body('brandName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Brand name is required'),
    body('availableStatus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else {
        throw new Error('AvailableStatus is invalid');
      }
    }),
    body('productImage').custom((value) => {
      if (!value) return true;
      return validator.trim(value);
    }),
    body('note').custom((value) => {
      if (!value) return true;
      return validator.blacklist(validator.trim(value), '<>');
    })
  ];
};

const invEditInvProfileRules = () => {
  return [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Email of inventory profile is required')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email of inventory profile is invalid'),
    body('phone')
      .not()
      .isEmpty()
      .withMessage('Phone number of inventory profile is required')
      .trim()
      .isMobilePhone()
      .withMessage('Phone number of inventory profile is invalid'),
    body('address')
      .not()
      .isEmpty()
      .trim()
      .blacklist('<>')
      .isLength({ min: 1 })
      .withMessage('Address of inventory profile is required')
  ];
};

const invResetInvPwdRules = () => {
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

const invEditInvValueSetRules = () => {
  return [
    body('parentCheckoutTimeFee').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ParentCheckoutTimeFee is invalid');
      }
    }),
    body('kidCheckoutTimeFee').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('KidCheckoutTimeFee is invalid');
      }
    }),
    body('salesTax100').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('SalesTax100 is invalid');
      }
    }),
    body('parentStyleFees').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('ParentStyleFees is invalid');
      }
    }),
    body('kidStyleFee').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('KidStyleFee is invalid');
      }
    }),
    body('inviteFriendBonus').custom((value) => {
      if (!value) return true;
      value = String(value);
      if (validator.isInt(value, { min: 0 })) {
        return validator.toInt(value);
      } else if (validator.isFloat(value, { min: 0.0 })) {
        return validator.toFloat(value);
      } else {
        throw new Error('InviteFriendBonus is invalid');
      }
    }),
    body('toHelpBatch').custom((value) => {
      if (!value) return true;
      if (!validator.isEmail(value)) {
        throw new Error('ToHelpBatch must be a valid email address');
      }
      return value;
    }),
    body('toHelp').custom((value) => {
      if (!value) return true;
      if (!validator.isEmail(value)) {
        throw new Error('ToHelp must be a valid email address');
      }
      return value;
    }),
    body('to_email').custom((value) => {
      if (!value) return true;
      if (!validator.isEmail(value)) {
        throw new Error('to_email must be a valid email address');
      }
      return value;
    }),
    body('from_email').custom((value) => {
      if (!value) return true;
      if (!validator.isEmail(value)) {
        throw new Error('from_email must be a valid email address');
      }
      return value;
    })
  ];
};

const invAddInvEmailTplRules = () => {
  return [
    body('emailName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Email name is required')
  ];
};

const invEditInvEmailTplRules = () => {
  return [
    body('id').not().isEmpty().trim().escape().isLength({ min: 1 }).withMessage('ID is required'),
    body('emailName').not().isEmpty().trim().blacklist('<>').isLength({ min: 1 }).withMessage('Email name is required')
  ];
};

export {
  invAddColorRules,
  invEditColorRules,
  changeBrandStaffPwdRules,
  editBrandStaffInfoRules,
  invAddProdCategoryRules,
  invEditProdCategoryRules,
  invAddProductForMenRules,
  invAddProductForWomenRules,
  invAddProductForKidsRules,
  invEditProductForMenRules,
  invEditProductForWomenRules,
  invEditProductForKidsRules,
  invEditInvProfileRules,
  invResetInvPwdRules,
  invEditInvValueSetRules,
  invAddInvEmailTplRules,
  invEditInvEmailTplRules
};
