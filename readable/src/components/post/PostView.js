import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/PostAction'
import { getCommentsById, sortByComments } from '../../actions/CommentAction'
import PostCard from './PostCard'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import PageNotFound from './PageNotFound'
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

    sortBy = ( type ) => {
        const post = this.props.posts[0]
        const postId = (!!post) ? post.id : ""
        const comments = this.props.comments[postId]

        this.props.sortByComments(comments, postId, type)
    }

    render() {
        const post = this.props.posts[0]

        if(!post) return (<PageNotFound />)
        if(post.error) return '404 not found';
        if(!post.id) return (<PageNotFound />)

        const postId = post.id
        const comments = this.props.comments[postId] ? this.props.comments[postId] : []
        const commentLength = comments.length

        return (
            <div className="container container-body">
                <div className="row margin-15">
                    <div className="col-md-10">
                        {!!post ?
                            <section>
                                <PostCard post={post}
                                          key={postId}
                                          showBody={true}/>

                                <div className="card-comments-box">
                                    <label>Comments:</label>

                                    <section className="sortByContainer">
                                        <label className="sortByLabel"> Order By:</label>
                                        <a id="voteLink" onClick={() => this.sortBy('voteScore')}>Votes</a>
                                        <span> / </span>
                                        <a id="timestampLink" onClick={() => this.sortBy('timestamp')}>Date Created</a>
                                    </section>

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

                                    <CommentForm currentPost={post} buttonType="Add" onSubmit={() => {this.closeEditMode()}}/>
                                </div>
                            </section>

                            : ""
                        }
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
    getCommentsById,
    sortByComments
})(PostView)