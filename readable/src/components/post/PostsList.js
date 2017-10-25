import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllPosts } from '../../actions/PostsAction'

class PostsList extends Component {

	componentDidMount(){
		this.props.getAllPosts()
	}

	showAllPosts(){
		const { posts } = this.props
		console.log(posts)


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

function mapStateToProps({posts}) {
	return { posts }
}

export default connect(mapStateToProps, {
	getAllPosts
})(PostsList)
