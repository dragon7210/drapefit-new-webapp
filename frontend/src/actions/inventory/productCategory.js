import { setAlert } from 'actions/common/alert';
import { SET_LOADING, INV_EDIT_PRODUCT_CATEGORY, INV_GET_PRODUCT_CATEGORIES } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const addProductCategory = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/category/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Product category has been added', 'success');
      dispatch(getProductCategories(data));
    } else {
      setAlert('ACTION_addProductCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editProductCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/category/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Product category has been updated', 'success');
      dispatch({
        type: INV_EDIT_PRODUCT_CATEGORY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_editProductCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteProductCategory = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/category/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Product category has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getProductCategories(data));
    } else {
      setAlert('ACTION_deleteProductCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductCategories = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/product/category/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_CATEGORIES,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductCategories_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
