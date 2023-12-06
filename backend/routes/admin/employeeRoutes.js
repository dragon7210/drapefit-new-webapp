/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as employeeCtrl from '../../controllers/admin/employeeCtrl.js';
import { protectAdmin } from '../../middleware/authMdware.js';

const employeeRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/admmain/manage/employee/create
 * @access private
 * @desc Create employee account in admin dashboard
 */
employeeRoutes.route('/create').post(protectAdmin, employeeCtrl.createEmployee);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/tbllist
 * @access private
 * @desc List employees in table format in admin dashboard
 */
employeeRoutes.route('/tbllist').get(protectAdmin, employeeCtrl.listEmployeesTable);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/changepwd
 * @access private
 * @desc Change employee account password in admin dashboard
 */
employeeRoutes.route('/changepwd').post(protectAdmin, employeeCtrl.changeEmployeePwd);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/edit
 * @access private
 * @desc Edit employee info in admin dashboard
 */
employeeRoutes.route('/edit').post(protectAdmin, employeeCtrl.editEmployeeInfo);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/delete
 * @access private
 * @desc Delete employee account in admin dashboard
 */
employeeRoutes.route('/delete').post(protectAdmin, employeeCtrl.deleteEmployee);

/**
 * @method POST
 * @route dfnew/admmain/manage/employee/toggleactive
 * @access private
 * @desc Toggle active/inactive status of employee account in admin dashboard
 */
employeeRoutes.route('/toggleactive').post(protectAdmin, employeeCtrl.toggleActiveEmployeeStatus);

export default employeeRoutes;
