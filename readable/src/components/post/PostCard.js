import React, { Component } from 'react'

class PostCard extends Component {
    render() {
        const { post } = this.props;
        return (
            <div>
                { post.author }
            </div>
        )
    }
}
export default PostCard