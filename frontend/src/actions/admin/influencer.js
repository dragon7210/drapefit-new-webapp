import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_INFLUENCER, EDIT_INFLUENCER } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getInfluencer = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/influencer/tbllist');
    if (res.data) {
      dispatch({
        type: GET_INFLUENCER,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInfluencer_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addInfluencer = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/influencer/create', values);
    if (res.data.includes('Influencer has been created')) {
      setAlert(res.data, 'success');
      dispatch(getInfluencer());
    } else {
      setAlert('ACTION_addInfluencer_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editInfluencer = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/influencer/edit', values);
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
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_editInfluencer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
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
    } else {
      setAlert('ACTION_deleteInfluencer_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
