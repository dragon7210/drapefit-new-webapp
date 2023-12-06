import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import SetAuthToken from 'utils/SetAuthToken';
import rootReducer from 'reducers';

const initialState = {};
const middleware = [thunk];
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

let currentState = store.getState();
store.subscribe(() => {
  const previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    const isRememberMe = currentState.auth.isRememberMe;
    SetAuthToken(token, isRememberMe);
  }
});

export default store;
