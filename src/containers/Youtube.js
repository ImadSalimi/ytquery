import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as youtubeActions from '../redux/modules/youtube'

import SearchBar from '../components/SearchBar'
import VideosList from '../components/VideosList'

class Youtube extends Component {
	componentWillMount() {
		const { location: { query: { q, pageToken } } } = this.props.router
		const savedState = JSON.parse(localStorage.getItem('ytResults'))
		
		// Check for 'q' in the query string, it if exists then prefill the search
		if (q && q.length > 0) {
			this.props.search({ q, pageToken })
		} else if (savedState) {
			// Else get the last saved search result
			this.props.loadState(savedState)
		}
	}

	componentWillReceiveProps(props) {
		// Handle the case of pressing "back" and "forward" history buttons
		const { location: { query: { q, pageToken } } } = props
		if (q && q.length) {
			const newQuery = q.toLowerCase() !== this.props.searchQuery.toLowerCase()
			if (newQuery) {
				this.props.search({ q })
			} else if (pageToken && pageToken.length && pageToken !== this.props.pageToken) {
				this.props.search({ q, pageToken })
			}
		}
	}

	onSubmit(q) {
		this.props.router.push({query: { q }})
		this.props.search({ q })
	}

	onPageChange(page) {
		const q = this.props.searchQuery
		const pageToken = (page === 'next') ? this.props.nextPageToken : this.props.prevPageToken
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