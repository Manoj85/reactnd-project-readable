import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostCard from './PostCard'
import _ from 'lodash'

class PostList extends Component {

    render() {
        const { posts } = this.props

        return (
            <div className="post-container">
                    { !!posts && (_.map(posts, (post) => {
                    return (
                        <PostCard post={post} key={post.id}/>
                    )
                }))
            }
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return { posts }
}

export default connect(mapStateToProps)(PostList)