import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default function createStore(history, client) {
	const reduxRouterMiddleware = routerMiddleware(history);
	const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];
	const reducer = require('./modules/reducer').default;
	
	const store = _createStore(reducer, applyMiddleware(...middleware))

	return store;
}