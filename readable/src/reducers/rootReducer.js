import { combineReducers } from 'redux'
import _ from 'lodash';

import { GET_ALL_POSTS } from '../actions/PostsAction'
import { SORT_BY_LATEST, SORT_BY_VOTES } from '../actions/SortAction'

const initialPostsState = {}
const initialSortState = {
	posts: { order:'byLatest'},
	comments: { order:'byNewest'}
}

function posts(state = initialPostsState, action){
	const { payload } = action
	switch (action.type) {
		case GET_ALL_POSTS:
			return _.mapKeys(payload,'id')
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

export default combineReducers({
	posts,
	sorts
})