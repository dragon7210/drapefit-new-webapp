import { setAlert } from 'actions/common/alert';
import { GET_MER_BRAND, SET_LOADING } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const createBrand = (values) => async () => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/brand/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBrands = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/brand/getBrands', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MER_BRAND,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBrands_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/brand/delete', id);
    if (res.data) {
      dispatch(getBrands());
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_deleteBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editBrand = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/brand/edit', data);
    if (res.data) {
      dispatch(getBrands());
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_deleteBrand_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
