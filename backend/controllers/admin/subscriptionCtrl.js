/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import asyncHandler from 'express-async-handler';
import LetsPlanYourFirstFix from '../../models/admin/letsPlanYourFirstFix.js';
import User from '../../models/admin/user.js';
import UserDetail from '../../models/admin/userDetail.js';
import KidsDetail from '../../models/client/kidsDetail.js';

const getLetsPlanYourFirstFix = asyncHandler(async (req, res) => {
  try {
    const data = await LetsPlanYourFirstFix.findAll({
      include: [{ model: User, include: { model: UserDetail } }, KidsDetail]
    });
    return res.status(200).send(data);
  } catch (e) {
    console.log('API_getLetsPlanYourFirstFix_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

const updateLetsPlanYourFirstFix = asyncHandler(async (req, res) => {
  try {
    let { id, how_often_would_you_lik_fixes } = req.body;
    await LetsPlanYourFirstFix.update({ how_often_would_you_lik_fixes }, { where: { id } });
    return res.status(200).send('Success');
  } catch (e) {
    console.log('API_updateLetsPlanYourFirstFix_500:', e?.message);
    res.status(500);
    throw new Error('Internal error occurred');
  }
});

export { getLetsPlanYourFirstFix, updateLetsPlanYourFirstFix };
