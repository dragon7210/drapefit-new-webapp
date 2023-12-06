/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import express from 'express';
import * as employeeCtrl from '../../controllers/supply/employeeCtrl.js';
import { protectSupplier } from '../../middleware/authMdware.js';

const employeeRoutes = express.Router();
/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/create
 * @access private
 * @desc Create new supply employee
 */
employeeRoutes.route('/create').post(protectSupplier, employeeCtrl.addEmployee);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/tbllist
 * @access private
 * @desc Get the all supply employee
 */
employeeRoutes.route('/tbllist').post(protectSupplier, employeeCtrl.getEmployees);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/edit
 * @access private
 * @desc Edit new supply employee
 */
employeeRoutes.route('/edit').post(protectSupplier, employeeCtrl.editEmployee);
/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/delete
 * @access private
 * @desc Delete new supply employee
 */
employeeRoutes.route('/delete').post(protectSupplier, employeeCtrl.deleteEmployee);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/changepwd
 * @access private
 * @desc change new password
 */
employeeRoutes.route('/changepwd').post(protectSupplier, employeeCtrl.changepwdEmployee);

/**
 * @method POST
 * @route dfnew/admsupplier/manage/employee/toggleactive
 * @access private
 * @desc change the active state
 */
employeeRoutes.route('/toggleactive').post(protectSupplier, employeeCtrl.toggleactiveEmployee);

export default employeeRoutes;
