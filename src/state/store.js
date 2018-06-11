import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './ducks';

let middleware = [thunkMiddleware];

if (__DEV__) {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ collapsed: true });

  middleware = [...middleware, logger];
}

export default function configureStore(initialState = {}) {
  return createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(...middleware),
  );
}
