/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as newsCtrl from '../../controllers/admin/newsCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const newsRoute = express.Router();

/**
 * @method GET
 * @route dfnew/admmain/manage/news/tbllist
 * @access private
 * @desc get the news
 */
newsRoute.route('/tbllist').get(protectAdmin, newsCtrl.getNews);

/**
 * @method POST
 * @route dfnew/admmain/manage/news/add
 * @access private
 * @desc add the news
 */
newsRoute.route('/add').post(protectAdmin, newsCtrl.addNews);

/**
 * @method POST
 * @route dfnew/admmain/manage/news/del
 * @access private
 * @desc delete the news
 */
newsRoute.route('/del').post(protectAdmin, newsCtrl.delNews);

/**
 * @method POST
 * @route dfnew/admmain/manage/news/update
 * @access private
 * @desc Update the news
 */
newsRoute.route('/update').post(protectAdmin, newsCtrl.updateNews);

export default newsRoute;
