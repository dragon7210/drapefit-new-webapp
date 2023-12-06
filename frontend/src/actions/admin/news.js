import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_NEWS } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getNews = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/news/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NEWS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNews_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addNews = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/news/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getNews());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addNews_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delNews = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/news/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getNews());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delNews_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateNews = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/news/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getNews());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateNews_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
