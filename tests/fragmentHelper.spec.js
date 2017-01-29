import { attachState, executeHandlers } from '../src/fragmentHelper.js';

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
      attachState({ root: {}, fragments: {} }, {
        fragment1 : {
          state: {
            f11: 'f11',
            f12: 'f12'
          }, handlers: {
            h11: () => {return 'h11';},
            h12: () => {return 'h12';}
          }
        }, fragment2: {
          state: {
            f21: 'f21',
            f22: 'f22'
          }, handlers: {
            h21: () => {return 'h21';},
            h22: () => {return 'h22';}
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
      fragment1 : {
        state: {
          f11: 'f11',
          f12: 'f12'
        }, handlers: {
          h11: () => {return 'h11';},
          h12: () => {return 'h12';}
        }
      }
    };
    const state = attachState(exState, frag);
    console.log(JSON.stringify(state));
    expect(state).toEqual({
      variable1: '1',
      variable2: '2',
      fragments: {
        fragment1 : {
          f11: 'f11',
          f12: 'f12'
        }
      }
    });
  });

  it('attachState - many fragments', () => {
    const frag = {
      fragment1 : {
        state: {
          f11: 'f11',
          f12: 'f12'
        }, handlers: {
          h11: () => {return 'h11';},
          h12: () => {return 'h12';}
        }
      }, fragment2: {
        state: {
          f21: 'f21',
          f22: 'f22'
        }, handlers: {
          h21: () => {return 'h21';},
          h22: () => {return 'h22';}
        }
      }, fragment3: {
        state: {
          f31: 'f31',
          f32: 'f32'
        }, handlers: {
          h31: () => {return 'h31';},
          h32: () => {return 'h32';}
        }
      }
    };
    const state = attachState(exState, frag);
    expect(state).toEqual({
      variable1: '1',
      variable2: '2',
      fragments: {
        fragment1 : {
          f11: 'f11',
          f12: 'f12'
        },
        fragment2 : {
          f21: 'f21',
          f22: 'f22'
        },
        fragment3 : {
          f31: 'f31',
          f32: 'f32'
        }
      }
    });
  });
});

describe('FragmentHandler executeHandlers', () => {
  let exState;

  beforeEach(() => {
    exState = {
      variable1: '1',
      variable2: '2'
    };
  });

  it('executeHandlers - action missing type', () => {
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
  });

  it('executeHandlers - match handlers, empty fragment', () => {
  });

  it('executeHandlers - match handlers, match fragment', () => {
  });

  it('executeHandlers - match handlers, match 2nd level fragment', () => {
  });

  it('executeHandlers - match handlers, match 1st/2nd level fragment', () => {
  });

  it('executeHandlers - no match handlers, match 1st/2nd level fragment', () => {
  });

  it('executeHandlers - no matchers', () => {

  });

  it('executeHandlers - main and modify child', () => {

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
