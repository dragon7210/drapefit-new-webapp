import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  GET_AUTO_LIST,
  GET_STYLE_LIST,
  GET_STATE_LIST,
  GET_BATCH_PROCESS_REPORT_LIST,
  GET_BATCH_PROCESS_SUBSCRIPTIOM_LIST,
  GET_CLIENT_BIRTHDAY_LIST,
  GET_NOT_CHECKED_OUT_CUSTOMER,
  GET_RETURN_NOT_PROCESSED,
  GET_CHECKED_OUT_PRODUCT_DETAIL,
  GET_PRODUCT_ASSIGNED_BUT_NOT_FINALIZED,
  GET_LIST_PRODUCT_NOT_RETURNED,
  GET_MONTHLY_SALE,
  GET_TOTAL_PRODUCTS_IN,
  GET_CHECKED_OUT_NOT_RETURN_DETAIL,
  GET_PRODUCT_FINALIZE_SUMMARY,
  GET_PRODUCT_FINALIZE_DETAIL,
  GET_PRODUCT_DECLINED_SUMMARY,
  GET_PRODUCT_DECLINE_DETAIL,
  GET_NOT_CHECKOUT_SUMMARY,
  GET_NOT_CHECKOUT_DETAIL,
  GET_MONTHLY_CLIENT_CONSUMED,
  GET_MONTHLY_PRODUCT_NOT_RETURNED,
  GET_MONTHLY_PRODUCT_DECLINED,
  GET_MONTHLY_LOSS,
  GET_MONTHLY_REVENUE,
  GET_CLINET_CHECK_OUT_SUMMARY,
  GET_CLINET_CHECK_OUT_DETAIL,
  GET_CHECK_OUT_RETURN_SUMMARY,
  GET_CHECK_OUT_RETURN_DETAIL,
  GET_CHECK_OUT_NOT_RETURN_SUMMARY
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getAutoList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/auto');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_AUTO_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getAutoList_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getStyleList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/style');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_STYLE_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getStyleList_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getStateList = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/state');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_STATE_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getStateList_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBatchProcessReport = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/batchProcessReport');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BATCH_PROCESS_REPORT_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBatchProcessReport_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBatchProcessSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/batchProcessSubscription');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BATCH_PROCESS_SUBSCRIPTIOM_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBatchProcessSubscription_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getClientBirthday = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/clientBirthday');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CLIENT_BIRTHDAY_LIST,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getClientBirthday_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotCheckedOutCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/notCheckedOutCustomer');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_CHECKED_OUT_CUSTOMER,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotCheckedOutCustomer_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getReturnNotProcessed = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/returnNotProcessed');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_RETURN_NOT_PROCESSED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getReturnNotProcessed_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckedOutProductDetail = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/checkedOutProductDetail');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECKED_OUT_PRODUCT_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutProductDetail_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductAssingendButNotFinalized = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/productAssingendButNotFinalized');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PRODUCT_ASSIGNED_BUT_NOT_FINALIZED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutProductDetail_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getListOfProductNotReturned = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/listOfProductNotReturned');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_LIST_PRODUCT_NOT_RETURNED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutProductDetail_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlySale = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlySale');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_SALE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlySale_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckedOutNotReturnDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/checkedOutNotReturnDetails');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECKED_OUT_NOT_RETURN_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutNotReturnDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getTotalProductsInInventory = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/totalProductsInInventory ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_TOTAL_PRODUCTS_IN,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutNotReturnDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductFinalizeSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/productFinalizeSummary ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PRODUCT_FINALIZE_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductFinalizeSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductFinalizeDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/productFinalizeDetails ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PRODUCT_FINALIZE_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductFinalizeDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductDeclinedSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/productDeclinedSummary ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PRODUCT_DECLINED_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductDeclinedSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProductDeclinedDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/productDeclinedDetails ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PRODUCT_DECLINE_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getProductDeclinedDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotCheckedOutSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/notCheckedOutSummary ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_CHECKOUT_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotCheckedOutSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getNotCheckedOutDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/notCheckedOutDetails ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_NOT_CHECKOUT_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getNotCheckedOutDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlyclientConsumed = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlyclientConsumed ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_CLIENT_CONSUMED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlyclientConsumed_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlyRevenue = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlyRevenue ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_REVENUE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlyRevenue_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlyProductNotReturned = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlyProductNotReturned ');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_PRODUCT_NOT_RETURNED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlyProductNotReturned_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlyProductDeclined = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlyProductDeclined');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_PRODUCT_DECLINED,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlyProductDeclined_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMonthlyLoss = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/monthlyloss');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MONTHLY_LOSS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMonthlyLoss_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getClientCheckedOutSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/clientCheckedOutSummary');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CLINET_CHECK_OUT_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getClientCheckedOutSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getClientCheckedOutDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/clientCheckedOutDetails');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CLINET_CHECK_OUT_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getClientCheckedOutDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckedOutReturnSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/checkedOutReturnSummary');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECK_OUT_RETURN_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutReturnSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckedOutReturnDetails = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/checkedOutReturnDetails');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECK_OUT_RETURN_DETAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutReturnDetails_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getCheckedOutNotReturnSummary = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/report/checkedOutNotReturnSummary');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_CHECK_OUT_NOT_RETURN_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getCheckedOutNotReturnSummary_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
