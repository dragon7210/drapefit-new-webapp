import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SPL_CATEGORY } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSplCategory = () => async (dispatch) => {
  try {
    const res = await Api.get('/admsupplier/manage/category/tbllist');
    if (res.data) {
      dispatch({
        type: GET_SPL_CATEGORY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSplCategory_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addSplCategory = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/category/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('A new supplier product category has been added', 'success');
      dispatch(getSplCategory(data));
      return Promise.resolve();
    } else {
      setAlert('ACTION_addSplCategory_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const editSplCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/category/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert(res.data, 'success');
      dispatch(getSplCategory());
      return Promise.resolve();
    } else {
      setAlert('ACTION_editSplCategory_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const deleteSplCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/category/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Supplier product category has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getSplCategory());
      return Promise.resolve();
    } else {
      setAlert('ACTION_deleteSplCategory_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};
