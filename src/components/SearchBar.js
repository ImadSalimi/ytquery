import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			q: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({q: nextProps.searchQuery})
	}

	onQueryChange(e) {
		this.setState({ q: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.onSubmit(this.state.q)
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<TextField
					hintText={'Search'}
					value={this.state.q}
					onChange={this.onQueryChange.bind(this)}
					underlineFocusStyle={{borderColor: '#cc181e'}}
				/>
				<RaisedButton
					type="submit"
					label="Search"
					backgroundColor="#cc181e"
					labelColor="#fff"
				/>
			</form>
		)
	}
}

export default SearchBar