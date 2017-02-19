import {attachState, executeHandlers} from '../src/fragmentHelper.js';
import {initialState as stateA, createHandlers as handlersA} from './sampleFragments/sampleALevel1.js';
import {initialState as stateB, createHandlers as handlersB} from './sampleFragments/sampleBLevel1.js';
import {initialState as stateC, createHandlers as handlersC} from './sampleFragments/sampleCLevel1.js';
import {initialState as stateD, createHandlers as handlersD} from './sampleFragments/sampleDLevel2.js';
import {initialState as stateE, createHandlers as handlersE} from './sampleFragments/sampleELevel2.js';
import {initialState as stateF, createHandlers as handlersF} from './sampleFragments/sampleFLevel3.js';

describe('FragmentHandler attachState', () => {
  let exState;

  beforeEach(() => {
    exState = {
      variable1: '1',
      variable2: '2'
    };
  });

  it('attachState - state contains fragments', () => {
    const throwException = () => {
      attachState({root: {}, fragments: {}}, {
        fragment1: {
          state: {
            f11: 'f11',
            f12: 'f12'
          }, handlers: {
            h11: () => {
              return 'h11';
            },
            h12: () => {
              return 'h12';
            }
          }
        }, fragment2: {
          state: {
            f21: 'f21',
            f22: 'f22'
          }, handlers: {
            h21: () => {
              return 'h21';
            },
            h22: () => {
              return 'h22';
            }
          }
        }
      });
    };
    expect(throwException).toThrow();
  });

  it('attachState - empty fragments', () => {
    const state = attachState(exState, {});
    expect(state).toEqual({
      variable1: '1',
      variable2: '2',
      fragments: {}
    });
  });

  it('attachState - fragment missing state', () => {
    const throwException = () => {
      attachState(exState, {
        fragment1: {
          handlers: {
            h11: () => {
              return 'h11';
            },
            h12: () => {
              return 'h12';
            }
          }
        }
      });
    };
    expect(throwException).toThrow();
  });

  it('attachState - 1 fragment', () => {
    const frag = {
      fragment1: {
        state: {
          f11: 'f11',
          f12: 'f12'
        }, handlers: {
          h11: () => {
            return 'h11';
          },
          h12: () => {
            return 'h12';
          }
        }
      }
    };
    const state = attachState(exState, frag);
    console.log(JSON.stringify(state));
    expect(state).toEqual({
      variable1: '1',
      variable2: '2',
      fragments: {
        fragment1: {
          f11: 'f11',
          f12: 'f12'
        }
      }
    });
  });

  it('attachState - many fragments', () => {
    const frag = {
      fragment1: {
        state: {
          f11: 'f11',
          f12: 'f12'
        }, handlers: {
          h11: () => {
            return 'h11';
          },
          h12: () => {
            return 'h12';
          }
        }
      }, fragment2: {
        state: {
          f21: 'f21',
          f22: 'f22'
        }, handlers: {
          h21: () => {
            return 'h21';
          },
          h22: () => {
            return 'h22';
          }
        }
      }, fragment3: {
        state: {
          f31: 'f31',
          f32: 'f32'
        }, handlers: {
          h31: () => {
            return 'h31';
          },
          h32: () => {
            return 'h32';
          }
        }
      }
    };
    const state = attachState(exState, frag);
    expect(state).toEqual({
      variable1: '1',
      variable2: '2',
      fragments: {
        fragment1: {
          f11: 'f11',
          f12: 'f12'
        },
        fragment2: {
          f21: 'f21',
          f22: 'f22'
        },
        fragment3: {
          f31: 'f31',
          f32: 'f32'
        }
      }
    });
  });
});

