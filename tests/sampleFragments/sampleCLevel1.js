import {combineFragmentsHandlers, attachState} from '../../src/fragmentHelper.js';
import {initialState as stateD, createHandlers as handlersD} from './sampleDLevel2.js';
import {getInitialState as getStateE, createHandlers as handlersE} from './sampleELevel2.js';

const fragments = {
  d: {
    state: {
      ...stateD
    },
    handlers: {
      ...handlersD()
    }
  },
  e: {
    state: {
      ...getStateE()
    },
    handlers: {
      ...handlersE()
    }
  }
};

const iState = {
  lastActionC: '',
  testValueC: ''
};

export const getInitialState = () => {
  return attachState(iState, fragments);
};

/* eslint-disable no-param-reassign */
export const createHandlers = (prefix) => {
  const handlers = {};

  handlers.B = (newState, payload) => {
    newState.lastActionC = 'B';
    newState.testValueC = payload.value;
    return newState;
  };

  handlers.C = (newState, payload) => {
    newState.lastActionC = 'C';
    newState.testValueC = payload.value;
    return newState;
  };

  handlers.E = (newState, payload) => {
    newState.lastActionC = 'E';
    newState.testValueC = payload.value;
    return newState;
  };

  handlers.F = (newState, payload) => {
    newState.lastActionC = 'F';
    newState.testValueC = payload.value;
    return newState;
  };

  handlers.CE = (newState, payload) => {
    newState.lastActionC = 'CE';
    newState.testValueC = payload.value;
    return newState;
  };

  return combineFragmentsHandlers(handlers, fragments);
};
