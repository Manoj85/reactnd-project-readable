import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, addPost, editPost } from '../../actions/PostAction'

class PostForm extends Component {
	componentDidMount() {
		this.props.getCategories()
	}

	render(){
		return (
			<div></div>
		)
	}

}

function mapStateToProps({post}) {
	return { post }
}

export default connect(mapStateToProps, {
	getPost,
	addPost,
	editPost
})(PostForm)