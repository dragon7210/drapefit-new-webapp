import { setAlert } from 'actions/common/alert';
import { loadUser } from 'actions/common/auth';
import { GET_PAYMENT_METHODS, SET_LOADING } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const attachPaymentMethod = async (formData, navigate) => {
  try {
    DFnewLogger(formData);
    const res = await Api.post('/payment/stripe/paymethod/attach', formData);
    if (res.data === 'Payment method attached successfully') {
      navigate('/welcome/payment');
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const createCustomerSecretMethod = async () => {
  try {
    const res = await Api.post('/payment/stripe/customer/create');
    return res.data;
  } catch (error) {
    DFnewLogger(error?.message);
    ErrorHandler(error);
  }
};

export const getPaymentMethods = () => async (dispatch) => {
  try {
    const res = await Api.get('/payment/stripe/paymethods/list');
    DFnewLogger(res);
    dispatch({
      type: GET_PAYMENT_METHODS,
      payload: res?.data?.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const createPayIntentOfStyleFee = (data, navigate) => async (dispatch) => {
  try {
    DFnewLogger(new Date());
    DFnewLogger(data);
    const res = await Api.post('/payment/stripe/payintent/stylingfee/create', data);
    if (res.data.status === 'requires_confirmation') {
      dispatch(confirmPayIntent({ paymentMethod: data.paymentMethod, paymentIntent: res.data.id }, navigate));
    } else {
      setAlert('ACTION_createPayIntentOfStyleFee_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const confirmPayIntent = (data, navigate) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/payment/stripe/payintent/confirm', data);
    DFnewLogger(res);
    if (res.data.status === 'succeeded') {
      dispatch({ type: SET_LOADING });
      navigate('/payment-success');
      const fitFor = localStorage.getItem('fitFor');
      const order = localStorage.getItem('order');
      if (fitFor === '0') {
        dispatch(addWomenBillingInfo(data));
      } else if (fitFor === '1') {
        dispatch(addMenBillingInfo(data));
      } else if (fitFor === '3') {
        dispatch(addGirlBillingInfo(data, order));
      } else if (fitFor === '4') {
        dispatch(addBoyBillingInfo(data, order));
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addMenBillingInfo = (data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/fitprofile/billinginfo/men/add', data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('ACTION_addMenBillingInfo_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addWomenBillingInfo = (data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post('/fitprofile/billinginfo/women/add', data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('ACTION_addWomenBillingInfo_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addGirlBillingInfo = (data, order) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post(`/kidsprofile/billinginfo/girl/${order}/add`, data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('ACTION_addGirlBillingInfo_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addBoyBillingInfo = (data, order) => async (dispatch) => {
  try {
    DFnewLogger(data);
    const res = await Api.post(`/kidsprofile/billinginfo/boy/${order}/add`, data);
    if (res) {
      setAlert('Thank You For Choosing Drape Fit', 'success');
      dispatch(loadUser());
    } else {
      setAlert('ACTION_addBoyBillingInfo_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
