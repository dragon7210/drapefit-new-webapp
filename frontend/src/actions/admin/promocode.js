import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_PROMOCODE } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getPromocode = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/promocode/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PROMOCODE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPromocode_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updatePromocode = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/promocode/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPromocode());
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addPromocode = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/promocode/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPromocode());
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delPromocode = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/promocode/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPromocode());
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
