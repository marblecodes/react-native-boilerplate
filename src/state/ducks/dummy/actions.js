/**
 *
 * Redux actions
 *
 * More info: https://github.com/alexnm/re-ducks#actions
 *
 */

import { DUMMY } from './types';

const dummyAction = data => ({
  type: DUMMY,
  payload: {
    data,
  },
});

export default {
  dummyAction,
};
