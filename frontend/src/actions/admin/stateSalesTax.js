import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_STATE_SALESTAX, EDIT_STATE_SALESTAX } from 'actions/common/types';
import Api from 'utils/Api';
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
    } else {
      setAlert('ACTION_addStateSalesTax_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const editStateSalesTax = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/state/salestax/edit', values);
    if (res.data) {
      setAlert('Sales tax has been updated', 'success');
      dispatch({
        type: EDIT_STATE_SALESTAX,
        payload: res.data
      });
    } else {
      setAlert('ACTION_editStateSalesTax_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
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
    } else {
      setAlert('ACTION_deleteStateSalesTax_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};
