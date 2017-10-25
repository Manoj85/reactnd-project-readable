export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'

let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)
const API = 'http://localhost:3001'
const headers = {
	'Accept': 'application/json',
	'Authorization': token
}

