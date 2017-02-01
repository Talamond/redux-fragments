import {combineFragmentsHandlers} from '../../src/fragmentHelper.js';

const fragments = {
};

export const initialState = {
  lastActionD: '',
  testValueD: ''
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.D = (newState, payload) => {
    newState.lastActionD = 'D';
    newState.testValueD = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
