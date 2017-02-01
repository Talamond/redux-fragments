import {combineFragmentsHandlers} from '../../src/fragmentHelper.js';

const fragments = {
};

export const initialState = {
  lastActionA: '',
  testValueA: ''
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.A = (newState, payload) => {
    newState.lastActionA = 'A';
    newState.testValueA = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
