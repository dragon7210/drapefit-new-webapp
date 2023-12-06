import { GET_CAREER } from 'actions/common/types';

const initialState = {
  tableData: []
};

const careerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CAREER:
      return {
        ...state,
        tableData: payload
      };

    default:
      return state;
  }
};

export default careerReducer;
