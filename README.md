# redux-fragments
WORK IN PROGRESS

This is a small helper library to assist developers in writing their UI with a fragment architecture.

Please checkout my blog <insert link> for a better explanation of redux-fragments!
Checkout the redux-fragments-boilerplate to see a sample in action!

## What are redux-fragments?
Sharing React components is easy, but what about all the effort gone into redux actions and reducer handlers? Ideally we can share not only the React component, but also the redux state, the handlers and the actions. Arranging your UI architecture with redux-fragments will help you achieve this in a testable, extendible and overwritable manner.
### The structure
A redux-fragment consists of 4 majors pieces.
#### Action Type Creator
Action types are pretty self explanatory,. The prefix very is important. Its key to reusing a fragment without one instance affecting another.
```
export function createActionTypes(prefix = '') {
	return {
    CLICK_BUTTON: `${prefix}CLICK_BUTTON`,
    SELECT_TAB: `${prefix}SELECT_TAB`,
    CHANGE_PAGE: `${prefix}CHANGE_PAGE`
	};
}
```

#### Action Creator
Action Creator takes in actionTypes map, created from createActionTypes above. Since the action types were instantiated with a prefix, when these actions are fired, they will also use this prefix, which allows one fragment to be independant from another, evne though they share the same code.
```
export function createActions(actionTypes) {
	function clickButton() {
    return {
      type: actionTypes.CLICK_BUTTON,
      payload: {}
    };
  }

	return {
    clickButton
	};
}
```

#### Reducer Handlers
The key difference between a regular redux reducer and fragment handlers is that the fragment handlers do not actually plug themselves into the redux state. In order to use the fragment, you must plug these reducer handlers into your redux state somewhere. This allows you to instantiate many separate instances of the state, which would allow you to show multiple fragments on screen at one time if needed. 
```
import { createActionTypes } from './actionTypes.js';

export const initialState = {
  showText: '',
};

export const createHandlers = (prefix) => {
	const actionTypes = TimelineActionTypes.createActionTypes(prefix);
	const handlers = {};

	handlers[actionTypes.CLICK_BUTTON] = (state, payload) => {
		const newState = {...state);
    newState.showPopup = 'text';
		return newState;
	};

	return handlers;
};

```
#### React Component
Finally, the last piece of the fragment is the React Component. Its just a regular React component that will take in the redux state of the fragment and actions as props. It can also take in other props as attributes.
```
  class ButtonSample extends React.Component {

    static propTypes = {
      buttonSample: PropTypes.object, // state
      title: PropTypes.string, // component attribute
      clickButton: PropTypes.func, // action\
    };

    renderButton() {
      return <button onClick={() => this.props.clickButton()}>ClickMe</button>;
    }

    render() {
      return (
        <div>
          <span>{this.props.title}</span>
          <span>{this.props.sample.text}</span>
        </div>
      );
    }
  }
```

### Putting it all together
Now that we have all the pieces to the fragment we can plug it in. First we have to create a spot in the redux state for it and hook up the handlers. Generally we do this in a typical redux reducer.
```
import { attachState, executeHandlers } from 'redux-fragment';
import { createActionTypes } from '../fragments/buttonSample/actionTypes.js';
import { createActions } from '../fragments/buttonSample/actionCreator.js';
import { initialState, createHandlers } from '../fragments/buttonSample/reducerHandlers.js';

export const prefix = 'SAMPLE__';

const fragments = {
	buttonSample: {
		initialState: {
			...initialState
		},
		handlers: {
			...createHandlers(prefix)
		}
	}
};

const initialState = {
  root: {}
};

const handlers = {};

const getInitialState = () => {
	return attachState(initialState, fragments);
};

// This function is hooked up to redux store
export function sample(state = getInitialState(), action) {
	return executeHandlers(state, action, handlers, fragments);
}
```

Then we have to connect our React component to our actions and state we created.

```
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { prefix } from '../reducers/sampleReducer.js';
import { createActionTypes } from '../fragments/buttonSample/actionTypes.js';
import { createActions } from '../fragments/buttonSample/actionCreator.js';
import { ButtonSample } from '../fragments/buttonSample/component.js';
import { initialState, createHandlers } from '../fragments/buttonSample/reducerHandlers.js';

export class SampleContainer extends React.Component {
	static propTypes = {
	};

	componentWillMount() {
	  const enhance = connect({
	    buttonSample: (store) => store.sample.fragments.buttonSample
	  }, createActions(createActionTypes(prefix)));
	  this.ButtonFragment = enhance(ButtonSample);
	}

	render() {
		const ButtonFragment = this.ButtonFragment;
		return (
      <ButtonFragment title="Button Fragment"/>
		);
	}
}

```
That's it!

### The explanation
So it works, great, why go through all the extra effort?
#### Sharing state can get messy
Trying to share the same state for different parts of the applications causes problems. For example, if you ever need to show both those parts of the application at once, you won't be able to because they share state. Also when you share the same state, you often have to make changes that affect all usages of the shared code. With a fragment you can extend of overwrite to avoid having to affect other areas of the code
#### Large modules of code are rarely exactly the same
Fragments are completely extendible and overwritable in every way. If you ever need to reuse code, you'll have no problem extending it to make those specific tweaks.
#### Helps separate duties
Building your code as fragments encourages developers to think ahead about separating duties to produce decoupled code.
#### Great for testing 
With fragments, you can test each one independently from the rest of the code.

## TODO List
 * Missing pretty check marks
 * proofread
 * override function
 * plug this into synposis
 * addFragmentsHandlers function
 * more test cases
 * loader isn't setup for sampleFragments
 * remove lodash