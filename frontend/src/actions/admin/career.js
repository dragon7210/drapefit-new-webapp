import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_CAREER } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getCareer = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/career/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CAREER,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCareer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addCareer = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/career/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getCareer());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addCareer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delCareer = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/career/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getCareer());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delCareer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateCareer = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/career/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getCareer());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateCareer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
