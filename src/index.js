import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createStore from './redux/create';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from './routes';

// Needed for Material UI's onTouchTap
injectTapEventPlugin()

// And http client to make requests
const client = axios.create({
	baseURL: config.apiBaseURL,
	responseType: 'json'
})

// Call our custom createStore method
const store = createStore(browserHistory, client);
const history = syncHistoryWithStore(browserHistory, store);

// Routes to be rendered
const component = (
	<Router history={history}>
		{getRoutes(store)}
	</Router>
)

// Render the app
const dest = document.getElementById('root');
ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store} key="provider">
			{component}
		</Provider>
	</MuiThemeProvider>,
	dest
);
