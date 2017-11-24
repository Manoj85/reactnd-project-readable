import { combineReducers } from 'redux'
import _ from 'lodash';

import { GET_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from '../actions/PostAction'
import { SORT_BY_LATEST, SORT_BY_VOTES } from '../actions/SortAction'
import { GET_CATEGORIES } from '../actions/CategoryAction'

const initialPostsState = {}
const initialSortState = {
	posts: { order:'byLatest'},
	comments: { order:'byLatest'}
}

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
            return {...state, [payload.post.id]: payload.post };
		default:
			return state
	}
}

function sorts(state = initialSortState, action){
	const { type, order, item } = action
	switch(type) {
		case SORT_BY_LATEST:
			return { ...state, [item]: { order } }
		case SORT_BY_VOTES:
			return { ...state, [item]: { order } }
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
	sorts,
	categories
})