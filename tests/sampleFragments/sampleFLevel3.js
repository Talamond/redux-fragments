import {combineFragmentsHandlers} from '../../src/fragmentHelper.js';

const fragments = {
};

export const initialState = {
  lastActionF: '',
  testValueF: ''
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.F = (newState, payload) => {
    newState.lastActionF = 'F';
    newState.testValueF = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