describe('FragmentHandler executeHandlers', () => {
  let exState, exFragments, exHandlers;
  let actionA = {
    type: 'A',
    payload: {
      value: 'testA'
    }
  };
  let actionB = {
    type: 'B',
    payload: {
      value: 'testB'
    }
  };
  let actionC = {
    type: 'C',
    payload: {
      value: 'testC'
    }
  };
  let actionCE = {
    type: 'CE',
    payload: {
      value: 'testCE'
    }
  };
  let actionD = {
    type: 'D',
    payload: {
      value: 'testD'
    }
  };
  let actionE = {
    type: 'E',
    payload: {
      value: 'testE'
    }
  };
  let actionF = {
    type: 'F',
    payload: {
      value: 'testF'
    }
  };
  let actionNone = {
    type: 'None',
    payload: {
      value: 'none'
    }
  };

  beforeEach(() => {
    exState = {
      lastAction: '',
      testValue: ''
    };
    exHandlers = {
      A: (newState, payload) => {
        newState.lastAction = 'A';
        newState.testValue = payload.value;
        return newState;
      },
      CE: (newState, payload) => {
        newState.lastAction = 'CE';
        newState.testValue = payload.value;
        return newState;
      },
      D: (newState, payload) => {
        newState.lastAction = 'D';
        newState.testValue = payload.value;
        return newState;
      }
    };
    exFragments = {
      a: {
        state: {
          ...stateA
        },
        handlers: {
          ...handlersA()
        }
      },
      b: {
        state: {
          ...stateB
        },
        handlers: {
          ...handlersB()
        }
      },
      c: {
        state: {
          ...stateC
        },
        handlers: {
          ...handlersC()
        }
      },
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
          ...stateE
        },
        handlers: {
          ...handlersE()
        }
      },
      f: {
        state: {
          ...stateF
        },
        handlers: {
          ...handlersF()
        }
      }
    };
  });

  it('executeHandlers - action missing type', () => {
    const throwException = () => {
      executeHandlers(exState, {payload: {value: 'test'}},exHandlers ,exFragments);
    };
    expect(throwException).toThrow();
  });

  it('executeHandlers - fragment missing handlers', () => {
  });
  it('executeHandlers - empty handlers and fragments', () => {
  });

  it('executeHandlers - empty handlers', () => {
  });

  it('executeHandlers - empty fragment', () => {
  });

  it('executeHandlers - empty handlers, match fragment', () => {
    // ActionA should only match sampleA
    const resultState = executeHandlers(exState, actionA, {}, exFragments);
    expect(resultState.lastAction).toBe('');
    expect(resultState.fragments.a.lastActionA).toBe('A');
    expect(resultState.fragments.a.testValueA).toBe('testA');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');
  });

  it('executeHandlers - match handlers, empty fragment', () => {
    // ActionA should only match root
    const resultState = executeHandlers(exState, actionA, exHandlers, {});
    expect(resultState.lastAction).toBe('A');
    expect(resultState.testValue).toBe('testA');
    expect(resultState.fragments).toBe({});
  });

  it('executeHandlers - match handlers, match fragment', () => {
    // ActionA should only match sampleA and root
    const resultState = executeHandlers(exState, actionA, exHandlers, exFragments);
    expect(resultState.lastAction).toBe('A');
    expect(resultState.testValue).toBe('testA');
    expect(resultState.fragments.a.lastActionA).toBe('A');
    expect(resultState.fragments.a.testValueA).toBe('testA');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');
  });

  it('executeHandlers - don\'t match handlers, match 2nd level fragment', () => {
    // ActionD should match root and sample D only
    const resultState = executeHandlers(exState, actionD, exHandlers, exFragments);
    expect(resultState.lastAction).toBe('D');
    expect(resultState.testValue).toBe('testD');
    expect(resultState.fragments.a.lastActionA).toBe('');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('D');
    expect(resultState.fragments.c.fragments.d.testValueD).toBe('testD');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');
  });

  it('executeHandlers - match handlers, match 1st/2nd level fragment', () => {
    // ActionCE should match Sample C and E only
    const resultState = executeHandlers(exState, actionD, exHandlers, exFragments);
    expect(resultState.lastAction).toBe('CE');
    expect(resultState.testValue).toBe('testCE');
    expect(resultState.fragments.a.lastActionA).toBe('');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('CE');
    expect(resultState.fragments.c.testValueC).toBe('testCE');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('CE');
    expect(resultState.fragments.c.fragments.e.testValueE).toBe('testCE');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');
  });

  it('executeHandlers - no match handlers, match 1st/2nd level fragment', () => {
    delete exHandlers.CE;
    // ActionCE should match Sample C and E only
    const resultState = executeHandlers(exState, actionD, exHandlers, exFragments);
    expect(resultState.lastAction).toBe('');
    expect(resultState.testValue).toBe('');
    expect(resultState.fragments.a.lastActionA).toBe('');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('CE');
    expect(resultState.fragments.c.testValueC).toBe('testCE');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('CE');
    expect(resultState.fragments.c.fragments.e.testValueE).toBe('testCE');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');
  });

  it('executeHandlers - no matchers', () => {
    const resultState = executeHandlers(exState, actionNone, exHandlers, exFragments);
    expect(resultState.lastAction).toBe('');
    expect(resultState.fragments.a.lastActionA).toBe('');
    expect(resultState.fragments.b.lastActionB).toBe('');
    expect(resultState.fragments.c.lastActionC).toBe('');
    expect(resultState.fragments.c.fragments.d.lastActionD).toBe('');
    expect(resultState.fragments.c.fragments.e.lastActionE).toBe('');
    expect(resultState.fragments.c.fragments.e.fragments.f.lastActionF).toBe('');

  });

  it('executeHandlers - fragment can modify child', () => {

  });

  it('executeHandlers - child fragment can not modify parent', () => {

  });

  it('executeHandlers - only root can modify root', () => {

  });


  it('executeHandlers - matches siblings', () => {

  });


  it('executeHandlers - matches siblings and children', () => {

  });
});
