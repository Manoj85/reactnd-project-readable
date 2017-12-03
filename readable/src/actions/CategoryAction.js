import axios from 'axios'
import { API_URL, API_URL_HEADERS } from './global'
import { GET_CATEGORIES } from '../actions/actionTypes'

axios.defaults.headers.common['Authorization'] = API_URL_HEADERS

export function getCategories(){
	const request = axios.get(`${API_URL}/categories`)
	return dispatch => {
		request.then(({data})=>{
			dispatch({type: GET_CATEGORIES, payload: data})
		}).then((data)=>console.log(data))
	}
}