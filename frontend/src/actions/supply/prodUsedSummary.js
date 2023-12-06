import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_SPL_PROD_USED_SUMMARY } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getSplProdUsedSummary = (isSubmit, data) => async (dispatch) => {
  try {
    DFnewLogger(data);
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    const res = await Api.post('/admsupplier/manage/splproduct/deduct/summary/tbllist', data);
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    if (res.data) {
      dispatch({
        type: GET_SPL_PROD_USED_SUMMARY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSplProdUsedSummary_ERROR', 'error');
    }
  } catch (err) {
    if (isSubmit) {
      dispatch({ type: SET_LOADING });
    }
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
