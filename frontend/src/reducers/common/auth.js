import {
  SIGNUP_SUCCESS,
  VERIFY_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
  GET_EMAIL,
  USER_PROFILE
} from 'actions/common/types';

const initialState = {
  token: sessionStorage.getItem('dftoken') || localStorage.getItem('dftoken'),
  isRememberMe: false,
  isAuthenticated: false,
  loading: true,
  user: null,
  emails: [],
  profile: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case SIGNUP_SUCCESS:
      //-- TODO
      return state;
    case VERIFY_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case LOGIN_SUCCESS:
      const { isRememberMe } = action;
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        isRememberMe
      };
    case ACCOUNT_DELETED:
      //-- TODO
      return state;
    case AUTH_ERROR:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false
      };

    case LOGOUT:
      localStorage.removeItem('dftoken');
      localStorage.removeItem('fitFor');
      localStorage.removeItem('order');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case GET_EMAIL:
      return {
        ...state,
        emails: payload
      };
    case USER_PROFILE:
      return {
        ...state,
        profile: payload
      };
    default:
      return state;
  }
};

export default authReducer;
