import { INV_EDIT_PRODUCT_CATEGORY, INV_GET_PRODUCT_CATEGORIES } from 'actions/common/types';

const initialState = {
  tableData: [],
  prodCategories: []
};

const productCategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_EDIT_PRODUCT_CATEGORY:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    case INV_GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        prodCategories: payload
      };
    default:
      return state;
  }
};

export default productCategoryReducer;
