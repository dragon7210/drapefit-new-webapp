import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  INV_GET_PRODUCT_LIST,
  GET_INV_PROFILE,
  GET_INV_VALUESET,
  GET_INV_EMAILTPL,
  EDIT_INV_EMAILTPL,
  GET_IND_PRODUCT,
  INV_GET_MANUAL_PRODUCT,
  INV_GET_REPORT_PRODUCT,
  INV_GET_SUMMARY_PRODUCT
} from 'actions/common/types';
import Api from 'utils/Api';
import DFnewLogger from 'utils/DFnewLogger';

export const getProductList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/tbllist', data);
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductList_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const deleteProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post(`/adminventory/manage/product/delete`, data);
    if (res.data) {
      setAlert(res.data, 'success');
      dispatch(getProductList(data));
    } else {
      setAlert('ACTION_deleteProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const toggleProductActive = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post(`/adminventory/manage/product/toggleactive`, data);
    if (res.data) {
      setAlert(res.data, 'success');
      dispatch(getProductList(data));
    } else {
      setAlert('ACTION_toggleProductActive_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const getInventoryProfile = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/invsetting/profile');
    if (res.data) {
      dispatch({
        type: GET_INV_PROFILE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInventoryProfile_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
  }
};

export const editInventoryProfile = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/profile/edit', values);
    if (res.data) {
      setAlert('Profile has been updated', 'success');
    } else {
      setAlert('ACTION_editInventoryProfile_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const resetInventoryPwd = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/password/reset', values);
    if (res.data.includes('Password has been updated')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_resetInventoryPwd_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const getInventoryValueSet = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/adminventory/manage/invsetting/valueset');
    if (res.data) {
      dispatch({
        type: GET_INV_VALUESET,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInventoryValueSet_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const editInventoryValueSet = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/valueset/edit', values);
    if (res.data) {
      setAlert('Value Set has been updated', 'success');
    } else {
      setAlert('ACTION_editInventoryValueSet_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const getInventoryEmailTpl = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/emailtpl/tbllist', data);
    if (res.data) {
      dispatch({
        type: GET_INV_EMAILTPL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInventoryEmailTpl_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const addInventoryEmailTpl = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/emailtpl/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Email template has been added', 'success');
      dispatch(getInventoryEmailTpl(data));
    } else {
      setAlert('ACTION_addInventoryEmailTpl_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const editInventoryEmailTpl = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/emailtpl/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Email template has been updated', 'success');
      dispatch({
        type: EDIT_INV_EMAILTPL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_editInventoryEmailTpl_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const deleteInventoryEmailTpl = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/invsetting/emailtpl/delete', values);
    if (res.data === 'Email template has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getInventoryEmailTpl(data));
    } else {
      setAlert('ACTION_deleteInventoryEmailTpl_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const getProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/individual', data);
    if (res.data) {
      dispatch({
        type: GET_IND_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
  }
};

export const addProduct = (data) => async () => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/add', data);
    if (res.data) {
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_getProductList_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err);
  }
};

export const editProduct = (data) => async () => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/edit', data);
    if (res.data) {
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_getProductList_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err);
  }
};

export const getManualProduct = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/adminventory/manage/product/manual');
    if (res.data) {
      dispatch({
        type: INV_GET_MANUAL_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getManualProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err);
  }
};

export const getReportProduct = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/report/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_REPORT_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getReportProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    DFnewLogger(err);
  }
};

export const getSummaryProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/report/summary', data);
    if (res.data) {
      dispatch({
        type: INV_GET_SUMMARY_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSummaryProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err);
  }
};
