import { GET_CUSTOM_PAID, GET_PREVIOUS_WORK } from 'actions/common/types';

const initialState = {
  previewWorkList: [],
  customPaidList: []
};

const masterSupportReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOM_PAID:
      return {
        ...state,
        customPaidList: payload
      };
    case GET_PREVIOUS_WORK:
      return {
        ...state,
        previewWorkList: payload
      };

    default:
      return state;
  }
};

export default masterSupportReducer;
