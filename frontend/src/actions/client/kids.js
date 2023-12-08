import { setAlert } from 'actions/common/alert';
import { loadUser } from 'actions/common/auth';
import {
  GET_KIDS_BASIC_INFO,
  GET_KIDS_STYLE_FIT,
  GET_KIDS_PRICE_RANGE,
  GET_KIDS_STYLE_CUSTOM
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const addNewKid = (order, navigate) => async (dispatch) => {
  try {
    const res = await Api.post(`/user/kids/add/${order}`);
    setAlert(`YOUR ${res.data} CHILD has been added`, 'success');
    dispatch(loadUser());
    localStorage.setItem('order', order);
    navigate(`/welcome/basic-info/kids`);
  } catch (err) {
    DFnewLogger(err?.message);
    CatchError(err);
  }
};

export const kEditBasicInfo = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/basicinfo/edit`, formData);
    console.log(formData.kids_clothing_gender);
    if (res.data === 'Basic Info of Kid Fit Profile has been saved') {
      if (navigate) {
        navigate(`/welcome/style-fit/kids/${formData.kids_clothing_gender === `Boy's Product` ? 'boys' : 'girls'}`);
      }
      setAlert('Basic Info is successfully saved', 'success');
      dispatch(loadUser());
    }
  } catch (err) {
    DFnewLogger(err?.message);
    CatchError(err);
  }
};

export const kGetBasicInfo = (data) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/basicinfo`, data);
    dispatch({
      type: GET_KIDS_BASIC_INFO,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kEditStyleFit = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/stylefit/edit`, formData);
    if (res.data === 'Style Fit of Kid Fit Profile has been saved') {
      if (navigate) {
        let fitFor = localStorage.getItem('fitFor');
        if (Number(fitFor) === 3) {
          navigate('/welcome/price-range/kids/boys');
        } else {
          navigate('/welcome/price-range/kids/girls');
        }
      }
      setAlert('Style Fit is successfully saved', 'success');
      dispatch(loadUser());
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kGetStyleFit = (data) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/stylefit`, data);
    dispatch({
      type: GET_KIDS_STYLE_FIT,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kEditPriceRange = (formData, kid_count, navigate) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/pricerange/kid/edit`, { ...formData, kid_count });
    if (res.data === 'Price Range of Kid Fit Profile has been saved') {
      if (navigate) {
        navigate('/welcome/style-custom/kids/boys');
      }
      setAlert('Price Range is successfully saved', 'success');
      dispatch(loadUser());
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kGetPriceRange = (data) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/pricerange/kid`, data);
    dispatch({
      type: GET_KIDS_PRICE_RANGE,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kGetStyleCustom = (data) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/customdsgnbrand/kid`, data);
    dispatch({
      type: GET_KIDS_STYLE_CUSTOM,
      payload: res.data
    });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const kEditStyleCustom = (formData, kid_count, navigate) => async (dispatch) => {
  try {
    const res = await Api.post(`/kidsprofile/customdsgnbrand/kid/edit`, { ...formData, kid_count });
    if (res.data === 'Custom Design & Brands of Kid Fit Profile has been saved') {
      if (navigate) {
        navigate('/welcome/schedule');
      }
      setAlert('Custom Design & Brands is saved', 'success');
      dispatch(loadUser());
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
