import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global'
import { GET_POST, GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, SORT_BY_POSTS } from '../actions/actionTypes'

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

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

export function subtractVote(id){
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
