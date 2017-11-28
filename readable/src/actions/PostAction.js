import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const SORT_BY_POSTS = 'SORT_BY_POSTS'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getPosts(){
	const request = axios.get(`${API_URL}/posts`)
	return dispatch => {
		request.then(({data})=> {
			dispatch(loadPosts(data))
		})
	}
}

export function loadPosts(data) {
    return {
        type: GET_POSTS,
        posts: data.filter(post => post.deleted !== true)
    }
}

export function getPostsByCategory(category) {
	const request = axios.get(`${API_URL}/${category}/posts`)
	return dispatch => {
		request.then(({data}) => {
			dispatch(loadPosts(data))
		})
	}
}

export function getPost(id) {
	const request = axios.get(`${API_URL}/posts/${id}`)
	return dispatch => {
		request.then(({data}) => {
			dispatch({type: GET_POST, post: !!data ? [data] : [null]})
		})
	}
}

export function addPost(values){
	const request = axios.post(`${API_URL}/posts`, values)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type: ADD_POST, post: data})
		})
	}
}

export function editPost(id, values) {
	const request = axios.put(`${API_URL}/posts/${id}`, values)
	return dispatch => {
		request.then(({data}) => {
			dispatch(updatePost(data))
		})
	}
}

export function deletePost(id){
	const request = axios.delete(`${API_URL}/posts/${id}`)
	return dispatch => {
        request.then(() => {
            dispatch({type: DELETE_POST, post: id})
        })
	}
}

export function addVote(id){
    const request = axios.post(`${API_URL}/posts/${id}`, {option: "upVote"})
    return dispatch => {
        request.then(({data}) => {
            dispatch(updatePost(data))
        })
    }
}

export function subtractVote(id, voteOrder){
    const request = axios.post(`${API_URL}/posts/${id}`, {option: "downVote"})
    return dispatch => {
        request.then(({data}) => {
            dispatch(updatePost(data))
        })
    }
}

export function updatePost (data) {
    return { type: UPDATE_POST, post: data }
}

export function sortByPosts(posts, order){
    return { type: SORT_BY_POSTS, posts, order }
}

export function getCommentsById(id){
    const request = axios.get(`${API_URL}/posts/${id}/comments`)
    return dispatch => {
        request.then(({data})=>{
            dispatch({type: GET_POST_COMMENTS, postId: id, comments: data})
        })
    }
}



