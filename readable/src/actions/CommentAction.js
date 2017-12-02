import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getCommentsById(id){
    const request = axios.get(`${API_URL}/posts/${id}/comments`)
    return dispatch => {
        request.then(({data})=>{
            dispatch({type: GET_POST_COMMENTS, postId: id, comments: data})
        })
    }
}

export function deleteComment(id){
    const request = axios.delete(`${API_URL}/comments/${id}`)
    return dispatch => {
        request.then(({data}) => {
            dispatch({type: DELETE_COMMENT, comment: data.id, postId: data.parentId})
        })
    }
}

export function editComment(id, values){
    const request = axios.put(`${API_URL}/comments/${id}`, values)
    return dispatch => {
        request.then(({data}) => {
            dispatch(updateComment(data))
        })
    }
}

export function addComment(id){
    const request = axios.delete(`${API_URL}/comments/${id}`)
    return dispatch => {
        request.then(({data}) => {
            dispatch({type: ADD_COMMENT, comment: data, postId: data.parentId})
        })
    }
}

export function updateComment (comment) {
    return { type: UPDATE_COMMENT, comment: comment.id, postId: comment.parentId }
}
