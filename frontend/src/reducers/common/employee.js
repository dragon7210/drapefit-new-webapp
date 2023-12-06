import {
  EDIT_EMPLOYEE,
  GET_EMPLOYEE,
  TOGGLE_EMPLOYEE_ACTIVE,
  GET_SUPPLIER_EMPLOYEE,
  GET_MER_EMPLOYEE
} from 'actions/common/types';

const initialState = {
  tableData: []
};

const employeeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        tableData: payload.data
      };
    case GET_SUPPLIER_EMPLOYEE:
      return {
        ...state,
        tableData: payload
      };
    case GET_MER_EMPLOYEE:
      return {
        ...state,
        tableData: payload
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    case TOGGLE_EMPLOYEE_ACTIVE:
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

export default employeeReducer;
