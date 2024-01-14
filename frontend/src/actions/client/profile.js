import { setAlert } from 'actions/common/alert';
import { loadUser } from 'actions/common/auth';
import {
  GET_MEN_BASIC_INFO,
  GET_MEN_PRICE_RANGE,
  GET_MEN_STYLE_FIT,
  GET_MEN_STYLE_CUSTOM,
  GET_WOMEN_BASIC_INFO,
  GET_WOMEN_STYLE_FIT,
  GET_WOMEN_PRICE_RANGE,
  GET_WOMEN_STYLE_CUSTOM,
  GET_SCHEDULE,
  GET_ALL_ADDRESS,
  GET_CLIENT_PRODUCTS
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

//========================= Select FIT =========================//
export const selectFit = (values, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/user/selectfit', values);
    if (res.data === 'men' || res.data === 'women') {
      setAlert('Your FIT is selected', 'success');
      dispatch(loadUser());
      let fitFor = res.data === 'women' ? 2 : 1;
      localStorage.setItem('fitFor', fitFor);
      navigate(`/welcome/basic-info/${res.data}`);
    } else {
      setAlert('Please select again', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

//============================= Men =============================//
export const mEditBasicInfo = (formData, navigate) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await Api.post('/fitprofile/basicinfo/men/edit', formData);
    if (res.data === 'Basic Info of Men Fit Profile has been saved') {
      if (navigate) {
        navigate('/welcome/style-fit/men');
      }
      dispatch(loadUser());
      setAlert('Basic Info is successfully saved', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mGetBasicInfo = () => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/basicinfo/men');
    dispatch({
      type: GET_MEN_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mEditStyleFit = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/stylefit/men/edit', formData);
    if (res.data === 'Style Fit of Men Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Style Fit is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/price-range/men');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mGetStyleFit = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/stylefit/men', data);
    dispatch({
      type: GET_MEN_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mEditPriceRange = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/pricerange/men/edit', formData);
    if (res.data === 'Price Range of Men Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Price Range is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/style-custom/men');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mGetPriceRange = () => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/pricerange/men');
    dispatch({
      type: GET_MEN_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mEditStyleCustom = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/customdsgnbrand/men/edit', formData);
    if (res.data) {
      dispatch(loadUser());
      setAlert('Custom Style is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/schedule');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const mGetStyleCustom = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/customdsgnbrand/men', data);
    dispatch({
      type: GET_MEN_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

//============================= Women =============================//
export const wEditBasicInfo = (formData, navigate) => async (dispatch) => {
  try {
    console.log('editBasicInfo');
    const res = await Api.post('/fitprofile/basicinfo/women/edit', formData);
    if (res.data === 'Basic Info of Women Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Basic Info is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/style-fit/women');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wGetBasicInfo = () => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/basicinfo/women');
    dispatch({
      type: GET_WOMEN_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wEditStyleFit = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/stylefit/women/edit', formData);
    if (res.data === 'Style Fit of Women Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Style Fit is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/price-range/women');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wGetStyleFit = () => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/stylefit/women');
    dispatch({
      type: GET_WOMEN_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wEditPriceRange = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/pricerange/women/edit', formData);
    if (res.data === 'Price Range of Women Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Price Range is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/style-custom/women');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wGetPriceRange = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/pricerange/women', data);
    dispatch({
      type: GET_WOMEN_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wEditStyleCustom = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/customdsgnbrand/women/edit', formData);
    if (res.data === 'Custom Design & Brands of Women Fit Profile has been saved') {
      dispatch(loadUser());
      setAlert('Custom Style is successfully saved', 'success');
      if (navigate) {
        navigate('/welcome/schedule');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const wGetStyleCustom = () => async (dispatch) => {
  try {
    const res = await Api.post('/fitprofile/customdsgnbrand/women');
    dispatch({
      type: GET_WOMEN_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSchedule = (data, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/setting/schedule/edit', data);
    if (res) {
      if (navigate) {
        navigate('/welcome/reservation');
      } else {
        dispatch(getSchedule());
        setAlert('Schedule is successfully saved', 'success');
      }
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getSchedule = () => async (dispatch) => {
  try {
    const res = await Api.get('/setting/schedule');
    dispatch({
      type: GET_SCHEDULE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addAddress = (data) => async (dispatch) => {
  try {
    let res = await Api.post('/setting/shipaddress/add', data);
    if (res) {
      dispatch(getAllAddress(data));
      setAlert('Success', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getAllAddress = () => async (dispatch) => {
  try {
    const res = await Api.get('/setting/shipaddress/all');
    if (res) {
      dispatch({
        type: GET_ALL_ADDRESS,
        payload: res.data
      });
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteAddress = (data) => async (dispatch) => {
  try {
    const res = await Api.post(`/setting/shipaddress/delete`, data);
    if (res.data) {
      dispatch(getAllAddress());
      setAlert('Success', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editAddress = (data) => async (dispatch) => {
  try {
    let res = await Api.post(`/setting/shipaddress/edit`, data);
    if (res) {
      dispatch(getAllAddress(data));
    }
    setAlert('Success', 'success');
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deliverAddress = (data) => async (dispatch) => {
  try {
    let res = await Api.post(`/setting/shipaddress/deliver`, data);
    if (res) {
      dispatch(getAllAddress(data));
    }
    setAlert('Success', 'success');
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const defaultAddress = (data) => async (dispatch) => {
  try {
    let res = await Api.post(`/setting/shipaddress/default`, data);
    if (res) {
      dispatch(getAllAddress(data));
    }
    setAlert('Success', 'success');
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getUserProducts = () => async (dispatch) => {
  try {
    let res = await Api.get('/user/getProducts');
    return dispatch({
      type: GET_CLIENT_PRODUCTS,
      payload: res.data
    });
  } catch (e) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const reportOrderReview = (products, productStatus, navigate) => async (dispatch) => {
  try {
    await Api.post('/user/orderReview', { products, productStatus });
    navigate('/customer-order-review');
    return dispatch(getUserProducts());
  } catch (error) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getTaxRate = async (zipcode) => {
  try {
    const res = await Api.get('/user/tax', { params: { zipcode } });
    return res.data.tax;
  } catch (error) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
