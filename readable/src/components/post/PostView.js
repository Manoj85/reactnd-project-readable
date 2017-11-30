import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getCommentsById } from '../../actions/PostAction'
import PostCard from './PostCard'
import CommentCard from './CommentCard'
import _ from 'lodash'

class PostView extends Component {

    componentWillMount() {
        let postId = this.props.match.params.id
        this.props.getPost(postId)
        this.props.getCommentsById(postId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts[0] === null) {
            return nextProps.history.push("/404")
        }
        this.setState({
            posts: nextProps.posts[0],
            comments: nextProps.comments
        })
    }

    render() {

        const post = this.props.posts[0]
        const postId = (!!post) ? post.id : ""
        const comments = this.props.comments[postId]

        return (
            <div className="container container-body">
                <div className="row margin-15">
                    <div className="col-md-10">
                        {post ?
                            <PostCard post={post}
                                      key={postId}
                                      showComments={true}/>
                            : "Post Not Found!!"
                        }

                        <div className="card-comments-box">
                            <label>Comments:</label>
                            {
                                !!comments ?
                                    _.map(comments, (comment) => {
                                        return (
                                            <CommentCard comment={comment} key={comment.id} post={this.props.posts[0]}/>
                                        )
                                    })
                                    :
                                    <div>No Comments Found!!</div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps ({ posts, comments }) {
    return {posts, comments}
}

export default connect(mapStateToProps, {
    getPost,
    getCommentsById
})(PostView)