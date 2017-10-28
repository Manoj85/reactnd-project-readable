import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import AddIcon from 'react-icons/lib/md/add-box'
import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

import { getPosts, getPostsByCategory } from '../../actions/PostAction'
import { sortByLatest, sortByVotes } from '../../actions/SortAction'
import { capitalize } from '../../utils/helper'

import CategoryList from '../category/CategoryList'

class PostList extends Component {

	componentDidMount(){
			this.props.getPosts()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			const selectedCategory = nextProps.location.pathname.slice(1)
			nextProps.getPostsByCategory(selectedCategory);
		}
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
							<div className="col-sm-4">{capitalize(title)}</div>
							<div className="col-sm-2">{capitalize(author)}</div>
							<div className="col-sm-1 "><EditIcon size={20}/></div>
							<div className="col-sm-1 "><DeleteIcon size={20} /></div>
							<div className="col-sm-3  posts-item-comments"> {commentCount} Comments </div>
							<div className="col-sm-1 ">{capitalize(category)}</div>
						</div>
					</li>
				)
			}

		})

	}

	render() {
		return (
			<div className="container posts">
				<div className="row">
					<CategoryList/>
					<section className="col-sm-9 posts-container">
						<section className="posts-title-box">
							<label className="label-title">Posts</label>
							<Link className="btn" to="/posts/new">
								New Post <AddIcon className="svgstyle" size={20}/>
							</Link>
						</section>
						<div className="row posts-header-item">
							<div className="col-sm-4"> <label>Title</label> </div>
							<div className="col-sm-2"> <label>Author</label> </div>
							<div className="col-sm-1"> <label>Edit</label> </div>
							<div className="col-sm-1"> <label>Delete</label> </div>
							<div className="col-sm-3 "> <label>Comments</label> </div>
							<div className="col-sm-1 "> <label>Category</label> </div>
						</div>
						<ul>{this.showAllPosts()}</ul>
					</section>
				</div>
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
	return { posts, comments, sorts: sorts.posts }
}

export default connect(mapStateToProps, {
	getPosts,
	getPostsByCategory,
	sortByLatest,
	sortByVotes
})(PostList)
