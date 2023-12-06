import { GET_STATE_SALESTAX, EDIT_STATE_SALESTAX } from 'actions/common/types';

const initialState = {
  tableData: []
};

const stateSalesTaxReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STATE_SALESTAX:
      return {
        ...state,
        tableData: payload
      };
    case EDIT_STATE_SALESTAX:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    default:
      return state;
  }
};

export default stateSalesTaxReducer;
