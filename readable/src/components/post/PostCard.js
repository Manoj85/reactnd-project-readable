import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

import { deletePost } from '../../actions/PostAction'

class PostCard extends Component {

    removePost = () => {
        let postId = this.props.post.id
        if (!!postId) {
            this.props.deletePost(postId)
        }
    }

    render() {
        const { post } = this.props;
        return (
            <div className="card margin-top-10" key={post.id}>
                <div className="card-body">
                    <h5 className="card-title">
                        <div className="row">
                            <div className="col-md-8">
                                <Link to={'/' + post.category + '/' + post.id}> { post.title } </Link>
                                <span className="text-muted" style={{fontSize: 16}}>{post.timestamp}</span>
                            </div>
                            <div className="col-md-2 ml-md-auto">
                                <button className="btn btn-info btn-sm margin-left-15" id={post.id}>
                                    <EditIcon size={20}/>
                                </button>
                                <button className="btn btn-danger btn-sm margin-left-15" id={post.id} onClick={this.removePost}>
                                    <DeleteIcon size={20}/>
                                </button>
                            </div>
                        </div>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">By: {post.author}</h6>
                    <p className="card-text"></p>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ posts }) {
    return {posts}
}

export default connect(mapStateToProps, {
    deletePost
})(PostCard)