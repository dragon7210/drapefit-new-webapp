import { GET_INITIAL } from 'actions/common/types';

const initialState = {
  emp_initial: {}
};

const initialReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INITIAL:
      return {
        ...state,
        emp_initial: payload
      };
    default:
      return state;
  }
};

export default initialReducer;
