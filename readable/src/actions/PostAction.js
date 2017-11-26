import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const SORT_BY_POSTS = 'SORT_BY_POSTS'
export const VOTE_UP_POST = 'VOTE_UP_POST'
export const VOTE_DOWN_POST = 'VOTE_DOWN_POST'

export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'

export function getPosts(){
	const request = axios.get(`${API_URL}/posts`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:GET_POSTS, payload:data})
		}).then((data)=>console.log(data))
	}
}

export function getPostsByCategory(category) {
	const request = axios.get(`${API_URL}/${category}/posts`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:GET_POSTS, payload:data})
		}).then((data)=>console.log(data))
	}
}

export function getPost(id){
	const request = axios.get(`${API_URL}/posts/${id}`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type: GET_POST, payload: data})
		}).then((data)=>console.log(data))
	}
}

export function addPost(values, callback){
	const request = axios.post(`${API_URL}/posts`, values)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:ADD_POST, payload:data})
		}).then(()=>{dispatch(getPosts())}).then(()=>callback())
	}
}

export function editPost(id, values, callback){
	const request = axios.put(`${API_URL}/posts/${id}`, values)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:EDIT_POST, payload:data})
		}).then(()=>callback())
	}
}

export function deletePost(id, callback){
	const request = axios.delete(`${API_URL}/posts/${id}`)
	return dispatch => {
        request.then(()=>{
            dispatch({type:DELETE_POST, payload:id})
        })
	}
}

export function sortByPosts(posts, order){
    return { type: SORT_BY_POSTS, posts, order }
}

export function setVoteScore(postId, voteOrder){
    let dispatch_action = {};
    switch (voteOrder) {
		case 'up':
            dispatch_action = { type: VOTE_UP_POST, postId }
            break
		case 'down':
            dispatch_action = { type: VOTE_DOWN_POST, postId }
            break
		default:
			dispatch_action = {}
	}
    return dispatch_action
}

export function getCommentsById(id){
    const request = axios.get(`${API_URL}/posts/${id}+/comments`)
    return dispatch => {
        request.then(({data})=>{
            dispatch({type: GET_COMMENTS_FOR_POST, post_id: id, comments: data})
        })
    }
}



