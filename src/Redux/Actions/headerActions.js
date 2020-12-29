export const DROPDOWN_TRANSITION = 'DROPDOWN_TRANSITION'
export const VISIBILITY = 'VISIBILITY'
export const DROPDOWN_CATEGORIES_TRANSITION = 'DROPDOWN_CATEGORIES_TRANSITION'
export const CATEGORIES_VISIBILITY = 'CATEGORIES_VISIBILITY'
export const SEARCH_TRANSITION = 'SEARCH_TRANSITION'
export const SEARCH_VISIBILITY = 'SEARCH_VISIBILITY'
export const SELECTED = 'SELECTED'
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY'

export function selectedCategory(item) {
    return(dispatch) => {
        dispatch({type: SELECTED_CATEGORY, payload: item})
    }
}

export function selected(item) {
    return(dispatch) => {
        dispatch({type: SELECTED, payload: item})
    }
}

export function searchVisibility(item) {
    return(dispatch) => {
        dispatch({type: SEARCH_VISIBILITY, payload: item})
    }
}

export function searchTransition(item) {
    return(dispatch) => {
        dispatch({type: SEARCH_TRANSITION, payload: item})
    }
}

export function categoriesVisibility(item) {
    return(dispatch) => {
        dispatch({type: CATEGORIES_VISIBILITY, payload: item})
    }
}

export function dropdownCategoriesTransition(item) {
    return(dispatch) => {
        dispatch({type: DROPDOWN_CATEGORIES_TRANSITION, payload: item})
    }
}

export function visibility(item) {
    return(dispatch) => {
        dispatch({type: VISIBILITY, payload: item})
    }
}

export function dropdownTransition(item) {
    return(dispatch) => {
        dispatch({type: DROPDOWN_TRANSITION, payload: item})
    }
}