import { combineReducers } from 'redux'

import { GET_POST, GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, SORT_BY_POSTS } from '../actions/PostAction'
import { GET_CATEGORIES } from '../actions/CategoryAction'

const initialPostsState = { posts: [] }

function posts(state = initialPostsState.posts, action){
    const { posts, post } = action

	switch (action.type) {
        case GET_POSTS:
            return posts

        case DELETE_POST:
            return state.filter(posts => posts.id !== post)

        case GET_POST:
            return post

        case ADD_POST:
            return state.concat(post)

        case UPDATE_POST:
            let result;
            if (state.length > 1) { result = state.map(current_state => current_state.id === post.id ? post : current_state) }
            else { result = post }
            return result

        case SORT_BY_POSTS:
            return  action.posts.sort((a, b) => {
                if (action.order === 'timestamp') {
                    return a.timestamp < b.timestamp
                } else if (action.order === 'voteScore') {
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