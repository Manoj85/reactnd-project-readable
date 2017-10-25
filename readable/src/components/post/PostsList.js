import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getAllPosts } from '../../actions/PostsAction'
import { sortByLatest, sortByVotes } from '../../actions/SortAction'
import { capitalize, trim } from '../../utils/helper'

class PostsList extends Component {

	componentDidMount(){
		this.props.getAllPosts()
	}

	showAllPosts(){
		const { posts, comments, sorts } = this.props
		if (posts.length === 0) {
			return <p>No Posts created.</p>
		}
		const sort = sorts.order === 'byVotes' ? _.sortBy(posts,(post)=>-post.voteScore) : _.sortBy(posts,(post)=>-post.timeStamp)
		return _.map(sort, post => {
			const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = post
			// Filter the Non-deleted posts
			if(deleted === false){
				return(
					<li className="posts-item" key={id}>
						<div className="row">
							<div className="col-md-10">
								{trim(title)} By: {capitalize(trim(author))}
							</div>
							<div className="col-md-2">
								Total Comments = {commentCount}
							</div>
						</div>
					</li>
				)
			}

		})

	}

	render() {
		return (
			<div className="container">
				<ul className="posts">
					{this.showAllPosts()}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({posts, comments, sorts}, ownProps) {
	if(ownProps.match.params.category){
		return {
			posts: _.omitBy(posts,(post)=>post.category !== ownProps.match.params.category),
			comments,
			sorts: sorts.posts
		}
	}
	return { posts, comments, sorts: sorts.posts}
}

export default connect(mapStateToProps, {
	getAllPosts,
	sortByLatest,
	sortByVotes
})(PostsList)
