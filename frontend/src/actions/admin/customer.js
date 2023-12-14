import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  GET_CUSTOMER,
  GET_PAYMENT_REFUND_INFO,
  GET_PAYMENT_REFUND,
  GET_PAYMENT_REFUND_LIST,
  GET_PAID_LIST,
  GET_NOT_PAID_LIST,
  GET_PREVIEW_WORK_LIST,
  GET_JUNK_LIST,
  GET_BLOCK_LIST,
  GET_MATCHING_LIST,
  GET_BROSWER_LIST
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CUSTOMER,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCustomers_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotPaidList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/notPaidList');
    if (res.data) {
      dispatch({
        type: GET_NOT_PAID_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotPaidList_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateStylist = (id, stylist) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/updateStylist', { id, stylist });
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getPaidList());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateStylist_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateSupport = (id, sup_id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/updateSupport', { id, support_id });
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getPaidList());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateSupport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateInventory = (id, inv_id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/updateInventory', { id, inv_id });
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getPaidList());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateInventory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateQA = (id, qa_id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/updateQA', { id, qa_id });
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getPaidList());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateQA_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPaidList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/paidList');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PAID_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPaidList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delPaidList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/paidList/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPaidList());
    } else {
      setAlert('ACTION_delPaidList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delNotPaidList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/notPaidList/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPaidList());
    } else {
      setAlert('ACTION_delNotPaidList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPaymentRefund = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/payment/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PAYMENT_REFUND,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPaymentRefund_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updatePaymentRefund = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/payment/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'succsee');
      dispatch(getPaymentRefund());
    } else {
      setAlert('ACTION_updatePaymentRefund_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPaymentRefundList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/paymentRefund/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PAYMENT_REFUND_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPaymentRefundList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getSelPaymentRefundInfo = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/paymentRefund/info', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PAYMENT_REFUND_INFO,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSelPaymentRefundInfo_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateSelPaymentRefundInfo = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/paymentRefund/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateSelPaymentRefundInfo_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPreviewWorkList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/previewWorkList/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PREVIEW_WORK_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPreviewWorkList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delPreviousWorkList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/previewWorkList/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getPreviewWorkList());
    } else {
      setAlert('ACTION_delPreviousWorkList_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMatch = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/paidList/matching', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MATCHING_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMatch_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
export const getBrowser = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/customer/paidList/browser', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BROSWER_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBrowser_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getJunk = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/junk/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_JUNK_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getJunk_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBlock = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/customer/block/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BLOCK_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBlock_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
