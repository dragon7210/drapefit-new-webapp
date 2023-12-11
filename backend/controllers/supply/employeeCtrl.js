/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import Employee from '../../models/supply/employee.js';
import { HashPassword } from '../../models/admin/user.js';

const addEmployee = asyncHandler(async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const newPwd = await HashPassword(password);
    await Employee.create({ created: new Date(), password: newPwd, is_active: 0, ...rest });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_addEmployee_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const editEmployee = asyncHandler(async (req, res) => {
  try {
    const { password, id, ...rest } = req.body;
    const newPwd = await HashPassword(password);
    await Employee.update({ password: newPwd, ...rest }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_editEmployee_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).send(employees);
  } catch (error) {
    console.log('API_getEmployees_500:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    await Employee.destroy({ where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_getEmployees_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const changepwdEmployee = asyncHandler(async (req, res) => {
  try {
    const { id, password } = req.body;
    const newPwd = await HashPassword(password);
    await Employee.update({ password: newPwd }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('API_getEmployees_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const toggleactiveEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    let employee = await Employee.findByPk(id);
    let is_active = employee.is_active === 0 ? 1 : 0;
    console.log('Current is_active value:', is_active);
    await Employee.update({ is_active }, { where: { id } });
    res.status(200).send('success');
  } catch (error) {
    console.log('toggleActiveEmployee error:', error?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { addEmployee, getEmployees, editEmployee, deleteEmployee, changepwdEmployee, toggleactiveEmployee };
