import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_CMS } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getCMS = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/cms/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CMS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCMS_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateCMS = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/cms/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getCMS());
      setAlert('Success', 'success');
      navigate('/dfadmin/cms-list');
    } else {
      setAlert('ACTION_updateCMS_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
