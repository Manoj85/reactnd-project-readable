import React, { Component } from 'react'

class PostCard extends Component {
    render() {
        const { post } = this.props;
        return (
            <div class="card margin-top-10" key={post.id}>
                <div class="card-body">
                    <h4 class="card-title">{post.title}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">By: {post.author}</h6>
                    <p class="card-text"></p>
                </div>
            </div>
        )
    }
}
export default PostCard