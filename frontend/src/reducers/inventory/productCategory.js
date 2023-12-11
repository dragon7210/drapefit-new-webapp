import { INV_EDIT_PRODUCT_CATEGORY, INV_GET_PRODUCT_CATEGORIES } from 'actions/common/types';

const initialState = {
  prodCategories: []
};

const productCategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_EDIT_PRODUCT_CATEGORY:
      return {
        ...state,
        prodCategories: state.prodCategories.map((item) => (item.id === payload.id ? payload : item))
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
