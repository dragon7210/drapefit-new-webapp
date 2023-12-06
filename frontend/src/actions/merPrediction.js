import { setAlert } from 'actions/common/alert';
import { GET_MER_PREDICTION } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getPrediction = () => async (dispatch) => {
  try {
    const res = await Api.get('/adminMerchandise/manage/prediction/getPrediction');
    if (res.data) {
      dispatch({
        type: GET_MER_PREDICTION,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBrands_ERROR', 'error');
    }
    ``;
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
