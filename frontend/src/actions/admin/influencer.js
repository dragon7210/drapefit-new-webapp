import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_INFLUENCER, EDIT_INFLUENCER } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getInfluencer = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/influencer/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_INFLUENCER,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInfluencer_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addInfluencer = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/influencer/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Influencer has been created')) {
      setAlert(res.data, 'success');
      dispatch(getInfluencer());
      return Promise.resolve();
    } else {
      setAlert('ACTION_addInfluencer_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const editInfluencer = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/influencer/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      if (res.data?.msg === 'Removed mismatching influencer') {
        setAlert('Mismatching influencer info has been removed', 'error');
        dispatch(getInfluencer(data));
      } else {
        setAlert('Influencer info has been updated', 'success');
        dispatch({
          type: EDIT_INFLUENCER,
          payload: res.data
        });
      }
      return Promise.resolve();
    } else {
      setAlert('ACTION_editInfluencer_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};

export const deleteInfluencer = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/influencer/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Influencer info has been removed')) {
      setAlert('Influencer info has been removed', 'success');
      dispatch(getInfluencer(data));
      return Promise.resolve();
    } else {
      setAlert('ACTION_deleteInfluencer_ERROR', 'error');
      return Promise.reject();
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
    return Promise.reject();
  }
};
