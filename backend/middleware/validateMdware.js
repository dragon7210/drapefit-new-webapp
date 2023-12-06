/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  try {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    let extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));
    console.log('MDWARE_validate_422:', JSON.stringify(errors));
    return res.status(422).json({
      errors: extractedErrors
    });
  } catch (e) {
    console.log('MDWARE_validate_ERROR:', e?.message);
    next(e);
  }
};

export { validate };
