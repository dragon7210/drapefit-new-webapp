import { GET_MER_PREDICTION } from 'actions/common/types';

const initialState = {
  tableData: []
};

const predictionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MER_PREDICTION:
      return {
        ...state,
        tableData: payload
      };
    default:
      return state;
  }
};

export default predictionReducer;
