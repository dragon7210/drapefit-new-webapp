import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_STATE_SALESTAX, EDIT_STATE_SALESTAX } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getStateSalesTax = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/state/salestax/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_STATE_SALESTAX,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getStateSalesTax_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addStateSalesTax = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/state/salestax/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Sales tax has been added', 'success');
      dispatch(getStateSalesTax());
      return Promise.resolve();
    } else {
      setAlert('ACTION_addStateSalesTax_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const editStateSalesTax = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/state/salestax/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Sales tax has been updated', 'success');
      dispatch({
        type: EDIT_STATE_SALESTAX,
        payload: res.data
      });
      return Promise.resolve();
    } else {
      setAlert('ACTION_editStateSalesTax_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const deleteStateSalesTax = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/state/salestax/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Sales tax has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getStateSalesTax());
      return Promise.resolve();
    } else {
      setAlert('ACTION_deleteStateSalesTax_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};
