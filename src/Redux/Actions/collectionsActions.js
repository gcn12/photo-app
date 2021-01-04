export const COLLECTIONS_DATA = 'COLLECTIONS_DATA'

export function collectionsData(data) {
    return(dispatch) =>{
        dispatch({type: COLLECTIONS_DATA, payload: data})
    }
}