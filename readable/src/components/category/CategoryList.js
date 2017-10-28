import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import _ from 'lodash'

import { getCategories } from '../../actions/CategoryAction'

class CategoryList extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render(){
		const {categories} = this.props;
		return(
			<section>
				<nav>
					<ul>
						<li key="All"><NavLink exact to='/'>All</NavLink></li>
						{ categories && (
							_.map(categories,(category) =>
								<li key={category.name}>
									<NavLink exact to={`/${category.path}`}>{category.name}</NavLink>
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