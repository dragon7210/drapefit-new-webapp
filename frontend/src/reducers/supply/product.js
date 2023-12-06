import { GET_SPL_PROD_CATEGORY, GET_SPL_PRODUCTS, GET_SPL_PROFILE } from 'actions/common/types';

const initialState = {
  tableData: [],
  prodCategories: [],
  profile: {}
};

const splProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SPL_PROD_CATEGORY:
      return {
        ...state,
        prodCategories: payload
      };
    case GET_SPL_PRODUCTS:
      return {
        ...state,
        tableData: payload
      };

    case GET_SPL_PROFILE:
      return {
        ...state,
        profile: payload
      };
    default:
      return state;
  }
};

export default splProductReducer;
