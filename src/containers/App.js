import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};

	render() {
		return (
			<div>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
};

// Connects our container to the store
export default connect()(App);