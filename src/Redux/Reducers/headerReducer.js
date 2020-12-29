import * as actions from '../Actions/headerActions'

export const initialState = {
    dropdownTransition: 'initial',
    visibility: false,
    dropdownCategoriesTransition: 'inital',
    categoriesVisibility: false,
    searchTransition: 'initial',
    searchVisibility: false,
    selected: '',
    selectedCategory: '',
}


export default function headerReducer(state=initialState, action) {
    switch(action.type) {
        case actions.SELECTED_CATEGORY:
            return {...state, selectedCategory: action.payload}
        case actions.SELECTED:
            return {...state, selected: action.payload}
        case actions.SEARCH_VISIBILITY:
            return {...state, searchVisibility: action.payload}
        case actions.SEARCH_TRANSITION:
            return {...state, searchTransition: action.payload}
        case actions.CATEGORIES_VISIBILITY:
            return {...state, categoriesVisibility: action.payload}
        case actions.DROPDOWN_CATEGORIES_TRANSITION:
            return {...state, dropdownCategoriesTransition: action.payload}
        case actions.VISIBILITY:
            return {...state, visibility: action.payload}
        case actions.DROPDOWN_TRANSITION:
            return {...state, dropdownTransition: action.payload}
        default:
            return state
    }
}