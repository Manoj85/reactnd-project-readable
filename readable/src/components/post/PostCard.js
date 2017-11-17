import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import EditIcon from 'react-icons/lib/fa/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

class PostCard extends Component {
    render() {
        const { post } = this.props;
        return (
            <div class="card margin-top-10" key={post.id}>
                <div class="card-body">
                    <h5 class="card-title">
                        <div className="row">
                            <div className="col-md-8">
                                <Link to={'/' + post.category + '/' + post.id}> { post.title } </Link>
                                <span className="text-muted" style={{fontSize: 16}}>{post.timestamp}</span>
                            </div>
                            <div className="col-md-2 ml-md-auto">
                                <button className="btn btn-info btn-sm margin-left-15" id={'edit' + post.id} onClick={this.editPost}>
                                    <EditIcon size={20}/>
                                </button>
                                <button className="btn btn-danger btn-sm margin-left-15" id={'delete' + post.id} onClick={this.deletePost}>
                                    <DeleteIcon size={20}/>
                                </button>
                            </div>
                        </div>
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">By: {post.author}</h6>
                    <p class="card-text"></p>
                </div>
            </div>
        )
    }
}
export default PostCard