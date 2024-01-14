import {
  GET_MEN_BASIC_INFO,
  GET_MEN_PRICE_RANGE,
  GET_MEN_STYLE_FIT,
  GET_MEN_STYLE_CUSTOM,
  GET_SCHEDULE,
  GET_ALL_ADDRESS,
  GET_WOMEN_BASIC_INFO,
  GET_WOMEN_STYLE_FIT,
  GET_WOMEN_PRICE_RANGE,
  GET_WOMEN_STYLE_CUSTOM,
  GET_CLIENT_PRODUCTS,
  SET_SHIPPING_ADDRESS_ID
} from 'actions/common/types';

const initialState = {
  loading: true,
  mBasicInfo: null,
  mStyleFit: null,
  mPriceRange: null,
  mStyleCustom: null,
  schedule: null,
  allAddress: [],
  shippingAddressId: null,
  wBasicInfo: null,
  wStyleFit: null,
  wPriceRange: null,
  wStyleCustom: null,
  products: [],
  paidStatus: 0
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MEN_BASIC_INFO:
      return {
        ...state,
        mBasicInfo: payload,
        loading: false
      };
    case GET_MEN_STYLE_FIT:
      return {
        ...state,
        mStyleFit: payload,
        loading: false
      };
    case GET_MEN_PRICE_RANGE:
      return {
        ...state,
        mPriceRange: payload,
        loading: false
      };
    case GET_MEN_STYLE_CUSTOM:
      return {
        ...state,
        mStyleCustom: payload,
        loading: false
      };
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false
      };
    case GET_WOMEN_BASIC_INFO:
      return {
        ...state,
        wBasicInfo: payload,
        loading: false
      };
    case GET_WOMEN_STYLE_FIT:
      return {
        ...state,
        wStyleFit: payload,
        loading: false
      };
    case GET_WOMEN_PRICE_RANGE:
      return {
        ...state,
        wPriceRange: payload,
        loading: false
      };
    case GET_WOMEN_STYLE_CUSTOM:
      return {
        ...state,
        wStyleCustom: payload,
        loading: false
      };

    case GET_ALL_ADDRESS:
      return {
        ...state,
        allAddress: payload
      };
    case SET_SHIPPING_ADDRESS_ID:
      return {
        ...state,
        shippingAddressId: payload
      };
    case GET_CLIENT_PRODUCTS:
      return {
        ...state,
        products: payload.products,
        paidStatus: payload.paidStatus
      };
    default:
      return state;
  }
};

export default profileReducer;
