import { GET_DECLINE_PRODUCT, GET_SCAN_PRODUCT, GET_EXCHANGE_PRODUCT, GET_DEFAULT_PRODUCT } from 'actions/common/types';

const initialState = { declineProduct: [], scanProduct: [], exchangeProduct: [], defaultCustomerProduct: [] };

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DECLINE_PRODUCT:
      return {
        ...state,
        declineProduct: payload
      };
    case GET_SCAN_PRODUCT:
      return {
        ...state,
        scanProduct: payload
      };
    case GET_EXCHANGE_PRODUCT:
      return {
        ...state,
        exchangeProduct: payload
      };

    case GET_DEFAULT_PRODUCT:
      return {
        ...state,
        defaultCustomerProduct: payload
      };
    default:
      return state;
  }
};

export default productReducer;
