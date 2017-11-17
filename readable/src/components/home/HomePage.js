import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPosts, getPostsByCategory } from '../../actions/PostAction'
import CategoryList from '../category/CategoryList'
import PostList from '../post/PostList'

class HomePage extends Component {

	componentDidMount(){
		this.props.getPosts()
	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            const selectedCategory = nextProps.location.pathname.slice(1)
            nextProps.getPostsByCategory(selectedCategory);
        }
    }

	render() {
		const { posts } = this.props
		return (
			<div className="container container-body">
				<div className="row margin-15">
					<div className="col-md-2"> <CategoryList /> </div>
					<div className="col-md-10"> <PostList posts={posts} /> </div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({posts}, ownProps) {
    return { posts }
}

export default connect(mapStateToProps, {
	getPosts,
	getPostsByCategory
})(HomePage)
