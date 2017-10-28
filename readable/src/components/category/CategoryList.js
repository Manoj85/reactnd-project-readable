import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import _ from 'lodash'

import { capitalize } from '../../utils/helper'
import { getCategories } from '../../actions/CategoryAction'

class CategoryList extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render(){
		const {categories} = this.props

		const category_all_obj = { name: 'all', path: 'all'	}
		if(categories.length > 0) categories.unshift(category_all_obj)

		// const isActive = (path) => pathname === path ;

		return(
			<section className="category-container">
				<section className="category-title-box">
					<label className="label-title">Categories</label>
				</section>
				<nav>
					<ul>
						{ categories && (
							_.map(categories,(category) =>
								<li key={category.name}>
									<NavLink exact to={`/${category.path}`}>{capitalize(category.name)}</NavLink>
								</li>
							))
						}
					</ul>
				</nav>
			</section>
		)
	}
}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, {	getCategories })(CategoryList)