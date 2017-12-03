import { combineReducers } from 'redux'

import { GET_POST, GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, SORT_BY_POSTS } from '../actions/PostAction'
import { GET_POST_COMMENTS, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, SORT_BY_COMMENTS } from "../actions/CommentAction";
import { GET_CATEGORIES } from '../actions/CategoryAction'

const initialStates = { posts: [], comments: [] }

function posts(state = initialStates.posts, action){
    const { posts, post, postId } = action

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
            if (state.length > 0) {
                result = state.map(current_state => current_state.id === post.id ? post : current_state)
            }
            else { result = [post] }
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

function comments (state = initialStates.comments, action){
    const { comments, postId, comment, orderType } = action

    switch (action.type) {
        case GET_POST_COMMENTS:
            return { ...state, [postId]: comments}

        case DELETE_COMMENT:
            return {
                [postId] : state[postId].filter(current_comment_state => current_comment_state.id !== comment)
            }

        case UPDATE_COMMENT:
            let commentArr = state[postId].filter(current_comment_state => current_comment_state.id !== comment.id)
            commentArr.push(comment)
            return {
                [postId] : commentArr
            }

        case ADD_COMMENT:
            return {
                ...state, [postId]: state[postId].concat(comment)
            }

        case SORT_BY_COMMENTS:

            let sortedCommentArr = comments.sort((a, b) => {
                if (orderType === 'timestamp') {
                    return a.timestamp < b.timestamp
                } else if (orderType === 'voteScore') {
                    return a.voteScore < b.voteScore;
                }
            })

            return {
                [postId] : sortedCommentArr
            }

        default:
            return state
    }
}

export default combineReducers({
	posts,
	categories,
    comments
})