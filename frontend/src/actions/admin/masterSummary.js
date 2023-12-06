import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  GET_FINALIZED_SUMMARY_REPORT,
  GET_FINALIZED_DETAIL_REPORT,
  GET_CHECKOUT_SUMMARY_REPORT,
  GET_CHECKOUT_DETAIL_REPORT,
  GET_NOT_CHECKOUT_SUMMARY_REPORT,
  GET_NOT_CHECKOUT_DETAIL_REPORT,
  GET_DECLINE_DETAIL_REPORT,
  GET_NOT_RETURN_DETAIL_REPORT,
  GET_NOT_RTEX_DETAIL_REPORT,
  GET_RETURN_PROCESS_DETAIL_REPORT,
  GET_EXCHANGE_DETAIL_REPORT,
  GET_DECLINE_SUMMARY_REPORT,
  GET_NOT_RETURN_SUMMARY_REPORT,
  GET_NOT_RTEX_SUMMARY_REPORT,
  GET_RETURN_PROCESS_SUMMARY_REPORT,
  GET_EXCHANGE_SUMMARY_REPORT,
  GET_STYLING_FEE_REPORT,
  GET_CHANGE_AUTO_CHECKOUT
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getFinalizedSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/finalalizedSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_FINALIZED_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getFinalizedSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getFinalizedDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/finalalizedDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_FINALIZED_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getFinalizedDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckoutSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/checkoutSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECKOUT_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckoutSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckoutDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/checkoutDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECKOUT_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckoutDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotCheckoutSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notCheckoutSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_CHECKOUT_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotCheckoutSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
export const getNotCheckoutDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notCheckoutDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_CHECKOUT_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotCheckoutDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getExchangeDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/exchangeDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_EXCHANGE_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getExchangeDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getDeclineDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/declineDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_DECLINE_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getDeclineDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotReturnDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notReturnDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_RETURN_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotReturnDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotRtExDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notRtExDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_RTEX_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotRtExDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getReturnProcessDetailReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/returnProcessDetailReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_RETURN_PROCESS_DETAIL_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getReturnProcessDetailReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getExchangeSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/exchangeSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_EXCHANGE_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getExchangeSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getDeclineSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/declineSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_DECLINE_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getDeclineSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotReturnSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notReturnSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_RETURN_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotReturnSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotRtExSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/notRtExSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_RTEX_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotRtExSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getReturnProcessSummaryReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/returnProcessSummaryReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_RETURN_PROCESS_SUMMARY_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getReturnProcessSummaryReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getStylingFeeReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/stylingFeeReport', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_STYLING_FEE_REPORT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getStylingFeeReport_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getChangeAutoCheckout = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/master/changeAutoCheckout');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHANGE_AUTO_CHECKOUT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getChangeAutoCheckout_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateChangeAutoCheckout = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/master/changeAutoCheckout/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getChangeAutoCheckout());
    } else {
      setAlert('ACTION_updateChangeAutoCheckout_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
