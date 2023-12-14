/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import User from '../../models/admin/user.js';

const getInitial = asyncHandler(async (req, res) => {
  try {
    const support = await User.findAll({ where: { type: 9, is_active: 1 }, attributes: ['id', 'name'] });
    const emp = await User.findAll({ where: { type: 3, is_active: 1 }, attributes: ['id', 'name'] });
    const inventory = await User.findAll({ where: { type: 7, is_active: 1 }, attributes: ['id', 'name'] });
    const qa = await User.findAll({ where: { type: 8, is_active: 1 }, attributes: ['id', 'name'] });
    console.log('API_getInitial_200');
    return res.status(200).send({ support, emp, inventory, qa });
  } catch (e) {
    console.log('API_getInitial_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getInitial };
