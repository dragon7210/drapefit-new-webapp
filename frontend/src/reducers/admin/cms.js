import { GET_CMS } from 'actions/common/types';

const initialState = {
  tableData: []
};

const cmsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CMS:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default cmsReducer;
