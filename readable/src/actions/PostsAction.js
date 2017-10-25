import axios from 'axios'
import {
	API_URL,
	API_URL_HEADERS,

	GET_ALL_POSTS

} from './global';

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS;

export function getAllPosts(){
	const request = axios.get(`${API_URL}/posts`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type:GET_ALL_POSTS, payload:data})
		}).then((data)=>console.log(data))
	}
}
