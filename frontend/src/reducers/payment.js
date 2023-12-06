import { GET_PAYMENT_METHODS } from 'actions/common/types';

const initialState = {
  loading: true,
  payMethods: []
};

const paymentReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PAYMENT_METHODS:
      return {
        ...state,
        payMethods: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default paymentReducer;
