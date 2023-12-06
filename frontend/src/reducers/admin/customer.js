import {
  GET_CUSTOMER,
  GET_PAID_LIST,
  GET_PAYMENT_REFUND,
  GET_PAYMENT_REFUND_INFO,
  GET_PAYMENT_REFUND_LIST,
  GET_NOT_PAID_LIST,
  GET_PREVIEW_WORK_LIST,
  GET_JUNK_LIST,
  GET_BLOCK_LIST,
  GET_MATCHING_LIST,
  GET_BROSWER_LIST
} from 'actions/common/types';

const initialState = {
  tableData: [],
  paymentRefund: [],
  paymentRefundList: [],
  paymentRefundInfo: [],
  paidList: [],
  notPaidList: [],
  previewWorkList: [],
  junkList: [],
  blockList: [],
  matchingData: [],
  condition: [],
  browserList: []
};

const customerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        tableData: payload
      };
    case GET_PAYMENT_REFUND:
      return {
        ...state,
        paymentRefund: payload
      };
    case GET_PAYMENT_REFUND_INFO:
      return {
        ...state,
        paymentRefundInfo: payload
      };
    case GET_PAYMENT_REFUND_LIST:
      return {
        ...state,
        paymentRefundList: payload
      };
    case GET_PAID_LIST:
      return {
        ...state,
        paidList: payload
      };
    case GET_NOT_PAID_LIST:
      return {
        ...state,
        notPaidList: payload
      };
    case GET_PREVIEW_WORK_LIST:
      return {
        ...state,
        previewWorkList: payload
      };
    case GET_JUNK_LIST:
      return {
        ...state,
        junkList: payload
      };
    case GET_BLOCK_LIST:
      return {
        ...state,
        blockList: payload
      };
    case GET_MATCHING_LIST:
      return {
        ...state,
        matchingData: payload.matchingData,
        condition: payload.condition
      };
    case GET_BROSWER_LIST:
      return {
        ...state,
        browserList: payload
      };
    default:
      return state;
  }
};

export default customerReducer;
