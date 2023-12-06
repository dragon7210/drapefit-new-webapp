import { GET_PROMOCODE } from 'actions/common/types';

const initialState = {
  tableData: []
};

const promocodeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROMOCODE:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default promocodeReducer;
