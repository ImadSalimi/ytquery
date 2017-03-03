import _ from 'lodash'
import config from '../../config'

const API_KEY = config.apiKey

const LOAD = 'ytquery/youtube/LOAD'
const SEARCH = 'ytquery/youtube/SEARCH'
const SEARCH_SUCCESS = 'ytquery/youtube/SEARCH_SUCCESS'
const SEARCH_FAIL = 'ytquery/youtube/SEARCH_FAIL'

const initialState = {
	isSearching: false,
	searchQuery: '',
	videos: [],
	pageToken: '', // Current page token
	nextPageToken: '',
	prevPageToken: '',
	error: null
}


export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return Object.assign({}, state, action.state)
		case SEARCH:
			return Object.assign({}, state, {
				searchQuery: action.searchQuery,
				isSearching: true
			})
		case SEARCH_SUCCESS:
			const { nextPageToken = null, prevPageToken = null } = action.result.data
			const videos = _.filter(action.result.data.items, r => r.id.kind === 'youtube#video')
			const newState = Object.assign({}, state, {
				pageToken: action.nextPage,
				nextPageToken,
				prevPageToken,
				videos,
				isSearching: false
			})
			// Persist state to localStorage
			localStorage.setItem('ytResults', JSON.stringify(newState))
			return newState
		case SEARCH_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				isSearching: false
			})
		default:
			return state
	}
}

/**
 * Calls the YouTube API's search method
 * @param  {string} options.q         The search query
 * @param  {string} options.pageToken The page token associated to the search results
 * @return {object}                   The dispatched action
 */
export function search({ q, pageToken }) {
	return {
		types: [SEARCH, SEARCH_SUCCESS, SEARCH_FAIL],
		promise: (client) => client.get('/search', {
			params: {
				part: 'snippet',
				q,
				pageToken,
				maxResults: 9,
				key: API_KEY,
			}
		}),
		searchQuery: q,
		nextPage: pageToken
	}
}

/**
 * Loads the state from local
 * @param  {object} state        An object representing the state
 * @return {object}              The dispatched action
 */
export function loadState(state) {
	return {
		type: LOAD,
		state,
	}
}