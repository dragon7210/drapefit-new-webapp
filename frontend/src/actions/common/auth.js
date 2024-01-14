import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  VERIFY_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_EMAIL,
  USER_PROFILE
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const loadUser = (navigate) => async (dispatch) => {
  try {
    const res = await Api.get('/user/uinfo');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    if (navigate) {
      localStorage.setItem('fitFor', res.data?.fitFor);
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
  } catch (err) {
    DFnewLogger(err?.message);
    dispatch({ type: AUTH_ERROR });
  }
};

export const signup = async (values, navigate) => {
  try {
    const res = await Api.post('/user/signup', values);
    if (res.data === 'Please verify email sent to your account') {
      navigate('/verify');
      setAlert(res.data, 'success');
    } else if (res.data === 'Please login to your account') {
      navigate('/login');
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const verify = (formData, navigate) => async (dispatch) => {
  try {
    const res = await Api.post('/user/verify', formData);
    dispatch({
      type: VERIFY_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser(navigate));
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const login = (values, isRememberMe, navigate) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/user/login', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        isRememberMe
      });
      dispatch(loadUser(navigate));
      //-- Welcome message
      setAlert(`Welcome, ${res.data?.name}`, 'info');
    } else {
      setAlert('ACTION_login_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const loginAdmin = (values, isRememberMe, navigate) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/user/login/admin', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        isRememberMe
      });
      dispatch(loadUser(navigate));
      //-- Welcome message
      setAlert(`Welcome, ${res.data?.name}`, 'info');
    } else {
      setAlert('ACTION_loginAdmin_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const loginInventory = (values, isRememberMe, navigate) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/user/login/inventory', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        isRememberMe
      });
      dispatch(loadUser(navigate));
      //-- Welcome message
      setAlert(`Welcome, ${res.data?.name}`, 'info');
    } else {
      setAlert('ACTION_loginInventory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const loginSupplier = (values, isRememberMe, navigate) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/user/login/supplier', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
        isRememberMe
      });
      dispatch(loadUser(navigate));
      //-- Welcome message
      setAlert(`Welcome, ${res.data?.name}`, 'info');
    } else {
      setAlert('ACTION_loginSupplier_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const forgotPwd = async (formData, navigate) => {
  try {
    const res = await Api.post('/user/forgotpwd', formData);
    if (res.data === 'Message with reset token sent to that email') {
      navigate('/reset-pwd');
      setAlert(res.data, 'success');
    } else {
      navigate('/reset-pwd');
      setAlert('Reset token has been created', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const resetPwd = async (formData, navigate) => {
  try {
    const res = await Api.post('/user/resetpwd', formData);
    setAlert(res.data, 'success');
    navigate('/login');
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editLoginDetails = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/setting/logindetails/edit', data);
    if ((res.data = 'Login details have been updated')) {
      dispatch(loadUser());
      setAlert('Login details have been updated', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/user/logout');
    dispatch({ type: SET_LOADING });
    if (res.data === 'User logged out') {
      dispatch({ type: LOGOUT });
    } else {
      setAlert('ACTION_logout_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/user/profile', data);
    if (res.data) {
      dispatch(loadUser());
      setAlert('Success', 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getEmails = () => async (dispatch) => {
  try {
    const res = await Api.get('/user/getEmail');
    if (res.data) {
      dispatch({
        type: GET_EMAIL,
        payload: res.data
      });
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updatePassword = (data) => async () => {
  try {
    const res = await Api.post('/user/updatePassword', data);
    if (res.data) {
      setAlert(res.data.msg, res.data.type);
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getProfile = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/user/getProfile', data);
    if (res.data) {
      dispatch({
        type: USER_PROFILE,
        payload: res.data
      });
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
