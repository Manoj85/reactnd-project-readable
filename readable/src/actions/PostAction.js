import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export const GET_POSTS = 'GET_POSTS';

export function getPosts(){
	const request = axios.get(`${API_URL}/posts`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:GET_POSTS, payload:data})
		}).then((data)=>console.log(data))
	}
}
