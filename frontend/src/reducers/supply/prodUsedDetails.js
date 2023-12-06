import { GET_SPL_PROD_USED_DETAILS } from 'actions/common/types';

const initialState = {
  tableData: []
};

const splProdUsedDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SPL_PROD_USED_DETAILS:
      return {
        ...state,
        tableData: payload.data
      };
    default:
      return state;
  }
};

export default splProdUsedDetailsReducer;
