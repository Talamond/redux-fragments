import {combineFragmentsHandlers} from '../../src/fragmentHelper.js';

const fragments = {
};

export const initialState = {
  lastActionB: '',
  testValueB: ''
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.B = (newState, payload) => {
    newState.lastActionB = 'B';
    newState.testValueB = payload.value;
    return newState;
  };

  handlers.C = (newState, payload) => {
    newState.lastActionB = 'C';
    newState.testValueB = payload.value;
    return newState;
  };

  handlers.E = (newState, payload) => {
    newState.lastActionB = 'E';
    newState.testValueB = payload.value;
    return newState;
  };

  handlers.F = (newState, payload) => {
    newState.lastActionB = 'F';
    newState.testValueB = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
