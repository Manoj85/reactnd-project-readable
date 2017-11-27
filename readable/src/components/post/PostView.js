import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, getCommentsById } from '../../actions/PostAction'
import PostCard from './PostCard'

class PostView extends Component {

    componentWillMount() {
        let postId = this.props.match.params.id
        this.props.getPost(postId)
        // this.props.getCommentsById(postId)
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
        return (
            <div className="container container-body">
                <div className="row margin-15">
                   <div className="col-md-10">
                       {this.props.posts[0] ?
                           <PostCard post={this.props.posts[0]} key={this.props.posts[0].id} showComments={true}/>
                           : "Post Not Found!!"
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
    getCommentsById
})(PostView)