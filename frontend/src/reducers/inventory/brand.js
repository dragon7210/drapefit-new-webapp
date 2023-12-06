import { INV_EDIT_BRAND, INV_GET_BRAND, INV_TOGGLE_BRAND, INV_GET_COUNT } from 'actions/common/types';

const initialState = {
  tableData: [],
  count: null
};

const brandReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_COUNT:
      return {
        ...state,
        count: payload
      };
    case INV_GET_BRAND:
      return {
        ...state,
        tableData: payload.data
      };
    case INV_EDIT_BRAND:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    case INV_TOGGLE_BRAND:
      for (let data of state.tableData) {
        if (data.id === payload.id) {
          data.is_active = data.is_active === 0 ? 1 : 0;
        }
      }
      return { ...state };
    default:
      return state;
  }
};

export default brandReducer;
