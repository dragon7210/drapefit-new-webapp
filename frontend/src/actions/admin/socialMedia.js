import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SOCIAL_MEDIA } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSocialMedia = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/socialMedia/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_SOCIAL_MEDIA,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSocialMedia_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addSocialMedia = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/socialMedia/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getSocialMedia());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addSocialMedia_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delSocialMedia = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/socialMedia/delete', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getSocialMedia());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delSocialMedia_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const activeSocialMedia = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/socialMedia/active', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getSocialMedia());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_activeSocialMedia_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSocialMedia = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/socialMedia/edit', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getSocialMedia());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_editSocialMedia_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
