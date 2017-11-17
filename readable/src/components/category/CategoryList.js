import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { getCategories } from '../../actions/CategoryAction'

class CategoryList extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render(){
        const {categories} = this.props

        return (
			<div className="category-container">
                { !!categories && (_.map(categories, (category) => {
                    return (
						<div class="card margin-bottom-10">
							<div class="card-block">
								<Link key={category.path} className="btn btn-primary" to={`/${category.path}`}>{category.name}</Link>
							</div>
						</div>
                    )
                  }))
                }
			</div>
        )
	}
}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, { getCategories })(CategoryList)