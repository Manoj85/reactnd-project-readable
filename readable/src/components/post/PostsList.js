import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

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
					<li key={id}>
						<div className="row posts-item">
							<div className="col-sm-5">{capitalize(title)}</div>
							<div className="col-sm-2">{capitalize(author)}</div>
							<div className="col-sm-1 align-center"><EditIcon size={20}/></div>
							<div className="col-sm-1 align-center"><DeleteIcon size={20} /></div>
							<div className="col-sm-3 align-center posts-item-comments"> {commentCount} Comments </div>
						</div>
					</li>
				)
			}

		})

	}

	render() {
		return (
			<div className="container posts">
				<div className="row posts-header-item">
					<div className="col-sm-5"> <label>Title</label> </div>
					<div className="col-sm-2"> <label>Author</label> </div>
					<div className="col-sm-1"> <label>Edit</label> </div>
					<div className="col-sm-1"> <label>Delete</label> </div>
					<div className="col-sm-3 align-center"> <label>Comments</label> </div>
				</div>
				<ul>{this.showAllPosts()}</ul>
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
