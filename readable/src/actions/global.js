
export const API_URL = 'http://localhost:3001'
export const API_URL_HEADERS = {
	'Accept': 'application/json',
	'Authorization': localStorage.token ? localStorage.token : Math.random().toString(36).substr(-8)
}



