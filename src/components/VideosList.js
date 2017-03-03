import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'

class VideosList extends Component {
	onPrevButtonClick() {
		this.props.onPageChange('prev')
	}

	onNextButtonClick() {
		this.props.onPageChange('next')
	}

	render() {
		const videos = this.props.videos.map((v, i) => {
			// Extract some attributes from the JSON result
			const { id: { videoId }, snippet: { title, thumbnails: { medium: thumbnail } } } = v
			return (
				<GridTile
					key={i}
					title={title}
					subtitle={
						<a style={{color: 'white'}} href={'https://youtube.com/watch?v='+videoId} target="_blank">Watch on YouTube</a>
					}
				>
					<img src={thumbnail.url} width={thumbnail.width} height={thumbnail.height} />
				</GridTile>
			)
		})

		// The "Next" & "Previous" buttons only show if there's a corresponding token
		const btnStyle = {margin: '0 5px 10px 0'}
		const nextButton = (
			this.props.nextPageToken ?
			<RaisedButton
				style={btnStyle}
				label={'Next'}
				primary={true}
				onClick={this.onNextButtonClick.bind(this)} /> :
			null
		)
		const prevButton = (
			this.props.prevPageToken ?
			<RaisedButton
				style={btnStyle}
				label={'Previous'}
				primary={true}
				onClick={this.onPrevButtonClick.bind(this)} /> :
			null
		)

		return (
			<div>
				{prevButton}
				{nextButton}
				{!videos.length && !this.props.isSearching ?
					<h1>No results found for "{this.props.searchQuery}"</h1> :
					<GridList cols={3}>
						{videos}
					</GridList>}
			</div>	
		)
	}
}

export default VideosList