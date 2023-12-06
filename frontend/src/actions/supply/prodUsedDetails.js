import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SPL_PROD_USED_DETAILS } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSplProdUsedDetails = (isSubmit, data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    const res = await Api.post('/admsupplier/manage/splproduct/deduct/details/tbllist', data);
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    if (res.data) {
      dispatch({
        type: GET_SPL_PROD_USED_DETAILS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSplProdUsedDetails_ERROR', 'error');
    }
  } catch (err) {
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
