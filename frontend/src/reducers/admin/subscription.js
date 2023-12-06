import { GET_SUBSCRIPTION } from 'actions/common/types';

const initialState = {
  tableData: []
};

const subscriptionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUBSCRIPTION:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default subscriptionReducer;
