import { setAlert } from 'actions/common/alert';
import { SET_LOADING, INV_GET_COLOR, INV_EDIT_COLOR } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getColor = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/color/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_COLOR,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getColor_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addColor = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/color/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Color has been added', 'success');
      dispatch(getColor());
    } else {
      setAlert('ACTION_addColor_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editColor = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/color/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Color has been updated', 'success');
      dispatch({
        type: INV_EDIT_COLOR,
        payload: res.data
      });
    } else {
      setAlert('ACTION_editColor_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteColor = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/color/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Color has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getColor());
    } else {
      setAlert('ACTION_deleteColor_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
