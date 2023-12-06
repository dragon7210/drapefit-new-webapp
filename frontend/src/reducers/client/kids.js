import {
  SET_KID_ORDER,
  SET_KID_GENDER,
  GET_KIDS_BASIC_INFO,
  GET_KIDS_STYLE_FIT,
  GET_KIDS_PRICE_RANGE,
  GET_KIDS_STYLE_CUSTOM
} from 'actions/common/types';

const initialState = {
  order: null,
  gender: null,
  kBasicInfo: null,
  kStyleFit: null,
  kPriceRange: null,
  kStyleCustom: null,
  loading: true
};

const kidsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_KID_ORDER:
      return {
        ...state,
        order: payload,
        loading: false
      };
    case SET_KID_GENDER:
      return {
        ...state,
        gender: payload,
        loading: false
      };
    case GET_KIDS_BASIC_INFO:
      return {
        ...state,
        kBasicInfo: payload,
        loading: false
      };
    case GET_KIDS_STYLE_FIT:
      return {
        ...state,
        kStyleFit: payload,
        loading: false
      };

    case GET_KIDS_PRICE_RANGE:
      return {
        ...state,
        kPriceRange: payload,
        loading: false
      };
    case GET_KIDS_STYLE_CUSTOM:
      return {
        ...state,
        kStyleCustom: payload,
        loading: false
      };

    default:
      return state;
  }
};

export default kidsReducer;
