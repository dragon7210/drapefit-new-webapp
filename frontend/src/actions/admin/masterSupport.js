import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_CUSTOM_PAID, GET_PREVIOUS_WORK } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';

export const getCustomPaidList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master-support/paid');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CUSTOM_PAID,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCustomPaidList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    ErrorHandler(err);
  }
};

export const getPreviewWorkList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master-support/previous');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PREVIOUS_WORK,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPreviewWorkList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    ErrorHandler(err);
  }
};
