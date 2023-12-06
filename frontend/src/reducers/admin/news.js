import { GET_NEWS } from 'actions/common/types';

const initialState = {
  tableData: []
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NEWS:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default newsReducer;
