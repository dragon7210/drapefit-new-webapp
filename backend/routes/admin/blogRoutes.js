/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as blogCtrl from '../../controllers/admin/blogCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const blogRoutes = express.Router();
/**
 * @method GET
 * @route dfnew/admmain/manage/BlogCategory/tbllist
 * @access private
 * @desc get the BlogCategory
 */
blogRoutes.route('/blogCategory/tbllist').get(protectAdmin, blogCtrl.getBlogCategory);

/**
 * @method POST
 * @route dfnew/admmain/manage/BlogCategory/add
 * @access private
 * @desc add the BlogCategory
 */
blogRoutes.route('/blogCategory/add').post(protectAdmin, blogCtrl.addBlogCategory);

/**
 * @method POST
 * @route dfnew/admmain/manage/BlogCategory/del
 * @access private
 * @desc delete the BlogCategory
 */
blogRoutes.route('/blogCategory/del').post(protectAdmin, blogCtrl.delBlogCategory);

/**
 * @method POST
 * @route dfnew/admmain/manage/BlogCategory/update
 * @access private
 * @desc Update the BlogCategory
 */
blogRoutes.route('/blogCategory/update').post(protectAdmin, blogCtrl.updateBlogCategory);
/**
 * @method GET
 * @route dfnew/admmain/manage/Blog/tbllist
 * @access private
 * @desc get the Blog
 */
blogRoutes.route('/blog/tbllist').get(protectAdmin, blogCtrl.getBlog);

/**
 * @method POST
 * @route dfnew/admmain/manage/Blog/add
 * @access private
 * @desc add the Blog
 */
blogRoutes.route('/blog/add').post(protectAdmin, blogCtrl.addBlog);

/**
 * @method POST
 * @route dfnew/admmain/manage/Blog/del
 * @access private
 * @desc delete the Blog
 */
blogRoutes.route('/blog/del').post(protectAdmin, blogCtrl.delBlog);

/**
 * @method POST
 * @route dfnew/admmain/manage/Blog/update
 * @access private
 * @desc Update the Blog
 */
blogRoutes.route('/blog/update').post(protectAdmin, blogCtrl.updateBlog);
/**
 * @method GET
 * @route dfnew/admmain/manage/blogTag/tbllist
 * @access private
 * @desc get the Blog Tag
 */
blogRoutes.route('/blogTag/tbllist').get(protectAdmin, blogCtrl.getBlogTag);

/**
 * @method POST
 * @route dfnew/admmain/manage/blogTag/add
 * @access private
 * @desc add the Blog Tag
 */
blogRoutes.route('/blogTag/add').post(protectAdmin, blogCtrl.addBlogTag);

/**
 * @method POST
 * @route dfnew/admmain/manage/blogTag/del
 * @access private
 * @desc delete the Blog Tag
 */
blogRoutes.route('/blogTag/del').post(protectAdmin, blogCtrl.delBlogTag);

/**
 * @method POST
 * @route dfnew/admmain/manage/blogTag/update
 * @access private
 * @desc Update the Blog Tag
 */
blogRoutes.route('/blogTag/update').post(protectAdmin, blogCtrl.updateBlogTag);

export default blogRoutes;
