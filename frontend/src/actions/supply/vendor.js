import { setAlert } from 'actions/common/alert';
import { GET_SUPPLIER_VENDOR, SET_LOADING } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const addSupplyVendor = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getSupplierVendor = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/tbllist', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_SUPPLIER_VENDOR,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSupplierVendor_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSupplyVendor = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      dispatch(getSupplierVendor(data));
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteSupplyVendor = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      dispatch(getSupplierVendor(data));
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const changeSupplierVendorPwd = async (values, actions) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/changepwd', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      actions.resetForm();
    } else {
      setAlert('ACTION_changeSupplierVendorPwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const toggleSupplierVendorActive = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/vendor/toggleactive', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'success') {
      setAlert(res.data, 'success');
      dispatch(getSupplierVendor(data));
    } else {
      setAlert('ACTION_toggleSupplierVendorActive_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
