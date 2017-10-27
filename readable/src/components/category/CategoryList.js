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
		const {categories} = this.props;
		return(
			<section className="col-sm-3">
				<h1>Categories</h1>
				{_.map(categories,(category) =>{
					return <p key={category.name}><Link key={category.name} to={`/${category.path}`}>{category.name}</Link></p>
				})}
			</section>
		)
	}
}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, {	getCategories })(CategoryList)