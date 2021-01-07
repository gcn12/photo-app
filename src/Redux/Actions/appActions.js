export const IS_LOAD_MORE = 'IS_LOAD_MORE'
export const QUERY = 'QUERY'
export const USER = 'USER'
export const PHOTO_INFORMATION = 'PHOTO_INFORMATION'
export const HOME_PHOTO_INFORMATION = 'HOME_PHOTO_INFORMATION'
export const USER_DATA = 'USER_DATA'
export const USER_POSTS = 'USER_POSTS'
export const DISPLAY_VIEW = 'DISPLAY_VIEW'
export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const SEARCH_QUERIES = 'SEARCH_QUERIES'
export const START_AFTER = 'START_AFTER'
export const SORT_CRITERIA = 'SORT_CRITERIA'
export const USER_INFORMATION = 'USER_INFORMATION'

export function userInformation(string) {
    return(dispatch) => {
        dispatch({type: USER_INFORMATION, payload: string})
    }
}

export function sortCriteria(string) {
    return(dispatch) => {
        dispatch({type: SORT_CRITERIA, payload: string})
    }
}

export function startAfter(string) {
    return(dispatch) => {
        dispatch({type: START_AFTER, payload: string})
    }
}

export function searchQueries(string) {
    return(dispatch) => {
        dispatch({type: SEARCH_QUERIES, payload: string})
    }
}

export function searchResults(string) {
    return(dispatch) => {
        dispatch({type: SEARCH_RESULTS, payload: string})
    }
}

export function displayView(string) {
    return(dispatch) => {
        dispatch({type: DISPLAY_VIEW, payload: string})
    }
}

export function userPosts(string) {
    return(dispatch) => {
        dispatch({type: USER_POSTS, payload: string})
    }
}

export function userData(string) {
    return(dispatch) => {
        dispatch({type: USER_DATA, payload: string})
    }
}

export function homePhotoInformation(string) {
    return(dispatch) => {
        dispatch({type: HOME_PHOTO_INFORMATION, payload: string})
    }
}

export function photoInformation(string) {
    return(dispatch) => {
        dispatch({type: PHOTO_INFORMATION, payload: string})
    }
}

export function user(string) {
    return(dispatch) => {
        dispatch({type: USER, payload: string})
    }
}

export function query(string) {
    return(dispatch) => {
        dispatch({type: QUERY, payload: string})
    }
}

export function isLoadMore(bool) {
    return(dispatch) => {
        dispatch({type: IS_LOAD_MORE, payload: bool})
    }
}