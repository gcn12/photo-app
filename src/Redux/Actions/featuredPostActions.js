export const COLLECTIONS_LIST = 'COLLECTIONS_LIST'
export const IS_VISIBLE = 'IS_VISIBLE'

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