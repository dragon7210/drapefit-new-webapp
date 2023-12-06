import { GET_SUPPLIER_VENDOR } from 'actions/common/types';

const initialState = {
  tableData: []
};

const vendorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUPPLIER_VENDOR:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default vendorReducer;
