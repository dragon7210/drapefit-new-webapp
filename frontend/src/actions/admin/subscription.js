import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SUBSCRIPTION } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/subscription/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_SUBSCRIPTION,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSubscription_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateSubscription = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/subscription/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getSubscription());
    } else {
      setAlert('ACTION_updateSubscription_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
