import { GET_INFLUENCER, EDIT_INFLUENCER } from 'actions/common/types';

const initialState = {
  tableData: []
};

const influencerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INFLUENCER:
      return {
        ...state,
        tableData: payload
      };
    case EDIT_INFLUENCER:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    default:
      return state;
  }
};

export default influencerReducer;
