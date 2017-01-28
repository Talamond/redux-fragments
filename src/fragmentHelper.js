import _ from 'lodash';

/*
 * Given a redux state and a fragment definition map, return another redux state
 * that is the combination of them both. Using this state will allow you to use
 * runHandlers function. initState may not have a member named fragments.
 */
export const attachState = (state, fragmentMap) => {
    if (state.fragments) throw 'When using attachState, the given state may not have a member named \"fragments\"';
    const mergedState = _.cloneDeep(state);
    mergedState.fragments = {};
    _.forIn(fragmentMap, (v, k) => {
        if (!v.state) throw 'Each fragment must have member \"state\"';
        mergedState.fragments[k] = v.state;
    });
    return mergedState;
};

/*
 * Given the current state, an action, redux handlers, and fragment definition map,
 * return a new state that has run though all handlers and fragment handlers.
 * Fragment handlers occur after root handlers.
 * @param state The current redux state
 * @param action The redux action to act upon
 * @param handlers The parent's redux reducer handlers
 * @param fragments A map of all fragments attached to the redux reducer
 * @param overwrite Defaults false. If true, runHandlers will not call fragment's handlers if a match action.type exists
 */
export const executeHandlers = (state, action, handlers, fragments) => {
    if (!action.type) throw 'Action must have type';
    return executeFragmentHandlers(state, action, handlers, fragments);
};

// TODO copy param
// TODO overwrite param
// TODO there's too many clones here
const executeFragmentHandlers = (state, returnState, action, handlers, fragments) => {
    // First check non-fragment handlers for a match.
    if (handlers[action.type]) {
        return handlers[action.type](_.cloneDeep(state), action.payload);
    }
    // Now check all fragments recursively for matches
    _.forIn(fragments, (v, k) => {
        if (!v.handlers) throw 'Fragment ' + k + ' must have handlers';
        const subState = _.cloneDeep(state.fragments[k]);
        const newSubState = executeFragmentHandlers(subState, null, action, state.fragments[k].fragments);
        if (newSubState) {
            const newState = _.cloneDeep(state);
            newState.fragments[k] = newSubState;
            returnState = newState;
        }
    });
    return returnState;
};
