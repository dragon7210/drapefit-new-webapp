import {
  GET_AUTO_LIST,
  GET_STATE_LIST,
  GET_STYLE_LIST,
  GET_BATCH_PROCESS_REPORT_LIST,
  GET_BATCH_PROCESS_SUBSCRIPTIOM_LIST,
  GET_CLIENT_BIRTHDAY_LIST,
  GET_NOT_CHECKED_OUT_CUSTOMER,
  GET_RETURN_NOT_PROCESSED,
  GET_CHECKED_OUT_PRODUCT_DETAIL,
  GET_PRODUCT_ASSIGNED_BUT_NOT_FINALIZED,
  GET_LIST_PRODUCT_NOT_RETURNED,
  GET_MONTHLY_SALE,
  GET_TOTAL_PRODUCTS_IN,
  GET_CHECKED_OUT_NOT_RETURN_DETAIL,
  GET_PRODUCT_FINALIZE_SUMMARY,
  GET_PRODUCT_FINALIZE_DETAIL,
  GET_PRODUCT_DECLINED_SUMMARY,
  GET_PRODUCT_DECLINE_DETAIL,
  GET_NOT_CHECKOUT_SUMMARY,
  GET_NOT_CHECKOUT_DETAIL,
  GET_MONTHLY_CLIENT_CONSUMED,
  GET_MONTHLY_PRODUCT_NOT_RETURNED,
  GET_MONTHLY_PRODUCT_DECLINED,
  GET_MONTHLY_LOSS,
  GET_CLINET_CHECK_OUT_SUMMARY,
  GET_CLINET_CHECK_OUT_DETAIL,
  GET_CHECK_OUT_RETURN_SUMMARY,
  GET_CHECK_OUT_RETURN_DETAIL,
  GET_CHECK_OUT_NOT_RETURN_SUMMARY,
  GET_MONTHLY_REVENUE
} from 'actions/common/types';

const initialState = {
  autoList: [],
  styleList: [],
  stateList: [],
  subscriptionList: [],
  batchProcessReportList: [],
  batchProcessSubscriptionList: [],
  clientBirthdayList: [],
  notCheckedOutCustomerList: [],
  returnNotProcessedList: [],
  checkedOutProductDetailList: [],
  productAssingendButNotFinalized: [],
  listOfProductNotReturnedList: [],
  monthlySaleList: [],
  monthlyclientConsumedList: [],
  totalProductsInInventoryList: [],
  totalProductsInInventoryList: [],
  monthlyProductNotReturnedList: [],
  monthlyProductDeclinedList: [],
  monthlyLossList: [],
  monthlyRevenueList: [],
  productFinalizeSummaryList: [],
  productFinalizeDetailsList: [],
  clientCheckedOutSummaryList: [],
  clientCheckedOutDetailsList: [],
  notCheckedOutSummaryList: [],
  checkedOutNotReturnSummaryList: [],
  checkedOutNotReturnDetailsList: [],
  checkOutReturnSummaryList: [],
  productDeclineDetailList: [],
  notCheckoutDetailList: [],
  checkOutReturnDetailList: [],
  productDeclineSummaryList: []
};

const reportReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_AUTO_LIST:
      return {
        ...state,
        autoList: payload
      };
    case GET_STYLE_LIST:
      return {
        ...state,
        styleList: payload
      };
    case GET_STATE_LIST:
      return {
        ...state,
        stateList: payload
      };
    case GET_BATCH_PROCESS_REPORT_LIST:
      return {
        ...state,
        batchProcessReportList: payload
      };
    case GET_BATCH_PROCESS_SUBSCRIPTIOM_LIST:
      return {
        ...state,
        batchProcessSubscriptionList: payload
      };
    case GET_CLIENT_BIRTHDAY_LIST:
      return {
        ...state,
        clientBirthdayList: payload
      };
    case GET_NOT_CHECKED_OUT_CUSTOMER:
      return {
        ...state,
        notCheckedOutCustomerList: payload
      };
    case GET_RETURN_NOT_PROCESSED:
      return {
        ...state,
        returnNotProcessedList: payload
      };
    case GET_CHECKED_OUT_PRODUCT_DETAIL:
      return {
        ...state,
        checkedOutProductDetailList: payload
      };
    case GET_PRODUCT_ASSIGNED_BUT_NOT_FINALIZED:
      return {
        ...state,
        productAssingendButNotFinalized: payload
      };
    case GET_LIST_PRODUCT_NOT_RETURNED:
      return {
        ...state,
        listOfProductNotReturnedList: payload
      };
    case GET_MONTHLY_SALE:
      return {
        ...state,
        monthlySaleList: payload
      };
    case GET_TOTAL_PRODUCTS_IN:
      return {
        ...state,
        totalProductsInInventoryList: payload
      };
    case GET_CHECKED_OUT_NOT_RETURN_DETAIL:
      return {
        ...state,
        checkedOutNotReturnDetailsList: payload
      };
    case GET_PRODUCT_FINALIZE_SUMMARY:
      return {
        ...state,
        productFinalizeSummaryList: payload
      };
    case GET_PRODUCT_FINALIZE_DETAIL:
      return {
        ...state,
        productFinalizeDetailsList: payload
      };
    case GET_PRODUCT_DECLINED_SUMMARY:
      return {
        ...state,
        productDeclineSummaryList: payload
      };
    case GET_PRODUCT_DECLINE_DETAIL:
      return {
        ...state,
        productDeclineDetailList: payload
      };
    case GET_NOT_CHECKOUT_SUMMARY:
      return {
        ...state,
        notCheckedOutSummaryList: payload
      };
    case GET_NOT_CHECKOUT_DETAIL:
      return {
        ...state,
        notCheckoutDetailList: payload
      };
    case GET_MONTHLY_CLIENT_CONSUMED:
      return {
        ...state,
        monthlyclientConsumedList: payload
      };
    case GET_MONTHLY_PRODUCT_NOT_RETURNED:
      return {
        ...state,
        monthlyProductNotReturnedList: payload
      };
    case GET_MONTHLY_PRODUCT_DECLINED:
      return {
        ...state,
        monthlyProductDeclinedList: payload
      };
    case GET_MONTHLY_LOSS:
      return {
        ...state,
        monthlyLossList: payload
      };
    case GET_CLINET_CHECK_OUT_SUMMARY:
      return {
        ...state,
        clientCheckedOutSummaryList: payload
      };
    case GET_CLINET_CHECK_OUT_DETAIL:
      return {
        ...state,
        clientCheckedOutDetailsList: payload
      };
    case GET_CHECK_OUT_RETURN_SUMMARY:
      return {
        ...state,
        checkOutReturnSummaryList: payload
      };
    case GET_CHECK_OUT_RETURN_DETAIL:
      return {
        ...state,
        checkOutReturnDetailList: payload
      };
    case GET_CHECK_OUT_NOT_RETURN_SUMMARY:
      return {
        ...state,
        checkedOutNotReturnSummaryList: payload
      };
    case GET_MONTHLY_REVENUE:
      return {
        ...state,
        monthlyRevenueList: payload
      };
    default:
      return state;
  }
};

export default reportReducer;
