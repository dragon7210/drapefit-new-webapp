import { GET_MER_BRAND } from 'actions/common/types';

const initialState = {
  tableData: [],
  rowCount: 0
};

const brandReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MER_BRAND:
      return {
        ...state,
        tableData: payload,
        rowCount: payload.length
      };
    default:
      return state;
  }
};

export default brandReducer;
