import { combineReducers } from 'redux'
import _ from 'lodash'

import { GET_POST, GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, SORT_BY_POSTS, VOTE_UP_POST, VOTE_DOWN_POST } from '../actions/PostAction'
import { GET_CATEGORIES } from '../actions/CategoryAction'

const initialPostsState = {}

function posts(state = initialPostsState, action){
	// const { payload, postId } = action
    const { posts, post, postId } = action

	switch (action.type) {
        case GET_POSTS:
            return posts

        case DELETE_POST:
            return state.filter(posts => posts.id !== postId)

        case GET_POST:
            return post

        case ADD_POST:
            return {...state, [post.id]: post}

        case UPDATE_POST:
            let result;
            if (state.length > 1) { result = state.map(current_state => current_state.id === post.id ? post : current_state) }
            else { result = [post] }
            return result

        case VOTE_UP_POST:
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    'voteScore': state[postId]['voteScore'] + 1
                }
            }

        case VOTE_DOWN_POST:
            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    'voteScore': state[postId]['voteScore'] - 1
                }
            }

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