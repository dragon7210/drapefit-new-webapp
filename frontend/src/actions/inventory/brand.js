import { setAlert } from 'actions/common/alert';
import { SET_LOADING, INV_EDIT_BRAND, INV_GET_BRAND, INV_GET_COUNT, INV_TOGGLE_BRAND } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getCount = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/brand/staff/count');
    if (res.data) {
      dispatch({
        type: INV_GET_COUNT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCount_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBrand = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/brand/staff/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_BRAND,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addBrand = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/staff/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Brand has been created')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_addBrand_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const changeBrandPwd = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/staff/changepwd', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Password has been changed')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_changeBrandPwd_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editBrand = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/staff/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data?.msg.includes('Brand info has been updated')) {
      setAlert(res.data?.msg, 'success');
      dispatch({
        type: INV_EDIT_BRAND,
        payload: res.data?.data
      });
    } else {
      setAlert('ACTION_editBrand_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteBrand = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/staff/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Brand account has been deleted')) {
      setAlert(res.data, 'success');
      dispatch(getBrand());
    } else {
      setAlert('ACTION_deleteBrand_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const toggleBrandActive = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/staff/toggleactive', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert(res.data, 'success');
      dispatch({
        type: INV_TOGGLE_BRAND,
        payload: values
      });
    } else {
      setAlert('ACTION_toggleBrandActive_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const createCollaborationBrand = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/brand/collaborationBrand/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Collaboration Brand has been created')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_createCollaborationBrand_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCollaborationBrand = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/brand/collaborationBrand/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_BRAND,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCollaborationBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteCollaborationBrand = (id) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/brand/collaborationBrand/delete', id);
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getCollaborationBrand());
    } else {
      setAlert('ACTION_deleteCollaborationBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editCollaborationBrand = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/adminventory/manage/brand/collaborationBrand/edit', data);
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getCollaborationBrand());
    } else {
      setAlert('ACTION_editCollaborationBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
