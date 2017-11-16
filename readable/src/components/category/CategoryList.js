import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { capitalize } from '../../utils/helper'

import { getCategories } from '../../actions/CategoryAction'

class CategoryList extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render(){

        const showCategories = () => {
            const {categories} = this.props

            // Adding the "ALL" category dynamically to the Category List
            const category_all_obj = { name: 'all', path: '..'	}

            if(!!categories.length) {
                categories.unshift(category_all_obj)

                const categoryLinks = categories && (_.map(categories,(category) => {
                    return(
						<Link key={category.path} to={`/${category.path}`} className='link'>
							<div className="category-name">{category.name}</div>
						</Link>
                    )
                }))

                return categoryLinks
            }
        }

        return (
			<div className="category-container">

				<p/>
                {showCategories()}
			</div>
        )
	}
}

function mapStateToProps({categories}) {
	return { categories }
}

export default connect(mapStateToProps, {	getCategories })(CategoryList)