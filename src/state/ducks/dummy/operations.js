/**
 *
 * Redux operations aka the interface of this specific duck.
 * Exposes simple actions as well as complex as async or composed actions (with `redux-thunk`).
 *
 * More info: https://github.com/alexnm/re-ducks#operations
 *
 */

import { dummyAction } from './actions';

const dummyAsyncAction = data => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => {
      dispatch(dummyAction(data));
    })
};

export default {
  dummyAction,
  dummyAsyncAction,
};
