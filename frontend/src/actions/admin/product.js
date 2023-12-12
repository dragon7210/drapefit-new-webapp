import { setAlert } from 'actions/common/alert';
import {
  GET_EXCHANGE_PRODUCT,
  GET_DECLINE_PRODUCT,
  GET_SCAN_PRODUCT,
  SET_LOADING,
  GET_DEFAULT_PRODUCT
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getExchangeProduct = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/exchageProduct/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_EXCHANGE_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getExchangeProduct_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getDeclineProduct = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/declineProduct/tblist');
    if (res.data) {
      dispatch({
        type: GET_DECLINE_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getDeclineProduct_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getScanProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/scanProduct/tblist', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_SCAN_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getScanProduct_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const completeScan = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/scan/change', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getScanProduct(data.scanValue));
    } else {
      setAlert('ACTION_completeScan_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getDefaultCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/finance-report/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_DEFAULT_PRODUCT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getDefaultCustomer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
