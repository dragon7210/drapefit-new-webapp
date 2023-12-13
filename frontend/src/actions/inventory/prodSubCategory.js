import { setAlert } from 'actions/common/alert';
import { SET_LOADING, INV_GET_PROD_SUB_CATEGORY_LIST, INV_GET_PRODUCT_SUB_CATEGORIES } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getProdSubCategories = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminventory/manage/product/subCategory/tbllist');
    if (res.data) {
      dispatch({
        type: INV_GET_PROD_SUB_CATEGORY_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProdSubCategoryList_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addProdSubCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/subCategory/add', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Product sub-category has been added', 'success');
      dispatch(getProdSubCategories());
    } else {
      setAlert('ACTION_addProdSubCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editProdSubCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/subCategory/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Product sub-category has been updated', 'success');
      dispatch(getProdSubCategories());
    } else {
      setAlert('ACTION_editProdSubCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteProdSubCategory = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminventory/manage/product/subCategory/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert(res.data, 'success');
      dispatch(getProdSubCategories());
    } else {
      setAlert('ACTION_deleteProdSubCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductSubCategories = (in_product_type_id) => async (dispatch) => {
  try {
    const res = await Api.post(`/adminventory/manage/product/category/subCategories`, { in_product_type_id });
    if (res.data) {
      dispatch({
        type: INV_GET_PRODUCT_SUB_CATEGORIES,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductSubCategories_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
