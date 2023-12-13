import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SPL_PRODUCTS } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSplProducts = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/admsupplier/manage/splproduct/tbllist', data);
    if (res.data) {
      dispatch({
        type: GET_SPL_PRODUCTS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSplProducts_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addSplProduct = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splproduct/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert(res.data?.msg, 'success');
      dispatch(getSplProducts(data));
    } else {
      setAlert('ACTION_addSplProduct_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const checkSplProdBeforeUpsert = async (data) => {
  try {
    const res = await Api.post('/admsupplier/manage/splproduct/check/before/upsert', data);
    if (res.data === 'No problem') {
    } else if (res.data === 'Supplier product for the selected category already exists') {
      setAlert(res.data, 'warning');
    } else {
      setAlert('ACTION_checkSplProdBeforeUpsert_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSplProduct = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splproduct/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Supplier product has been updated', 'success');
      dispatch(getSplProducts(data));
    } else {
      setAlert('ACTION_editSplProduct_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addSplProdStock = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splproduct/addmore/stock', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Added more stock to supplier products', 'success');
      dispatch(getSplProducts(data));
    } else {
      setAlert('ACTION_addSplProdStock_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const manualDeductSplProdStock = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splproduct/manualdeduct/stock', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Deducted stock manually from supplier products', 'success');
      dispatch(getSplProducts(data));
    } else {
      setAlert('ACTION_manualDeductSplProdStock_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteSplProduct = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/splproduct/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Supplier product has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getSplProducts());
    } else {
      setAlert('ACTION_deleteSplProduct_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
