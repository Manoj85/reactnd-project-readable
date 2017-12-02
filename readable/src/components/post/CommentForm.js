import React, { Component } from 'react'
import { connect } from 'react-redux'

import { editComment, addComment } from '../../actions/CommentAction'
import { guid } from '../../utils/helper'

class CommentForm extends Component {

    // Default state of Post object
	initialPostState = {
        body: '',
        author: '',
        parentId: '',
		mode: ''
    }

    constructor(props) {
        super(props);

        this.state = this.initialPostState
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { currentComment, currentPost } = this.props

		if (!!currentComment) {
        	this.setCommentForEdit(currentComment)
		} else {
            this.setCommentForCreate(currentPost)
		}
    }

    setCommentForEdit = (comment) => {
        this.setState({
            id: comment.id,
            timestamp: comment.timestamp,
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId,
            mode: 'edit'
        })
    }

    setCommentForCreate = (post) => {
        this.setState({
            id: guid(),
            timestamp: Date.now(),
            parentId: post.id,
            mode: 'add'
        })
    }

    handleChange(event) {
        let key = event.target.id
        let editComment = this.state
        editComment[key] = event.target.value
        this.setState({
            body: editComment.body,
            author: editComment.author,
            parentId: editComment.parentId,
        })
    }

    handleSubmit() {
        /*
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.
        */
        const { id, timestamp, body, author, mode } = this.state
        const { currentPost, currentComment } = this.props

		if (mode === 'edit') {
            this.props.editComment(currentComment.id, { body, timestamp })
		}

        if (mode === 'add') {
            this.props.addComment(currentPost, { id, timestamp, body, author })
        }
    }

	render(){

        const { id, timestamp, body, mode } = this.state
        const { currentPost, buttonType } = this.props

		return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
                <input type="text" id="body" value={body} onChange={this.handleChange} />
                <button type="submit" className="btn btn-info btn-sm margin-left-8">{buttonType}</button>
                { mode === 'edit' ? <button className="btn btn-info btn-sm margin-left-8" onClick={this.cancelComment}>Cancel</button> : '' }
            </form>
		)
	}

}

function mapStateToProps({comment, posts}) {
	return { comment, posts }
}

export default connect(mapStateToProps, {
    editComment,
    addComment
})(CommentForm)