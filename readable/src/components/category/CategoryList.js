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
				{_.map(this.props.categories,(category) =>{
					return <p><Link key={category.name} to={`/categories/${category.path}`}>{category.name}</Link></p>
				})}
			</section>
		)
	}
}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, {	getCategories })(CategoryList)