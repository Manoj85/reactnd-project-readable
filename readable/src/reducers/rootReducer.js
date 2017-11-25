import { combineReducers } from 'redux'
import _ from 'lodash'

import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST, SORT_BY_POSTS } from '../actions/PostAction'
import { GET_CATEGORIES } from '../actions/CategoryAction'

const initialPostsState = {}

function posts(state = initialPostsState, action){
	const { payload } = action

	switch (action.type) {
		case GET_POSTS:
			return _.mapKeys(payload,'id')
        case DELETE_POST:
            var newState = {...state}
            delete newState[payload]
            return newState;
        case ADD_POST:
        case EDIT_POST:
            return {...state, [payload.post.id]: payload.post }

        case SORT_BY_POSTS:
            return  action.posts.sort((a, b) => {
                if (action.order == 'timestamp') {
                    return a.timestamp < b.timestamp
                } else if (action.order == 'voteScore') {
                    return a.voteScore < b.voteScore;
                }
            })

		default:
			return state
	}
}

function categories (state = [], action){
	const { payload } = action
	switch (action.type) {
		case GET_CATEGORIES:
			return payload.categories
		default:
			return state
	}
}

export default combineReducers({
	posts,
	categories
})