import { MENU_OPEN, SET_MENU, SET_FIT_FOR, SET_LOADING } from 'actions/common/types';

const initialState = {
  isOpen: [],
  opened: true,
  fitFor: null,
  isLoading: false
};

const customizationReducer = (state = initialState, action) => {
  let id = '';
  switch (action.type) {
    case MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case SET_FIT_FOR:
      return {
        ...state,
        fitFor: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    default:
      return state;
  }
};

export default customizationReducer;
