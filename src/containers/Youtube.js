import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as youtubeActions from '../redux/modules/youtube'

import SearchBar from '../components/SearchBar'
import VideosList from '../components/VideosList'

class Youtube extends Component {
	/**
	 * Checks if there are any query params in the URL to prefill the search
	 */
	componentWillMount() {
		const { location: { query: { q, pageToken } } } = this.props.router
		const savedState = JSON.parse(localStorage.getItem('ytResults'))
		
		// Check for 'q' in the query param
		if (q && q.length > 0) {
			this.props.search({ q, pageToken })
		} else if (savedState) {
			// Else get the last saved search result
			this.props.loadState(savedState)
		}
	}

	/**
	 * Handle the case of pressing "back" and "forward" history buttons
	 * @param  {object} props The new props of the component
	 */
	componentWillReceiveProps(props) {
		const { location: { query: { q, pageToken } } } = props
		// If there's a "q" query parameter
		if (q && q.length) {
			const newQuery = q.toLowerCase() !== this.props.searchQuery.toLowerCase()
			// If it's different from the current query
			if (newQuery) {
				this.props.search({ q })
			} else if (pageToken && pageToken.length && pageToken !== this.props.pageToken) {
				this.props.search({ q, pageToken })
			}
		}
	}

	/**
	 * Executes when the search bar form is submitted
	 * @param  {string} q The search query
	 */
	onSubmit(q) {
		// Add query params to the URL then dispatch a search action
		this.props.router.push({query: { q }})
		this.props.search({ q })
	}

	/**
	 * Executes when the "Next" or "Previous" buttons are clicked
	 * @param  {string} page One of the values "next" and "prev"
	 */
	onPageChange(page) {
		const q = this.props.searchQuery
		const pageToken = (page === 'next') ? this.props.nextPageToken : this.props.prevPageToken
		// Add query params to the URL then dispatch a search action
		this.props.router.push({query: { q, pageToken }})
		this.props.search({ q, pageToken })
	}

	render() {
		return (
			<div>
				<SearchBar
					searchQuery={this.props.searchQuery}
					onSubmit={this.onSubmit.bind(this)}
				/>
				<VideosList
					videos={this.props.videos}
					isSearching={this.props.isSearching}
					searchQuery={this.props.searchQuery}
					prevPageToken={this.props.prevPageToken}
					nextPageToken={this.props.nextPageToken}
					onPageChange={this.onPageChange.bind(this)}
				/>
			</div>
		)
	}
}

/**
 * Grab some values from the state and action dispatchers then pass them as props
 */
export default connect(
	state => ({
		videos: state.youtube.videos,
		isSearching: state.youtube.isSearching,
		pageToken: state.youtube.pageToken,
		nextPageToken: state.youtube.nextPageToken,
		prevPageToken: state.youtube.prevPageToken,
		searchQuery: state.youtube.searchQuery,
	}),
	dispatch => bindActionCreators(youtubeActions, dispatch)
)(Youtube)