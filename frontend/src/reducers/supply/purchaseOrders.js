import { GET_PURCHASE_ORDERS } from 'actions/common/types';

const initialState = {
  tableData: []
};

const splPurchaseOrdersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PURCHASE_ORDERS:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default splPurchaseOrdersReducer;
