import { GET_INITIAL, SET_LOADING } from 'actions/common/types';
import Api from 'utils/Api';
import DFnewLogger from 'utils/DFnewLogger';
import { ErrorHandler } from 'utils/ErrorHandler';

export const getInitial = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/initial/tbllist');
    if (res.data) {
      dispatch({
        type: GET_INITIAL,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getInitial_ERROR', 'error');
    }
    dispatch({ type: SET_LOADING });
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
