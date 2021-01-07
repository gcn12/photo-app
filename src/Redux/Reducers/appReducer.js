import * as actions from '../Actions/appActions'

export const initialState = {
    isLoadMore: true,
    query: '',
    user: '',
    photoInformation: null,
    homePhotoInformation: [],
    userData: [],
    userPosts: [],
    displayView: true,
    searchResults: [],
    searchQueries: 'all results',
    startAfter: '',
    sortCriteria: {
        city: '',
        country: '',
        continent: '',
        category: 'all categories',
        views: false,
        new: false,
        rating: false,
    },
}

export default function pageReducer(state=initialState, action) {
    switch(action.type) {
        case actions.SORT_CRITERIA:
            return {...state, sortCriteria: action.payload}
        case actions.START_AFTER:
            return {...state, startAfter: action.payload}
        case actions.SEARCH_QUERIES:
            return {...state, searchQueries: action.payload}
        case actions.SEARCH_RESULTS:
            return {...state, searchResults: action.payload}
        case actions.DISPLAY_VIEW:
            return {...state, displayView: action.payload}
        case actions.USER_POSTS:
            return {...state, userPosts: action.payload}
        case actions.USER_DATA:
            return {...state, userData: action.payload}
        case actions.HOME_PHOTO_INFORMATION:
            return {...state, homePhotoInformation: action.payload}
        case actions.PHOTO_INFORMATION:
            return {...state, photoInformation: action.payload}
        case actions.USER:
            return {...state, user: action.payload}
        case actions.IS_LOAD_MORE:
            return {...state, isLoadMore: action.payload}
        case actions.QUERY:
            return {...state, query: action.payload}
        default:
            return state
    }
}