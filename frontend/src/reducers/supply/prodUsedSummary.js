import { GET_SPL_PROD_USED_SUMMARY } from 'actions/common/types';

const initialState = {
  tableData: []
};

const splProdUsedSummaryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SPL_PROD_USED_SUMMARY:
      return {
        ...state,
        tableData: payload.data
      };
    default:
      return state;
  }
};

export default splProdUsedSummaryReducer;
