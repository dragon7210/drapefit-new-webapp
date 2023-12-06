import {
  INV_GET_PRODUCT_LIST,
  GET_INV_PROFILE,
  GET_INV_VALUESET,
  GET_INV_EMAILTPL,
  EDIT_INV_EMAILTPL,
  GET_IND_PRODUCT,
  INV_GET_MANUAL_PRODUCT,
  INV_GET_SUMMARY_PRODUCT,
  INV_GET_REPORT_PRODUCT
} from 'actions/common/types';

const initialState = {
  tableData: [],
  prodColors: [],
  prodBrands: [],
  profile: {},
  valueSet: {},
  indProduct: {},
  manualProduct: [],
  reportProduct: [],
  summaryProduct: []
};

const invProductListReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INV_GET_PRODUCT_LIST:
      return {
        ...state,
        tableData: payload
      };
    case GET_IND_PRODUCT:
      return {
        ...state,
        indProduct: payload
      };

    case GET_INV_PROFILE:
      return {
        ...state,
        profile: payload
      };
    case GET_INV_VALUESET:
      return {
        ...state,
        valueSet: payload
      };
    case GET_INV_EMAILTPL:
      return {
        ...state,
        tableData: payload.data
      };
    case EDIT_INV_EMAILTPL:
      return {
        ...state,
        tableData: state.tableData.map((data) => (data.id === payload.id ? payload : data))
      };
    case INV_GET_MANUAL_PRODUCT:
      return {
        ...state,
        manualProduct: payload
      };
    case INV_GET_REPORT_PRODUCT:
      return {
        ...state,
        reportProduct: payload
      };
    case INV_GET_SUMMARY_PRODUCT:
      return {
        ...state,
        summaryProduct: payload
      };
    default:
      return state;
  }
};

export default invProductListReducer;
