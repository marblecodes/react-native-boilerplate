import { combineReducers } from 'redux';
import { DUMMY } from './types';

const initialState = {};

const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default combineReducers({
  dummy: dummyReducer,
});
