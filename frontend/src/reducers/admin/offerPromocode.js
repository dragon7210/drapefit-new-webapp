import { GET_OFFER_PROMOCODE } from 'actions/common/types';

const initialState = {
  tableData: []
};

const offerPromocodeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_OFFER_PROMOCODE:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default offerPromocodeReducer;
