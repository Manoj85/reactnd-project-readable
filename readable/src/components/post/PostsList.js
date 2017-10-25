import React, { Component } from 'react'

class PostsMain extends Component {

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

export default PostsMain;