import { INV_GET_PROD_SUB_CATEGORY_LIST, INV_GET_PRODUCT_SUB_CATEGORIES } from 'actions/common/types';

const initialState = {
  tableData: [],
  prodSubCategories: []
};

const prodSubCatetoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PROD_SUB_CATEGORY_LIST:
      return {
        ...state,
        tableData: payload
      };

    case INV_GET_PRODUCT_SUB_CATEGORIES:
      return {
        ...state,
        prodSubCategories: payload
      };
    default:
      return state;
  }
};

export default prodSubCatetoryReducer;
