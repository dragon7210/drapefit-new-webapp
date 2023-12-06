import { INV_GET_COLOR, INV_EDIT_COLOR } from 'actions/common/types';

const initialState = {
  tableData: []
};

const colorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_COLOR:
      return {
        ...state,
        tableData: payload
      };
    case INV_EDIT_COLOR:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    default:
      return state;
  }
};

export default colorReducer;
