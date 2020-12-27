export const DO_SOMETHING = 'DO_SOMETHING'

export function doSomething(item) {
    return(dispatch) => {
        dispatch({type: DO_SOMETHING, payload: item})
    }
}