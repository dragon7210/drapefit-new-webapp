import {
  GET_CHECKOUT_SUMMARY_REPORT,
  GET_FINALIZED_DETAIL_REPORT,
  GET_FINALIZED_SUMMARY_REPORT,
  GET_CHECKOUT_DETAIL_REPORT,
  GET_NOT_CHECKOUT_DETAIL_REPORT,
  GET_NOT_CHECKOUT_SUMMARY_REPORT,
  GET_DECLINE_DETAIL_REPORT,
  GET_NOT_RETURN_DETAIL_REPORT,
  GET_NOT_RTEX_DETAIL_REPORT,
  GET_RETURN_PROCESS_DETAIL_REPORT,
  GET_EXCHANGE_DETAIL_REPORT,
  GET_DECLINE_SUMMARY_REPORT,
  GET_NOT_RETURN_SUMMARY_REPORT,
  GET_NOT_RTEX_SUMMARY_REPORT,
  GET_RETURN_PROCESS_SUMMARY_REPORT,
  GET_EXCHANGE_SUMMARY_REPORT,
  GET_STYLING_FEE_REPORT,
  GET_CHANGE_AUTO_CHECKOUT
} from 'actions/common/types';

const initialState = {
  finalizedSummaryReport: [],
  finalizedDetailReport: [],
  checkoutSummaryReport: [],
  checkoutDetailReport: [],
  notCheckoutSummaryReport: [],
  notCheckoutDetailReport: [],
  exchangeDetailReport: [],
  returnProcessDetailReport: [],
  notRtExDetailReport: [],
  notReturnDetailReport: [],
  declineDetailReport: [],
  exchangeSummaryReport: [],
  returnProcessSummaryReport: [],
  notRtExSummaryReport: [],
  notReturnSummaryReport: [],
  declineSummaryReport: [],
  stylingFeeReport: [],
  changeAutoCheckout: []
};

const masterSummaryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FINALIZED_SUMMARY_REPORT:
      return {
        ...state,
        finalizedSummaryReport: payload
      };
    case GET_FINALIZED_DETAIL_REPORT:
      return {
        ...state,
        finalizedDetailReport: payload
      };
    case GET_CHECKOUT_SUMMARY_REPORT:
      return {
        ...state,
        checkoutSummaryReport: payload
      };
    case GET_CHECKOUT_DETAIL_REPORT:
      return {
        ...state,
        checkoutDetailReport: payload
      };
    case GET_NOT_CHECKOUT_SUMMARY_REPORT:
      return {
        ...state,
        notCheckoutSummaryReport: payload
      };
    case GET_NOT_CHECKOUT_DETAIL_REPORT:
      return {
        ...state,
        notCheckoutDetailReport: payload
      };
    case GET_DECLINE_DETAIL_REPORT:
      return {
        ...state,
        declineDetailReport: payload
      };
    case GET_NOT_RETURN_DETAIL_REPORT:
      return {
        ...state,
        notReturnDetailReport: payload
      };
    case GET_NOT_RTEX_DETAIL_REPORT:
      return {
        ...state,
        notRtExDetailReport: payload
      };
    case GET_RETURN_PROCESS_DETAIL_REPORT:
      return {
        ...state,
        returnProcessDetailReport: payload
      };
    case GET_EXCHANGE_DETAIL_REPORT:
      return {
        ...state,
        exchangeDetailReport: payload
      };
    case GET_DECLINE_SUMMARY_REPORT:
      return {
        ...state,
        declineSummaryReport: payload
      };
    case GET_NOT_RETURN_SUMMARY_REPORT:
      return {
        ...state,
        notReturnSummaryReport: payload
      };
    case GET_NOT_RTEX_SUMMARY_REPORT:
      return {
        ...state,
        notRtExSummaryReport: payload
      };
    case GET_RETURN_PROCESS_SUMMARY_REPORT:
      return {
        ...state,
        returnProcessSummaryReport: payload
      };
    case GET_EXCHANGE_SUMMARY_REPORT:
      return {
        ...state,
        exchangeSummaryReport: payload
      };
    case GET_STYLING_FEE_REPORT:
      return {
        ...state,
        stylingFeeReport: payload
      };
    case GET_CHANGE_AUTO_CHECKOUT:
      return {
        ...state,
        changeAutoCheckout: payload
      };
    default:
      return state;
  }
};

export default masterSummaryReducer;
