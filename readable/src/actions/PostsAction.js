import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export const GET_ALL_POSTS = 'GET_ALL_POSTS';

export function getAllPosts(){
	const request = axios.get(`${API_URL}/posts`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:GET_ALL_POSTS, payload:data})
		}).then((data)=>console.log(data))
	}
}
