import { setAlert } from 'actions/common/alert';
import { GET_SPL_PROFILE } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSupplierProfile = () => async (dispatch) => {
  try {
    const res = await Api.get('/admsupplier/manage/splsetting/profile');
    if (res.data) {
      dispatch({
        type: GET_SPL_PROFILE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSupplierProfile_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSupplierProfile = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splsetting/profile/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Profile has been updated', 'success');
    } else {
      setAlert('ACTION_editSupplierProfile_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const resetSupplierPwd = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splsetting/password/reset', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Password has been updated')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_resetSupplierPwd_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
