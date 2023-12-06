import { GET_SOCIAL_MEDIA } from 'actions/common/types';

const initialState = {
  tableData: []
};

const socialMediaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SOCIAL_MEDIA:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default socialMediaReducer;
