import { GET_GIFTCARD, GET_GIFTCARD_EMAIL, GET_GIFTCARD_MAIL, GET_GIFTCARD_PRINT } from 'actions/common/types';

const initialState = {
  giftcard: [],
  giftcardEmail: [],
  giftcardMail: [],
  giftcardPrint: []
};

const giftcardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GIFTCARD:
      return {
        ...state,
        giftcard: payload
      };
    case GET_GIFTCARD_EMAIL:
      return {
        ...state,
        giftcardEmail: payload
      };
    case GET_GIFTCARD_MAIL:
      return {
        ...state,
        giftcardMail: payload
      };
    case GET_GIFTCARD_PRINT:
      return {
        ...state,
        giftcardPrint: payload
      };

    default:
      return state;
  }
};

export default giftcardReducer;
