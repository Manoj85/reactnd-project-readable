import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editPost, addPost } from '../../actions/PostAction'

class PostForm extends Component {
	componentDidMount() {

	}

    handleChange(event) {
        // const {name, value} = event.target;
        // this.setState({ [name]: value });
    }

    // handle form submission
    savePost(e) {
        e.preventDefault()
        console.log("Save Post")
    }

	render(){
        const { currentPost, categories } = this.props

		return (
			<form onSubmit={this.savePost}>
				<div className="form-group">
					<label>Title</label>
					<input type="text" className="form-control" id="title" value={currentPost.title} onChange={this.handleChange} required={true}/>
				</div>
				<div className="form-group">
					<label>Body</label>
					<textarea className="form-control" id="body" placeholder="Content of your post"  value={currentPost.body} onChange={this.handleChange} required={true}/>
				</div>
				<div className="form-check">
					<label>Categories: </label>
					<select className="form-control" id="category" value={currentPost.category} onChange={this.handleChange} required={true}>
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