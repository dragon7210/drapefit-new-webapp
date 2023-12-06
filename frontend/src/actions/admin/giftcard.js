import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  GET_GIFTCARD,
  GET_GIFTCARD_EMAIL,
  GET_GIFTCARD_PRINT,
  GET_GIFTCARD_MAIL
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getGiftcard = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/giftcard/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_GIFTCARD,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getGiftcard_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateGiftcard = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/giftcard/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getGiftcard());
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addGiftcard = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/giftcard/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      dispatch(getGiftcard());
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delGiftcard = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/giftcard/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      if (data.type === 'admin') {
        dispatch(getGiftcard());
      } else if (data.type === 'email') {
        dispatch(getGiftcardEmail());
      } else if (data.type === 'mail') {
        dispatch(getGiftcardMail());
      } else {
        dispatch(getGiftcardPrint());
      }
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const activeGiftcard = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/giftcard/active', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      setAlert('Success', 'success');
      if (data.type === 'admin') {
        dispatch(getGiftcard());
      } else if (data.type === 'mail') {
        dispatch(getGiftcardMail());
      } else {
        dispatch(getGiftcardPrint());
      }
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getGiftcardEmail = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/giftcard/giftcardemail');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_GIFTCARD_EMAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getGiftcardEmail_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
export const getGiftcardMail = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/giftcard/giftcardmail');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_GIFTCARD_MAIL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getGiftcardMail_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
export const getGiftcardPrint = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/giftcard/giftcardprint');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_GIFTCARD_PRINT,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getGiftcardPrint_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
