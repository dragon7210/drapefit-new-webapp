/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'node:fs';

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.join(__dirname, `${process.env.MULTER_DEST_DIR}`);
    if (!existsSync(destPath)) {
      mkdirSync(destPath);
    }
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const fname = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${uuidv4()}-${fname}`);
  }
});

const uploadImg = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only PNG/JPG/JPEG format allowed'));
    }
  }
});

export { uploadImg };
