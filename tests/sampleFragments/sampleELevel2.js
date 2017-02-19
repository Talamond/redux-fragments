import {combineFragmentsHandlers, attachState} from '../../src/fragmentHelper.js';
import {initialState as stateF, createHandlers as handlersF} from './sampleFLevel3.js';

const fragments = {
  f: {
    state: {
      ...stateF
    },
    handlers: {
      ...handlersF()
    }
  }
};

const iState = {
  lastActionE: '',
  testValueE: ''
};

export const getInitialState = () => {
  return attachState(iState, fragments);
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.B = (newState, payload) => {
    newState.lastActionE = 'B';
    newState.testValueE = payload.value;
    return newState;
  };

  handlers.C = (newState, payload) => {
    newState.lastActionE = 'C';
    newState.testValueE = payload.value;
    return newState;
  };

  handlers.E = (newState, payload) => {
    newState.lastActionE = 'E';
    newState.testValueE = payload.value;
    return newState;
  };

  handlers.F = (newState, payload) => {
    newState.lastActionE = 'F';
    newState.testValueE = payload.value;
    return newState;
  };

  handlers.CE = (newState, payload) => {
    newState.lastActionC = 'CE';
    newState.testValueC = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
