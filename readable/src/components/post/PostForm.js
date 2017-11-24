import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editPost, addPost } from '../../actions/PostAction'
import { guid } from '../../utils/helper'

class PostForm extends Component {

    // Default state of Post object
	initialPostState = {
        title: '',
        body: '',
        category: '',
        author: '',
		mode: ''
    }

    constructor(props) {
        super(props);

        this.state = this.initialPostState
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const { currentPost } = this.props

		if (!!currentPost) {
        	this.setPostForEdit(currentPost)
		} else {
            this.setPostForCreate()
		}
    }

    setPostForEdit = ( post ) => {
		this.setState({
            id: post.id,
            timestamp: post.timestamp,
			title: post.title,
			body: post.body,
			category: post.category,
			author: post.author,
			mode: 'edit'

		})
	}

    setPostForCreate = () => {
        this.setState({
			category: 'Select',
			mode: 'add',
            id: guid(),
            timestamp: Date.now()
        })
	}


    handleChange(event) {
        let key = event.target.id
        let editPost = this.state
        editPost[key] = event.target.value
        this.setState({
            title: editPost.title,
            body: editPost.body,
            category: editPost.category,
            author: editPost.author
        })
    }

    handleSubmit(event) {

        const { id, timestamp, title, body, category, author, mode } = this.state
        const { currentPost } = this.props

		if (mode === 'edit') {
            this.props.editPost(currentPost.id, { title, body, category, author })
		}

        if (mode === 'add') {
            this.props.addPost({ id, timestamp, title, body, category, author })
        }

    }

	render(){

        const { title, body, category, author } = this.state
        const { categories } = this.props

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" id="title" value={title} onChange={this.handleChange} required={true}/>
				</div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control" id="author" value={author} onChange={this.handleChange} required={true}/>
                </div>
				<div className="form-group">
					<label>Body</label>
					<textarea className="form-control" id="body" placeholder="Content of your post"  value={body} onChange={this.handleChange} required={true}/>
				</div>
				<div className="form-check">
					<label>Categories: </label>
					<select className="form-control" id="category" value={category} onChange={this.handleChange} required={true}>
                        {!!categories && categories.map(category => (
							<option value={category.name} key={category.path}>{category.name}</option>
                        ))}
					</select>
				</div>
				<button type="submit" className="btn btn-primary">Save Post</button>
			</form>
		)
	}

}

function mapStateToProps({post, categories}) {
	return { post, categories }
}

export default connect(mapStateToProps, {
    addPost,
	editPost
})(PostForm)