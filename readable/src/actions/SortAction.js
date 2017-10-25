export const SORT_BY_LATEST = 'SORT_BY_LATEST'
export const SORT_BY_VOTES = 'SORT_BY_VOTES'

export function sortByLatest(item, order='byLatest'){
	return { type: SORT_BY_LATEST, item, order }
}
export function sortByVotes(item, order='byVotes'){
	return { type: SORT_BY_VOTES, item, order }
}