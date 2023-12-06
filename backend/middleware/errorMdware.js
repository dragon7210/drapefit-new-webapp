/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import path from 'path';

const __dirname = path.resolve();

const notFound = (req, res, next) => {
  try {
    const err = new Error(`Not found: ${req.originalUrl}`);
    console.log('MDWARE_notFound_404:', err?.message);
    res.status(404).sendFile(path.resolve(__dirname, 'backend', 'errpages', '404.html'));
  } catch (e) {
    console.log('MDWARE_notFound_500:', e?.message);
    res.status(500);
    next(e);
  }
};

const errorHandler = (err, req, res, next) => {
  try {
    console.log('MDWARE_errorHandler_500:1:', err?.message);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.resolve(__dirname, 'backend', 'errpages', '500.html'));
    } else {
      res.json({
        message: err?.message,
        stack: err?.stack
      });
    }
  } catch (e) {
    console.log('MDWARE_errorHandler_500:2:', e?.message);
    res.status(500);
    next(e);
  }
};

export { notFound, errorHandler };
