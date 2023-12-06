import { GET_SPL_CATEGORY } from 'actions/common/types';

const initialState = {
  tableData: []
};

const splProdCategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SPL_CATEGORY:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default splProdCategoryReducer;
