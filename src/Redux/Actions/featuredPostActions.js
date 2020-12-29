export const COLLECTIONS_LIST = 'COLLECTIONS_LIST'

export function collectionsList(item) {
    return(dispatch) => {
        dispatch({type: COLLECTIONS_LIST, payload: item})
    }
}