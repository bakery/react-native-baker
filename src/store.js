import { createStore, compose } from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import devTools from 'remote-redux-devtools';

function configureStore(initialState = fromJS({})) {
	const enhancer = compose(devTools());
	return createStore(createReducer(), initialState, enhancer);
}

module.exports = configureStore;
