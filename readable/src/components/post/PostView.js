import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getCommentsById } from '../../actions/PostAction'
import PostCard from './PostCard'

class PostView extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        let postId = this.props.match.params.id
        this.props.getPost(postId)
        // this.props.getCommentsById(postId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts === null) {
            return nextProps.history.push("/404")
        }
        this.setState({
            posts: nextProps.posts,
            comments: nextProps.comments
        })
    }

    render() {
        return (
            <div className="container container-body">
                <div className="row margin-15">
                   <div className="col-md-10">
                       {/*{ !!post ? <h4> Post Not Found!!! </h4> : <PostCard post={post} key={post.id}/> }*/}
                       <PostCard post={this.props.posts} key={this.props.posts.id}/>
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