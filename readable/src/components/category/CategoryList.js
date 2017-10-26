import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { getCategories } from '../../actions/CategoryAction'

class CategoryList extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render(){
		return(
			<section className="col-sm-4">
				<h1>Categories</h1>
				{(this.props.categories || []).map(category =>
					<div>
						<p key={category.name}>
							<Link to= {`/${category.name}`}
							      onClick={(e) => this.props.selectedCategory(category.name)}> {category.name}</Link>
						</p>
					</div>
				)
				}
				<p>
					<Link to="/"
					      onClick={(e) => this.props.selectedCategory("all")}>Show all Categories Posts</Link>
				</p>
			</section>
		)
	}

}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, {	getCategories })(CategoryList)