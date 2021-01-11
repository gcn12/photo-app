export const COLLECTIONS_LIST = 'COLLECTIONS_LIST'
export const IS_VISIBLE = 'IS_VISIBLE'
export const IS_POST_VISIBLE = 'IS_POST_VISIBLE'

export function isPostVisible(item) {
    return(dispatch) => {
        dispatch({type: IS_POST_VISIBLE, payload: item})
    }
}

export function isVisible(item) {
    return(dispatch) => {
        dispatch({type: IS_VISIBLE, payload: item})
    }
}

export function collectionsList(item) {
    return(dispatch) => {
        dispatch({type: COLLECTIONS_LIST, payload: item})
    }
}