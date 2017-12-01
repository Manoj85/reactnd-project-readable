import React, {Component} from 'react'
import {connect} from 'react-redux'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

import { editComment, deleteComment } from '../../actions/CommentAction'
import CommentForm from './CommentForm'

class CommentCard extends Component {

    removeComment = () => {
        const {comment, post} = this.props
        if (!!post.id && comment.id) {
            this.props.deleteComment(comment.id)
        }
    }

    editComment = () => {

    }

    doVoteComment = (option) => {
        /*
        let postId = this.props.post.id
        if (option === 'upVote') {
            this.props.addVote(postId)
        } else if (option === 'downVote') {
            this.props.subtractVote(postId)
        }
        */
    }

    render() {
        const {comment} = this.props
        return (
            <div className="card margin-top-10" key={comment.id}>
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <div className="col-md-1">
                                <div className="vote">
                                    <a className="vote-up-off" title="" onClick={() => this.doVoteComment('upVote')}>upvote</a>
                                    <span className="vote-count-post"></span>
                                    <a className="vote-down-off" title="" onClick={() => this.doVoteComment('downVote')}>downvote</a>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="margin-bottom-10">
                                    <span className="comment-title"> {comment.body} </span>
                                    <span className="text-muted" style={{fontSize: 16}}>{comment.timestamp}</span>
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted margin-top-10">By: {comment.author}</h6>
                            </div>
                            <div className="col-md-2 ml-md-auto">
                                <button className="btn btn-info btn-sm margin-left-15" id={comment.id}
                                        onClick={this.editComment}>
                                    <EditIcon size={20}/>
                                </button>
                                <button className="btn btn-danger btn-sm margin-left-15" id={comment.id}
                                        onClick={this.removeComment}>
                                    <DeleteIcon size={20}/>
                                </button>
                            </div>
                        </div>
                    </h5>


                </div>
            </div>
        )

    }

}

function mapStateToProps({posts, categories}) {
    return {posts, categories}
}

export default connect(mapStateToProps, {
    editComment,
    deleteComment
})(CommentCard)